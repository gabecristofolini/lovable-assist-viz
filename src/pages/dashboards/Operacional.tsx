import { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle, Users, Target, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const eventosCalendario = [
  {
    id: 1,
    data: '2024-01-20',
    tipo: 'reuniao',
    titulo: 'Reunião com Tech Solutions',
    hora: '14:00',
    responsavel: 'Ana Silva',
    prioridade: 'alta',
    status: 'agendado'
  },
  {
    id: 2,
    data: '2024-01-20',
    tipo: 'follow-up',
    titulo: 'Follow-up Startup XYZ',
    hora: '16:30',
    responsavel: 'Carlos Mendes',
    prioridade: 'media',
    status: 'agendado'
  },
  {
    id: 3,
    data: '2024-01-21',
    tipo: 'entrega',
    titulo: 'Entrega Pedido #2024-003',
    hora: '10:00',
    responsavel: 'Logística',
    prioridade: 'alta',
    status: 'pendente'
  },
  {
    id: 4,
    data: '2024-01-21',
    tipo: 'ligacao',
    titulo: 'Ligação Pedro Santos',
    hora: '15:00',
    responsavel: 'Maria Oliveira',
    prioridade: 'baixa',
    status: 'agendado'
  },
  {
    id: 5,
    data: '2024-01-22',
    tipo: 'apresentacao',
    titulo: 'Apresentação Indústria ABC',
    hora: '09:30',
    responsavel: 'João Pedro',
    prioridade: 'alta',
    status: 'agendado'
  }
];

const alertasOperacionais = [
  {
    id: 1,
    tipo: 'leads_parados',
    titulo: 'Leads parados há mais de 3 dias',
    descricao: '8 leads sem interação',
    urgencia: 'alta',
    acao: 'Reagendar contato',
    responsaveis: ['Ana Silva', 'Carlos Mendes']
  },
  {
    id: 2,
    tipo: 'orcamentos_vencendo',
    titulo: 'Orçamentos vencendo',
    descricao: '5 orçamentos vencem hoje',
    urgencia: 'critica',
    acao: 'Renovar propostas',
    responsaveis: ['Maria Oliveira']
  },
  {
    id: 3,
    tipo: 'clientes_sem_contato',
    titulo: 'Clientes sem contato há 30 dias',
    descricao: '12 clientes inativos',
    urgencia: 'media',
    acao: 'Campanha de reativação',
    responsaveis: ['João Pedro', 'Fernanda Costa']
  },
  {
    id: 4,
    tipo: 'metas_risco',
    titulo: 'Metas em risco',
    descricao: '3 vendedores abaixo da meta',
    urgencia: 'alta',
    acao: 'Plano de ação',
    responsaveis: ['Gerência']
  }
];

const atividadesRecentes = [
  {
    id: 1,
    hora: '10:45',
    tipo: 'reuniao_concluida',
    descricao: 'Reunião com Beta Corp finalizada',
    responsavel: 'Ana Silva',
    resultado: 'Proposta aprovada'
  },
  {
    id: 2,
    hora: '10:30',
    tipo: 'lead_qualificado',
    descricao: 'Lead Digital Innovation qualificado',
    responsavel: 'Carlos Mendes',
    resultado: 'Agendada demonstração'
  },
  {
    id: 3,
    hora: '10:15',
    tipo: 'orcamento_enviado',
    descricao: 'Orçamento ORC-2024-006 enviado',
    responsavel: 'Maria Oliveira',
    resultado: 'R$ 35.000'
  },
  {
    id: 4,
    hora: '09:50',
    tipo: 'pedido_faturado',
    descricao: 'Pedido #2024-004 faturado',
    responsavel: 'Sistema',
    resultado: 'NF-e emitida'
  },
  {
    id: 5,
    hora: '09:30',
    tipo: 'follow_up',
    descricao: 'Follow-up com Gamma Enterprise',
    responsavel: 'João Pedro',
    resultado: 'Reagendado para amanhã'
  }
];

const metricasOperacionais = {
  atividadesHoje: 24,
  atividadesConcluidas: 18,
  leadsPendentes: 15,
  reunioesAgendadas: 8,
  followUpsAtrasados: 5,
  orcamentosVencendo: 3,
  produtividadeEquipe: 87,
  slaAtendimento: 94
};

export default function DashboardOperacional() {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [filtroUrgencia, setFiltroUrgencia] = useState('todas');

  const eventosDoDia = eventosCalendario.filter(evento => 
    evento.data === format(dataSelecionada, 'yyyy-MM-dd')
  );

  const alertasFiltrados = filtroUrgencia === 'todas' 
    ? alertasOperacionais 
    : alertasOperacionais.filter(alerta => alerta.urgencia === filtroUrgencia);

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case 'reuniao':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'follow-up':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'entrega':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ligacao':
        return <Bell className="h-4 w-4 text-purple-500" />;
      case 'apresentacao':
        return <Target className="h-4 w-4 text-orange-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getCorUrgencia = (urgencia: string) => {
    switch (urgencia) {
      case 'critica':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'alta':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconeAtividade = (tipo: string) => {
    switch (tipo) {
      case 'reuniao_concluida':
        return '✅';
      case 'lead_qualificado':
        return '🎯';
      case 'orcamento_enviado':
        return '💰';
      case 'pedido_faturado':
        return '📋';
      case 'follow_up':
        return '📞';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Operacional</h1>
          <p className="text-muted-foreground">Gestão de atividades e operações diárias</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Atividade
          </Button>
        </div>
      </div>

      {/* Métricas Operacionais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atividades Hoje</p>
                <p className="text-2xl font-bold">{metricasOperacionais.atividadesHoje}</p>
                <p className="text-xs text-green-600">{metricasOperacionais.atividadesConcluidas} concluídas</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leads Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{metricasOperacionais.leadsPendentes}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reuniões Hoje</p>
                <p className="text-2xl font-bold text-green-600">{metricasOperacionais.reunioesAgendadas}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Follow-ups Atrasados</p>
                <p className="text-2xl font-bold text-red-600">{metricasOperacionais.followUpsAtrasados}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layout Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário e Eventos */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={dataSelecionada}
                onSelect={(date) => date && setDataSelecionada(date)}
                locale={ptBR}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Eventos do Dia */}
          <Card>
            <CardHeader>
              <CardTitle>
                Eventos - {format(dataSelecionada, 'dd/MM/yyyy', { locale: ptBR })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventosDoDia.length > 0 ? (
                  eventosDoDia.map((evento) => (
                    <div key={evento.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      {getIconeTipo(evento.tipo)}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{evento.titulo}</p>
                        <p className="text-xs text-muted-foreground">
                          {evento.hora} - {evento.responsavel}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {evento.prioridade}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum evento agendado para este dia
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas e Atividades */}
        <div className="lg:col-span-2 space-y-6">
          {/* Alertas Inteligentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alertas Inteligentes</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant={filtroUrgencia === 'todas' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFiltroUrgencia('todas')}
                  >
                    Todas
                  </Button>
                  <Button 
                    variant={filtroUrgencia === 'critica' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFiltroUrgencia('critica')}
                  >
                    Críticas
                  </Button>
                  <Button 
                    variant={filtroUrgencia === 'alta' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFiltroUrgencia('alta')}
                  >
                    Altas
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertasFiltrados.map((alerta) => (
                  <div key={alerta.id} className={`p-4 border rounded-lg ${getCorUrgencia(alerta.urgencia)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{alerta.titulo}</h3>
                      <Badge variant="outline" className="text-xs">
                        {alerta.urgencia}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{alerta.descricao}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {alerta.responsaveis.map((responsavel, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {responsavel}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" variant="outline">
                        {alerta.acao}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline de Atividades */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atividadesRecentes.map((atividade) => (
                  <div key={atividade.id} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors">
                    <div className="text-xl">{getIconeAtividade(atividade.tipo)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{atividade.descricao}</p>
                        <span className="text-xs text-muted-foreground">{atividade.hora}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{atividade.responsavel}</p>
                      {atividade.resultado && (
                        <p className="text-xs text-green-600 mt-1">{atividade.resultado}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}