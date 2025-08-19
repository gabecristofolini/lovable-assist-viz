import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Building, Calendar, FileText, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockData, getStatusColor, getStatusLabel } from '@/data/mockData';

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the lead (in real app, this would be an API call)
  const lead = mockData.leads.find(l => l.id === parseInt(id || '0'));

  if (!lead) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Lead não encontrado</h2>
        <Button onClick={() => navigate('/leads')} className="mt-4">
          Voltar para Leads
        </Button>
      </div>
    );
  }

  const iniciais = lead.nome.split(' ').map(n => n[0]).join('').toUpperCase();

  const atividades = [
    {
      id: 1,
      tipo: 'Email',
      descricao: 'Email de follow-up enviado',
      data: '19/01/2024 14:30',
      responsavel: 'Ana Silva'
    },
    {
      id: 2,
      tipo: 'Ligação',
      descricao: 'Ligação realizada - interessado em reunião',
      data: '18/01/2024 10:15',
      responsavel: 'Ana Silva'
    },
    {
      id: 3,
      tipo: 'WhatsApp',
      descricao: 'Primeira mensagem de contato',
      data: '17/01/2024 16:45',
      responsavel: 'Ana Silva'
    }
  ];

  const proximasAcoes = [
    { id: 1, acao: 'Agendar reunião de apresentação', prazo: '22/01/2024' },
    { id: 2, acao: 'Enviar proposta comercial', prazo: '25/01/2024' },
    { id: 3, acao: 'Follow-up pós-reunião', prazo: '28/01/2024' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/leads')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{lead.nome}</h1>
            <p className="text-muted-foreground">{lead.empresa}</p>
          </div>
        </div>
        <Button>
          Converter em Pedido
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Info Básica */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar e Info Principal */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarFallback className="text-lg font-semibold">
                  {iniciais}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{lead.nome}</h3>
              <p className="text-muted-foreground">{lead.empresa}</p>
              <Badge className={`mt-2 ${getStatusColor(lead.status)}`}>
                {getStatusLabel(lead.status)}
              </Badge>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.telefone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{lead.empresa}</span>
              </div>
            </CardContent>
          </Card>

          {/* Próximas Ações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Próximas Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {proximasAcoes.map((acao) => (
                <div key={acao.id} className="border-l-2 border-primary pl-3">
                  <p className="text-sm font-medium">{acao.acao}</p>
                  <p className="text-xs text-muted-foreground">{acao.prazo}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="informacoes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="atividades">Atividades</TabsTrigger>
              <TabsTrigger value="notas">Notas</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes">
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes do Lead</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium">Nome Completo</label>
                      <p className="mt-1 p-2 bg-muted rounded-md">{lead.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Empresa</label>
                      <p className="mt-1 p-2 bg-muted rounded-md">{lead.empresa}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="mt-1 p-2 bg-muted rounded-md">{lead.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone</label>
                      <p className="mt-1 p-2 bg-muted rounded-md">{lead.telefone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Valor Estimado</label>
                      <p className="mt-1 p-2 bg-muted rounded-md">R$ {lead.valor.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Responsável</label>
                      <p className="mt-1 p-2 bg-muted rounded-md">{lead.responsavel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="atividades">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline de Atividades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {atividades.map((atividade) => (
                      <div key={atividade.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{atividade.tipo}</Badge>
                            <span className="text-sm text-muted-foreground">{atividade.data}</span>
                          </div>
                          <p className="mt-1 text-sm">{atividade.descricao}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Por {atividade.responsavel}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notas">
              <Card>
                <CardHeader>
                  <CardTitle>Notas e Observações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        Cliente demonstrou muito interesse nos nossos serviços de consultoria tecnológica. 
                        Empresa em fase de expansão, buscando soluções para otimizar processos internos.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        18/01/2024 - Ana Silva
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        Agendada reunião para próxima semana. Cliente solicitou apresentação 
                        detalhada dos casos de sucesso e ROI esperado.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        17/01/2024 - Ana Silva
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}