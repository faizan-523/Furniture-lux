// ─── scripts/seed-admin.js ───────────────────────────────────────────────────
// Seeder script to initialize the first admin account in MongoDB.
// Reads MONGODB_URI from .env file and inserts the admin user.

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load environment variables from .env manually to avoid extra dependencies
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      // Remove surrounding quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/furniturelux";

// Minimal User Schema for seeder script
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true, collection: "users" }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedAdmin() {
  console.log("Connecting to database:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "furniturelux" });
    console.log("Database connected successfully to 'furniturelux'.");

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@furniturelux.com").toLowerCase().trim();
    const securePassword = process.env.ADMIN_PASSWORD || "Adminlux2026!";
    const hashedPassword = await bcrypt.hash(securePassword, 12);

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      existingAdmin.hashedPassword = hashedPassword;
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log(`Admin user "${adminEmail}" updated with latest password and admin role.`);
    } else {
      await User.create({
        name: "FurnitureLux Admin",
        email: adminEmail,
        hashedPassword,
        role: "admin",
      });
      console.log(`Admin user "${adminEmail}" created successfully.`);
    }

    console.log("-----------------------------------------");
    console.log("Admin user configured in MongoDB Atlas!");
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${securePassword}`);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("Failed to seed admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
}

seedAdmin();
