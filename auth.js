(() => {
  const url = window.FOODFINDER_SUPABASE_URL;
  const key = window.FOODFINDER_SUPABASE_ANON_KEY;
  const configured = Boolean(url && key && window.supabase);
  const client = configured ? window.supabase.createClient(url, key) : null;

  function authUrl(next) {
    const params = new URLSearchParams();
    if (isRecipeReturnPath(next)) {
      params.set("next", next);
    }
    return `auth.html${params.toString() ? `?${params.toString()}` : ""}`;
  }

  function isRecipeReturnPath(path) {
    return typeof path === "string" && /^recipe\.html(?:\?.*)?$/.test(path);
  }

  async function requireSession(container) {
    if (!client) {
      container.innerHTML = `
        <div class="auth-setup-notice">
          <strong>Sign-in setup needed</strong>
          <p>Add your Supabase project URL and public anon key to <code>auth-config.js</code>, then reload this page.</p>
          <a class="btn btn-primary" href="auth.html">Go to sign in</a>
        </div>
      `;
      return false;
    }

    let result;
    try {
      result = await client.auth.getSession();
    } catch (error) {
      container.innerHTML = `<div class="auth-setup-notice"><strong>Could not check your sign-in</strong><p>${escapeHtml(error.message || "Please check your connection and try again.")}</p><a class="btn btn-primary" href="auth.html">Try signing in</a></div>`;
      return false;
    }
    const { data, error } = result;
    if (error) {
      container.innerHTML = `<div class="auth-setup-notice"><strong>Could not check your sign-in</strong><p>${escapeHtml(error.message)}</p><a class="btn btn-primary" href="auth.html">Try signing in</a></div>`;
      return false;
    }
    if (!data.session) {
      const next = `${window.location.pathname.split("/").pop()}${window.location.search}`;
      window.location.replace(authUrl(next));
      return false;
    }
    return true;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.foodFinderAuth = { client, requireSession };

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("authRoot");
    if (!root) return;

    const setupNotice = document.getElementById("authSetupNotice");
    if (!client) {
      setupNotice.hidden = false;
      document.querySelectorAll("[data-auth-form] button, [data-auth-mode]").forEach((button) => {
        button.disabled = true;
      });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    const emailForm = document.getElementById("authEmailForm");
    const codeForm = document.getElementById("authCodeForm");
    const message = document.getElementById("authMessage");
    const emailInput = document.getElementById("authEmail");
    const codeInput = document.getElementById("authCode");
    const emailStep = document.getElementById("authEmailStep");
    const codeStep = document.getElementById("authCodeStep");
    const signedInView = document.getElementById("authSignedIn");
    const modeButtons = Array.from(document.querySelectorAll("[data-auth-mode]"));
    let mode = "signup";

    function setMessage(text, isError = false) {
      message.textContent = text;
      message.classList.toggle("is-error", isError);
      message.hidden = !text;
    }

    function setMode(nextMode) {
      mode = nextMode;
      modeButtons.forEach((button) => {
        const selected = button.dataset.authMode === mode;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      document.getElementById("authHeading").textContent =
        mode === "signup" ? "Join the table" : "Welcome back";
      document.getElementById("authSubheading").textContent =
        mode === "signup"
          ? "Create your account with a one-time email code."
          : "Enter your email and we’ll send you a sign-in code.";
      document.getElementById("authSendButton").textContent =
        mode === "signup" ? "Create account" : "Send sign-in code";
      setMessage("");
    }

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => setMode(button.dataset.authMode));
    });

    emailForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();
      const sendButton = document.getElementById("authSendButton");
      sendButton.disabled = true;
      sendButton.textContent = "Sending code…";
      setMessage("");
      try {
        const { error } = await client.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: mode === "signup" }
        });
        if (error) throw error;
        sessionStorage.setItem("foodfinder_auth_email", email);
        emailStep.hidden = true;
        codeStep.hidden = false;
        document.getElementById("authSentTo").textContent = email;
        codeInput.focus();
        setMessage("Check your inbox for the 6-digit code.");
      } catch (error) {
        setMessage(error.message || "We couldn’t send your code. Please try again.", true);
      } finally {
        sendButton.disabled = false;
        sendButton.textContent = mode === "signup" ? "Create account" : "Send sign-in code";
      }
    });

    codeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = sessionStorage.getItem("foodfinder_auth_email");
      if (!email) {
        codeStep.hidden = true;
        emailStep.hidden = false;
        setMessage("Enter your email again to request a new code.", true);
        return;
      }
      const verifyButton = document.getElementById("authVerifyButton");
      verifyButton.disabled = true;
      verifyButton.textContent = "Verifying…";
      setMessage("");
      try {
        const { error } = await client.auth.verifyOtp({
          email,
          token: codeInput.value.trim(),
          type: "email"
        });
        if (error) throw error;
        sessionStorage.removeItem("foodfinder_auth_email");
        window.location.replace(isRecipeReturnPath(next) ? next : "recipes.html");
      } catch (error) {
        setMessage(error.message || "That code could not be verified. Request a new code and try again.", true);
      } finally {
        verifyButton.disabled = false;
        verifyButton.textContent = "Verify & continue";
      }
    });

    document.getElementById("authChangeEmail").addEventListener("click", () => {
      codeStep.hidden = true;
      emailStep.hidden = false;
      codeInput.value = "";
      setMessage("");
    });

    client.auth.getSession().then(({ data, error }) => {
      if (error) {
        setMessage(error.message, true);
        return;
      }
      if (!data.session) return;
      emailStep.hidden = true;
      codeStep.hidden = true;
      document.getElementById("authForms").hidden = true;
      signedInView.hidden = false;
      document.getElementById("authAccountEmail").textContent = data.session.user.email || "";
    }).catch((error) => setMessage(error.message || "Could not check your sign-in.", true));

    document.getElementById("authSignOut").addEventListener("click", async () => {
      const button = document.getElementById("authSignOut");
      button.disabled = true;
      try {
        const { error } = await client.auth.signOut();
        if (error) throw error;
        window.location.reload();
      } catch (error) {
        setMessage(error.message || "Could not sign out. Please try again.", true);
        button.disabled = false;
      }
    });

    setMode("signup");
  });
})();
