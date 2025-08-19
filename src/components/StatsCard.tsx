import { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: ReactNode;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {change && (
                <span className={cn(
                  "text-sm font-medium",
                  changeType === 'positive' ? "text-success" : "text-destructive"
                )}>
                  {change}
                </span>
              )}
            </div>
          </div>
          <div className="ml-4 p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}