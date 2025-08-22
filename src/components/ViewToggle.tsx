import { List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'list' | 'kanban';
  onViewChange: (view: 'list' | 'kanban') => void;
  className?: string;
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex border rounded-lg p-1 bg-muted/30", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange('list')}
        className={cn(
          "h-8 px-3",
          view === 'list' && "bg-background shadow-sm"
        )}
      >
        <List className="h-4 w-4 mr-2" />
        Lista
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange('kanban')}
        className={cn(
          "h-8 px-3",
          view === 'kanban' && "bg-background shadow-sm"
        )}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Kanban
      </Button>
    </div>
  );
}