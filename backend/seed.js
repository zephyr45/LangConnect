import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import { connectDB } from "./src/lib/db.js";
import path from "path";

// robustly find .env
dotenv.config({ path: "backend/.env" });
if (!process.env.MONGO_URI) {
  // try default location if running from backend dir
  dotenv.config();
}

// Full names to match frontend/src/constants/index.js
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Japanese",
  "Korean",
  "Hindi",
  "Russian",
  "Portuguese",
  "Arabic",
  "Italian",
  "Turkish",
  "Dutch",
];
const TOTAL_USERS = 1000;

// Helper to generate random element from array
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to generate random name
const generateName = () => {
  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Reese'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  return `${randomElement(firstNames)} ${randomElement(lastNames)}`;
};

// Helper to generate bio
const generateBio = (native, learning) => {
  const bios = [
    `Native ${native} speaker learning ${learning}. Let's practice together!`,
    `Passionate about languages. Looking to improve my ${learning}.`,
    `${native} speaker here! Want to help each other learn?`,
    `Learning ${learning} for travel. Happy to help with ${native}!`,
    `Language exchange enthusiast. ${native} ↔ ${learning}`,
  ];
  return randomElement(bios);
};

async function seedDatabase() {
  try {
    // Connect to database
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing seed data (preserve real users)
    const deleteResult = await User.deleteMany({
      email: { $regex: /@seed\.test$/i }
    });
    console.log(`Cleared ${deleteResult.deletedCount} existing seed users`);

    // Hash password once for all users (performance optimization)
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Generate users
    const users = [];
    for (let i = 0; i < TOTAL_USERS; i++) {
      const nativeLanguage = randomElement(LANGUAGES).toLowerCase();
      let learningLanguage = randomElement(LANGUAGES).toLowerCase();

      // Ensure native and learning languages are different
      while (learningLanguage === nativeLanguage) {
        learningLanguage = randomElement(LANGUAGES);
      }

      const user = {
        fullName: generateName(),
        email: `user${i + 1}@seed.test`,
        password: hashedPassword,
        bio: generateBio(nativeLanguage, learningLanguage),
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
        nativeLanguage,
        learningLanguage,
        location: randomElement(['USA', 'Spain', 'France', 'Germany', 'Italy', 'Brazil', 'Russia', 'Japan', 'China', 'India']),
        isOnboarded: true,
        friends: [],
      };

      users.push(user);
    }

    // Bulk insert
    const result = await User.insertMany(users);
    console.log(`✅ Successfully seeded ${result.length} users`);

    // Show some statistics
    const stats = {};
    users.forEach(u => {
      const key = `${u.nativeLanguage} → ${u.learningLanguage}`;
      stats[key] = (stats[key] || 0) + 1;
    });

    console.log("\n📊 Language Pair Distribution (showing top 10):");
    const topPairs = Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    topPairs.forEach(([pair, count]) => {
      console.log(`  ${pair}: ${count} users`);
    });

    console.log(`\n✨ Seeding complete! Total users: ${result.length}`);
    console.log("📝 Test credentials: user1@seed.test / password123");

  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  }
}

// Run seeding
seedDatabase();
