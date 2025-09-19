// Comprehensive Odisha Cultural Data for Offline Storage
export const odishaCulturalData = {
  // Arts & Heritage
  arts: {
    odissiDance: {
      facts: [
        "Odissi is one of the eight classical dance forms of India, originating from Odisha temples",
        "The dance form is over 2000 years old and was performed by Maharis (temple dancers)",
        "Odissi has three main styles: Mahari, Nartaki, and Gotipua traditions",
        "The dance depicts stories from Hindu mythology, especially Lord Jagannath",
        "Kelucharan Mohapatra and Guru Pankaj Charan Das are legendary Odissi masters"
      ],
      poses: [
        "Tribhanga - the classic three-bend posture",
        "Chauka - the square stance representing Lord Jagannath",
        "Utplavana - the flying or jumping movement",
        "Bhramari - the spinning movement like a bee"
      ],
      mudras: [
        "Pataka - flag hand gesture",
        "Ardhachandra - half moon gesture",
        "Mukula - bud gesture for flowers",
        "Kapittha - wood apple gesture"
      ]
    },
    handicrafts: {
      sambalpuriIkat: {
        description: "Sambalpuri textiles are famous for their unique ikat tie-dye technique",
        districts: ["Sambalpur", "Balangir", "Sonepur", "Boudh"],
        patterns: ["Shankha (Conch)", "Chakra (Wheel)", "Phula (Flower)", "Nabakothi (Nine Squares)"],
        facts: [
          "The word 'Bandha' means 'to tie' in Odia, referring to the tie-dye process",
          "Traditional Sambalpuri sarees take 15-20 days to complete",
          "The craft provides livelihood to over 50,000 weavers in Western Odisha"
        ]
      },
      pipiliApplique: {
        description: "Colorful appliqué work originated in Pipili town",
        products: ["Umbrellas", "Wall hangings", "Bags", "Temple decorations"],
        colors: ["Bright red", "Yellow", "Green", "Blue", "Orange"],
        motifs: ["Birds", "Animals", "Flowers", "Geometric patterns"],
        facts: [
          "Pipili appliqué decorates the Jagannath Temple during festivals",
          "The craft uses cotton fabrics with mirror work and embroidery",
          "Each umbrella can take 3-4 days to complete by skilled artisans"
        ]
      },
      silverFiligree: {
        location: "Cuttack",
        description: "Delicate silver wire work creating intricate jewelry and decorative items",
        products: ["Jewelry", "Decorative boxes", "Figurines", "Utensils"],
        technique: "Fine silver wires are twisted and soldered to create patterns",
        facts: [
          "Cuttack silver filigree has GI (Geographical Indication) tag",
          "The art form is over 500 years old",
          "Master craftsmen can create wires as thin as human hair"
        ]
      }
    },
    music: {
      instruments: [
        {
          name: "Mardala",
          type: "Percussion",
          description: "Traditional drum used in Odissi dance and Jagannath temple rituals",
          significance: "Sacred instrument mentioned in ancient texts"
        },
        {
          name: "Mahuri",
          type: "Wind",
          description: "Double-reed instrument similar to shehnai",
          usage: "Folk music and temple ceremonies"
        },
        {
          name: "Tabla Tarang",
          type: "Percussion",
          description: "Set of small tabla drums tuned to different pitches",
          origin: "Unique to Odisha classical music"
        }
      ],
      odissiMusic: {
        features: ["Ragas based on Odissi dance", "Spiritual themes", "Complex rhythmic patterns"],
        composers: ["Banamali Das", "Kabisurya Baladev Rath", "Gopal Krushna Pattanaik"],
        forms: ["Chhanda", "Champu", "Bhajan", "Janana"]
      }
    }
  },

  // Food & Lifestyle
  food: {
    traditional: [
      {
        name: "Pakhala Bhata",
        odia: "ପଖାଳ ଭାତ",
        description: "Fermented rice soaked in water, served with various accompaniments",
        significance: "Cooling summer food, especially eaten on Pakhala Dibasa (March 20)",
        accompaniments: ["Badi", "Aloo Bharta", "Baigana Bharta", "Saga"],
        nutritionFacts: "Rich in probiotics, helps in digestion and keeps body cool"
      },
      {
        name: "Dalma",
        odia: "ଦଳମା",
        description: "Lentil curry with vegetables and aromatic spices",
        ingredients: ["Toor dal", "Raw papaya", "Brinjal", "Pumpkin", "Drumstick"],
        speciality: "Offered to Lord Jagannath, no onion or garlic used",
        regions: "Popular across all districts of Odisha"
      },
      {
        name: "Rasagola",
        odia: "ରସଗୋଲା",
        description: "Spongy cottage cheese balls in sugar syrup",
        giTag: "Odisha Rasagola has Geographical Indication status",
        history: "Originated in Pahala village, offered to goddess Lakshmi",
        facts: [
          "Different from Bengali rasgulla in texture and taste",
          "Made with chhena (cottage cheese) and semolina",
          "Pahala Rasagola is darker and more spongy"
        ]
      },
      {
        name: "Chhena Poda",
        odia: "ଛେନା ପୋଡ଼",
        description: "Baked cottage cheese dessert, Odisha's signature sweet",
        inventor: "Sudarshan Sahoo from Nayagarh",
        ingredients: ["Fresh chhena", "Sugar", "Cardamom", "Cashews"],
        preparation: "Baked in sal leaves giving unique aroma"
      }
    ],
    festivals: [
      {
        name: "Makar Sankranti",
        foods: ["Khichdi", "Til Laddu", "Gur Pitha"],
        significance: "Winter solstice celebration"
      },
      {
        name: "Raja Festival",
        foods: ["Poda Pitha", "Arisa Pitha", "Kakara Pitha"],
        celebration: "Celebrates womanhood and earth's menstruation"
      }
    ]
  },

  // Folk Games & Sports
  folkGames: [
    {
      name: "Kho-Kho",
      odia: "ଖୋ-ଖୋ",
      description: "Traditional tag game played in rural Odisha",
      skills: "Speed, agility, strategy",
      culturalValue: "Teaches teamwork and quick thinking"
    },
    {
      name: "Kabaddi",
      odia: "କବଡି",
      description: "Contact sport requiring strength and breath control",
      variations: ["Sanjeevani", "Gaminee", "Amar"],
      popularity: "Village championships during harvest season"
    },
    {
      name: "Gilli Danda",
      odia: "ଗିଲି ଦଣ୍ଡ",
      description: "Traditional game with wooden stick and peg",
      skills: "Hand-eye coordination, precision",
      equipment: "Gilli (wooden peg) and Danda (stick)"
    },
    {
      name: "Puchi",
      description: "Traditional Odia game similar to marbles",
      materials: "Small clay balls or stones",
      ageGroup: "Children aged 5-15 years"
    }
  ],

  // Nature & Geography
  nature: {
    wildlife: [
      {
        name: "Similipal Tiger Reserve",
        location: "Mayurbhanj district",
        area: "2,750 sq km",
        species: ["Royal Bengal Tiger", "Asian Elephant", "Leopard", "Gaur"],
        uniqueFeature: "Black tigers (melanistic tigers) found here",
        waterfalls: ["Barehipani", "Joranda"]
      },
      {
        name: "Chilika Lake",
        type: "Brackish water lagoon",
        area: "1,100 sq km",
        significance: "Largest coastal lagoon in India",
        species: ["Irrawaddy Dolphins", "Migratory birds", "Flamingos"],
        islands: ["Nalabana", "Kalijai", "Honeymoon Island"]
      },
      {
        name: "Gahirmatha Beach",
        location: "Kendrapara district",
        significance: "World's largest nesting site for Olive Ridley turtles",
        season: "November to April",
        conservation: "Protected under Wildlife Protection Act"
      }
    ],
    rivers: [
      {
        name: "Mahanadi",
        odia: "ମହାନଦୀ",
        length: "851 km",
        significance: "Lifeline of Odisha, flows through 8 districts",
        dams: ["Hirakud", "Rengali", "Naraj"],
        cultural: "Considered sacred, many temples on its banks"
      },
      {
        name: "Brahmani",
        significance: "Sacred river, confluence with Mahanadi",
        pilgrimage: "Triveni Sangam at Paradip"
      }
    ],
    landmarks: [
      {
        name: "Hirakud Dam",
        significance: "World's longest earthen dam",
        length: "25.79 km",
        reservoir: "One of India's largest artificial lakes",
        districts: "Sambalpur, Jharsuguda, Bargarh, Deogarh"
      }
    ]
  },

  // Literature & Knowledge
  literature: {
    legends: [
      {
        name: "Fakir Mohan Senapati",
        title: "Utkalamani (Gem of Utkal)",
        contribution: "Father of modern Odia literature",
        works: ["Chha Mana Atha Guntha", "Lachhama"],
        period: "1843-1918"
      },
      {
        name: "Sarala Das",
        period: "15th century",
        work: "Sarala Mahabharata",
        significance: "First to translate Mahabharata into Odia"
      },
      {
        name: "Gangadhar Meher",
        title: "Kabi Samrat (Emperor of Poets)",
        masterpiece: "Kichaka Badha",
        specialty: "Nature poetry and social themes"
      },
      {
        name: "Gopabandhu Das",
        title: "Utkalamani",
        contribution: "Social reformer and freedom fighter",
        works: ["Dharmapada", "Abakasha Chintamani"]
      }
    ],
    proverbs: [
      {
        odia: "ଶ୍ରମେ ସିଧି, ଆଳସରେ ନାଶ",
        transliteration: "Shrame sidhi, alasare nasha",
        english: "Success comes with hard work, idleness brings ruin",
        context: "Work ethics and motivation"
      },
      {
        odia: "ଜଳ ବିନା ମାଛ, ଗୁରୁ ବିନା ଶିଷ୍ୟ ନାହିଁ",
        transliteration: "Jala bina macha, guru bina shishya nahi",
        english: "Fish cannot live without water, student cannot learn without teacher",
        context: "Importance of education and guidance"
      },
      {
        odia: "ଅତି ଲୋଭରେ ତୋତା ନଷ୍ଟ",
        transliteration: "Ati lobhare tota nasta",
        english: "Excessive greed destroys the parrot",
        context: "Warning against greed"
      }
    ]
  },

  // UNESCO & Heritage Sites
  heritage: {
    sites: [
      {
        name: "Konark Sun Temple",
        odia: "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର",
        period: "13th century",
        builder: "King Narasimhadeva I",
        uniqueFeature: "Designed as chariot of Sun God with 24 wheels",
        wheels: "Each wheel is a sundial showing precise time",
        unescoYear: "1984",
        nickname: "Black Pagoda"
      },
      {
        name: "Jagannath Temple, Puri",
        odia: "ଜଗନ୍ନାଥ ମନ୍ଦିର",
        significance: "One of Char Dham pilgrimage sites",
        festival: "Ratha Yatra - world famous chariot festival",
        kitchen: "World's largest kitchen serving 1 lakh people daily",
        flag: "Changes direction with wind, visible from 20 km",
        height: "214 feet tall"
      },
      {
        name: "Lingaraj Temple",
        location: "Bhubaneswar",
        period: "11th century",
        deity: "Lord Harihara (Shiva-Vishnu combined)",
        architecture: "Kalinga architecture masterpiece",
        height: "180 feet"
      },
      {
        name: "Dhauli Peace Pagoda",
        significance: "Site of Kalinga War, Buddha's peace message",
        emperor: "Ashoka's transformation site",
        structure: "Modern Buddhist stupa",
        message: "Peace and non-violence"
      }
    ]
  },

  // Traditions & Festivals
  festivals: [
    {
      name: "Ratha Yatra",
      odia: "ରଥଯାତ୍ରା",
      location: "Puri",
      date: "Ashadha Shukla Dwitiya",
      significance: "Lord Jagannath's annual journey",
      chariots: ["Nandighosh (Jagannath)", "Taladhwaja (Balabhadra)", "Darpadalana (Subhadra)"],
      global: "Celebrated worldwide by ISKCON"
    },
    {
      name: "Raja Festival",
      odia: "ରଜ ପର୍ବ",
      duration: "3 days",
      significance: "Celebrates womanhood and earth's fertility",
      customs: ["Swing (Doli)", "Special foods", "No farming work"],
      season: "Monsoon arrival celebration"
    },
    {
      name: "Bali Jatra",
      odia: "ବାଲି ଯାତ୍ରା",
      location: "Cuttack",
      significance: "Commemorates ancient maritime trade",
      period: "Kartik Purnima",
      activities: ["Boat sailing", "Trade fair", "Cultural programs"],
      history: "Ancient Kalinga traders' journey to Bali"
    },
    {
      name: "Nuakhai",
      odia: "ନୂଆଖାଇ",
      region: "Western Odisha",
      significance: "New rice harvest festival",
      ritual: "First grain offered to deity",
      social: "Family reunions and community bonding"
    }
  ],

  // Traditional Attire
  attire: [
    {
      name: "Sambalpuri Saree",
      technique: "Ikat weaving",
      motifs: ["Conch shell", "Wheel", "Flower"],
      occasions: ["Festivals", "Weddings", "Cultural events"],
      colors: ["Red", "Maroon", "Yellow", "Green"]
    },
    {
      name: "Tussar Silk",
      origin: "Gopalpur and Berhampur",
      feature: "Natural golden sheen",
      texture: "Coarse but durable",
      uses: ["Sarees", "Dress materials", "Home furnishing"]
    },
    {
      name: "Dhoti and Kurta",
      men: "Traditional male attire",
      occasions: ["Religious ceremonies", "Festivals"],
      style: "White or cream colored cotton"
    }
  ],

  // Daily Cultural Facts (52 weeks worth)
  dailyFacts: [
    "The Konark wheel can tell time with 99% accuracy even today",
    "Puri Jagannath temple's kitchen has been running for over 900 years without a break",
    "Chilika Lake changes color during different seasons",
    "Odisha has 62 tribal communities, the highest in India",
    "The famous Ratha Yatra chariots are rebuilt every year",
    "Hirakud Dam creates a 635 sq km reservoir",
    "Olive Ridley turtles travel thousands of miles to nest in Odisha",
    "Sambalpuri fabric patterns have mathematical precision",
    "Cuttack silver filigree wires are thinner than human hair",
    "Pakhala is eaten on March 20 as World Pakhala Day",
    // ... continue with more facts to reach 52+
  ],

  // Cultural Quiz Questions
  quizQuestions: [
    {
      question: "Which temple is known as the 'Black Pagoda'?",
      options: ["Jagannath Temple", "Lingaraj Temple", "Konark Sun Temple", "Mukteshwar Temple"],
      correct: 2,
      difficulty: "easy",
      category: "heritage"
    },
    {
      question: "What does 'Bandha' mean in Sambalpuri textile?",
      options: ["To weave", "To tie", "To dye", "To cut"],
      correct: 1,
      difficulty: "medium",
      category: "arts"
    },
    {
      question: "Which is the longest earthen dam in the world?",
      options: ["Bhakra Dam", "Hirakud Dam", "Nagarjuna Sagar", "Koyna Dam"],
      correct: 1,
      difficulty: "easy",
      category: "geography"
    },
    // Add more questions...
  ]
};

// Utility functions for cultural data
export const getCulturalFactOfDay = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const facts = odishaCulturalData.dailyFacts;
  return facts[dayOfYear % facts.length];
};

export const getRandomProverb = () => {
  const proverbs = odishaCulturalData.literature.proverbs;
  return proverbs[Math.floor(Math.random() * proverbs.length)];
};

export const getFestivalOfMonth = (month) => {
  const festivalMap = {
    1: 'Makar Sankranti', 2: 'Saraswati Puja', 3: 'Holi', 
    4: 'Ram Navami', 5: 'Akshaya Tritiya', 6: 'Raja Festival',
    7: 'Ratha Yatra', 8: 'Raksha Bandhan', 9: 'Ganesh Chaturthi',
    10: 'Durga Puja', 11: 'Kali Puja', 12: 'Konark Festival'
  };
  return festivalMap[month] || 'Cultural Month';
};

export const getRandomQuizQuestion = (category = null, difficulty = null) => {
  let questions = odishaCulturalData.quizQuestions;
  
  if (category) {
    questions = questions.filter(q => q.category === category);
  }
  
  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }
  
  return questions[Math.floor(Math.random() * questions.length)];
};

export default odishaCulturalData;