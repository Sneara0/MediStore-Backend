import "dotenv/config";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@prisma/client"; // generated পাথ বাদ দিয়ে এটি ব্যবহার করুন
import ws from 'ws';

// সার্ভারলেস এনভায়রনমেন্টে ওয়েবসকেট সাপোর্ট নিশ্চিত করতে
neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;

// পলিফিল এবং কানেকশন পুল তৈরি
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// গ্লোবাল ক্লায়েন্ট ডিফাইন করা যাতে Vercel-এ বারবার কানেকশন তৈরি না হয়
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter,
    log: ['error'] 
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;