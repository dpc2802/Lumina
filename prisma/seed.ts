import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialProducts = [
  {
    name: 'Anillo Solitario Eternité',
    category: 'Anillos',
    material: 'Oro Blanco de 18 Quilates y Diamante',
    price: 4500,
    description: 'Un símbolo atemporal de elegancia. El solitario Eternité destaca por su diamante central de corte brillante, engarzado meticulosamente en oro blanco puro para maximizar el reflejo de luz. Su diseño minimalista permite que la piedra preciosa sea la absoluta protagonista, ideal para compromisos que trascienden el tiempo.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f66126e28?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    stock: 3
  },
  {
    name: 'Collar Gota de Zafiro',
    category: 'Collares',
    material: 'Platino y Zafiro Azul',
    price: 12000,
    description: 'La máxima expresión del lujo misterioso. Este collar sostiene un zafiro azul profundo en forma de gota, rodeado por un delicado halo de microdiamantes. La cadena de platino asegura durabilidad extrema manteniendo un brillo platinado eterno. Una pieza majestuosa para galas y eventos de élite.',
    image: 'https://images.unsplash.com/photo-1599643478514-4a820c56550e?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    stock: 1
  },
  {
    name: 'Pulsera Tenis de Diamantes',
    category: 'Brazaletes',
    material: 'Oro Blanco de 18 Quilates',
    price: 8200,
    description: 'La clásica pulsera tenis, reinventada por Lumina. Con una línea ininterrumpida de diamantes perfectamente calibrados, esta pieza ofrece una flexibilidad extraordinaria que se adapta a la muñeca como una segunda piel. Un resplandor continuo que eleva cualquier atuendo nocturno.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    stock: 0
  },
  {
    name: 'Aretes Perla del Sur',
    category: 'Aretes',
    material: 'Oro Amarillo de 14 Quilates',
    price: 3100,
    description: 'Elegancia clásica con un toque orgánico. Seleccionadas a mano en los mares del sur, estas perlas excepcionales flotan bajo un discreto engaste de oro amarillo. Su lustre natural aporta luz al rostro, convirtiéndolos en la elección predilecta para la mujer sofisticada de hoy.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    isFeatured: true,
    stock: 5
  },
  {
    name: 'Anillo Sello Herencia',
    category: 'Anillos',
    material: 'Oro Amarillo de 18 Quilates',
    price: 5400,
    description: 'Forjado para perdurar generaciones. El anillo sello Herencia presenta una superficie plana y pulida de oro macizo, lista para ser grabada con iniciales o blasones familiares. Su peso y solidez reflejan autoridad y un gusto impecable por las tradiciones de la alta joyería.',
    image: 'https://images.unsplash.com/photo-1620656798579-1984d9e87df5?q=80&w=800&auto=format&fit=crop',
    isFeatured: false,
    stock: 2
  },
  {
    name: 'Cadena Eslabón Cubano',
    category: 'Collares',
    material: 'Oro Amarillo de 18 Quilates',
    price: 7800,
    description: 'Una declaración de poder. Esta gruesa cadena de eslabones cubanos ha sido pulida eslabón por eslabón a mano, logrando un acabado espejo que atrapa la mirada. Su peso sustancial y cierre de seguridad oculto la convierten en la pieza insignia del lujo urbano contemporáneo.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    isFeatured: false,
    stock: 4
  }
];

async function main() {
  console.log('Seeding database with products...')
  
  for (const product of initialProducts) {
    const created = await prisma.product.create({
      data: product
    })
    console.log(`Created product: ${created.name}`)
  }
  
  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
