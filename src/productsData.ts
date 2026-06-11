import { Product, TrendPost, Review } from "./types";

export const LIFESTYLES = [
  { id: "Campus Life", label: "Campus Life", icon: "GraduationCap", desc: "Aesthetic outfits & productivity gear to dominate the dorms and lecture halls." },
  { id: "Street Style", label: "Street Style", icon: "Sparkles", desc: "Bold silhouettes, techwear basics, and statement sneakers that own the pavement." },
  { id: "Work & Productivity", label: "Work Smart", icon: "Briefcase", desc: "Ergonomic tools and slick visual accessories for high-performance young professionals." },
  { id: "Travel Essentials", label: "Travel Ready", icon: "Compass", desc: "Multi-functional organizers, technical luggage, and smart travel accessories." },
  { id: "Gaming Zone", label: "Gaming Universe", icon: "Gamepad2", desc: "High-FPS visual aesthetics, immersive neon lighting, and responsive hardware styles." },
  { id: "Fitness & Wellness", label: "Fitness Mode", icon: "TrendingUp", desc: "Ultra-clean activewear, hydration solutions, and hybrid bio-tracking tech." },
  { id: "Smart Living", label: "Smart Living", icon: "Home", desc: "Intelligent ambient lighting, visual art displays, and app-controlled home hacks." },
  { id: "Creator Setup", label: "Creator Studio", icon: "Video", desc: "Slick ring-lights, studio micro-mounts, and aesthetics for creators who build in public." },
  { id: "Weekend Vibes", label: "Weekend Vibes", icon: "Tv", desc: "Cosy loungewear, retro cameras, and portable speakers for pure off-duty relaxation." },
  { id: "Festival Fashion", label: "Festival Fashion", icon: "Sun", desc: "High-contrast neon outerwear, party-proof eyewear, and metallic accents." }
];

