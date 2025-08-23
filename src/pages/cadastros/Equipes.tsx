import { useState } from 'react';
import { Search, Filter, Plus, Upload, Users, UserCheck, UserX, Building2, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/DataTable';
import { QuickStatsGrid } from '@/components/QuickStatsGrid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data para equipes e usuários
const mockEquipes = [
  {
    id: 1,
    nome: "Vendas",
    descricao: "Equipe responsável por vendas e relacionamento com clientes",
    membros: 5,
    lider: "Ana Silva",
    status: "ativo",
    dataCriacao: "01/01/2024"
  },
  {
    id: 2,
    nome: "Atendimento",
    descricao: "Equipe de suporte e atendimento ao cliente",
    membros: 8,
    lider: "João Santos",
    status: "ativo",
    dataCriacao: "15/01/2024"
  },
  {
    id: 3,
    nome: "Produção",
    descricao: "Equipe responsável pela produção dos pedidos",
    membros: 12,
    lider: "Pedro Silva",
    status: "ativo",
    dataCriacao: "05/01/2024"
  },
  {
    id: 4,
    nome: "Marketing",
    descricao: "Equipe de marketing digital e campanhas",
    membros: 4,
    lider: "Maria Silva",
    status: "inativo",
    dataCriacao: "20/12/2023"
  }
];

const mockUsuarios = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana@qualitplacas.com",
    telefone: "(11) 99999-9999",
    cargo: "Gerente de Vendas",
    equipe: "Vendas",
    perfil: "administrador",
    status: "ativo",
    ultimoAcesso: "Hoje às 14:30",
    dataAdmissao: "01/06/2023"
  },
  {
    id: 2,
    nome: "João Santos",
    email: "joao@qualitplacas.com",
    telefone: "(11) 88888-8888",
    cargo: "Coordenador de Atendimento",
    equipe: "Atendimento",
    perfil: "gerente",
    status: "ativo",
    ultimoAcesso: "Hoje às 13:45",
    dataAdmissao: "15/08/2023"
  },
  {
    id: 3,
    nome: "Pedro Silva",
    email: "pedro@qualitplacas.com",
    telefone: "(11) 77777-7777",
    cargo: "Supervisor de Produção",
    equipe: "Produção",
    perfil: "supervisor",
    status: "ativo",
    ultimoAcesso: "Ontem às 18:00",
    dataAdmissao: "20/03/2023"
  },
  {
    id: 4,
    nome: "Maria Silva",
    email: "maria@qualitplacas.com",
    telefone: "(11) 66666-6666",
    cargo: "Analista de Marketing",
    equipe: "Marketing",
    perfil: "usuario",
    status: "inativo",
    ultimoAcesso: "3 dias atrás",
    dataAdmissao: "10/01/2024"
  },
  {
    id: 5,
    nome: "Carlos Mendes",
    email: "carlos@qualitplacas.com",
    telefone: "(11) 55555-5555",
    cargo: "Vendedor",
    equipe: "Vendas",
    perfil: "usuario",
    status: "ativo",
    ultimoAcesso: "Hoje às 16:20",
    dataAdmissao: "05/11/2023"
  }
];

