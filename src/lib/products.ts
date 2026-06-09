export interface Product {
  id: number;
  name: string;
  material: string;
  price: number;
  category: string;
  badge: string;
  image: string;
  description: string;
  details: string[];
}

export const initialProducts: Product[] = [
  { 
    id: 1, 
    name: '14k Gold Mariner Chain', 
    material: '14k Yellow Gold', 
    price: 1500, 
    category: 'Cadenas', 
    badge: 'Nuevo', 
    image: '/chain.png',
    description: 'Una reinterpretación magistral del clásico eslabón marinero. Forjada a mano para lograr un peso perfecto que descansa impecablemente sobre el cuello, reflejando la luz con cada movimiento fluido.',
    details: ['Oro sólido de 14 quilates', 'Largo: 45 cm', 'Cierre de langosta reforzado', 'Hecho a mano en Italia']
  },
  { 
    id: 2, 
    name: 'Men\'s Curb Bracelet', 
    material: '18k Yellow Gold', 
    price: 2100, 
    category: 'Brazaletes', 
    badge: '', 
    image: '/mens_bracelet.png',
    description: 'Estructura robusta y masculinidad refinada. Este brazalete de eslabones cubanos ha sido pulido meticulosamente para ofrecer un brillo sutil pero imponente. Una pieza de herencia garantizada.',
    details: ['Oro sólido de 18 quilates', 'Eslabón cubano de 6mm', 'Broche de cajón con seguro doble', 'Peso aprox: 22g']
  },
  { 
    id: 3, 
    name: 'Classic Rose Gold Hoops', 
    material: '18k Rose Gold', 
    price: 850, 
    category: 'Aretes', 
    badge: 'Bestseller', 
    image: '/hoops.png',
    description: 'La esencia de la elegancia diaria. Aros tubulares ligeros forjados en oro rosa que aportan una cálida luminosidad al rostro. Su diseño hueco asegura confort para uso prolongado.',
    details: ['Oro rosa de 18 quilates', 'Diámetro: 30mm', 'Cierre de palanca seguro', 'Acabado ultra-pulido']
  },
  { 
    id: 4, 
    name: 'Minimalist White Gold Band', 
    material: '14k White Gold', 
    price: 1200, 
    category: 'Anillos', 
    badge: '', 
    image: '/band.png',
    description: 'Menos es infinitamente más. Una argolla arquitectónica tallada en oro blanco puro, con bordes milimétricamente biselados que reflejan una modernidad absoluta.',
    details: ['Oro blanco de 14 quilates', 'Ancho de banda: 4mm', 'Perfil confort', 'Recubrimiento de rodio premium']
  },
  { 
    id: 5, 
    name: 'Diamond Tennis Bracelet', 
    material: '18k White Gold', 
    price: 4500, 
    category: 'Brazaletes', 
    badge: 'Exclusivo', 
    image: '/mens_bracelet.png', // Reusing image temporarily
    description: 'El epítome del lujo. Una línea ininterrumpida de diamantes de corte brillante engarzados en platino y oro blanco, articulada para fluir como seda sobre la muñeca.',
    details: ['Oro blanco de 18 quilates', 'Diamantes claridad VVS1', 'Total: 3.5 quilates', 'Broche oculto de alta seguridad']
  },
  { 
    id: 6, 
    name: 'Vintage Signet Ring', 
    material: '14k Yellow Gold', 
    price: 950, 
    category: 'Anillos', 
    badge: '', 
    image: '/band.png', // Reusing image
    description: 'Inspirado en la realeza europea del siglo XIX. Un anillo de sello robusto con una cara plana ideal para grabados personalizados, convirtiéndolo en el emblema de su linaje.',
    details: ['Oro amarillo de 14 quilates', 'Cara plana de 12x10mm', 'Construcción sólida interior', 'Grabado monograma opcional']
  },
  { 
    id: 7, 
    name: 'Cuban Link Chain 8mm', 
    material: '18k Yellow Gold', 
    price: 3200, 
    category: 'Cadenas', 
    badge: '', 
    image: '/chain.png', // Reusing image
    description: 'Poder y presencia. La cadena cubana en su forma más pura. Eslabones densamente empaquetados que se asientan perfectamente planos, creando un río de oro sólido.',
    details: ['Oro amarillo de 18 quilates', 'Grosor de eslabón: 8mm', 'Largo: 50 cm', 'Pulido espejo manual']
  },
  { 
    id: 8, 
    name: 'Pearl Drop Earrings', 
    material: '14k Rose Gold', 
    price: 650, 
    category: 'Aretes', 
    badge: '', 
    image: '/hoops.png', // Reusing image
    description: 'La pureza de los océanos del sur capturada en oro. Perlas esféricas inmaculadas suspendidas de un delicado tallo de oro rosa que oscilan con sutil gracia.',
    details: ['Oro rosa de 14 quilates', 'Perlas de los Mares del Sur', 'Clasificación AAA', 'Pasador de gancho francés']
  },
];
