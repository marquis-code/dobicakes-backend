import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
  {
    name: "Midnight Velvet Rose",
    description: "Our signature deep chocolate sponge layered with silken raspberry ganache and encased in a matte charcoal buttercream. Adorned with edible 24k gold leaf and fresh deep red roses.",
    price: 45000,
    stock: 10,
    category: "Wedding",
    images: [
      "/img/midnight-velvet.png"
    ],
    flavors: ["Dark Chocolate", "Red Velvet", "Classic Vanilla"],
    sizes: [
      { name: "6-inch (Small)", priceOffset: 0 },
      { name: "8-inch (Medium)", priceOffset: 15000 },
      { name: "10-inch (Large)", priceOffset: 35000 }
    ],
    tags: ["Best Seller", "Signature"],
    availabilityType: "PREORDER"
  },
  {
    name: "Golden Salted Caramel Drip",
    description: "Four layers of buttery caramel sponge, filled with homemade salted caramel and covered in a light vanilla bean frosting. Finished with a dramatic golden caramel drip and sea salt macarons.",
    price: 32000,
    stock: 5,
    category: "Birthday",
    images: [
      "/img/caramel-drip.png"
    ],
    flavors: ["Caramel Bean", "Salted Butter"],
    sizes: [
      { name: "6-inch", priceOffset: 0 },
      { name: "8-inch", priceOffset: 12000 }
    ],
    tags: ["Trending"],
    availabilityType: "NOW"
  },
  {
    name: "Belgian Truffle Box",
    description: "An assortment of 12 handcrafted Belgian chocolate truffles, infused with champagne, salted caramel, and espresso. The perfect gift for the discerning palate.",
    price: 18500,
    stock: 20,
    category: "Occasion",
    images: [
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Gift Set"],
    availabilityType: "NOW"
  },
  {
    name: "Sicilian Lemon & Pistachio",
    description: "Light lemon-infused sponge paired with roasted Sicilian pistachio cream. Topped with crushed pistachios and candied lemon peel for a refreshing, sophisticated flavor.",
    price: 28000,
    stock: 8,
    category: "Birthday",
    images: [
      "/img/sicilian-lemon.png"
    ],
    flavors: ["Lemon Zest", "Pistachio Dream"],
    sizes: [
      { name: "Regular", priceOffset: 0 },
      { name: "Party Size", priceOffset: 20000 }
    ],
    availabilityType: "NOW"
  },
  {
    name: "Artisanal Cupcake Collection",
    description: "A dozen of our finest cupcakes featuring 4 unique flavors: Tahitian Vanilla, Dark Cocoa, Earl Grey & Honey, and Strawberry Champagne.",
    price: 15000,
    stock: 15,
    category: "Cupcakes",
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Assorted"],
    availabilityType: "NOW"
  },
  {
    name: "White Gold Wedding Tiers",
    description: "A breathtaking three-tier masterpiece. Pure white textured frosting with delicate edible gold leaf cascades. Each tier can be customized with its own flavor profile.",
    price: 150000,
    stock: 2,
    category: "Wedding",
    images: [
      "https://images.unsplash.com/photo-1522760883282-109ef78496bc?auto=format&fit=crop&q=80&w=1000"
    ],
    flavors: ["Vanilla Bean", "Lemon & Elderflower", "Rich Fruit"],
    sizes: [
      { name: "Standard 3-Tier", priceOffset: 0 },
      { name: "Grand 5-Tier", priceOffset: 120000 }
    ],
    tags: ["Luxury", "Masterpiece"],
    availabilityType: "PREORDER"
  },
  {
    name: "Raspberry & White Chocolate Mille-Feuille Cake",
    description: "An innovative take on the classic French pastry. Alternating layers of crisp, caramelized puff pastry, fresh raspberry compote, and whipped white chocolate ganache.",
    price: 36000,
    stock: 6,
    category: "Birthday",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1000"
    ],
    flavors: ["White Chocolate", "Vanilla Bean"],
    sizes: [
      { name: "Standard 8-inch", priceOffset: 0 },
      { name: "Large 10-inch", priceOffset: 12000 }
    ],
    tags: ["New", "French-Inspired"],
    availabilityType: "NOW"
  },
  {
    name: "Classic New York Vanilla Cheesecake",
    description: "Our signature, ultra-dense, slow-baked New York cheesecake on a buttery digestive biscuit crust. Served with a tart passion fruit coulis.",
    price: 25000,
    stock: 12,
    category: "Cheesecake",
    images: [
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=1000"
    ],
    flavors: ["Vanilla", "Passion Fruit"],
    sizes: [
      { name: "8-inch", priceOffset: 0 }
    ],
    tags: ["Classic"],
    availabilityType: "NOW"
  },
  {
    name: "Double Fudge Artisan Brownie Tray",
    description: "A decadent 12x9 inch tray of our dense, fudgy brownies. Loaded with 70% dark Belgian chocolate chunks and finished with flaky sea salt.",
    price: 12000,
    stock: 20,
    category: "Brownies",
    images: [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=1000"
    ],
    flavors: ["Dark Chocolate"],
    sizes: [
      { name: "Standard Tray", priceOffset: 0 }
    ],
    tags: ["Popular"],
    availabilityType: "NOW"
  },
  {
    name: "Rose Gold Macaron Tower",
    description: "A stunning 4-tier tower featuring 40 delicate French macarons in shades of rose gold, blush, and cream. Flavors include Rose Water, Lychee, Vanilla, and White Chocolate.",
    price: 65000,
    stock: 3,
    category: "Occasion",
    images: [
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=1000"
    ],
    flavors: ["Assorted"],
    sizes: [
      { name: "4-Tier (40 pcs)", priceOffset: 0 },
      { name: "6-Tier (75 pcs)", priceOffset: 45000 }
    ],
    tags: ["Luxury", "Event Centerpiece"],
    availabilityType: "PREORDER"
  }
];

