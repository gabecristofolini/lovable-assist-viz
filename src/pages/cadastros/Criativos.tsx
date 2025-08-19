import { useState } from 'react';
import { Search, Filter, Plus, Play, Eye, Edit, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  const { criativos, campanhas } = mockData;

  const filteredCreativos = criativos.filter(criativo => {
    const matchesSearch = criativo.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === 'all' || criativo.tipo === tipoFilter;
    const matchesCampanha = campanhaFilter === 'all' || criativo.campanhaId.toString() === campanhaFilter;
    return matchesSearch && matchesTipo && matchesCampanha;
  });

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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Grid de Criativos */}
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