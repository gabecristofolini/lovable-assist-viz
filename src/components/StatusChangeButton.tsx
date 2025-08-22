import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MotivoModal } from '@/components/MotivoModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, AlertTriangle } from 'lucide-react';

interface StatusChangeButtonProps {
  currentStatus: string;
  itemTitle: string;
  tipo: 'lead' | 'atendimento';
  onStatusChange: (novoStatus: string, motivo?: string) => void;
}

export function StatusChangeButton({ currentStatus, itemTitle, tipo, onStatusChange }: StatusChangeButtonProps) {
  const [motivoModalOpen, setMotivoModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');

  const getStatusOptions = () => {
    if (tipo === 'lead') {
      return [
        { value: 'novo', label: 'Novo', color: 'bg-blue-100 text-blue-600' },
        { value: 'qualificado', label: 'Qualificado', color: 'bg-green-100 text-green-600' },
        { value: 'negociacao', label: 'Em Negociação', color: 'bg-orange-100 text-orange-600' },
        { value: 'fechado', label: 'Fechado', color: 'bg-green-200 text-green-700' },
        { value: 'frio', label: 'Frio', color: 'bg-cyan-100 text-cyan-600', requiresReason: true },
        { value: 'perdido', label: 'Perdido', color: 'bg-red-100 text-red-600', requiresReason: true },
      ];
    } else {
      return [
        { value: 'novo', label: 'Novo', color: 'bg-blue-100 text-blue-600' },
        { value: 'em_atendimento', label: 'Em Atendimento', color: 'bg-green-100 text-green-600' },
        { value: 'em_negociacao', label: 'Em Negociação', color: 'bg-orange-100 text-orange-600' },
        { value: 'aguardando_retorno', label: 'Aguardando Retorno', color: 'bg-yellow-100 text-yellow-600' },
        { value: 'aguardando_cliente', label: 'Aguardando Cliente', color: 'bg-purple-100 text-purple-600' },
        { value: 'finalizado', label: 'Finalizado', color: 'bg-gray-100 text-gray-600', requiresReason: true },
      ];
    }
  };

  const getCurrentStatusLabel = () => {
    const status = getStatusOptions().find(s => s.value === currentStatus);
    return status?.label || currentStatus;
  };

  const getCurrentStatusColor = () => {
    const status = getStatusOptions().find(s => s.value === currentStatus);
    return status?.color || 'bg-gray-100 text-gray-600';
  };

  const handleStatusClick = (novoStatus: string, requiresReason: boolean = false) => {
    if (novoStatus === currentStatus) return;

    if (requiresReason) {
      setPendingStatus(novoStatus);
      setMotivoModalOpen(true);
    } else {
      onStatusChange(novoStatus);
    }
  };

  const handleMotivoConfirm = (motivo: string) => {
    onStatusChange(pendingStatus, motivo);
    setPendingStatus('');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Badge className={getCurrentStatusColor()}>
              {getCurrentStatusLabel()}
            </Badge>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Alterar Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getStatusOptions().map((status) => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => handleStatusClick(status.value, status.requiresReason)}
              className={currentStatus === status.value ? 'bg-accent' : ''}
            >
              <div className="flex items-center justify-between w-full">
                <Badge className={status.color}>
                  {status.label}
                </Badge>
                {status.requiresReason && (
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <MotivoModal
        open={motivoModalOpen}
        onOpenChange={setMotivoModalOpen}
        titulo={itemTitle}
        tipo={tipo}
        novoStatus={pendingStatus}
        onConfirm={handleMotivoConfirm}
      />
    </>
  );
}