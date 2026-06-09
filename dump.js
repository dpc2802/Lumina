const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  const customers = await prisma.customer.findMany();
  const orders = await prisma.order.findMany({ include: { items: true } });
  
  fs.writeFileSync('dump.json', JSON.stringify({ products, customers, orders }, null, 2));
  console.log('Data dumped to dump.json successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
