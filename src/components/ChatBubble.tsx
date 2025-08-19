import { cn } from '@/lib/utils';
import { CustomerAvatar } from './CustomerAvatar';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'customer' | 'bot';
  timestamp: string;
  senderName?: string;
  senderAvatar?: string;
  className?: string;
}

export function ChatBubble({ 
  message, 
  sender, 
  timestamp, 
  senderName, 
  senderAvatar,
  className 
}: ChatBubbleProps) {
  const isUser = sender === 'user';
  const isBot = sender === 'bot';

  return (
    <div className={cn(
      "flex gap-3 max-w-[80%]",
      isUser ? "ml-auto flex-row-reverse" : "mr-auto",
      className
    )}>
      {/* Avatar */}
      {!isUser && (
        <CustomerAvatar 
          name={senderName || 'Cliente'} 
          image={senderAvatar}
          size="sm"
        />
      )}
      
      {/* Message */}
      <div className={cn(
        "flex flex-col",
        isUser ? "items-end" : "items-start"
      )}>
        {/* Sender name (for non-user messages) */}
        {!isUser && senderName && (
          <span className="text-xs text-muted-foreground mb-1">
            {senderName}
            {isBot && " (Bot)"}
          </span>
        )}
        
        {/* Message bubble */}
        <div className={cn(
          "px-4 py-2 rounded-lg max-w-full break-words",
          isUser ? 
            "bg-primary text-primary-foreground rounded-br-sm" : 
            isBot ?
              "bg-yellow-100 text-yellow-900 border border-yellow-200 rounded-bl-sm" :
              "bg-muted text-foreground rounded-bl-sm"
        )}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        
        {/* Timestamp */}
        <span className={cn(
          "text-xs text-muted-foreground mt-1",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </span>
      </div>
    </div>
  );
}