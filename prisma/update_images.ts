import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const products = await prisma.product.findMany();
  
  for (const p of products) {
    if (p.name.includes('Eternité')) {
      await prisma.product.update({
        where: { id: p.id },
        data: { image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=800&auto=format&fit=crop' }
      });
      console.log('Updated Eternité image');
    }
    if (p.name.includes('Gota de Zafiro')) {
      await prisma.product.update({
        where: { id: p.id },
        data: { image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop' }
      });
      console.log('Updated Zafiro image');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
