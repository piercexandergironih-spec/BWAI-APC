import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, description, icon, action, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center text-sm font-medium text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.label} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 opacity-50" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground transition-colors uppercase tracking-widest text-xs">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground uppercase tracking-widest text-xs">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Main Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-heading font-black tracking-tight mb-2 uppercase flex items-center gap-3">
            {icon && <span className="text-primary">{icon}</span>}
            {title}
          </h1>
          <p className="text-muted-foreground text-lg border-l-4 border-primary pl-4 max-w-2xl">
            {description}
          </p>
        </div>
        
        {/* Action Area (e.g. "Create New" Button) */}
        {action && (
          <div className="shrink-0 flex items-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
