/**
 * FoodFinder — Shared Application Logic
 * Handles:
 *  - SVG Icon System (no emojis)
 *  - Theme persistence (Light / Dark mode via localStorage)
 *  - Favourites management (localStorage)
 *  - Page initializers for all 8 pages
 *  - Interactive Ingredient Finder with match % and missing ingredients
 *  - Recipe Details checklist, step tracker, and Web Audio Cooking Timer
 *  - Gallery Filter + Interactive Lightbox Modal
 *  - Contact Form validation + local inquiry history
 */

const STORAGE_KEYS = {
  FAVS: "foodfinder_favourites",
  THEME: "foodfinder_theme",
  INQUIRIES: "foodfinder_inquiries"
};

function svgIcon(name, extraClass = "") {
  const cls = extraClass ? `icon ${extraClass}` : "icon";
  const paths = {
    chef: '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
    timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
    chevLeft: '<path d="m15 18-6-6 6-6"/>',
    chevRight: '<path d="m9 18 6-6-6-6"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'
  };
  const inner = paths[name] || "";
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `${svgIcon("check")}<span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "opacity 0.25s ease, transform 0.25s ease";
    setTimeout(() => toast.remove(), 260);
  }, 2600);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ==========================================================================
   Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  applyTheme(saved);

  const toggleBtn = document.getElementById("themeToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      showToast(next === "dark" ? "Dark mode enabled" : "Light mode enabled");
    });
  }
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  const toggleBtn = document.getElementById("themeToggleBtn");
  if (toggleBtn) {
    toggleBtn.innerHTML = theme === "dark" ? svgIcon("sun") : svgIcon("moon");
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    toggleBtn.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

/* ==========================================================================
   Favourites Storage
   ========================================================================== */
function getFavourites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVS);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavourites(ids) {
  localStorage.setItem(STORAGE_KEYS.FAVS, JSON.stringify(ids));
  updateFavBadges();
}

function isFavourite(id) {
  return getFavourites().includes(Number(id));
}

function toggleFavourite(id) {
  const numId = Number(id);
  const favs = getFavourites();
  const idx = favs.indexOf(numId);
  let added = false;
  if (idx === -1) {
    favs.push(numId);
    added = true;
  } else {
    favs.splice(idx, 1);
  }
  saveFavourites(favs);
  showToast(added ? "Added to Favourites" : "Removed from Favourites");
  return added;
}

function updateFavBadges() {
  const count = getFavourites().length;
  document.querySelectorAll(".fav-count-badge").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

/* ==========================================================================
   Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");
  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      mobileBtn.innerHTML = open ? svgIcon("x") : svgIcon("menu");
      mobileBtn.setAttribute("aria-expanded", String(open));
    });
  }
  const actions = document.querySelector(".header-actions");
  if (actions && !actions.querySelector(".auth-nav-link")) {
    const authLink = document.createElement("a");
    authLink.className = "btn btn-primary btn-sm auth-nav-link";
    authLink.href = "auth.html";
    authLink.textContent = "Sign in";
    actions.insertBefore(authLink, mobileBtn || null);
  }
  updateFavBadges();
}

/* ==========================================================================
   Shared Recipe Card Renderer
   ========================================================================== */
function createRecipeCardHTML(recipe, matchInfo = null, selectedIngredients = []) {
  const fav = isFavourite(recipe.id);
  const haveQuery = selectedIngredients.length
    ? `&have=${encodeURIComponent(selectedIngredients.join(","))}`
    : "";
  const detailUrl = `recipe.html?id=${recipe.id}${haveQuery}`;

  let matchHTML = "";
  if (matchInfo) {
    const cls =
      matchInfo.percent >= 70 ? "match-high" : matchInfo.percent >= 40 ? "match-mid" : "match-low";
    const missingSection =
      matchInfo.missing.length === 0
        ? `<div class="tag-ready">${svgIcon("check", "icon-sm")} You have all ingredients!</div>`
        : `<div class="missing-list">
             <strong>Missing (${matchInfo.missing.length}):</strong>
             <div class="missing-tags">
               ${matchInfo.missing.map((m) => `<span class="tag-missing">${escapeHtml(m)}</span>`).join("")}
             </div>
           </div>`;

    matchHTML = `
      <div class="match-box">
        <div class="match-header">
          <span>${matchInfo.matched.length} of ${recipe.ingredients.length} ingredients</span>
          <span class="match-pct ${cls}">${matchInfo.percent}% Match</span>
        </div>
        <div class="match-bar-track">
          <div class="match-bar-fill ${cls}" style="width: ${matchInfo.percent}%"></div>
        </div>
        ${missingSection}
      </div>
    `;
  }

  return `
    <article class="recipe-card">
      <div class="recipe-thumb">
        <a href="${detailUrl}">
          <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}" loading="lazy" />
        </a>
        <span class="recipe-cat-badge">${escapeHtml(recipe.category)}</span>
        <button
          type="button"
          class="fav-toggle-btn ${fav ? "is-fav" : ""}"
          data-fav-id="${recipe.id}"
          aria-label="${fav ? "Remove from favourites" : "Save to favourites"}"
          title="${fav ? "Remove from favourites" : "Save to favourites"}"
        >
          ${svgIcon("heart")}
        </button>
      </div>
      <div class="recipe-body">
        <h3 class="recipe-title"><a href="${detailUrl}">${escapeHtml(recipe.name)}</a></h3>
        <p class="recipe-desc">${escapeHtml(recipe.description)}</p>
        ${matchHTML}
        <div class="recipe-meta">
          <span class="meta-pill">${svgIcon("clock", "icon-sm")} Prep ${escapeHtml(recipe.prepTime)}</span>
          <span class="meta-pill">${svgIcon("timer", "icon-sm")} Cook ${escapeHtml(recipe.cookTime)}</span>
          <span class="meta-pill">${svgIcon("flame", "icon-sm")} ${escapeHtml(recipe.difficulty)}</span>
        </div>
        <div class="recipe-footer">
          <span class="meta-pill" style="font-size:0.83rem;color:var(--text-muted)">
            ${svgIcon("users", "icon-sm")} ${escapeHtml(recipe.servings)}
          </span>
          <a href="${detailUrl}" class="btn btn-secondary btn-sm">
            View Recipe ${svgIcon("arrowRight", "icon-sm")}
          </a>
        </div>
      </div>
    </article>
  `;
}

function bindFavouriteButtons(container, onChange = null) {
  if (!container) return;
  container.querySelectorAll("[data-fav-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = Number(btn.getAttribute("data-fav-id"));
      const nowFav = toggleFavourite(id);
      btn.classList.toggle("is-fav", nowFav);
      btn.setAttribute("aria-label", nowFav ? "Remove from favourites" : "Save to favourites");
      if (typeof onChange === "function") onChange(id, nowFav);
    });
  });
}

/* ==========================================================================
   Page: Home (index.html)
   ========================================================================== */
function initHomePage() {
  const catGrid = document.getElementById("homeCategoriesGrid");
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map((cat) => {
      const count = RECIPES.filter((r) => r.category === cat.name).length;
      return `
        <a href="recipes.html?category=${encodeURIComponent(cat.name)}" class="category-card">
          <img src="${escapeHtml(cat.image)}" alt="${escapeHtml(cat.name)} recipes" loading="lazy" />
          <div class="category-overlay">
            <h3>${escapeHtml(cat.name)}</h3>
            <span>${count} Recipes ${svgIcon("arrowRight", "icon-sm")}</span>
          </div>
        </a>
      `;
    }).join("");
  }

  const popularGrid = document.getElementById("popularRecipesGrid");
  if (popularGrid) {
    const popular = RECIPES.filter((r) => r.popular).slice(0, 6);
    popularGrid.innerHTML = popular.map((r) => createRecipeCardHTML(r)).join("");
    bindFavouriteButtons(popularGrid);
  }

  const heroForm = document.getElementById("heroSearchForm");
  const heroInput = document.getElementById("heroSearchInput");
  if (heroForm && heroInput) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = heroInput.value.trim();
      window.location.href = q ? `recipes.html?q=${encodeURIComponent(q)}` : "recipes.html";
    });
  }
}

/* ==========================================================================
   Page: Ingredient Finder (finder.html)
   ========================================================================== */
function initFinderPage() {
  const ingListEl = document.getElementById("ingredientToggleList");
  const ingSearchEl = document.getElementById("ingredientSearchInput");
  const basketChipsEl = document.getElementById("selectedBasketChips");
  const basketCountEl = document.getElementById("selectedCountText");
  const clearBtn = document.getElementById("clearIngredientsBtn");
  const resultsGridEl = document.getElementById("finderResultsGrid");
  const resultsTitleEl = document.getElementById("finderResultsSummary");
  const matchFilterEl = document.getElementById("finderMatchFilter");

  if (!ingListEl || !resultsGridEl) return;

  // Gather unique sorted ingredients across all recipes
  const allIngredients = Array.from(
    new Set(RECIPES.flatMap((r) => r.ingredients.map((i) => i.name.toLowerCase())))
  ).sort();

  let selected = new Set(["rice", "eggs", "onions", "tomatoes"]); // Proposal example default!

  function renderIngredientList() {
    const query = (ingSearchEl?.value || "").trim().toLowerCase();
    const filtered = allIngredients.filter((ing) => ing.includes(query));

    if (filtered.length === 0) {
      ingListEl.innerHTML = `<p style="font-size:0.86rem;color:var(--text-muted)">No ingredients match "${escapeHtml(query)}".</p>`;
      return;
    }

    ingListEl.innerHTML = filtered
      .map((ing) => {
        const isSel = selected.has(ing);
        return `
          <button type="button" class="ing-toggle ${isSel ? "is-selected" : ""}" data-ing="${escapeHtml(ing)}">
            ${svgIcon(isSel ? "check" : "plus", "icon-sm")}
            <span>${escapeHtml(ing)}</span>
          </button>
        `;
      })
      .join("");

    ingListEl.querySelectorAll("[data-ing]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-ing");
        if (selected.has(name)) {
          selected.delete(name);
        } else {
          selected.add(name);
        }
        renderAll();
      });
    });
  }

  function renderBasket() {
    const arr = Array.from(selected);
    if (basketCountEl) basketCountEl.textContent = `${arr.length} Selected`;

    if (arr.length === 0) {
      basketChipsEl.innerHTML = `<span style="font-size:0.82rem;color:var(--text-muted)">Select ingredients below to start matching recipes.</span>`;
      return;
    }

    basketChipsEl.innerHTML = arr
      .map(
        (ing) => `
      <span class="selected-chip">
        ${escapeHtml(ing)}
        <button type="button" data-remove-ing="${escapeHtml(ing)}" aria-label="Remove ${escapeHtml(ing)}">
          ${svgIcon("x", "icon-sm")}
        </button>
      </span>
    `
      )
      .join("");

    basketChipsEl.querySelectorAll("[data-remove-ing]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selected.delete(btn.getAttribute("data-remove-ing"));
        renderAll();
      });
    });
  }

  function renderResults() {
    const arr = Array.from(selected);
    const minMatch = Number(matchFilterEl?.value || 1);

    if (arr.length === 0) {
      resultsTitleEl.textContent = "Select ingredients from your kitchen to see matching recipes.";
      resultsGridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">${svgIcon("utensils", "icon-xl")}</div>
          <h3>Your Kitchen Basket is Empty</h3>
          <p>Pick ingredients like rice, eggs, onions, or chicken from the left panel to calculate recipe match percentages.</p>
        </div>
      `;
      return;
    }

    const scored = RECIPES.map((recipe) => {
      const reqNames = recipe.ingredients.map((i) => i.name.toLowerCase());
      const matched = reqNames.filter((name) => selected.has(name));
      const missing = reqNames.filter((name) => !selected.has(name));
      const percent = Math.round((matched.length / reqNames.length) * 100);
      return { recipe, matchInfo: { matched, missing, percent } };
    })
      .filter((item) => item.matchInfo.percent >= minMatch && item.matchInfo.matched.length > 0)
      .sort((a, b) => b.matchInfo.percent - a.matchInfo.percent);

    resultsTitleEl.textContent = `Found ${scored.length} matching recipe${scored.length === 1 ? "" : "s"}`;

    if (scored.length === 0) {
      resultsGridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">${svgIcon("search", "icon-xl")}</div>
          <h3>No Recipes Match That Filter</h3>
          <p>Try adding a couple more pantry items like garlic, oil, or salt, or lower the minimum match filter.</p>
        </div>
      `;
      return;
    }

    resultsGridEl.innerHTML = scored
      .map((item) => createRecipeCardHTML(item.recipe, item.matchInfo, arr))
      .join("");
    bindFavouriteButtons(resultsGridEl);
  }

  function renderAll() {
    renderIngredientList();
    renderBasket();
    renderResults();
  }

  if (ingSearchEl) ingSearchEl.addEventListener("input", renderIngredientList);
  if (matchFilterEl) matchFilterEl.addEventListener("change", renderResults);
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      selected.clear();
      renderAll();
    });
  }

  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const items = btn.getAttribute("data-preset").split(",").map((s) => s.trim().toLowerCase());
      selected = new Set(items);
      renderAll();
      showToast("Preset ingredients loaded");
    });
  });

  renderAll();
}

/* ==========================================================================
   Page: All Recipes (recipes.html)
   ========================================================================== */
function initRecipesPage() {
  const gridEl = document.getElementById("allRecipesGrid");
  const searchEl = document.getElementById("recipeSearchInput");
  const diffEl = document.getElementById("difficultyFilter");
  const sortEl = document.getElementById("sortSelect");
  const pillsWrap = document.getElementById("categoryFilterPills");
  const countEl = document.getElementById("recipesCountLabel");

  if (!gridEl) return;

  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get("category") || "All";
  if (searchEl && params.get("q")) {
    searchEl.value = params.get("q");
  }

  function syncCategoryPills() {
    if (!pillsWrap) return;
    pillsWrap.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-cat") === activeCategory);
    });
  }

  function render() {
    const query = (searchEl?.value || "").trim().toLowerCase();
    const diff = diffEl?.value || "All";
    const sortBy = sortEl?.value || "popular";

    let list = RECIPES.filter((r) => {
      const catOk = activeCategory === "All" || r.category === activeCategory;
      const diffOk = diff === "All" || r.difficulty === diff;
      const qOk =
        !query ||
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(query));
      return catOk && diffOk && qOk;
    });

    if (sortBy === "popular") {
      list.sort((a, b) => Number(b.popular) - Number(a.popular));
    } else if (sortBy === "quickest") {
      list.sort((a, b) => a.cookMinutes - b.cookMinutes);
    } else if (sortBy === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (countEl) {
      countEl.textContent = `Showing ${list.length} of ${RECIPES.length} recipes`;
    }

    if (list.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">${svgIcon("search", "icon-xl")}</div>
          <h3>No Recipes Found</h3>
          <p>No recipes matched your current search or filters. Try clearing your search terms.</p>
          <button type="button" class="btn btn-primary" id="resetRecipesFilterBtn">Reset Filters</button>
        </div>
      `;
      document.getElementById("resetRecipesFilterBtn")?.addEventListener("click", () => {
        activeCategory = "All";
        if (searchEl) searchEl.value = "";
        if (diffEl) diffEl.value = "All";
        syncCategoryPills();
        render();
      });
      return;
    }

    gridEl.innerHTML = list.map((r) => createRecipeCardHTML(r)).join("");
    bindFavouriteButtons(gridEl);
  }

  if (pillsWrap) {
    pillsWrap.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-cat");
        syncCategoryPills();
        render();
      });
    });
  }

  searchEl?.addEventListener("input", render);
  diffEl?.addEventListener("change", render);
  sortEl?.addEventListener("change", render);

  syncCategoryPills();
  render();
}

