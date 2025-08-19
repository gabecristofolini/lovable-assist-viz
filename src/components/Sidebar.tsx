import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  ShoppingCart, 
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    section: 'Geral',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    section: 'Cadastros',
    items: [
      { name: 'Campanhas', href: '/cadastros/campanhas', icon: BarChart3 },
      { name: 'Criativos', href: '/cadastros/criativos', icon: Users },
      { name: 'Clientes', href: '/cadastros/clientes', icon: Building2 },
      { name: 'Chatbots', href: '/cadastros/chatbots', icon: MessageSquare }
    ]
  },
  {
    section: 'Operacional',
    items: [
      { name: 'Leads', href: '/operacional/leads', icon: Users },
      { name: 'Atendimento', href: '/operacional/atendimento', icon: MessageSquare },
      { name: 'Orçamentos', href: '/operacional/orcamentos', icon: Users },
      { name: 'Pedidos', href: '/operacional/pedidos', icon: ShoppingCart }
    ]
  },
  {
    section: 'Dashboards',
    items: [
      { name: 'Financeiro', href: '/dashboards/financeiro', icon: BarChart3 },
      { name: 'Comercial', href: '/dashboards/comercial', icon: BarChart3 },
      { name: 'Operacional', href: '/dashboards/operacional', icon: BarChart3 }
    ]
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg text-foreground">CRM Pro</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                {section.section}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                    {!collapsed && item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center space-x-3",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">AS</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Ana Silva</p>
              <p className="text-xs text-muted-foreground truncate">ana@crmcorp.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}