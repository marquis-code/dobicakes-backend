const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/dobi-cakes').then(async () => {
  console.log('Connected to database. Starting forms seeding...');

  const forms = [
    {
      title: 'Bespoke Wedding Cake Inquiry',
      description: 'Start your journey to the perfect wedding cake. Tell us about your special day and artisanal preferences.',
      fields: [
        { label: 'Couple Names', type: 'text', required: true },
        { label: 'Email Address', type: 'email', required: true },
        { label: 'Wedding Date', type: 'text', required: true },
        { label: 'Estimated Guest Count', type: 'number', required: true },
        { label: 'Venue Location', type: 'text', required: false },
        { label: 'Preferred Cake Style', type: 'select', required: false, options: ['Classic Tiered', 'Modern Minimalist', 'Floral & Botanical', 'Naked / Rustic', 'Bold & Thematic'] },
        { label: 'Additional Details', type: 'textarea', required: false }
      ],
      isActive: true,
      responses: [
        { submittedAt: new Date(Date.now() - 86400000), data: { 'Couple Names': 'Sarah & John', 'Email Address': 'sarah@example.com', 'Wedding Date': '2026-10-15', 'Estimated Guest Count': 150, 'Preferred Cake Style': 'Floral & Botanical' } }
      ]
    },
    {
      title: 'Corporate Gifting Request',
      description: 'Elevate your corporate events and client appreciation with our signature luxury boxes.',
      fields: [
        { label: 'Company Name', type: 'text', required: true },
        { label: 'Contact Person', type: 'text', required: true },
        { label: 'Corporate Email', type: 'email', required: true },
        { label: 'Quantity Needed', type: 'number', required: true },
        { label: 'Event Date', type: 'text', required: false },
        { label: 'Delivery Requirements', type: 'textarea', required: false }
      ],
      isActive: true,
      responses: [
        { submittedAt: new Date(Date.now() - 172800000), data: { 'Company Name': 'TechCorp Ltd', 'Contact Person': 'Michael Brown', 'Corporate Email': 'mbrown@techcorp.com', 'Quantity Needed': 50, 'Event Date': '2026-08-01' } }
      ]
    },
    {
      title: 'Tasting Box Feedback',
      description: 'We hope you enjoyed your tasting box! Please share your thoughts to help us refine your final cake design.',
      fields: [
        { label: 'Client Name', type: 'text', required: true },
        { label: 'Email Address', type: 'email', required: true },
        { label: 'Favorite Flavor', type: 'select', required: true, options: ['Red Velvet', 'Sicilian Lemon', 'Valrhona Chocolate', 'Vanilla Bean', 'Pistachio Rose'] },
        { label: 'Least Favorite Flavor', type: 'text', required: false },
        { label: 'Texture Rating (1-10)', type: 'number', required: true },
        { label: 'Detailed Comments', type: 'textarea', required: false }
      ],
      isActive: true,
      responses: [
        { submittedAt: new Date(Date.now() - 259200000), data: { 'Client Name': 'Jessica Smith', 'Email Address': 'jessica.smith@example.com', 'Favorite Flavor': 'Sicilian Lemon', 'Texture Rating (1-10)': 9, 'Detailed Comments': 'The lemon was perfect, not too tart. Loved the crumb texture.' } }
      ]
    },
    {
      title: 'Custom Cake Pre-Order',
      description: 'Request a custom cake for birthdays, anniversaries, and special milestones.',
      fields: [
        { label: 'Full Name', type: 'text', required: true },
        { label: 'Phone Number', type: 'text', required: true },
        { label: 'Occasion', type: 'text', required: true },
        { label: 'Number of Servings', type: 'number', required: true },
        { label: 'Allergy Information', type: 'textarea', required: false },
        { label: 'Design Inspiration (URL or Description)', type: 'textarea', required: false }
      ],
      isActive: true,
      responses: []
    }
  ];

  await mongoose.connection.collection('forms').deleteMany({});
  console.log('Cleared existing forms.');
  
  await mongoose.connection.collection('forms').insertMany(forms);
  console.log(`Successfully seeded ${forms.length} forms.`);

  process.exit(0);
}).catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
