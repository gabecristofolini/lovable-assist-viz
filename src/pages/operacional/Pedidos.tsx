import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, Plus, Package, DollarSign, TrendingUp, Clock, CheckCircle, AlertTriangle, Truck, FileText, Calendar, X } from 'lucide-react';
import { DatePeriodFilter } from '@/components/DatePeriodFilter';
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
import { cn } from '@/lib/utils';

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [valueFilter, setValueFilter] = useState('all');
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const navigate = useNavigate();

  const { pedidos } = mockData;

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pedido.status === statusFilter;
    
    // Date filter
    const matchesDate = dateFilter === 'all' || (() => {
      const today = new Date();
      const pedidoDate = new Date(pedido.data.split('/').reverse().join('-'));
      switch (dateFilter) {
        case 'today':
          return pedidoDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return pedidoDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return pedidoDate >= monthAgo;
        default:
          return true;
      }
    })();
    
    // Value filter
    const matchesValue = valueFilter === 'all' || (() => {
      switch (valueFilter) {
        case 'low':
          return pedido.valor < 1000;
        case 'medium':
          return pedido.valor >= 1000 && pedido.valor < 5000;
        case 'high':
          return pedido.valor >= 5000;
        default:
          return true;
      }
    })();
    
    // Quick filters
    const matchesQuickFilters = quickFilters.length === 0 || quickFilters.every(filter => {
      switch (filter) {
        case 'urgent':
          return ['processando', 'enviado'].includes(pedido.status);
        case 'high-value':
          return pedido.valor >= 5000;
        case 'recent':
          const today = new Date();
          const pedidoDate = new Date(pedido.data.split('/').reverse().join('-'));
          const daysDiff = (today.getTime() - pedidoDate.getTime()) / (1000 * 3600 * 24);
          return daysDiff <= 7;
        case 'many-items':
          return pedido.itens >= 10;
        default:
          return true;
      }
    });
    
    return matchesSearch && matchesStatus && matchesDate && matchesValue && matchesQuickFilters;
  });

  const columns = [
    {
      key: 'numero',
      label: 'Número',
      sortable: true,
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
      sortable: true,
    },
    {
      key: 'data',
      label: 'Data',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {getStatusLabel(value)}
        </Badge>
      ),
    },
    {
      key: 'valor',
      label: 'Valor',
      sortable: true,
      render: (value: number) => `R$ ${value.toLocaleString()}`,
    },
    {
      key: 'itens',
      label: 'Itens',
      sortable: true,
      render: (value: number) => `${value} ${value === 1 ? 'item' : 'itens'}`,
    },
  ];

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    setValueFilter('all');
    setQuickFilters([]);
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || dateFilter !== 'all' || valueFilter !== 'all' || quickFilters.length > 0;

  const quickFilterOptions = [
    { key: 'urgent', label: 'Urgentes', icon: AlertTriangle, color: 'bg-red-100 text-red-700 hover:bg-red-200' },
    { key: 'high-value', label: 'Alto Valor', icon: DollarSign, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { key: 'recent', label: 'Recentes', icon: Clock, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { key: 'many-items', label: 'Muitos Itens', icon: Package, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
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
      title: 'Vendas Realizadas',
      value: '42',
      change: { value: 12, type: 'up' as const },
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Vendas Perdidas',
      value: '8',
      change: { value: -3, type: 'down' as const },
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Valor Realizado',
      value: 'R$ 125k',
      change: { value: 15, type: 'up' as const },
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Valor Perdido',
      value: 'R$ 18k',
      change: { value: -8, type: 'down' as const },
      icon: TrendingUp,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Perda por Preço',
      value: '3',
      change: { value: -1, type: 'down' as const },
      icon: DollarSign,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Perda por Logística',
      value: '2',
      change: { value: 0, type: 'up' as const },
      icon: Truck,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Falta de Produto',
      value: '2',
      change: { value: -1, type: 'down' as const },
      icon: Package,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Problema Vendedor',
      value: '1',
      change: { value: -1, type: 'down' as const },
      icon: AlertTriangle,
      color: 'bg-gray-100 text-gray-600'
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

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground">Filtros rápidos:</span>
        {quickFilterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = quickFilters.includes(option.key);
          return (
            <Button
              key={option.key}
              variant="outline"
              size="sm"
              onClick={() => toggleQuickFilter(option.key)}
              className={cn(
                "transition-colors",
                isActive ? option.color : "hover:bg-muted"
              )}
            >
              <Icon className="mr-2 h-3 w-3" />
              {option.label}
            </Button>
          );
        })}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-2 h-3 w-3" />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
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
            <SelectValue placeholder="Status" />
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

        <DatePeriodFilter 
          onPeriodChange={(period, startDate, endDate) => {
            setDateFilter(period);
            console.log('Período selecionado:', period, startDate, endDate);
          }}
        />

        <Select value={valueFilter} onValueChange={setValueFilter}>
          <SelectTrigger className="w-40">
            <DollarSign className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Valor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="low">Até R$ 1k</SelectItem>
            <SelectItem value="medium">R$ 1k - 5k</SelectItem>
            <SelectItem value="high">Acima R$ 5k</SelectItem>
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