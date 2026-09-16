import 'dotenv/config';
import { db } from './index';
import { categories, materials, products, productImages } from './schema';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  console.log('Seeding database...');
  
  try {
    const dumpData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'dump.json'), 'utf-8'));
    const oldProducts = dumpData.products || [];
    
    // Extract unique categories and materials
    const uniqueCategories = [...new Set(oldProducts.map((p: any) => p.category))];
    const uniqueMaterials = [...new Set(oldProducts.map((p: any) => p.material))];
    
    // Insert Categories
    const categoryMap: Record<string, string> = {};
    for (const catName of uniqueCategories) {
      if (!catName) continue;
      const slug = (catName as string).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const [inserted] = await db.insert(categories).values({ name: catName as string, slug }).returning();
      categoryMap[catName as string] = inserted.id;
    }
    
    // Insert Materials
    const materialMap: Record<string, string> = {};
    for (const matName of uniqueMaterials) {
      if (!matName) continue;
      const slug = (matName as string).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const [inserted] = await db.insert(materials).values({ name: matName as string, slug }).returning();
      materialMap[matName as string] = inserted.id;
    }
    
    // Insert Products and Images
    for (const old of oldProducts) {
      const slug = old.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);
      
      const [product] = await db.insert(products).values({
        name: old.name,
        slug,
        description: old.description,
        price: old.price.toString(),
        categoryId: categoryMap[old.category],
        materialId: materialMap[old.material],
        stock: old.stock,
        isFeatured: old.isFeatured,
      }).returning();
      
      if (old.image) {
        await db.insert(productImages).values({
          productId: product.id,
          url: old.image,
          isPrimary: true,
          order: 1
        });
      }
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
  
  process.exit(0);
}

seed();
