import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  intent?: 'default' | 'info' | 'warning' | 'danger';
}

export function MetricCard({ title, value, icon: Icon, trend, intent = 'default' }: MetricCardProps) {
  
  const intentStyles = {
    default: "bg-card text-card-foreground",
    info: "bg-info-bg text-info border-info",
    warning: "bg-warning-bg text-warning border-warning",
    danger: "bg-danger-bg text-danger border-danger",
  };

  return (
    <div className={cn("brutalist-card p-6 flex flex-col justify-between gap-4", intentStyles[intent])}>
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{title}</h3>
        <div className="p-2 border-2 border-foreground bg-background rounded-sm">
          <Icon className="w-5 h-5 text-foreground" strokeWidth={2.5} />
        </div>
      </div>
      
      <div>
        <div className="text-5xl font-black font-heading tracking-tighter">{value}</div>
        {trend && (
          <div className="mt-2 text-xs font-bold font-mono bg-background border-2 border-foreground px-2 py-1 inline-block">
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
