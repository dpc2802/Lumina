"use client";

import { useState } from "react";

export default function DashboardChart({ recentOrders }: { recentOrders: any[] }) {
  const [range, setRange] = useState<number>(7);
  const isMonth = range === 30;

  // Process Daily Chart Data
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  
  const chartRangeData = Array.from({ length: range }).map((_, i) => {
    const d = new Date(todayUTC);
    d.setUTCDate(todayUTC.getUTCDate() - ((range - 1) - i));
    return {
      dateString: d.toISOString().split('T')[0],
      label: isMonth ? d.getUTCDate().toString() : daysOfWeek[d.getUTCDay()],
      total: 0
    };
  });
  
  recentOrders.forEach((order: any) => {
    const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
    const dayData = chartRangeData.find(d => d.dateString === orderDate);
    if (dayData) {
      dayData.total += order.totalAmount;
    }
  });

  const maxDailyRevenue = Math.max(...chartRangeData.map(d => d.total));
  const chartData = chartRangeData.map(d => ({
    label: d.label,
    height: maxDailyRevenue > 0 ? Math.round((d.total / maxDailyRevenue) * 100) : 0,
    amount: d.total
  }));

  return (
    <div className="lg:col-span-2 bg-white p-8 border border-charcoal/10 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-serif text-xl text-charcoal">Ingresos Diarios</h3>
        <select 
          value={range}
          onChange={(e) => setRange(parseInt(e.target.value, 10))}
          className="text-xs border border-charcoal/20 bg-transparent py-1 px-2 text-charcoal outline-none cursor-pointer"
        >
          <option value="7">Últimos 7 días</option>
          <option value="30">Este mes (30 días)</option>
        </select>
      </div>
      
      <div className={`flex-1 flex items-end h-64 mt-auto transition-all duration-700 ease-in-out ${isMonth ? 'gap-0.5 md:gap-1' : 'gap-2 md:gap-4'}`}>
        {/* Dynamic Chart Bars */}
        {chartData.map((data, i) => (
          <div key={i} className="flex-1 h-full flex flex-col justify-end group relative animate-in fade-in zoom-in duration-500">
            
            {/* Tooltip on hover */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              ${data.amount.toLocaleString()}
            </div>

            <div 
              className={`w-full transition-all duration-1000 ease-out rounded-t-sm ${data.height === 100 ? 'bg-rg' : 'bg-[#111] group-hover:bg-charcoal/80'}`}
              style={{ height: `${Math.max(data.height, 2)}%` }}
            ></div>
            <div className={`text-center mt-3 text-[10px] transition-colors duration-500 ${data.height === 100 ? 'text-rg font-bold' : 'text-charcoal/50'}`}>
              {data.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
