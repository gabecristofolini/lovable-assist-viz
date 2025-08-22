import { Search, Bell, Settings } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useLocation } from 'react-router-dom';

const pageNames: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/leads': 'Leads',
  '/atendimento': 'Atendimento',
  '/pedidos': 'Pedidos',
  '/relatorios': 'Relatórios'
};

export function Header() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'QUALITPLACAS CRM';

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-foreground">{pageName}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar leads, clientes, pedidos..."
            className="pl-10 bg-muted/50"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}