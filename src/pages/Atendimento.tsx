import { useState } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, Circle, Search, Filter, Upload, Plus, Users, Clock, MessageSquare, UserCheck, Headphones, AlertCircle, CheckCircle, LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ViewToggle';
import { AtendimentoDetailsModal } from '@/components/AtendimentoDetailsModal';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { PipelineStage } from '@/components/PipelineStage';
import { mockData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Atendimento() {
  const [selectedConversaId, setSelectedConversaId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedConversa, setSelectedConversa] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const { conversas, mensagens } = mockData;
  const currentConversa = conversas.find(c => c.id === selectedConversaId);
  const conversaMensagens = mensagens.filter(m => m.conversaId === selectedConversaId);

  // Filtrar conversas
  const filteredConversas = conversas.filter(conversa => {
    const matchesSearch = conversa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversa.telefone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'novos' && conversa.naoLidas > 0) ||
                         (statusFilter === 'atendimento' && conversa.online);
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Simulate sending message
    console.log('Enviando mensagem:', newMessage);
    setNewMessage('');
  };

  const handleViewDetails = (conversa: any) => {
    setSelectedConversa(conversa);
    setDetailsOpen(true);
  };

  // Estatísticas rápidas dos atendimentos
  const atendimentoStats = [
    {
      title: 'Novos',
      value: '8',
      change: { value: 12, type: 'up' as const },
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Em Atendimento',
      value: '15',
      change: { value: 5, type: 'up' as const },
      icon: Headphones,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Em Negociação',
      value: '6',
      change: { value: -2, type: 'down' as const },
      icon: MessageSquare,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Aguardando Retorno',
      value: '12',
      change: { value: 8, type: 'up' as const },
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Aguardando Cliente',
      value: '4',
      change: { value: -10, type: 'down' as const },
      icon: AlertCircle,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Tempo Médio Resposta',
      value: '3.2min',
      change: { value: -15, type: 'down' as const },
      icon: CheckCircle,
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  // Organizar conversas por estágio para kanban
  const stages = {
    novos: filteredConversas.filter(c => c.naoLidas > 0),
    atendimento: filteredConversas.filter(c => c.online && c.naoLidas === 0),
    negociacao: filteredConversas.filter(c => !c.online && Math.random() > 0.7),
    aguardando: filteredConversas.filter(c => !c.online && Math.random() > 0.5),
  };

  const stageConfig = [
    {
      id: 'novos',
      title: 'Novos',
      items: stages.novos.map(conversa => ({
        id: conversa.id,
        title: conversa.nome,
        subtitle: conversa.telefone,
        value: `${conversa.naoLidas} mensagens`,
        temperature: 'quente',
        daysInStage: 1,
        nextAction: 'Responder',
        avatar: '',
        tags: ['WhatsApp'],
        priority: 'alta' as const
      })),
      color: 'bg-blue-100',
      count: stages.novos.length
    },
    {
      id: 'atendimento',
      title: 'Em Atendimento',
      items: stages.atendimento.map(conversa => ({
        id: conversa.id,
        title: conversa.nome,
        subtitle: conversa.telefone,
        value: 'Online',
        temperature: 'morno',
        daysInStage: 1,
        nextAction: 'Em chat',
        avatar: '',
        tags: ['Ativo'],
        priority: 'normal' as const
      })),
      color: 'bg-green-100',
      count: stages.atendimento.length
    },
    {
      id: 'negociacao',
      title: 'Em Negociação',
      items: stages.negociacao.map(conversa => ({
        id: conversa.id,
        title: conversa.nome,
        subtitle: conversa.telefone,
        value: 'Proposta enviada',
        temperature: 'quente',
        daysInStage: 2,
        nextAction: 'Follow-up',
        avatar: '',
        tags: ['Negociação'],
        priority: 'alta' as const
      })),
      color: 'bg-orange-100',
      count: stages.negociacao.length
    },
    {
      id: 'aguardando',
      title: 'Aguardando',
      items: stages.aguardando.map(conversa => ({
        id: conversa.id,
        title: conversa.nome,
        subtitle: conversa.telefone,
        value: 'Aguardando retorno',
        temperature: 'frio',
        daysInStage: 3,
        nextAction: 'Aguardar',
        avatar: '',
        tags: ['Pendente'],
        priority: 'baixa' as const
      })),
      color: 'bg-yellow-100',
      count: stages.aguardando.length
    }
  ];

  if (view === 'list') {
    return (
      <div className="h-[calc(100vh-8rem)] flex bg-background rounded-lg border">
        {/* Lista de Conversas */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Conversas</h2>
            <p className="text-sm text-muted-foreground">
              {conversas.filter(c => c.naoLidas > 0).length} não lidas
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversas.map((conversa) => (
              <div
                key={conversa.id}
                className={cn(
                  "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
                  selectedConversaId === conversa.id && "bg-muted"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>
                        {conversa.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversa.online && (
                      <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-success text-success" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conversa.nome}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(conversa);
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          Detalhes
                        </Button>
                        <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                        {conversa.naoLidas > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                            {conversa.naoLidas}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversa.ultimaMensagem}
                    </p>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedConversaId(conversa.id)}
                  className="absolute inset-0"
                />
              </div>
            ))}
          </div>
      </div>

          {/* Área de Chat */}
          <div className="flex-1 flex flex-col">
            {currentConversa ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedConversa.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                  <div>
                    <h3 className="font-medium">{currentConversa.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentConversa.online ? 'Online' : 'Offline'} • {currentConversa.telefone}
                    </p>
                  </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversaMensagens.map((mensagem) => (
                <div
                  key={mensagem.id}
                  className={cn(
                    "flex",
                    mensagem.remetente === 'atendente' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                      mensagem.remetente === 'atendente'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{mensagem.texto}</p>
                    <p className="text-xs mt-1 opacity-70">{mensagem.hora}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* IA Suggestion */}
            <div className="px-4 py-2 bg-accent/50 border-y border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Resposta sugerida:</span>
                <span className="text-sm">"Posso agendar uma demonstração para você?"</span>
                <Button size="sm" variant="outline" className="ml-auto">
                  Usar
                </Button>
              </div>
            </div>

            {/* Input de Mensagem */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Selecione uma conversa para começar</p>
          </div>
        )}
      </div>

          {/* Painel Lateral Direito */}
          <div className="w-64 border-l border-border p-4 space-y-6">
            {currentConversa && (
          <>
            {/* Resumo do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Resumo do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground">Nome:</span>
                    <p className="text-sm font-medium">{currentConversa.nome}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Telefone:</span>
                    <p className="text-sm">{currentConversa.telefone}</p>
                  </div>
                <div>
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="text-xs">
                    Lead Qualificado
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">WhatsApp</Badge>
                  <Badge variant="secondary" className="text-xs">Consultoria</Badge>
                  <Badge variant="secondary" className="text-xs">Urgente</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Pedidos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pedidos Anteriores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-muted rounded text-xs">
                  <p className="font-medium">#2023-145</p>
                  <p className="text-muted-foreground">R$ 8.500 - Concluído</p>
                </div>
                <div className="p-2 bg-muted rounded text-xs">
                  <p className="font-medium">#2023-098</p>
                  <p className="text-muted-foreground">R$ 12.000 - Concluído</p>
                </div>
              </CardContent>
            </Card>
          </>
            )}
          </div>

          <AtendimentoDetailsModal
            conversa={selectedConversa}
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
          />
        </div>
      );
    }

    // Visão Kanban
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Atendimento ao Cliente</h1>
            <p className="text-muted-foreground">
              {filteredConversas.length} conversas encontradas
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ViewToggle view={view} onViewChange={setView} />
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar Contatos
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Conversa
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStatsGrid stats={atendimentoStats} columns={6} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou telefone..."
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
              <SelectItem value="novos">Novos</SelectItem>
              <SelectItem value="atendimento">Em Atendimento</SelectItem>
              <SelectItem value="aguardando">Aguardando</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pipeline Kanban */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stageConfig.map((stage) => (
            <PipelineStage
              key={stage.id}
              title={stage.title}
              count={stage.count}
              items={stage.items}
              color={stage.color}
              onAddItem={() => console.log(`Adicionar conversa em ${stage.title}`)}
              onItemClick={(item) => {
                const conversa = filteredConversas.find(c => c.id === item.id);
                if (conversa) handleViewDetails(conversa);
              }}
            />
          ))}
        </div>

        <AtendimentoDetailsModal
          conversa={selectedConversa}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    );
  }