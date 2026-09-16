import { 
  pgTable, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  decimal, 
  jsonb, 
  index
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// CATEGORIES
export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("category_slug_idx").on(table.slug)
]);

// MATERIALS
export const materials = pgTable("materials", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("material_slug_idx").on(table.slug)
]);

// PRODUCTS
export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  status: text("status").default("active").notNull(),
  
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  oldPrice: decimal("old_price", { precision: 10, scale: 2 }),
  
  categoryId: text("category_id").references(() => categories.id).notNull(),
  materialId: text("material_id").references(() => materials.id).notNull(),
  
  variants: jsonb("variants"),
  
  stock: integer("stock").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("product_slug_idx").on(table.slug),
  index("product_category_idx").on(table.categoryId),
  index("product_material_idx").on(table.materialId),
  index("product_status_idx").on(table.status)
]);

// PRODUCT IMAGES
export const productImages = pgTable("product_images", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  productId: text("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  url: text("url").notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("product_image_product_idx").on(table.productId),
  index("product_image_primary_idx").on(table.isPrimary)
]);

// RELATIONS
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  material: one(materials, {
    fields: [products.materialId],
    references: [materials.id],
  }),
  images: many(productImages),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const materialsRelations = relations(materials, ({ many }) => ({
  products: many(products),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

// CUSTOMERS (kept for actions compatibility)
export const customers = pgTable("customers", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  tier: text("tier").default("Oro").notNull(),
  spent: decimal("spent", { precision: 10, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ORDERS
export const orders = pgTable("orders", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  orderNumber: text("order_number").notNull().unique(),
  status: text("status").default("Procesando").notNull(),
  payment: text("payment").default("Stripe").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  customerId: text("customer_id").references(() => customers.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ORDER ITEMS
export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  orderId: text("order_id").references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: text("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: decimal("price_at_purchase", { precision: 10, scale: 2 }).notNull(),
});

// STORE SETTINGS
export const storeSettings = pgTable("store_settings", {
  id: text("id").primaryKey().$defaultFn(() => "singleton"),
  storeName: text("store_name").default("Lumina Joyas").notNull(),
  whatsappNumber: text("whatsapp_number").default("+52 81 1234 5678").notNull(),
  checkoutMessage: text("checkout_message").default("Garantizamos absoluta discreción y seguridad blindada en su entrega.").notNull(),
  stripeSecretKey: text("stripe_secret_key").default("").notNull(),
  paypalClientId: text("paypal_client_id").default("").notNull(),
  payIdEmail: text("pay_id_email").default("payments@luminajewelry.com.au").notNull(),
  smtpProvider: text("smtp_provider").default("").notNull(),
  twilioSid: text("twilio_sid").default("").notNull(),
  twilioToken: text("twilio_token").default("").notNull(),
  termsText: text("terms_text").default("").notNull(),
  privacyText: text("privacy_text").default("").notNull(),
  returnsText: text("returns_text").default("").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
