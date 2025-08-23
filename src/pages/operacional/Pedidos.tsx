import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, Plus, Package, DollarSign, TrendingUp, Clock, CheckCircle, AlertTriangle, Truck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ViewToggle';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { PipelineStage } from '@/components/PipelineStage';
import { mockData, getStatusColor, getStatusLabel } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const navigate = useNavigate();

  const { pedidos } = mockData;

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pedido.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'numero',
      label: 'Número',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.cliente}</div>
        </div>
      ),
    },
    {
      key: 'cliente',
      label: 'Cliente',
    },
    {
      key: 'data',
      label: 'Data',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {getStatusLabel(value)}
        </Badge>
      ),
    },
    {
      key: 'valor',
      label: 'Valor',
      render: (value: number) => `R$ ${value.toLocaleString()}`,
    },
    {
      key: 'itens',
      label: 'Itens',
      render: (value: number) => `${value} ${value === 1 ? 'item' : 'itens'}`,
    },
  ];

  const handleView = (pedido: any) => {
    console.log('Visualizando pedido:', pedido);
  };

  const handleEdit = (pedido: any) => {
    console.log('Editando pedido:', pedido);
  };

  const handleDelete = (pedido: any) => {
    console.log('Excluindo pedido:', pedido);
  };

  // Estatísticas rápidas dos pedidos
  const pedidoStats = [
    {
      title: 'Rascunhos',
      value: '8',
      change: { value: 3, type: 'up' as const },
      icon: FileText,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      title: 'Confirmados',
      value: '15',
      change: { value: 5, type: 'up' as const },
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Processando',
      value: '12',
      change: { value: 2, type: 'up' as const },
      icon: Clock,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Enviados',
      value: '28',
      change: { value: 8, type: 'up' as const },
      icon: Truck,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Concluídos',
      value: '42',
      change: { value: 12, type: 'up' as const },
      icon: Package,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Atrasados',
      value: '6',
      change: { value: -2, type: 'down' as const },
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Faturamento',
      value: 'R$ 125k',
      change: { value: 15, type: 'up' as const },
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 1.8k',
      change: { value: 8, type: 'up' as const },
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  // Organizar pedidos por estágio para o kanban
  const stages = {
    rascunhos: filteredPedidos.filter(p => p.status === 'rascunho'),
    confirmados: filteredPedidos.filter(p => p.status === 'confirmado'),
    processando: filteredPedidos.filter(p => p.status === 'processando'),
    enviados: filteredPedidos.filter(p => p.status === 'enviado'),
    concluidos: filteredPedidos.filter(p => p.status === 'concluido'),
  };

  const stageConfig = [
    {
      id: 'rascunhos',
      title: 'Rascunhos',
      items: stages.rascunhos.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente}`,
        value: `R$ ${pedido.valor.toLocaleString()}`,
        temperature: 'morno',
        daysInStage: Math.floor(Math.random() * 7) + 1,
        nextAction: 'Aguardando aprovação',
        avatar: '',
        tags: [`${pedido.itens} itens`, 'Pendente'],
        priority: 'normal' as const
      })),
      color: 'bg-gray-100',
      count: stages.rascunhos.length
    },
    {
      id: 'confirmados',
      title: 'Confirmados',
      items: stages.confirmados.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente}`,
        value: `R$ ${pedido.valor.toLocaleString()}`,
        temperature: 'quente',
        daysInStage: Math.floor(Math.random() * 3) + 1,
        nextAction: 'Iniciar produção',
        avatar: '',
        tags: [`${pedido.itens} itens`, 'Confirmado'],
        priority: 'alta' as const
      })),
      color: 'bg-blue-100',
      count: stages.confirmados.length
    },
    {
      id: 'processando',
      title: 'Processando',
      items: stages.processando.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente}`,
        value: `R$ ${pedido.valor.toLocaleString()}`,
        temperature: 'quente',
        daysInStage: Math.floor(Math.random() * 5) + 1,
        nextAction: 'Em produção',
        avatar: '',
        tags: [`${pedido.itens} itens`, 'Produzindo'],
        priority: 'urgente' as const
      })),
      color: 'bg-orange-100',
      count: stages.processando.length
    },
    {
      id: 'enviados',
      title: 'Enviados',
      items: stages.enviados.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente}`,
        value: `R$ ${pedido.valor.toLocaleString()}`,
        temperature: 'quente',
        daysInStage: Math.floor(Math.random() * 7) + 1,
        nextAction: 'Aguardando entrega',
        avatar: '',
        tags: [`${pedido.itens} itens`, 'Enviado'],
        priority: 'normal' as const
      })),
      color: 'bg-purple-100',
      count: stages.enviados.length
    },
    {
      id: 'concluidos',
      title: 'Concluídos',
      items: stages.concluidos.map(pedido => ({
        id: pedido.id,
        title: `${pedido.numero}`,
        subtitle: `${pedido.cliente}`,
        value: `R$ ${pedido.valor.toLocaleString()}`,
        temperature: 'frio',
        daysInStage: Math.floor(Math.random() * 30) + 1,
        nextAction: 'Finalizado',
        avatar: '',
        tags: [`${pedido.itens} itens`, 'Entregue'],
        priority: 'baixa' as const
      })),
      color: 'bg-green-100',
      count: stages.concluidos.length
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
            Importar CSV
          </Button>
          <Button onClick={() => navigate('/pedidos/novo')}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={pedidoStats} columns={8} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número ou cliente..."
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
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="confirmado">Confirmado</SelectItem>
            <SelectItem value="processando">Processando</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
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