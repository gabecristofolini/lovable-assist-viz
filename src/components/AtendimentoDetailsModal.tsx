import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, User, Building2, Calendar, DollarSign, MessageSquare, FileText, Users, Clock } from 'lucide-react';
import { WhatsAppChat } from '@/components/WhatsAppChat';

interface Conversa {
  id: number;
  nome: string;
  telefone: string;
  ultimaMensagem: string;
  hora: string;
  naoLidas: number;
  online: boolean;
  canal: string;
}

interface AtendimentoDetailsModalProps {
  conversa: Conversa | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AtendimentoDetailsModal({ conversa, open, onOpenChange }: AtendimentoDetailsModalProps) {
  if (!conversa) return null;

  const mockHistorico = [
    {
      id: 1,
      data: "2024-01-20 14:30",
      tipo: "WhatsApp",
      responsavel: "Ana Silva",
      duracao: "15 min",
      status: "Resolvido",
      resumo: "Cliente solicitou alteração no pedido"
    },
    {
      id: 2,
      data: "2024-01-19 10:15",
      tipo: "Ligação",
      responsavel: "João Santos",
      duracao: "8 min",
      status: "Em andamento",
      resumo: "Dúvidas sobre produto"
    }
  ];

  const mockOrcamentos = [
    {
      id: 1,
      numero: "ORC-2024-001",
      valor: "R$ 15.000",
      status: "Em análise",
      data: "2024-01-20"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{conversa.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{conversa.nome}</div>
              <div className="text-sm text-muted-foreground">{conversa.telefone}</div>
            </div>
            <Badge variant={conversa.online ? "default" : "secondary"}>
              {conversa.online ? "Online" : "Offline"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="conversa" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="conversa">Conversa</TabsTrigger>
            <TabsTrigger value="dados">Dados Básicos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
            <TabsTrigger value="origem">Origem</TabsTrigger>
          </TabsList>

          <TabsContent value="conversa" className="mt-4">
            <div className="h-[600px] border rounded-lg overflow-hidden">
              <WhatsAppChat 
                conversa={conversa}
                onSendMessage={(message) => console.log('Mensagem enviada:', message)}
              />
            </div>
          </TabsContent>

          <TabsContent value="dados" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informações do Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{conversa.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>cliente@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Empresa XYZ</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Atendente Atual</div>
                    <div className="text-sm text-muted-foreground">Ana Silva</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tempo de Resposta</div>
                    <div className="text-sm text-muted-foreground">2 min</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Status</div>
                    <Badge className="text-xs">Em Atendimento</Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Prioridade</div>
                    <Badge variant="destructive" className="text-xs">Alta</Badge>
                  </div>
                  {(conversa as any).motivo && (
                    <div>
                      <div className="text-sm font-medium">Motivo da Situação</div>
                      <div className="text-sm text-muted-foreground">{(conversa as any).motivo}</div>
                      {(conversa as any).dataAlteracao && (
                        <div className="text-xs text-muted-foreground">Em {(conversa as any).dataAlteracao}</div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <div className="space-y-3">
              {mockHistorico.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">{item.tipo}</span>
                          <Badge variant="outline">{item.data}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.resumo}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Por: {item.responsavel}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.duracao}
                          </span>
                          <Badge variant="outline" className="text-xs">{item.status}</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Ver Conversa</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orcamentos" className="space-y-4">
            <div className="space-y-3">
              {mockOrcamentos.map((orcamento) => (
                <Card key={orcamento.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="font-medium">{orcamento.numero}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold">{orcamento.valor}</span>
                          <Badge variant="outline">{orcamento.status}</Badge>
                          <span className="text-sm text-muted-foreground">{orcamento.data}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Ver</Button>
                        <Button size="sm">Editar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="origem" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Origem do Atendimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium">Canal</div>
                    <div className="text-sm text-muted-foreground">WhatsApp</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Campanha</div>
                    <div className="text-sm text-muted-foreground">Black Friday 2024</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Primeira Interação</div>
                    <div className="text-sm text-muted-foreground">2024-01-18 15:30</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Histórico de Interações</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024-01-18 15:30 - Primeiro contato via WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024-01-19 10:15 - Ligação de follow-up</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024-01-20 14:30 - Solicitação de suporte</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}