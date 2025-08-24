import { useState } from 'react';
import { Search, Filter, Plus, Star, Building2, Mail, Phone, Calendar, DollarSign, Upload, TrendingUp, Users, Crown, X, LayoutGrid, MessageCircle } from 'lucide-react';
import { WhatsAppModal } from '@/components/WhatsAppModal';
import { DatePeriodFilter } from '@/components/DatePeriodFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DataTable } from '@/components/DataTable';
import { ViewToggle } from '@/components/ViewToggle';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { mockData } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentoFilter, setSegmentoFilter] = useState('all');
  const [porteFilter, setPorteFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [view, setView] = useState<'list' | 'kanban'>('kanban');
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  const { clientes } = mockData;

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegmento = segmentoFilter === 'all' || cliente.segmento === segmentoFilter;
    
    // Porte filter
    const matchesPorte = porteFilter === 'all' || cliente.porte === porteFilter;
    
    // Score filter
    const matchesScore = scoreFilter === 'all' || (() => {
      switch (scoreFilter) {
        case 'low':
          return cliente.score <= 2;
        case 'medium':
          return cliente.score >= 3 && cliente.score <= 4;
        case 'high':
          return cliente.score === 5;
        default:
          return true;
      }
    })();
    
    // Quick filters
    const matchesQuickFilters = quickFilters.length === 0 || quickFilters.every(filter => {
      switch (filter) {
        case 'vip':
          return cliente.score >= 4 && cliente.valorTotalPedidos >= 10000;
        case 'high-value':
          return cliente.valorTotalPedidos >= 15000;
        case 'recent':
          const today = new Date();
          const contactDate = new Date();
          return true; // Mock - em produção seria baseado na última interação
        case 'frequent':
          return cliente.tags.includes('Recorrente') || cliente.tags.includes('Fidelizado');
        default:
          return true;
      }
    });
    
    return matchesSearch && matchesSegmento && matchesPorte && matchesScore && matchesQuickFilters;
  });

  // Table columns for list view
  const columns = [
    {
      key: 'nome',
      label: 'Cliente',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {value.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.empresa}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'telefone',
      label: 'Telefone',
      sortable: true,
    },
    {
      key: 'segmento',
      label: 'Segmento',
      sortable: true,
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (value: number) => renderStars(value),
    },
    {
      key: 'valorTotalPedidos',
      label: 'Total Pedidos',
      sortable: true,
      render: (value: number) => `R$ ${value?.toLocaleString() || 0}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge className="bg-green-100 text-green-800">{value}</Badge>
      ),
    },
    {
      key: 'ultimaMensagem',
      label: 'Última Mensagem',
      sortable: false,
      render: (value: string, row: any) => (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground truncate max-w-32">
            {row.ultimoContato || 'Nenhuma mensagem'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedConversation({
                id: row.id,
                nome: row.nome,
                telefone: row.telefone,
                online: Math.random() > 0.5,
                ultimaMensagem: 'Mensagem do WhatsApp...',
                hora: '10:30'
              });
              setWhatsappOpen(true);
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleView = (cliente: any) => {
    setSelectedCliente(cliente.id);
  };

  const handleEdit = (cliente: any) => {
    console.log('Editando cliente:', cliente);
  };

  const handleDelete = (cliente: any) => {
    console.log('Excluindo cliente:', cliente);
  };

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSegmentoFilter('all');
    setPorteFilter('all');
    setScoreFilter('all');
    setQuickFilters([]);
  };

  const hasActiveFilters = searchTerm || segmentoFilter !== 'all' || porteFilter !== 'all' || scoreFilter !== 'all' || quickFilters.length > 0;

  const quickFilterOptions = [
    { key: 'vip', label: 'VIP', icon: Crown, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
    { key: 'high-value', label: 'Alto Valor', icon: DollarSign, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { key: 'recent', label: 'Recentes', icon: Calendar, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { key: 'frequent', label: 'Frequentes', icon: TrendingUp, color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  ];

  // Client statistics
  const clientStats = [
    {
      title: 'Total Clientes',
      value: clientes.length.toString(),
      change: { value: 8, type: 'up' as const },
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Clientes VIP',
      value: clientes.filter(c => c.score >= 4 && c.valorTotalPedidos >= 10000).length.toString(),
      change: { value: 12, type: 'up' as const },
      icon: Crown,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Ativos',
      value: clientes.filter(c => c.status === 'Ativo').length.toString(),
      change: { value: 5, type: 'up' as const },
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Novos (30d)',
      value: '24',
      change: { value: 15, type: 'up' as const },
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Receita Total',
      value: `R$ ${clientes.reduce((sum, c) => sum + (c.valorTotalPedidos || 0), 0).toLocaleString()}`,
      change: { value: 22, type: 'up' as const },
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Ticket Médio',
      value: `R$ ${Math.round(clientes.reduce((sum, c) => sum + (c.valorTotalPedidos || 0), 0) / clientes.length).toLocaleString()}`,
      change: { value: 8, type: 'up' as const },
      icon: Building2,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const renderStars = (score: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= score ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (selectedCliente) {
    const cliente = clientes.find(c => c.id === selectedCliente);
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setSelectedCliente(null)}>
              ← Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{cliente?.nome}</h1>
              <p className="text-muted-foreground">{cliente?.empresa}</p>
            </div>
          </div>
          <Button>
            Editar Cliente
          </Button>
        </div>

        {/* Visão 360° */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Info Principal */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {cliente?.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-semibold">{cliente?.nome}</h3>
                  <p className="text-sm text-muted-foreground">{cliente?.empresa}</p>
                </div>
                {renderStars(cliente?.score || 0)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cliente?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cliente?.telefone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cliente?.cnpj}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Cliente desde {cliente?.desde}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Segmentação</h4>
                <Badge variant="outline">{cliente?.segmento}</Badge>
                <Badge variant="outline">{cliente?.porte}</Badge>
                <Badge variant="outline">{cliente?.setor}</Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {cliente?.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Principais */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="dados" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="dados">Dados</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
                <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
                <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              </TabsList>

              <TabsContent value="dados" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Básicas</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome Completo</label>
                      <p className="text-sm text-muted-foreground">{cliente?.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">{cliente?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone</label>
                      <p className="text-sm text-muted-foreground">{cliente?.telefone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Empresa</label>
                      <p className="text-sm text-muted-foreground">{cliente?.empresa}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline de Atividades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Reunião realizada</p>
                          <p className="text-xs text-muted-foreground">Há 2 dias</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pedido #2024-001 finalizado</p>
                          <p className="text-xs text-muted-foreground">Há 1 semana</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orcamentos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Orçamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Nenhum orçamento encontrado</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pedidos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Pedidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">#2024-001</p>
                          <p className="text-sm text-muted-foreground">15/01/2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 12.500</p>
                          <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financeiro" className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Pedidos</p>
                          <p className="text-2xl font-bold">R$ {cliente?.valorTotalPedidos?.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Último Contato</p>
                        <p className="text-lg font-medium">{cliente?.ultimoContato}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge className="bg-green-100 text-green-800">{cliente?.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">
            {filteredClientes.length} clientes encontrados
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ViewToggle 
            view={view} 
            onViewChange={setView}
            className="mr-2"
          />
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={clientStats} columns={6} />

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
            placeholder="Buscar por nome, empresa ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={segmentoFilter} onValueChange={setSegmentoFilter}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="B2B">B2B</SelectItem>
            <SelectItem value="B2C">B2C</SelectItem>
          </SelectContent>
        </Select>

        <Select value={porteFilter} onValueChange={setPorteFilter}>
          <SelectTrigger className="w-40">
            <Building2 className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Porte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Pequeno">Pequeno</SelectItem>
            <SelectItem value="Médio">Médio</SelectItem>
            <SelectItem value="Grande">Grande</SelectItem>
          </SelectContent>
        </Select>

        <Select value={scoreFilter} onValueChange={setScoreFilter}>
          <SelectTrigger className="w-40">
            <Star className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="low">1-2 ⭐</SelectItem>
            <SelectItem value="medium">3-4 ⭐</SelectItem>
            <SelectItem value="high">5 ⭐</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content - Lista ou Cards */}
      {view === 'list' ? (
        <DataTable
          data={filteredClientes}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedCliente(cliente.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {cliente.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{cliente.nome}</h3>
                    <p className="text-sm text-muted-foreground">{cliente.empresa}</p>
                  </div>
                  <Badge variant="outline">{cliente.segmento}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cliente.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cliente.telefone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {renderStars(cliente.score)}
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-semibold">R$ {cliente.valorTotalPedidos?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cliente.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredClientes.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum cliente encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou criar um novo cliente.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Cliente
          </Button>
        </div>
      )}

      {selectedConversation && (
        <WhatsAppModal
          isOpen={whatsappOpen}
          onClose={() => setWhatsappOpen(false)}
          conversation={selectedConversation}
        />
      )}
    </div>
  );
}