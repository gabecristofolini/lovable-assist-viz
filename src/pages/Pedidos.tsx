import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Package, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const navigate = useNavigate();

  const { pedidos } = mockData;

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pedido.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'rascunho':
        return '📝';
      case 'confirmado':
        return '✅';
      case 'processando':
        return '⏳';
      case 'enviado':
        return '🚚';
      case 'concluido':
        return '🎉';
      default:
        return '📦';
    }
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
        <Button onClick={() => navigate('/pedidos/novo')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

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

      {/* Pedidos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPedidos.map((pedido) => (
          <Card key={pedido.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {pedido.numero}
                </CardTitle>
                <span className="text-2xl">{getStatusIcon(pedido.status)}</span>
              </div>
              <Badge className={getStatusColor(pedido.status)}>
                {getStatusLabel(pedido.status)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{pedido.cliente}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <span>R$ {pedido.valor.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{pedido.data}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {pedido.itens} {pedido.itens === 1 ? 'item' : 'itens'}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Visualizar
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPedidos.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum pedido encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou criar um novo pedido.
          </p>
          <Button className="mt-4" onClick={() => navigate('/pedidos/novo')}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Pedido
          </Button>
        </div>
      )}
    </div>
  );
}