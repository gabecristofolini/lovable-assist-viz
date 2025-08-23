import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Play, Eye, Edit, MoreVertical, Image, Video, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ViewToggle';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { DataTable } from '@/components/DataTable';
import { mockData } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Criativos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('all');
  const [campanhaFilter, setCampanhaFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('kanban');
  const [quickFilter, setQuickFilter] = useState<string>('todos');

  const { criativos, campanhas } = mockData;

  const filteredCreativos = useMemo(() => {
    return criativos.filter(criativo => {
      const matchesSearch = criativo.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTipo = tipoFilter === 'all' || criativo.tipo === tipoFilter;
      const matchesCampanha = campanhaFilter === 'all' || criativo.campanhaId.toString() === campanhaFilter;
      
      // Filtros rápidos
      let matchesQuickFilter = true;
      if (quickFilter === 'aprovados') {
        matchesQuickFilter = criativo.status === 'aprovado';
      } else if (quickFilter === 'alta_performance') {
        matchesQuickFilter = criativo.ctr > 2.0;
      } else if (quickFilter === 'baixa_performance') {
        matchesQuickFilter = criativo.ctr < 1.5;
      } else if (quickFilter === 'videos') {
        matchesQuickFilter = criativo.tipo === 'video';
      }
      
      return matchesSearch && matchesTipo && matchesCampanha && matchesQuickFilter;
    });
  }, [searchTerm, tipoFilter, campanhaFilter, quickFilter]);

  // Estatísticas
  const stats = useMemo(() => {
    const aprovados = criativos.filter(c => c.status === 'aprovado').length;
    const altaPerformance = criativos.filter(c => c.ctr > 2.0).length;
    const videos = criativos.filter(c => c.tipo === 'video').length;
    const totalImpressoes = criativos.reduce((sum, c) => sum + c.impressoes, 0);
    
    return {
      total: criativos.length,
      aprovados,
      altaPerformance,
      videos,
      totalImpressoes
    };
  }, [criativos]);

  // Quick stats
  const quickStats = [
    {
      title: "Total de Criativos",
      value: stats.total,
      icon: Image,
      description: "Cadastrados"
    },
    {
      title: "Aprovados",
      value: stats.aprovados,
      icon: Users,
      description: "Em uso"
    },
    {
      title: "Alta Performance",
      value: stats.altaPerformance,
      icon: BarChart3,
      description: "CTR > 2%"
    },
    {
      title: "Vídeos",
      value: stats.videos,
      icon: Video,
      description: "Formato vídeo"
    }
  ];

  // Colunas para DataTable
  const columns = [
    { 
      key: 'nome', 
      label: 'Nome do Criativo', 
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <span className="font-medium">{value}</span>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{row.tipo}</Badge>
            <Badge variant="outline">{row.formato}</Badge>
          </div>
        </div>
      )
    },
    { 
      key: 'campanha', 
      label: 'Campanha', 
      sortable: true,
      render: (value: string) => (
        <span className="text-sm">{value}</span>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => {
        const colors = {
          aprovado: "bg-green-100 text-green-800",
          revisao: "bg-yellow-100 text-yellow-800",
          reprovado: "bg-red-100 text-red-800"
        };
        return <Badge className={colors[value as keyof typeof colors]}>{value}</Badge>;
      }
    },
    { 
      key: 'impressoes', 
      label: 'Impressões', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value.toLocaleString()}</span>
      )
    },
    { 
      key: 'cliques', 
      label: 'Cliques', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value}</span>
      )
    },
    { 
      key: 'ctr', 
      label: 'CTR', 
      sortable: true,
      render: (value: number) => {
        const colorClass = value > 2.0 ? 'text-green-600' : value > 1.5 ? 'text-yellow-600' : 'text-red-600';
        return <span className={`font-medium ${colorClass}`}>{value}%</span>;
      }
    },
    { 
      key: 'conversoes', 
      label: 'Conversões', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value}</span>
      )
    }
  ];

  const getPerformanceBadge = (ctr: number) => {
    if (ctr > 2.0) return <Badge className="bg-green-100 text-green-800">Alta</Badge>;
    if (ctr > 1.5) return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
    return <Badge className="bg-red-100 text-red-800">Baixa</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      aprovado: "bg-green-100 text-green-800",
      revisao: "bg-yellow-100 text-yellow-800",
      reprovado: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'video' ? <Play className="h-4 w-4" /> : <Eye className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Criativos</h1>
          <p className="text-muted-foreground">
            {filteredCreativos.length} criativos encontrados
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Criativo
        </Button>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={quickStats} />

      {/* Filtros Rápidos */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={quickFilter === 'todos' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('todos')}
        >
          Todos ({criativos.length})
        </Button>
        <Button
          variant={quickFilter === 'aprovados' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('aprovados')}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          Aprovados ({stats.aprovados})
        </Button>
        <Button
          variant={quickFilter === 'alta_performance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('alta_performance')}
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Alta Performance ({stats.altaPerformance})
        </Button>
        <Button
          variant={quickFilter === 'baixa_performance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('baixa_performance')}
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Baixa Performance
        </Button>
        <Button
          variant={quickFilter === 'videos' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('videos')}
          className="gap-2"
        >
          <Video className="h-4 w-4" />
          Vídeos ({stats.videos})
        </Button>
      </div>

      {/* Filtros e Toggle de Visualização */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="imagem">Imagem</SelectItem>
              <SelectItem value="video">Vídeo</SelectItem>
              <SelectItem value="carrossel">Carrossel</SelectItem>
            </SelectContent>
          </Select>
          <Select value={campanhaFilter} onValueChange={setCampanhaFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Campanha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas campanhas</SelectItem>
              {campanhas.map(campanha => (
                <SelectItem key={campanha.id} value={campanha.id.toString()}>
                  {campanha.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {/* Visualização Lista/Kanban */}
      {view === 'list' ? (
        <DataTable
          data={filteredCreativos}
          columns={columns}
          title={`Criativos (${filteredCreativos.length} de ${criativos.length})`}
          onView={(criativo) => console.log('Visualizar criativo:', criativo)}
          onEdit={(criativo) => console.log('Editar criativo:', criativo)}
          onDelete={(criativo) => console.log('Excluir criativo:', criativo)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreativos.map((criativo) => (
            <Card key={criativo.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTipoIcon(criativo.tipo)}
                    <span className="font-medium text-sm">{criativo.tipo}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Preview */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={criativo.url_preview} 
                    alt={criativo.nome}
                    className="max-w-full max-h-full object-cover rounded-lg"
                  />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-medium truncate">{criativo.nome}</h3>
                  <p className="text-sm text-muted-foreground">{criativo.formato}</p>
                  <p className="text-xs text-muted-foreground">{criativo.campanha}</p>
                </div>

                {/* Status e Performance */}
                <div className="flex justify-between">
                  {getStatusBadge(criativo.status)}
                  {getPerformanceBadge(criativo.ctr)}
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Impressões:</span>
                    <p className="font-medium">{criativo.impressoes.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cliques:</span>
                    <p className="font-medium">{criativo.cliques}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CTR:</span>
                    <p className="font-medium">{criativo.ctr}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Conversões:</span>
                    <p className="font-medium">{criativo.conversoes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredCreativos.length === 0 && (
        <div className="text-center py-12">
          <Eye className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum criativo encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou criar um novo criativo.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Criativo
          </Button>
        </div>
      )}
    </div>
  );
}