import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Send, Clock, CheckCircle, XCircle, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockOrcamentos = [
  {
    id: 1,
    numero: "ORC-2024-001",
    cliente: "Tech Solutions",
    contato: "João Silva",
    valor: 25000,
    status: "enviado",
    dataEnvio: "18/01/2024",
    validade: "25/01/2024",
    itens: 8,
    desconto: 10,
    observacoes: "Desconto especial para cliente novo"
  },
  {
    id: 2,
    numero: "ORC-2024-002",
    cliente: "Startup XYZ",
    contato: "Ana Costa", 
    valor: 18500,
    status: "aprovado",
    dataEnvio: "17/01/2024",
    validade: "24/01/2024",
    itens: 5,
    desconto: 5,
    observacoes: "Aprovado com observações"
  },
  {
    id: 3,
    numero: "ORC-2024-003",
    cliente: "Indústria ABC",
    contato: "Pedro Santos",
    valor: 45000,
    status: "negociacao",
    dataEnvio: "16/01/2024", 
    validade: "23/01/2024",
    itens: 12,
    desconto: 15,
    observacoes: "Em negociação de valores"
  },
  {
    id: 4,
    numero: "ORC-2024-004",
    cliente: "Beta Corp",
    contato: "Mariana Lima",
    valor: 12000,
    status: "elaboracao",
    dataEnvio: null,
    validade: "30/01/2024",
    itens: 6,
    desconto: 0,
    observacoes: "Aguardando aprovação interna"
  },
  {
    id: 5,
    numero: "ORC-2024-005",
    cliente: "Gamma Ltd",
    contato: "Roberto Alves",
    valor: 8500,
    status: "perdido",
    dataEnvio: "15/01/2024",
    validade: "22/01/2024",
    itens: 4,
    desconto: 8,
    observacoes: "Cliente optou por concorrente"
  }
];

export default function Orcamentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrcamentos = mockOrcamentos.filter(orcamento => {
    const matchesSearch = orcamento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || orcamento.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'elaboracao':
        return <Clock className="h-4 w-4" />;
      case 'enviado':
        return <Send className="h-4 w-4" />;
      case 'negociacao':
        return <Eye className="h-4 w-4" />;
      case 'aprovado':
        return <CheckCircle className="h-4 w-4" />;
      case 'perdido':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      elaboracao: "bg-gray-100 text-gray-800",
      enviado: "bg-blue-100 text-blue-800",
      negociacao: "bg-yellow-100 text-yellow-800",
      aprovado: "bg-green-100 text-green-800",
      perdido: "bg-red-100 text-red-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      elaboracao: "Elaboração",
      enviado: "Enviado",
      negociacao: "Negociação",
      aprovado: "Aprovado",
      perdido: "Perdido"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const isVencimentoProximo = (validade: string) => {
    const hoje = new Date();
    const dataValidade = new Date(validade.split('/').reverse().join('-'));
    const diffDias = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    return diffDias <= 3 && diffDias >= 0;
  };

  // Cálculo das métricas
  const metricas = {
    total: mockOrcamentos.length,
    aprovados: mockOrcamentos.filter(o => o.status === 'aprovado').length,
    pendentes: mockOrcamentos.filter(o => ['enviado', 'negociacao'].includes(o.status)).length,
    perdidos: mockOrcamentos.filter(o => o.status === 'perdido').length,
    valorTotal: mockOrcamentos.reduce((acc, o) => acc + o.valor, 0),
    taxaAprovacao: Math.round((mockOrcamentos.filter(o => o.status === 'aprovado').length / mockOrcamentos.length) * 100),
    tempoMedio: 2.3,
    ticketMedio: Math.round(mockOrcamentos.reduce((acc, o) => acc + o.valor, 0) / mockOrcamentos.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orçamentos</h1>
          <p className="text-muted-foreground">
            {filteredOrcamentos.length} orçamentos encontrados
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Orçamento
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa Aprovação</p>
                <p className="text-2xl font-bold text-green-600">{metricas.taxaAprovacao}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold text-blue-600">{metricas.tempoMedio} dias</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm text-muted-foreground">Total em Análise</p>
                <p className="text-2xl font-bold text-yellow-600">{metricas.pendentes}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {[
              { stage: 'Elaboração', count: mockOrcamentos.filter(o => o.status === 'elaboracao').length, color: 'bg-gray-500' },
              { stage: 'Enviado', count: mockOrcamentos.filter(o => o.status === 'enviado').length, color: 'bg-blue-500' },
              { stage: 'Negociação', count: mockOrcamentos.filter(o => o.status === 'negociacao').length, color: 'bg-yellow-500' },
              { stage: 'Aprovado', count: mockOrcamentos.filter(o => o.status === 'aprovado').length, color: 'bg-green-500' },
              { stage: 'Perdido', count: mockOrcamentos.filter(o => o.status === 'perdido').length, color: 'bg-red-500' }
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
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="elaboracao">Elaboração</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="negociacao">Negociação</SelectItem>
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Orçamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrcamentos.map((orcamento) => (
          <Card key={orcamento.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(orcamento.status)}
                  <div>
                    <CardTitle className="text-lg">{orcamento.numero}</CardTitle>
                    <p className="text-sm text-muted-foreground">{orcamento.cliente}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(orcamento.status)}>
                  {getStatusLabel(orcamento.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Informações Principais */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contato</p>
                  <p className="font-medium">{orcamento.contato}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor</p>
                  <p className="font-bold text-lg text-green-600">R$ {orcamento.valor.toLocaleString()}</p>
                </div>
              </div>

              {/* Datas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Enviado em</p>
                  <p className="text-sm">{orcamento.dataEnvio || 'Não enviado'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Válido até</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">{orcamento.validade}</p>
                    {isVencimentoProximo(orcamento.validade) && (
                      <Badge variant="destructive" className="text-xs">Vence em breve</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Detalhes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Itens</p>
                  <p className="text-sm">{orcamento.itens} produtos</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Desconto</p>
                  <p className="text-sm">{orcamento.desconto}%</p>
                </div>
              </div>

              {/* Observações */}
              {orcamento.observacoes && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Observações:</p>
                  <p className="text-sm">{orcamento.observacoes}</p>
                </div>
              )}

              {/* Ações */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                {orcamento.status === 'aprovado' && (
                  <Button size="sm" className="flex-1">
                    Converter em Pedido
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrcamentos.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum orçamento encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou criar um novo orçamento.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Orçamento
          </Button>
        </div>
      )}
    </div>
  );
}