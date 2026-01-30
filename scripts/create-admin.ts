// Run this logic once to create your first admin
import { db } from '@/lib/db';
import { admins } from '@/lib/schema';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const password = "admin123"; // The password you want
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.insert(admins).values({
    email: "admin@ciacademy.in",
    passwordHash: hashedPassword,
  });

  console.log("Admin created successfully");
}

createAdmin();