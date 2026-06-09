import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function GET() {
  try {
    // 1. Fetch data
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const customers = await prisma.customer.findMany({
      orderBy: { spent: 'desc' }
    });

    // 2. Format Data for Excel
    const ordersData = orders.map(o => {
      const itemsString = o.items.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
      
      return {
        'ID Orden': o.orderNumber,
        'Fecha (UTC)': new Date(o.createdAt).toLocaleString('es-MX'),
        'Cliente': o.customer?.name || 'Cliente Eliminado',
        'Email': o.customer?.email || 'N/A',
        'Teléfono': o.customer?.phone || 'N/A',
        'Estado': o.status,
        'Monto Total ($)': o.totalAmount,
        'Artículos': itemsString
      };
    });

    const customersData = customers.map(c => {
      let tier = "Oro";
      if (c.spent >= 50000) tier = "Black";
      else if (c.spent >= 25000) tier = "Diamante";
      else if (c.spent >= 10000) tier = "Platino";

      return {
        'Nombre': c.name,
        'Email': c.email,
        'Teléfono': c.phone,
        'Total Gastado ($)': c.spent,
        'Nivel VIP': tier,
        'Fecha de Registro': new Date(c.createdAt).toLocaleString('es-MX')
      };
    });

    // 3. Create Workbook and Worksheets
    const wb = XLSX.utils.book_new();
    
    const wsOrders = XLSX.utils.json_to_sheet(ordersData);
    const wsCustomers = XLSX.utils.json_to_sheet(customersData);

    // Ajustar anchos de columna (Básico)
    const wscolsOrders = [
      {wch: 15}, {wch: 20}, {wch: 25}, {wch: 25}, {wch: 15}, {wch: 15}, {wch: 15}, {wch: 50}
    ];
    wsOrders['!cols'] = wscolsOrders;
    
    const wscolsCustomers = [
      {wch: 25}, {wch: 25}, {wch: 15}, {wch: 15}, {wch: 15}, {wch: 20}
    ];
    wsCustomers['!cols'] = wscolsCustomers;

    XLSX.utils.book_append_sheet(wb, wsOrders, "Órdenes y Ventas");
    XLSX.utils.book_append_sheet(wb, wsCustomers, "Base de Clientes");

    // 4. Generate Uint8Array (Standard Web API format, prevents Next.js corruption)
    const arrayBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

    // 5. Return as a downloadable file
    const filename = `Reporte_Lumina_${new Date().toISOString().split('T')[0]}.xlsx`;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('Error generando el reporte Excel:', error);
    return NextResponse.json({ error: 'Error generando el reporte' }, { status: 500 });
  }
}
