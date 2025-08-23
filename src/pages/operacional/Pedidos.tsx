import { useState } from 'react';
import { Search, Filter, Plus, Upload, Package, Clock, DollarSign, TrendingUp, AlertCircle, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { PipelineStage } from '@/components/PipelineStage';
import { ViewToggle } from '@/components/ViewToggle';
import { DataTable } from '@/components/DataTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data para pedidos
const mockPedidos = [
  {
    id: 1,
    numero: "PED-2024-001",
    cliente: "Maria Santos",
    empresa: "Tech Solutions Ltda",
    valor: 15420.50,
    status: "confirmado",
    dataEmissao: "15/01/2024",
    dataPrevista: "22/01/2024",
    itens: 25,
    responsavel: "Ana Silva"
  },
  {
    id: 2,
    numero: "PED-2024-002",
    cliente: "Carlos Mendes",
    empresa: "Marketing Digital SA",
    valor: 8750.00,
    status: "producao",
    dataEmissao: "14/01/2024",
    dataPrevista: "28/01/2024",
    itens: 12,
    responsavel: "João Santos"
  },
  {
    id: 3,
    numero: "PED-2024-003",
    cliente: "Ana Costa",
    empresa: "Indústria ABC",
    valor: 32100.75,
    status: "enviado",
    dataEmissao: "12/01/2024",
    dataPrevista: "19/01/2024",
    itens: 45,
    responsavel: "Pedro Silva"
  },
  {
    id: 4,
    numero: "PED-2024-004",
    cliente: "Roberto Lima",
    empresa: "Consultoria Beta",
    valor: 6890.25,
    status: "entregue",
    dataEmissao: "10/01/2024",
    dataPrevista: "17/01/2024",
    itens: 8,
    responsavel: "Maria Silva"
  },
  {
    id: 5,
    numero: "PED-2024-005",
    cliente: "Julia Oliveira",
    empresa: "Design Studio",
    valor: 12350.00,
    status: "cancelado",
    dataEmissao: "08/01/2024",
    dataPrevista: "15/01/2024",
    itens: 18,
    responsavel: "Ana Silva"
  }
];

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const filteredPedidos = mockPedidos.filter(pedido => {
    const matchesSearch = pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pedido.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmado': return '📋';
      case 'producao': return '⚙️';
      case 'enviado': return '🚚';
      case 'entregue': return '✅';
      case 'cancelado': return '❌';
      default: return '📦';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-blue-100 text-blue-700';
      case 'producao': return 'bg-orange-100 text-orange-700';
      case 'enviado': return 'bg-purple-100 text-purple-700';
      case 'entregue': return 'bg-green-100 text-green-700';
      case 'cancelado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'producao': return 'Em Produção';
      case 'enviado': return 'Enviado';
      case 'entregue': return 'Entregue';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const handleView = (pedido: any) => {
    console.log('Visualizando pedido:', pedido);
  };

  const handleEdit = (pedido: any) => {
    console.log('Editando pedido:', pedido);
  };

  const handleDelete = (pedido: any) => {
    console.log('Excluindo pedido:', pedido);
  };

  const columns = [
    {
      key: 'numero',
      label: 'Número',
      sortable: true,
    },
    {
      key: 'cliente',
      label: 'Cliente',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.empresa}</div>
        </div>
      ),
    },
    {
      key: 'valor',
      label: 'Valor',
      sortable: true,
      render: (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge 
          variant="outline"
          className={`${getStatusColor(value)} border-none`}
        >
          {getStatusIcon(value)} {getStatusLabel(value)}
        </Badge>
      ),
    },
    {
      key: 'dataEmissao',
      label: 'Data Emissão',
      sortable: true,
    },
    {
      key: 'dataPrevista',
      label: 'Entrega Prevista',
      sortable: true,
    },
    {
      key: 'itens',
      label: 'Itens',
      sortable: true,
    },
    {
      key: 'responsavel',
      label: 'Responsável',
      sortable: true,
    },
  ];

  // Estatísticas dos pedidos
  const pedidosStats = [
    {
      title: 'Confirmados',
      value: '12',
      change: { value: 8, type: 'up' as const },
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Em Produção',
      value: '18',
      change: { value: 15, type: 'up' as const },
      icon: Package,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Enviados',
      value: '6',
      change: { value: 2, type: 'up' as const },
      icon: Truck,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Entregues',
      value: '45',
      change: { value: 22, type: 'up' as const },
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 15.2K',
      change: { value: 5, type: 'up' as const },
      icon: DollarSign,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Tempo Médio Produção',
      value: '7 dias',
      change: { value: -10, type: 'down' as const },
      icon: Clock,
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  // Organizar pedidos por estágio para o kanban
  const stages = {
    confirmado: filteredPedidos.filter(p => p.status === 'confirmado'),
    producao: filteredPedidos.filter(p => p.status === 'producao'),
    enviado: filteredPedidos.filter(p => p.status === 'enviado'),
    entregue: filteredPedidos.filter(p => p.status === 'entregue'),
    cancelado: filteredPedidos.filter(p => p.status === 'cancelado'),
  };

  const stageConfig = [
    {
      id: 'confirmado',
      title: 'Confirmados',
      items: stages.confirmado.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente} - ${pedido.empresa}`,
        value: `R$ ${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        temperature: 'quente',
        daysInStage: 1,
        nextAction: 'Iniciar produção',
        avatar: '',
        tags: ['Confirmado'],
        priority: 'alta' as const
      })),
      color: 'bg-blue-100',
      count: stages.confirmado.length
    },
    {
      id: 'producao',
      title: 'Em Produção',
      items: stages.producao.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente} - ${pedido.empresa}`,
        value: `R$ ${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        temperature: 'quente',
        daysInStage: 3,
        nextAction: 'Acompanhar produção',
        avatar: '',
        tags: ['Produção'],
        priority: 'urgente' as const
      })),
      color: 'bg-orange-100',
      count: stages.producao.length
    },
    {
      id: 'enviado',
      title: 'Enviados',
      items: stages.enviado.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente} - ${pedido.empresa}`,
        value: `R$ ${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        temperature: 'morno',
        daysInStage: 2,
        nextAction: 'Acompanhar entrega',
        avatar: '',
        tags: ['Enviado'],
        priority: 'normal' as const
      })),
      color: 'bg-purple-100',
      count: stages.enviado.length
    },
    {
      id: 'entregue',
      title: 'Entregues',
      items: stages.entregue.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente} - ${pedido.empresa}`,
        value: `R$ ${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        temperature: 'frio',
        daysInStage: 0,
        nextAction: 'Concluído',
        avatar: '',
        tags: ['Entregue'],
        priority: 'baixa' as const
      })),
      color: 'bg-green-100',
      count: stages.entregue.length
    },
    {
      id: 'cancelado',
      title: 'Cancelados',
      items: stages.cancelado.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente} - ${pedido.empresa}`,
        value: `R$ ${pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        temperature: 'frio',
        daysInStage: 5,
        nextAction: 'Analisar motivo',
        avatar: '',
        tags: ['Cancelado'],
        priority: 'baixa' as const
      })),
      color: 'bg-red-100',
      count: stages.cancelado.length
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground">
            {filteredPedidos.length} pedidos encontrados
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ViewToggle view={view} onViewChange={setView} />
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={pedidosStats} columns={6} />

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="confirmado">Confirmado</SelectItem>
            <SelectItem value="producao">Em Produção</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="entregue">Entregue</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content - Lista ou Kanban */}
      {view === 'list' ? (
        <DataTable
          data={filteredPedidos}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRowClick={handleView}
        />
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stageConfig.map((stage) => (
            <PipelineStage
              key={stage.id}
              title={stage.title}
              count={stage.count}
              items={stage.items}
              color={stage.color}
              onAddItem={() => console.log(`Adicionar pedido em ${stage.title}`)}
              onItemClick={(item) => {
                const pedido = filteredPedidos.find(p => p.id === item.id);
                if (pedido) handleView(pedido);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}