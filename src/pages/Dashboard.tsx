import { Users, TrendingUp, DollarSign, MessageSquare } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/data/mockData';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function Dashboard() {
  const { metricas, atividades, chartData } = mockData;

  const atividadeColumns = [
    { key: 'hora', label: 'Hora' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'responsavel', label: 'Responsável' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Leads Ativos"
          value={metricas.leadsAtivos}
          change="+12%"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-primary" />}
        />
        <StatsCard
          title="Taxa de Conversão"
          value={`${metricas.taxaConversao}%`}
          change="+5%"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6 text-success" />}
        />
        <StatsCard
          title="Ticket Médio"
          value={`R$ ${metricas.ticketMedio.toLocaleString()}`}
          change="-3%"
          changeType="negative"
          icon={<DollarSign className="h-6 w-6 text-warning" />}
        />
        <StatsCard
          title="Atendimentos Hoje"
          value={metricas.atendimentosHoje}
          change="18 abertos"
          changeType="positive"
          icon={<MessageSquare className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Leads - Últimos 20 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="data" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorLeads)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <DataTable
          data={atividades}
          columns={atividadeColumns}
          title="Atividades Recentes"
        />
      </div>
    </div>
  );
}