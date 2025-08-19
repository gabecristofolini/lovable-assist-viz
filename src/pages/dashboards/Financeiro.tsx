import { useState } from 'react';
import { DollarSign, TrendingUp, Target, Calendar, BarChart3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Cell
} from 'recharts';

const metaDiariaData = [
  { dia: 'Seg', meta: 50000, realizado: 48500 },
  { dia: 'Ter', meta: 50000, realizado: 52000 },
  { dia: 'Qua', meta: 50000, realizado: 47000 },
  { dia: 'Qui', meta: 50000, realizado: 55000 },
  { dia: 'Sex', meta: 50000, realizado: 51500 },
  { dia: 'Sáb', meta: 30000, realizado: 28000 },
  { dia: 'Dom', meta: 20000, realizado: 22000 }
];

const faturamentoMensal = [
  { mes: 'Jan', valor: 385000 },
  { mes: 'Fev', valor: 420000 },
  { mes: 'Mar', valor: 395000 },
  { mes: 'Abr', valor: 445000 },
  { mes: 'Mai', valor: 460000 },
  { mes: 'Jun', valor: 485000 },
  { mes: 'Jul', valor: 505000 },
  { mes: 'Ago', valor: 478000 },
  { mes: 'Set', valor: 520000 },
  { mes: 'Out', valor: 535000 },
  { mes: 'Nov', valor: 458000 },
  { mes: 'Dez', valor: 0 }
];

const pedidosPorRegiao = [
  { regiao: 'Sudeste', valor: 1250000, pedidos: 156, cor: '#3b82f6' },
  { regiao: 'Sul', valor: 850000, pedidos: 98, cor: '#10b981' },
  { regiao: 'Nordeste', valor: 650000, pedidos: 87, cor: '#f59e0b' },
  { regiao: 'Norte', valor: 420000, pedidos: 45, cor: '#ef4444' },
  { regiao: 'Centro-Oeste', valor: 380000, pedidos: 38, cor: '#8b5cf6' }
];

const topClientes = [
  { nome: 'Tech Solutions Corp', valor: 145000, pedidos: 12, ultima_compra: '15/01/2024' },
  { nome: 'Digital Innovation', valor: 128000, pedidos: 8, ultima_compra: '18/01/2024' },
  { nome: 'Startup Alpha', valor: 98000, pedidos: 15, ultima_compra: '17/01/2024' },
  { nome: 'Beta Industries', valor: 87000, pedidos: 6, ultima_compra: '16/01/2024' },
  { nome: 'Gamma Enterprise', valor: 76000, pedidos: 9, ultima_compra: '19/01/2024' }
];

const produtosMaisVendidos = [
  { produto: 'Consultoria Premium', vendas: 45, valor: 225000 },
  { produto: 'Implementação Completa', vendas: 32, valor: 192000 },
  { produto: 'Suporte Técnico', vendas: 67, valor: 134000 },
  { produto: 'Treinamento Avançado', vendas: 28, valor: 112000 },
  { produto: 'Auditoria Sistema', vendas: 19, valor: 95000 }
];

const vendedoresRanking = [
  { vendedor: 'Ana Silva', faturamento: 285000, pedidos: 45, comissao: 14250 },
  { vendedor: 'Carlos Mendes', faturamento: 265000, pedidos: 52, comissao: 13250 },
  { vendedor: 'Maria Oliveira', faturamento: 245000, pedidos: 48, comissao: 12250 },
  { vendedor: 'João Pedro', faturamento: 225000, pedidos: 55, comissao: 11250 },
  { vendedor: 'Fernanda Costa', faturamento: 195000, pedidos: 42, comissao: 9750 }
];

export default function DashboardFinanceiro() {
  const [periodo, setPeriodo] = useState('mes');

  const kpis = [
    {
      title: 'Faturamento Mês',
      value: 'R$ 458.000',
      change: '+15%',
      progress: 85,
      meta: 'R$ 500.000',
      icon: DollarSign
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 4.850',
      change: '+12%',
      progress: 72,
      meta: 'R$ 5.500',
      icon: TrendingUp
    },
    {
      title: 'Pedidos Hoje',
      value: '34',
      change: '+8%',
      progress: 85,
      meta: '40',
      icon: Target
    },
    {
      title: 'Recorrência',
      value: '67%',
      change: '+5%',
      progress: 67,
      meta: '75%',
      icon: Users
    }
  ];

  const clientesColumns = [
    { key: 'nome', label: 'Cliente' },
    { 
      key: 'valor', 
      label: 'Faturamento',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { key: 'pedidos', label: 'Pedidos' },
    { key: 'ultima_compra', label: 'Última Compra' }
  ];

  const produtosColumns = [
    { key: 'produto', label: 'Produto' },
    { key: 'vendas', label: 'Vendas' },
    { 
      key: 'valor', 
      label: 'Faturamento',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    }
  ];

  const vendedoresColumns = [
    { key: 'vendedor', label: 'Vendedor' },
    { 
      key: 'faturamento', 
      label: 'Faturamento',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    },
    { key: 'pedidos', label: 'Pedidos' },
    { 
      key: 'comissao', 
      label: 'Comissão',
      render: (value: number) => `R$ ${value.toLocaleString()}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Financeiro</h1>
          <p className="text-muted-foreground">Visão geral das métricas financeiras</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={periodo === 'mes' ? 'default' : 'outline'}
            onClick={() => setPeriodo('mes')}
          >
            Mês
          </Button>
          <Button 
            variant={periodo === 'trimestre' ? 'default' : 'outline'}
            onClick={() => setPeriodo('trimestre')}
          >
            Trimestre
          </Button>
          <Button 
            variant={periodo === 'ano' ? 'default' : 'outline'}
            onClick={() => setPeriodo('ano')}
          >
            Ano
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {kpi.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs mês anterior</span>
                  </div>
                </div>
                <kpi.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta: {kpi.meta}</span>
                  <span>{kpi.progress}%</span>
                </div>
                <Progress value={kpi.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meta Diária */}
        <Card>
          <CardHeader>
            <CardTitle>Meta Diária vs Realizado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metaDiariaData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                  <Bar dataKey="meta" fill="hsl(var(--muted))" name="Meta" />
                  <Bar dataKey="realizado" fill="hsl(var(--primary))" name="Realizado" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Faturamento por Região */}
        <Card>
          <CardHeader>
            <CardTitle>Faturamento por Região</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pedidosPorRegiao}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="valor"
                    label={({ regiao, valor }) => `${regiao}: R$ ${(valor/1000).toFixed(0)}K`}
                  >
                    {pedidosPorRegiao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evolução Faturamento */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Faturamento Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={faturamentoMensal}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clientes */}
        <DataTable
          data={topClientes}
          columns={clientesColumns}
          title="Top 5 Clientes do Mês"
        />

        {/* Produtos Mais Vendidos */}
        <DataTable
          data={produtosMaisVendidos}
          columns={produtosColumns}
          title="Produtos Mais Vendidos"
        />
      </div>

      {/* Ranking Vendedores */}
      <DataTable
        data={vendedoresRanking}
        columns={vendedoresColumns}
        title="Ranking de Vendedores"
      />
    </div>
  );
}