import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CustomerAvatar } from '@/components/CustomerAvatar';
import { ChatBubble } from '@/components/ChatBubble';
import { StatusBadge } from '@/components/StatusBadge';
import { mockData } from '@/data/mockData';

export default function Atendimento() {
  const [selectedConversaId, setSelectedConversaId] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const { conversas, mensagens } = mockData;

  // Conversas expandidas para o novo layout
  const conversasExpandidas = [
    {
      id: 1,
      cliente: "Maria Santos",
      canal: "whatsapp",
      status: "online",
      origem_lead: "Black Friday > Banner A",
      cliente_desde: "Novo",
      ultimo_pedido: null,
      mensagens_nao_lidas: 3,
      tempo_espera: "2 min",
      ultima_mensagem: "Preciso de um orçamento para 50 unidades",
      hora: "10:45",
      avatar: "",
      tags: ["Novo", "Urgente"],
      sentimento: "positivo"
    },
    {
      id: 2,
      cliente: "Carlos Mendes",
      canal: "instagram",
      status: "online",
      origem_lead: "TikTok > Influencer",
      cliente_desde: "3 anos",
      ultimo_pedido: "R$ 4.500 há 15 dias",
      mensagens_nao_lidas: 0,
      tempo_espera: null,
      ultima_mensagem: "Obrigado pelo atendimento!",
      hora: "09:30",
      avatar: "",
      tags: ["Premium", "Recorrente"],
      sentimento: "positivo"
    },
    {
      id: 3,
      cliente: "Ana Costa",
      canal: "site",
      status: "offline",
      origem_lead: "Google Ads > CPC",
      cliente_desde: "1 ano",
      ultimo_pedido: "R$ 8.200 há 2 meses",
      mensagens_nao_lidas: 1,
      tempo_espera: "1h 30min",
      ultima_mensagem: "Quando vocês conseguem entregar?",
      hora: "Ontem",
      avatar: "",
      tags: ["B2B"],
      sentimento: "neutro"
    }
  ];

  const mensagensExpandidas = [
    {
      id: 1,
      conversaId: 1,
      sender: "customer",
      senderName: "Maria Santos",
      message: "Olá! Vi o anúncio de Black Friday e gostaria de saber mais sobre os produtos",
      timestamp: "10:30"
    },
    {
      id: 2,
      conversaId: 1,
      sender: "user",
      message: "Olá Maria! Que bom que entrou em contato. Sobre qual produto você gostaria de saber?",
      timestamp: "10:32"
    },
    {
      id: 3,
      conversaId: 1,
      sender: "customer",
      senderName: "Maria Santos",
      message: "Preciso de um orçamento para 50 unidades do produto X",
      timestamp: "10:35"
    },
    {
      id: 4,
      conversaId: 1,
      sender: "bot",
      senderName: "IA Assistant",
      message: "Detectei interesse em orçamento. Sugestão: Perguntar sobre prazo de entrega e forma de pagamento.",
      timestamp: "10:35"
    }
  ];

  const conversaSelecionada = conversasExpandidas.find(c => c.id === selectedConversaId);
  const mensagensConversa = mensagensExpandidas.filter(m => m.conversaId === selectedConversaId);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const sugestoes_ia = [
    "Posso preparar um orçamento personalizado para você",
    "Temos desconto especial para pedidos acima de 30 unidades",
    "Gostaria de agendar uma reunião para apresentar nossos produtos?"
  ];

  return (
    <div className="h-[calc(100vh-2rem)] flex">
      {/* Painel 1 - Fila de Atendimento (25%) */}
      <div className="w-1/4 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold mb-3">Fila de Atendimento</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversas..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {conversasExpandidas.map((conversa) => (
              <Card 
                key={conversa.id}
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  selectedConversaId === conversa.id ? 'bg-accent' : ''
                }`}
                onClick={() => setSelectedConversaId(conversa.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <CustomerAvatar 
                        name={conversa.cliente} 
                        size="sm"
                        online={conversa.status === 'online'}
                      />
                      {conversa.mensagens_nao_lidas > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-primary">
                          {conversa.mensagens_nao_lidas}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">{conversa.cliente}</h3>
                        <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {conversa.canal}
                        </Badge>
                        {conversa.tempo_espera && (
                          <span className="text-xs text-orange-600">
                            ⏰ {conversa.tempo_espera}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {conversa.ultima_mensagem}
                      </p>
                      
                      {conversa.tags.length > 0 && (
                        <div className="flex space-x-1 mt-2">
                          {conversa.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Painel 2 - Conversa Ativa (50%) */}
      <div className="flex-1 flex flex-col">
        {conversaSelecionada ? (
          <>
            {/* Header da Conversa */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CustomerAvatar 
                    name={conversaSelecionada.cliente} 
                    online={conversaSelecionada.status === 'online'}
                  />
                  <div>
                    <h3 className="font-semibold">{conversaSelecionada.cliente}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Origem: {conversaSelecionada.origem_lead}</span>
                      <span>•</span>
                      <span>Cliente desde: {conversaSelecionada.cliente_desde}</span>
                      {conversaSelecionada.ultimo_pedido && (
                        <>
                          <span>•</span>
                          <span>Último pedido: {conversaSelecionada.ultimo_pedido}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Área de Mensagens */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mensagensConversa.map((mensagem) => (
                  <ChatBubble
                    key={mensagem.id}
                    message={mensagem.message}
                    sender={mensagem.sender as 'user' | 'customer' | 'bot'}
                    timestamp={mensagem.timestamp}
                    senderName={mensagem.senderName}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Sugestões da IA */}
            <div className="p-4 border-t border-border bg-yellow-50">
              <h4 className="text-sm font-medium mb-2">💡 Sugestões da IA</h4>
              <div className="space-y-1">
                {sugestoes_ia.map((sugestao, index) => (
                  <button
                    key={index}
                    className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors block w-full p-2 rounded hover:bg-yellow-100"
                    onClick={() => setNewMessage(sugestao)}
                  >
                    {sugestao}
                  </button>
                ))}
              </div>
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Selecione uma conversa para começar
          </div>
        )}
      </div>

      {/* Painel 3 - Informações do Cliente (25%) */}
      <div className="w-1/4 border-l border-border">
        {conversaSelecionada && (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Informações do Cliente</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium">Resumo da IA</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cliente interessado em orçamento para grande quantidade. 
                    Demonstra urgência na resposta. Primeiro contato com a empresa.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sentimento</span>
                    <StatusBadge status={conversaSelecionada.sentimento} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <StatusBadge status={conversaSelecionada.status} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Produtos de Interesse</h4>
              <div className="space-y-2">
                <div className="p-2 border rounded text-sm">
                  Produto X - Detectado na conversa
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Ações Sugeridas</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📋 Criar Orçamento
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📅 Agendar Reunião
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  📞 Solicitar Callback
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Histórico</h4>
              <div className="text-sm text-muted-foreground">
                <p>Primeiro contato</p>
                <p className="text-xs">Nenhum pedido anterior</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}