import { useState } from 'react';
import { Users, Target, Clock, TrendingUp, MessageSquare, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  LineChart,
  Line
} from 'recharts';

const funivelData = [
  { name: 'Leads', value: 234, fill: '#3b82f6' },
  { name: 'Qualificados', value: 156, fill: '#10b981' },
  { name: 'Orçamentos', value: 78, fill: '#f59e0b' },
  { name: 'Negociação', value: 45, fill: '#ef4444' },
  { name: 'Fechados', value: 28, fill: '#8b5cf6' }
];

const atendimentoPorHora = [
  { hora: '08h', whatsapp: 12, email: 5, telefone: 3 },
  { hora: '09h', whatsapp: 25, email: 8, telefone: 6 },
  { hora: '10h', whatsapp: 35, email: 12, telefone: 8 },
  { hora: '11h', whatsapp: 42, email: 15, telefone: 10 },
  { hora: '12h', whatsapp: 28, email: 8, telefone: 5 },
  { hora: '13h', whatsapp: 18, email: 4, telefone: 2 },
  { hora: '14h', whatsapp: 38, email: 14, telefone: 9 },
  { hora: '15h', whatsapp: 45, email: 18, telefone: 12 },
  { hora: '16h', whatsapp: 48, email: 20, telefone: 14 },
  { hora: '17h', whatsapp: 35, email: 12, telefone: 8 },
  { hora: '18h', whatsapp: 22, email: 6, telefone: 4 }
];

const leadsPorOrigem = [
  { origem: 'Meta Ads', leads: 89, conversoes: 34, taxa: 38.2 },
  { origem: 'Google Ads', leads: 67, conversoes: 28, taxa: 41.8 },
  { origem: 'TikTok', leads: 45, conversoes: 15, taxa: 33.3 },
  { origem: 'LinkedIn', leads: 23, conversoes: 12, taxa: 52.2 },
  { origem: 'Indicação', leads: 18, conversoes: 14, taxa: 77.8 },
  { origem: 'Site Orgânico', leads: 12, conversoes: 5, taxa: 41.7 }
];

const tempoResposta = [
  { canal: 'WhatsApp', tempo: 2.5, meta: 5, status: 'sucesso' },
  { canal: 'Email', tempo: 4.2, meta: 8, status: 'sucesso' },
  { canal: 'Telefone', tempo: 1.8, meta: 3, status: 'sucesso' },
  { canal: 'Chat Site', tempo: 3.1, meta: 5, status: 'sucesso' }
];

const alertasInteligentes = [
  { tipo: 'urgente', titulo: 'Leads parados há mais de 3 dias', quantidade: 8, cor: 'bg-red-100 text-red-800' },
  { tipo: 'atencao', titulo: 'Orçamentos vencendo hoje', quantidade: 5, cor: 'bg-yellow-100 text-yellow-800' },
  { tipo: 'oportunidade', titulo: 'Clientes sem contato há 30 dias', quantidade: 12, cor: 'bg-blue-100 text-blue-800' },
  { tipo: 'meta', titulo: 'Metas em risco este mês', quantidade: 3, cor: 'bg-orange-100 text-orange-800' }
];