const blogPosts = [
  {
    title: "The Secrets to the Perfect Wedding Cake Selection",
    author: "Adaobi",
    content: "Selecting the perfect wedding cake is an art form. From flavor profiles that dance on the palate to structural designs that wow your guests, we dive deep into what makes a masterpiece...",
    image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=1000",
    tags: ["Wedding", "Guide"],
    createdAt: new Date()
  },
  {
    title: "Artisanal Baking: Why Ingredients Matter",
    author: "Chef Marcus",
    content: "At Dobi Cakes, we don't just bake; we create experiences. This starts with sourcing the finest Belgian chocolate and organic dairy. Discover why the origin of your vanilla bean changes everything...",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aee4d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Ingredients", "Behind the Scenes"],
    createdAt: new Date(Date.now() - 86400000 * 2)
  },
  {
    title: "Hosting the Ultimate Luxury Tea Party",
    author: "Sarah James",
    content: "Elevate your afternoon with our guide to the perfect tea party. From tiered stands to delicate finger sandwiches and, of course, our signature cupcakes...",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Lifestyle", "Events"],
    createdAt: new Date(Date.now() - 86400000 * 5)
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI not found in environment variables");

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected successfully.");

    // Access the collections directly
    const productCollection = mongoose.connection.collection('products');
    const blogCollection = mongoose.connection.collection('blogs');

    console.log("Cleaning existing products and blogs...");
    await productCollection.deleteMany({});
    await blogCollection.deleteMany({});
    console.log("Cleaned.");

    console.log(`Inserting ${products.length} products...`);
    await productCollection.insertMany(products.map(p => ({
      ...p,
      isAvailable: true,
      stock: p.stock || 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })));

    console.log(`Inserting ${blogPosts.length} blog posts...`);
    await blogCollection.insertMany(blogPosts);

    const banners = [
      {
        title: "The Art of Celebration",
        subtitle: "Handcrafted Luxury Cakes for Your Most Precious Moments",
        imageUrl: "/img/hero-1.png",
        active: true,
        order: 0,
        link: "/shop"
      },
      {
        title: "Midnight Collection",
        subtitle: "Discover the Deep Flavors of Our Signature Velvet Series",
        imageUrl: "/img/hero-2.png",
        active: true,
        order: 1,
        link: "/shop/midnight-velvet-rose"
      }
    ];

    console.log(`Inserting ${banners.length} banners...`);
    const bannerCollection = mongoose.connection.collection('banners');
    await bannerCollection.deleteMany({});
    await bannerCollection.insertMany(banners);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
