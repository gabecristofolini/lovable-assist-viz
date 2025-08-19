import { useState } from 'react';
import { Search, Filter, Plus, Zap, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PipelineStage } from '@/components/PipelineStage';
import { CustomerAvatar } from '@/components/CustomerAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { mockData } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LeadsKanban() {
  const [searchTerm, setSearchTerm] = useState('');
  const [temperaturaFilter, setTemperaturaFilter] = useState('all');

  const { leads } = mockData;

  // Dados expandidos para o kanban
  const leadsKanban = [
    {
      id: 1,
      title: "João Silva - Tech Solutions",
      subtitle: "Origem: Black Friday > Banner A",
      value: "R$ 15.000",
      temperature: "quente",
      daysInStage: 2,
      nextAction: "Hoje 14h",
      avatar: "",
      tags: ["Meta", "Premium"],
      priority: "alta" as const
    },
    {
      id: 2,
      title: "Ana Costa - Startup XYZ",
      subtitle: "Origem: Google Shopping > CPC",
      value: "R$ 25.000",
      temperature: "morno",
      daysInStage: 5,
      nextAction: "Amanhã 10h",
      avatar: "",
      tags: ["Google", "SaaS"],
      priority: "normal" as const
    },
    {
      id: 3,
      title: "Pedro Santos - Indústria ABC",
      subtitle: "Origem: TikTok > Influencer Post",
      value: "R$ 45.000",
      temperature: "quente",
      daysInStage: 1,
      nextAction: "Hoje 16h",
      avatar: "",
      tags: ["TikTok", "B2B"],
      priority: "urgente" as const
    }
  ];

  // Organizar leads por estágio
  const stages = {
    novos: leadsKanban.filter(l => [1].includes(l.id)),
    qualificando: leadsKanban.filter(l => [2].includes(l.id)),
    qualificados: leadsKanban.filter(l => [3].includes(l.id)),
    negociacao: [],
    convertidos: [],
    perdidos: []
  };

  const stageConfig = [
    {
      id: 'novos',
      title: 'Novos',
      items: stages.novos,
      color: 'bg-blue-100',
      count: stages.novos.length
    },
    {
      id: 'qualificando',
      title: 'Qualificando',
      items: stages.qualificando,
      color: 'bg-yellow-100',
      count: stages.qualificando.length
    },
    {
      id: 'qualificados',
      title: 'Qualificados',
      items: stages.qualificados,
      color: 'bg-green-100',
      count: stages.qualificados.length
    },
    {
      id: 'negociacao',
      title: 'Em Negociação',
      items: stages.negociacao,
      color: 'bg-orange-100',
      count: stages.negociacao.length
    },
    {
      id: 'convertidos',
      title: 'Convertidos',
      items: stages.convertidos,
      color: 'bg-green-200',
      count: stages.convertidos.length
    },
    {
      id: 'perdidos',
      title: 'Perdidos',
      items: stages.perdidos,
      color: 'bg-red-100',
      count: stages.perdidos.length
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pipeline de Leads</h1>
          <p className="text-muted-foreground">
            Acompanhe a jornada completa dos seus leads
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Ligar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Resumo das Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {stageConfig.map((stage) => (
          <div key={stage.id} className="text-center">
            <div className="text-2xl font-bold text-foreground">{stage.count}</div>
            <div className="text-sm text-muted-foreground">{stage.title}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={temperaturaFilter} onValueChange={setTemperaturaFilter}>
          <SelectTrigger className="w-48">
            <Zap className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Temperatura" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="quente">🔥 Quente</SelectItem>
            <SelectItem value="morno">⚡ Morno</SelectItem>
            <SelectItem value="frio">❄️ Frio</SelectItem>
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
            onAddItem={() => console.log(`Adicionar lead em ${stage.title}`)}
            onItemClick={(item) => console.log('Clicked item:', item)}
          />
        ))}
      </div>

      {/* Ações Rápidas */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Ações Rápidas</h3>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Ligar para Leads Quentes
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Enviar Follow-up em Massa
          </Button>
          <Button size="sm" variant="outline">
            <Zap className="mr-2 h-4 w-4" />
            Identificar Leads Frios
          </Button>
        </div>
      </div>
    </div>
  );
}