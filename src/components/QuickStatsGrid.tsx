import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStat {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'up' | 'down';
  };
  icon: LucideIcon;
  color?: string;
}

interface QuickStatsGridProps {
  stats: QuickStat[];
  columns?: number;
  className?: string;
}

export function QuickStatsGrid({ stats, columns = 4, className }: QuickStatsGridProps) {
  const gridCols = {
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-6',
    8: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8'
  };

  return (
    <div className={cn(`grid gap-4 ${gridCols[columns as keyof typeof gridCols]}`, className)}>
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <span className={cn(
                      "flex items-center text-xs font-medium",
                      stat.change.type === 'up' ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.change.type === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {stat.change.value > 0 ? '+' : ''}{stat.change.value}%
                    </span>
                  )}
                </div>
              </div>
              <div className={cn(
                "p-2 rounded-lg",
                stat.color || "bg-primary/10"
              )}>
                <stat.icon className={cn(
                  "h-4 w-4",
                  stat.color ? "text-current" : "text-primary"
                )} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}