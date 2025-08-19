import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface PipelineItem {
  id: string | number;
  title: string;
  subtitle?: string;
  value?: string;
  tags?: string[];
  priority?: 'urgente' | 'alta' | 'normal' | 'baixa';
  avatar?: string;
  daysInStage?: number;
}

interface PipelineStageProps {
  title: string;
  count: number;
  items: PipelineItem[];
  color?: string;
  onAddItem?: () => void;
  onItemClick?: (item: PipelineItem) => void;
  className?: string;
}

export function PipelineStage({ 
  title, 
  count, 
  items, 
  color = 'bg-gray-100', 
  onAddItem,
  onItemClick,
  className 
}: PipelineStageProps) {
  return (
    <div className={cn("flex flex-col h-full min-w-80", className)}>
      {/* Header */}
      <div className={cn("p-4 rounded-t-lg border-b", color)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <Badge variant="secondary" className="bg-background">
            {count}
          </Badge>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 p-2 space-y-3 overflow-y-auto bg-muted/30 min-h-96">
        {items.map((item) => (
          <Card 
            key={item.id}
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            onClick={() => onItemClick?.(item)}
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm text-foreground line-clamp-2">
                    {item.title}
                  </h4>
                  {item.priority && (
                    <Badge 
                      className={cn(
                        "text-xs",
                        item.priority === 'urgente' && "bg-red-100 text-red-800 animate-pulse",
                        item.priority === 'alta' && "bg-orange-100 text-orange-800",
                        item.priority === 'normal' && "bg-blue-100 text-blue-800",
                        item.priority === 'baixa' && "bg-gray-100 text-gray-800"
                      )}
                    >
                      {item.priority}
                    </Badge>
                  )}
                </div>
                
                {item.subtitle && (
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {item.subtitle}
                  </p>
                )}
                
                {item.value && (
                  <p className="text-sm font-semibold text-primary">
                    {item.value}
                  </p>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {item.daysInStage && (
                  <div className="text-xs text-muted-foreground">
                    {item.daysInStage} {item.daysInStage === 1 ? 'dia' : 'dias'} no funil
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Button */}
        {onAddItem && (
          <Card 
            className="border-dashed border-2 hover:border-primary cursor-pointer transition-colors"
            onClick={onAddItem}
          >
            <CardContent className="p-4 flex items-center justify-center">
              <div className="text-center text-muted-foreground hover:text-primary transition-colors">
                <Plus className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">Adicionar</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}