import { useState } from 'react';
import { Search, Filter, Plus, Play, Pause, Eye, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/StatusBadge';
import { MetricCard } from '@/components/MetricCard';
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

  const { campanhas } = mockData;

  const filteredCampanhas = campanhas.filter(campanha => {
    const matchesSearch = campanha.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campanha.canal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campanha.status === statusFilter;
    const matchesCanal = canalFilter === 'all' || campanha.canal === canalFilter;
    return matchesSearch && matchesStatus && matchesCanal;
  });

  // Métricas resumo
  const totalInvestimento = campanhas.reduce((acc, c) => acc + c.investimento, 0);
  const totalLeads = campanhas.reduce((acc, c) => acc + c.leads, 0);
  const totalConversoes = campanhas.reduce((acc, c) => acc + c.conversoes, 0);
  const roiMedio = campanhas.reduce((acc, c) => acc + c.roi, 0) / campanhas.length;

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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Investimento Total"
          value={`R$ ${totalInvestimento.toLocaleString()}`}
          icon={Play}
          trend={{ value: 12, type: 'up' }}
        />
        <MetricCard
          title="Leads Gerados"
          value={totalLeads.toLocaleString()}
          icon={Eye}
          trend={{ value: 8, type: 'up' }}
        />
        <MetricCard
          title="Conversões"
          value={totalConversoes.toLocaleString()}
          icon={Copy}
          trend={{ value: 15, type: 'up' }}
        />
        <MetricCard
          title="ROI Médio"
          value={`${roiMedio.toFixed(0)}%`}
          icon={Pause}
          trend={{ value: 5, type: 'up' }}
        />
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

      {/* Lista de Campanhas */}
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
    </div>
  );
}