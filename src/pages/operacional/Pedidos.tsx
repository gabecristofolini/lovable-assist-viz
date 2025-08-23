import { useState } from 'react';
import { Search, Filter, Plus, Upload, Package, Clock, DollarSign, CheckCircle, Truck, Send, Eye, XCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ViewToggle';
import { DataTable } from '@/components/DataTable';
import { PipelineStage } from '@/components/PipelineStage';
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
    cliente: "Tech Solutions",
    contato: "Maria Santos",
    valor: 25000,
    status: "confirmado",
    dataEmissao: "18/01/2024",
    dataPrevista: "25/01/2024",
    itens: 8,
    desconto: 10,
    observacoes: "Pedido gerado a partir de orçamento aprovado"
  },
  {
    id: 2,
    numero: "PED-2024-002",
    cliente: "Startup XYZ",
    contato: "Carlos Mendes",
    valor: 18500,
    status: "producao",
    dataEmissao: "17/01/2024",
    dataPrevista: "24/01/2024",
    itens: 5,
    desconto: 5,
    observacoes: "Em produção, prazo normal"
  },
  {
    id: 3,
    numero: "PED-2024-003",
    cliente: "Indústria ABC",
    contato: "Ana Costa",
    valor: 45000,
    status: "enviado",
    dataEmissao: "16/01/2024",
    dataPrevista: "23/01/2024",
    itens: 12,
    desconto: 15,
    observacoes: "Enviado para cliente, aguardando confirmação de recebimento"
  },
  {
    id: 4,
    numero: "PED-2024-004",
    cliente: "Beta Corp",
    contato: "Roberto Lima",
    valor: 12000,
    status: "entregue",
    dataEmissao: "15/01/2024",
    dataPrevista: "22/01/2024",
    itens: 6,
    desconto: 0,
    observacoes: "Entrega realizada com sucesso"
  },
  {
    id: 5,
    numero: "PED-2024-005",
    cliente: "Gamma Ltd",
    contato: "Julia Oliveira",
    valor: 8500,
    status: "cancelado",
    dataEmissao: "14/01/2024",
    dataPrevista: "21/01/2024",
    itens: 4,
    desconto: 8,
    observacoes: "Cancelado a pedido do cliente"
  }
];

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const filteredPedidos = mockPedidos.filter(pedido => {
    const matchesSearch = pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pedido.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <CheckCircle className="h-4 w-4" />;
      case 'producao':
        return <Package className="h-4 w-4" />;
      case 'enviado':
        return <Truck className="h-4 w-4" />;
      case 'entregue':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelado':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmado: "bg-blue-100 text-blue-800",
      producao: "bg-orange-100 text-orange-800",
      enviado: "bg-purple-100 text-purple-800",
      entregue: "bg-green-100 text-green-800",
      cancelado: "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      confirmado: "Confirmado",
      producao: "Em Produção",
      enviado: "Enviado",
      entregue: "Entregue",
      cancelado: "Cancelado"
    };
    return labels[status as keyof typeof labels] || status;
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
          <div className="text-sm text-muted-foreground">{row.contato}</div>
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
  ];

  // Cálculo das métricas
  const metricas = {
    total: mockPedidos.length,
    confirmados: mockPedidos.filter(p => p.status === 'confirmado').length,
    producao: mockPedidos.filter(p => p.status === 'producao').length,
    enviados: mockPedidos.filter(p => p.status === 'enviado').length,
    entregues: mockPedidos.filter(p => p.status === 'entregue').length,
    valorTotal: mockPedidos.reduce((acc, p) => acc + p.valor, 0),
    ticketMedio: Math.round(mockPedidos.reduce((acc, p) => acc + p.valor, 0) / mockPedidos.length),
    tempoMedio: 5.2
  };


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

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
                <p className="text-2xl font-bold text-blue-600">{metricas.confirmados}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Produção</p>
                <p className="text-2xl font-bold text-orange-600">{metricas.producao}</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-2xl font-bold text-purple-600">R$ {metricas.ticketMedio.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold text-green-600">{metricas.tempoMedio} dias</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {[
              { stage: 'Confirmados', count: metricas.confirmados, color: 'bg-blue-500' },
              { stage: 'Em Produção', count: metricas.producao, color: 'bg-orange-500' },
              { stage: 'Enviados', count: metricas.enviados, color: 'bg-purple-500' },
              { stage: 'Entregues', count: metricas.entregues, color: 'bg-green-500' },
              { stage: 'Cancelados', count: mockPedidos.filter(p => p.status === 'cancelado').length, color: 'bg-red-500' }
            ].map((stage, index) => (
              <div key={stage.stage} className="text-center">
                <div className={`${stage.color} rounded-lg p-4 mb-2`}>
                  <span className="text-white text-2xl font-bold">{stage.count}</span>
                </div>
                <p className="text-sm font-medium">{stage.stage}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
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
            <SelectItem value="confirmado">Confirmado</SelectItem>
            <SelectItem value="producao">Em Produção</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="entregue">Entregue</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Organizar pedidos por estágio para o kanban */}
      {(() => {
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
              subtitle: `${pedido.cliente} - ${pedido.contato}`,
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
              subtitle: `${pedido.cliente} - ${pedido.contato}`,
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
              subtitle: `${pedido.cliente} - ${pedido.contato}`,
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
              subtitle: `${pedido.cliente} - ${pedido.contato}`,
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
              subtitle: `${pedido.cliente} - ${pedido.contato}`,
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
          <>
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
          </>
        );
      })()}

      {/* Empty State */}
      {filteredPedidos.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum pedido encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou criar um novo pedido.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Pedido
          </Button>
        </div>
      )}
    </div>
  );
}