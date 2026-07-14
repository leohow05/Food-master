import { Recipe } from "./types";
import singaporeKatongLaksaImg from "./assets/images/singapore_katong_laksa_1784007452090.jpg";
import hainaneseChickenRiceImg from "./assets/images/hainanese_chicken_rice_1784007463861.jpg";
import singaporeChiliCrabImg from "./assets/images/singapore_chili_crab_1784007476123.jpg";

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDz5QH6bb6Vr92YEMgomglVue35k8xcOGtP041fJnx95DGUuuSmGxzK-GK8DJv9xRSPXdFSD-Bt-VmE_fqVj6yB_OREih5qQG5g0xiGez1a4d0romCFPYJIQdlhAayBeOtBdZmkgWAzGe4gxnusC7y8T-sDhcV8YghaCXuMGZVyY0pbcjtbZOV6cW5QIpoOsfPQI8_NDmqjb0xRSextsJl6NsBWiZATkEjE3puNG06HCXzmS7upkNYpOQ";

export const CUISINE_IMAGES: Record<string, string> = {
  Japanese: "https://lh3.googleusercontent.com/aida-public/AB6AXuASEa2-oOSfnZwSFsJlWYBvUMEjSpuuCR0g3ONY5gWeJPXQhbro3ZGzhUrQoxCJBFaoFOB4SBY2l8X8In9mTE_28fTVV6deDJ-3BFxrbMXf0MAjD9LOQqIJ0lalA_EWAPHE0mposO7FmzE7anbD1s0HQwQSItE8szzS1121SaY3zqhcce6A6893dlxn__CXjM1gzZfsZ6jkov4gsn-EvxJMaXlR-KtyHrCkr_ZXX5A7DxX_cO8ORSG-Rg",
  Italian: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDli_4G0BjynAC4mkGNyePzU3kIld54YrvECbrYG-VPpnUAt50oHT2liW_yyFhrpQL6RfzmpCPmfhtwWcaxMSVRzHDdi8Sb8PHImQmuj_R4Z5EPof_trioKlG1ZPr3x3AykxCCQ7xvMokeWO9d-1ShdXDcE7tjzri0z3WGeTXDcjWGcwX7lLkA_7I-ma1jD_0loFu3_NmtZT8nHYHbaZ4fiJ55hvwAUY2UjNW4tnS6XDJyhBwFj-6irQ",
  Chinese: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrKvfTpRdX9Oqj--l50KgFP1o64tF-Fr_e42P3yhIftA0YFvbGkziUYDRs6lA3qdopNqeP-GI9xPvJbMBN5yW3hBCC70E5RAwLAJjeJWZu_ocX7wn6E3k5xwrl-KseO4K0SXdnQo4lxYA0U0fb2cmpLz5hp46p-ghujeCHuB2uMyAF5XdXPfgab_7uBjjGiDQKhNikgh4I_8ktMdhr6JgX4rDDB6UpEf5TsDbHyJNn5XXT2MEptDansg",
  Mexican: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnEcrslI7M1j7lOBmwFJP1RPF6DUcpnazEuC0gOTw26eXM7CFEX1OPxvIq3vBG-DJKMZxiYfzwqdoz-fApNN6NdL7ny_zj2iDpn_kqFEsQscX9n_cVG5Q4L_1fYzGj_9YHD1dExOYemfu46JPk4wcwo696utnjJVKHHwgSyzYIuRSGpmOItJYYytmsEDx0yoJL6PTxNyuWDb15_8KzqBohETUgdYdjeJCTq0O7aX9MW-kiDOmEV13ucQ",
  Korean: "https://lh3.googleusercontent.com/aida-public/AB6AXuANHkKU6-mLETfOCnOwyOt_pKv26vhhNzv870yok_UNcRpxOvMNBaT_WSO79bkddqec71cZKN-gDq1XQckts8a3wQRtWwOoCHb0rqCY-H4TijSD9-BlpEHhlRJ-LO89Yz4T71t1BLm69khAKLPxBtoHFqXrM8jquJ2YKJBdwrWsjWpUGpEVQDtCUFbBtHeO7NHM8yVPxtU44XL8VYy4LYHtWVcsdDeKdv2JzuSeLVH7Y3g2xDuApwhW8Q",
  American: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdcLQmk2jBpiI6_zMBTFqH49v__mqAl6ZTuvGLc3nCgHW7rtxH_cpfRrLvbrRwAeOmgrgKsXEGQT1WkRsrF_JZLbXka57L1LsVS-NJ0_Y9riQTDuTiUR8ePv9p4aosSqN4syLLUzYGbWgXytMj69c3vOR1IwWUXAY8ROl6smffrGtxE1NVprAHaq97WRH5iCj2Z3e4ZlzhjzJtrs0QeEQAPELzVdZzAr5Fl3a0QQdC_BM6OMaz7nF97w",
  Thai: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRP6GqUuG6yV6p7dChfq5q0ZQU2eDokc9a699Vnlnm94oOaj-lZ3xm3C_-wbTMiWNIVWuAjubAlLvTLLnAeNUBSYWzwSMqdSGvWGIOj7chdmWYkiocXbQRL_unhkuTYSk9bQD0qcCfnkTjTnQL6umdzkX4ta6GU0smS_LQ1e203rFUHvRXATH-mxun_46SPIv1P9J7T1soHa0xEG_98GV8CnI1_ovcSPlmabosKpfzs29Bd8JmsEGZ0Q",
  Mediterranean: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-o4QpKWxbmJn5ug0A5KD19QiR1eN76_Uo0AL1y2t4-tjGu1Cq9KTSD1OTRFAYPeOar4Smj6nAjjVxKDEMzW7OJXgisupzG2H1AoEK--V2GzY5S8EMSrwaUbuGS1nRe2pCqC-borat32w3axx-ryowe5jM9iYqTAC73_1iUwG6TENo2X1T2vPuLneQtykljMN8hrjtPv6kwzvc1LugdwM_QKTaV1LSWDas3idK0zmm7ZvdJHYLUGUJ-A",
  Singaporean: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&auto=format&fit=crop&q=80"
};

export const TOMATO_PROMO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDhXLrCyJHV-NSDcHpaVGSSI7PoubZ8D4q-PQcNpbvlTPb09lncFXijy2i9wWbKksoPk1waxkH-0aAQfg38VYA8nv-NXaHZFvJQ8kI_aSbI5zn5R8_RXYuP9GCdrEq1vDtzx1kPrETvn73QiUpHLCQIJJUNfHKqhw19t5BaKfQPnXGyGB4nCO9dvRips-PP6aMMEYxODkrjqGO_AwG7oAa4gFpPf-j9nqvYQx3BbaiKsvwOCLjIrDJ_MA";