export const PRODUCTS: Product[] = [
  {
    id: "genz-varsity-01",
    name: "Hyper-Aesthetic Retro Varsity Jacket",
    price: 3499,
    originalPrice: 4999,
    description: "An oversized vintage varsity jacket with premium patched lettering, dropped shoulders, and ultra-comfortable brushed inner linings. Perfect for effortless campus retro layering.",
    category: "fashion",
    lifestyleCollections: ["Campus Life", "Weekend Vibes", "Street Style"],
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5dec3e?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dec3e?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 98,
    isFastSelling: true,
    trendingBadges: ["VIRAL", "BEST SELLER"],
    lifestyleStory: "Designed to give off heavy 'Main Character' energies in any college courtyard. It blends vintage comfort with high-contrast active styling, sliding seamlessly from 8:00 AM lectures to cozy weekend hangouts.",
    specs: {
      "Fabric": "80% Organic Cotton, 20% Polyester Heavyweight Blend",
      "Fit": "Extremely Oversized / Dropped Shoulders",
      "Details": "Embroidered 3D patches & soft rib-knit trims",
      "Care": "Machine wash cold, air dry to preserve details"
    },
    colors: ["Cobalt Blue", "Forest Green", "Stealth Charcoal"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "genz-anc-phones",
    name: "Cyber-Sleek ANC Wireless Headphones",
    price: 6499,
    originalPrice: 8999,
    description: "Futuristic matte finish studio headphones with spatial sound projection, active hybrid noise cancellation (ANC), and lightweight memory-foam ear cushions. Features custom ambient LED rings.",
    category: "gadgets",
    lifestyleCollections: ["Work & Productivity", "Creator Setup", "Travel Essentials", "Gaming Zone"],
    rating: 4.9,
    reviewsCount: 318,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 99,
    isLimitedStock: true,
    limitedStockCount: 14,
    trendingBadges: ["AI RECOMMENDED", "LIMITED RE-DROP"],
    lifestyleStory: "Escape absolute visual noise during library marathons or coding sprints. The ambient color ring matches work playlists, establishing a bubble of heavy focus.",
    specs: {
      "Interface": "Bluetooth v5.3 / Type-C Universal Charging",
      "Battery Life": "Up to 50 hours with Active ANC disabled",
      "Driver Unit": "40mm Bio-Cellulose High-Fidelity Drivers",
      "Colorway": "Minimalist Matte Bone White"
    },
    colors: ["Bone White", "Obsidian Black", "Cyber Purple"],
    sizes: ["One Size"]
  },
  {
    id: "genz-cargos-02",
    name: "Techwear Modular Cargo Pant",
    price: 2499,
    originalPrice: 3500,
    description: "Engineered style pant crafted with utility tactical straps, water-repellent tech nylon, and adjustable ankles. Features quick-release side buckles and deep reinforced storage pockets.",
    category: "fashion",
    lifestyleCollections: ["Street Style", "Festival Fashion", "Travel Essentials"],
    rating: 4.7,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 94,
    trendingBadges: ["FAST SELLING"],
    lifestyleStory: "A tactical street silhouette that scales effortlessly. Ideal for outdoor raves, city crawls, or flights. Swap between utility cargo mode and wide-leg mode by adjusting custom toggles.",
    specs: {
      "Material": "88% Nylon Tech Weave, 12% Elastic Spandex",
      "Pockets": "6 heavy-duty modular geometric pockets",
      "Adjusters": "Dual elastic toggles at hem lines",
      "Waterproof": "DWR Tier 1 Rain-barrier treatment"
    },
    colors: ["Stealth Black", "Olive Drab", "Sandshell Beige"],
    sizes: ["M", "L", "XL"]
  },
  {
    id: "genz-pixel-art",
    name: "Pixel-Art Bluetooth Smart Display",
    price: 3999,
    originalPrice: 5499,
    description: "An retro aesthetic 16x16 LED desk companion. Acts as a smart clock, weather monitor, custom visualizer, and notification alert center via Bluetooth app.",
    category: "smart-living",
    lifestyleCollections: ["Smart Living", "Creator Setup", "Gaming Zone", "Work & Productivity"],
    rating: 4.8,
    reviewsCount: 206,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 96,
    trendingBadges: ["TECH MUST-HAVE"],
    lifestyleStory: "Elevates visual background interest for Twitch streaming setups or zoom workspace grids. Bring retro gaming vibe to a modern workspace with customized static animations.",
    specs: {
      "Display": "16x16 Full RGB programmable low-glow LEDs",
      "Audio": "Built-in 5W Omni-directional speaker",
      "Connectivity": "Dedicated Smart App (iOS / Android support)",
      "Power": "Rechargeable 3000mAh Lithium-Ion battery"
    },
    colors: ["Neon Shell Cream", "Stealth Onyx", "Pink Milkshake"],
    sizes: ["Standard"]
  },
  {
    id: "genz-mech-keycap",
    name: "Aura-Glow Pastel Mechanical Keyboard",
    price: 4999,
    originalPrice: 7999,
    description: "A compact hot-swappable mechanical board featuring custom translucent lavender keycaps, pre-lubed linear cream switches, and highly responsive sound dampening foam. Fully glowing neon dynamic backing.",
    category: "gadgets",
    lifestyleCollections: ["Gaming Zone", "Creator Setup", "Work & Productivity"],
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 97,
    isLimitedStock: true,
    limitedStockCount: 5,
    trendingBadges: ["GAMER PREFERED", "LOW STOCK"],
    lifestyleStory: "Brings satisfying acoustic marble typing sounds and unmatched desk visual harmony to long coding semesters or late-night discord campaigns.",
    specs: {
      "Form Factor": "65% Space-Saving Compact Layout",
      "Switches": "Custom Lavender Cream Linear Switches (Pre-lubed)",
      "Keys": "Double-shot PBT Glow-Through Profile",
      "Cable": "Coiled Type-C braided matching cable included"
    },
    colors: ["Lavender Haze", "Minty Mint", "Neon Spark"],
    sizes: ["65% Layout"]
  },
  {
    id: "genz-sunglasses-03",
    name: "Futuristic Cyberpunk Rimless Sunglasses",
    price: 1299,
    originalPrice: 1999,
    description: "Lightweight metallic frames with wraparound UV400 reflective iridescent glasses. Imbued with a streamlined blade shape for a retro-futuristic aesthetic. Durable and scratchproof.",
    category: "accessories",
    lifestyleCollections: ["Street Style", "Festival Fashion", "Weekend Vibes"],
    rating: 4.6,
    reviewsCount: 224,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 95,
    trendingBadges: ["TIKTOK FAV"],
    lifestyleStory: "The ultimate cheat code to looking pristine in candid street photos or rave strobe-lights. Instantly converts any regular outfit into high fashion streetwear style.",
    specs: {
      "Lens": "Zero-Distortion HD Polycarbonate (UV400 Protected)",
      "Frames": "Reinforced aviation aluminum framing alloys",
      "Nosepad": "Slick soft-molded medical silicon cups",
      "Case": "Chunky industrial metallic container included"
    },
    colors: ["Laser Silver Mirror", "Saturate Hot Pink", "Absolute Matte Black"],
    sizes: ["Standard Fit"]
  },
  {
    id: "genz-tech-bag",
    name: "Streamlined Hex-Shield Crossbody Bag",
    price: 1899,
    originalPrice: 2800,
    description: "Hard-shell geometric sling bag built with water-resistant carbon fiber shell blocks. Includes integrated USB charging ports, hidden back card vaults, and anti-theft magnetic locks.",
    category: "accessories",
    lifestyleCollections: ["Street Style", "Travel Essentials", "Campus Life"],
    rating: 4.7,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 93,
    trendingBadges: ["DAILY ACCESORY"],
    lifestyleStory: "Carries tablets, powerbanks, airpods, and styling drops without bulky pouch lines. Perfect defense mechanism against active rains and packed urban train transits.",
    specs: {
      "Outer Shell": "Carbon Shield EVA Composite Waterproof panels",
      "Hardware": "Heavyweight matte-black metal tactical clip-rings",
      "Weight": "Ultra light 380 grams empty weight",
      "Capacity": "Modular 6L central volume space"
    },
    colors: ["Carbon Matte Grey", "Cyberpunk Yellow", "Stealth Onyx Jet"],
    sizes: ["One Size"]
  },
  {
    id: "genz-hydration-04",
    name: "Aesthetic Thermo Hydration Flask",
    price: 1499,
    originalPrice: 2499,
    description: "Pastel powder-coated double-walled flask designed to keep drinks icy cold for 36 hours. Features modular sports straw cap, soft visual silicon boot, and an integrated durable grip loop.",
    category: "accessories",
    lifestyleCollections: ["Fitness & Wellness", "Campus Life", "Travel Essentials"],
    rating: 4.8,
    reviewsCount: 290,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 95,
    trendingBadges: ["PINTEREST HIT"],
    lifestyleStory: "Hydrate elegantly. Looks pristine parked on library desks or next to fitness machines. Customize with minimalist outdoor stickers to make it truly personal.",
    specs: {
      "Structure": "Vacuum-Sealed Pro-Grade 18/8 Stainless Steel",
      "Performance": "36 hours iced chill preservation, 12 hours hot thermal lock",
      "Finish": "Scratch-resistant satin powder grip finish",
      "BPA Status": "100% Certified BPA-Free & Toxin-Free"
    },
    colors: ["Lilac Fog", "Matcha Milk", "Warm Peach", "Cyber Charcoal"],
    sizes: ["750ml", "1000ml"]
  },
  {
    id: "genz-cam-06",
    name: "Retro Digital Vlog Camera & Camcorder",
    price: 5499,
    originalPrice: 7999,
    description: "Incredibly aesthetic pocket camcorder mimicking early 2000s vintage camera visual grains but with 4K photo sensor, flip-out selfie framing screen, and retro light filters.",
    category: "gadgets",
    lifestyleCollections: ["Creator Setup", "Weekend Vibes", "Festival Fashion"],
    rating: 4.5,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 97,
    isFastSelling: true,
    trendingBadges: ["CREATOR DEGRADE FEED", "FAST RUNNING OUT"],
    lifestyleStory: "Capture raw, textured nostalgia with your friend groups. Skip cold, over-polished phone filters for real nostalgic flash glares and warm vintage highlights.",
    specs: {
      "Sensor": "High Sensitivity CMOS 48 Megapixel Sensor",
      "Filters": "Preloaded 'Retro-Grain-98', 'Y2K-Cam', 'Summer-Haze'",
      "Screen": "3.0 Inch 180° Rotating visual flip display Panel",
      "SD Card": "Supports up to 256GB High-Speed UHS Class 3 Cards"
    },
    colors: ["Vintage Cream White", "Sage Green", "Charcoal Mist"],
    sizes: ["Complete Vlogger Pack"]
  },
  {
    id: "genz-active-band",
    name: "Aura Smart Bio-Tracking Active Watch",
    price: 4499,
    originalPrice: 6500,
    description: "Ultra-thin hybrid steel smart activity ring & watch hybrid. Boasts circular glass interface, bio-metric sync layers, and stress-level visualizers.",
    category: "gadgets",
    lifestyleCollections: ["Fitness & Wellness", "Smart Living", "Work & Productivity"],
    rating: 4.8,
    reviewsCount: 153,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 94,
    trendingBadges: ["BIO-HACK FAVORITE"],
    lifestyleStory: "Monitors meditation loops, deep sleep scores, and cardio loads without distracting screen buzzes. Synchronize with playlists to match vibes to active heart rates.",
    specs: {
      "Sensors": "Optical Heart Rate, SpO2 Blood Flow, Skin temp node",
      "Chassis": "Aura-Titanium grade bezel frame wraps",
      "Waterproof": "5ATM Swimming dustproof defense",
      "Charge Time": "Quick-Mag chargers (Full battery capacity in 40 mins)"
    },
    colors: ["Chilled Silver Matte", "Champagne Aurora Gold", "Stealth Black"],
    sizes: ["S-M Band", "M-L Band"]
  },
  {
    id: "genz-ambient-glow",
    name: "Intelligent Aura Neon Tube Lamp",
    price: 2299,
    originalPrice: 3499,
    description: "Sleek vertical ambient lamp emitting 16 million colors with audio-reactive sensors, custom app programming, and elegant iron floor brackets.",
    category: "smart-living",
    lifestyleCollections: ["Smart Living", "Gaming Zone", "Creator Setup"],
    rating: 4.9,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 97,
    trendingBadges: ["AMBIENT KING"],
    lifestyleStory: "Instantly sets an immersive dark lo-fi lounge vibe in standard dorms. Its built-in microphone catches music beats, pulsing colors in sync with bedroom soundtracks.",
    specs: {
      "Dynamic Modes": "54 custom-curated pre-programmed ambient themes",
      "Height": "145cm Vertical Slim Iron footprint",
      "Wattage": "18W Energy-Safe micro led beads",
      "App": "Voice Command support (Alexa/Google Home integrations)"
    },
    colors: ["Classic Jet-Black Frame", "Matte Nordic White Frame"],
    sizes: ["Single Tube Pack", "Stereo Double Pack"]
  },
  {
    id: "genz-cozy-hoodie",
    name: "Double-Weight Oversized Lofi Hoodie",
    price: 2299,
    originalPrice: 3299,
    description: "Constructed with super-thick 480GSM premium organic cotton. Boxy drop silhouette with extra-wide hoods and no drawstrings for clean aesthetic styling.",
    category: "fashion",
    lifestyleCollections: ["Campus Life", "Street Style", "Weekend Vibes"],
    rating: 4.8,
    reviewsCount: 345,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=700&auto=format&fit=crop"
    ],
    trendScore: 99,
    isFastSelling: true,
    trendingBadges: ["PULLOVER OF THE YEAR"],
    lifestyleStory: "The heavy shield comfort hoodie that is perfect for taking naps during freezing commute transits or layering up on late night cafe gaming sessions.",
    specs: {
      "GSM Weight": "Boxy 480GSM High-Performance Heavyweight Loom",
      "Cotton Source": "100% Certified Ethical Organic Fleece Cotton",
      "Cuffs": "Double-thick tactile ribbing loops",
      "Design": "Drawstring-free kangaroo pouch clean aesthetic silhouette"
    },
    colors: ["Sage Green", "Warm Oatmeal", "Midnight Navy", "Stealth Asphalt"],
    sizes: ["XS", "S", "M", "L", "XL"]
  }
];