export default function Equipes() {
  const [activeTab, setActiveTab] = useState<'equipes' | 'usuarios'>('equipes');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [equipeFilter, setEquipeFilter] = useState('all');
  const [perfilFilter, setPerfilFilter] = useState('all');

  const filteredEquipes = mockEquipes.filter(equipe => {
    const matchesSearch = equipe.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipe.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || equipe.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsuarios = mockUsuarios.filter(usuario => {
    const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || usuario.status === statusFilter;
    const matchesEquipe = equipeFilter === 'all' || usuario.equipe === equipeFilter;
    const matchesPerfil = perfilFilter === 'all' || usuario.perfil === perfilFilter;
    return matchesSearch && matchesStatus && matchesEquipe && matchesPerfil;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-700';
      case 'inativo': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerfilColor = (perfil: string) => {
    switch (perfil) {
      case 'administrador': return 'bg-purple-100 text-purple-700';
      case 'gerente': return 'bg-blue-100 text-blue-700';
      case 'supervisor': return 'bg-orange-100 text-orange-700';
      case 'usuario': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleView = (item: any) => {
    console.log('Visualizando:', item);
  };

  const handleEdit = (item: any) => {
    console.log('Editando:', item);
  };

  const handleDelete = (item: any) => {
    console.log('Excluindo:', item);
  };

  const equipesColumns = [
    {
      key: 'nome',
      label: 'Nome da Equipe',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.descricao}</div>
        </div>
      ),
    },
    {
      key: 'membros',
      label: 'Membros',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          {value}
        </div>
      ),
    },
    {
      key: 'lider',
      label: 'Líder',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge 
          variant="outline"
          className={`${getStatusColor(value)} border-none`}
        >
          {value === 'ativo' ? '✅' : '❌'} {value === 'ativo' ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      key: 'dataCriacao',
      label: 'Data de Criação',
      sortable: true,
    },
  ];

  const usuariosColumns = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.cargo}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'telefone',
      label: 'Telefone',
    },
    {
      key: 'equipe',
      label: 'Equipe',
      sortable: true,
    },
    {
      key: 'perfil',
      label: 'Perfil',
      render: (value: string) => (
        <Badge 
          variant="outline"
          className={`${getPerfilColor(value)} border-none`}
        >
          <Shield className="h-3 w-3 mr-1" />
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge 
          variant="outline"
          className={`${getStatusColor(value)} border-none`}
        >
          {value === 'ativo' ? '🟢' : '🔴'} {value === 'ativo' ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      key: 'ultimoAcesso',
      label: 'Último Acesso',
      sortable: true,
    },
  ];

  // Estatísticas
  const equipesStats = [
    {
      title: 'Total de Equipes',
      value: mockEquipes.length.toString(),
      change: { value: 1, type: 'up' as const },
      icon: Building2,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Equipes Ativas',
      value: mockEquipes.filter(e => e.status === 'ativo').length.toString(),
      change: { value: 0, type: 'up' as const },
      icon: UserCheck,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Total de Usuários',
      value: mockUsuarios.length.toString(),
      change: { value: 2, type: 'up' as const },
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Usuários Ativos',
      value: mockUsuarios.filter(u => u.status === 'ativo').length.toString(),
      change: { value: 1, type: 'up' as const },
      icon: UserCheck,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Administradores',
      value: mockUsuarios.filter(u => u.perfil === 'administrador').length.toString(),
      change: { value: 0, type: 'up' as const },
      icon: Shield,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Média Membros/Equipe',
      value: Math.round(mockUsuarios.length / mockEquipes.filter(e => e.status === 'ativo').length).toString(),
      change: { value: 5, type: 'up' as const },
      icon: Users,
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Equipes e Usuários</h1>
          <p className="text-muted-foreground">
            Gerenciamento de equipes e colaboradores
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar Usuários
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {activeTab === 'equipes' ? 'Nova Equipe' : 'Novo Usuário'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsGrid stats={equipesStats} columns={6} />

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('equipes')}
          className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'equipes'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Building2 className="h-4 w-4 inline mr-2" />
          Equipes
        </button>
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'usuarios'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Usuários
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Buscar ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
        {activeTab === 'usuarios' && (
          <>
            <Select value={equipeFilter} onValueChange={setEquipeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por equipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as equipes</SelectItem>
                {mockEquipes.map((equipe) => (
                  <SelectItem key={equipe.id} value={equipe.nome}>
                    {equipe.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={perfilFilter} onValueChange={setPerfilFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os perfis</SelectItem>
                <SelectItem value="administrador">Administrador</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="usuario">Usuário</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      {/* Content */}
      {activeTab === 'equipes' ? (
        <DataTable
          data={filteredEquipes}
          columns={equipesColumns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRowClick={handleView}
        />
      ) : (
        <DataTable
          data={filteredUsuarios}
          columns={usuariosColumns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRowClick={handleView}
        />
      )}
    </div>
  );
}