/* ==========================================================================
   Page: Recipe Details + Cooking Timer (recipe.html)
   ========================================================================== */
async function initRecipeDetailPage() {
  const container = document.getElementById("recipeDetailRoot");
  if (!container) return;

  if (!window.foodFinderAuth || !(await window.foodFinderAuth.requireSession(container))) return;

  const params = new URLSearchParams(window.location.search);
  const recipeId = Number(params.get("id")) || 1;
  const haveParam = params.get("have") || "";
  const preChecked = new Set(
    haveParam
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );

  const recipe = RECIPES.find((r) => r.id === recipeId) || RECIPES[0];
  document.title = `${recipe.name} — FoodFinder`;

  const fav = isFavourite(recipe.id);

  container.innerHTML = `
    <div class="recipe-detail-hero">
      <div class="detail-image-box">
        <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}" />
      </div>
      <div>
        <div class="detail-badges">
          <span class="badge-pill">${escapeHtml(recipe.category)}</span>
          <span class="badge-pill">${svgIcon("flame", "icon-sm")} ${escapeHtml(recipe.difficulty)}</span>
        </div>
        <h1 class="detail-title">${escapeHtml(recipe.name)}</h1>
        <p class="detail-summary">${escapeHtml(recipe.description)}</p>

        <div class="detail-stats-grid">
          <div class="detail-stat-card">
            ${svgIcon("clock")}
            <strong>${escapeHtml(recipe.prepTime)}</strong>
            <span>Prep Time</span>
          </div>
          <div class="detail-stat-card">
            ${svgIcon("timer")}
            <strong>${escapeHtml(recipe.cookTime)}</strong>
            <span>Cook Time</span>
          </div>
          <div class="detail-stat-card">
            ${svgIcon("users")}
            <strong>${escapeHtml(recipe.servings)}</strong>
            <span>Yield</span>
          </div>
          <div class="detail-stat-card">
            ${svgIcon("utensils")}
            <strong>${recipe.ingredients.length} Items</strong>
            <span>Ingredients</span>
          </div>
        </div>

        <div class="hero-actions no-print">
          <button type="button" class="btn ${fav ? "btn-primary" : "btn-secondary"}" id="detailFavBtn">
            ${svgIcon("heart")}
            <span>${fav ? "Saved in Favourites" : "Save to Favourites"}</span>
          </button>
          <button type="button" class="btn btn-outline" id="printRecipeBtn">
            ${svgIcon("printer")} Print Recipe
          </button>
        </div>
      </div>
    </div>

    <div class="detail-content-grid">
      <div>
        <div class="detail-card">
          <h2>${svgIcon("utensils")} Required Ingredients</h2>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;">
            Click any ingredient to check it off while preparing.
          </p>
          <div class="ingredient-checklist" id="ingredientChecklist">
            ${recipe.ingredients
              .map((ing) => {
                const isHave = preChecked.has(ing.name.toLowerCase());
                return `
                  <div class="ingredient-check-item ${isHave ? "checked" : ""}" role="checkbox" aria-checked="${isHave}">
                    <span class="ingredient-check-left">
                      ${svgIcon("check", "icon-sm")}
                      <span class="ingredient-name">${escapeHtml(ing.name)}</span>
                    </span>
                    <span class="ing-amount">${escapeHtml(ing.amount)}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <div class="timer-widget no-print">
          <h3>${svgIcon("timer")} Cooking Timer</h3>
          <p style="font-size:0.86rem;opacity:0.85;">Suggested cook time: ${recipe.cookMinutes || 5} min</p>
          <div class="timer-display" id="timerDisplay">00:00</div>
          <div class="timer-presets">
            <button type="button" class="timer-preset-btn" data-mins="${recipe.cookMinutes || 5}">Recipe (${recipe.cookMinutes || 5}m)</button>
            <button type="button" class="timer-preset-btn" data-mins="5">5m</button>
            <button type="button" class="timer-preset-btn" data-mins="10">10m</button>
            <button type="button" class="timer-preset-btn" data-mins="15">15m</button>
            <button type="button" class="timer-preset-btn" data-mins="20">20m</button>
          </div>
          <div class="timer-custom-row">
            <input type="number" id="customTimerMins" min="1" max="180" value="${recipe.cookMinutes || 10}" aria-label="Custom minutes" />
            <button type="button" class="btn btn-primary btn-sm" id="setCustomTimerBtn" style="flex:1;">Set Minutes</button>
          </div>
          <div class="timer-controls">
            <button type="button" class="btn btn-primary" id="timerStartPauseBtn">${svgIcon("play", "icon-sm")} Start</button>
            <button type="button" class="btn btn-ghost" id="timerResetBtn" style="background:rgba(255,255,255,0.14);color:#fff;border-color:rgba(255,255,255,0.22);">${svgIcon("reset", "icon-sm")} Reset</button>
          </div>
          <p class="timer-status" id="timerStatus">Ready to start</p>
        </div>
      </div>

      <div>
        <div class="detail-card">
          <h2>${svgIcon("book")} Step-by-Step Instructions</h2>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">
            Click any step to mark it complete as you cook.
          </p>
          <div class="steps-list" id="stepsChecklist">
            ${recipe.steps
              .map(
                (step, idx) => `
              <div class="step-row">
                <span class="step-circle">${idx + 1}</span>
                <p>${escapeHtml(step)}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  // Favourite toggle
  const detailFavBtn = document.getElementById("detailFavBtn");
  detailFavBtn?.addEventListener("click", () => {
    const nowFav = toggleFavourite(recipe.id);
    detailFavBtn.className = `btn ${nowFav ? "btn-primary" : "btn-secondary"}`;
    detailFavBtn.innerHTML = `${svgIcon("heart")}<span>${nowFav ? "Saved in Favourites" : "Save to Favourites"}</span>`;
  });

  // Print button
  document.getElementById("printRecipeBtn")?.addEventListener("click", () => window.print());

  // Checklist interactivity
  document.querySelectorAll(".ingredient-check-item").forEach((item) => {
    item.addEventListener("click", () => {
      const checked = item.classList.toggle("checked");
      item.setAttribute("aria-checked", String(checked));
    });
  });

  document.querySelectorAll(".step-row").forEach((row) => {
    row.addEventListener("click", () => row.classList.toggle("completed"));
  });

  // Related recipes
  const relatedGrid = document.getElementById("relatedRecipesGrid");
  if (relatedGrid) {
    const related = RECIPES.filter((r) => r.id !== recipe.id).slice(0, 3);
    relatedGrid.innerHTML = related.map((r) => createRecipeCardHTML(r)).join("");
    bindFavouriteButtons(relatedGrid);
  }

  // Cooking Timer Logic
  initCookingTimer(recipe.cookMinutes || 10);
}

function playTimerChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.46);
    });
  } catch {
    // AudioContext blocked or unsupported
  }
}

function initCookingTimer(defaultMinutes) {
  const displayEl = document.getElementById("timerDisplay");
  const startPauseBtn = document.getElementById("timerStartPauseBtn");
  const resetBtn = document.getElementById("timerResetBtn");
  const statusEl = document.getElementById("timerStatus");
  const customInput = document.getElementById("customTimerMins");
  const setCustomBtn = document.getElementById("setCustomTimerBtn");

  if (!displayEl) return;

  let baseSeconds = Math.max(1, defaultMinutes) * 60;
  let remaining = baseSeconds;
  let intervalId = null;

  function renderTime() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    displayEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    startPauseBtn.innerHTML = `${svgIcon("play", "icon-sm")} Start`;
  }

  function setMinutes(mins) {
    stopTimer();
    const safe = Math.min(180, Math.max(1, Number(mins) || 1));
    baseSeconds = safe * 60;
    remaining = baseSeconds;
    if (customInput) customInput.value = safe;
    renderTime();
    statusEl.textContent = `Timer set for ${safe} minute${safe === 1 ? "" : "s"}`;
  }

  startPauseBtn.addEventListener("click", () => {
    if (intervalId) {
      stopTimer();
      statusEl.textContent = "Timer paused";
      return;
    }
    if (remaining <= 0) remaining = baseSeconds;
    statusEl.textContent = "Cooking timer running...";
    startPauseBtn.innerHTML = `${svgIcon("pause", "icon-sm")} Pause`;
    intervalId = setInterval(() => {
      remaining -= 1;
      renderTime();
      if (remaining <= 0) {
        stopTimer();
        statusEl.textContent = "Time is up! Check your dish.";
        playTimerChime();
        showToast("Cooking timer finished!");
      }
    }, 1000);
  });

  resetBtn.addEventListener("click", () => {
    stopTimer();
    remaining = baseSeconds;
    renderTime();
    statusEl.textContent = "Timer reset";
  });

  setCustomBtn?.addEventListener("click", () => setMinutes(customInput.value));

  document.querySelectorAll(".timer-preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => setMinutes(btn.getAttribute("data-mins")));
  });

  renderTime();
}

/* ==========================================================================
   Page: Food Gallery + Lightbox (gallery.html)
   ========================================================================== */
function initGalleryPage() {
  const gridEl = document.getElementById("galleryGrid");
  const filterWrap = document.getElementById("galleryFilterPills");
  const modal = document.getElementById("lightboxModal");
  const lbImg = document.getElementById("lightboxImg");
  const lbTitle = document.getElementById("lightboxTitle");
  const lbDesc = document.getElementById("lightboxDesc");
  const lbLink = document.getElementById("lightboxRecipeLink");

  if (!gridEl) return;

  const allItems = [
    ...RECIPES.map((r) => ({
      title: r.name,
      category: r.category,
      image: r.image,
      caption: `${r.category} • Prep ${r.prepTime} • Cook ${r.cookTime}`,
      recipeId: r.id
    })),
    ...GALLERY_EXTRAS
  ];

  let activeCat = "All";
  let currentList = allItems;
  let activeIndex = 0;

  function render() {
    currentList = activeCat === "All" ? allItems : allItems.filter((item) => item.category === activeCat);
    gridEl.innerHTML = currentList
      .map(
        (item, idx) => `
      <div class="gallery-item" data-gallery-idx="${idx}" tabindex="0" role="button" aria-label="View ${escapeHtml(item.title)}">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
        <div class="gallery-caption">
          <span class="gallery-caption-top">${svgIcon("zoom")}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.caption)}</p>
        </div>
      </div>
    `
      )
      .join("");

    gridEl.querySelectorAll("[data-gallery-idx]").forEach((el) => {
      const open = () => openLightbox(Number(el.getAttribute("data-gallery-idx")));
      el.addEventListener("click", open);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function updateLightbox() {
    const item = currentList[activeIndex];
    if (!item || !modal) return;
    lbImg.src = item.image;
    lbImg.alt = item.title;
    lbTitle.textContent = item.title;
    lbDesc.textContent = item.caption;
    lbLink.href = `recipe.html?id=${item.recipeId}`;
  }

  function openLightbox(idx) {
    activeIndex = idx;
    updateLightbox();
    modal.classList.add("open");
  }

  function closeLightbox() {
    modal?.classList.remove("open");
  }

  filterWrap?.querySelectorAll("[data-gallery-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCat = btn.getAttribute("data-gallery-cat");
      filterWrap.querySelectorAll("[data-gallery-cat]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  document.getElementById("lightboxCloseBtn")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrevBtn")?.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + currentList.length) % currentList.length;
    updateLightbox();
  });
  document.getElementById("lightboxNextBtn")?.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % currentList.length;
    updateLightbox();
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal?.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      activeIndex = (activeIndex - 1 + currentList.length) % currentList.length;
      updateLightbox();
    }
    if (e.key === "ArrowRight") {
      activeIndex = (activeIndex + 1) % currentList.length;
      updateLightbox();
    }
  });

  render();
}

/* ==========================================================================
   Page: Favourites (favourites.html)
   ========================================================================== */
function initFavouritesPage() {
  const gridEl = document.getElementById("favouritesGrid");
  const countEl = document.getElementById("favSummaryText");
  const clearAllBtn = document.getElementById("clearAllFavsBtn");

  if (!gridEl) return;

  function render() {
    const favIds = getFavourites();
    const favRecipes = RECIPES.filter((r) => favIds.includes(r.id));

    if (countEl) {
      countEl.textContent = `You have ${favRecipes.length} saved recipe${favRecipes.length === 1 ? "" : "s"}`;
    }
    if (clearAllBtn) {
      clearAllBtn.style.display = favRecipes.length > 0 ? "inline-flex" : "none";
    }

    if (favRecipes.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">${svgIcon("heart", "icon-xl")}</div>
          <h3>No Saved Recipes Yet</h3>
          <p>Click the heart icon on any recipe card or recipe details page to save dishes here for quick access.</p>
          <div class="hero-actions" style="justify-content:center;">
            <a href="finder.html" class="btn btn-primary">Find by Ingredients</a>
            <a href="recipes.html" class="btn btn-outline">Browse All Recipes</a>
          </div>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = favRecipes.map((r) => createRecipeCardHTML(r)).join("");
    bindFavouriteButtons(gridEl, () => render());
  }

  clearAllBtn?.addEventListener("click", () => {
    saveFavourites([]);
    render();
    showToast("All favourites cleared");
  });

  render();
}

/* ==========================================================================
   Page: Contact (contact.html)
   ========================================================================== */
function initContactPage() {
  const form = document.getElementById("contactForm");
  const historyWrap = document.getElementById("savedInquiriesList");
  const successBox = document.getElementById("contactSuccessBanner");

  if (!form) return;

  function loadInquiries() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function renderInquiries() {
    if (!historyWrap) return;
    const list = loadInquiries();
    if (list.length === 0) {
      historyWrap.innerHTML = `<p style="font-size:0.88rem;color:var(--text-muted)">No messages submitted yet in this browser.</p>`;
      return;
    }
    historyWrap.innerHTML = list
      .slice(0, 4)
      .map(
        (item) => `
      <div class="info-card" style="margin-bottom:12px;padding:16px;">
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
          <strong style="color:var(--primary);">${escapeHtml(item.topic)}</strong>
          <span style="font-size:0.78rem;color:var(--text-muted);">${escapeHtml(item.date)}</span>
        </div>
        <p style="font-size:0.88rem;color:var(--text-muted);">${escapeHtml(item.message)}</p>
      </div>
    `
      )
      .join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = document.getElementById("contactName");
    const emailEl = document.getElementById("contactEmail");
    const topicEl = document.getElementById("contactTopic");
    const msgEl = document.getElementById("contactMessage");

    const nameErr = document.getElementById("nameError");
    const emailErr = document.getElementById("emailError");
    const msgErr = document.getElementById("messageError");

    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameEl.value.trim()) {
      nameErr.classList.add("visible");
      valid = false;
    } else {
      nameErr.classList.remove("visible");
    }

    if (!emailRegex.test(emailEl.value.trim())) {
      emailErr.classList.add("visible");
      valid = false;
    } else {
      emailErr.classList.remove("visible");
    }

    if (msgEl.value.trim().length < 10) {
      msgErr.classList.add("visible");
      valid = false;
    } else {
      msgErr.classList.remove("visible");
    }

    if (!valid) return;

    const list = loadInquiries();
    list.unshift({
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      topic: topicEl.value,
      message: msgEl.value.trim(),
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list.slice(0, 10)));

    if (successBox) {
      successBox.style.display = "flex";
    }
    form.reset();
    renderInquiries();
    showToast("Message saved locally!");
  });

  renderInquiries();
}

/* ==========================================================================
   Bootstrap by Page Identifier
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();

  const page = document.body.getAttribute("data-page");
  if (page === "home") initHomePage();
  else if (page === "finder") initFinderPage();
  else if (page === "recipes") initRecipesPage();
  else if (page === "recipe") initRecipeDetailPage();
  else if (page === "gallery") initGalleryPage();
  else if (page === "favourites") initFavouritesPage();
  else if (page === "contact") initContactPage();
});
