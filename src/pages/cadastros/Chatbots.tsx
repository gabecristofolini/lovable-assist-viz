import { useState } from 'react';
import { Search, Plus, MessageSquare, Bot, Play, Pause, Settings, Eye, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockData } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Chatbots() {
  const [searchTerm, setSearchTerm] = useState('');
  const [canalFilter, setCanalFilter] = useState('all');

  const { chatbots } = mockData;

  const filteredChatbots = chatbots.filter(bot => {
    const matchesSearch = bot.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCanal = canalFilter === 'all' || bot.canal === canalFilter;
    return matchesSearch && matchesCanal;
  });

  const getStatusBadge = (status: string) => {
    return status === 'ativo' 
      ? <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      : <Badge className="bg-red-100 text-red-800">Inativo</Badge>;
  };

  const getCanalIcon = (canal: string) => {
    switch (canal) {
      case 'whatsapp':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'site':
        return <Bot className="h-5 w-5 text-blue-500" />;
      case 'instagram':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <Bot className="h-5 w-5" />;
    }
  };

  const getCanalLabel = (canal: string) => {
    const labels = {
      whatsapp: 'WhatsApp',
      site: 'Site',
      instagram: 'Instagram'
    };
    return labels[canal as keyof typeof labels] || canal;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chatbots</h1>
          <p className="text-muted-foreground">
            {filteredChatbots.length} chatbots configurados
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Chatbot
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
        <Select value={canalFilter} onValueChange={setCanalFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os canais</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="site">Site</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Chatbots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChatbots.map((bot) => (
          <Card key={bot.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getCanalIcon(bot.canal)}
                  <div>
                    <CardTitle className="text-lg">{bot.nome}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {getCanalLabel(bot.canal)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(bot.status)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Métricas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{bot.taxa_resolucao}%</p>
                  <p className="text-sm text-muted-foreground">Taxa Resolução</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{bot.interacoes_dia}</p>
                  <p className="text-sm text-muted-foreground">Interações/dia</p>
                </div>
              </div>

              {/* Progress Bar da Performance */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span>{bot.taxa_resolucao}%</span>
                </div>
                <Progress value={bot.taxa_resolucao} className="h-2" />
              </div>

              {/* Gatilhos */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Gatilhos Configurados:</h4>
                <div className="space-y-1">
                  {bot.gatilhos.map((gatilho, index) => (
                    <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                      {gatilho}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Preview do Fluxo */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Fluxo:</h4>
                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                  {bot.fluxo_preview}
                </p>
              </div>

              {/* Ações */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Testar Bot
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Métricas
                </Button>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Status do Bot</span>
                <div className="flex space-x-2">
                  <Button 
                    variant={bot.status === 'ativo' ? 'default' : 'outline'} 
                    size="sm"
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Ativar
                  </Button>
                  <Button 
                    variant={bot.status === 'inativo' ? 'default' : 'outline'} 
                    size="sm"
                  >
                    <Pause className="mr-1 h-3 w-3" />
                    Pausar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredChatbots.length === 0 && (
        <div className="text-center py-12">
          <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum chatbot encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou criar um novo chatbot.
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Chatbot
          </Button>
        </div>
      )}
    </div>
  );
}