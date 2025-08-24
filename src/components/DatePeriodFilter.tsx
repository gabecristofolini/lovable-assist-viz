import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePeriodFilterProps {
  onPeriodChange: (period: string, startDate?: string, endDate?: string) => void;
  className?: string;
}

export function DatePeriodFilter({ onPeriodChange, className }: DatePeriodFilterProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const periodOptions = [
    { key: 'today', label: 'Hoje' },
    { key: 'yesterday', label: 'Ontem' },
    { key: 'week', label: 'Esta Semana' },
    { key: 'last-week', label: 'Semana Passada' },
    { key: 'month', label: 'Este Mês' },
    { key: 'last-month', label: 'Mês Passado' },
    { key: 'quarter', label: 'Este Trimestre' },
    { key: 'year', label: 'Este Ano' },
    { key: 'custom', label: 'Período Personalizado' }
  ];

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    if (period !== 'custom') {
      onPeriodChange(period);
      setIsOpen(false);
    }
  };

  const handleCustomPeriod = () => {
    if (customStart && customEnd) {
      onPeriodChange('custom', customStart, customEnd);
      setIsOpen(false);
    }
  };

  const getCurrentLabel = () => {
    if (selectedPeriod === 'custom' && customStart && customEnd) {
      return `${customStart} - ${customEnd}`;
    }
    return periodOptions.find(p => p.key === selectedPeriod)?.label || 'Hoje';
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-52 justify-between", className)}
        >
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {getCurrentLabel()}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-2">
          <h4 className="font-medium text-sm mb-3">Selecionar Período</h4>
          
          {/* Filtros rápidos */}
          <div className="grid grid-cols-2 gap-2">
            {periodOptions.slice(0, -1).map((option) => (
              <Button
                key={option.key}
                variant={selectedPeriod === option.key ? "default" : "ghost"}
                size="sm"
                className="justify-start text-xs"
                onClick={() => handlePeriodSelect(option.key)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* Período personalizado */}
          <div className="border-t pt-3 mt-3">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedPeriod === 'custom' ? "default" : "ghost"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedPeriod('custom')}
                >
                  {periodOptions[periodOptions.length - 1].label}
                </Button>
              </div>
              
              {selectedPeriod === 'custom' && (
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Data Inicial</label>
                    <Input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Data Final</label>
                    <Input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleCustomPeriod}
                    disabled={!customStart || !customEnd}
                    className="w-full text-xs"
                  >
                    Aplicar Período
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}