import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Mic, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  sender: 'user' | 'customer' | 'bot';
  senderName?: string;
  message: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'voice';
}

interface WhatsAppChatProps {
  conversa: {
    id: number;
    nome: string;
    telefone: string;
    online: boolean;
    canal: string;
    ultimaMensagem: string;
    hora: string;
  };
  onSendMessage?: (message: string) => void;
}

export function WhatsAppChat({ conversa, onSendMessage }: WhatsAppChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'customer',
      senderName: conversa.nome,
      message: 'Olá! Vi o anúncio de Black Friday e gostaria de saber mais sobre os produtos',
      timestamp: '10:30',
      status: 'read'
    },
    {
      id: 2,
      sender: 'user',
      message: 'Olá! Que bom que entrou em contato. Sobre qual produto você gostaria de saber?',
      timestamp: '10:32',
      status: 'read'
    },
    {
      id: 3,
      sender: 'customer',
      senderName: conversa.nome,
      message: 'Preciso de um orçamento para 50 unidades do produto X. É possível fazer um desconto para essa quantidade?',
      timestamp: '10:35',
      status: 'read'
    },
    {
      id: 4,
      sender: 'bot',
      senderName: 'IA Assistant',
      message: '💡 Sugestão: Cliente interessado em orçamento para grande quantidade. Considere ofercer desconto progressivo.',
      timestamp: '10:35',
      status: 'read'
    },
    {
      id: 5,
      sender: 'user',
      message: 'Sim! Para 50 unidades temos um desconto especial de 15%. Posso preparar um orçamento detalhado para você.',
      timestamp: '10:38',
      status: 'read'
    },
    {
      id: 6,
      sender: 'customer',
      senderName: conversa.nome,
      message: 'Perfeito! Qual seria o prazo de entrega?',
      timestamp: '10:40',
      status: 'read'
    },
    {
      id: 7,
      sender: 'user',
      message: 'Para essa quantidade, o prazo é de 7 a 10 dias úteis. Você tem alguma data específica em mente?',
      timestamp: '10:42',
      status: 'delivered'
    },
    {
      id: 8,
      sender: 'customer',
      senderName: conversa.nome,
      message: conversa.ultimaMensagem,
      timestamp: conversa.hora,
      status: 'sent'
    }
  ]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: 'sent'
      };
      
      setMessages(prev => [...prev, message]);
      onSendMessage?.(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sugestoes_ia = [
    "Posso preparar um orçamento personalizado para você",
    "Temos desconto especial para pedidos acima de 30 unidades",
    "Gostaria de agendar uma reunião para apresentar nossos produtos?",
    "Você gostaria de conhecer nossos outros produtos relacionados?"
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header da Conversa */}
      <div className="flex items-center justify-between p-4 bg-green-600 text-white">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-white text-green-600">
              {conversa.nome.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{conversa.nome}</h3>
            <div className="flex items-center space-x-2 text-sm text-green-100">
              <span>{conversa.telefone}</span>
              <span>•</span>
              <span>{conversa.online ? 'online' : 'visto por último hoje'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
            <Video className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-green-700">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Área de Mensagens */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3 shadow-sm",
                  message.sender === 'user' 
                    ? 'bg-green-500 text-white' 
                    : message.sender === 'bot'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-white text-gray-800'
                )}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-center gap-1 mb-1 text-xs font-medium text-blue-600">
                    🤖 {message.senderName}
                  </div>
                )}
                
                <div className="text-sm leading-relaxed">{message.message}</div>
                
                <div className={cn(
                  "flex items-center justify-end mt-1 text-xs gap-1",
                  message.sender === 'user' 
                    ? 'text-green-100' 
                    : 'text-gray-500'
                )}>
                  <span>{message.timestamp}</span>
                  {message.sender === 'user' && (
                    <div className="flex">
                      {message.status === 'sent' && <span>✓</span>}
                      {message.status === 'delivered' && <span>✓✓</span>}
                      {message.status === 'read' && <span className="text-blue-200">✓✓</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Sugestões da IA */}
      <div className="p-3 bg-yellow-50 border-t border-yellow-200">
        <h4 className="text-xs font-medium mb-2 text-yellow-800">💡 Sugestões da IA:</h4>
        <div className="flex flex-wrap gap-1">
          {sugestoes_ia.map((sugestao, index) => (
            <button
              key={index}
              className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full transition-colors"
              onClick={() => setNewMessage(sugestao)}
            >
              {sugestao}
            </button>
          ))}
        </div>
      </div>

      {/* Input de Mensagem */}
      <div className="p-4 bg-gray-100 border-t">
        <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Input
            placeholder="Digite uma mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
            <Smile className="h-4 w-4" />
          </Button>
          
          {newMessage.trim() ? (
            <Button size="sm" onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2">
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}