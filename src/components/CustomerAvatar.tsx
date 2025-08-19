import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface CustomerAvatarProps {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
  className?: string;
}

export function CustomerAvatar({ name, image, size = 'md', online, className }: CustomerAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      {online !== undefined && (
        <div className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-background",
          size === 'sm' ? 'h-2.5 w-2.5' : size === 'md' ? 'h-3 w-3' : 'h-3.5 w-3.5',
          online ? 'bg-green-500' : 'bg-gray-400'
        )} />
      )}
    </div>
  );
}