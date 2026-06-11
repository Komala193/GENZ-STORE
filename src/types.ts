export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  category: "fashion" | "gadgets" | "accessories" | "smart-living";
  lifestyleCollections: string[]; // e.g. ["Campus Life", "Street Style"]
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[]; // For gallery / 360-degree views
  trendScore: number; // e.g. 98
  isFastSelling?: boolean;
  isLimitedStock?: boolean;
  limitedStockCount?: number;
  trendingBadges?: string[]; // e.g. ["VIRAL", "BEST SELLER"]
  lifestyleStory: string; // Explains how the product fits into a lifestyle
  specs: Record<string, string>;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  trackingStatus: "processing" | "shipped" | "out-for-delivery" | "delivered";
  trackingSteps: {
    status: string;
    date: string;
    desc: string;
    done: boolean;
  }[];
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  rewardsPointsEarned: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  studentIdVerified: boolean;
  rewardsPoints: number;
  tier: "Bronze" | "Gold" | "Platinum" | "Elixir Genz";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "order" | "offer" | "trend";
}

export interface TrendPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  likes: number;
  views: number;
  commentsCount: number;
  relatedProductId?: string;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  likes: number;
}
