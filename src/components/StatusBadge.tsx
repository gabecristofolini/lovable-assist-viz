import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      // Leads
      novo: { label: 'Novo', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      qualificado: { label: 'Qualificado', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      qualificando: { label: 'Qualificando', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      negociacao: { label: 'Negociação', className: 'bg-orange-100 text-orange-800 hover:bg-orange-100' },
      convertido: { label: 'Convertido', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      perdido: { label: 'Perdido', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
      
      // Temperaturas
      quente: { label: '🔥 Quente', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
      morno: { label: '⚡ Morno', className: 'bg-orange-100 text-orange-800 hover:bg-orange-100' },
      frio: { label: '❄️ Frio', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      
      // Campanhas
      ativa: { label: 'Ativa', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      pausada: { label: 'Pausada', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      finalizada: { label: 'Finalizada', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
      
      // Pedidos
      rascunho: { label: 'Rascunho', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
      confirmado: { label: 'Confirmado', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      processando: { label: 'Processando', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      separando: { label: 'Separando', className: 'bg-orange-100 text-orange-800 hover:bg-orange-100' },
      faturado: { label: 'Faturado', className: 'bg-purple-100 text-purple-800 hover:bg-purple-100' },
      enviado: { label: 'Enviado', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      entregue: { label: 'Entregue', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      concluido: { label: 'Concluído', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      
      // Orçamentos
      elaboracao: { label: 'Elaboração', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
      orcamento_enviado: { label: 'Enviado', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      analise: { label: 'Em Análise', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      aprovado: { label: 'Aprovado', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      
      // Atendimento
      online: { label: 'Online', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      offline: { label: 'Offline', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
      aguardando: { label: 'Aguardando', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      resolvido: { label: 'Resolvido', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      
      // Performance/Prioridades
      urgente: { label: 'Urgente', className: 'bg-red-100 text-red-800 hover:bg-red-100 animate-pulse' },
      alta: { label: 'Alta', className: 'bg-orange-100 text-orange-800 hover:bg-orange-100' },
      normal: { label: 'Normal', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      baixa: { label: 'Baixa', className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' },
      
      // Sentimentos
      positivo: { label: '😊 Positivo', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      neutro: { label: '😐 Neutro', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
      negativo: { label: '😟 Negativo', className: 'bg-red-100 text-red-800 hover:bg-red-100' }
    };
    
    return configs[status as keyof typeof configs] || { 
      label: status, 
      className: 'bg-gray-100 text-gray-800 hover:bg-gray-100' 
    };
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}