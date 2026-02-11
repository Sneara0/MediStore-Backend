import { prisma } from "../config/prisma.js"; // ✅ .js যোগ করা হয়েছে
import bcrypt from "bcryptjs"; // ✅ bcrypt বদলে bcryptjs করা হয়েছে

export const getProfileService = async (userId: string) => {
  return prisma.user.findUnique({ 
    where: { id: userId }, 
    select: { id: true, name: true, email: true, role: true } 
  });
};

export const updateProfileService = async (userId: string, data: { name?: string; email?: string; password?: string }) => {
  if (data.password) {
    // পাসওয়ার্ড হ্যাশ করার সময় bcryptjs ব্যবহার করা হয়েছে
    data.password = await bcrypt.hash(data.password, 10);
  }
  
  return prisma.user.update({ 
    where: { id: userId }, 
    data 
  });
};