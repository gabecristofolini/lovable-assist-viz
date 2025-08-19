import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import Atendimento from "./pages/Atendimento";
import Pedidos from "./pages/Pedidos";
import NovoPedido from "./pages/NovoPedido";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

// Cadastros
import Campanhas from "./pages/cadastros/Campanhas";

// Operacional  
import LeadsKanban from "./pages/operacional/LeadsKanban";
import AtendimentoOperacional from "./pages/operacional/Atendimento";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Cadastros */}
            <Route path="/cadastros/campanhas" element={<Campanhas />} />
            <Route path="/cadastros/criativos" element={<div className="p-8">Criativos - Em desenvolvimento</div>} />
            <Route path="/cadastros/clientes" element={<div className="p-8">Clientes - Em desenvolvimento</div>} />
            <Route path="/cadastros/chatbots" element={<div className="p-8">Chatbots - Em desenvolvimento</div>} />
            
            {/* Operacional */}
            <Route path="/operacional/leads" element={<LeadsKanban />} />
            <Route path="/operacional/atendimento" element={<AtendimentoOperacional />} />
            <Route path="/operacional/orcamentos" element={<div className="p-8">Orçamentos - Em desenvolvimento</div>} />
            <Route path="/operacional/pedidos" element={<Pedidos />} />
            
            {/* Dashboards */}
            <Route path="/dashboards/financeiro" element={<div className="p-8">Dashboard Financeiro - Em desenvolvimento</div>} />
            <Route path="/dashboards/comercial" element={<div className="p-8">Dashboard Comercial - Em desenvolvimento</div>} />
            <Route path="/dashboards/operacional" element={<div className="p-8">Dashboard Operacional - Em desenvolvimento</div>} />
            
            {/* Legacy routes */}
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/atendimento" element={<Atendimento />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedidos/novo" element={<NovoPedido />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
