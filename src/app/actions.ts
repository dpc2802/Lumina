"use server";

import { prisma } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: 'asc' }
  });
}

export async function createOrder(cartItems: any[], customerInfo: any, totalAmount: number) {
  // Try to find customer by email
  let customer = await prisma.customer.findUnique({
    where: { email: customerInfo.email }
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: customerInfo.name || "Cliente",
        email: customerInfo.email,
        phone: customerInfo.phone || "",
      }
    });
  }

  const orderNumber = `LUM-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const order = await prisma.order.create({
    data: {
      orderNumber,
      totalAmount,
      customerId: customer.id,
      items: {
        create: cartItems.map(item => ({
          quantity: item.quantity || 1,
          priceAtPurchase: item.price,
          productId: item.id
        }))
      }
    }
  });

  // Update customer spent amount
  await prisma.customer.update({
    where: { id: customer.id },
    data: { spent: { increment: totalAmount } }
  });

  // Descontar inventario
  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.quantity || 1 } }
    });
  }

  return { success: true, orderNumber };
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const material = formData.get('material') as string;
  const price = parseInt(formData.get('price') as string, 10);
  const description = formData.get('description') as string;
  const stock = parseInt(formData.get('stock') as string, 10);
  const isFeatured = formData.get('isFeatured') === 'on';

  const imageFile = formData.get('image') as File;
  let imagePath = '';

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);
    imagePath = `/uploads/${fileName}`;
  }

  const product = await prisma.product.create({
    data: {
      name, category, material, price, description,
      image: imagePath,
      stock, isFeatured
    }
  });

  revalidatePath('/admin/inventario');
  revalidatePath('/coleccion');
  revalidatePath('/');
  return { success: true, product };
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/inventario');
  revalidatePath('/coleccion');
  revalidatePath('/');
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const material = formData.get('material') as string;
  const price = parseInt(formData.get('price') as string, 10);
  const description = formData.get('description') as string;
  const stock = parseInt(formData.get('stock') as string, 10);
  const isFeatured = formData.get('isFeatured') === 'on';

  const imageFile = formData.get('image') as File;
  
  let updateData: any = {
    name, category, material, price, description, stock, isFeatured
  };

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });
    
    const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);
    updateData.image = `/uploads/${fileName}`;
  }

  await prisma.product.update({
    where: { id },
    data: updateData
  });

  revalidatePath('/admin/inventario');
  revalidatePath('/coleccion');
  revalidatePath('/');
  return { success: true };
}

export async function updateOrderStatus(id: string, status: string) {
  const currentOrder = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });

  if (!currentOrder) return { success: false };

  // Si se está cancelando y antes no estaba cancelada, devolvemos el stock e ingresos
  if (status === "Cancelado" && currentOrder.status !== "Cancelado") {
    for (const item of currentOrder.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } }
      });
    }
    await prisma.customer.update({
      where: { id: currentOrder.customerId },
      data: { spent: { decrement: currentOrder.totalAmount } }
    });
  }

  // Si se está "des-cancelando" (volviendo a Procesando/Enviado), volvemos a restar
  if (status !== "Cancelado" && currentOrder.status === "Cancelado") {
    for (const item of currentOrder.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }
    await prisma.customer.update({
      where: { id: currentOrder.customerId },
      data: { spent: { increment: currentOrder.totalAmount } }
    });
  }

  await prisma.order.update({
    where: { id },
    data: { status }
  });

  revalidatePath('/admin/ordenes');
  revalidatePath('/admin/inventario');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });

  if (order && order.status !== "Cancelado") {
    // Restaurar stock y restar al cliente antes de eliminar si no estaba cancelada
    for (const item of order.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } }
      });
    }
    await prisma.customer.update({
      where: { id: order.customerId },
      data: { spent: { decrement: order.totalAmount } }
    });
  }

  await prisma.order.delete({ where: { id } });
  revalidatePath('/admin/ordenes');
  revalidatePath('/admin/inventario');
  revalidatePath('/admin'); // Actualizar estadísticas principales
  return { success: true };
}

export async function deleteCustomer(id: string) {
  // Primero eliminar órdenes relacionadas para evitar error de llave foránea en SQLite
  await prisma.order.deleteMany({ where: { customerId: id } });
  
  await prisma.customer.delete({ where: { id } });
  revalidatePath('/admin/clientes');
  revalidatePath('/admin'); // Actualizar estadísticas si es necesario
  return { success: true };
}

export async function getStoreSettings() {
  let settings = await prisma.storeSettings.findUnique({
    where: { id: 'singleton' }
  });
  
  if (!settings) {
    settings = await prisma.storeSettings.create({
      data: { id: 'singleton' }
    });
  }
  
  return settings;
}

export async function updateStoreSettings(data: any) {
  const settings = await prisma.storeSettings.update({
    where: { id: 'singleton' },
    data
  });
  revalidatePath('/admin/configuracion');
  revalidatePath('/checkout');
  return { success: true, settings };
}

// AUTHENTICATION ACTIONS
export async function loginAdmin(password: string) {
  // In a real production app, this should be in an environment variable
  const MASTER_PASSWORD = process.env.ADMIN_PASSWORD || "Lumina2026";
  
  if (password === MASTER_PASSWORD) {
    (await cookies()).set('lumina_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return { success: true };
  } else {
    return { success: false, error: 'Contraseña incorrecta' };
  }
}

export async function logoutAdmin() {
  (await cookies()).delete('lumina_admin_session');
  return { success: true };
}
