export { db } from "../db/index";
// Stub Prisma to prevent compiler errors in admin panel during Drizzle migration
export const prisma: any = {
  product: { findMany: async (...args: any[]) => [], findUnique: async (...args: any[]) => null, create: async (...args: any[]) => ({}), update: async (...args: any[]) => ({}), delete: async (...args: any[]) => ({}) },
  order: { count: async (...args: any[]) => 0, aggregate: async (...args: any[]) => ({ _sum: { totalAmount: 0 } }), findMany: async (...args: any[]) => [], findUnique: async (...args: any[]) => null, create: async (...args: any[]) => ({}), update: async (...args: any[]) => ({}), delete: async (...args: any[]) => ({}), deleteMany: async (...args: any[]) => ({}) },
  customer: { count: async (...args: any[]) => 0, findMany: async (...args: any[]) => [], findUnique: async (...args: any[]) => null, create: async (...args: any[]) => ({}), update: async (...args: any[]) => ({}), delete: async (...args: any[]) => ({}) },
  storeSettings: { findUnique: async (...args: any[]) => null, create: async (...args: any[]) => ({}), update: async (...args: any[]) => ({}) }
};
