// Extracted from the supplied BDM Cricket site clone. Keep source facts intact.
export type ProductSpecification = { name: string; value: string };
export type Product = { slug: string; name: string; category: string; categorySlug: string; price: string; image: string; images: string[]; productCode: string; specifications: ProductSpecification[] };
export type ProductCategory = { slug: string; name: string; description: string; count: number };

export const categories: ProductCategory[] = [
  {
    "slug": "cricket-bat",
    "name": "Cricket Bats",
    "description": "Bats for club and match play",
    "count": 32
  },
  {
    "slug": "bdm-english-willow-cricket-bat",
    "name": "English Willow Bats",
    "description": "English willow bats from the BDM range",
    "count": 27
  },
  {
    "slug": "cricket-ball",
    "name": "Cricket Balls",
    "description": "Leather and training balls",
    "count": 35
  },
  {
    "slug": "leather-cricket-ball",
    "name": "Leather Cricket Balls",
    "description": "Leather balls for match play and practice",
    "count": 2
  },
  {
    "slug": "cricket-batting-gloves",
    "name": "Batting Gloves",
    "description": "Batting gloves across the BDM range",
    "count": 9
  },
  {
    "slug": "wicket-keeping-gloves",
    "name": "Wicket Keeping Gloves",
    "description": "Gloves for wicket keepers",
    "count": 3
  },
  {
    "slug": "cricket-wicketkeeping-gloves",
    "name": "Wicket Keeping Gloves",
    "description": "Gloves for wicket keepers",
    "count": 4
  },
  {
    "slug": "cricket-batting-pad",
    "name": "Batting Pads",
    "description": "Protection for the crease",
    "count": 15
  },
  {
    "slug": "cricket-wicketkeeping-pad",
    "name": "Wicket Keeping Pads",
    "description": "Pads for wicket keepers",
    "count": 6
  },
  {
    "slug": "cricket-helmet",
    "name": "Cricket Helmets",
    "description": "Protective helmets for cricket",
    "count": 6
  },
  {
    "slug": "cricket-kit-bag",
    "name": "Kit Bags",
    "description": "Bags for carrying cricket equipment",
    "count": 5
  },
  {
    "slug": "cricket-protective-equipment",
    "name": "Protective Equipment",
    "description": "Protective cricket equipment",
    "count": 10
  },
  {
    "slug": "cricket-accessories",
    "name": "Accessories",
    "description": "Training and match-day accessories",
    "count": 3
  },
  {
    "slug": "cricket-hat",
    "name": "Cricket Hats",
    "description": "Cricket hats and caps",
    "count": 1
  },
  {
    "slug": "white-cricket-wear",
    "name": "Cricket Wear",
    "description": "White cricket clothing",
    "count": 1
  },
  {
    "slug": "cricket-battingpad-sportsacademy",
    "name": "Academy Equipment",
    "description": "Equipment featured for cricket academies",
    "count": 1
  },
  {
    "slug": "cricket-equipments",
    "name": "Cricket Accessories",
    "description": "Additional cricket equipment",
    "count": 4
  }
];

