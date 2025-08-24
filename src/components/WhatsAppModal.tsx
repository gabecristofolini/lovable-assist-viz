import { useState } from 'react';
import { X, MessageCircle, Phone, Video, Info, Send, Paperclip, Mic, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChatBubble } from '@/components/ChatBubble';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: {
    id: number;
    nome: string;
    telefone: string;
    online: boolean;
    ultimaMensagem: string;
    hora: string;
  };
}

interface Message {
  id: number;
  sender: 'user' | 'customer' | 'bot';
  message: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'customer',
    message: 'Olá! Gostaria de saber mais sobre os seus produtos.',
    timestamp: '10:30',
    status: 'read'
  },
  {
    id: 2,
    sender: 'user',
    message: 'Olá! Claro, ficarei feliz em ajudar. Que tipo de produto você está procurando?',
    timestamp: '10:32',
    status: 'delivered'
  },
  {
    id: 3,
    sender: 'customer',
    message: 'Estou interessado em placas personalizadas para minha empresa.',
    timestamp: '10:35',
    status: 'read'
  },
  {
    id: 4,
    sender: 'user',
    message: 'Perfeito! Temos várias opções de placas personalizadas. Você poderia me dizer o tamanho aproximado e a quantidade que precisa?',
    timestamp: '10:37',
    status: 'delivered'
  },
  {
    id: 5,
    sender: 'customer',
    message: 'Preciso de umas 20 placas, tamanho médio, para identificação de salas.',
    timestamp: '10:40',
    status: 'read'
  }
];

const aiSuggestions = [
  'Posso te enviar nosso catálogo completo de placas. Você gostaria de receber?',
  'Para fazer um orçamento preciso, você poderia me informar as dimensões exatas?',
  'Temos opções em acrílico, PVC e alumínio. Tem alguma preferência de material?',
  'Posso agendar uma visita técnica para avaliar melhor suas necessidades.',
  'Nosso prazo de produção é de 5-7 dias úteis. Isso atende seu cronograma?'
];

export function WhatsAppModal({ isOpen, onClose, conversation }: WhatsAppModalProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || newMessage;
    if (text.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'user',
        message: text,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        {/* Header */}
        <DialogHeader className="p-4 border-b bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-green-100 text-green-700">
                  {conversation.nome.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  {conversation.nome}
                </DialogTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{conversation.telefone}</span>
                  <Badge className={conversation.online ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
                    {conversation.online ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Info className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Chat Area */}
        <div className="flex-1 flex">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    message={message.message}
                    sender={message.sender}
                    timestamp={message.timestamp}
                    senderName={message.sender === 'customer' ? conversation.nome : 'Você'}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* AI Suggestions */}
            <div className="border-t p-4 bg-gray-50">
              <div className="mb-2">
                <span className="text-sm font-medium text-muted-foreground">💡 Sugestões da IA:</span>
              </div>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                {aiSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1 px-2 bg-white hover:bg-blue-50 hover:border-blue-200 text-left"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t p-4 bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-1 h-auto">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-1 h-auto">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}