import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon: LucideIcon;
  color?: 'emerald' | 'blue' | 'indigo' | 'amber' | 'purple';
}

export function MetricCard({
  title,
  value,
  change,
  trend = 'neutral',
  description,
  icon: Icon,
  color = 'indigo',
}: MetricCardProps) {
  const colorMap = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>

        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${
              trend === 'up'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : trend === 'down'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
            {change}
          </span>
        )}
      </div>

      {description && <p className="mt-2 text-xs text-slate-400">{description}</p>}
    </div>
  );
}