export const products: Product[] = [
  {
    "slug": "bdm-dyna-drive-cricket-bat",
    "name": "BDM Dyna Drive Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 5,600 / Piece",
    "image": "/assets/bdm-dyna-drive-cricket-bat-500x500-11bmnoi1.png",
    "images": [
      "/assets/bdm-dyna-drive-cricket-bat-500x500-11bmnoi1.png",
      "/assets/bdm-dyna-drive-cricket-bat-500x500-11bmnoi1-4.png",
      "/assets/bdm-dyna-drive-cricket-bat-500x500-11bmnoi1-2.png",
      "/assets/bdm-dyna-drive-cricket-bat-500x500-13dykdny.png"
    ],
    "productCode": "EN01",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-miller-cricket-bat",
    "name": "BDM Miller Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 3,400 / Piece",
    "image": "/assets/bdm-miller-cricket-bat-500x500-10tx72v4.png",
    "images": [
      "/assets/bdm-miller-cricket-bat-500x500-10tx72v4.png",
      "/assets/bdm-miller-cricket-bat-500x500-10tx72v4-4.png",
      "/assets/bdm-miller-cricket-bat-500x500-10tx72v4-3.png",
      "/assets/bdm-miller-cricket-bat-500x500-1qmy3dfm.png"
    ],
    "productCode": "KW06",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-old-gold-cricket-bat",
    "name": "BDM Old Gold Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 6,000 / Piece",
    "image": "/assets/bdm-old-gold-cricket-bat-500x500-1s5py9xl.png",
    "images": [
      "/assets/bdm-old-gold-cricket-bat-500x500-1s5py9xl.png",
      "/assets/bdm-old-gold-cricket-bat-500x500-1s5py9xl-3.png",
      "/assets/bdm-old-gold-cricket-bat-500x500-1s5py9xl-2.png",
      "/assets/bdm-old-gold-cricket-bat-500x500-1dervnh1.png"
    ],
    "productCode": "EN07",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-plastic-cricket-bat",
    "name": "BDM Plastic Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 800 / Piece",
    "image": "/assets/bdm-plastic-cricket-bat-500x500-qduvnj1x-2.jpg",
    "images": [
      "/assets/bdm-plastic-cricket-bat-500x500-qduvnj1x-2.jpg",
      "/assets/bdm-plastic-cricket-bat-500x500-qduvnj1x.jpg",
      "/assets/bdm-plastic-cricket-bat-125x125-t7h4g5ez.jpg",
      "/assets/bdm-plastic-cricket-bat-125x125-t7h4g5ez-2.jpg"
    ],
    "productCode": "121817850",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "plastic"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Playing Level",
        "value": "Advanced"
      },
      {
        "name": "Bat Profile",
        "value": "High Profile"
      },
      {
        "name": "Handle Length",
        "value": "Long Handle"
      }
    ]
  },
  {
    "slug": "bdm-player-s-autograph-cricket-bat",
    "name": "BDM Player's Autograph Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,199 / Piece",
    "image": "/assets/bdm-player-s-autograph-cricket-bat-500x5-1e1hhl1i-3.jpg",
    "images": [
      "/assets/bdm-player-s-autograph-cricket-bat-500x5-1e1hhl1i-3.jpg",
      "/assets/bdm-player-s-autograph-cricket-bat-500x5-1e1hhl1i.jpg",
      "/assets/bdm-player-s-autograph-cricket-bat-500x5-aztm90fb.jpg",
      "/assets/bdm-player-s-autograph-cricket-bat-500x5-mrual7pa.jpg"
    ],
    "productCode": "KW02",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Weight (Kg)",
        "value": "We provide Costumer accordingly."
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Edge Size (mm)",
        "value": "40MM"
      }
    ]
  },
  {
    "slug": "bdm-hammer-cricket-bat",
    "name": "BDM Hammer Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 3,400 / Piece",
    "image": "/assets/bdm-hammer-cricket-bat-500x500-1bildks1.png",
    "images": [
      "/assets/bdm-hammer-cricket-bat-500x500-1bildks1.png",
      "/assets/bdm-hammer-cricket-bat-125x125-1ec7mde1.png",
      "/assets/bdm-hammer-cricket-bat-125x125-1ec7mde1-2.png",
      "/assets/bdm-hammer-cricket-bat-125x125-1lx8y1yi.png"
    ],
    "productCode": "116156074",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      },
      {
        "name": "Wooden Type",
        "value": "Kashmir Willow"
      }
    ]
  },
  {
    "slug": "bdm-ruff-tuff-synthetic-cricket-bat",
    "name": "BDM RUFF TUFF Synthetic Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 3,000 / Piece",
    "image": "/assets/bdm-ruff-tuff-synthetic-cricket-bat-500x-18839z01.jpg",
    "images": [
      "/assets/bdm-ruff-tuff-synthetic-cricket-bat-500x-18839z01.jpg",
      "/assets/bdm-ruff-tuff-synthetic-cricket-bat-125x-1b1pirm1.jpg",
      "/assets/bdm-ruff-tuff-synthetic-cricket-bat-125x-1b1pirm1-2.jpg",
      "/assets/bdm-ruff-tuff-synthetic-cricket-bat-125x-car1301g.jpg"
    ],
    "productCode": "KW07",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-galaxy-plus-cricket-bat",
    "name": "BDM Galaxy Plus Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,600 / Piece",
    "image": "/assets/bdm-galaxy-plus-cricket-bat-500x500-1a722n01.png",
    "images": [
      "/assets/bdm-galaxy-plus-cricket-bat-500x500-1a722n01.png",
      "/assets/bdm-galaxy-plus-cricket-bat-125x125-1d0obfme.png",
      "/assets/bdm-galaxy-plus-cricket-bat-125x125-1d0obfme-2.png",
      "/assets/bdm-galaxy-plus-cricket-bat-125x125-1c8dia41.png"
    ],
    "productCode": "EN04",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      }
    ]
  },
  {
    "slug": "bdm-dasher-20-20-cricket-bat",
    "name": "BDM Dasher 20-20 Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,800 / Piece",
    "image": "/assets/bdm-dasher-20-20-cricket-bat-500x500-ljpyyx1y.jpg",
    "images": [
      "/assets/bdm-dasher-20-20-cricket-bat-500x500-ljpyyx1y.jpg",
      "/assets/bdm-dasher-20-20-cricket-bat-125x125-odc7rjfj.jpg",
      "/assets/bdm-dasher-20-20-cricket-bat-125x125-odc7rjfj-2.jpg",
      "/assets/bdm-dasher-20-20-cricket-bat-125x125-1el0mi81.jpg"
    ],
    "productCode": "116154274",
    "specifications": [
      {
        "name": "Weight Range (g)",
        "value": "We provide Costumer According"
      },
      {
        "name": "Model Number",
        "value": "EN 08"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-admiral-jumbo-cricket-bat",
    "name": "BDM Admiral Jumbo Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 5,400 / Piece",
    "image": "/assets/bdm-admiral-jumbo-cricket-bat-500x500-1cn6x821.jpg",
    "images": [
      "/assets/bdm-admiral-jumbo-cricket-bat-500x500-1cn6x821.jpg",
      "/assets/bdm-admiral-jumbo-cricket-bat-125x125-1fgt60o1.jpg",
      "/assets/bdm-admiral-jumbo-cricket-bat-125x125-1fgt60o1-2.jpg",
      "/assets/bdm-admiral-jumbo-cricket-bat-125x125-7uybkg1r.jpg"
    ],
    "productCode": "EN02",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-world-cup-cricket-bat",
    "name": "BDM World Cup Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,000 / Piece",
    "image": "/assets/bdm-world-cup-cricket-bat-500x500-exh3wm17.png",
    "images": [
      "/assets/bdm-world-cup-cricket-bat-500x500-exh3wm17.png",
      "/assets/bdm-world-cup-cricket-bat-125x125-hr3cp81o.png",
      "/assets/bdm-world-cup-cricket-bat-125x125-hr3cp81o-2.png",
      "/assets/bdm-world-cup-cricket-bat-125x125-1nnzvtm9.png"
    ],
    "productCode": "EN05",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Heavy Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner, Intermediate"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-super-test-2000-cricket-bat",
    "name": "BDM Super Test 2000 Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,400 / Piece",
    "image": "/assets/bdm-super-test-2000-cricket-bat-500x500-1id8w0y3.png",
    "images": [
      "/assets/bdm-super-test-2000-cricket-bat-500x500-1id8w0y3.png",
      "/assets/bdm-super-test-2000-cricket-bat-125x125-1l6v4tkj.png",
      "/assets/bdm-super-test-2000-cricket-bat-125x125-1l6v4tkj-2.png",
      "/assets/bdm-super-test-2000-cricket-bat-125x125-k18l7o4f.png"
    ],
    "productCode": "KW01",
    "specifications": [
      {
        "name": "Weight Range (g)",
        "value": "We provide Costumer according"
      }
    ]
  },
  {
    "slug": "bdm-smasher-cricket-bat",
    "name": "BDM Smasher Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,400 / Piece",
    "image": "/assets/bdm-smasher-cricket-bat-500x500-m40f8783.jpg",
    "images": [
      "/assets/bdm-smasher-cricket-bat-500x500-m40f8783.jpg",
      "/assets/bdm-smasher-cricket-bat-125x125-oxmo0tok.jpg",
      "/assets/bdm-smasher-cricket-bat-125x125-oxmo0tok-2.jpg",
      "/assets/bdm-smasher-cricket-bat-125x125-1m2bes61.jpg"
    ],
    "productCode": "EN09",
    "specifications": [
      {
        "name": "Usage/Application",
        "value": "Cricket"
      },
      {
        "name": "Handle Type",
        "value": "Long Handle"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Product Type",
        "value": "Cricket Bat"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-commander-max-power-cricket-bat",
    "name": "BDM Commander Max Power Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,799 / Piece",
    "image": "/assets/bdm-commander-max-power-cricket-bat-500x-1oqb4yei.png",
    "images": [
      "/assets/bdm-commander-max-power-cricket-bat-500x-1oqb4yei.png",
      "/assets/bdm-commander-max-power-cricket-bat-125x-1rjxdr0z.png",
      "/assets/bdm-commander-max-power-cricket-bat-125x-1rjxdr0z-2.png",
      "/assets/bdm-commander-max-power-cricket-bat-125x-ea7muq1y.png"
    ],
    "productCode": "EN03",
    "specifications": []
  },
  {
    "slug": "bdm-club-master-cricket-bat",
    "name": "BDM Club Master Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,000 / Piece",
    "image": "/assets/bdm-club-master-cricket-bat-500x500-1i3p3mnt.png",
    "images": [
      "/assets/bdm-club-master-cricket-bat-500x500-1i3p3mnt.png",
      "/assets/bdm-club-master-cricket-bat-125x125-1kxbcf91.png",
      "/assets/bdm-club-master-cricket-bat-125x125-1kxbcf91-2.png",
      "/assets/bdm-club-master-cricket-bat-125x125-uz8126n4.png"
    ],
    "productCode": "KW03",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-pro-cricket-bat",
    "name": "BDM Pro Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 3,000 / Piece",
    "image": "/assets/bdm-pro-cricket-bat-500x500-up9s973a.jpg",
    "images": [
      "/assets/bdm-pro-cricket-bat-500x500-up9s973a.jpg",
      "/assets/bdm-pro-cricket-bat-125x125-xiw11tjr.jpg",
      "/assets/bdm-pro-cricket-bat-125x125-xiw11tjr-2.jpg",
      "/assets/bdm-pro-cricket-bat-125x125-5g09m21n.jpg"
    ],
    "productCode": "KW08",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Standard"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      }
    ]
  },
  {
    "slug": "bdm-tennis-kashmir-popular-cricket-bat",
    "name": "BDM Tennis Kashmir Popular Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 2,200 / Piece",
    "image": "/assets/bdm-tennis-cricket-bat-500x500-4j2nr1to.jpg",
    "images": [
      "/assets/bdm-tennis-cricket-bat-500x500-4j2nr1to.jpg",
      "/assets/bdm-tennis-cricket-bat-125x125-2y5bgdb4.jpg",
      "/assets/bdm-tennis-cricket-bat-125x125-2y5bgdb4-2.jpg",
      "/assets/tennis-bat-4-125x125-oqqqn51t.jpg"
    ],
    "productCode": "121818879",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-grand-master-english-willow-bat",
    "name": "BDM Grand Master English Willow Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 33,000 / Piece",
    "image": "/assets/bdm-grand-master-english-willow-bat-500x-1os6u1r1.jpg",
    "images": [
      "/assets/bdm-grand-master-english-willow-bat-500x-1os6u1r1.jpg",
      "/assets/bdm-grand-master-english-willow-bat-125x-1rlt2ud1.png",
      "/assets/bdm-grand-master-english-willow-bat-125x-1rlt2ud1-2.png",
      "/assets/bdm-grand-master-english-willow-bat-125x-nd6fz8z5.jpg"
    ],
    "productCode": "184855855",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "1"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Handle Type",
        "value": "Short Handle"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Light Weight, Medium Weight"
      }
    ]
  },
  {
    "slug": "bdm-boss-english-willow-bat",
    "name": "BDM Boss English Willow Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 17,600 / Piece",
    "image": "/assets/bdm-boss-english-willow-bat-500x500-w3wrl81v.jpg",
    "images": [
      "/assets/bdm-boss-english-willow-bat-500x500-w3wrl81v.jpg",
      "/assets/bdm-boss-english-willow-bat-125x125-yxj0ducq.png",
      "/assets/bdm-boss-english-willow-bat-125x125-yxj0ducq-2.png",
      "/assets/bdm-boss-english-willow-bat-125x125-1tswvue1.jpg"
    ],
    "productCode": "05",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "2"
      },
      {
        "name": "Color",
        "value": "Natural"
      },
      {
        "name": "Handle Type",
        "value": "Short Handle"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      }
    ]
  },
  {
    "slug": "dhurandhar-gen-z",
    "name": "Dhurandhar ( Gen z )",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 24,000 / Piece",
    "image": "/assets/9-500x500-th948dul.jpg",
    "images": [
      "/assets/9-500x500-th948dul.jpg",
      "/assets/9-125x125-wavd0z1b.jpg",
      "/assets/9-125x125-wavd0z1b-2.jpg",
      "/assets/8-125x125-1ukl4md1.jpg"
    ],
    "productCode": "325594373",
    "specifications": [
      {
        "name": "Bat Material",
        "value": "English Willow"
      },
      {
        "name": "Bat Size",
        "value": "SH (Full Size)"
      },
      {
        "name": "Willow Grade",
        "value": "Grade 1"
      },
      {
        "name": "Suitable For",
        "value": "Leather Ball"
      },
      {
        "name": "Handle Type",
        "value": "Singapore Cane"
      },
      {
        "name": "Bat Profile",
        "value": "Full Profile"
      }
    ]
  },
  {
    "slug": "kashmiri-willow-cricket-bat",
    "name": "Kashmiri Willow Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,800 / Piece",
    "image": "/assets/kashmiri-willow-cricket-bat-500x500-e7er6qdr.png",
    "images": [
      "/assets/kashmiri-willow-cricket-bat-500x500-e7er6qdr.png",
      "/assets/kashmiri-willow-cricket-bat-125x125-h10zzcgu.png",
      "/assets/kashmiri-willow-cricket-bat-125x125-h10zzcgu-2.png",
      "/assets/kashmiri-willow-cricket-bat-125x125-53a66w1y.png"
    ],
    "productCode": "191953890",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "Kashmir (Indian) Willow"
      },
      {
        "name": "Bat Size",
        "value": "Standard"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Color",
        "value": "Natural"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Medium Weight, Heavy Weight"
      }
    ]
  },
  {
    "slug": "dhurandhar-genz-super-duper",
    "name": "Dhurandhar ( Genz Super Duper )",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 52,000 / Piece",
    "image": "/assets/dhurandhar-blockbuster-500x500-jxkc6xbk.png",
    "images": [
      "/assets/dhurandhar-blockbuster-500x500-jxkc6xbk.png",
      "/assets/dhurandhar-blockbuster-125x125-mr6kzjs1.png",
      "/assets/dhurandhar-blockbuster-125x125-mr6kzjs1-2.png",
      "/assets/dhurandhar-blockbuster-125x125-1n8u1d9m.png"
    ],
    "productCode": "324791795",
    "specifications": [
      {
        "name": "Willow Grade (Quality)",
        "value": "Grade 1"
      },
      {
        "name": "Willow Grade",
        "value": "Grade 1"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Playing Level",
        "value": "Advanced"
      },
      {
        "name": "Bat Weight",
        "value": "2 lb 5 oz–2 lb 7 oz"
      },
      {
        "name": "Bat Profile",
        "value": "High Profile"
      }
    ]
  },
  {
    "slug": "dhurandhar-blockbuster-edition",
    "name": "Dhurandhar ( blockbuster edition )",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 36,000 / Piece",
    "image": "/assets/4-500x500-18z2s1hd.jpg",
    "images": [
      "/assets/4-500x500-18z2s1hd.jpg",
      "/assets/4-125x125-1bsp0u3u.jpg",
      "/assets/4-125x125-1bsp0u3u-2.jpg",
      "/assets/5-125x125-8ygnygxo.jpg"
    ],
    "productCode": "324794840",
    "specifications": [
      {
        "name": "Willow Grade",
        "value": "English Willow"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Ball Type",
        "value": "Leather Ball"
      },
      {
        "name": "Bat Weight",
        "value": "2 lb 5 oz–2 lb 7 oz"
      },
      {
        "name": "Playing Level",
        "value": "Advanced"
      },
      {
        "name": "Handle Type",
        "value": "Short Handle"
      }
    ]
  },
  {
    "slug": "bdmr-dynamic-pro-superb",
    "name": "BDMR Dynamic pro superb",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 50,000 / Piece",
    "image": "/assets/13-500x500-d4v6vbr0.jpg",
    "images": [
      "/assets/13-500x500-d4v6vbr0.jpg",
      "/assets/13-125x125-fyhfnx17.jpg",
      "/assets/13-125x125-fyhfnx17-2.jpg",
      "/assets/12-125x125-lvmtm6dx.jpg"
    ],
    "productCode": "325594564",
    "specifications": [
      {
        "name": "Bat Material",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade (Quality)",
        "value": "Grade 2"
      },
      {
        "name": "Bat Size",
        "value": "SH (Full Size)"
      },
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Willow Grade",
        "value": "Grade 1"
      },
      {
        "name": "Suitable For",
        "value": "Leather Ball"
      }
    ]
  },
  {
    "slug": "bdm-miniature-cricket-bat",
    "name": "BDM Miniature Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 600 / Piece",
    "image": "/assets/bdm-miniature-cricket-bat-500x500-uamsb1ys.jpg",
    "images": [
      "/assets/bdm-miniature-cricket-bat-500x500-uamsb1ys.jpg",
      "/assets/bdm-miniature-cricket-bat-125x125-x4913n1f.jpg",
      "/assets/bdm-miniature-cricket-bat-125x125-x4913n1f-2.jpg",
      "/assets/miniature-cricket-bat-1-125x125-1glo1eu1.jpg"
    ],
    "productCode": "AS05",
    "specifications": [
      {
        "name": "Bat Type",
        "value": "Cricket Mini Bat"
      },
      {
        "name": "Material",
        "value": "Poplar Wood"
      },
      {
        "name": "Usage",
        "value": "Autograph, Gift"
      },
      {
        "name": "Printing",
        "value": "Sticker Print"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-terminator-cricket-batting-gloves",
    "name": "BDM Terminator Cricket Batting Gloves",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 600",
    "image": "/assets/bdm-terminator-cricket-batting-gloves-25-1w9k1c8j.jpg",
    "images": [
      "/assets/bdm-terminator-cricket-batting-gloves-25-1w9k1c8j.jpg",
      "/assets/bdm-terminator-cricket-batting-gloves-50-leybr81n.jpg",
      "/assets/bdm-terminator-cricket-batting-gloves-50-1ggb3vtr.jpg",
      "/assets/bdm-terminator-cricket-batting-gloves-25-1w9k1c8j-2.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-power-x-treme-cricket-bat",
    "name": "BDM Dynamic Power X-Treme Cricket Bat",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 53,000 / Piece",
    "image": "/assets/bdm-dynamic-power-x-treme-cricket-bat-50-sv1df1nj.jpg",
    "images": [
      "/assets/bdm-dynamic-power-x-treme-cricket-bat-50-sv1df1nj.jpg",
      "/assets/bdm-dynamic-power-x-treme-cricket-bat-12-3mha614z.jpg",
      "/assets/bdm-dynamic-power-x-treme-cricket-bat-50-sv1df1nj-3.jpg",
      "/assets/bdm-dynamic-power-x-treme-cricket-bat-25-1bngqyfk-2.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Player Type",
        "value": "Expert, Intermediate, Advance"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-x-plod-pro-cricket-batting-leg-guards",
    "name": "BDM X-Plod Pro Cricket Batting Leg Guards",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 5,100 / pair",
    "image": "/assets/bdm-x-plod-pro-cricket-batting-leg-guard-1cc4d2v1.png",
    "images": [
      "/assets/bdm-x-plod-pro-cricket-batting-leg-guard-1cc4d2v1.png",
      "/assets/bdm-x-plod-pro-cricket-batting-leg-guard-1cc4d2v1-2.png",
      "/assets/bdm-x-plod-pro-cricket-batting-leg-guard-woygi140.png",
      "/assets/bdm-x-plod-pro-cricket-batting-leg-guard-woygi140-2.png"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-inner-supporters",
    "name": "BDM Inner Supporters",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 580 / Piece",
    "image": "/assets/bdm-inner-supporters-500x500-burout11.jpg",
    "images": [
      "/assets/bdm-inner-supporters-500x500-burout11.jpg",
      "/assets/bdm-inner-supporters-500x500-1a5nmqm1.png",
      "/assets/bdm-inner-supporters-500x500-ka23wks3.png",
      "/assets/bdm-inner-supporters-500x500-2zpa8c1o.png"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Size",
        "value": "M"
      },
      {
        "name": "Material",
        "value": "Cotton"
      },
      {
        "name": "Gender",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Frenchie"
      },
      {
        "name": "Packaging Type",
        "value": "Box"
      }
    ]
  },
  {
    "slug": "bdm-amazer-cricket-kit-bag",
    "name": "BDM Amazer Cricket Kit Bag",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 2,815 / Piece",
    "image": "/assets/cricket-kit-bag-bdm-amazer-500x500-11egumfb-2.jpg",
    "images": [
      "/assets/cricket-kit-bag-bdm-amazer-500x500-11egumfb-2.jpg",
      "/assets/cricket-kit-bag-bdm-amazer-500x500-11egumfb.jpg",
      "/assets/cricket-kit-bag-bdm-amazer-125x125-14833f1s.jpg",
      "/assets/cricket-kit-bag-bdm-amazer-125x125-14833f1s-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-armstrong-wicket-keeping-gloves",
    "name": "BDM Armstrong Wicket Keeping Gloves",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 1,560 / pair",
    "image": "/assets/bdm-armstrong-wicket-keeping-gloves-500x-7vkqwpe1-3.jpg",
    "images": [
      "/assets/bdm-armstrong-wicket-keeping-gloves-500x-7vkqwpe1-3.jpg",
      "/assets/bdm-armstrong-wicket-keeping-gloves-500x-7vkqwpe1.jpg",
      "/assets/bdm-armstrong-wicket-keeping-gloves-125x-ap6zpbui.jpg",
      "/assets/bdm-armstrong-wicket-keeping-gloves-125x-ap6zpbui-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-admiral-cricket-wicket-keeping-gloves",
    "name": "BDM Admiral Cricket Wicket Keeping Gloves",
    "category": "Cricket Bats",
    "categorySlug": "cricket-bat",
    "price": "Rs 4,220 / pair",
    "image": "/assets/bdm-admiral-cricket-wicket-keeping-glove-yvula11o-2.jpg",
    "images": [
      "/assets/bdm-admiral-cricket-wicket-keeping-glove-yvula11o-2.jpg",
      "/assets/bdm-admiral-cricket-wicket-keeping-glove-apc8vxla-2.jpg",
      "/assets/bdm-admiral-cricket-wicket-keeping-glove-11pgu2n6.jpg",
      "/assets/bdm-admiral-cricket-wicket-keeping-glove-11pgu2n6-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-dynamic-power-super-cricket-bat",
    "name": "BDM Dynamic Power Super Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 38,500 / Piece",
    "image": "/assets/bdm-dynamic-power-super-cricket-bat-500x-mdyzdqad.jpg",
    "images": [
      "/assets/bdm-dynamic-power-super-cricket-bat-500x-mdyzdqad.jpg",
      "/assets/bdm-dynamic-power-super-cricket-bat-500x-mdyzdqad-3.jpg",
      "/assets/bdm-dynamic-power-super-cricket-bat-500x-omhzyo10.jpg",
      "/assets/bdm-dynamic-power-super-cricket-bat-500x-mdyzdqad-2.jpg"
    ],
    "productCode": "EB07",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight, Light Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Advance"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      }
    ]
  },
  {
    "slug": "bdm-black-kaiser-english-willow-bat",
    "name": "BDM Black Kaiser English Willow Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 99,000 / Piece",
    "image": "/assets/bdm-black-kaiser-english-willow-bat-500x-162u0nkw.jpg",
    "images": [
      "/assets/bdm-black-kaiser-english-willow-bat-500x-162u0nkw.jpg",
      "/assets/bdm-black-kaiser-english-willow-bat-500x-162u0nkw-3.jpg",
      "/assets/bdm-black-kaiser-english-willow-bat-500x-162u0nkw-2.jpg",
      "/assets/bdm-black-kaiser-english-willow-bat-500x-1k76x0r1.jpg"
    ],
    "productCode": "01",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "1"
      },
      {
        "name": "Color",
        "value": "Natural"
      },
      {
        "name": "Handle Type",
        "value": "Short Handle"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight, Light Weight"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-power-original-cricket-bat",
    "name": "BDM Dynamic Power Original Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 35,000 / Piece",
    "image": "/assets/bdm-dynamic-power-original-cricket-bat-5-kr8k19bz-2.jpg",
    "images": [
      "/assets/bdm-dynamic-power-original-cricket-bat-5-kr8k19bz-2.jpg",
      "/assets/bdm-dynamic-power-original-cricket-bat-2-1vlu9m91-2.jpg",
      "/assets/bdm-dynamic-power-original-cricket-bat-1-nkustvsh.jpg",
      "/assets/bdm-dynamic-power-original-cricket-bat-1-nkustvsh-2.jpg"
    ],
    "productCode": "EB08",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Light Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Expert, Advance"
      }
    ]
  },
  {
    "slug": "bdm-aero-dynamic-cricket-bat",
    "name": "BDM Aero Dynamic Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 42,999 / Piece",
    "image": "/assets/bdm-aero-dynamic-cricket-bat-500x500-16bksdv1-2.jpg",
    "images": [
      "/assets/bdm-aero-dynamic-cricket-bat-500x500-16bksdv1-2.jpg",
      "/assets/bdm-aero-dynamic-cricket-bat-500x500-16bksdv1.jpg",
      "/assets/bdm-aero-dynamic-cricket-bat-500x500-1sazeujm.jpg",
      "/assets/bdm-aero-dynamic-cricket-bat-500x500-nhyg8a10.jpg"
    ],
    "productCode": "EB06",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight, Light Weight"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Advance"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      }
    ]
  },
  {
    "slug": "bdm-g6-cricket-bat",
    "name": "BDM G6 Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 12,000 / Piece",
    "image": "/assets/bdm-g6-cricket-bat-500x500-wpyp2h7m.jpg",
    "images": [
      "/assets/bdm-g6-cricket-bat-500x500-wpyp2h7m.jpg",
      "/assets/bdm-g6-cricket-bat-125x125-zjkxv3o3.jpg",
      "/assets/bdm-g6-cricket-bat-125x125-zjkxv3o3-2.jpg",
      "/assets/bdm-g6-cricket-bat-125x125-1fk52gjn.jpg"
    ],
    "productCode": "EB15",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner, Intermediate"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-ambassador-cricket-bat",
    "name": "BDM Ambassador Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 18,000 / Piece",
    "image": "/assets/bdm-ambassador-cricket-bat-500x500-15kk1k31.jpg",
    "images": [
      "/assets/bdm-ambassador-cricket-bat-500x500-15kk1k31.jpg",
      "/assets/bdm-ambassador-cricket-bat-125x125-18e6acpf.jpg",
      "/assets/bdm-ambassador-cricket-bat-125x125-18e6acpf-2.jpg",
      "/assets/bdm-ambassador-cricket-bat-125x125-ily9h91w.jpg"
    ],
    "productCode": "EB12",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Light Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner, Intermediate"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-sting-cricket-bat",
    "name": "BDM Sting Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 14,400 / Piece",
    "image": "/assets/bdm-sting-cricket-bat-500x500-6rfqmvz8.jpg",
    "images": [
      "/assets/bdm-sting-cricket-bat-500x500-6rfqmvz8.jpg",
      "/assets/bdm-sting-cricket-bat-125x125-9l1zfh1f.jpg",
      "/assets/bdm-sting-cricket-bat-125x125-9l1zfh1f-2.jpg",
      "/assets/bdm-sting-cricket-bat-125x125-49yy2at8.jpg"
    ],
    "productCode": "EB14",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Heavy Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-jai-ho-cricket-bat",
    "name": "BDM Jai Ho Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 15,600 / Piece",
    "image": "/assets/bdm-jai-ho-cricket-bat-500x500-1thsj7o1.jpg",
    "images": [
      "/assets/bdm-jai-ho-cricket-bat-500x500-1thsj7o1.jpg",
      "/assets/bdm-jai-ho-cricket-bat-125x125-1wbes0a1.jpg",
      "/assets/bdm-jai-ho-cricket-bat-125x125-1wbes0a1-2.jpg",
      "/assets/bdm-jai-ho-cricket-bat-125x125-1m416p5o.jpg"
    ],
    "productCode": "ST-2000",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Color",
        "value": "Natural"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Light Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner, Intermediate, Advance"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-power-xtreme-cricket-bat",
    "name": "Bdm Dynamic Power Xtreme Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 53,000 / Piece",
    "image": "/assets/bdm-dynamic-power-xtreme-500x500-15d765oa.jpg",
    "images": [
      "/assets/bdm-dynamic-power-xtreme-500x500-15d765oa.jpg",
      "/assets/bdm-dynamic-power-xtreme-125x125-1rhh6eq1.jpg",
      "/assets/bdm-dynamic-power-xtreme-125x125-1rhh6eq1-2.jpg",
      "/assets/bdm-dynamic-power-xtreme-125x125-6ehdw61r.jpg"
    ],
    "productCode": "239727258",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "1"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      }
    ]
  },
  {
    "slug": "bdm-baba-yaga-english-willow-bat",
    "name": "BDM Baba Yaga English Willow Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 24,200 / Piece",
    "image": "/assets/bdm-baba-yaga-english-willow-bat-500x500-bw0muqc9.jpg",
    "images": [
      "/assets/bdm-baba-yaga-english-willow-bat-500x500-bw0muqc9.jpg",
      "/assets/bdm-baba-yaga-english-willow-bat-125x125-epmvncsq.png",
      "/assets/bdm-baba-yaga-english-willow-bat-125x125-epmvncsq-2.png",
      "/assets/bdm-baba-yaga-english-willow-bat-125x125-1cw3klf1.jpg"
    ],
    "productCode": "03",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "1 , 2"
      },
      {
        "name": "Color",
        "value": "Natural"
      },
      {
        "name": "Handle Type",
        "value": "Short Handle"
      },
      {
        "name": "Bat Size",
        "value": "Full Size"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-twenty-20-cricket-bat",
    "name": "BDM Dynamic Twenty-20 Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 29,000 / Piece",
    "image": "/assets/bdm-dynamic-twenty-20-cricket-bat-500x50-19jlltvv.jpg",
    "images": [
      "/assets/bdm-dynamic-twenty-20-cricket-bat-500x50-19jlltvv.jpg",
      "/assets/bdm-dynamic-twenty-20-cricket-bat-125x12-1cd7umh1.jpg",
      "/assets/bdm-dynamic-twenty-20-cricket-bat-125x12-1cd7umh1-2.jpg",
      "/assets/bdm-dynamic-twenty-20-cricket-bat-125x12-10zc4fl1.jpg"
    ],
    "productCode": "EB17",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight, Light Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-boom-cricket-bat",
    "name": "BDM Boom Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 9,600 / Piece",
    "image": "/assets/bdm-boom-cricket-bat-500x500-1jntqih1.png",
    "images": [
      "/assets/bdm-boom-cricket-bat-500x500-1jntqih1.png",
      "/assets/bdm-boom-cricket-bat-125x125-1mhfzb31.png",
      "/assets/bdm-boom-cricket-bat-125x125-1mhfzb31-2.png",
      "/assets/bdm-boom-cricket-bat-125x125-10tdojw1.png"
    ],
    "productCode": "EB20",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Light Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-booster-cricket-bat",
    "name": "BDM Booster Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 7,200 / Piece",
    "image": "/assets/bdm-booster-cricket-bat-500x500-1ozlsmf5.jpg",
    "images": [
      "/assets/bdm-booster-cricket-bat-500x500-1ozlsmf5.jpg",
      "/assets/bdm-booster-cricket-bat-125x125-1rt81f1m.jpg",
      "/assets/bdm-booster-cricket-bat-125x125-1rt81f1m-2.jpg",
      "/assets/bdm-booster-cricket-bat-125x125-17hi559v.jpg"
    ],
    "productCode": "EB16",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight, Light Weight"
      },
      {
        "name": "Player Type",
        "value": "Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-amazer-cricket-bat",
    "name": "BDM Amazer Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 26,500 / Piece",
    "image": "/assets/bdm-amazer-cricket-bat-500x500-1kxteza1.jpg",
    "images": [
      "/assets/bdm-amazer-cricket-bat-500x500-1kxteza1.jpg",
      "/assets/bdm-amazer-cricket-bat-125x125-1nrfnrw4.jpg",
      "/assets/bdm-amazer-cricket-bat-125x125-1nrfnrw4-2.jpg",
      "/assets/bdm-amazer-cricket-bat-125x125-1xamrdvg.jpg"
    ],
    "productCode": "EB09",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size, Standard"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "English willow"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Medium Weight, Heavy Weight"
      }
    ]
  },
  {
    "slug": "bdm-titanium-cricket-bat",
    "name": "BDM Titanium Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 84,600 / Piece",
    "image": "/assets/bdm-titanium-cricket-bat-500x500-j3j3pv1c.jpg",
    "images": [
      "/assets/bdm-titanium-cricket-bat-500x500-j3j3pv1c.jpg",
      "/assets/bdm-titanium-cricket-bat-125x125-lx5cih1s.jpg",
      "/assets/bdm-titanium-cricket-bat-125x125-lx5cih1s-2.jpg",
      "/assets/bdm-titanium-cricket-bat-125x125-1l836skm.jpg"
    ],
    "productCode": "EB02",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Light Weight, Medium Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Advance, Expert"
      }
    ]
  },
  {
    "slug": "bdm-force-twenty-20-cricket-bat",
    "name": "BDM Force Twenty-20 Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 21,600 / Piece",
    "image": "/assets/bdm-force-twenty-20-cricket-bat-500x500-1sb7o5pr.jpg",
    "images": [
      "/assets/bdm-force-twenty-20-cricket-bat-500x500-1sb7o5pr.jpg",
      "/assets/bdm-force-twenty-20-cricket-bat-125x125-1v4twyb1.jpg",
      "/assets/bdm-force-twenty-20-cricket-bat-125x125-1v4twyb1-2.jpg",
      "/assets/bdm-force-twenty-20-cricket-bat-125x125-lpitgb1k.jpg"
    ],
    "productCode": "EB18",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Medium Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-master-blaster-cricket-bat",
    "name": "BDM Master Blaster Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 21,600 / Piece",
    "image": "/assets/bdm-master-blaster-cricket-bat-500x500-bbdo3qd9.jpg",
    "images": [
      "/assets/bdm-master-blaster-cricket-bat-500x500-bbdo3qd9.jpg",
      "/assets/bdm-master-blaster-cricket-bat-125x125-e4zwwctq.jpg",
      "/assets/bdm-master-blaster-cricket-bat-125x125-e4zwwctq-2.jpg",
      "/assets/bdm-master-blaster-cricket-bat-125x125-qwt1tc1y.jpg"
    ],
    "productCode": "22354362",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Heavy Weight, Medium Weight, Light Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-sixes-cricket-bat",
    "name": "BDM Sixes Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 15,597 / Piece",
    "image": "/assets/bdm-sixes-cricket-bat-500x500-6i08b2v6.jpg",
    "images": [
      "/assets/bdm-sixes-cricket-bat-500x500-6i08b2v6.jpg",
      "/assets/bdm-sixes-cricket-bat-125x125-9bmh3o1b.jpg",
      "/assets/bdm-sixes-cricket-bat-125x125-9bmh3o1b-2.jpg",
      "/assets/bdm-sixes-cricket-bat-125x125-1o6asp81.jpg"
    ],
    "productCode": "EB13",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Light Weight, Heavy Weight"
      },
      {
        "name": "Player Type",
        "value": "Intermediate, Beginner"
      },
      {
        "name": "Bow Size",
        "value": "Standard"
      },
      {
        "name": "Sweet Spot Location",
        "value": "Mid"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-english-willow-cricket-bat",
    "name": "BDM English Willow Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 38,500 / Piece",
    "image": "/assets/bdm-english-willow-cricket-bat-500x500-13zy9k11.jpg",
    "images": [
      "/assets/bdm-english-willow-cricket-bat-500x500-13zy9k11.jpg",
      "/assets/bdm-english-willow-cricket-bat-125x125-16tkicn1.jpg",
      "/assets/bdm-english-willow-cricket-bat-125x125-16tkicn1-2.jpg",
      "/assets/bdm-english-willow-cricket-bat-250x250-ftfx5xar.jpg"
    ],
    "productCode": "08",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "1"
      },
      {
        "name": "Color",
        "value": "Natural"
      },
      {
        "name": "Handle Type",
        "value": "Long Handle"
      },
      {
        "name": "Bat Weight",
        "value": "Medium Weight, Heavy Weight, Light Weight"
      }
    ]
  },
  {
    "slug": "bdm-admiral-wicket-keeping-inner-gloves",
    "name": "BDM Admiral Wicket keeping Inner Gloves",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 740 / pair",
    "image": "/assets/bdm-admiral-wicket-keeping-inner-gloves--15nzt8c9.jpg",
    "images": [
      "/assets/bdm-admiral-wicket-keeping-inner-gloves--15nzt8c9.jpg",
      "/assets/bdm-admiral-wicket-keeping-inner-gloves--hhhgu815.jpg",
      "/assets/bdm-admiral-wicket-keeping-inner-gloves--18hm20yp.jpg",
      "/assets/bdm-admiral-wicket-keeping-inner-gloves--18hm20yp-2.jpg"
    ],
    "productCode": "WI01",
    "specifications": []
  },
  {
    "slug": "bdm-fire-cricket-bat",
    "name": "BDM Fire Cricket Bat",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 19,200 / Piece",
    "image": "/assets/bdm-fire-cricket-bat-500x500-1q916d31.jpg",
    "images": [
      "/assets/bdm-fire-cricket-bat-500x500-1q916d31.jpg",
      "/assets/bdm-fire-cricket-bat-125x125-dc74n1q0.jpg",
      "/assets/bdm-fire-cricket-bat-125x125-dc74n1q0-2.jpg",
      "/assets/bdm-fire-cricket-bat-125x125-1g3v2hl6.jpg"
    ],
    "productCode": "EB11",
    "specifications": [
      {
        "name": "Bat Size",
        "value": "Full Size"
      },
      {
        "name": "Playing Level",
        "value": "Advanced"
      },
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Medium Weight, Heavy Weight"
      },
      {
        "name": "Cover Included",
        "value": "Yes"
      }
    ]
  },
  {
    "slug": "bdm-skin-fit-cotton-inner-gloves",
    "name": "BDM Skin Fit Cotton Inner Gloves",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 200 / pair",
    "image": "/assets/bdm-skin-fit-cotton-inner-gloves-500x500-17qjaq5q.jpg",
    "images": [
      "/assets/bdm-skin-fit-cotton-inner-gloves-500x500-17qjaq5q.jpg",
      "/assets/skin-fit-wicket-keeping-inner-gloves-4-1-1f3tg4e1.jpg",
      "/assets/skin-fit-wicket-keeping-inner-gloves-4-1-1f3tg4e1-2.jpg",
      "/assets/skin-fit-wicket-keeping-inner-gloves-3-1-1t95f8t1.jpg"
    ],
    "productCode": "WI05",
    "specifications": []
  },
  {
    "slug": "bdm-cricket-bats-rubber-grips",
    "name": "BDM Cricket Bats Rubber Grips",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 200 / Piece",
    "image": "/assets/bdm-cricket-bats-rubber-grips-500x500-ps7tge1n.png",
    "images": [
      "/assets/bdm-cricket-bats-rubber-grips-500x500-ps7tge1n.png",
      "/assets/bdm-cricket-bats-rubber-grips-125x125-slu2904z.png",
      "/assets/bdm-cricket-bats-rubber-grips-125x125-slu2904z-2.png",
      "/assets/bdm-cricket-bats-rubber-grips-125x125-3xfknvlb.png"
    ],
    "productCode": "AS17",
    "specifications": [
      {
        "name": "Grip Type",
        "value": "Dynamic"
      },
      {
        "name": "Material",
        "value": "Rubber"
      },
      {
        "name": "Color",
        "value": "Blue"
      },
      {
        "name": "Texture",
        "value": "Hard"
      },
      {
        "name": "Grip Length",
        "value": "Standard"
      },
      {
        "name": "Usage Level",
        "value": "Professional"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-super-wicket-keeping-gloves",
    "name": "BDM Dynamic Super Wicket Keeping Gloves",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 200",
    "image": "/assets/bdm-dynamic-super-wicket-keeping-gloves--152gzrd1.jpg",
    "images": [
      "/assets/bdm-dynamic-super-wicket-keeping-gloves--152gzrd1.jpg",
      "/assets/bdm-dynamic-super-wicket-keeping-gloves--1t8zc5h7-3.jpg",
      "/assets/bdm-dynamic-super-wicket-keeping-gloves--152gzrd1-3.jpg",
      "/assets/bdm-dynamic-super-wicket-keeping-gloves--1w2lky3o.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-commander-cricket-batting-pad",
    "name": "BDM Commander Cricket Batting Pad",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 2,420 / pair",
    "image": "/assets/bdm-commander-cricket-batting-pad-500x50-sgkw5v1y-2.jpg",
    "images": [
      "/assets/bdm-commander-cricket-batting-pad-500x50-sgkw5v1y-2.jpg",
      "/assets/bdm-commander-cricket-batting-pad-500x50-sgkw5v1y.jpg",
      "/assets/bdm-commander-cricket-batting-pad-500x50-4igy7211.jpg",
      "/assets/bdm-commander-cricket-batting-pad-500x50-yojiyh1d.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Type",
        "value": "Batting Pad"
      },
      {
        "name": "Size",
        "value": "Large"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Closure Type",
        "value": "Velcro"
      },
      {
        "name": "Pattern",
        "value": "Printed"
      }
    ]
  },
  {
    "slug": "bdm-club-master-cricket-kit-bag",
    "name": "BDM Club Master Cricket Kit Bag",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 2,625 / Piece",
    "image": "/assets/bdm-club-master-cricket-kit-bag-500x500-epamy717-2.jpg",
    "images": [
      "/assets/bdm-club-master-cricket-kit-bag-500x500-epamy717-2.jpg",
      "/assets/bdm-club-master-cricket-kit-bag-500x500-epamy717.jpg",
      "/assets/bdm-club-master-cricket-kit-bag-125x125-hiwvqt1n.jpg",
      "/assets/bdm-club-master-cricket-kit-bag-125x125-hiwvqt1n-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-aero-dynamic-wicket-keeping-gloves",
    "name": "BDM Aero Dynamic Wicket Keeping Gloves",
    "category": "English Willow Bats",
    "categorySlug": "bdm-english-willow-cricket-bat",
    "price": "Rs 5,960 / pair",
    "image": "/assets/bdm-aero-dynamic-wicket-keeping-gloves-5-1lgfr9rd-3.jpg",
    "images": [
      "/assets/bdm-aero-dynamic-wicket-keeping-gloves-5-1lgfr9rd-3.jpg",
      "/assets/bdm-aero-dynamic-wicket-keeping-gloves-2-x9xevn18-2.jpg",
      "/assets/bdm-aero-dynamic-wicket-keeping-gloves-1-1oa202dt.jpg",
      "/assets/bdm-aero-dynamic-wicket-keeping-gloves-1-1oa202dt-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-club-master-red-cricket-leather-ball",
    "name": "BDM Club Master Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 600 / Piece",
    "image": "/assets/bdm-club-master-red-leather-ball-500x500-o5x03y1n.jpg",
    "images": [
      "/assets/bdm-club-master-red-leather-ball-500x500-o5x03y1n.jpg",
      "/assets/club-master-red-leather-ball-2-500x500-10qplutk.jpg",
      "/assets/club-master-red-leather-ball-3-500x500-kehes3at.jpg",
      "/assets/bdm-club-master-red-leather-ball-500x500-o5x03y1n-3.jpg"
    ],
    "productCode": "120468923",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      }
    ]
  },
  {
    "slug": "bdm-armstrong-red-cricket-leather-ball",
    "name": "BDM Armstrong Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 720 / Piece",
    "image": "/assets/bdm-armstrong-cricket-leather-ball-500x5-16u730co.jpg",
    "images": [
      "/assets/bdm-armstrong-cricket-leather-ball-500x5-16u730co.jpg",
      "/assets/bdm-armstrong-cricket-leather-ball-500x5-1pk7b261.jpg",
      "/assets/bdm-armstrong-cricket-leather-ball-500x5-zypmhnoe.jpg",
      "/assets/bdm-armstrong-cricket-leather-ball-500x5-16u730co-3.jpg"
    ],
    "productCode": "VB3",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-olympic-red-cricket-leather-ball",
    "name": "BDM Olympic Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 370 / Piece",
    "image": "/assets/olympic-red-leather-ball-2-500x500-14mkcpf1.jpg",
    "images": [
      "/assets/olympic-red-leather-ball-2-500x500-14mkcpf1.jpg",
      "/assets/olympic-red-leather-ball-3-500x500-1smupfw3.jpg",
      "/assets/bdm-olympic-red-cricket-leather-ball-250-1421o4g1-2.jpg",
      "/assets/bdm-olympic-red-cricket-leather-ball-500-1s8k0ikt.jpg"
    ],
    "productCode": "121817722",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-aero-dynamic-red-cricket-leather-ball",
    "name": "BDM Aero Dynamic Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 2,680 / Piece",
    "image": "/assets/aero-dynamic-red-leather-ball-1-500x500-e2ll8bnl.jpg",
    "images": [
      "/assets/aero-dynamic-red-leather-ball-1-500x500-e2ll8bnl.jpg",
      "/assets/bdm-aero-dynamic-red-cricket-leather-bal-p8d0iw1j-2.jpg",
      "/assets/bdm-aero-dynamic-red-cricket-leather-bal-1devcx0n.jpg",
      "/assets/aero-dynamic-red-leather-ball-woman-2-50-1k4rplfe.jpg"
    ],
    "productCode": "120467145",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-aero-dynamic-white-cricket-leather-ball",
    "name": "BDM Aero Dynamic White Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 2,680 / Piece",
    "image": "/assets/aero-dynamic-white-leather-ball-3-500x50-1x4mulh1.jpg",
    "images": [
      "/assets/aero-dynamic-white-leather-ball-3-500x50-1x4mulh1.jpg",
      "/assets/aero-dynamic-white-lether-ball-2-500x500-2f0d9eoh.jpg",
      "/assets/bdm-aero-dynamic-white-cricket-leather-b-19022lh1.jpg",
      "/assets/bdm-aero-dynamic-white-cricket-leather-b-ktjq7dhj-2.jpg"
    ],
    "productCode": "120467102",
    "specifications": [
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-ambassador-white-leather-cricket-ball",
    "name": "BDM Ambassador White Leather Cricket Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 800 / Piece",
    "image": "/assets/bdm-ambassador-white-leather-cricket-bal-72sxr61p.jpg",
    "images": [
      "/assets/bdm-ambassador-white-leather-cricket-bal-72sxr61p.jpg",
      "/assets/bdm-ambassador-white-leather-cricket-bal-1hxenc6l.jpg",
      "/assets/bdm-ambassador-white-leather-cricket-bal-9wf6js6k.jpg",
      "/assets/bdm-ambassador-white-leather-cricket-bal-9wf6js6k-2.jpg"
    ],
    "productCode": "120467584",
    "specifications": [
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-commander-red-leather-ball",
    "name": "BDM Commander Red Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 1,140 / Piece",
    "image": "/assets/bdm-commander-leather-ball-500x500-jc8itoka.jpg",
    "images": [
      "/assets/bdm-commander-leather-ball-500x500-jc8itoka.jpg",
      "/assets/bdm-commander-leather-ball-125x125-m5urma10.jpg",
      "/assets/bdm-commander-leather-ball-125x125-m5urma10-2.jpg",
      "/assets/bdm-commander-leather-ball-125x125-1vdci8vh.jpg"
    ],
    "productCode": "77206304",
    "specifications": [
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-royal-crown-cricket-white-leather-ball",
    "name": "BDM Royal Crown Cricket White Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 699 / Piece",
    "image": "/assets/bdm-royal-crown-cricket-white-leather-ba-x0v6j11p.jpg",
    "images": [
      "/assets/bdm-royal-crown-cricket-white-leather-ba-x0v6j11p.jpg",
      "/assets/bdm-royal-crown-cricket-white-leather-ba-8ucu4xmn.jpg",
      "/assets/bdm-royal-crown-cricket-white-leather-ba-zuhfbn7d.jpg",
      "/assets/bdm-royal-crown-cricket-white-leather-ba-zuhfbn7d-2.jpg"
    ],
    "productCode": "121818315",
    "specifications": [
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-world-cup-red-leather-cricket-ball",
    "name": "BDM World Cup Red Leather Cricket Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 560 / Piece",
    "image": "/assets/bdm-world-cup-red-leather-cricket-ball-5-f23t6k1u.jpg",
    "images": [
      "/assets/bdm-world-cup-red-leather-cricket-ball-5-f23t6k1u.jpg",
      "/assets/bdm-world-cup-red-leather-cricket-ball-2-1pwpirkr.jpg",
      "/assets/bdm-world-cup-red-leather-cricket-ball-1-hvq1z6bs.jpg",
      "/assets/bdm-world-cup-red-leather-cricket-ball-1-hvq1z6bs-2.jpg"
    ],
    "productCode": "121727569",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-thums-up-leather-ball",
    "name": "BDM Thums Up Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 340 / Piece",
    "image": "/assets/bdm-thums-up-leather-ball-500x500-dpfg10hr.jpg",
    "images": [
      "/assets/bdm-thums-up-leather-ball-500x500-dpfg10hr.jpg",
      "/assets/bdm-thums-up-leather-ball-125x125-gj1otmy8.jpg",
      "/assets/bdm-thums-up-leather-ball-125x125-gj1otmy8-2.jpg",
      "/assets/thums-up-red-leather-ball-3-125x125-1n8i2kd1.jpg"
    ],
    "productCode": "121725099",
    "specifications": [
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-kingfisher-league-special-red-leather-ball",
    "name": "BDM Kingfisher League Special Red Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 940 / Piece",
    "image": "/assets/bdm-kingfisher-league-special-red-leathe-zsa0udqp.jpg",
    "images": [
      "/assets/bdm-kingfisher-league-special-red-leathe-zsa0udqp.jpg",
      "/assets/bdm-kingfisher-league-special-red-leathe-blrog91m.jpg",
      "/assets/bdm-kingfisher-league-special-red-leathe-12lw9mz1.jpg",
      "/assets/bdm-kingfisher-league-special-red-leathe-12lw9mz1-2.jpg"
    ],
    "productCode": "121850673",
    "specifications": [
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-hanging-and-knocking-ball",
    "name": "BDM Hanging & Knocking Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "",
    "image": "/assets/bdm-hanging-knocking-ball-500x500-elgade1b.jpg",
    "images": [
      "/assets/bdm-hanging-knocking-ball-500x500-elgade1b.jpg",
      "/assets/bdm-hanging-knocking-ball-125x125-hf2j601r.png",
      "/assets/bdm-hanging-knocking-ball-125x125-hf2j601r-2.png",
      "/assets/bdm-hanging-knocking-ball-125x125-13shloz1.png"
    ],
    "productCode": "121816263",
    "specifications": [
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Light Type",
        "value": "No Light"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Surface Finish",
        "value": "Glossy"
      }
    ]
  },
  {
    "slug": "bdm-kapil-dev-autograph-leather-ball",
    "name": "BDM Kapil Dev Autograph Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "",
    "image": "/assets/kapil-dev-autograph-leather-ball-1-500x5-jk7nbkd4.jpg",
    "images": [
      "/assets/kapil-dev-autograph-leather-ball-1-500x5-jk7nbkd4.jpg",
      "/assets/kapil-dev-autograph-leather-ball-1-125x1-mdtw46tl.jpg",
      "/assets/kapil-dev-autograph-leather-ball-1-125x1-mdtw46tl-2.jpg",
      "/assets/kapil-dev-autograph-leather-ball-3-125x1-g75o5y1e.jpg"
    ],
    "productCode": "121852001",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-special-crown-leather-ball",
    "name": "BDM Special Crown Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "",
    "image": "/assets/bdm-special-crown-leather-ball-500x500-1nu146tp.jpg",
    "images": [
      "/assets/bdm-special-crown-leather-ball-500x500-1nu146tp.jpg",
      "/assets/bdm-special-crown-leather-ball-125x125-1qnnczf1.jpg",
      "/assets/bdm-special-crown-leather-ball-125x125-1qnnczf1-2.jpg",
      "/assets/bd-125x125-6oztsg1v.jpg"
    ],
    "productCode": "121818644",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-red-bullet-cricket-ball",
    "name": "BDM Red Bullet Cricket Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 600 / Piece",
    "image": "/assets/bdm-red-bullet-cricket-ball-500x500-84tkclv0.jpg",
    "images": [
      "/assets/bdm-red-bullet-cricket-ball-500x500-84tkclv0.jpg",
      "/assets/bdm-red-bullet-cricket-ball-125x125-ayft571b.jpg",
      "/assets/bdm-red-bullet-cricket-ball-125x125-ayft571b-2.jpg",
      "/assets/bdm-red-bullet-cricket-ball-125x125-1x6126y5.jpg"
    ],
    "productCode": "22954507",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-super-test-red-cricket-leather-ball",
    "name": "BDM Super Test Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 880 / Piece",
    "image": "/assets/bdm-super-test-red-cricket-leather-ball--m7dnc119.jpg",
    "images": [
      "/assets/bdm-super-test-red-cricket-leather-ball--m7dnc119.jpg",
      "/assets/bdm-super-test-red-cricket-leather-ball--1x1zcx15.jpg",
      "/assets/bdm-super-test-red-cricket-leather-ball--p0zw4n1p.jpg",
      "/assets/bdm-super-test-red-cricket-leather-ball--p0zw4n1p-2.jpg"
    ],
    "productCode": "VB1",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-agni-white-cricket-leather-ball",
    "name": "BDM Agni White Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 640 / Piece",
    "image": "/assets/armstrong-cricket-ball-500x500-1w5bonw1.jpg",
    "images": [
      "/assets/armstrong-cricket-ball-500x500-1w5bonw1.jpg",
      "/assets/armstrong-cricket-ball-125x125-1yyxxgi1.jpg",
      "/assets/armstrong-cricket-ball-125x125-1yyxxgi1-2.jpg",
      "/assets/armstrong-cricket-ball-250x250-17ytc9s4.jpg"
    ],
    "productCode": "22954749",
    "specifications": [
      {
        "name": "Ball Type",
        "value": "Leather Ball"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Series",
        "value": "Club"
      },
      {
        "name": "Intended Use",
        "value": "Match"
      },
      {
        "name": "Construction",
        "value": "Two Piece"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-agni-red-cricket-leather-ball",
    "name": "BDM Agni Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 640 / Piece",
    "image": "/assets/bdm-agni-red-cricket-leather-ball-500x50-a3vech1x.jpg",
    "images": [
      "/assets/bdm-agni-red-cricket-leather-ball-500x50-a3vech1x.jpg",
      "/assets/bdm-agni-red-cricket-leather-ball-125x12-cxhn53es.jpg",
      "/assets/bdm-agni-red-cricket-leather-ball-125x12-cxhn53es-2.jpg",
      "/assets/bdm-agni-red-cricket-leather-ball-125x12-17jpt4m1.jpg"
    ],
    "productCode": "AB9",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Quality",
        "value": "1 Packet (6 Balls)"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-amazer-red-cricket-leather-ball",
    "name": "BDM Amazer Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 1,401 / Piece",
    "image": "/assets/bdm-amazer-red-cricket-leather-ball-500x-1cggr5y1.jpg",
    "images": [
      "/assets/bdm-amazer-red-cricket-leather-ball-500x-1cggr5y1.jpg",
      "/assets/bdm-amazer-red-cricket-leather-ball-125x-1fa2zyk1.jpg",
      "/assets/bdm-amazer-red-cricket-leather-ball-125x-1fa2zyk1-2.jpg",
      "/assets/bdm-amazer-red-cricket-leather-ball-125x-twb6jqu2.jpg"
    ],
    "productCode": "AB3",
    "specifications": [
      {
        "name": "Color",
        "value": "RED"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-ambassador-red-cricket-leather-ball",
    "name": "BDM Ambassador Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 820 / Piece",
    "image": "/assets/bdm-ambassador-cricket-leather-ball-500x-h408eu1n.jpg",
    "images": [
      "/assets/bdm-ambassador-cricket-leather-ball-500x-h408eu1n.jpg",
      "/assets/bdm-ambassador-cricket-leather-ball-125x-jxmh7g5c.jpg",
      "/assets/bdm-ambassador-cricket-leather-ball-125x-jxmh7g5c-2.jpg",
      "/assets/bdm-ambassador-cricket-leather-ball-125x-txb0qcux.jpg"
    ],
    "productCode": "VB2",
    "specifications": [
      {
        "name": "Color",
        "value": "RED"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-quick-spring-red-cricket-leather-ball",
    "name": "BDM Quick Spring Red Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 1,040 / Piece",
    "image": "/assets/bdm-quick-spring-cricket-leather-ball-50-d9wtiqzm.jpg",
    "images": [
      "/assets/bdm-quick-spring-cricket-leather-ball-50-d9wtiqzm.jpg",
      "/assets/bdm-quick-spring-cricket-leather-ball-25-1o4ij3q1.jpg",
      "/assets/bdm-quick-spring-cricket-leather-ball-12-g3j2bc1g.jpg",
      "/assets/bdm-quick-spring-cricket-leather-ball-12-g3j2bc1g-2.jpg"
    ],
    "productCode": "AB5",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-royal-crown-cricket-red-leather-ball",
    "name": "BDM Royal Crown Cricket Red Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 700 / Piece",
    "image": "/assets/bdm-royal-crown-cricket-red-leather-ball-pxxeva13.jpg",
    "images": [
      "/assets/bdm-royal-crown-cricket-red-leather-ball-pxxeva13.jpg",
      "/assets/bdm-royal-crown-cricket-red-leather-ball-1rf2h6b2.jpg",
      "/assets/bdm-royal-crown-cricket-red-leather-ball-srjnnw1k.jpg",
      "/assets/bdm-royal-crown-cricket-red-leather-ball-srjnnw1k-2.jpg"
    ],
    "productCode": "AB8",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-power-cricket-leather-ball",
    "name": "BDM Dynamic Power Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 1,976 / Piece",
    "image": "/assets/bdm-dynamic-power-cricket-leather-ball-5-zwlgop2a.jpg",
    "images": [
      "/assets/bdm-dynamic-power-cricket-leather-ball-5-zwlgop2a.jpg",
      "/assets/bdm-dynamic-power-cricket-leather-ball-2-bq34aly0.jpg",
      "/assets/bdm-dynamic-power-cricket-leather-ball-1-12q7phbi.jpg",
      "/assets/bdm-dynamic-power-cricket-leather-ball-1-12q7phbi-2.jpg"
    ],
    "productCode": "AB2",
    "specifications": [
      {
        "name": "Color",
        "value": "White, Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-shooting-star-cricket-leather-ball",
    "name": "BDM Shooting Star Cricket Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 560 / Piece",
    "image": "/assets/bdm-shooting-star-cricket-leather-ball-5-qy0ktl8m.jpg",
    "images": [
      "/assets/bdm-shooting-star-cricket-leather-ball-5-qy0ktl8m.jpg",
      "/assets/bdm-shooting-star-cricket-leather-ball-2-2ri8fh14.jpg",
      "/assets/bdm-shooting-star-cricket-leather-ball-1-trmtm7p3.jpg",
      "/assets/bdm-shooting-star-cricket-leather-ball-1-trmtm7p3-2.jpg"
    ],
    "productCode": "116158886",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-commander-county-red-leather-ball",
    "name": "BDM Commander County Red Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 1,140 / Piece",
    "image": "/assets/bdm-commander-county-red-leather-ball-50-1e53vtj1.jpg",
    "images": [
      "/assets/bdm-commander-county-red-leather-ball-50-1e53vtj1.jpg",
      "/assets/bdm-commander-county-red-leather-ball-25-pyljff2p.jpg",
      "/assets/bdm-commander-county-red-leather-ball-12-1gyq4m51.jpg",
      "/assets/bdm-commander-county-red-leather-ball-12-1gyq4m51-2.jpg"
    ],
    "productCode": "121208524",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-kingfisher-club-red-leather-ball",
    "name": "BDM Kingfisher Club Red Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 760 / Piece",
    "image": "/assets/bdm-kingfisher-club-red-leather-ball-500-umj5bd1h.jpg",
    "images": [
      "/assets/bdm-kingfisher-club-red-leather-ball-500-umj5bd1h.jpg",
      "/assets/bdm-kingfisher-club-red-leather-ball-250-6g0sx9e2.jpg",
      "/assets/bdm-kingfisher-club-red-leather-ball-125-xg5e3z1x.jpg",
      "/assets/bdm-kingfisher-club-red-leather-ball-125-xg5e3z1x-2.jpg"
    ],
    "productCode": "121850401",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-kingfisher-match-red-leather-ball",
    "name": "BDM Kingfisher Match Red Leather Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 820 / Piece",
    "image": "/assets/kingfisher-match-red-leahter-ball-1-500x-1172ajv1.jpg",
    "images": [
      "/assets/kingfisher-match-red-leahter-ball-1-500x-1172ajv1.jpg",
      "/assets/kingfisher-match-red-leahter-ball-1-125x-140ojch1.jpg",
      "/assets/kingfisher-match-red-leahter-ball-1-125x-140ojch1-2.jpg",
      "/assets/kingfisher-match-red-leahter-ball-3-125x-15wxp4x1.jpg"
    ],
    "productCode": "121851252",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      }
    ]
  },
  {
    "slug": "bdm-galaxy-leather-cricket-ball",
    "name": "BDM Galaxy Leather Cricket Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 700 / Piece",
    "image": "/assets/bdm-galaxy-leather-cricket-ball-500x500-1058u6n1.jpg",
    "images": [
      "/assets/bdm-galaxy-leather-cricket-ball-500x500-1058u6n1.jpg",
      "/assets/bdm-galaxy-leather-cricket-ball-125x125-12yv2z9e.jpg",
      "/assets/bdm-galaxy-leather-cricket-ball-125x125-12yv2z9e-2.jpg",
      "/assets/galaxy-plus-red-leather-ball-3-125x125-2ojd0otq.jpg"
    ],
    "productCode": "121852784",
    "specifications": [
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "leather-cricket-ball",
    "name": "Leather Cricket Ball",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "",
    "image": "/assets/leather-cricket-ball-500x500-yneobc18.jpg",
    "images": [
      "/assets/leather-cricket-ball-500x500-yneobc18.jpg",
      "/assets/leather-cricket-ball-125x125-11h0x3y1.jpg",
      "/assets/leather-cricket-ball-125x125-11h0x3y1-2.jpg",
      "/assets/download-125x125-1firwh5i.jpg"
    ],
    "productCode": "252446595",
    "specifications": [
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Full"
      },
      {
        "name": "Country Of Manufacture",
        "value": "BDM"
      },
      {
        "name": "I Deal In",
        "value": "New Only"
      }
    ]
  },
  {
    "slug": "bdm-cricket-ball-four-piece",
    "name": "BDM Cricket Ball-Four Piece",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "",
    "image": "/assets/four-piece-cricket-ball-500x500-1o1xxl71.jpg",
    "images": [
      "/assets/four-piece-cricket-ball-500x500-1o1xxl71.jpg",
      "/assets/four-piece-cricket-ball-125x125-1qvk6dta.jpg",
      "/assets/four-piece-cricket-ball-125x125-1qvk6dta-2.jpg",
      "/assets/four-piece-cricket-ball-250x250-zvfl73pt.jpg"
    ],
    "productCode": "22955281",
    "specifications": [
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Color",
        "value": "Red"
      },
      {
        "name": "Size",
        "value": "Full"
      },
      {
        "name": "Packaging Type",
        "value": "Box"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-master-blaster-cricket-helmet",
    "name": "BDM Master Blaster Cricket Helmet",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 1,995 / Piece",
    "image": "/assets/bdm-master-blaster-cricket-helmet-500x50-nkkaj81o.jpg",
    "images": [
      "/assets/bdm-master-blaster-cricket-helmet-500x50-nkkaj81o.jpg",
      "/assets/bdm-master-blaster-cricket-helmet-500x50-1bhlgoqk.jpg",
      "/assets/bdm-master-blaster-cricket-helmet-500x50-8uvlueul.jpg",
      "/assets/bdm-master-blaster-cricket-helmet-500x50-ldln021r.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-dasher-batting-gloves",
    "name": "BDM Dasher Batting Gloves",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 3,700 / pair",
    "image": "/assets/bdm-dasher-batting-gloves-500x500-1eq8m3wh.jpg",
    "images": [
      "/assets/bdm-dasher-batting-gloves-500x500-1eq8m3wh.jpg",
      "/assets/bdm-dasher-batting-gloves-500x500-1dqvia51.jpg",
      "/assets/bdm-dasher-batting-gloves-500x500-1eq8m3wh-2.jpg",
      "/assets/bdm-dasher-batting-gloves-125x125-1hjuuwix.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Size",
        "value": "Large"
      },
      {
        "name": "Closure Type",
        "value": "Velcro"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Type",
        "value": "Sports"
      },
      {
        "name": "Pattern",
        "value": "Printed"
      }
    ]
  },
  {
    "slug": "bdm-titanium-batting-gloves",
    "name": "BDM Titanium Batting Gloves",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 4,600 / pair",
    "image": "/assets/bdm-titanium-batting-gloves-500x500-qdkqt9mj-2.jpg",
    "images": [
      "/assets/bdm-titanium-batting-gloves-500x500-qdkqt9mj-2.jpg",
      "/assets/bdm-titanium-batting-gloves-500x500-15qxown1.jpg",
      "/assets/bdm-titanium-batting-gloves-500x500-qdkqt9mj-3.jpg",
      "/assets/bdm-titanium-batting-gloves-125x125-t76zlv13.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-amazer-batting-gloves",
    "name": "BDM Amazer Batting Gloves",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 2,340 / pair",
    "image": "/assets/bdm-amazer-batting-gloves-500x500-1y55msc1.jpg",
    "images": [
      "/assets/bdm-amazer-batting-gloves-500x500-1y55msc1.jpg",
      "/assets/bdm-amazer-batting-gloves-500x500-nedzuvm6.jpg",
      "/assets/bdm-amazer-batting-gloves-500x500-1y55msc1-2.jpg",
      "/assets/bdm-amazer-batting-gloves-125x125-1xntlu1v.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-hunk-english-willow-cricket-bat",
    "name": "BDM HUNK ENGLISH WILLOW CRICKET BAT",
    "category": "Cricket Balls",
    "categorySlug": "cricket-ball",
    "price": "Rs 10,400 / Piece",
    "image": "/assets/bdm-hunk-english-willow-cricket-bat-500x-geahjg1t.jpg",
    "images": [
      "/assets/bdm-hunk-english-willow-cricket-bat-500x-geahjg1t.jpg",
      "/assets/bdm-hunk-english-willow-cricket-bat-500x-geahjg1t-2.jpg",
      "/assets/bdm-hunk-english-willow-cricket-bat-500x-feu06cyj.jpg",
      "/assets/bdm-hunk-english-willow-cricket-bat-500x-2ca8vf1j.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Willow Type",
        "value": "English Willow"
      },
      {
        "name": "Willow Grade",
        "value": "2"
      },
      {
        "name": "Handle Type",
        "value": "Standard Handle"
      },
      {
        "name": "Bat Weight",
        "value": "Light Weight, Medium Weight, Heavy Weight"
      },
      {
        "name": "Color",
        "value": "White"
      }
    ]
  },
  {
    "slug": "bdm-bullet-white-leather-ball",
    "name": "BDM Bullet White Leather Ball",
    "category": "Leather Cricket Balls",
    "categorySlug": "leather-cricket-ball",
    "price": "Rs 600 / Piece",
    "image": "/assets/bdm-bullet-white-leather-ball-500x500-1asw0gc1.jpg",
    "images": [
      "/assets/bdm-bullet-white-leather-ball-500x500-1asw0gc1.jpg",
      "/assets/bdm-bullet-white-leather-ball-500x500-h3zmyw1u.jpg",
      "/assets/bdm-bullet-white-leather-ball-500x500-2q4sxl1a.jpg",
      "/assets/bdm-bullet-white-leather-ball-500x500-1asw0gc1-2.jpg"
    ],
    "productCode": "48161859",
    "specifications": [
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Size",
        "value": "Men"
      },
      {
        "name": "Type",
        "value": "Leather"
      },
      {
        "name": "Quality",
        "value": "1 Packet (6 Balls)"
      },
      {
        "name": "Weight",
        "value": "155-165 gm"
      },
      {
        "name": "Material",
        "value": "Leather"
      }
    ]
  },
  {
    "slug": "bdm-spring-back-stump",
    "name": "BDM Spring Back Stump",
    "category": "Leather Cricket Balls",
    "categorySlug": "leather-cricket-ball",
    "price": "Rs 2,600 / Piece",
    "image": "/assets/bdm-spring-back-stump-500x500-sl6w04wq.png",
    "images": [
      "/assets/bdm-spring-back-stump-500x500-sl6w04wq.png",
      "/assets/bdm-spring-back-stump-500x500-1knaumy1.png",
      "/assets/bdm-spring-back-stump-500x500-p9f5lpm9.png",
      "/assets/bdm-spring-back-stump-500x500-sl6w04wq-2.png"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-dynamic-super-batting-gloves",
    "name": "BDM Dynamic Super Batting Gloves",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 3,900 / pair",
    "image": "/assets/bdm-dynamic-super-batting-gloves-500x500-hv06kamq.jpg",
    "images": [
      "/assets/bdm-dynamic-super-batting-gloves-500x500-hv06kamq.jpg",
      "/assets/bdm-dynamic-super-batting-gloves-500x500-t38cgxfn.jpg",
      "/assets/bdm-dynamic-super-batting-gloves-500x500-hv06kamq-2.jpg",
      "/assets/bdm-dynamic-super-batting-gloves-125x125-komfcw13.jpg"
    ],
    "productCode": "BG12",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-commander-batting-gloves",
    "name": "BDM Commander Batting Gloves",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 2,850 / pair",
    "image": "/assets/bdm-commander-batting-gloves-500x500-zzvwnxks.jpg",
    "images": [
      "/assets/bdm-commander-batting-gloves-500x500-zzvwnxks.jpg",
      "/assets/bdm-commander-batting-gloves-125x125-12ti5gj1.jpg",
      "/assets/bdm-commander-batting-gloves-125x125-12ti5gj1-2.jpg",
      "/assets/bdm-commander-batting-gloves-125x125-etcjx1i5.jpg"
    ],
    "productCode": "BG07",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-master-blaster-batting-gloves",
    "name": "BDM Master Blaster Batting Gloves",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 1,160 / pair",
    "image": "/assets/bdm-master-blaster-batting-gloves-500x50-1w7wghr6.jpg",
    "images": [
      "/assets/bdm-master-blaster-batting-gloves-500x50-1w7wghr6.jpg",
      "/assets/bdm-master-blaster-batting-gloves-125x12-enb9mrt0.jpg",
      "/assets/bdm-master-blaster-batting-gloves-125x12-enb9mrt0-2.jpg",
      "/assets/bdm-master-blaster-batting-gloves-125x12-1wcyxtja.jpg"
    ],
    "productCode": "BG15",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-galaxy-cricket-batting-glove",
    "name": "BDM Galaxy Cricket Batting Glove",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 2,100 / pair",
    "image": "/assets/bdm-galaxy-cricket-batting-glove-500x500-yhsczu15.jpg",
    "images": [
      "/assets/bdm-galaxy-cricket-batting-glove-500x500-yhsczu15.jpg",
      "/assets/bdm-galaxy-cricket-batting-glove-125x125-11belsg1.jpg",
      "/assets/bdm-galaxy-cricket-batting-glove-125x125-11belsg1-2.jpg",
      "/assets/bdm-galaxy-cricket-batting-glove-125x125-1xz3t324.jpg"
    ],
    "productCode": "BG08",
    "specifications": [
      {
        "name": "Material",
        "value": "Leather"
      },
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-club-master-cricket-batting-gloves",
    "name": "BDM Club Master Cricket Batting Gloves",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 740 / pair",
    "image": "/assets/bdm-club-master-cricket-batting-gloves-5-x8ybb018.jpg",
    "images": [
      "/assets/bdm-club-master-cricket-batting-gloves-5-x8ybb018.jpg",
      "/assets/bdm-club-master-cricket-batting-gloves-2-92fyww4s.jpg",
      "/assets/bdm-club-master-cricket-batting-gloves-1-102kk3m1.jpg",
      "/assets/bdm-club-master-cricket-batting-gloves-1-102kk3m1-2.jpg"
    ],
    "productCode": "BG19",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-player-s-autograph-cricket-batting-glove",
    "name": "BDM Player's Autograph Cricket Batting Glove",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 800 / pair",
    "image": "/assets/bdm-player-s-autograph-cricket-batting-g-hpfywyi1.jpg",
    "images": [
      "/assets/bdm-player-s-autograph-cricket-batting-g-hpfywyi1.jpg",
      "/assets/bdm-player-s-autograph-cricket-batting-g-1sk1ohy1.jpg",
      "/assets/bdm-player-s-autograph-cricket-batting-g-kj27pkyi.jpg",
      "/assets/bdm-player-s-autograph-cricket-batting-g-kj27pkyi-2.jpg"
    ],
    "productCode": "BG10",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-galaxy-wicket-keeping-inner-gloves",
    "name": "BDM Galaxy Wicket Keeping Inner Gloves",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 330 / pair",
    "image": "/assets/bdm-galaxy-wicket-keeping-inner-gloves-5-1uj188cs.jpg",
    "images": [
      "/assets/bdm-galaxy-wicket-keeping-inner-gloves-5-1uj188cs.jpg",
      "/assets/bdm-galaxy-wicket-keeping-inner-gloves-2-16civu81.jpg",
      "/assets/bdm-galaxy-wicket-keeping-inner-gloves-1-1xcnh0y1.jpg",
      "/assets/bdm-galaxy-wicket-keeping-inner-gloves-1-1xcnh0y1-2.jpg"
    ],
    "productCode": "WI02",
    "specifications": [
      {
        "name": "Material",
        "value": "Cotton"
      },
      {
        "name": "Type",
        "value": "Inner Gloves"
      },
      {
        "name": "Gloves Type",
        "value": "Wicket Keeping inner Gloves"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Sport Type",
        "value": "Cricket"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-super-thigh-guard",
    "name": "BDM Dynamic Super Thigh Guard",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 330",
    "image": "/assets/bdm-dynamic-super-thigh-guard-500x500-igghbr10.jpg",
    "images": [
      "/assets/bdm-dynamic-super-thigh-guard-500x500-igghbr10.jpg",
      "/assets/dynamic-super-thigh-guard-3-500x500-ef1n2tcp.jpg",
      "/assets/dynamic-super-thigh-guard-2-500x500-1ptrs5b1.jpg",
      "/assets/bdm-dynamic-super-thigh-guard-500x500-igghbr10-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-duffle-cricket-kit-bag",
    "name": "BDM Duffle Cricket Kit Bag",
    "category": "Batting Gloves",
    "categorySlug": "cricket-batting-gloves",
    "price": "Rs 3,780",
    "image": "/assets/61azi8ywoll-sx679-500x500-bgdjt91u-2.jpg",
    "images": [
      "/assets/61azi8ywoll-sx679-500x500-bgdjt91u-2.jpg",
      "/assets/61azi8ywoll-sx679-500x500-bgdjt91u.jpg",
      "/assets/61hsy-cbrjl-sx679-500x500-lc8i1nhk.jpg",
      "/assets/61uhahrvzul-sx679-500x500-jmcj2czb.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Style",
        "value": "Duffle Bag"
      },
      {
        "name": "Color",
        "value": "Multi"
      },
      {
        "name": "Gender",
        "value": "Unisex"
      },
      {
        "name": "Usage/Application",
        "value": "Cricket"
      },
      {
        "name": "I Deal In",
        "value": "New Only"
      }
    ]
  },
  {
    "slug": "bdm-commander-wicket-keeping-gloves",
    "name": "BDM Commander Wicket Keeping Gloves",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "wicket-keeping-gloves",
    "price": "Rs 600 / pair",
    "image": "/assets/bdm-commander-wicket-keeping-gloves-500x-mtv3kj1f-3.jpg",
    "images": [
      "/assets/bdm-commander-wicket-keeping-gloves-500x-mtv3kj1f-3.jpg",
      "/assets/bdm-commander-wicket-keeping-gloves-500x-mtv3kj1f.jpg",
      "/assets/bdm-commander-wicket-keeping-gloves-500x-59h7sv1h.jpg",
      "/assets/bdm-commander-wicket-keeping-gloves-500x-2ql8qp1a.jpg"
    ],
    "productCode": "22891288",
    "specifications": [
      {
        "name": "Size",
        "value": "Large"
      },
      {
        "name": "Color",
        "value": "Multi"
      },
      {
        "name": "Sport Type",
        "value": "Sports Good"
      },
      {
        "name": "Type",
        "value": "Wicket Keeping"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-calf-red-band",
    "name": "BDM Calf Red Band",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "wicket-keeping-gloves",
    "price": "Rs 600",
    "image": "/assets/bdm-calf-red-band-500x500-1vsl206t-2.jpg",
    "images": [
      "/assets/bdm-calf-red-band-500x500-1vsl206t-2.jpg",
      "/assets/bdm-calf-red-band-500x500-1vsl206t.jpg",
      "/assets/calf-band-red-3-500x500-1hx0xd61.jpg",
      "/assets/calf-band-red-2-500x500-1dxnk7qh.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Player Type",
        "value": "Beginner, Intermediate, Advance"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-duffle-wheeler-kit-bag",
    "name": "BDM Duffle Wheeler Kit Bag",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "wicket-keeping-gloves",
    "price": "Rs 4,200 / Piece",
    "image": "/assets/bdm-duffle-wheeler-kit-bag-500x500-mwo62l1n-2.jpg",
    "images": [
      "/assets/bdm-duffle-wheeler-kit-bag-500x500-mwo62l1n-2.jpg",
      "/assets/bdm-duffle-wheeler-kit-bag-500x500-mwo62l1n.jpg",
      "/assets/bdm-duffle-wheeler-kit-bag-125x125-pqaev75a.jpg",
      "/assets/bdm-duffle-wheeler-kit-bag-125x125-pqaev75a-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-ambassador-wicket-keeping-inner-gloves",
    "name": "BDM Ambassador wicket keeping Inner Gloves",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "cricket-wicketkeeping-gloves",
    "price": "Rs 250 / pair",
    "image": "/assets/bdm-cricket-inner-gloves-500x500-2wgwxqr3.jpg",
    "images": [
      "/assets/bdm-cricket-inner-gloves-500x500-2wgwxqr3.jpg",
      "/assets/bdm-cricket-inner-gloves-125x125-2wippj17.jpg",
      "/assets/bdm-cricket-inner-gloves-125x125-2wippj17-2.jpg",
      "/assets/bdm-cricket-inner-gloves-125x125-1ybmk3d2.jpg"
    ],
    "productCode": "WI04",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-matador-wicket-keeping-gloves",
    "name": "BDM Matador Wicket Keeping Gloves",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "cricket-wicketkeeping-gloves",
    "price": "Rs 2,290 / pair",
    "image": "/assets/bdm-matador-wicket-keeping-gloves-500x50-1vvgj081.jpg",
    "images": [
      "/assets/bdm-matador-wicket-keeping-gloves-500x50-1vvgj081.jpg",
      "/assets/bdm-matador-wicket-keeping-gloves-125x12-1yp2rsuc.jpg",
      "/assets/bdm-matador-wicket-keeping-gloves-125x12-1yp2rsuc-2.jpg",
      "/assets/bdm-matador-wicket-keeping-gloves-250x25-17oy6m4r.jpg"
    ],
    "productCode": "WG07",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Finger Protection",
        "value": "With Finger Cap"
      },
      {
        "name": "Color",
        "value": "Black"
      }
    ]
  },
  {
    "slug": "bdm-amazer-wicket-keeping-gloves",
    "name": "BDM Amazer Wicket Keeping Gloves",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "cricket-wicketkeeping-gloves",
    "price": "Rs 3,780 / pair",
    "image": "/assets/bdm-amazer-wicket-keeping-gloves-500x500-guumpp1q.jpg",
    "images": [
      "/assets/bdm-amazer-wicket-keeping-gloves-500x500-guumpp1q.jpg",
      "/assets/bdm-amazer-wicket-keeping-gloves-125x125-jogvib82.jpg",
      "/assets/bdm-amazer-wicket-keeping-gloves-125x125-jogvib82-2.jpg",
      "/assets/bdm-amazer-wicket-keeping-gloves-125x125-t3on7h16.png"
    ],
    "productCode": "WG04",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Glove Type",
        "value": "Main Gloves"
      },
      {
        "name": "Palm Material",
        "value": "PU"
      },
      {
        "name": "Finger Protection",
        "value": "With Finger Cap"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-power-cricket-kit-bag",
    "name": "BDM Dynamic Power Cricket Kit Bag",
    "category": "Wicket Keeping Gloves",
    "categorySlug": "cricket-wicketkeeping-gloves",
    "price": "Rs 2,375 / Piece",
    "image": "/assets/cricket-kit-bag-bdm-dynamic-power-500x50-1pnrgc8x-3.jpg",
    "images": [
      "/assets/cricket-kit-bag-bdm-dynamic-power-500x50-1pnrgc8x-3.jpg",
      "/assets/cricket-kit-bag-bdm-dynamic-power-500x50-1pnrgc8x.jpg",
      "/assets/cricket-kit-bag-bdm-dynamic-power-125x12-1shdp4u1.jpg",
      "/assets/cricket-kit-bag-bdm-dynamic-power-125x12-1shdp4u1-2.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-admiral-cricket-batting-pad",
    "name": "BDM Admiral Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 3,740 / pair",
    "image": "/assets/bdm-admiral-cricket-batting-pad-500x500-dpy6o0cp-2.jpg",
    "images": [
      "/assets/bdm-admiral-cricket-batting-pad-500x500-dpy6o0cp-2.jpg",
      "/assets/bdm-admiral-cricket-batting-pad-500x500-dpy6o0cp.jpg",
      "/assets/bdm-admiral-cricket-batting-pad-500x500-ozt0jd71.jpg",
      "/assets/bdm-admiral-cricket-batting-pad-500x500-1l73deba.jpg"
    ],
    "productCode": "BL05",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Orientation",
        "value": "Universal"
      },
      {
        "name": "Padding Type",
        "value": "High Density Foam"
      },
      {
        "name": "Outer Material",
        "value": "PU"
      },
      {
        "name": "Strap Type",
        "value": "Velcro"
      }
    ]
  },
  {
    "slug": "bdm-titanium-cricket-batting-pads",
    "name": "BDM Titanium Cricket Batting Pads",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 5,600 / pair",
    "image": "/assets/bdm-titanium-cricket-batting-pads-500x50-1o4yir51-2.jpg",
    "images": [
      "/assets/bdm-titanium-cricket-batting-pads-500x50-1o4yir51-2.jpg",
      "/assets/bdm-titanium-cricket-batting-pads-500x50-1o4yir51.jpg",
      "/assets/bdm-titanium-cricket-batting-pads-500x50-1ug28rc1.jpg",
      "/assets/bdm-titanium-cricket-batting-pads-500x50-porixm1j.jpg"
    ],
    "productCode": "BL01",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Orientation",
        "value": "Universal"
      },
      {
        "name": "Padding Type",
        "value": "High Density Foam"
      },
      {
        "name": "Outer Material",
        "value": "PU"
      },
      {
        "name": "Strap Type",
        "value": "Velcro"
      }
    ]
  },
  {
    "slug": "bdm-mansfield-cricket-batting-pads",
    "name": "BDM Mansfield Cricket Batting Pads",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 2,600 / pair",
    "image": "/assets/bdm-mansfield-cricket-batting-pads-500x5-1ueyg711-2.jpg",
    "images": [
      "/assets/bdm-mansfield-cricket-batting-pads-500x5-1ueyg711-2.jpg",
      "/assets/bdm-mansfield-cricket-batting-pads-500x5-1ueyg711.jpg",
      "/assets/bdm-mansfield-cricket-batting-pads-500x5-19j7zrj1.jpg",
      "/assets/bdm-mansfield-cricket-batting-pads-500x5-rxkgpv1n.jpg"
    ],
    "productCode": "BL07",
    "specifications": []
  },
  {
    "slug": "bdm-master-blaster-cricket-batting-pad",
    "name": "BDM Master Blaster Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 2,800 / pair",
    "image": "/assets/bdm-master-blaster-cricket-batting-pad-5-uigel41c.jpg",
    "images": [
      "/assets/bdm-master-blaster-cricket-batting-pad-5-uigel41c.jpg",
      "/assets/bdm-master-blaster-cricket-batting-pad-2-6by2708w.jpg",
      "/assets/bdm-master-blaster-cricket-batting-pad-1-xc2ndq1s.jpg",
      "/assets/bdm-master-blaster-cricket-batting-pad-1-xc2ndq1s-2.jpg"
    ],
    "productCode": "BL12",
    "specifications": [
      {
        "name": "Type",
        "value": "Batting Pad"
      },
      {
        "name": "Closure Type",
        "value": "Strap"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Item Code",
        "value": "BL12"
      }
    ]
  },
  {
    "slug": "bdm-amazer-cricket-batting-pad",
    "name": "BDM Amazer Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 2,340 / pair",
    "image": "/assets/bdm-amazer-cricket-batting-pad-500x500-sdlm5918.jpg",
    "images": [
      "/assets/bdm-amazer-cricket-batting-pad-500x500-sdlm5918.jpg",
      "/assets/bdm-amazer-cricket-batting-pad-125x125-v77uxv1p.jpg",
      "/assets/bdm-amazer-cricket-batting-pad-125x125-v77uxv1p-2.jpg",
      "/assets/bdm-amazer-cricket-batting-pad-125x125-m23azn1q.jpg"
    ],
    "productCode": "BL03",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Item Code",
        "value": "BL06"
      }
    ]
  },
  {
    "slug": "bdm-aero-dynamic-cricket-batting-pad",
    "name": "BDM Aero Dynamic Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 3,800 / pair",
    "image": "/assets/bdm-aero-dynamic-cricket-batting-pad-500-dtbe4ete.jpg",
    "images": [
      "/assets/bdm-aero-dynamic-cricket-batting-pad-500-dtbe4ete.jpg",
      "/assets/bdm-aero-dynamic-cricket-batting-pad-250-1onx3pe1.jpg",
      "/assets/bdm-aero-dynamic-cricket-batting-pad-125-gmxmx019.jpg",
      "/assets/bdm-aero-dynamic-cricket-batting-pad-125-gmxmx019-2.jpg"
    ],
    "productCode": "BL02",
    "specifications": [
      {
        "name": "Type",
        "value": "Batting Pad"
      },
      {
        "name": "Size",
        "value": "Large"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Closure Type",
        "value": "Velcro"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Pattern",
        "value": "Printed"
      }
    ]
  },
  {
    "slug": "bdm-x-plod-club-cricket-batting-pad",
    "name": "BDM X-Plod Club Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 2,700 / pair",
    "image": "/assets/bdm-x-plod-club-cricket-batting-pad-500x-5afil31c.jpg",
    "images": [
      "/assets/bdm-x-plod-club-cricket-batting-pad-500x-5afil31c.jpg",
      "/assets/bdm-x-plod-club-cricket-batting-pad-125x-841rdp1t.jpg",
      "/assets/bdm-x-plod-club-cricket-batting-pad-125x-841rdp1t-2.jpg",
      "/assets/bdm-x-plod-club-cricket-batting-pad-125x-1fp4k351.jpg"
    ],
    "productCode": "115308211",
    "specifications": []
  },
  {
    "slug": "bdm-ambassador-cricket-batting-pad",
    "name": "BDM Ambassador Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 1,400 / pair",
    "image": "/assets/bdm-ambassador-cricket-batting-pad-500x5-mth3mo17.jpg",
    "images": [
      "/assets/bdm-ambassador-cricket-batting-pad-500x5-mth3mo17.jpg",
      "/assets/bdm-ambassador-cricket-batting-pad-125x1-pn3cfa1n.jpg",
      "/assets/bdm-ambassador-cricket-batting-pad-125x1-pn3cfa1n-2.jpg",
      "/assets/bdm-ambassador-cricket-batting-pad-125x1-fhapv7so.jpg"
    ],
    "productCode": "BL15",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-untamed-cricket-batting-pad",
    "name": "BDM Untamed Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 4,200 / pair",
    "image": "/assets/bdm-untamed-cricket-batting-pad-500x500-1g53wnl1.jpg",
    "images": [
      "/assets/bdm-untamed-cricket-batting-pad-500x500-1g53wnl1.jpg",
      "/assets/bdm-untamed-cricket-batting-pad-125x125-1iyq5g7c.jpg",
      "/assets/bdm-untamed-cricket-batting-pad-125x125-1iyq5g7c-2.jpg",
      "/assets/bdm-untamed-cricket-batting-pad-125x125-va4n401n.jpg"
    ],
    "productCode": "BL11",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-armstrong-cricket-batting-pad",
    "name": "BDM Armstrong Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 1,700 / pair",
    "image": "/assets/bdm-armstrong-cricket-batting-pad-500x50-1e564quv.jpg",
    "images": [
      "/assets/bdm-armstrong-cricket-batting-pad-500x50-1e564quv.jpg",
      "/assets/bdm-armstrong-cricket-batting-pad-125x12-1gysdjg1.jpg",
      "/assets/bdm-armstrong-cricket-batting-pad-125x12-1gysdjg1-2.jpg",
      "/assets/bdm-armstrong-cricket-batting-pad-125x12-1jvzqrc1.jpg"
    ],
    "productCode": "BL14",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-galaxy-cricket-batting-pad",
    "name": "BDM Galaxy Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 1,930 / pair",
    "image": "/assets/bdm-galaxy-cricket-batting-pad-500x500-etqazh1f.jpg",
    "images": [
      "/assets/bdm-galaxy-cricket-batting-pad-500x500-etqazh1f.jpg",
      "/assets/bdm-galaxy-cricket-batting-pad-125x125-hncjs31v.jpg",
      "/assets/bdm-galaxy-cricket-batting-pad-125x125-hncjs31v-2.jpg",
      "/assets/bdm-galaxy-cricket-batting-pad-125x125-vaxjx18l.jpg"
    ],
    "productCode": "BL13",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-super-cricket-batting-pad",
    "name": "BDM Dynamic Super Cricket Batting Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 3,740 / pair",
    "image": "/assets/bdm-dynamic-super-cricket-batting-pad-50-1w5jwkdw.jpg",
    "images": [
      "/assets/bdm-dynamic-super-cricket-batting-pad-50-1w5jwkdw.jpg",
      "/assets/bdm-dynamic-super-cricket-batting-pad-25-17z1k691.jpg",
      "/assets/bdm-dynamic-super-cricket-batting-pad-12-1yz65cz1.jpg",
      "/assets/bdm-dynamic-super-cricket-batting-pad-12-1yz65cz1-2.jpg"
    ],
    "productCode": "22348803",
    "specifications": [
      {
        "name": "Size",
        "value": "Full Size"
      }
    ]
  },
  {
    "slug": "bdm-aero-dynamic-wicket-keeping-pad",
    "name": "BDM Aero Dynamic Wicket Keeping Pad",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 3,400 / pair",
    "image": "/assets/bdm-aero-dynamic-wicket-keeping-pad-500x-z2sln21c.jpg",
    "images": [
      "/assets/bdm-aero-dynamic-wicket-keeping-pad-500x-z2sln21c.jpg",
      "/assets/bdm-aero-dynamic-wicket-keeping-pad-125x-11weufo1.jpg",
      "/assets/bdm-aero-dynamic-wicket-keeping-pad-125x-11weufo1-2.jpg",
      "/assets/bdm-aero-dynamic-wicket-keeping-pad-125x-qy1g1h9l.jpg"
    ],
    "productCode": "WL01",
    "specifications": [
      {
        "name": "Size",
        "value": "Large"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "Number Of Straps",
        "value": "2"
      }
    ]
  },
  {
    "slug": "bdm-amzer-cricket-thigh-guard",
    "name": "BDM Amzer Cricket Thigh Guard",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 3,400",
    "image": "/assets/bdm-amzer-cricket-thigh-guard-500x500-19udq30x-2.jpg",
    "images": [
      "/assets/bdm-amzer-cricket-thigh-guard-500x500-19udq30x-2.jpg",
      "/assets/bdm-amzer-cricket-thigh-guard-500x500-19udq30x.jpg",
      "/assets/bdm-cricket-thigh-guard-500x500-1mgaprsf.jpg",
      "/assets/bdm-cricket-thigh-guard-500x500-d2dgrxt3.jpg"
    ],
    "productCode": "",
    "specifications": []
  },
  {
    "slug": "bdm-armstrong-wicket-keeping-inner-gloves",
    "name": "BDM Armstrong Wicket Keeping Inner Gloves",
    "category": "Batting Pads",
    "categorySlug": "cricket-batting-pad",
    "price": "Rs 250 / pair",
    "image": "/assets/bdm-armstrong-inner-gloves-500x500-17621uq5.jpg",
    "images": [
      "/assets/bdm-armstrong-inner-gloves-500x500-17621uq5.jpg",
      "/assets/bdm-armstrong-inner-gloves-500x500-17621uq5-3.jpg",
      "/assets/bdm-armstrong-inner-gloves-125x125-40saug16.jpg",
      "/assets/bdm-armstrong-inner-gloves-125x125-40saug16-2.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-mansfield-super-max-thigh-guard",
    "name": "BDM Mansfield Super Max Thigh Guard",
    "category": "Wicket Keeping Pads",
    "categorySlug": "cricket-wicketkeeping-pad",
    "price": "Rs 840 / Piece",
    "image": "/assets/bdm-mansfield-super-max-thigh-guard-500x-1owt3vg1-2.jpg",
    "images": [
      "/assets/bdm-mansfield-super-max-thigh-guard-500x-1owt3vg1-2.jpg",
      "/assets/mansfield-super-max-thigh-guard-2-500x50-hmv1baik.jpg",
      "/assets/mansfield-super-max-thigh-guard-3-500x50-uvva0p35.jpg",
      "/assets/bdm-mansfield-super-max-thigh-guard-500x-1owt3vg1-3.jpg"
    ],
    "productCode": "TG05",
    "specifications": []
  },
  {
    "slug": "bdm-dynamic-super-cricket-wicket-keeping-pad",
    "name": "BDM Dynamic Super Cricket Wicket keeping Pad",
    "category": "Wicket Keeping Pads",
    "categorySlug": "cricket-wicketkeeping-pad",
    "price": "Rs 3,200 / pair",
    "image": "/assets/bdm-dynamic-super-cricket-wicket-keeping-1q2ax2wq.jpg",
    "images": [
      "/assets/bdm-dynamic-super-cricket-wicket-keeping-1q2ax2wq.jpg",
      "/assets/bdm-dynamic-super-cricket-wicket-keeping-1k3thjs1.jpg",
      "/assets/bdm-dynamic-super-cricket-wicket-keeping-1f4jvbc1.jpg",
      "/assets/bdm-dynamic-super-cricket-wicket-keeping-1q2ax2wq-2.jpg"
    ],
    "productCode": "WL02",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Orientation",
        "value": "Universal"
      },
      {
        "name": "Padding Type",
        "value": "High Density Foam"
      },
      {
        "name": "Outer Material",
        "value": "PU"
      },
      {
        "name": "Strap Type",
        "value": "Velcro"
      }
    ]
  },
  {
    "slug": "bdm-jaguar-wicket-keeping-pad",
    "name": "BDM Jaguar Wicket Keeping Pad",
    "category": "Wicket Keeping Pads",
    "categorySlug": "cricket-wicketkeeping-pad",
    "price": "Rs 4,800 / pair",
    "image": "/assets/bdm-jaguar-wicket-keeping-pad-500x500-17ye2kc1.jpg",
    "images": [
      "/assets/bdm-jaguar-wicket-keeping-pad-500x500-17ye2kc1.jpg",
      "/assets/bdm-jaguar-wicket-keeping-pad-500x500-1cdk5be1.png",
      "/assets/bdm-jaguar-wicket-keeping-pad-500x500-1m68pqs1.png",
      "/assets/bdm-jaguar-wicket-keeping-pad-500x500-17ye2kc1-2.jpg"
    ],
    "productCode": "22354636",
    "specifications": []
  },
  {
    "slug": "bdm-galaxy-cricket-wicket-keeping-pad",
    "name": "BDM Galaxy Cricket Wicket Keeping Pad",
    "category": "Wicket Keeping Pads",
    "categorySlug": "cricket-wicketkeeping-pad",
    "price": "Rs 1,930 / pair",
    "image": "/assets/bdm-galaxy-cricket-wicket-keeping-pad-50-9d7aqq1k.jpg",
    "images": [
      "/assets/bdm-galaxy-cricket-wicket-keeping-pad-50-9d7aqq1k.jpg",
      "/assets/bdm-galaxy-cricket-wicket-keeping-pad-50-12vcgke1.jpg",
      "/assets/bdm-galaxy-cricket-wicket-keeping-pad-50-11mnvqb9.jpg",
      "/assets/bdm-galaxy-cricket-wicket-keeping-pad-50-9d7aqq1k-2.jpg"
    ],
    "productCode": "WL06",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Professional"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Orientation",
        "value": "Universal"
      },
      {
        "name": "Padding Type",
        "value": "High Density Foam"
      },
      {
        "name": "Outer Material",
        "value": "PU"
      },
      {
        "name": "Strap Type",
        "value": "Velcro"
      }
    ]
  },
  {
    "slug": "bdm-admiral-cricket-wicket-keeping-pad",
    "name": "BDM Admiral Cricket Wicket Keeping Pad",
    "category": "Wicket Keeping Pads",
    "categorySlug": "cricket-wicketkeeping-pad",
    "price": "Rs 3,740 / pair",
    "image": "/assets/bdm-admiral-cricket-wicket-keeping-pad-5-lydzk31v.jpg",
    "images": [
      "/assets/bdm-admiral-cricket-wicket-keeping-pad-5-lydzk31v.jpg",
      "/assets/bdm-admiral-cricket-wicket-keeping-pad-2-1wszp53r.jpg",
      "/assets/bdm-admiral-cricket-wicket-keeping-pad-1-os08cpch.jpg",
      "/assets/bdm-admiral-cricket-wicket-keeping-pad-1-os08cpch-2.jpg"
    ],
    "productCode": "WL03",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Practice"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Orientation",
        "value": "Universal"
      },
      {
        "name": "Padding Type",
        "value": "High Density Foam"
      },
      {
        "name": "Outer Material",
        "value": "PU"
      },
      {
        "name": "Strap Type",
        "value": "Velcro"
      }
    ]
  },
  {
    "slug": "bdm-commander-wicket-keeping-pad",
    "name": "BDM Commander Wicket Keeping Pad",
    "category": "Wicket Keeping Pads",
    "categorySlug": "cricket-wicketkeeping-pad",
    "price": "Rs 1,850 / pair",
    "image": "/assets/bdm-commander-wicket-keeping-pad-500x500-15z351c1.jpg",
    "images": [
      "/assets/bdm-commander-wicket-keeping-pad-500x500-15z351c1.jpg",
      "/assets/bdm-commander-wicket-keeping-pad-125x125-18spdty1.jpg",
      "/assets/bdm-commander-wicket-keeping-pad-125x125-18spdty1-2.jpg",
      "/assets/bdm-commander-wicket-keeping-pad-125x125-1rweg1yc.jpg"
    ],
    "productCode": "WL05",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-aero-dynamic-cricket-helmet",
    "name": "BDM Aero Dynamic Cricket Helmet",
    "category": "Cricket Helmets",
    "categorySlug": "cricket-helmet",
    "price": "Rs 2,730 / Piece",
    "image": "/assets/bdm-aero-dynamic-cricket-helmet-500x500-14o62tp1.jpg",
    "images": [
      "/assets/bdm-aero-dynamic-cricket-helmet-500x500-14o62tp1.jpg",
      "/assets/aero-dynamic-helmet-4-500x500-179sjsoy.jpg",
      "/assets/aero-dynamic-helmet-3-500x500-1aojphj1.jpg",
      "/assets/aero-dynamic-helmet-2-500x500-agownkbz.jpg"
    ],
    "productCode": "CH03",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-titanium-cricket-helmet",
    "name": "BDM Titanium Cricket Helmet",
    "category": "Cricket Helmets",
    "categorySlug": "cricket-helmet",
    "price": "Rs 5,985 / Piece",
    "image": "/assets/bdm-titanium-cricket-helmet-500x500-1n8ui6a1.jpg",
    "images": [
      "/assets/bdm-titanium-cricket-helmet-500x500-1n8ui6a1.jpg",
      "/assets/titanium-cricket-helmet-4-500x500-unvmmb1a.jpg",
      "/assets/titanium-cricket-helmet-3-500x500-dnlba0g6.jpg",
      "/assets/titanium-cricket-helmet-2-500x500-k9pzq784.jpg"
    ],
    "productCode": "CH02",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-dynamic-super-cricket-helmet",
    "name": "BDM Dynamic Super Cricket Helmet",
    "category": "Cricket Helmets",
    "categorySlug": "cricket-helmet",
    "price": "Rs 2,520 / Piece",
    "image": "/assets/bdm-dynamic-super-cricket-helmet-500x500-1g952j06.jpg",
    "images": [
      "/assets/bdm-dynamic-super-cricket-helmet-500x500-1g952j06.jpg",
      "/assets/dynamic-super-cricket-helmet-4-500x500-1lckismj.jpg",
      "/assets/dynamic-super-cricket-helmet-2-500x500-ic5atqhu.jpg",
      "/assets/dynamic-super-cricket-helmet-3-500x500-9faz3mpo.jpg"
    ],
    "productCode": "121282791",
    "specifications": [
      {
        "name": "Size",
        "value": "All"
      },
      {
        "name": "Color",
        "value": "Blue"
      },
      {
        "name": "Strap",
        "value": "yes"
      },
      {
        "name": "I Deal In",
        "value": "New Only"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-commander-cricket-helmet",
    "name": "BDM Commander Cricket Helmet",
    "category": "Cricket Helmets",
    "categorySlug": "cricket-helmet",
    "price": "Rs 1,470 / Piece",
    "image": "/assets/bdm-commander-cricket-helmet-500x500-vb45a01t.jpg",
    "images": [
      "/assets/bdm-commander-cricket-helmet-500x500-vb45a01t.jpg",
      "/assets/commander-helmet-4-500x500-1dvv0woj.jpg",
      "/assets/commander-helmet-2-500x500-16sulawd.jpg",
      "/assets/commander-helmet-3-500x500-1pcdw9jj.jpg"
    ],
    "productCode": "CH06",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-commander-boys-cricket-helmet",
    "name": "BDM Commander Boys Cricket Helmet",
    "category": "Cricket Helmets",
    "categorySlug": "cricket-helmet",
    "price": "Rs 1,575 / Piece",
    "image": "/assets/bdm-commander-boys-cricket-helmet-500x50-1ky8btvt.jpg",
    "images": [
      "/assets/bdm-commander-boys-cricket-helmet-500x50-1ky8btvt.jpg",
      "/assets/bdm-commander-boys-cricket-helmet-125x12-1nrukmh1.jpg",
      "/assets/bdm-commander-boys-cricket-helmet-125x12-1nrukmh1-2.jpg",
      "/assets/commander-boys-2-125x125-19d3pi71.jpg"
    ],
    "productCode": "CH07",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-platinum-cricket-helmet",
    "name": "BDM Platinum Cricket Helmet",
    "category": "Cricket Helmets",
    "categorySlug": "cricket-helmet",
    "price": "Rs 5,985 / Piece",
    "image": "/assets/bdm-platinum-cricket-helmet-500x500-5f4we1hw.jpg",
    "images": [
      "/assets/bdm-platinum-cricket-helmet-500x500-5f4we1hw.jpg",
      "/assets/bdm-platinum-cricket-helmet-125x125-88r56nyd.jpg",
      "/assets/bdm-platinum-cricket-helmet-125x125-88r56nyd-2.jpg",
      "/assets/platinum-helmet-4-125x125-19hq01f1.jpg"
    ],
    "productCode": "CH01",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-wheeler-cricket-kit-bag",
    "name": "BDM Wheeler Cricket Kit Bag",
    "category": "Kit Bags",
    "categorySlug": "cricket-kit-bag",
    "price": "",
    "image": "/assets/cricket-kit-bag-bdm-wheeler-500x500-1f9l3igi.jpg",
    "images": [
      "/assets/cricket-kit-bag-bdm-wheeler-500x500-1f9l3igi.jpg",
      "/assets/cricket-kit-bag-bdm-wheeler-125x125-1i37cb2y.jpg",
      "/assets/cricket-kit-bag-bdm-wheeler-125x125-1i37cb2y-2.jpg",
      "/assets/cricket-kit-bag-bdm-wheeler-250x250-r32r4c1e.jpg"
    ],
    "productCode": "KB16",
    "specifications": []
  },
  {
    "slug": "bdm-professional-cricket-kit-bag",
    "name": "BDM Professional Cricket Kit Bag",
    "category": "Kit Bags",
    "categorySlug": "cricket-kit-bag",
    "price": "",
    "image": "/assets/cricket-kit-bag-bdm-club-master-500x500-8agr771l.jpg",
    "images": [
      "/assets/cricket-kit-bag-bdm-club-master-500x500-8agr771l.jpg",
      "/assets/cricket-kit-bag-bdm-club-master-125x125-b42zzt2w.jpg",
      "/assets/cricket-kit-bag-bdm-club-master-125x125-b42zzt2w-2.jpg",
      "/assets/cricket-kit-bag-bdm-club-master-250x250-1j52gs7i.jpg"
    ],
    "productCode": "KB17",
    "specifications": []
  },
  {
    "slug": "bdm-aero-dynamic-kit-bag",
    "name": "BDM Aero Dynamic Kit Bag",
    "category": "Kit Bags",
    "categorySlug": "cricket-kit-bag",
    "price": "Rs 4,070 / Piece",
    "image": "/assets/bdm-aero-dynamic-kit-bag-500x500-197wrmu5.jpg",
    "images": [
      "/assets/bdm-aero-dynamic-kit-bag-500x500-197wrmu5.jpg",
      "/assets/bdm-aero-dynamic-kit-bag-125x125-1c1j0fgl.jpg",
      "/assets/bdm-aero-dynamic-kit-bag-125x125-1c1j0fgl-2.jpg",
      "/assets/bdm-aero-dynamic-kit-bag-125x125-33f2ar1d.jpg"
    ],
    "productCode": "KB01",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-target-stumps",
    "name": "BDM Target Stumps",
    "category": "Kit Bags",
    "categorySlug": "cricket-kit-bag",
    "price": "Rs 680 / Piece",
    "image": "/assets/bdm-target-stumps-500x500-16q2flyy.jpg",
    "images": [
      "/assets/bdm-target-stumps-500x500-16q2flyy.jpg",
      "/assets/bdm-target-stumps-125x125-19jooek1.jpg",
      "/assets/bdm-target-stumps-125x125-19jooek1-2.jpg",
      "/assets/targe-stumps-in-diffirent-size-3-125x125-d74btv3j.jpg"
    ],
    "productCode": "ST09",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-kits-size-4-5-6",
    "name": "BDM Kits Size 4,5,6.",
    "category": "Kit Bags",
    "categorySlug": "cricket-kit-bag",
    "price": "",
    "image": "/assets/bdm-kits-size-4-5-6-500x500-olntkfgx.png",
    "images": [
      "/assets/bdm-kits-size-4-5-6-500x500-olntkfgx.png",
      "/assets/bdm-kits-size-4-5-6-125x125-rfa2d1xe.png",
      "/assets/bdm-kits-size-4-5-6-125x125-rfa2d1xe-2.png",
      "/assets/bdm-kits-size-4-5-6-125x125-1anc06o1.png"
    ],
    "productCode": "100160292",
    "specifications": []
  },
  {
    "slug": "bdm-armstrong-thigh-guard",
    "name": "BDM Armstrong Thigh Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 740 / Piece",
    "image": "/assets/bdm-armstrong-thigh-guard-500x500-nkkkvg13-2.jpg",
    "images": [
      "/assets/bdm-armstrong-thigh-guard-500x500-nkkkvg13-2.jpg",
      "/assets/bdm-armstrong-thigh-guard-500x500-nkkkvg13.jpg",
      "/assets/armstrong-thigh-guard-2-500x500-15eki0q1.jpg",
      "/assets/armstrong-thigh-guard-3-500x500-1sa49yp1.jpg"
    ],
    "productCode": "TG06",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-armour-thigh-guard",
    "name": "BDM Armour Thigh Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 2,500 / Piece",
    "image": "/assets/bdm-armour-thigh-guard-500x500-p284ui1l-2.jpg",
    "images": [
      "/assets/bdm-armour-thigh-guard-500x500-p284ui1l-2.jpg",
      "/assets/bdm-armour-thigh-guard-500x500-p284ui1l.jpg",
      "/assets/armour-thigh-guard-2-500x500-ixpxd517.jpg",
      "/assets/armour-thigh-guard-3-500x500-1kc670d1.jpg"
    ],
    "productCode": "TG08",
    "specifications": []
  },
  {
    "slug": "bdm-umpire-counter",
    "name": "BDM Umpire Counter",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 285 / Piece",
    "image": "/assets/bdm-umpire-counter-500x500-1vbx1nt1-2.jpg",
    "images": [
      "/assets/bdm-umpire-counter-500x500-1vbx1nt1-2.jpg",
      "/assets/bdm-umpire-counter-500x500-1vbx1nt1.jpg",
      "/assets/umpire-counter-2-500x500-6i2t851c.jpg",
      "/assets/umpire-counter-3-500x500-1q06iso1.jpg"
    ],
    "productCode": "AS04",
    "specifications": [
      {
        "name": "Color",
        "value": "White"
      },
      {
        "name": "I Deal In",
        "value": "New Only"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-admiral-abdominal-guard",
    "name": "BDM Admiral Abdominal Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 540 / Piece",
    "image": "/assets/bdm-admiral-abdominal-guard-500x500-1vqnftzv-2.jpg",
    "images": [
      "/assets/bdm-admiral-abdominal-guard-500x500-1vqnftzv-2.jpg",
      "/assets/bdm-admiral-abdominal-guard-500x500-1vqnftzv.jpg",
      "/assets/admiral-abdominal-3-500x500-vblc3mmi.jpg",
      "/assets/admiral-abdominal-2-500x500-1houf3i5.jpg"
    ],
    "productCode": "AG02",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-admiral-cricket-batting-elbow-guard",
    "name": "BDM Admiral Cricket Batting Elbow Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 420 / Piece",
    "image": "/assets/bdm-cricket-batting-elbow-guard-500x500-18way891.jpg",
    "images": [
      "/assets/bdm-cricket-batting-elbow-guard-500x500-18way891.jpg",
      "/assets/bdm-cricket-batting-elbow-guard-125x125-1bpx70v1.jpg",
      "/assets/bdm-cricket-batting-elbow-guard-125x125-1bpx70v1-2.jpg",
      "/assets/bdm-cricket-batting-elbow-guard-125x125-skudir1b.jpg"
    ],
    "productCode": "EG04",
    "specifications": []
  },
  {
    "slug": "bdm-amazer-cricket-chest-guard",
    "name": "BDM Amazer Cricket Chest Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 1,430 / Piece",
    "image": "/assets/bdm-cricket-chest-guard-500x500-3d35jrcg.jpg",
    "images": [
      "/assets/bdm-cricket-chest-guard-500x500-3d35jrcg.jpg",
      "/assets/bdm-cricket-chest-guard-125x125-66pecdsx.jpg",
      "/assets/bdm-cricket-chest-guard-125x125-66pecdsx-2.jpg",
      "/assets/bdm-cricket-chest-guard-125x125-yklrdd1k.jpg"
    ],
    "productCode": "22951388",
    "specifications": []
  },
  {
    "slug": "bdm-commander-elbow-guard",
    "name": "BDM Commander Elbow Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 300 / Piece",
    "image": "/assets/bdm-commander-elbow-guard-500x500-1tjw4qe1.jpg",
    "images": [
      "/assets/bdm-commander-elbow-guard-500x500-1tjw4qe1.jpg",
      "/assets/bdm-commander-elbow-guard-125x125-1wdidj07.jpg",
      "/assets/bdm-commander-elbow-guard-125x125-1wdidj07-2.jpg",
      "/assets/commander-county-elbow-guard-3-125x125-1e3zxez8.jpg"
    ],
    "productCode": "EG05",
    "specifications": [
      {
        "name": "Playing Level",
        "value": "Practice"
      },
      {
        "name": "Size",
        "value": "Adult"
      },
      {
        "name": "Orientation",
        "value": "Universal"
      },
      {
        "name": "Padding Type",
        "value": "High Density Foam"
      },
      {
        "name": "Outer Material",
        "value": "PU"
      },
      {
        "name": "Strap Type",
        "value": "Velcro"
      }
    ]
  },
  {
    "slug": "bdm-commander-chest-guard",
    "name": "BDM Commander Chest Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 880 / Piece",
    "image": "/assets/bdm-commander-chest-guard-500x500-yc36fghz.jpg",
    "images": [
      "/assets/bdm-commander-chest-guard-500x500-yc36fghz.jpg",
      "/assets/bdm-commander-chest-guard-125x125-115pf82y.jpg",
      "/assets/bdm-commander-chest-guard-125x125-115pf82y-2.jpg",
      "/assets/commander-chest-guard-2-125x125-z394ob1j.jpg"
    ],
    "productCode": "CG02",
    "specifications": []
  },
  {
    "slug": "bdm-amazer-elbow-guard",
    "name": "BDM Amazer Elbow Guard",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 650 / Piece",
    "image": "/assets/bdm-amazer-elbow-guard-500x500-d58ann1f.jpg",
    "images": [
      "/assets/bdm-amazer-elbow-guard-500x500-d58ann1f.jpg",
      "/assets/bdm-amazer-elbow-guard-125x125-fyujg91v.jpg",
      "/assets/bdm-amazer-elbow-guard-125x125-fyujg91v-2.jpg",
      "/assets/bdm-amazer-elbow-guard-125x125-1a1a26f5.jpg"
    ],
    "productCode": "EG01",
    "specifications": [
      {
        "name": "Product Type",
        "value": "Cricket"
      },
      {
        "name": "Connection",
        "value": "Male, Female"
      },
      {
        "name": "Usage/Application",
        "value": "Cricket"
      },
      {
        "name": "Country of Origin",
        "value": "Made in India"
      }
    ]
  },
  {
    "slug": "bdm-catch-practice-bat",
    "name": "BDM Catch Practice Bat",
    "category": "Protective Equipment",
    "categorySlug": "cricket-protective-equipment",
    "price": "Rs 3,300 / Piece",
    "image": "/assets/bdm-catch-practice-bat-500x500-1h43rjn3.jpg",
    "images": [
      "/assets/bdm-catch-practice-bat-500x500-1h43rjn3.jpg",
      "/assets/bdm-catch-practice-bat-500x500-1h43rjn3-2.jpg",
      "/assets/catch-practice-4-500x500-1et03191.jpg",
      "/assets/catch-practice-3-500x500-mcie6516.jpg"
    ],
    "productCode": "",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-stumps-m-c-c-english-pattern",
    "name": "BDM Stumps M.C.C. English Pattern",
    "category": "Accessories",
    "categorySlug": "cricket-accessories",
    "price": "Rs 1,900 / Piece",
    "image": "/assets/bdm-stumps-m-c-c-english-pattern-500x500-1qdabwi1.jpg",
    "images": [
      "/assets/bdm-stumps-m-c-c-english-pattern-500x500-1qdabwi1.jpg",
      "/assets/bdm-stumps-m-c-c-english-pattern-125x125-1t6wkp41.jpg",
      "/assets/bdm-stumps-m-c-c-english-pattern-125x125-1t6wkp41-2.jpg",
      "/assets/bdm-stumps-m-c-c-english-pattern-250x250-126rzied.jpg"
    ],
    "productCode": "ST03",
    "specifications": []
  },
  {
    "slug": "bdm-dynamic-power-stumps",
    "name": "BDM Dynamic Power Stumps",
    "category": "Accessories",
    "categorySlug": "cricket-accessories",
    "price": "Rs 6,000 / Piece",
    "image": "/assets/bdm-dynamic-power-stumps-500x500-xo7pzy4l.jpg",
    "images": [
      "/assets/bdm-dynamic-power-stumps-500x500-xo7pzy4l.jpg",
      "/assets/bdm-dynamic-power-stumps-125x125-10htyskg.jpg",
      "/assets/bdm-dynamic-power-stumps-125x125-10htyskg-2.jpg",
      "/assets/bdm-dynamic-power-stumps-125x125-oqcig373.jpg"
    ],
    "productCode": "ST01",
    "specifications": [
      {
        "name": "Stump Type",
        "value": "Wooden"
      },
      {
        "name": "Set Type",
        "value": "Stumps With Bails"
      },
      {
        "name": "Ground Type",
        "value": "Turf"
      },
      {
        "name": "Size",
        "value": "Full Size"
      },
      {
        "name": "Color",
        "value": "green"
      },
      {
        "name": "Usage Level",
        "value": "Match"
      }
    ]
  },
  {
    "slug": "bdm-knee-band",
    "name": "BDM Knee Band",
    "category": "Accessories",
    "categorySlug": "cricket-accessories",
    "price": "Rs 250 / Piece",
    "image": "/assets/bdm-knee-band-500x500-1tnybx31.jpg",
    "images": [
      "/assets/bdm-knee-band-500x500-1tnybx31.jpg",
      "/assets/bdm-knee-band-125x125-1whkkpp1.jpg",
      "/assets/bdm-knee-band-125x125-1whkkpp1-2.jpg",
      "/assets/knee-band-3-125x125-j0lsgg1s.jpg"
    ],
    "productCode": "AS10",
    "specifications": [
      {
        "name": "Size",
        "value": "L"
      },
      {
        "name": "Type",
        "value": "Closed Patellar"
      },
      {
        "name": "Material",
        "value": "Neoprene"
      },
      {
        "name": "Support Level",
        "value": "Basic, Knee Pads, Advance"
      },
      {
        "name": "Color",
        "value": "Black"
      }
    ]
  },
  {
    "slug": "bdm-panama-cricket-hat",
    "name": "BDM Panama Cricket Hat",
    "category": "Cricket Hats",
    "categorySlug": "cricket-hat",
    "price": "Rs 460 / Piece",
    "image": "/assets/bdm-panama-cricket-hat-500x500-1lvp1m14-2.jpg",
    "images": [
      "/assets/bdm-panama-cricket-hat-500x500-1lvp1m14-2.jpg",
      "/assets/bdm-panama-cricket-hat-500x500-1lvp1m14.jpg",
      "/assets/bdm-cricket-hat-500x500-1xgwjxu1.jpg",
      "/assets/bdm-cricket-hat-500x500-1qvhypp1.jpg"
    ],
    "productCode": "22950552",
    "specifications": []
  },
  {
    "slug": "bdm-white-cricket-wear",
    "name": "BDM White Cricket Wear",
    "category": "Cricket Wear",
    "categorySlug": "white-cricket-wear",
    "price": "",
    "image": "/assets/bdm-white-cricket-wear-500x500-1l1elqkp.jpg",
    "images": [
      "/assets/bdm-white-cricket-wear-500x500-1l1elqkp.jpg",
      "/assets/bdm-white-cricket-wear-500x500-1l1elqkp-2.jpg",
      "/assets/bdm-white-cricket-wear-125x125-1nv0uj61.png",
      "/assets/bdm-white-cricket-wear-125x125-1nv0uj61-2.png"
    ],
    "productCode": "22951609",
    "specifications": [
      {
        "name": "Color",
        "value": "White"
      }
    ]
  },
  {
    "slug": "bdm-world-cup-cricket-batting-pad",
    "name": "BDM World Cup Cricket Batting Pad",
    "category": "Academy Equipment",
    "categorySlug": "cricket-battingpad-sportsacademy",
    "price": "Rs 2,900 / pair",
    "image": "/assets/bdm-world-cup-cricket-batting-pad-500x50-1omx6yj2-2.jpg",
    "images": [
      "/assets/bdm-world-cup-cricket-batting-pad-500x50-1omx6yj2-2.jpg",
      "/assets/bdm-world-cup-cricket-batting-pad-500x50-1omx6yj2.jpg",
      "/assets/bdm-world-cup-cricket-batting-pad-500x50-s8u6zi1r.jpg",
      "/assets/bdm-world-cup-cricket-batting-pad-500x50-zujb1pex.jpg"
    ],
    "productCode": "BL08",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  },
  {
    "slug": "bdm-cricket-socks",
    "name": "BDM Cricket Socks",
    "category": "Cricket Accessories",
    "categorySlug": "cricket-equipments",
    "price": "Rs 280 / pair",
    "image": "/assets/bdm-cricket-socks-500x500-1oz2mclv-2.png",
    "images": [
      "/assets/bdm-cricket-socks-500x500-1oz2mclv-2.png",
      "/assets/bdm-cricket-socks-500x500-1oz2mclv.png",
      "/assets/bdm-cricket-socks-500x500-14xmxuu1.jpg",
      "/assets/bdm-cricket-socks-500x500-m9tkmq12.png"
    ],
    "productCode": "22951418",
    "specifications": [
      {
        "name": "Stretchable",
        "value": "Yes"
      },
      {
        "name": "Stretchability Type",
        "value": "4-Way Stretch"
      },
      {
        "name": "Gender",
        "value": "Unisex"
      },
      {
        "name": "Pattern",
        "value": "Printed"
      },
      {
        "name": "Season",
        "value": "All Season"
      },
      {
        "name": "Size",
        "value": "Small, Medium, XL, XXL"
      }
    ]
  },
  {
    "slug": "bdm-calf-blue-band",
    "name": "BDM Calf Blue Band",
    "category": "Cricket Accessories",
    "categorySlug": "cricket-equipments",
    "price": "Rs 220 / Piece",
    "image": "/assets/bdm-calf-blue-band-500x500-350tt71a-2.png",
    "images": [
      "/assets/bdm-calf-blue-band-500x500-350tt71a-2.png",
      "/assets/bdm-calf-blue-band-500x500-350tt71a.png",
      "/assets/bdm-calf-blue-band-500x500-1wmvug3h.png",
      "/assets/bdm-calf-blue-band-500x500-rvz9x8wm.png"
    ],
    "productCode": "22951398",
    "specifications": [
      {
        "name": "Material",
        "value": "Cotton"
      },
      {
        "name": "Adjustability",
        "value": "Adjustable"
      },
      {
        "name": "Condition",
        "value": "New"
      },
      {
        "name": "Type of Equipments",
        "value": "Cricket"
      }
    ]
  },
  {
    "slug": "bdm-cricket-cap",
    "name": "BDM Cricket Cap",
    "category": "Cricket Accessories",
    "categorySlug": "cricket-equipments",
    "price": "Rs 670 / Set",
    "image": "/assets/bdm-cricket-cap-500x500-fvywsy1a-2.jpg",
    "images": [
      "/assets/bdm-cricket-cap-500x500-fvywsy1a-2.jpg",
      "/assets/bdm-cricket-cap-500x500-fvywsy1a.jpg",
      "/assets/bdm-cricket-cap-500x500-65d1xtt1.jpg",
      "/assets/bdm-cricket-cap-500x500-1nit5n31.jpg"
    ],
    "productCode": "22951406",
    "specifications": []
  },
  {
    "slug": "bdm-cricket-ball-mallet-hammer-and-gripping-cone",
    "name": "BDM Cricket Ball Mallet , Hammer & Gripping Cone",
    "category": "Cricket Accessories",
    "categorySlug": "cricket-equipments",
    "price": "",
    "image": "/assets/bdm-cricket-ball-mallet-2c-hammer-500x50-1li4qbl1-2.jpg",
    "images": [
      "/assets/bdm-cricket-ball-mallet-2c-hammer-500x50-1li4qbl1-2.jpg",
      "/assets/bdm-cricket-ball-mallet-2c-hammer-500x50-1li4qbl1.jpg",
      "/assets/bdm-cricket-accessories-500x500-66qgbwsy.jpg",
      "/assets/bdm-cricket-accessories-500x500-16sym75r.jpg"
    ],
    "productCode": "22950775",
    "specifications": [
      {
        "name": "Condition",
        "value": "New"
      }
    ]
  }
];
