"use client";

import { useSearchParams } from "next/navigation";

export default function DashboardChartFilter() {
  const searchParams = useSearchParams();
  const range = searchParams.get('range') || '7';

  return (
    <select 
      value={range}
      onChange={(e) => {
        window.location.href = `/admin?range=${e.target.value}`;
      }}
      className="text-xs border border-charcoal/20 bg-transparent py-1 px-2 text-charcoal outline-none cursor-pointer"
    >
      <option value="7">Últimos 7 días</option>
      <option value="30">Este mes (30 días)</option>
    </select>
  );
}