export const TRENDS: TrendPost[] = [
  {
    id: "trend-01",
    title: "The Rise of Techwear & Cargo Silhouettes on Campus",
    excerpt: "Ditching skinny jeans once and for all—and embracing high-capacity pocket designs, quick-release combat straps, and rainproof industrial fabrics.",
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=700&auto=format&fit=crop",
    category: "Fashion Trends",
    readTime: "4 min read",
    likes: 842,
    views: 3421,
    commentsCount: 34,
    relatedProductId: "genz-cargos-02"
  },
  {
    id: "trend-02",
    title: "Dorm Room Aura Shift: Intelligent Visual Ambient Lighting",
    excerpt: "How vertical neon tubes and pixel art desktop companion systems are replacing traditional fluorescent desk lamps in dorm configurations.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=700&auto=format&fit=crop",
    category: "Smart Space",
    readTime: "5 min read",
    likes: 1205,
    views: 4531,
    commentsCount: 56,
    relatedProductId: "genz-ambient-glow"
  },
  {
    id: "trend-03",
    title: "Y2K Aesthetic Rebirth: Retro CCD Lenses and Chunky Varsity Layers",
    excerpt: "Why Gen Z creators are setting aside pristine, high-res smartphone lenses in favor of retro CCD cameras to document their core festival fashion loops.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=700&auto=format&fit=crop",
    category: "Creator Vibe",
    readTime: "3 min read",
    likes: 938,
    views: 2981,
    commentsCount: 19,
    relatedProductId: "genz-cam-06"
  }
];

export const REVIEWS_POOL: Review[] = [
  {
    id: "rev-01",
    userName: "Armaan_V",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    date: "2026-06-02",
    comment: "This jacket is crazy comfortable! Standard varsity fits are stiff, but this dropped shoulder fit is buttery soft inside. Wore it to college and immediately got 3 compliments.",
    verifiedPurchase: true,
    likes: 47
  },
  {
    id: "rev-02",
    userName: "Nisha.Goel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    date: "2026-05-28",
    comment: "Excellent sound stage, design is extremely clean! The glowing rings aren't overly bright, just the right amount of cyberpunk detail. Absolute must-have and charger lasts forever.",
    verifiedPurchase: true,
    likes: 83
  },
  {
    id: "rev-03",
    userName: "Karan_Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    rating: 4,
    date: "2026-06-05",
    comment: "Solid cargos, rain falls right off. Tons of pockets to stow my pixel screen and accessories. Elastic toggles pull nicely.",
    verifiedPurchase: true,
    likes: 12
  }
];