export const FIND_RECIPE_BENTO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCV2jUFd_HpFvaY-ZpTA6gVyem3Oh2Kd9VxkLah1zvc-a0Jb920pls0W2GCJZtOBH5GyrFc2V1RA0lxeGMz_qhe1PHoZIfTx067IFNJ0-w_UK1PbPte4MQRvwwhMpMnzuve_Ld9NTpymHHdn-6Rl4syQkzf5827nL9Sd0J2J54U8ViTNqFdLQ2go7Jl1pUveCNg5nkSYc0HZ65NJnnSLiJ0j_bR6tXSHRlD3iT4EIZHjFwChK7BfR3Dtg";
export const SPIN_MEAL_BENTO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBZoScK_bLQh-dvxJQYoqEiUNXY6tgsJ9F3Q_pnR_RupMJAjtQ6bLvx45XzBdnN4E7759Mvj_NreBAWP4KGC7c01hGoS7aaiNlVrs8JMHJZOtroUV6aQ62330dkQ-aRQVUxCgQkxzSezYIqhVSAztpEUnxodn1bnvewN49Zzr_4Yw3TwlyQwUWoi9K8bl2MS22cDTiWBoBFQiAW_ikB0aHPcU2Kfx4NgbKE6oAGakwhI8qAGd9koe19dA";

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: "creamy-tomato-penne",
    title: "Creamy Tomato Penne",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfUM7P2JGp6NvqLS86c6PoW8bnMxNZYytcv7HI0OzrEwfK5QwQJvPHxBht73p8sRrd-H1-Q6ViaLpny2lH55TkDvtlDQ0ljemXpLKsHgeq2RmxtVk1XXsJJ9rkeVoXFqPIYvaBl1iR6x0nPqI3i8rF2vzyDt_25cGWn5Mysw5hLneMIPc38qbceE6fI8TpN4WapM9_hXcBJ6IDZ0xYwSe_q6dETDZwjee6jiddARUuPGFkLA99o5MiZw",
    cuisine: "Italian",
    region: "Tuscany",
    dietaryTags: ["Italian", "Vegetarian"],
    prepTime: 20,
    difficulty: "Easy",
    description: "Rich saffron orange-red tomato cream sauce penne topped with fresh basil.",
    recommendationReason: "Recommended because you have tomatoes and like savory flavors.",
    matchPercentage: 95,
    youHave: [
      { name: "Tomatoes", amount: "3 ripe" },
      { name: "Penne Pasta", amount: "200g" }
    ],
    youNeed: [
      { name: "Heavy Cream", amount: "100ml" },
      { name: "Garlic", amount: "2 cloves" },
      { name: "Fresh Basil", amount: "1 bunch" }
    ],
    previewSteps: [
      { number: 1, title: "Boil Pasta", description: "Cook penne in salted boiling water according to package instructions until al dente." },
      { number: 2, title: "Prepare Sauce", description: "Sauté garlic, then add crushed tomatoes and let simmer before blending in rich heavy cream." },
      { number: 3, title: "Toss and Serve", description: "Combine pasta with sauce, garnish with fresh basil and generous parmesan." }
    ],
    servings: 2,
    rating: 4.8,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "zesty-garlic-shrimp",
    title: "Zesty Garlic Shrimp",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAViq6OWUOFplkYeDlbj33nVo42MB5dn4hwGkYfLfJXn-FXkSbYKXuSVK_3WygM15WJvQfg9ej_d9Pruw_srkb6CB-oIcWm-ducsJ3J4EiVuovfK5Vs-oS6JkdYWEcTrRxtpR73bRNAnpIEBtk5fApvQ2bN6Jct84fbFEQXmmrcwgxMbtI5kQ9ba-J1ViWlTlnFOZM_ik-qU2eF0Sc1kwVyBfdJy9gDYCANCOtY4EM8ch-9rncAJ9C3vg",
    cuisine: "Seafood",
    region: "Amalfi Coast",
    dietaryTags: ["Seafood", "Keto"],
    prepTime: 15,
    difficulty: "Medium",
    description: "Succulent garlic butter shrimp served sizzling in a cast-iron skillet.",
    recommendationReason: "Recommended because you have garlic and lemon in your pantry.",
    matchPercentage: 88,
    youHave: [
      { name: "Garlic", amount: "4 cloves" },
      { name: "Lemon", amount: "1 unit" }
    ],
    youNeed: [
      { name: "King Prawns/Shrimp", amount: "300g" },
      { name: "Butter", amount: "50g" },
      { name: "Parsley", amount: "1 small bunch" }
    ],
    previewSteps: [
      { number: 1, title: "Prep Shrimp", description: "Clean and peel the shrimp, keeping the tails intact if preferred. Pat completely dry." },
      { number: 2, title: "Sauté Garlic", description: "Melt butter in skillet, gently cook garlic until fragrant without letting it brown." },
      { number: 3, title: "Flash Fry Shrimp", description: "Add shrimp to pan, cook 2 minutes each side until pink, finish with lemon juice and parsley." }
    ],
    servings: 2,
    rating: 4.5,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "roasted-chickpea-salad",
    title: "Roasted Chickpea Salad",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbhgwQ7tyWisPZ6eIBUVwPoAy03jnO9qxQPsrnI7DuQerxBnin7Wybdz1HhJbOoQEW4EEgExg8EfWl01JVixI3ehYChX3SKJht4mPI_LfiSMR0jfmD5G7qqt3IfeN9CCy9IqTMlsT7-2GHMrZd4gImGszQotksG4jv7vyPwtQEi6u7YXpr44vxWidYXpCAliSriw00Sk9u-WGMTU0YnzL1_a_sh9riOHvY-nCYJ8sByYR87SLYgvLtcA",
    cuisine: "Greek",
    region: "Peloponnese",
    dietaryTags: ["Greek", "Vegan Opt."],
    prepTime: 25,
    difficulty: "Easy",
    description: "A colorful mosaic of crispy golden chickpeas, cherry tomatoes, cucumbers, and olives.",
    recommendationReason: "Recommended because you have tomatoes and like savory flavors.",
    matchPercentage: 92,
    youHave: [
      { name: "Tomatoes", amount: "150g" },
      { name: "Cucumber", amount: "1 unit" }
    ],
    youNeed: [
      { name: "Canned Chickpeas", amount: "400g" },
      { name: "Feta Cheese", amount: "100g" },
      { name: "Kalamata Olives", amount: "50g" }
    ],
    previewSteps: [
      { number: 1, title: "Roast Chickpeas", description: "Drain and toss chickpeas with olive oil and spices, bake at 200°C for 20 minutes." },
      { number: 2, title: "Chop Vegetables", description: "Dice tomatoes, cucumbers, and olives into neat bite-sized pieces." },
      { number: 3, title: "Combine and Dress", description: "Mix vegetables and roasted chickpeas, toss with olive oil, lemon juice, and crumble feta over top." }
    ],
    servings: 3,
    rating: 4.6,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "sun-kissed-quinoa-power-bowl",
    title: "Sun-Kissed Quinoa Power Bowl",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2tOEfi7ZXX8XTMraVGyvVMCkgCDSOkqq448-5KtTkM0CAZoNQHeNuDjFC6umAaube9gflBSzJU137zK17DPRVzZxkTS3F0PG4PZXlrR3qxMnLjanX9okFMga-XWGmR7vZZuzq0xKeJA8luN6bCsjyD0hdHRwEggPGBhfFxGXclZUHwyb_fgz1Cu8VZikhwAtw_rbDMWGytwSnwlp2hzTXpXS6kJJlKeGsOHFTVWBXMRR7iTqSf1tuFQ",
    cuisine: "Mediterranean",
    region: "Aegean Islands",
    dietaryTags: ["Mediterranean", "Vegetarian"],
    prepTime: 25,
    difficulty: "Medium",
    description: "A healthy, nourishing bowl packed with fluffy quinoa, crispy chickpeas, edamame, and rich avocado slices.",
    recommendationReason: "High protein, fiber-rich, and beautifully matches your vegetarian preferences.",
    matchPercentage: 97,
    youHave: [
      { name: "Organic Quinoa", amount: "150g" },
      { name: "Extra Virgin Olive Oil", amount: "2 tbsp" }
    ],
    youNeed: [
      { name: "Ripe Hass Avocado", amount: "1 unit" },
      { name: "Canned Chickpeas", amount: "400g" },
      { name: "Fresh Basil Leaves", amount: "1 bunch" }
    ],
    previewSteps: [
      { number: 1, title: "Prepare Grains", description: "Rinse the quinoa thoroughly and boil in salted water for 12-15 minutes until fluffy." },
      { number: 2, title: "Roast Chickpeas", description: "Toss chickpeas with olive oil and saffron, roast at 200°C until crispy and golden." },
      { number: 3, title: "Assemble Bowl", description: "Layer quinoa, chickpeas, and fresh veggies. Drizzle with lemon-tahini dressing." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "one-pan-roasted-onion-chicken",
    title: "One-Pan Roasted Onion Chicken",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCGA_xM55RUHTT7NwN_AismMq3Ol6TSpXP-nwsYIdfIBTBw9zh9C0AluT8NxMskUJgR_v3epv507DyQYXdZqlmSOx-oYmaWZat2PacoTRh3c7UHsTUgn1QlgekurPCVGxo5gyGYg5UWe6b-Kh3kq4P-U-hiDxfWEcjMJlPDqVfpQI_lV-KWrTl6LIyOz-RDeN6K1VLc6Y0VnZpX0TlSGa1DnCQs9bW1ku1D5YKDnN0IqZVuXoB8KW1mg",
    cuisine: "American",
    region: "Texas",
    dietaryTags: ["American"],
    prepTime: 35,
    difficulty: "Easy",
    description: "Crispy chicken thighs roasted with sweet red onions and rosemary on a single pan.",
    recommendationReason: "Perfect cozy weeknight dinner using pantry basics.",
    matchPercentage: 90,
    youHave: [
      { name: "Chicken Thighs", amount: "4 units" },
      { name: "Onion", amount: "1 large red" }
    ],
    youNeed: [
      { name: "Garlic", amount: "4 cloves" },
      { name: "Rosemary", amount: "2 sprigs" },
      { name: "Olive Oil", amount: "2 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Preheat Oven", description: "Set oven to 200°C. Pat chicken skin completely dry to ensure absolute crispiness." },
      { number: 2, title: "Slice and Season", description: "Cut onion into thick wedges. Toss chicken and onions with oil, rosemary, garlic, salt, and pepper." },
      { number: 3, title: "Roast", description: "Lay everything on a baking sheet. Roast for 30-35 minutes until chicken is golden and onions are caramelized." }
    ],
    servings: 2,
    rating: 4.7,
    cookedCount: 1,
    isFavorite: false
  },
  {
    id: "quick-chicken-onion-risotto",
    title: "Quick Chicken & Onion Risotto",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfAzBa_XT9YYwmTizZNHAAOZYSGHqJlO9xS-ArrdGUqpWOZK0l_zfEj8OZGdgKRqGsFx1bZWdo2g2NxsPVW_ycAhCzHEBSrJQCoJxYL76H-4aqKaPpC4HryNljAf_wf6_wVlsrbyeoOaM-vexBgfJM14BFv2Qvi1IANVxCUqQ2GszD1jvNizTSO450H25ouOLjfIy83YWEN7NthmFnNm4ltlxaQ-LRFJevSYRWuOlnhkMhYhfcTE7RBw",
    cuisine: "Italian",
    region: "Lombardy",
    dietaryTags: ["Italian", "Gluten-Free"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Creamy risotto folded with pan-seared chicken cubes and sweet caramelized yellow onions.",
    recommendationReason: "Italian favorite that turns chicken and onions into pure comfort food.",
    matchPercentage: 85,
    youHave: [
      { name: "Chicken Breast", amount: "200g" },
      { name: "Onion", amount: "1 yellow" }
    ],
    youNeed: [
      { name: "Arborio Rice", amount: "150g" },
      { name: "Chicken Broth", amount: "500ml" },
      { name: "Parmesan Cheese", amount: "50g" }
    ],
    previewSteps: [
      { number: 1, title: "Sauté Aromatics", description: "Finely dice onions and cook in butter/olive oil until translucent and sweet." },
      { number: 2, title: "Toast Rice", description: "Add Arborio rice, cook for 2 minutes to toast the grains, then add diced chicken." },
      { number: 3, title: "Simmer with Broth", description: "Add warm broth one ladle at a time, stirring constantly, until the rice is creamy and cooked. Fold in parmesan." }
    ],
    servings: 2,
    rating: 4.4,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "savory-chicken-onion-noodles",
    title: "Savory Chicken & Onion Noodles",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1nBxkWCuGrk1LWOJC0nkk_MR9Hz1UOTBoXWVuA1arLSyplok_JoLtHw6WdT88UdPV0fpKUYSaF6xzZ_6vVVIcO4-E85L6TedEX7uerXQJGeOt88ondnB6rFsaX51oMh6vkdopNSySPH-2wRe8_V60Pp6YZ5CCmt8aLXRk3nRH8sNQoIOnT9EDxssOZDR3WdopuvyQ_nI2moWJcv9ghsX3d6n2YZMigon1mbJoRHka4YW-CpjReoQqAQ",
    cuisine: "Chinese",
    region: "Guangdong",
    dietaryTags: ["Chinese"],
    prepTime: 15,
    difficulty: "Easy",
    description: "Stir-fried noodles with chicken strips, sweet caramelized onions, and a deeply savory soy glaze.",
    recommendationReason: "Ultra fast stir-fry perfect for using up chicken and onions.",
    matchPercentage: 91,
    youHave: [
      { name: "Chicken", amount: "150g" },
      { name: "Onion", amount: "1 small" }
    ],
    youNeed: [
      { name: "Noodles", amount: "150g" },
      { name: "Soy Sauce", amount: "2 tbsp" },
      { name: "Bok Choy", amount: "1 head" }
    ],
    previewSteps: [
      { number: 1, title: "Boil Noodles", description: "Cook noodles according to pack directions, drain, and set aside." },
      { number: 2, title: "Wok Fry", description: "Sauté onions and sliced chicken on high heat until the chicken is cooked through and caramelized." },
      { number: 3, title: "Sauce and Toss", description: "Add noodles, bok choy, and pour in soy sauce mixed with a touch of sugar. Toss vigorously for 2 minutes." }
    ],
    servings: 1,
    rating: 4.6,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "avocado-heaven",
    title: "Avocado Heaven",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsn3OnT48GQWTHY2-4G0vUqwOMw_xtnnu1tHlHf_v9GepRnfkKik0nMOrA3Epixw5LPGgC_noVxslOx2JX-SRAhbQk1LJG5KXfKCCAkO-AVMsQ8FPRjwyKzHjF_ufZrVFM54folPqhMz8sOJNm4WUim-Mi95eozZppb3NcSJXj6IEhGCE0Sja-BNVjbSiGNUt3GWQyyFbXB6-F6H49X_lP-SIGeniZND5OXy-D1LL21RcrQ_O7RoeLvg",
    cuisine: "American",
    region: "California",
    dietaryTags: ["American", "Vegetarian"],
    prepTime: 15,
    difficulty: "Easy",
    description: "Artisanal crusty sourdough toast topped with thick mashed avocado, poached egg, and chili flakes.",
    youHave: [
      { name: "Sourdough Bread", amount: "2 slices" },
      { name: "Ripe Hass Avocado", amount: "1 unit" }
    ],
    youNeed: [
      { name: "Eggs", amount: "2 units" },
      { name: "Chili Flakes", amount: "1 tsp" },
      { name: "Microgreens", amount: "1 small handful" }
    ],
    previewSteps: [
      { number: 1, title: "Toast Bread", description: "Toast sourdough bread slices until beautifully golden brown and crispy." },
      { number: 2, title: "Mash Avocado", description: "Mash avocado with salt, pepper, and a squeeze of lime juice." },
      { number: 3, title: "Poach Egg", description: "Poach eggs in simmering water for 3 minutes. Assemble on toast and top with microgreens." }
    ],
    servings: 1,
    rating: 4.9,
    cookedCount: 3,
    isFavorite: true
  },
  {
    id: "classic-carbonara",
    title: "Classic Carbonara",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdTmZusxKv13IkYRlxHn1e5Dh-f5cUJ4u_KPbe5WtQNn8Ql2yv0PIylD5h_YOv9Qle5VjF0GMh_xGX7lTXlOp_9eWPHvEsLGNypjw1Q32Pngwv6S8tyrtlBAcdpurkeSDZVNmMeEsJh6plDgJoTXffL51krClT7-OzUNNUwfHFPpXvt7DxoZVCt3rjaj0dhJU6u7CXIOO-aUGOTlxbR50RedKPUDbZb_WPgZCOMg8U3Hl1-uChV_35vw",
    cuisine: "Italian",
    region: "Lazio (Rome)",
    dietaryTags: ["Italian"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Glistening spaghetti tossed with egg yolk, creamy pecorino cheese, and crispy pancetta.",
    youHave: [
      { name: "Spaghetti", amount: "180g" },
      { name: "Eggs", amount: "2 yolks" }
    ],
    youNeed: [
      { name: "Pancetta/Guanciale", amount: "80g" },
      { name: "Pecorino Romano", amount: "40g" },
      { name: "Black Pepper", amount: "1 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Cook Pork", description: "Render guanciale or pancetta in a skillet until crisp and golden. Remove from heat." },
      { number: 2, title: "Mix Cream", description: "Whisk egg yolks with grated pecorino cheese and plenty of coarsely ground black pepper." },
      { number: 3, title: "Emulsify", description: "Toss hot spaghetti with the pork fat, then off-the-heat mix in egg cream rapidly to create a rich glaze." }
    ],
    servings: 2,
    rating: 4.7,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "rainbow-quinoa",
    title: "Rainbow Quinoa",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2eKnxSMVjP3RX2kjqF2ypqjrGb2GQ6w2KLUZQIx_dTgL-0FqfzwMeUI9qRXsUB9__LD5OddXivbddfgya5kuwcn0algp6gYwLMI3eYAWDEK6w-LKV3iaDuwaSyzTL8QKgsY9RQnzLRez-45iuh9iyiJhpEXjrA_VKtoql5QikSGIa_Z5Rs2ZfMAulhN14OiDExUgkDhYx2oXkxUbidMNCzoopQD7v2fMeigXqEP9SS7mltT9Ucxwjdg",
    cuisine: "Mediterranean",
    region: "Andes",
    dietaryTags: ["Mediterranean", "Vegetarian"],
    prepTime: 20,
    difficulty: "Easy",
    description: "A fresh and vibrant grain salad filled with sweet potatoes, kale, chickpeas, and tahini dressing.",
    youHave: [
      { name: "Organic Quinoa", amount: "100g" },
      { name: "Canned Chickpeas", amount: "150g" }
    ],
    youNeed: [
      { name: "Sweet Potato", amount: "1 unit" },
      { name: "Kale", amount: "1 bunch" },
      { name: "Tahini", amount: "2 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Cook Grains", description: "Boil quinoa until fluffy, then allow to cool slightly." },
      { number: 2, title: "Roast Potato", description: "Cube sweet potato, toss with oil, and bake at 200°C for 15 minutes." },
      { number: 3, title: "Toss Salad", description: "Assemble kale, chickpeas, quinoa, and warm roasted sweet potato, drizzle with creamy tahini." }
    ],
    servings: 2,
    rating: 4.8,
    cookedCount: 2,
    isFavorite: true
  },
  {
    id: "the-gourmet-smash",
    title: "The Gourmet Smash",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfZN1GlA6BJF8sEFz4DRjd8Qpc1k0QuSBJvtJ60_2bW9w6-5Y_BexSgHMHIXWNuMBE7fu8X3eLW40VSJZuqQ_G5AY7_Q1OgKkb7XjqlQwWtaShpBtN5x5IzBivl-uAGEmIz62-1aNogNopGpIuaoRJNxWot3M9wqwBgToCnWwwJweGwNNSAYtBlooaT-xE5krMSyf31_fzABl2ZIYOCllwCGVmN7Uxgigq7VjUI1bZ9jRe-4SlnJMz5g",
    cuisine: "American",
    region: "New York",
    dietaryTags: ["American"],
    prepTime: 20,
    difficulty: "Medium",
    description: "Juicy artisan beef smash burger with melting cheddar cheese, caramelized onions, and toasted brioche bun.",
    youHave: [
      { name: "Onion", amount: "1 yellow" },
      { name: "Cheese", amount: "2 cheddar slices" }
    ],
    youNeed: [
      { name: "Minced Beef", amount: "250g" },
      { name: "Brioche Bun", amount: "1 unit" },
      { name: "Lettuce & Tomato", amount: "1 slice" }
    ],
    previewSteps: [
      { number: 1, title: "Caramelize Onions", description: "Slow cook thinly sliced onions in butter until dark, sweet, and sticky." },
      { number: 2, title: "Smash Burgers", description: "Roll beef balls, press flat into roaring hot skillet, sear to get gorgeous crispy lace edges." },
      { number: 3, title: "Assemble", description: "Top patty with cheddar cheese, let melt, and stack onto toasted bun with caramelized onions." }
    ],
    servings: 1,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "zesty-greek-bowl",
    title: "Zesty Greek Bowl",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAleGgVqtLC2SfrkKI7fbv2o03zlHsqvtXTIduUGgB3yVncL6nPv2KTZ3mrjWtjnh_fHkeslJTN37idihNldUTKgBjTbwiK3gZZN8eH2xVcFj7Wnfe20vI1Iuw49PPzP7-oIXZsbYSeGW-0mTvkg2kO0LIvEEr73uC5j_V2wqoclS_4CvOWcSQrqs0ZuCsPNpnEmMdwbGD9lrJr4SMzhTp7w-rsdgzeHk7SQJdgJeJzePTCb_7g6VQthw",
    cuisine: "Greek",
    region: "Crete",
    dietaryTags: ["Greek", "Vegan"],
    prepTime: 15,
    difficulty: "Easy",
    description: "Fresh cucumbers, kalamata olives, tomatoes, and organic citrus tahini drizzle.",
    youHave: [
      { name: "Cucumber", amount: "1 unit" },
      { name: "Tomatoes", amount: "2 ripe" }
    ],
    youNeed: [
      { name: "Kalamata Olives", amount: "10 units" },
      { name: "Tahini", amount: "2 tbsp" },
      { name: "Lemon", amount: "1 unit" }
    ],
    previewSteps: [
      { number: 1, title: "Chop Salad", description: "Chop cucumbers and tomatoes into medium chunks." },
      { number: 2, title: "Mix Dressing", description: "Whisk tahini, fresh lemon juice, garlic, and warm water until emulsified." },
      { number: 3, title: "Garnish and Serve", description: "Arrange chopped veggies, top with olives, drizzle dressing, and enjoy fresh." }
    ],
    servings: 1,
    rating: 4.8,
    cookedCount: 3,
    isFavorite: true
  },
  {
    id: "sage-risotto",
    title: "Sage Risotto",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgktD9AXhXz_ByqUkTacmltWv6GFu5NM-4hThLfnuWq-JCGPNcECnbKJeBJT2R1BQcVEt10Ssv0zsb9H-jKIXoo9L52IptLGmWFbsKGdHBzLyzfK8UFcJJ_jTL19VdJbaAlhpMYZD0cenln9NCI97-TcGrhsTbNvxmTciXKZIHAm7sLOR7w2jTFMABZpV4HFryKAsJ0wYayLetguuSbz5zEYeAxgESCiSTVKW-IDtj_Ix2dgDQsbuDew",
    cuisine: "Italian",
    region: "Veneto",
    dietaryTags: ["Italian", "Gluten-Free"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Creamy, rich arborio rice folded with buttered sage, sweet pumpkin puree, and grated grana padano.",
    youHave: [
      { name: "Arborio Rice", amount: "150g" },
      { name: "Butter", amount: "30g" }
    ],
    youNeed: [
      { name: "Fresh Sage Leaves", amount: "1 small bunch" },
      { name: "Pumpkin Puree", amount: "100g" },
      { name: "Parmesan", amount: "40g" }
    ],
    previewSteps: [
      { number: 1, title: "Crisp Sage", description: "Fry fresh sage leaves in sizzling butter until crispy, remove sage and reserve butter." },
      { number: 2, title: "Simmer Rice", description: "Toast rice, slow simmer with ladles of hot broth until cooked through." },
      { number: 3, title: "Fold Pumpkin", description: "Stir pumpkin puree, parmesan, and sage butter into the hot rice. Garnish with crispy leaves." }
    ],
    servings: 2,
    rating: 5.0,
    cookedCount: 12,
    isFavorite: true
  },
  {
    id: "thai-green-curry",
    title: "Thai Green Curry",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuASh_igZLZe-keXrVlSXqreqJZWLtNj0k2TSG1w9ocw0Rg8xWdm48HzkrV4zey932pDTGoe_9MD89FHTwqBHlVnpSeve8TavSH0inEMOdx7X1CGdGAez7KjZ95EaKIfk7knIdi1lD0PiMQL8oRWca2NwIbEjkfO8BwX-k1qPiYIml3i1JH34Nq7dGUwc7YYXg0HHSk9ePNwjl3eXN7kJKSLQ1UY9RB1P453dSOPdjlbPc0p-SpUl6XJ1w",
    cuisine: "Thai",
    region: "Central Thailand",
    dietaryTags: ["Thai", "Spicy"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Vibrant, aromatic coconut milk base curry cooked with fresh bamboo shoots, lemongrass, and thai sweet basil.",
    youHave: [
      { name: "Thai Green Curry Paste", amount: "2 tbsp" },
      { name: "Coconut Milk", amount: "400ml" }
    ],
    youNeed: [
      { name: "Chicken Breast", amount: "200g" },
      { name: "Thai Sweet Basil", amount: "1 bunch" },
      { name: "Bamboo Shoots", amount: "100g" }
    ],
    previewSteps: [
      { number: 1, title: "Fry Curry Paste", description: "Heat a tablespoon of coconut cream in a wok, fry green curry paste until extremely fragrant." },
      { number: 2, title: "Poach Chicken", description: "Pour remaining coconut milk, add chicken strips, and simmer gently until cooked." },
      { number: 3, title: "Add Veggies", description: "Throw in bamboo shoots and bell peppers, finish with fish sauce, sugar, and generous handful of thai basil." }
    ],
    servings: 2,
    rating: 4.8,
    cookedCount: 5,
    isFavorite: true
  },
  // NEW SPECIFIC REGIONAL DISHES
  {
    id: "szechuan-mapo-tofu",
    title: "Szechuan Mapo Tofu",
    imageUrl: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80",
    cuisine: "Chinese",
    region: "Szechuan",
    dietaryTags: ["Chinese", "Spicy"],
    prepTime: 15,
    difficulty: "Medium",
    description: "Silken tofu set in a spicy, numbing, and deeply savory sauce flavored with chili bean paste and ground Szechuan peppercorns.",
    youHave: [
      { name: "Silken Tofu", amount: "400g" },
      { name: "Garlic", amount: "3 cloves" }
    ],
    youNeed: [
      { name: "Doubanjiang (Chili Paste)", amount: "2 tbsp" },
      { name: "Szechuan Peppercorns", amount: "1 tsp" },
      { name: "Minced Beef or Mushrooms", amount: "100g" },
      { name: "Ginger", amount: "10g" }
    ],
    previewSteps: [
      { number: 1, title: "Toast Peppercorns", description: "Gently toast Szechuan peppercorns in a dry wok, grind to a fine powder for that iconic numbing touch." },
      { number: 2, title: "Stir-Fry Aromatics", description: "Sauté ginger, garlic, minced protein, and doubanjiang in chili oil until oils turn a vibrant red." },
      { number: 3, title: "Simmer Tofu", description: "Slide in silken tofu cubes, add broth and cornstarch slurry to thicken, then dust with ground peppercorns." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "kanto-sukiyaki",
    title: "Kanto-style Sukiyaki",
    imageUrl: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&auto=format&fit=crop&q=80",
    cuisine: "Japanese",
    region: "Kanto (Tokyo)",
    dietaryTags: ["Japanese"],
    prepTime: 20,
    difficulty: "Medium",
    description: "Thinly sliced marbled beef, tofu, and scallions simmered in a sweet soy and sake-infused warishita broth.",
    youHave: [
      { name: "Sake", amount: "50ml" },
      { name: "Onion", amount: "1 bunch of scallions" }
    ],
    youNeed: [
      { name: "Thinly Sliced Beef", amount: "250g" },
      { name: "Mirin & Soy Sauce", amount: "100ml" },
      { name: "Shiitake Mushrooms", amount: "4 units" },
      { name: "Tofu Block", amount: "150g" }
    ],
    previewSteps: [
      { number: 1, title: "Mix Warishita Sauce", description: "Whisk soy sauce, sake, mirin, and sugar together, then bring to a quick boil to dissolve sugar." },
      { number: 2, title: "Sizzle Beef", description: "Sear beef slices briefly in a hot pot with sugar, then pour in a splash of warishita sauce." },
      { number: 3, title: "Simmer Ingredients", description: "Arrange mushrooms, tofu, and scallions in the pot. Let everything simmer gently for 10 minutes." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "oaxacan-mole-negro",
    title: "Oaxacan Mole Negro",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
    cuisine: "Mexican",
    region: "Oaxaca",
    dietaryTags: ["Mexican", "Spicy"],
    prepTime: 45,
    difficulty: "Hard",
    description: "An incredibly complex, velvet chocolate-infused dark savory sauce served over tender poached chicken.",
    youHave: [
      { name: "Chicken", amount: "500g" },
      { name: "Garlic", amount: "4 cloves" }
    ],
    youNeed: [
      { name: "Mexican Dark Chocolate", amount: "50g" },
      { name: "Dried Ancho & Pasilla Chilis", amount: "4 units" },
      { name: "Plantain or Raisins", amount: "1 unit" },
      { name: "Toasted Sesame Seeds", amount: "2 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Toast Ingredients", description: "Dry-toast dried chilis, spices, and sesame seeds in a skillet until fragrant and darkened." },
      { number: 2, title: "Blend Sauce", description: "Blend toasted spices, chilis, tomatoes, garlic, and raisins into a smooth thick paste." },
      { number: 3, title: "Simmer with Chocolate", description: "Fry the paste in oil, add broth and dark chocolate, and simmer until rich, thick, and aromatic." }
    ],
    servings: 4,
    rating: 5.0,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "jeonju-bibimbap",
    title: "Jeonju Bibimbap",
    imageUrl: "https://images.unsplash.com/photo-1541795795328-f073b763494e?w=600&auto=format&fit=crop&q=80",
    cuisine: "Korean",
    region: "Jeonju",
    dietaryTags: ["Korean"],
    prepTime: 20,
    difficulty: "Medium",
    description: "Warm grain bowl topped with exquisitely arranged seasoned vegetables, marinated beef, and a sunny-side-up egg with Gochujang.",
    youHave: [
      { name: "Eggs", amount: "1 unit" },
      { name: "Soy Sauce", amount: "1 tbsp" }
    ],
    youNeed: [
      { name: "Steamed Rice", amount: "1 large bowl" },
      { name: "Gochujang Paste", amount: "1.5 tbsp" },
      { name: "Spinach & Bean Sprouts", amount: "50g" },
      { name: "Shiitake Mushrooms", amount: "3 units" }
    ],
    previewSteps: [
      { number: 1, title: "Sauté Toppings", description: "Sauté spinach, bean sprouts, carrots, and mushrooms separately with a touch of sesame oil." },
      { number: 2, title: "Fry Egg", description: "Pan-fry a fresh egg until the whites are fully set but the yolk remains beautifully runny." },
      { number: 3, title: "Assemble Bowl", description: "Place rice at the bottom, arrange vegetables in a colorful circle, top with egg and gochujang." }
    ],
    servings: 1,
    rating: 4.8,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "isan-larb-moo",
    title: "Isan Larb Moo",
    imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop&q=80",
    cuisine: "Thai",
    region: "Isan",
    dietaryTags: ["Thai", "Spicy"],
    prepTime: 15,
    difficulty: "Easy",
    description: "Zesty, spicy minced meat salad tossed with fresh mint, lime, fish sauce, and toasted ground sticky rice.",
    youHave: [
      { name: "Garlic", amount: "2 cloves" },
      { name: "Lemon", amount: "2 units (Lime)" }
    ],
    youNeed: [
      { name: "Minced Chicken or Pork", amount: "250g" },
      { name: "Fresh Mint Leaves", amount: "1 bunch" },
      { name: "Toasted Rice Powder", amount: "1 tbsp" },
      { name: "Thai Chili Flakes", amount: "1.5 tsp" }
    ],
    previewSteps: [
      { number: 1, title: "Cook Minced Meat", description: "Cook minced meat in a pot with a touch of broth until completely done and cooked through." },
      { number: 2, title: "Toss with Herbs", description: "Remove from heat, add fresh lime juice, fish sauce, chili flakes, and toasted rice powder." },
      { number: 3, title: "Garnish with Mint", description: "Fold in sliced shallots, green onions, and fresh mint. Serve warm with cabbage wedges." }
    ],
    servings: 2,
    rating: 4.7,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "kyoto-matcha-dorayaki",
    title: "Kyoto Matcha Dorayaki",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    cuisine: "Japanese",
    region: "Kyoto",
    dietaryTags: ["Japanese", "Vegetarian"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Fluffy Japanese honey pancakes sandwiched with Uji matcha white chocolate cream and sweet red bean paste.",
    youHave: [
      { name: "Eggs", amount: "2 units" },
      { name: "Honey", amount: "1 tbsp" }
    ],
    youNeed: [
      { name: "Matcha Powder (Uji)", amount: "2 tsp" },
      { name: "Flour & Sugar", amount: "100g" },
      { name: "Sweet Red Bean Paste (Anko)", amount: "80g" },
      { name: "Heavy Cream", amount: "50ml" }
    ],
    previewSteps: [
      { number: 1, title: "Make Pancake Batter", description: "Whisk eggs, sugar, honey, flour, and a touch of water until smooth; let rest for 15 minutes." },
      { number: 2, title: "Cook Dorayaki", description: "Pour batter on low heat skillet to form round pancakes; flip when bubbles appear on the surface." },
      { number: 3, title: "Assemble with Matcha", description: "Whip cream with matcha powder and white chocolate, sandwich red bean paste and matcha cream between pancakes." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "provence-bouillabaisse",
    title: "Provence Bouillabaisse",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80",
    cuisine: "Mediterranean",
    region: "Provence",
    dietaryTags: ["Mediterranean", "Seafood"],
    prepTime: 35,
    difficulty: "Hard",
    description: "A legendary rich fisherman's stew simmered with white fish, shellfish, saffron, and orange peel.",
    youHave: [
      { name: "Tomatoes", amount: "2 ripe" },
      { name: "Garlic", amount: "4 cloves" }
    ],
    youNeed: [
      { name: "Mixed Seafood/Fish", amount: "400g" },
      { name: "Saffron", amount: "1 pinch" },
      { name: "Fennel Bulb", amount: "1/2 unit" },
      { name: "Olive Oil", amount: "3 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Prepare Broth Base", description: "Sauté fennel, garlic, onions, and tomatoes. Add saffron, orange peel, and fish stock." },
      { number: 2, title: "Simmer Fish", description: "Add firm white fish first, then delicate shellfish, simmer gently for 8-10 minutes." },
      { number: 3, title: "Serve with Rouille", description: "Garnish with fresh parsley. Serve hot alongside toasted baguette slices spread with garlic rouille." }
    ],
    servings: 3,
    rating: 5.0,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "yucatan-cochinita-pibil",
    title: "Yucatán Cochinita Pibil",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&auto=format&fit=crop&q=80",
    cuisine: "Mexican",
    region: "Yucatán",
    dietaryTags: ["Mexican", "Spicy"],
    prepTime: 40,
    difficulty: "Hard",
    description: "Slow-roasted pork shoulder marinated in citrus juices and earthy achiote paste, wrapped in banana leaves.",
    youHave: [
      { name: "Garlic", amount: "5 cloves" },
      { name: "Lemon", amount: "3 units (Orange & Lime)" }
    ],
    youNeed: [
      { name: "Pork Shoulder", amount: "500g" },
      { name: "Achiote Paste", amount: "40g" },
      { name: "Red Onion", amount: "1 unit" },
      { name: "Corn Tortillas", amount: "8 units" }
    ],
    previewSteps: [
      { number: 1, title: "Marinate Pork", description: "Blend achiote paste with sour orange juice, lime juice, roasted garlic, and spices. Pour over pork pieces." },
      { number: 2, title: "Roast Slow", description: "Wrap marinated pork tightly in foil or banana leaves and bake at 180°C for 2.5 hours until shred-tender." },
      { number: 3, title: "Pickle Onions", description: "Shred meat into its juices. Top tacos with custom lime-pickled red onions and habanero." }
    ],
    servings: 4,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "jeju-black-pork-bulgogi",
    title: "Jeju Black Pork Bulgogi",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
    cuisine: "Korean",
    region: "Jeju Island",
    dietaryTags: ["Korean", "Spicy"],
    prepTime: 20,
    difficulty: "Medium",
    description: "Thick, tender strips of authentic pork loin marinated in a spicy Gochujang glaze with sweet garlic.",
    youHave: [
      { name: "Garlic", amount: "4 cloves" },
      { name: "Onion", amount: "1/2 unit" }
    ],
    youNeed: [
      { name: "Pork Belly or Loin", amount: "350g" },
      { name: "Gochujang (Chili Paste)", amount: "2 tbsp" },
      { name: "Sesame Oil", amount: "1 tbsp" },
      { name: "Ginger", amount: "10g" }
    ],
    previewSteps: [
      { number: 1, title: "Slice & Marinate", description: "Slice pork thinly. Whisk together gochujang, garlic, ginger, and sesame oil, then coat the meat." },
      { number: 2, title: "Sauté Aromatics", description: "Sizzle sliced onions and scallions in a heavy hot pan with a splash of sesame oil." },
      { number: 3, title: "Stir-Fry Meat", description: "Toss in the marinated pork. Cook on high heat until beautifully charred and fully cooked through." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "osaka-okonomiyaki",
    title: "Osaka Okonomiyaki",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop&q=80",
    cuisine: "Japanese",
    region: "Kansai (Osaka)",
    dietaryTags: ["Japanese"],
    prepTime: 25,
    difficulty: "Medium",
    description: "A savory Japanese cabbage pancake loaded with fillings and topped with Kewpie mayo and tangy okonomiyaki sauce.",
    youHave: [
      { name: "Eggs", amount: "2 units" },
      { name: "Flour", amount: "100g" }
    ],
    youNeed: [
      { name: "Shredded Cabbage", amount: "200g" },
      { name: "Bacon Strips or Pork", amount: "4 slices" },
      { name: "Okonomiyaki Sauce", amount: "3 tbsp" },
      { name: "Kewpie Mayonnaise", amount: "2 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Prepare Batter", description: "Whisk flour, dashi powder, and eggs together. Gently fold in a mountain of shredded cabbage." },
      { number: 2, title: "Pan-Fry", description: "Pour cabbage batter onto a hot oiled griddle, top with bacon slices, and cook until golden before flipping." },
      { number: 3, title: "Sauce & Garnish", description: "Drizzle generously with Kewpie mayo, okonomiyaki sauce, and top with bonita flakes and dried seaweed." }
    ],
    servings: 2,
    rating: 4.8,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "tacos-al-pastor",
    title: "Mexico City Tacos al Pastor",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&auto=format&fit=crop&q=80",
    cuisine: "Mexican",
    region: "Mexico City",
    dietaryTags: ["Mexican"],
    prepTime: 30,
    difficulty: "Medium",
    description: "Succulent pork marinated in achiote and dried chilis, seared to a crisp and served with sweet grilled pineapple.",
    youHave: [
      { name: "Onion", amount: "1 unit" },
      { name: "Garlic", amount: "3 cloves" }
    ],
    youNeed: [
      { name: "Pork Shoulder", amount: "400g" },
      { name: "Pineapple Rings", amount: "3 units" },
      { name: "Achiote Paste", amount: "2 tbsp" },
      { name: "Corn Tortillas", amount: "6 units" }
    ],
    previewSteps: [
      { number: 1, title: "Blend Marinade", description: "Blend achiote, garlic, lime juice, vinegar, and chili flakes until smooth. Marinate sliced pork." },
      { number: 2, title: "Pan-Sear Pork", description: "Sear marinated pork strips in a scorching hot skillet until crispy around the edges." },
      { number: 3, title: "Assemble Tacos", description: "Warm up corn tortillas, load up pork, add chopped raw onions, cilantro, and sweet pineapple chunks." }
    ],
    servings: 3,
    rating: 5.0,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "hunan-spicy-beef",
    title: "Hunan Spicy Beef",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80",
    cuisine: "Chinese",
    region: "Hunan",
    dietaryTags: ["Chinese", "Spicy"],
    prepTime: 15,
    difficulty: "Easy",
    description: "Flank steak stir-fried with hot pickled red chilis, fresh scallions, and a robust, spicy oyster glaze.",
    youHave: [
      { name: "Garlic", amount: "4 cloves" },
      { name: "Soy Sauce", amount: "2 tbsp" }
    ],
    youNeed: [
      { name: "Flank Beef Steak", amount: "300g" },
      { name: "Fresh Red Chilis", amount: "4 units" },
      { name: "Oyster Sauce", amount: "1.5 tbsp" },
      { name: "Scallions", amount: "3 stalks" }
    ],
    previewSteps: [
      { number: 1, title: "Velvet the Beef", description: "Slice beef thinly against the grain, toss with soy sauce and cornstarch to lock in moisture." },
      { number: 2, title: "Sauté Aromatics", description: "Stir-fry chopped garlic, ginger, and red hot chilis on high heat in a wok until intensely fragrant." },
      { number: 3, title: "Stir-Fry Beef", description: "Add beef to wok, flash fry for 2 minutes, pour oyster sauce, and toss with scallion green tops." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "paella-valenciana",
    title: "Paella Valenciana",
    imageUrl: "https://images.unsplash.com/photo-1534080391025-a77af6eb71f5?w=600&auto=format&fit=crop&q=80",
    cuisine: "Mediterranean",
    region: "Valencia",
    dietaryTags: ["Mediterranean", "Seafood"],
    prepTime: 35,
    difficulty: "Hard",
    description: "Vibrant yellow Spanish rice simmered in a wide pan with saffron, tender chicken, and mixed fresh seafood.",
    youHave: [
      { name: "Tomatoes", amount: "2 units" },
      { name: "Garlic", amount: "3 cloves" }
    ],
    youNeed: [
      { name: "Arborio or Calasparra Rice", amount: "200g" },
      { name: "Saffron Threads", amount: "1 pinch" },
      { name: "Mixed Prawns & Mussels", amount: "200g" },
      { name: "Chicken Breast", amount: "150g" }
    ],
    previewSteps: [
      { number: 1, title: "Sear Chicken", description: "Brown chicken pieces in a wide paella pan with olive oil until golden. Push to the sides." },
      { number: 2, title: "Build Sofrito", description: "Grate tomatoes and sauté with garlic, forming a sweet rich paste at the center of the pan." },
      { number: 3, title: "Simmer Rice", description: "Stir in rice, pour hot broth infused with saffron. Do NOT stir, let rice form a crispy crust (socarrat) on low heat." }
    ],
    servings: 3,
    rating: 4.8,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "chicken-tikka-masala",
    title: "Punjabi Chicken Tikka Masala",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    cuisine: "Asian",
    region: "Punjab",
    dietaryTags: ["Asian", "Spicy"],
    prepTime: 30,
    difficulty: "Medium",
    description: "Roasted marinated chicken chunks drenched in a spiced, velvety tomato-cream sauce.",
    youHave: [
      { name: "Tomatoes", amount: "3 ripe" },
      { name: "Garlic", amount: "4 cloves" }
    ],
    youNeed: [
      { name: "Chicken Thighs", amount: "400g" },
      { name: "Garam Masala", amount: "1.5 tbsp" },
      { name: "Plain Greek Yogurt", amount: "100g" },
      { name: "Heavy Cream", amount: "100ml" }
    ],
    previewSteps: [
      { number: 1, title: "Marinate & Roast", description: "Toss chicken pieces with yogurt, lemon juice, and spices. Broil or grill until charred." },
      { number: 2, title: "Simmer Gravy", description: "Sauté garlic, ginger, and tomatoes. Simmer with garam masala, turmeric, and cumin until smooth." },
      { number: 3, title: "Combine & Cream", description: "Add roasted chicken to the pan, stir in heavy cream, and simmer until thick and luscious." }
    ],
    servings: 3,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "hokkaido-miso-ramen",
    title: "Hokkaido Miso Ramen",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
    cuisine: "Japanese",
    region: "Hokkaido",
    dietaryTags: ["Japanese"],
    prepTime: 30,
    difficulty: "Medium",
    description: "Rich, deeply savory miso broth served with chewy ramen noodles, sweet corn, a pat of butter, and tender pork chashu.",
    youHave: [
      { name: "Garlic", amount: "3 cloves" },
      { name: "Eggs", amount: "2 units" }
    ],
    youNeed: [
      { name: "Ramen Noodles", amount: "2 servings" },
      { name: "Miso Paste", amount: "3 tbsp" },
      { name: "Sweet Corn", amount: "50g" },
      { name: "Butter", amount: "15g" },
      { name: "Pork Belly Chashu", amount: "4 slices" }
    ],
    previewSteps: [
      { number: 1, title: "Prepare Broth Base", description: "Sauté minced garlic and ginger in sesame oil, then stir-fry miso paste until fragrant before pouring in rich dashi or pork stock." },
      { number: 2, title: "Boil Noodles", description: "Cook ramen noodles in boiling water until al dente, drain thoroughly." },
      { number: 3, title: "Assemble Bowl", description: "Place noodles in hot miso broth, top with pork chashu, soft-boiled marinated egg, sweet corn, scallions, and a slice of butter." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "jalisco-birria-de-res",
    title: "Jalisco Birria de Res",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    cuisine: "Mexican",
    region: "Jalisco",
    dietaryTags: ["Mexican", "Spicy"],
    prepTime: 45,
    difficulty: "Hard",
    description: "Slow-braised beef brisket in an exquisite, aromatic guajillo and ancho chili broth, served as crispy quesabirria tacos with consommé.",
    youHave: [
      { name: "Garlic", amount: "6 cloves" },
      { name: "Onion", amount: "1 large" }
    ],
    youNeed: [
      { name: "Beef Brisket", amount: "500g" },
      { name: "Dried Guajillo Chilis", amount: "4 units" },
      { name: "Dried Ancho Chilis", amount: "2 units" },
      { name: "Oaxaca Cheese", amount: "150g" },
      { name: "Corn Tortillas", amount: "8 units" }
    ],
    previewSteps: [
      { number: 1, title: "Simmer Chilis & Blend", description: "Rehydrate guajillo and ancho chilis in hot water, then blend with garlic, cloves, oregano, vinegar, and tomatoes into a smooth paste." },
      { number: 2, title: "Braise the Beef", description: "Coat beef brisket in chili paste, pour in beef broth, and slow-cook or pressure-cook until melt-in-your-mouth tender, then shred." },
      { number: 3, title: "Grill Tacos", description: "Dip tortillas in the rich orange fat on top of the broth, sear on a hot flat top, stuff with shredded beef and cheese, fold, and serve with consommé." }
    ],
    servings: 4,
    rating: 5.0,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "shaanxi-biang-biang-noodles",
    title: "Shaanxi Biang Biang Noodles",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80",
    cuisine: "Chinese",
    region: "Shaanxi",
    dietaryTags: ["Chinese", "Spicy", "Vegetarian"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Thick, hand-pulled ribbon noodles tossed with raw garlic, chili powder, and sizzling hot oil for an intense, aromatic burst.",
    youHave: [
      { name: "Garlic", amount: "4 cloves" },
      { name: "Noodles", amount: "200g" }
    ],
    youNeed: [
      { name: "Chinese Black Vinegar", amount: "2 tbsp" },
      { name: "Sichuan Chili Powder", amount: "1.5 tbsp" },
      { name: "Soy Sauce", amount: "1 tbsp" },
      { name: "Bok Choy", amount: "100g" },
      { name: "Peanut Oil", amount: "4 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Boil Noodles & Greens", description: "Cook hand-pulled or thick wide noodles in boiling water, tossing in fresh bok choy in the last minute of boiling." },
      { number: 2, title: "Layer Aromatics", description: "Place hot noodles in a bowl, top with finely minced garlic, green onions, toasted sesame seeds, and chili powder." },
      { number: 3, title: "Sizzle Hot Oil", description: "Heat peanut oil in a small saucepan until smoking, then carefully pour it directly onto the chili and garlic until it sizzles intensely." }
    ],
    servings: 2,
    rating: 4.8,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "hiroshima-okonomiyaki",
    title: "Hiroshima-style Okonomiyaki",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&auto=format&fit=crop&q=80",
    cuisine: "Japanese",
    region: "Hiroshima",
    dietaryTags: ["Japanese"],
    prepTime: 30,
    difficulty: "Hard",
    description: "An elegant layered pancake built with cabbage, crispy pork belly, yakisoba noodles, and a fried egg, brushed with sweet okonomi sauce.",
    youHave: [
      { name: "Eggs", amount: "2 units" },
      { name: "Flour", amount: "80g" }
    ],
    youNeed: [
      { name: "Yakisoba Noodles", amount: "1 pack" },
      { name: "Shredded Cabbage", amount: "150g" },
      { name: "Pork Belly Strips", amount: "4 slices" },
      { name: "Okonomi Sauce", amount: "3 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Pour Crepe Base", description: "Spread a paper-thin circular batter on a hot griddle, pile a large mound of cabbage and pork belly on top, then flip." },
      { number: 2, title: "Fry Noodles", description: "Sauté yakisoba noodles on the side, season with yakisoba sauce, and press the cabbage cake directly on top of the noodles." },
      { number: 3, title: "Layer Fried Egg", description: "Fry an egg, place the noodle-pancake stack directly on top of the egg, flip over, and coat with sweet sauce." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "tokyo-shoyu-ramen",
    title: "Tokyo Shoyu Ramen",
    imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&auto=format&fit=crop&q=80",
    cuisine: "Japanese",
    region: "Kanto (Tokyo)",
    dietaryTags: ["Japanese"],
    prepTime: 25,
    difficulty: "Medium",
    description: "Classic Tokyo-style ramen featuring curly noodles in a clear, soy sauce-infused chicken and dashi broth, finished with scallions.",
    youHave: [
      { name: "Eggs", amount: "2 units" },
      { name: "Garlic", amount: "2 cloves" }
    ],
    youNeed: [
      { name: "Ramen Noodles", amount: "2 servings" },
      { name: "Soy Sauce", amount: "3 tbsp" },
      { name: "Chicken Stock", amount: "800ml" },
      { name: "Pork Chashu", amount: "4 slices" },
      { name: "Nori Seaweed", amount: "2 sheets" }
    ],
    previewSteps: [
      { number: 1, title: "Simmer Broth", description: "Infuse chicken stock with soy sauce, garlic, ginger, and a dash of dashi powder to create the umami-rich Shoyu base." },
      { number: 2, title: "Prepare Toppings", description: "Soft-boil eggs, slice the pork chashu, and finely chop fresh green onions." },
      { number: 3, title: "Assemble Bowl", description: "Boil noodles until springy, place in hot broth, then arrange eggs, pork, nori, and green onions on top." }
    ],
    servings: 2,
    rating: 4.8,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "guangdong-shrimp-dumplings",
    title: "Guangdong Har Gow (Shrimp Dumplings)",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80",
    cuisine: "Chinese",
    region: "Guangdong",
    dietaryTags: ["Chinese", "Seafood"],
    prepTime: 35,
    difficulty: "Hard",
    description: "Classic Cantonese dim sum dumpling filled with sweet, plump shrimp wrapped in a delicate, translucent pleated wheat starch skin.",
    youHave: [
      { name: "Garlic", amount: "2 cloves" },
      { name: "Soy Sauce", amount: "1 tbsp" }
    ],
    youNeed: [
      { name: "Raw Shrimp", amount: "250g" },
      { name: "Wheat Starch", amount: "100g" },
      { name: "Tapioca Starch", amount: "50g" },
      { name: "Bamboo Shoots", amount: "50g" },
      { name: "Sesame Oil", amount: "1 tsp" }
    ],
    previewSteps: [
      { number: 1, title: "Prepare Shrimp Filling", description: "Roughly chop shrimp, mix with bamboo shoots, sesame oil, white pepper, and a touch of starch until sticky." },
      { number: 2, title: "Knead Dough", description: "Combine wheat starch and tapioca starch with boiling water, knead into a smooth dough, and roll into thin round wrapper discs." },
      { number: 3, title: "Pleat & Steam", description: "Place a scoop of shrimp inside, pleat carefully, and steam in a bamboo steamer for 6 minutes until translucent." }
    ],
    servings: 3,
    rating: 4.7,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "singapore-laksa",
    title: "Singapore Katong Laksa",
    imageUrl: singaporeKatongLaksaImg,
    cuisine: "Singaporean",
    region: "Singapore",
    dietaryTags: ["Singaporean", "Spicy", "Seafood"],
    prepTime: 30,
    difficulty: "Medium",
    description: "A rich, spicy coconut milk broth loaded with thick rice noodles, fresh prawns, fish cakes, and fragrant laksa leaves.",
    youHave: [
      { name: "Garlic", amount: "3 cloves" },
      { name: "Onion", amount: "1 medium shallot" }
    ],
    youNeed: [
      { name: "Thick Rice Noodles", amount: "200g" },
      { name: "Laksa Paste", amount: "3 tbsp" },
      { name: "Coconut Milk", amount: "300ml" },
      { name: "Fresh Prawns", amount: "6 units" },
      { name: "Fish Cakes", amount: "100g (sliced)" },
      { name: "Tofu Puffs", amount: "5 units" }
    ],
    previewSteps: [
      { number: 1, title: "Sauté Laksa Paste", description: "Heat oil in a deep pot and fry laksa paste with minced garlic and shallots until highly fragrant and oil separates." },
      { number: 2, title: "Simmer Broth", description: "Pour in water or chicken stock, coconut milk, and bring to a simmer. Add tofu puffs to absorb the delicious flavors." },
      { number: 3, title: "Boil and Assemble", description: "Blanch rice noodles, prawns, and fish cakes. Pour the boiling coconut curry soup over noodles, topping with fresh laksa herbs." }
    ],
    servings: 2,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "hainanese-chicken-rice",
    title: "Hainanese Chicken Rice",
    imageUrl: hainaneseChickenRiceImg,
    cuisine: "Singaporean",
    region: "Singapore",
    dietaryTags: ["Singaporean", "Asian"],
    prepTime: 35,
    difficulty: "Medium",
    description: "The national dish of Singapore: succulent poached chicken served with incredibly fragrant garlic and ginger-infused jasmine rice.",
    youHave: [
      { name: "Garlic", amount: "5 cloves" },
      { name: "Ginger", amount: "30g" }
    ],
    youNeed: [
      { name: "Whole Chicken or Thighs", amount: "500g" },
      { name: "Jasmine Rice", amount: "200g" },
      { name: "Pandan Leaves", amount: "2 leaves" },
      { name: "Sesame Oil", amount: "1 tbsp" },
      { name: "Soy Sauce", amount: "1 tbsp" }
    ],
    previewSteps: [
      { number: 1, title: "Poach Chicken", description: "Gently poach chicken with ginger, garlic, and scallions. Plunge in ice water immediately after cooking for a gelatinous, tender skin." },
      { number: 2, title: "Cook Fragrant Rice", description: "Sauté jasmine rice in rendered chicken fat, garlic, and ginger, then cook in the chicken poaching broth with pandan leaves." },
      { number: 3, title: "Slice and Serve", description: "Slice chicken, drizzle with soy sauce and sesame oil. Serve with warm fragrant rice and spicy chili-ginger sauce." }
    ],
    servings: 3,
    rating: 5.0,
    cookedCount: 0,
    isFavorite: false
  },
  {
    id: "singapore-chili-crab",
    title: "Singapore Chili Crab",
    imageUrl: singaporeChiliCrabImg,
    cuisine: "Singaporean",
    region: "Singapore",
    dietaryTags: ["Singaporean", "Spicy", "Seafood"],
    prepTime: 40,
    difficulty: "Hard",
    description: "Iconic sweet, savory, and spicy crab stir-fry in a luscious tomato-chili sauce thickened with ribboned eggs, served with fried mantou buns.",
    youHave: [
      { name: "Garlic", amount: "6 cloves" },
      { name: "Eggs", amount: "1 unit" }
    ],
    youNeed: [
      { name: "Mud Crab or Large Crab", amount: "800g (cleaned)" },
      { name: "Chili Paste", amount: "2 tbsp" },
      { name: "Tomato Paste & Ketchup", amount: "4 tbsp" },
      { name: "Ginger", amount: "20g" },
      { name: "Fried Mantou Buns", amount: "4 units" }
    ],
    previewSteps: [
      { number: 1, title: "Stir-Fry Aromatics", description: "Sauté minced garlic, ginger, and shallots in plenty of oil until fragrant and slightly caramelized." },
      { number: 2, title: "Cook the Crab", description: "Add crab pieces, toss with tomato-chili sauce base and chicken broth, cover and simmer until shell turns bright red." },
      { number: 3, title: "Swirl Egg ribbons", description: "Drizzle in a beaten egg while swirling the hot gravy to create silky ribbons. Serve hot with crispy deep-fried mantou buns." }
    ],
    servings: 3,
    rating: 4.9,
    cookedCount: 0,
    isFavorite: false
  }
];
