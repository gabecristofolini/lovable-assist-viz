import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Play, Pause, Eye, Copy, Target, TrendingUp, BarChart3, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { MetricCard } from '@/components/MetricCard';
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

export default function Campanhas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [canalFilter, setCanalFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('kanban');
  const [quickFilter, setQuickFilter] = useState<string>('todas');

  const { campanhas } = mockData;

  const filteredCampanhas = useMemo(() => {
    return campanhas.filter(campanha => {
      const matchesSearch = campanha.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campanha.canal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campanha.status === statusFilter;
      const matchesCanal = canalFilter === 'all' || campanha.canal === canalFilter;
      
      // Filtros rápidos
      let matchesQuickFilter = true;
      if (quickFilter === 'ativas') {
        matchesQuickFilter = campanha.status === 'ativa';
      } else if (quickFilter === 'alto_roi') {
        matchesQuickFilter = campanha.roi > 300;
      } else if (quickFilter === 'baixo_roi') {
        matchesQuickFilter = campanha.roi < 200;
      } else if (quickFilter === 'alto_investimento') {
        matchesQuickFilter = campanha.investimento > 50000;
      }
      
      return matchesSearch && matchesStatus && matchesCanal && matchesQuickFilter;
    });
  }, [searchTerm, statusFilter, canalFilter, quickFilter]);

  // Métricas resumo
  const stats = useMemo(() => {
    const totalInvestimento = campanhas.reduce((acc, c) => acc + c.investimento, 0);
    const totalLeads = campanhas.reduce((acc, c) => acc + c.leads, 0);
    const totalConversoes = campanhas.reduce((acc, c) => acc + c.conversoes, 0);
    const roiMedio = campanhas.reduce((acc, c) => acc + c.roi, 0) / campanhas.length;
    const ativas = campanhas.filter(c => c.status === 'ativa').length;
    const altoRoi = campanhas.filter(c => c.roi > 300).length;
    const altoInvestimento = campanhas.filter(c => c.investimento > 50000).length;
    
    return {
      totalInvestimento,
      totalLeads,
      totalConversoes,
      roiMedio,
      ativas,
      altoRoi,
      altoInvestimento
    };
  }, [campanhas]);

  // Quick stats para o componente QuickStatsGrid
  const quickStats = [
    {
      title: "Campanhas Ativas",
      value: stats.ativas,
      icon: Play,
      description: "Em execução"
    },
    {
      title: "Alto ROI",
      value: stats.altoRoi,
      icon: TrendingUp,
      description: "Acima de 300%"
    },
    {
      title: "Total de Leads",
      value: stats.totalLeads.toLocaleString(),
      icon: Target,
      description: "Gerados"
    },
    {
      title: "Conversões",
      value: stats.totalConversoes.toLocaleString(),
      icon: BarChart3,
      description: "Efetivadas"
    }
  ];

  // Colunas para DataTable
  const columns = [
    { 
      key: 'nome', 
      label: 'Nome da Campanha', 
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <span className="font-medium">{value}</span>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{row.canal}</Badge>
            <StatusBadge status={row.status} />
          </div>
        </div>
      )
    },
    { 
      key: 'investimento', 
      label: 'Investimento', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">R$ {value.toLocaleString()}</span>
      )
    },
    { 
      key: 'roi', 
      label: 'ROI', 
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-green-600">{value}%</span>
      )
    },
    { 
      key: 'leads', 
      label: 'Leads', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value}</span>
      )
    },
    { 
      key: 'conversoes', 
      label: 'Conversões', 
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value}</span>
      )
    },
    { 
      key: 'ctr', 
      label: 'CTR', 
      sortable: true,
      render: (value: number) => (
        <span className="text-sm">{value}%</span>
      )
    },
    { 
      key: 'cpc', 
      label: 'CPC', 
      sortable: true,
      render: (value: number) => (
        <span className="text-sm">R$ {value}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campanhas</h1>
          <p className="text-muted-foreground">
            {filteredCampanhas.length} campanhas encontradas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ViewToggle view={view} onViewChange={setView} />
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={quickStats} />

      {/* Filtros Rápidos */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={quickFilter === 'todas' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('todas')}
        >
          Todas ({campanhas.length})
        </Button>
        <Button
          variant={quickFilter === 'ativas' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('ativas')}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Ativas ({stats.ativas})
        </Button>
        <Button
          variant={quickFilter === 'alto_roi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('alto_roi')}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Alto ROI ({stats.altoRoi})
        </Button>
        <Button
          variant={quickFilter === 'baixo_roi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('baixo_roi')}
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Baixo ROI
        </Button>
        <Button
          variant={quickFilter === 'alto_investimento' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setQuickFilter('alto_investimento')}
          className="gap-2"
        >
          <DollarSign className="h-4 w-4" />
          Alto Investimento ({stats.altoInvestimento})
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou canal..."
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
            <SelectItem value="ativa">Ativa</SelectItem>
            <SelectItem value="pausada">Pausada</SelectItem>
            <SelectItem value="finalizada">Finalizada</SelectItem>
          </SelectContent>
        </Select>
        <Select value={canalFilter} onValueChange={setCanalFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os canais</SelectItem>
            <SelectItem value="Meta">Meta</SelectItem>
            <SelectItem value="Google">Google</SelectItem>
            <SelectItem value="TikTok">TikTok</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Visualização Lista/Kanban */}
      {view === 'list' ? (
        <DataTable
          data={filteredCampanhas}
          columns={columns}
          onView={(campanha) => console.log('Visualizar campanha:', campanha)}
          onEdit={(campanha) => console.log('Editar campanha:', campanha)}
          onDelete={(campanha) => console.log('Excluir campanha:', campanha)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampanhas.map((campanha) => (
            <Card key={campanha.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{campanha.nome}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{campanha.canal}</Badge>
                      <StatusBadge status={campanha.status} />
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      {campanha.status === 'ativa' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Investimento</span>
                    <p className="font-semibold">R$ {campanha.investimento.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ROI</span>
                    <p className="font-semibold text-green-600">{campanha.roi}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Leads</span>
                    <p className="font-semibold">{campanha.leads}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Conversões</span>
                    <p className="font-semibold">{campanha.conversoes}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span>CTR: {campanha.ctr}%</span>
                    </div>
                    <div>
                      <span>CPC: R$ {campanha.cpc}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Ver Criativos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}