const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/dobi-cakes').then(async () => {
  console.log('Connected to database. Starting aggressive seeding...');

  const promos = [
    { code: 'DOBI10', discountType: 'percentage', value: 10, expiryDate: new Date('2026-12-31'), isActive: true, usageLimit: 500, usageCount: 0 },
    { code: 'ARTISANAL20', discountType: 'percentage', value: 20, expiryDate: new Date('2026-08-15'), isActive: true, usageLimit: 100, usageCount: 0 },
    { code: 'SWEETFIX', discountType: 'fixed', value: 2500, expiryDate: new Date('2026-11-20'), isActive: true, usageLimit: 250, usageCount: 0 },
    { code: 'CAKEJOURNAL15', discountType: 'percentage', value: 15, expiryDate: new Date('2026-10-10'), isActive: true, usageLimit: 300, usageCount: 0 },
    { code: 'WEDDINGGIFT', discountType: 'fixed', value: 10000, expiryDate: new Date('2026-12-01'), isActive: true, usageLimit: 50, usageCount: 0 },
    { code: 'BIRTHDAYBASH', discountType: 'percentage', value: 12, expiryDate: new Date('2026-09-30'), isActive: true, usageLimit: 150, usageCount: 0 },
    { code: 'TASTING5', discountType: 'fixed', value: 5000, expiryDate: new Date('2026-07-04'), isActive: true, usageLimit: 75, usageCount: 0 },
    { code: 'DOBIVIP', discountType: 'percentage', value: 25, expiryDate: new Date('2026-12-31'), isActive: true, usageLimit: 20, usageCount: 0 },
    { code: 'FIRSTCAKE', discountType: 'percentage', value: 5, expiryDate: new Date('2026-12-31'), isActive: true, usageLimit: 1000, usageCount: 0 },
    { code: 'HOLIDAY25', discountType: 'percentage', value: 25, expiryDate: new Date('2026-01-05'), isActive: true, usageLimit: 200, usageCount: 0 },
    { code: 'FLASH50', discountType: 'percentage', value: 50, expiryDate: new Date('2026-06-01'), isActive: true, usageLimit: 10, usageCount: 0 },
    { code: 'WELCOME10', discountType: 'percentage', value: 10, expiryDate: new Date('2027-01-01'), isActive: true, usageLimit: 1000, usageCount: 0 },
    { code: 'DOBIART', discountType: 'fixed', value: 1500, expiryDate: new Date('2026-12-31'), isActive: true, usageLimit: 500, usageCount: 0 }
  ];

  const banners = [
    {
      title: 'Artisanal Wedding Collection',
      subtitle: 'Bespoke architectural cakes for your forever moment.',
      imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&q=80&w=2000',
      link: '/products?category=wedding',
      active: true,
      order: 1
    },
    {
      title: 'Nigerian Red Velvet Signature',
      subtitle: 'Experience the deep, heritage flavors of Dobi Cakes.',
      imageUrl: 'https://images.unsplash.com/photo-1586788680434-30d324671ff6?auto=format&fit=crop&q=80&w=2000',
      link: '/products/red-velvet',
      active: true,
      order: 2
    },
    {
      title: 'Bespoke Consultation Sessions',
      subtitle: 'Book a virtual design session with our master creators.',
      imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=2000',
      link: '/appointments',
      active: true,
      order: 3
    },
    {
      title: 'Luxury Drip Series',
      subtitle: 'Gravity-defying elegance for your next celebration.',
      imageUrl: 'https://images.unsplash.com/photo-1562233237-10d744850930?auto=format&fit=crop&q=80&w=2000',
      link: '/products?category=drip-cakes',
      active: true,
      order: 4
    },
    {
      title: 'Seasonal Fruit Medley',
      subtitle: 'Fresh, vibrant, and perfectly balanced botanical cakes.',
      imageUrl: 'https://images.unsplash.com/photo-1519340333755-5dc7731d258b?auto=format&fit=crop&q=80&w=2000',
      link: '/products?category=seasonal',
      active: true,
      order: 5
    },
    {
      title: 'Signature Cupcake Box',
      subtitle: 'Perfectly portioned indulgence for any occasion.',
      imageUrl: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=2000',
      link: '/products?category=cupcakes',
      active: true,
      order: 6
    }
  ];

  // Clear existing marketing data
  await mongoose.connection.collection('promos').deleteMany({});
  await mongoose.connection.collection('banners').deleteMany({});
  console.log('Cleared existing promos and banners.');
  
  // Insert new data
  await mongoose.connection.collection('promos').insertMany(promos);
  await mongoose.connection.collection('banners').insertMany(banners);
  console.log(`Successfully seeded ${promos.length} promos and ${banners.length} banners.`);

  process.exit(0);
}).catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
