import { useState, useMemo } from 'react';
import { DataTable } from '@/components/DataTable';
import { ViewToggle } from '@/components/ViewToggle';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MetricCard } from '@/components/MetricCard';
import { 
  Package,
  Plus,
  Search,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Archive,
  Filter,
  RefreshCw,
  Clock,
  ShoppingCart,
  Target,
  BarChart3
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data baseado no exemplo fornecido
const mockProdutos = [
  {
    id: 1,
    codigo: '100',
    nome: 'TAPA FURO ARAUCO IMBUIA C/ 50 UN',
    unidade: 'CT',
    estoque: 66,
    valor: 0.93,
    total: 61.38,
    categoria: 'Acessórios',
    marca: 'Arauco',
    statusEstoque: 'adequado',
    fornecedor: 'Madeireira Central',
    localizacao: 'A1-B2',
    pesoUnitario: 0.5,
    dimensoes: '12x12x2mm',
    dataUltimaCompra: '2024-01-15',
    dataUltimaVenda: '2024-01-20'
  },
  {
    id: 2,
    codigo: '101',
    nome: 'TAPA FURO BRANCO TX 12MM C/ 50 UN',
    unidade: 'CT',
    estoque: 6137,
    valor: 1.25,
    total: 7671.25,
    categoria: 'Acessórios',
    marca: 'TX',
    statusEstoque: 'alto',
    fornecedor: 'Distribuidora MDF',
    localizacao: 'B2-C3',
    pesoUnitario: 0.6,
    dimensoes: '12x12x2mm',
    dataUltimaCompra: '2024-01-10',
    dataUltimaVenda: '2024-01-22'
  },
  {
    id: 3,
    codigo: '102',
    nome: 'TAPA FURO BEGE TX / OVO TX C/ 50 UN',
    unidade: 'CT',
    estoque: 5,
    valor: 1.33,
    total: 6.65,
    categoria: 'Acessórios',
    marca: 'TX',
    statusEstoque: 'critico',
    fornecedor: 'Distribuidora MDF',
    localizacao: 'C1-D2',
    pesoUnitario: 0.6,
    dimensoes: '12x12x2mm',
    dataUltimaCompra: '2024-01-05',
    dataUltimaVenda: '2024-01-21'
  },
  {
    id: 4,
    codigo: '103',
    nome: 'CHAPA MDF 15MM BRANCO 2750X1850',
    unidade: 'UN',
    estoque: 25,
    valor: 89.50,
    total: 2237.50,
    categoria: 'Chapas',
    marca: 'Duratex',
    statusEstoque: 'baixo',
    fornecedor: 'Duratex SA',
    localizacao: 'E1-F3',
    pesoUnitario: 45.2,
    dimensoes: '2750x1850x15mm',
    dataUltimaCompra: '2024-01-12',
    dataUltimaVenda: '2024-01-19'
  },
  {
    id: 5,
    codigo: '104',
    nome: 'FITA DE BORDA BRANCO 22MM X 50M',
    unidade: 'RL',
    estoque: 156,
    valor: 12.80,
    total: 1996.80,
    categoria: 'Bordas',
    marca: 'Rehau',
    statusEstoque: 'adequado',
    fornecedor: 'Rehau Brasil',
    localizacao: 'D3-E2',
    pesoUnitario: 1.2,
    dimensoes: '22mm x 50m',
    dataUltimaCompra: '2024-01-08',
    dataUltimaVenda: '2024-01-18'
  }
];

const getStatusEstoqueBadge = (status: string, estoque: number) => {
  if (status === 'critico' || estoque <= 10) {
    return <Badge variant="destructive">Crítico</Badge>;
  } else if (status === 'baixo' || estoque <= 50) {
    return <Badge variant="outline" className="border-orange-500 text-orange-600">Baixo</Badge>;
  } else if (status === 'alto' || estoque >= 1000) {
    return <Badge variant="outline" className="border-blue-500 text-blue-600">Alto</Badge>;
  }
  return <Badge variant="outline" className="border-green-500 text-green-600">Adequado</Badge>;
};

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [quickFilter, setQuickFilter] = useState<string>('todos');

  // Filtros e estatísticas
  const filteredProdutos = useMemo(() => {
    return mockProdutos.filter(produto => {
      const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           produto.codigo.includes(searchTerm);
      const matchesCategory = selectedCategory === 'todos' || produto.categoria === selectedCategory;
      const matchesStatus = selectedStatus === 'todos' || produto.statusEstoque === selectedStatus;
      
      // Filtros rápidos
      let matchesQuickFilter = true;
      if (quickFilter === 'criticos') {
        matchesQuickFilter = produto.statusEstoque === 'critico';
      } else if (quickFilter === 'baixos') {
        matchesQuickFilter = produto.statusEstoque === 'baixo';
      } else if (quickFilter === 'alto_valor') {
        matchesQuickFilter = produto.total > 1000;
      } else if (quickFilter === 'sem_movimento') {
        matchesQuickFilter = new Date(produto.dataUltimaVenda) < new Date('2024-01-15');
      }
      
      return matchesSearch && matchesCategory && matchesStatus && matchesQuickFilter;
    });
  }, [searchTerm, selectedCategory, selectedStatus, quickFilter]);

  const stats = useMemo(() => {
    const totalProdutos = mockProdutos.length;
    const valorTotalEstoque = mockProdutos.reduce((sum, p) => sum + p.total, 0);
    const produtosCriticos = mockProdutos.filter(p => p.statusEstoque === 'critico').length;
    const produtosBaixos = mockProdutos.filter(p => p.statusEstoque === 'baixo').length;
    const semMovimento = mockProdutos.filter(p => new Date(p.dataUltimaVenda) < new Date('2024-01-15')).length;
    const altoValor = mockProdutos.filter(p => p.total > 1000).length;
    
    return {
      totalProdutos,
      valorTotalEstoque,
      produtosCriticos,
      produtosBaixos,
      semMovimento,
      altoValor,
      alertas: produtosCriticos + produtosBaixos
    };
  }, []);

  // Quick stats para o componente QuickStatsGrid
  const quickStats = [
    {
      title: "Total de Produtos",
      value: stats.totalProdutos,
      icon: Package,
      description: "Cadastrados"
    },
    {
      title: "Estoque Crítico",
      value: stats.produtosCriticos,
      icon: AlertTriangle,
      description: "Produtos em falta"
    },
    {
      title: "Alto Valor",
      value: stats.altoValor,
      icon: TrendingUp,
      description: "Acima de R$ 1.000"
    },
    {
      title: "Sem Movimento",
      value: stats.semMovimento,
      icon: Clock,
      description: "Últimos 7 dias"
    }
  ];

  const columns = [
    { 
      key: 'codigo', 
      label: 'Código', 
      sortable: true,
      render: (value: string) => <span className="font-mono font-medium">{value}</span>
    },
    { 
      key: 'nome', 
      label: 'Nome do Produto', 
      sortable: true,
      render: (value: string) => <span className="font-medium max-w-xs truncate" title={value}>{value}</span>
    },
    { 
      key: 'categoria', 
      label: 'Categoria', 
      sortable: true,
      render: (value: string) => <Badge variant="secondary">{value}</Badge>
    },
    { 
      key: 'unidade', 
      label: 'UN', 
      sortable: true,
      render: (value: string) => <span className="text-muted-foreground">{value}</span>
    },
    { 
      key: 'estoque', 
      label: 'Estoque', 
      sortable: true,
      render: (value: number, row: any) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{value.toLocaleString()}</span>
          {getStatusEstoqueBadge(row.statusEstoque, value)}
        </div>
      )
    },
    { 
      key: 'valor', 
      label: 'Valor Unit.', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-green-600">
          R$ {value.toFixed(2).replace('.', ',')}
        </span>
      )
    },
    { 
      key: 'total', 
      label: 'Valor Total', 
      sortable: true,
      render: (value: number) => (
        <span className="font-bold text-green-700">
          R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      )
    },
    {
      key: 'fornecedor',
      label: 'Fornecedor',
      sortable: true,
      render: (value: string) => <span className="text-sm text-muted-foreground">{value}</span>
    }
  ];

  const alertasCriticos = mockProdutos.filter(p => p.statusEstoque === 'critico');
  const alertasBaixos = mockProdutos.filter(p => p.statusEstoque === 'baixo');

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cadastro de Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie o catálogo de produtos e controle de estoque
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {/* Alertas Inteligentes */}
      {(alertasCriticos.length > 0 || alertasBaixos.length > 0) && (
        <div className="grid gap-4">
          {alertasCriticos.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Atenção!</strong> {alertasCriticos.length} produto(s) com estoque crítico: {alertasCriticos.map(p => p.nome).join(', ')}
              </AlertDescription>
            </Alert>
          )}
          {alertasBaixos.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Aviso:</strong> {alertasBaixos.length} produto(s) com estoque baixo necessitam reposição
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <QuickStatsGrid stats={quickStats} />

      {/* Filtros Rápidos */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={quickFilter === 'todos' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('todos')}
        >
          Todos ({mockProdutos.length})
        </Button>
        <Button
          variant={quickFilter === 'criticos' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('criticos')}
          className="gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Críticos ({stats.produtosCriticos})
        </Button>
        <Button
          variant={quickFilter === 'baixos' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('baixos')}
          className="gap-2"
        >
          <Archive className="h-4 w-4" />
          Baixos ({stats.produtosBaixos})
        </Button>
        <Button
          variant={quickFilter === 'alto_valor' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('alto_valor')}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Alto Valor ({stats.altoValor})
        </Button>
        <Button
          variant={quickFilter === 'sem_movimento' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('sem_movimento')}
          className="gap-2"
        >
          <Clock className="h-4 w-4" />
          Sem Movimento ({stats.semMovimento})
        </Button>
      </div>

      {/* Filtros e Toggle de Visualização */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas Categorias</SelectItem>
              <SelectItem value="Acessórios">Acessórios</SelectItem>
              <SelectItem value="Chapas">Chapas</SelectItem>
              <SelectItem value="Bordas">Bordas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status Estoque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Status</SelectItem>
              <SelectItem value="critico">Crítico</SelectItem>
              <SelectItem value="baixo">Baixo</SelectItem>
              <SelectItem value="adequado">Adequado</SelectItem>
              <SelectItem value="alto">Alto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {/* Visualização Lista/Kanban */}
      {view === 'list' ? (
        <DataTable
          data={filteredProdutos}
          columns={columns}
          title={`Produtos (${filteredProdutos.length} de ${mockProdutos.length})`}
          onView={(produto) => console.log('Visualizar produto:', produto)}
          onEdit={(produto) => console.log('Editar produto:', produto)}
          onDelete={(produto) => console.log('Excluir produto:', produto)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProdutos.map((produto) => (
            <Card key={produto.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{produto.nome}</h3>
                    <p className="text-muted-foreground text-xs">Código: {produto.codigo}</p>
                    <Badge variant="secondary" className="mt-1">{produto.categoria}</Badge>
                  </div>
                  {getStatusEstoqueBadge(produto.statusEstoque, produto.estoque)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estoque:</span>
                    <span className="font-medium">{produto.estoque} {produto.unidade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valor Unit.:</span>
                    <span className="font-medium text-green-600">R$ {produto.valor.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="font-bold text-green-700">R$ {produto.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fornecedor:</span>
                    <span className="text-sm">{produto.fornecedor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dashboard Adicional - Análises Rápidas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Produtos Mais Valiosos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProdutos
                .sort((a, b) => b.total - a.total)
                .slice(0, 3)
                .map((produto) => (
                  <div key={produto.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{produto.nome.substring(0, 30)}...</p>
                      <p className="text-xs text-muted-foreground">Código: {produto.codigo}</p>
                    </div>
                    <span className="font-bold text-green-600">
                      R$ {produto.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5" />
              Maiores Estoques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockProdutos
                .sort((a, b) => b.estoque - a.estoque)
                .slice(0, 3)
                .map((produto) => (
                  <div key={produto.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{produto.nome.substring(0, 30)}...</p>
                      <p className="text-xs text-muted-foreground">Código: {produto.codigo}</p>
                    </div>
                    <span className="font-bold">
                      {produto.estoque.toLocaleString()} {produto.unidade}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}