export default function DashboardComercial() {
  const [periodo, setPeriodo] = useState('mes');

  const metricas = {
    novoLeadsHoje: 12,
    emAtendimento: 8,
    resolvidosHoje: 15,
    leadsFrios: 25,
    tempoMedioResposta: 3.2,
    taxaResolucao: 68,
    slaAtendimento: 94,
    leadsPerdidos: 7
  };

  const calcularConversao = (atual: number, anterior: number) => {
    return ((atual / anterior) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Comercial</h1>
          <p className="text-muted-foreground">Análise de performance comercial e atendimento</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={periodo === 'hoje' ? 'default' : 'outline'}
            onClick={() => setPeriodo('hoje')}
          >
            Hoje
          </Button>
          <Button 
            variant={periodo === 'semana' ? 'default' : 'outline'}
            onClick={() => setPeriodo('semana')}
          >
            Semana
          </Button>
          <Button 
            variant={periodo === 'mes' ? 'default' : 'outline'}
            onClick={() => setPeriodo('mes')}
          >
            Mês
          </Button>
        </div>
      </div>

      {/* Funil de Conversão Visual */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {funivelData.map((stage, index) => {
              const nextStage = funivelData[index + 1];
              const conversao = nextStage ? calcularConversao(nextStage.value, stage.value) : null;
              
              return (
                <div key={stage.name} className="text-center">
                  <div 
                    className="rounded-lg p-6 mb-3 text-white font-bold text-2xl"
                    style={{ backgroundColor: stage.fill }}
                  >
                    {stage.value}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{stage.name}</h3>
                  {conversao && (
                    <div className="flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">↓ {conversao}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Atendimento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Novos Hoje</p>
                <p className="text-3xl font-bold text-blue-600">{metricas.novoLeadsHoje}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Atendimento</p>
                <p className="text-3xl font-bold text-yellow-600">{metricas.emAtendimento}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolvidos</p>
                <p className="text-3xl font-bold text-green-600">{metricas.resolvidosHoje}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leads Frios</p>
                <p className="text-3xl font-bold text-red-600">{metricas.leadsFrios}</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row com gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume por Horário */}
        <Card>
          <CardHeader>
            <CardTitle>Volume de Atendimento por Horário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={atendimentoPorHora}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="hora" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="whatsapp" stackId="a" fill="#25d366" name="WhatsApp" />
                  <Bar dataKey="email" stackId="a" fill="#3b82f6" name="Email" />
                  <Bar dataKey="telefone" stackId="a" fill="#8b5cf6" name="Telefone" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance por Origem */}
        <Card>
          <CardHeader>
            <CardTitle>Leads por Origem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsPorOrigem.map((origem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{origem.origem}</span>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">{origem.leads} leads</span>
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          {origem.taxa}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={origem.taxa} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA e Tempo de Resposta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tempoResposta.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {item.canal === 'WhatsApp' && <MessageSquare className="h-5 w-5 text-green-500" />}
                    {item.canal === 'Email' && <Mail className="h-5 w-5 text-blue-500" />}
                    {item.canal === 'Telefone' && <Phone className="h-5 w-5 text-purple-500" />}
                    {item.canal === 'Chat Site' && <MessageSquare className="h-5 w-5 text-orange-500" />}
                    <span className="font-medium">{item.canal}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.tempo} min</p>
                    <p className="text-xs text-muted-foreground">Meta: {item.meta} min</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas de Qualidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Taxa de Resolução 1º Contato</span>
                  <span className="text-sm font-bold">{metricas.taxaResolucao}%</span>
                </div>
                <Progress value={metricas.taxaResolucao} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">SLA Atendimento</span>
                  <span className="text-sm font-bold">{metricas.slaAtendimento}%</span>
                </div>
                <Progress value={metricas.slaAtendimento} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{metricas.tempoMedioResposta} min</p>
                  <p className="text-sm text-muted-foreground">Tempo Médio</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{metricas.leadsPerdidos}</p>
                  <p className="text-sm text-muted-foreground">Perdidos Hoje</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Inteligentes */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Inteligentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {alertasInteligentes.map((alerta, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={alerta.cor}>
                    {alerta.quantidade}
                  </Badge>
                  {alerta.tipo === 'urgente' && <span className="text-red-500">🚨</span>}
                  {alerta.tipo === 'atencao' && <span className="text-yellow-500">⚠️</span>}
                  {alerta.tipo === 'oportunidade' && <span className="text-blue-500">💡</span>}
                  {alerta.tipo === 'meta' && <span className="text-orange-500">📊</span>}
                </div>
                <p className="text-sm font-medium">{alerta.titulo}</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                  Ver detalhes →
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}