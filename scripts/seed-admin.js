const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("No MONGODB_URI found in .env");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: 'CUSTOMER', enum: ['ADMIN', 'CUSTOMER'] },
  isActive: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    const email = 'admin@dobicakes.com';
    const password = '123456'; // the "otp" requested by user

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin ${email} already exists. Updating password...`);
      existingAdmin.password = await bcrypt.hash(password, 10);
      existingAdmin.role = 'ADMIN';
      await existingAdmin.save();
      console.log("Admin updated successfully.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        email,
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'Admin',
        role: 'ADMIN',
        isActive: true
      });
      await newAdmin.save();
      console.log(`Admin created successfully with email: ${email} and password: ${password}`);
    }

  } catch (err) {
    console.error("Error seeding admin:", err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
