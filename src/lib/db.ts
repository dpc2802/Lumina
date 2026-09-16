export { db } from "../db/index";
// Stub Prisma to prevent compiler errors in admin panel during Drizzle migration
export const prisma = {
  product: { findMany: async () => [], findUnique: async () => null, create: async () => ({}), update: async () => ({}), delete: async () => ({}) },
  order: { count: async () => 0, aggregate: async () => ({ _sum: { totalAmount: 0 } }), findMany: async () => [], findUnique: async () => null, create: async () => ({}), update: async () => ({}), delete: async () => ({}), deleteMany: async () => ({}) },
  customer: { count: async () => 0, findMany: async () => [], findUnique: async () => null, create: async () => ({}), update: async () => ({}), delete: async () => ({}) },
  storeSettings: { findUnique: async () => null, create: async () => ({}), update: async () => ({}) }
};
