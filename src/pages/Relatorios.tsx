import { useState } from 'react';
import { BarChart3, TrendingUp, Target, Users, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/StatsCard';
import { DataTable } from '@/components/DataTable';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';

const pipelineData = [
  { stage: 'Prospecção', count: 45, value: 450000 },
  { stage: 'Qualificação', count: 32, value: 320000 },
  { stage: 'Apresentação', count: 24, value: 480000 },
  { stage: 'Negociação', count: 18, value: 540000 },
  { stage: 'Fechado', count: 12, value: 480000 }
];

const metricasData = [
  { mes: 'Jan', vendas: 85000, leads: 120, conversao: 28 },
  { mes: 'Fev', vendas: 92000, leads: 135, conversao: 32 },
  { mes: 'Mar', vendas: 78000, leads: 145, conversao: 25 },
  { mes: 'Abr', vendas: 105000, leads: 160, conversao: 35 },
  { mes: 'Mai', vendas: 110000, leads: 155, conversao: 38 },
  { mes: 'Jun', vendas: 125000, leads: 180, conversao: 42 }
];

const vendedoresRanking = [
  { nome: 'Ana Silva', vendas: 285000, leads: 45, conversao: 42 },
  { nome: 'Carlos Mendes', vendas: 265000, leads: 52, conversao: 38 },
  { nome: 'Maria Oliveira', vendas: 245000, leads: 48, conversao: 35 },
  { nome: 'João Pedro', vendas: 225000, leads: 55, conversao: 32 },
  { nome: 'Fernanda Costa', vendas: 195000, leads: 42, conversao: 28 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Relatorios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');

  const vendedoresColumns = [
    { key: 'nome', label: 'Vendedor' },
    { 
      key: 'vendas', 
      label: 'Vendas',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { key: 'leads', label: 'Leads' },
    { 
      key: 'conversao', 
      label: 'Conversão',
      render: (value: number) => `${value}%`
    }
  ];

  const kpis = [
    { title: 'Receita Total', value: 'R$ 2.45M', change: '+15%', icon: DollarSign },
    { title: 'Leads Convertidos', value: '342', change: '+8%', icon: Target },
    { title: 'Ticket Médio', value: 'R$ 7.8K', change: '+12%', icon: TrendingUp },
    { title: 'Taxa Conversão', value: '34%', change: '+5%', icon: BarChart3 },
    { title: 'Novos Clientes', value: '89', change: '+22%', icon: Users },
    { title: 'Ciclo de Vendas', value: '18 dias', change: '-3 dias', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análise de performance e métricas</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={periodoSelecionado === 'mes' ? 'default' : 'outline'}
            onClick={() => setPeriodoSelecionado('mes')}
          >
            Mês
          </Button>
          <Button 
            variant={periodoSelecionado === 'trimestre' ? 'default' : 'outline'}
            onClick={() => setPeriodoSelecionado('trimestre')}
          >
            Trimestre
          </Button>
          <Button 
            variant={periodoSelecionado === 'ano' ? 'default' : 'outline'}
            onClick={() => setPeriodoSelecionado('ano')}
          >
            Ano
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="funil">Funil de Vendas</TabsTrigger>
          <TabsTrigger value="metricas">Métricas</TabsTrigger>
        </TabsList>

        {/* Pipeline Tab */}
        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {pipelineData.map((stage, index) => (
              <Card key={stage.stage} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{stage.stage}</CardTitle>
                    <Badge variant="secondary">{stage.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      R$ {(stage.value / 1000).toFixed(0)}K
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(stage.count / 45) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pipeline Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'value' ? `R$ ${Number(value).toLocaleString()}` : value,
                        name === 'value' ? 'Valor' : 'Quantidade'
                      ]}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" name="count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Funil Tab */}
        <TabsContent value="funil" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funil Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pipelineData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ stage, count }) => `${stage}: ${count}`}
                      >
                        {pipelineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Table */}
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão por Etapa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineData.map((stage, index) => {
                    const nextStage = pipelineData[index + 1];
                    const conversionRate = nextStage 
                      ? ((nextStage.count / stage.count) * 100).toFixed(1)
                      : null;
                    
                    return (
                      <div key={stage.stage} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{stage.stage}</p>
                          <p className="text-sm text-muted-foreground">{stage.count} leads</p>
                        </div>
                        {conversionRate && (
                          <Badge variant="outline">
                            {conversionRate}% conversão
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Métricas Tab */}
        <TabsContent value="metricas" className="space-y-6">
          {/* KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpis.map((kpi, index) => (
              <StatsCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType="positive"
                icon={<kpi.icon className="h-6 w-6 text-primary" />}
              />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução das Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metricasData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                      <Line 
                        type="monotone" 
                        dataKey="vendas" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Rate Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metricasData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="conversao" fill="hsl(var(--success))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <DataTable
            data={vendedoresRanking}
            columns={vendedoresColumns}
            title="Ranking de Vendedores"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}