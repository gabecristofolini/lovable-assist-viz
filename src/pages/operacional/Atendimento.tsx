import { useState } from 'react';
import { Search, Filter, Upload, Plus, Users, Clock, TrendingUp, MessageSquare, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ViewToggle';
import { AtendimentoDetailsModal } from '@/components/AtendimentoDetailsModal';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { PipelineStage } from '@/components/PipelineStage';
import { CustomerAvatar } from '@/components/CustomerAvatar';
import { StatusChangeButton } from '@/components/StatusChangeButton';
import { mockData } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Atendimento() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [canalFilter, setCanalFilter] = useState('all');
  const [responsavelFilter, setResponsavelFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [selectedConversa, setSelectedConversa] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Dados das conversas de atendimento
  const conversasAtendimento = [
    {
      id: 1,
      nome: "Maria Santos",
      telefone: "(11) 99999-9999",
      ultimaMensagem: "Preciso de um orçamento para 50 unidades",
      hora: "10:45",
      naoLidas: 3,
      online: true,
      canal: "whatsapp",
      status: "novo",
      origem_lead: "Black Friday > Banner A",
      cliente_desde: "Novo",
      ultimo_pedido: null,
      tempo_espera: "2 min",
      tags: ["Novo", "Urgente"],
      sentimento: "positivo",
      empresa: "Tech Solutions Ltda",
      email: "maria@techsolutions.com",
      responsavel: "Ana Silva"
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      telefone: "(11) 88888-8888",
      ultimaMensagem: "Obrigado pelo atendimento!",
      hora: "09:30",
      naoLidas: 0,
      online: true,
      canal: "instagram",
      status: "em_atendimento",
      origem_lead: "TikTok > Influencer",
      cliente_desde: "3 anos",
      ultimo_pedido: "R$ 4.500 há 15 dias",
      tempo_espera: null,
      tags: ["Premium", "Recorrente"],
      sentimento: "positivo",
      empresa: "Marketing Digital SA",
      email: "carlos@marketingdigital.com",
      responsavel: "João Santos"
    },
    {
      id: 3,
      nome: "Ana Costa",
      telefone: "(11) 77777-7777",
      ultimaMensagem: "Quando vocês conseguem entregar?",
      hora: "Ontem",
      naoLidas: 1,
      online: false,
      canal: "site",
      status: "aguardando_retorno",
      origem_lead: "Google Ads > CPC",
      cliente_desde: "1 ano",
      ultimo_pedido: "R$ 8.200 há 2 meses",
      tempo_espera: "1h 30min",
      tags: ["B2B"],
      sentimento: "neutro",
      empresa: "Indústria ABC",
      email: "ana@industriaabc.com",
      responsavel: "Pedro Silva",
      motivo: "Não respondeu aos contatos",
      dataAlteracao: "2024-01-19"
    },
    {
      id: 4,
      nome: "Roberto Lima",
      telefone: "(11) 66666-6666",
      ultimaMensagem: "Gostei da proposta, vamos conversar mais",
      hora: "2h atrás",
      naoLidas: 2,
      online: true,
      canal: "whatsapp",
      status: "em_negociacao",
      origem_lead: "Meta Ads > Carousel",
      cliente_desde: "6 meses",
      ultimo_pedido: "R$ 12.000 há 3 meses",
      tempo_espera: "15 min",
      tags: ["Negociação", "Alto Valor"],
      sentimento: "positivo",
      empresa: "Consultoria Beta",
      email: "roberto@consultoriabeta.com",
      responsavel: "Maria Silva"
    }
  ];

  const filteredConversas = conversasAtendimento.filter(conversa => {
    const matchesSearch = conversa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversa.telefone.includes(searchTerm) ||
                         conversa.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conversa.status === statusFilter;
    const matchesCanal = canalFilter === 'all' || conversa.canal === canalFilter;
    const matchesResponsavel = responsavelFilter === 'all' || conversa.responsavel === responsavelFilter;
    return matchesSearch && matchesStatus && matchesCanal && matchesResponsavel;
  });

  const columns = [
    {
      key: 'nome',
      label: 'Cliente',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <CustomerAvatar name={value} size="sm" online={row.online} />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.empresa}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'telefone',
      label: 'Telefone',
    },
    {
      key: 'canal',
      label: 'Canal',
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    {
      key: 'ultimaMensagem',
      label: 'Última Mensagem',
      render: (value: string) => (
        <div className="max-w-xs truncate">{value}</div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string, row: any) => (
        <StatusChangeButton
          currentStatus={value}
          itemTitle={`${row.nome} - ${row.empresa}`}
          tipo="atendimento"
          onStatusChange={(novoStatus, motivo) => handleStatusChange(row.id, novoStatus, motivo)}
        />
      ),
    },
    {
      key: 'naoLidas',
      label: 'Não Lidas',
      sortable: true,
      render: (value: number) => value > 0 ? (
        <Badge className="bg-red-100 text-red-600">{value}</Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      ),
    },
    {
      key: 'responsavel',
      label: 'Responsável',
      sortable: true,
    },
    {
      key: 'hora',
      label: 'Última Atividade',
      sortable: true,
    },
  ];

  const handleStatusChange = (conversaId: number, novoStatus: string, motivo?: string) => {
    console.log('Alterando status da conversa:', conversaId, 'para:', novoStatus, 'motivo:', motivo);
    // Aqui você implementaria a lógica para atualizar o status no backend
  };

  const handleView = (conversa: any) => {
    setSelectedConversa(conversa);
    setDetailsOpen(true);
  };

  const handleEdit = (conversa: any) => {
    console.log('Editando conversa:', conversa);
  };

  const handleDelete = (conversa: any) => {
    console.log('Excluindo conversa:', conversa);
  };

  // Estatísticas de atendimento
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
      icon: MessageSquare,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Em Negociação',
      value: '6',
      change: { value: 2, type: 'up' as const },
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Aguardando Retorno',
      value: '12',
      change: { value: -3, type: 'down' as const },
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Aguardando Cliente',
      value: '9',
      change: { value: 8, type: 'up' as const },
      icon: Clock,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Tempo Médio de Resposta',
      value: '2.5min',
      change: { value: -15, type: 'down' as const },
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  // Organizar conversas por estágio para o kanban
  const stages = {
    novos: filteredConversas.filter(c => c.status === 'novo'),
    em_atendimento: filteredConversas.filter(c => c.status === 'em_atendimento'),
    em_negociacao: filteredConversas.filter(c => c.status === 'em_negociacao'),
    aguardando_retorno: filteredConversas.filter(c => c.status === 'aguardando_retorno'),
    aguardando_cliente: filteredConversas.filter(c => c.status === 'aguardando_cliente'),
    finalizado: filteredConversas.filter(c => c.status === 'finalizado'),
  };

  const stageConfig = [
    {
      id: 'novos',
      title: 'Novos',
      items: stages.novos.map(conversa => ({
        id: conversa.id,
        title: `${conversa.nome} - ${conversa.empresa}`,
        subtitle: `${conversa.canal} • ${conversa.telefone}`,
        value: conversa.naoLidas > 0 ? `${conversa.naoLidas} não lidas` : 'Lidas',
        temperature: conversa.sentimento === 'positivo' ? 'quente' : conversa.sentimento === 'neutro' ? 'morno' : 'frio',
        daysInStage: 1,
        nextAction: conversa.hora,
        avatar: '',
        tags: conversa.tags,
        priority: conversa.naoLidas > 0 ? 'alta' as const : 'normal' as const
      })),
      color: 'bg-blue-100',
      count: stages.novos.length
    },
    {
      id: 'em_atendimento',
      title: 'Em Atendimento',
      items: stages.em_atendimento.map(conversa => ({
        id: conversa.id,
        title: `${conversa.nome} - ${conversa.empresa}`,
        subtitle: `${conversa.canal} • ${conversa.telefone}`,
        value: conversa.tempo_espera || 'Ativo',
        temperature: conversa.sentimento === 'positivo' ? 'quente' : conversa.sentimento === 'neutro' ? 'morno' : 'frio',
        daysInStage: 1,
        nextAction: 'Agora',
        avatar: '',
        tags: conversa.tags,
        priority: 'alta' as const
      })),
      color: 'bg-green-100',
      count: stages.em_atendimento.length
    },
    {
      id: 'em_negociacao',
      title: 'Em Negociação',
      items: stages.em_negociacao.map(conversa => ({
        id: conversa.id,
        title: `${conversa.nome} - ${conversa.empresa}`,
        subtitle: `${conversa.canal} • ${conversa.telefone}`,
        value: conversa.ultimo_pedido || 'Negociando',
        temperature: 'quente',
        daysInStage: 2,
        nextAction: 'Hoje',
        avatar: '',
        tags: conversa.tags,
        priority: 'urgente' as const
      })),
      color: 'bg-orange-100',
      count: stages.em_negociacao.length
    },
    {
      id: 'aguardando_retorno',
      title: 'Aguardando Retorno',
      items: stages.aguardando_retorno.map(conversa => ({
        id: conversa.id,
        title: `${conversa.nome} - ${conversa.empresa}`,
        subtitle: `${conversa.canal} • ${conversa.telefone}`,
        value: conversa.tempo_espera || 'Aguardando',
        temperature: 'morno',
        daysInStage: 3,
        nextAction: 'Follow-up',
        avatar: '',
        tags: conversa.tags,
        priority: 'normal' as const
      })),
      color: 'bg-yellow-100',
      count: stages.aguardando_retorno.length
    },
    {
      id: 'aguardando_cliente',
      title: 'Aguardando Cliente',
      items: stages.aguardando_cliente.map(conversa => ({
        id: conversa.id,
        title: `${conversa.nome} - ${conversa.empresa}`,
        subtitle: `${conversa.canal} • ${conversa.telefone}`,
        value: 'Cliente decide',
        temperature: 'morno',
        daysInStage: 5,
        nextAction: 'Aguardar',
        avatar: '',
        tags: conversa.tags,
        priority: 'baixa' as const
      })),
      color: 'bg-purple-100',
      count: stages.aguardando_cliente.length
    },
    {
      id: 'finalizado',
      title: 'Finalizados',
      items: stages.finalizado.map(conversa => ({
        id: conversa.id,
        title: `${conversa.nome} - ${conversa.empresa}`,
        subtitle: `${conversa.canal} • ${conversa.telefone}`,
        value: 'Concluído',
        temperature: 'frio',
        daysInStage: 0,
        nextAction: '-',
        avatar: '',
        tags: ['Finalizado'],
        priority: 'baixa' as const
      })),
      color: 'bg-gray-100',
      count: stages.finalizado.length
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Atendimento</h1>
          <p className="text-muted-foreground">
            {filteredConversas.length} conversas encontradas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ViewToggle view={view} onViewChange={setView} />
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Exportar Relatório
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
            placeholder="Buscar por nome, empresa ou telefone..."
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
            <SelectItem value="novo">Novo</SelectItem>
            <SelectItem value="em_atendimento">Em Atendimento</SelectItem>
            <SelectItem value="em_negociacao">Em Negociação</SelectItem>
            <SelectItem value="aguardando_retorno">Aguardando Retorno</SelectItem>
            <SelectItem value="aguardando_cliente">Aguardando Cliente</SelectItem>
            <SelectItem value="finalizado">Finalizado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={canalFilter} onValueChange={setCanalFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os canais</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="site">Site</SelectItem>
            <SelectItem value="telefone">Telefone</SelectItem>
          </SelectContent>
        </Select>
        <Select value={responsavelFilter} onValueChange={setResponsavelFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Responsável" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Ana Silva">Ana Silva</SelectItem>
            <SelectItem value="João Santos">João Santos</SelectItem>
            <SelectItem value="Pedro Silva">Pedro Silva</SelectItem>
            <SelectItem value="Maria Silva">Maria Silva</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content - Lista ou Kanban */}
      {view === 'list' ? (
        <DataTable
          data={filteredConversas}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRowClick={handleView}
        />
      ) : (
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
                if (conversa) handleView(conversa);
              }}
            />
          ))}
        </div>
      )}

      <AtendimentoDetailsModal
        conversa={selectedConversa}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}