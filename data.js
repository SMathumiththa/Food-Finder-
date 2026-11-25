/**
 * FoodFinder Recipe Dataset
 * 10 structured recipes across Breakfast, Lunch, Dinner, and Desserts
 * All images point to local high-resolution photography in images/
 */

const CATEGORIES = [
  {
    name: "Breakfast",
    description: "Quick morning meals, omelettes, and warm toasts",
    image: "images/veg-omelette.jpg"
  },
  {
    name: "Lunch",
    description: "Flavorful rice bowls and comforting midday plates",
    image: "images/egg-fried-rice.jpg"
  },
  {
    name: "Dinner",
    description: "Hearty curries, creamy pasta, and crisp stir-fries",
    image: "images/sri-lankan-chicken-curry.jpg"
  },
  {
    name: "Desserts",
    description: "Sweet pancakes and refreshing tropical fruit bowls",
    image: "images/chocolate-banana-pancakes.jpg"
  }
];

const RECIPES = [
  {
    id: 1,
    name: "Egg Fried Rice",
    category: "Lunch",
    image: "images/egg-fried-rice.jpg",
    prepTime: "10 min",
    cookTime: "12 min",
    cookMinutes: 12,
    servings: "2 servings",
    difficulty: "Easy",
    popular: true,
    description: "Golden wok-tossed rice with fluffy scrambled eggs, crisp carrots, sweet green peas, and savory soy sauce.",
    ingredients: [
      { name: "rice", amount: "2 cups cooked" },
      { name: "eggs", amount: "3 large" },
      { name: "onions", amount: "1 medium, diced" },
      { name: "garlic", amount: "2 cloves, minced" },
      { name: "carrots", amount: "1/2 cup, diced" },
      { name: "green peas", amount: "1/3 cup" },
      { name: "soy sauce", amount: "2 tbsp" },
      { name: "oil", amount: "2 tbsp" },
      { name: "salt", amount: "to taste" }
    ],
    steps: [
      "Heat 1 tablespoon of oil in a wide pan or wok over medium-high heat.",
      "Beat the eggs with a pinch of salt, scramble until softly set, then transfer to a plate.",
      "Add the remaining oil, then sauté diced onions, minced garlic, carrots, and green peas for 3 minutes.",
      "Tip in the cooled cooked rice, breaking up any clumps, and toss briskly for 4 minutes.",
      "Pour soy sauce evenly over the rice, fold the scrambled eggs back in, toss for 2 minutes, and serve hot."
    ]
  },
  {
    id: 2,
    name: "Spicy Tomato Rice",
    category: "Lunch",
    image: "images/tomato-rice.jpg",
    prepTime: "10 min",
    cookTime: "20 min",
    cookMinutes: 20,
    servings: "2 servings",
    difficulty: "Easy",
    popular: true,
    description: "Aromatic spiced rice simmered with ripe red tomatoes, ginger, garlic, turmeric, and fresh coriander.",
    ingredients: [
      { name: "rice", amount: "1.5 cups" },
      { name: "tomatoes", amount: "3 ripe, chopped" },
      { name: "onions", amount: "1 large, sliced" },
      { name: "garlic", amount: "3 cloves, minced" },
      { name: "ginger", amount: "1 tsp, grated" },
      { name: "chili powder", amount: "1 tsp" },
      { name: "turmeric", amount: "1/2 tsp" },
      { name: "oil", amount: "2 tbsp" },
      { name: "salt", amount: "to taste" },
      { name: "coriander", amount: "2 tbsp, chopped" }
    ],
    steps: [
      "Rinse the rice thoroughly and soak for 10 minutes, then drain.",
      "Heat oil in a deep pot over medium heat and sauté sliced onions until golden brown.",
      "Stir in garlic and ginger for 30 seconds until fragrant, then add chopped tomatoes, chili powder, turmeric, and salt.",
      "Cook down for 5 minutes until tomatoes soften into a thick, glossy masala.",
      "Add the drained rice and 2.5 cups of water, bring to a gentle boil, cover, and simmer on low for 12 minutes.",
      "Fluff with a fork, garnish with fresh coriander leaves, and serve warm."
    ]
  },
  {
    id: 3,
    name: "Vegetable Cheese Omelette",
    category: "Breakfast",
    image: "images/veg-omelette.jpg",
    prepTime: "8 min",
    cookTime: "7 min",
    cookMinutes: 7,
    servings: "1 serving",
    difficulty: "Easy",
    popular: true,
    description: "Fluffy golden three-egg omelette folded around sautéed bell peppers, sweet onions, tomatoes, and melted cheese.",
    ingredients: [
      { name: "eggs", amount: "3 large" },
      { name: "onions", amount: "2 tbsp, finely diced" },
      { name: "tomatoes", amount: "2 tbsp, diced" },
      { name: "bell pepper", amount: "3 tbsp, diced" },
      { name: "cheese", amount: "1/3 cup, grated" },
      { name: "butter", amount: "1 tbsp" },
      { name: "salt", amount: "to taste" },
      { name: "black pepper", amount: "1/4 tsp" }
    ],
    steps: [
      "Whisk eggs with salt and black pepper in a bowl until lightly frothy.",
      "Melt butter in a non-stick skillet over medium heat and sauté onions and bell peppers for 2 minutes.",
      "Pour in the beaten eggs, tilting the pan so they coat the base evenly.",
      "When the edges set, scatter diced tomatoes and grated cheese across one half.",
      "Fold the omelette gently in half, cook 1 minute until the cheese melts, and slide onto a warm plate."
    ]
  },
  {
    id: 4,
    name: "Classic Cinnamon French Toast",
    category: "Breakfast",
    image: "images/french-toast.jpg",
    prepTime: "5 min",
    cookTime: "10 min",
    cookMinutes: 10,
    servings: "2 servings",
    difficulty: "Easy",
    popular: false,
    description: "Thick slices of bread dipped in spiced egg custard, griddled in butter until crisp, and finished with honey.",
    ingredients: [
      { name: "bread", amount: "4 thick slices" },
      { name: "eggs", amount: "2 large" },
      { name: "milk", amount: "1/2 cup" },
      { name: "sugar", amount: "1 tbsp" },
      { name: "cinnamon", amount: "1/2 tsp" },
      { name: "butter", amount: "1.5 tbsp" },
      { name: "honey", amount: "2 tbsp, to serve" }
    ],
    steps: [
      "Whisk eggs, milk, sugar, and ground cinnamon together in a shallow dish.",
      "Heat half the butter in a wide skillet over medium heat.",
      "Dip each slice of bread into the custard mixture for 10 seconds per side.",
      "Cook on the skillet for 2 to 3 minutes per side until deeply golden brown and crisp at the edges.",
      "Stack warm on plates and serve with a pat of butter and warm honey drizzle."
    ]
  },
  {
    id: 5,
    name: "Avocado & Poached Egg Toast",
    category: "Breakfast",
    image: "images/avocado-egg-toast.jpg",
    prepTime: "7 min",
    cookTime: "5 min",
    cookMinutes: 5,
    servings: "1 serving",
    difficulty: "Medium",
    popular: false,
    description: "Crisp toasted bread layered with lemon-mashed avocado, juicy tomatoes, and a velvety soft-poached egg.",
    ingredients: [
      { name: "bread", amount: "2 slices sourdough" },
      { name: "avocado", amount: "1 ripe" },
      { name: "eggs", amount: "2 large" },
      { name: "tomatoes", amount: "4 cherry, halved" },
      { name: "lemon", amount: "1 tsp juice" },
      { name: "salt", amount: "to taste" },
      { name: "black pepper", amount: "1/4 tsp" }
    ],
    steps: [
      "Toast the bread slices until golden and crisp.",
      "Mash the ripe avocado with fresh lemon juice, a pinch of salt, and cracked black pepper.",
      "Bring a small saucepan of water to a gentle simmer, swirl the water, and poach eggs for 3 minutes.",
      "Spread the creamy avocado generously over the warm toast.",
      "Top with the poached eggs and halved tomatoes, season with extra pepper, and serve immediately."
    ]
  },
  {
    id: 6,
    name: "Creamy Garlic Chicken Pasta",
    category: "Dinner",
    image: "images/chicken-pasta.jpg",
    prepTime: "12 min",
    cookTime: "18 min",
    cookMinutes: 18,
    servings: "2 servings",
    difficulty: "Medium",
    popular: true,
    description: "Tender seared chicken strips tossed with al-dente pasta in a rich garlic, butter, cream, and cheese sauce.",
    ingredients: [
      { name: "pasta", amount: "200g" },
      { name: "chicken", amount: "250g breast, sliced" },
      { name: "garlic", amount: "4 cloves, minced" },
      { name: "cream", amount: "3/4 cup" },
      { name: "butter", amount: "1.5 tbsp" },
      { name: "cheese", amount: "1/2 cup, grated" },
      { name: "black pepper", amount: "1/2 tsp" },
      { name: "salt", amount: "to taste" },
      { name: "parsley", amount: "1 tbsp, chopped" }
    ],
    steps: [
      "Boil pasta in salted water according to package directions until al dente; reserve 1/4 cup pasta water.",
      "Season sliced chicken with salt and black pepper, then sear in melted butter for 5 to 6 minutes until golden.",
      "Add minced garlic to the pan and stir for 45 seconds until aromatic.",
      "Pour in the cream and simmer gently for 3 minutes, then stir in grated cheese until silky.",
      "Toss in the drained pasta (adding a splash of pasta water if needed), garnish with parsley, and serve hot."
    ]
  },
  {
    id: 7,
    name: "Sri Lankan Chicken Curry",
    category: "Dinner",
    image: "images/sri-lankan-chicken-curry.jpg",
    prepTime: "15 min",
    cookTime: "30 min",
    cookMinutes: 30,
    servings: "4 servings",
    difficulty: "Medium",
    popular: true,
    description: "Rich, deeply spiced coconut milk chicken curry slow-simmered with roasted curry powder, ginger, and tomatoes.",
    ingredients: [
      { name: "chicken", amount: "500g, cut into pieces" },
      { name: "onions", amount: "1 large, sliced" },
      { name: "tomatoes", amount: "2 medium, chopped" },
      { name: "garlic", amount: "4 cloves, crushed" },
      { name: "ginger", amount: "1 tbsp, minced" },
      { name: "coconut milk", amount: "1 cup" },
      { name: "curry powder", amount: "2 tbsp" },
      { name: "turmeric", amount: "1/2 tsp" },
      { name: "oil", amount: "2 tbsp" },
      { name: "salt", amount: "to taste" }
    ],
    steps: [
      "Mix chicken pieces with curry powder, turmeric, and salt; rest for 10 minutes.",
      "Heat oil in a clay pot or heavy saucepan and sauté sliced onions until soft and golden.",
      "Add crushed garlic and minced ginger, stirring for 1 minute before adding chopped tomatoes.",
      "Add the marinated chicken and sear for 5 minutes until coated in spices.",
      "Pour in the coconut milk and 1/2 cup water, cover partially, and simmer gently for 20 minutes until tender."
    ]
  },
  {
    id: 8,
    name: "Vegetable Stir-Fry Noodles",
    category: "Dinner",
    image: "images/veg-noodles.jpg",
    prepTime: "12 min",
    cookTime: "10 min",
    cookMinutes: 10,
    servings: "2 servings",
    difficulty: "Easy",
    popular: false,
    description: "Springy noodles wok-tossed with crunchy carrots, sweet bell peppers, cabbage, garlic, and savory soy glaze.",
    ingredients: [
      { name: "noodles", amount: "200g" },
      { name: "carrots", amount: "1 medium, julienned" },
      { name: "bell pepper", amount: "1 medium, sliced" },
      { name: "cabbage", amount: "1 cup, shredded" },
      { name: "onions", amount: "1 small, sliced" },
      { name: "garlic", amount: "2 cloves, minced" },
      { name: "soy sauce", amount: "2.5 tbsp" },
      { name: "oil", amount: "1.5 tbsp" },
      { name: "salt", amount: "to taste" }
    ],
    steps: [
      "Cook noodles until just tender, drain well, and toss with a teaspoon of oil so they stay separate.",
      "Heat oil in a hot wok or skillet and stir-fry onions and garlic for 45 seconds.",
      "Add carrots, bell pepper, and shredded cabbage; toss over high heat for 3 minutes until crisp-tender.",
      "Add the noodles and drizzle with soy sauce and a pinch of salt.",
      "Toss briskly for 2 minutes until evenly glazed and steaming hot."
    ]
  },
  {
    id: 9,
    name: "Chocolate Banana Pancakes",
    category: "Desserts",
    image: "images/chocolate-banana-pancakes.jpg",
    prepTime: "10 min",
    cookTime: "12 min",
    cookMinutes: 12,
    servings: "2 servings",
    difficulty: "Easy",
    popular: true,
    description: "Tender cocoa-infused pancakes layered with sweet ripe banana slices and finished with warm honey drizzle.",
    ingredients: [
      { name: "flour", amount: "1 cup" },
      { name: "banana", amount: "2 ripe" },
      { name: "eggs", amount: "1 large" },
      { name: "milk", amount: "3/4 cup" },
      { name: "cocoa powder", amount: "2 tbsp" },
      { name: "sugar", amount: "2 tbsp" },
      { name: "butter", amount: "1 tbsp, melted" },
      { name: "honey", amount: "2 tbsp, to serve" }
    ],
    steps: [
      "Mash one ripe banana in a bowl and whisk with the egg, milk, and melted butter.",
      "Sift in flour, cocoa powder, and sugar; whisk gently until a smooth batter forms.",
      "Lightly butter a non-stick skillet over medium-low heat and pour 1/4 cup batter per pancake.",
      "Cook for 2 minutes until bubbles form on top, flip, and cook 1 to 2 minutes more.",
      "Stack pancakes high with sliced remaining banana and drizzle generously with honey."
    ]
  },
  {
    id: 10,
    name: "Honey Apple Yogurt Bowl",
    category: "Desserts",
    image: "images/mango-parfait-bowl.jpg",
    prepTime: "8 min",
    cookTime: "0 min",
    cookMinutes: 0,
    servings: "1 serving",
    difficulty: "Easy",
    popular: false,
    description: "Chilled creamy yogurt bowl layered with crisp fresh apple slices, toasted rolled oats, cinnamon, and golden honey.",
    ingredients: [
      { name: "apple", amount: "1 crisp, sliced" },
      { name: "yogurt", amount: "1 cup thick yogurt" },
      { name: "oats", amount: "1/3 cup toasted oats" },
      { name: "honey", amount: "1.5 tbsp" },
      { name: "cinnamon", amount: "1/4 tsp" },
      { name: "chia seeds", amount: "1 tbsp" }
    ],
    steps: [
      "Spoon chilled thick yogurt into a serving bowl and swirl with half the honey.",
      "Arrange fresh crisp apple slices neatly across the yogurt.",
      "Scatter toasted rolled oats and chia seeds over the bowl for crunch.",
      "Dust lightly with cinnamon, finish with the remaining honey drizzle, and serve chilled."
    ]
  }
];

const GALLERY_EXTRAS = [
  {
    title: "Fresh Kitchen Prep",
    category: "Kitchen & Prep",
    image: "images/hero-kitchen.jpg",
    caption: "Crisp bell peppers and fresh farm produce ready on the chopping board.",
    recipeId: 3
  },
  {
    title: "Aromatic Spice Table",
    category: "Kitchen & Prep",
    image: "images/kitchen-spread.jpg",
    caption: "Hand-prepped vegetables and fragrant spices for homestyle cooking.",
    recipeId: 7
  }
];
