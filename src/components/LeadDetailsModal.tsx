import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MapPin, User, Building2, Calendar, DollarSign, MessageSquare, FileText, Users } from 'lucide-react';
import { getStatusColor, getStatusLabel } from '@/data/mockData';

interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  status: string;
  valor: number;
  responsavel: string;
  ultimaInteracao: string;
  motivo?: string;
  dataAlteracao?: string;
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDetailsModal({ lead, open, onOpenChange }: LeadDetailsModalProps) {
  if (!lead) return null;

  const mockAtendimentos = [
    {
      id: 1,
      data: "2024-01-20 14:30",
      tipo: "WhatsApp",
      responsavel: "Ana Silva",
      resumo: "Cliente interessado em plano premium"
    },
    {
      id: 2,
      data: "2024-01-19 10:15",
      tipo: "Ligação",
      responsavel: "João Santos",
      resumo: "Apresentação da proposta inicial"
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
              <AvatarFallback>{lead.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{lead.nome}</div>
              <div className="text-sm text-muted-foreground">{lead.empresa}</div>
            </div>
            <Badge className={getStatusColor(lead.status)}>
              {getStatusLabel(lead.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="dados" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dados">Dados Básicos</TabsTrigger>
            <TabsTrigger value="atendimentos">Atendimentos</TabsTrigger>
            <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
            <TabsTrigger value="origem">Origem</TabsTrigger>
          </TabsList>

          <TabsContent value="dados" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.empresa}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Responsáveis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Atendente</div>
                    <div className="text-sm text-muted-foreground">{lead.responsavel}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Vendedor</div>
                    <div className="text-sm text-muted-foreground">Carlos Mendes</div>
                  </div>
                  {lead.motivo && (
                    <div>
                      <div className="text-sm font-medium">Motivo da Situação</div>
                      <div className="text-sm text-muted-foreground">{lead.motivo}</div>
                      {lead.dataAlteracao && (
                        <div className="text-xs text-muted-foreground">Em {lead.dataAlteracao}</div>
                      )}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium">Valor Potencial</div>
                    <div className="text-lg font-bold text-green-600">R$ {lead.valor.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="atendimentos" className="space-y-4">
            <div className="space-y-3">
              {mockAtendimentos.map((atendimento) => (
                <Card key={atendimento.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">{atendimento.tipo}</span>
                          <Badge variant="outline">{atendimento.data}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{atendimento.resumo}</p>
                        <p className="text-xs text-muted-foreground">Por: {atendimento.responsavel}</p>
                      </div>
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
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
                <CardTitle>Origem do Lead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium">Campanha</div>
                    <div className="text-sm text-muted-foreground">Black Friday 2024</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Criativo</div>
                    <div className="text-sm text-muted-foreground">Banner A - Desconto 50%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Canal</div>
                    <div className="text-sm text-muted-foreground">Instagram</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Jornada do Cliente</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024-01-18 15:30 - Clicou no anúncio</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024-01-18 15:35 - Preencheu formulário</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>2024-01-19 10:00 - Primeiro contato por WhatsApp</span>
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