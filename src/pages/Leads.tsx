import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Upload, Plus, Users, Clock, DollarSign, TrendingUp, Flame, Snowflake, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ViewToggle';
import { LeadDetailsModal } from '@/components/LeadDetailsModal';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import { PipelineStage } from '@/components/PipelineStage';
import { mockData, getStatusColor, getStatusLabel } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const navigate = useNavigate();

  const { leads } = mockData;

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'nome',
      label: 'Nome',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.empresa}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'telefone',
      label: 'Telefone',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {getStatusLabel(value)}
        </Badge>
      ),
    },
    {
      key: 'valor',
      label: 'Valor',
      render: (value: number) => `R$ ${value.toLocaleString()}`,
    },
    {
      key: 'responsavel',
      label: 'Responsável',
    },
    {
      key: 'ultimaInteracao',
      label: 'Última Interação',
    },
  ];

  const handleView = (lead: any) => {
    setSelectedLead(lead);
    setDetailsOpen(true);
  };

  const handleEdit = (lead: any) => {
    console.log('Editando lead:', lead);
  };

  const handleDelete = (lead: any) => {
    console.log('Excluindo lead:', lead);
  };

  // Estatísticas rápidas dos leads
  const leadStats = [
    {
      title: 'Novos',
      value: '12',
      change: { value: 8, type: 'up' as const },
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Em Negociação',
      value: '8',
      change: { value: 2, type: 'up' as const },
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Aguardando Retorno',
      value: '15',
      change: { value: -5, type: 'down' as const },
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Aguardando Cliente',
      value: '6',
      change: { value: 12, type: 'up' as const },
      icon: Target,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Aguardando Orçamento',
      value: '4',
      change: { value: -10, type: 'down' as const },
      icon: DollarSign,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Leads Frios',
      value: '23',
      change: { value: 15, type: 'up' as const },
      icon: Snowflake,
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      title: 'Leads Quentes',
      value: '18',
      change: { value: 5, type: 'up' as const },
      icon: Flame,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Leads Fechados',
      value: '32',
      change: { value: 22, type: 'up' as const },
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    }
  ];

  // Organizar leads por estágio para o kanban
  const stages = {
    novos: filteredLeads.filter(l => l.status === 'novo'),
    qualificando: filteredLeads.filter(l => l.status === 'qualificado'),
    negociacao: filteredLeads.filter(l => l.status === 'negociacao'),
    perdidos: filteredLeads.filter(l => l.status === 'perdido'),
  };

  const stageConfig = [
    {
      id: 'novos',
      title: 'Novos',
      items: stages.novos.map(lead => ({
        id: lead.id,
        title: `${lead.nome} - ${lead.empresa}`,
        subtitle: `${lead.email}`,
        value: `R$ ${lead.valor.toLocaleString()}`,
        temperature: Math.random() > 0.5 ? 'quente' : 'morno',
        daysInStage: Math.floor(Math.random() * 7) + 1,
        nextAction: 'Hoje 14h',
        avatar: '',
        tags: ['Meta', 'Premium'],
        priority: 'alta' as const
      })),
      color: 'bg-blue-100',
      count: stages.novos.length
    },
    {
      id: 'qualificando',
      title: 'Qualificados',
      items: stages.qualificando.map(lead => ({
        id: lead.id,
        title: `${lead.nome} - ${lead.empresa}`,
        subtitle: `${lead.email}`,
        value: `R$ ${lead.valor.toLocaleString()}`,
        temperature: Math.random() > 0.5 ? 'quente' : 'morno',
        daysInStage: Math.floor(Math.random() * 7) + 1,
        nextAction: 'Amanhã 10h',
        avatar: '',
        tags: ['Google', 'SaaS'],
        priority: 'normal' as const
      })),
      color: 'bg-green-100',
      count: stages.qualificando.length
    },
    {
      id: 'negociacao',
      title: 'Em Negociação',
      items: stages.negociacao.map(lead => ({
        id: lead.id,
        title: `${lead.nome} - ${lead.empresa}`,
        subtitle: `${lead.email}`,
        value: `R$ ${lead.valor.toLocaleString()}`,
        temperature: Math.random() > 0.5 ? 'quente' : 'morno',
        daysInStage: Math.floor(Math.random() * 7) + 1,
        nextAction: 'Hoje 16h',
        avatar: '',
        tags: ['TikTok', 'B2B'],
        priority: 'urgente' as const
      })),
      color: 'bg-orange-100',
      count: stages.negociacao.length
    },
    {
      id: 'perdidos',
      title: 'Perdidos',
      items: stages.perdidos.map(lead => ({
        id: lead.id,
        title: `${lead.nome} - ${lead.empresa}`,
        subtitle: `${lead.email}`,
        value: `R$ ${lead.valor.toLocaleString()}`,
        temperature: 'frio',
        daysInStage: Math.floor(Math.random() * 30) + 1,
        nextAction: '-',
        avatar: '',
        tags: ['Perdido'],
        priority: 'baixa' as const
      })),
      color: 'bg-red-100',
      count: stages.perdidos.length
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground">
            {filteredLeads.length} leads encontrados
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ViewToggle view={view} onViewChange={setView} />
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={leadStats} columns={8} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, empresa ou email..."
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
            <SelectItem value="qualificado">Qualificado</SelectItem>
            <SelectItem value="negociacao">Negociação</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content - Lista ou Kanban */}
      {view === 'list' ? (
        <DataTable
          data={filteredLeads}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
              onAddItem={() => console.log(`Adicionar lead em ${stage.title}`)}
              onItemClick={(item) => {
                const lead = filteredLeads.find(l => l.id === item.id);
                if (lead) handleView(lead);
              }}
            />
          ))}
        </div>
      )}

      <LeadDetailsModal
        lead={selectedLead}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}