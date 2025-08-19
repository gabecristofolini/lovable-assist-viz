import { useState } from 'react';
import { Search, Filter, Plus, Star, Building2, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockData } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentoFilter, setSegmentoFilter] = useState('all');
  const [selectedCliente, setSelectedCliente] = useState(null);

  const { clientes } = mockData;

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegmento = segmentoFilter === 'all' || cliente.segmento === segmentoFilter;
    return matchesSearch && matchesSegmento;
  });

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
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={segmentoFilter} onValueChange={setSegmentoFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos segmentos</SelectItem>
            <SelectItem value="B2B">B2B</SelectItem>
            <SelectItem value="B2C">B2C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Clientes */}
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
    </div>
  );
}