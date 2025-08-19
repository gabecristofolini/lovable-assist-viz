import { useState } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Atendimento() {
  const [selectedConversaId, setSelectedConversaId] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const { conversas, mensagens } = mockData;
  const selectedConversa = conversas.find(c => c.id === selectedConversaId);
  const conversaMensagens = mensagens.filter(m => m.conversaId === selectedConversaId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Simulate sending message
    console.log('Enviando mensagem:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-background rounded-lg border">
      {/* Lista de Conversas */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Conversas</h2>
          <p className="text-sm text-muted-foreground">
            {conversas.filter(c => c.naoLidas > 0).length} não lidas
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversas.map((conversa) => (
            <div
              key={conversa.id}
              onClick={() => setSelectedConversaId(conversa.id)}
              className={cn(
                "p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
                selectedConversaId === conversa.id && "bg-muted"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {conversa.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversa.online && (
                    <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-success text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{conversa.nome}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                      {conversa.naoLidas > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                          {conversa.naoLidas}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversa.ultimaMensagem}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversa ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {selectedConversa.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversa.nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversa.online ? 'Online' : 'Offline'} • {selectedConversa.telefone}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversaMensagens.map((mensagem) => (
                <div
                  key={mensagem.id}
                  className={cn(
                    "flex",
                    mensagem.remetente === 'atendente' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                      mensagem.remetente === 'atendente'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{mensagem.texto}</p>
                    <p className="text-xs mt-1 opacity-70">{mensagem.hora}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* IA Suggestion */}
            <div className="px-4 py-2 bg-accent/50 border-y border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Resposta sugerida:</span>
                <span className="text-sm">"Posso agendar uma demonstração para você?"</span>
                <Button size="sm" variant="outline" className="ml-auto">
                  Usar
                </Button>
              </div>
            </div>

            {/* Input de Mensagem */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Selecione uma conversa para começar</p>
          </div>
        )}
      </div>

      {/* Painel Lateral Direito */}
      <div className="w-64 border-l border-border p-4 space-y-6">
        {selectedConversa && (
          <>
            {/* Resumo do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Resumo do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-xs text-muted-foreground">Nome:</span>
                  <p className="text-sm font-medium">{selectedConversa.nome}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Telefone:</span>
                  <p className="text-sm">{selectedConversa.telefone}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="text-xs">
                    Lead Qualificado
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">WhatsApp</Badge>
                  <Badge variant="secondary" className="text-xs">Consultoria</Badge>
                  <Badge variant="secondary" className="text-xs">Urgente</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Pedidos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pedidos Anteriores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-muted rounded text-xs">
                  <p className="font-medium">#2023-145</p>
                  <p className="text-muted-foreground">R$ 8.500 - Concluído</p>
                </div>
                <div className="p-2 bg-muted rounded text-xs">
                  <p className="font-medium">#2023-098</p>
                  <p className="text-muted-foreground">R$ 12.000 - Concluído</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}