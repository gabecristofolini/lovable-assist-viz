export const mockData = {
  // Métricas em tempo real
  metrics: {
    leadsHoje: 47,
    atendimentosAbertos: 12,
    pedidosHoje: 34,
    faturamentoHoje: 148500,
    metaDiaria: 150000,
    taxaConversao: 34,
    ticketMedio: 4850,
    atendimentosResolvidosHoje: 45,
    leadsAtivos: 127,
    tempoMedioResposta: 3.2,
    slaAtendimento: 94
  },

  // Campanhas
  campanhas: [
    {
      id: 1,
      nome: "Black Friday 2024",
      canal: "Meta",
      investimento: 15000,
      leads: 234,
      conversoes: 78,
      roi: 320,
      status: "ativa",
      dataInicio: "01/11/2024",
      dataFim: "30/11/2024",
      impressoes: 125000,
      cliques: 2340,
      ctr: 1.87,
      cpc: 6.41
    },
    {
      id: 2,
      nome: "Google Shopping Q1",
      canal: "Google",
      investimento: 28000,
      leads: 189,
      conversoes: 56,
      roi: 280,
      status: "ativa",
      dataInicio: "01/01/2024",
      dataFim: "31/03/2024",
      impressoes: 89000,
      cliques: 1890,
      ctr: 2.12,
      cpc: 14.81
    },
    {
      id: 3,
      nome: "TikTok Influencers",
      canal: "TikTok",
      investimento: 12000,
      leads: 412,
      conversoes: 145,
      roi: 450,
      status: "pausada",
      dataInicio: "15/10/2024",
      dataFim: "15/12/2024",
      impressoes: 245000,
      cliques: 4120,
      ctr: 1.68,
      cpc: 2.91
    }
  ],

  // Criativos
  criativos: [
    {
      id: 1,
      nome: "Banner Black Friday A",
      tipo: "imagem",
      formato: "1080x1080",
      campanhaId: 1,
      campanha: "Black Friday 2024",
      status: "aprovado",
      impressoes: 45000,
      cliques: 890,
      conversoes: 34,
      ctr: 1.98,
      taxa_conversao: 3.82,
      url_preview: "/api/placeholder/300/300"
    },
    {
      id: 2,
      nome: "Vídeo TikTok Produto",
      tipo: "video",
      formato: "9:16",
      campanhaId: 3,
      campanha: "TikTok Influencers",
      status: "aprovado",
      impressoes: 125000,
      cliques: 2100,
      conversoes: 87,
      ctr: 1.68,
      taxa_conversao: 4.14,
      url_preview: "/api/placeholder/300/400"
    }
  ],

  // Clientes expandidos
  clientes: [
    {
      id: 1,
      nome: "Carlos Mendes",
      email: "carlos@techbrasil.com",
      telefone: "(11) 98765-4321",
      empresa: "Tech Brasil Ltda",
      cnpj: "12.345.678/0001-90",
      segmento: "B2B",
      porte: "Médio",
      setor: "Tecnologia",
      tags: ["Recorrente", "Premium"],
      score: 4,
      ultimoContato: "2024-01-19",
      valorTotalPedidos: 145000,
      status: "ativo",
      desde: "2022-03-15"
    }
  ],

  // Chatbots
  chatbots: [
    {
      id: 1,
      nome: "Bot Atendimento WhatsApp",
      canal: "whatsapp",
      status: "ativo",
      gatilhos: ["palavra-chave: orçamento", "fora do horário"],
      taxa_resolucao: 68,
      interacoes_dia: 245,
      fluxo_preview: "Saudação → Captar interesse → Direcionar para humano"
    },
    {
      id: 2,
      nome: "Chat Website",
      canal: "site",
      status: "ativo",
      gatilhos: ["tempo na página > 30s", "tentativa de sair"],
      taxa_resolucao: 45,
      interacoes_dia: 89,
      fluxo_preview: "Oferecer ajuda → Capturar lead → Agendar contato"
    }
  ],

  // Leads com origem
  leads: [
    { 
      id: 1, 
      nome: "João Silva", 
      empresa: "Tech Solutions", 
      email: "joao@techsolutions.com",
      telefone: "(11) 99999-1234",
      status: "novo", 
      temperatura: "quente",
      valor: 15000,
      responsavel: "Ana Silva",
      ultimaInteracao: "Há 2 horas",
      origem: {
        campanha: "Black Friday 2024",
        criativo: "Banner A",
        canal: "Meta"
      },
      dias_no_funil: 2,
      proximo_contato: "Hoje 14h",
      tags: ["Primeiro contato", "Interessado em premium"]
    },
    { 
      id: 2, 
      nome: "Ana Costa", 
      empresa: "Startup XYZ", 
      email: "ana@startupxyz.com",
      telefone: "(11) 98888-5678",
      status: "qualificado", 
      valor: 25000,
      responsavel: "Carlos Mendes",
      ultimaInteracao: "Há 1 dia"
    },
    { 
      id: 3, 
      nome: "Pedro Santos", 
      empresa: "Indústria ABC", 
      email: "pedro@industriaabc.com",
      telefone: "(11) 97777-9012",
      status: "negociacao", 
      valor: 45000,
      responsavel: "Maria Oliveira",
      ultimaInteracao: "Há 3 horas"
    },
    { 
      id: 4, 
      nome: "Mariana Lima", 
      empresa: "Comércio 123", 
      email: "mariana@comercio123.com",
      telefone: "(11) 96666-3456",
      status: "qualificado", 
      valor: 8000,
      responsavel: "João Pedro",
      ultimaInteracao: "Há 5 horas"
    },
    { 
      id: 5, 
      nome: "Roberto Alves", 
      empresa: "Serviços LTDA", 
      email: "roberto@servicosltda.com",
      telefone: "(11) 95555-7890",
      status: "perdido", 
      valor: 12000,
      responsavel: "Ana Silva",
      ultimaInteracao: "Há 2 dias"
    },
    { 
      id: 6, 
      nome: "Fernanda Costa", 
      empresa: "Digital Corp", 
      email: "fernanda@digitalcorp.com",
      telefone: "(11) 94444-2468",
      status: "novo", 
      valor: 18000,
      responsavel: "Carlos Mendes",
      ultimaInteracao: "Há 1 hora"
    },
    { 
      id: 7, 
      nome: "Lucas Ferreira", 
      empresa: "Inovação Tech", 
      email: "lucas@inovacaotech.com",
      telefone: "(11) 93333-1357",
      status: "negociacao", 
      valor: 32000,
      responsavel: "Maria Oliveira",
      ultimaInteracao: "Há 4 horas"
    },
    { 
      id: 8, 
      nome: "Camila Rodrigues", 
      empresa: "Solutions Plus", 
      email: "camila@solutionsplus.com",
      telefone: "(11) 92222-9753",
      status: "qualificado", 
      valor: 22000,
      responsavel: "João Pedro",
      ultimaInteracao: "Há 6 horas"
    }
  ],
  
  conversas: [
    { 
      id: 1, 
      nome: "Maria Souza",
      ultimaMensagem: "Obrigada pelo retorno!",
      hora: "10:45",
      naoLidas: 2,
      online: true,
      telefone: "(11) 99999-0001"
    },
    { 
      id: 2, 
      nome: "Carlos Dias",
      ultimaMensagem: "Ok, obrigado!",
      hora: "09:45",
      naoLidas: 0,
      online: false,
      telefone: "(11) 99999-0002"
    },
    { 
      id: 3, 
      nome: "Empresa Beta",
      ultimaMensagem: "Qual o prazo de entrega?",
      hora: "Ontem",
      naoLidas: 1,
      online: true,
      telefone: "(11) 99999-0003"
    },
    { 
      id: 4, 
      nome: "Julia Santos",
      ultimaMensagem: "Perfeito, vou analisar",
      hora: "08:30",
      naoLidas: 0,
      online: false,
      telefone: "(11) 99999-0004"
    },
    { 
      id: 5, 
      nome: "Tech Startup",
      ultimaMensagem: "Preciso de mais informações",
      hora: "Ontem",
      naoLidas: 3,
      online: true,
      telefone: "(11) 99999-0005"
    }
  ],
  
  pedidos: [
    { 
      id: 1, 
      numero: "2024-001", 
      cliente: "ABC Corp", 
      valor: 12500, 
      status: "processando",
      itens: 8,
      data: "14/01/2024"
    },
    { 
      id: 2, 
      numero: "2024-002", 
      cliente: "XYZ Ltd", 
      valor: 8900, 
      status: "concluido",
      itens: 5,
      data: "13/01/2024"
    },
    { 
      id: 3, 
      numero: "2024-003", 
      cliente: "Beta Inc", 
      valor: 15600, 
      status: "enviado",
      itens: 12,
      data: "15/01/2024"
    },
    { 
      id: 4, 
      numero: "2024-004", 
      cliente: "Gamma Solutions", 
      valor: 9200, 
      status: "confirmado",
      itens: 6,
      data: "16/01/2024"
    },
    { 
      id: 5, 
      numero: "2024-005", 
      cliente: "Delta Corp", 
      valor: 22000, 
      status: "rascunho",
      itens: 15,
      data: "17/01/2024"
    }
  ],
  
  metricas: {
    leadsAtivos: 127,
    taxaConversao: 34,
    ticketMedio: 4850,
    atendimentosHoje: 45
  },

  atividades: [
    {
      id: 1,
      hora: "10:30",
      tipo: "Email",
      descricao: "Email enviado para João Silva",
      responsavel: "Ana Silva"
    },
    {
      id: 2,
      hora: "09:45",
      tipo: "Ligação",
      descricao: "Ligação realizada para Pedro Santos",
      responsavel: "Carlos Mendes"
    },
    {
      id: 3,
      hora: "09:15",
      tipo: "Reunião",
      descricao: "Reunião agendada com Ana Costa",
      responsavel: "Maria Oliveira"
    },
    {
      id: 4,
      hora: "08:50",
      tipo: "Proposta",
      descricao: "Proposta enviada para Mariana Lima",
      responsavel: "João Pedro"
    },
    {
      id: 5,
      hora: "08:20",
      tipo: "WhatsApp",
      descricao: "Mensagem via WhatsApp para Roberto Alves",
      responsavel: "Ana Silva"
    }
  ],

  chartData: [
    { data: "01/01", leads: 12 },
    { data: "02/01", leads: 19 },
    { data: "03/01", leads: 15 },
    { data: "04/01", leads: 25 },
    { data: "05/01", leads: 22 },
    { data: "06/01", leads: 30 },
    { data: "07/01", leads: 28 },
    { data: "08/01", leads: 35 },
    { data: "09/01", leads: 32 },
    { data: "10/01", leads: 40 },
    { data: "11/01", leads: 38 },
    { data: "12/01", leads: 45 },
    { data: "13/01", leads: 42 },
    { data: "14/01", leads: 48 },
    { data: "15/01", leads: 50 },
    { data: "16/01", leads: 52 },
    { data: "17/01", leads: 48 },
    { data: "18/01", leads: 55 },
    { data: "19/01", leads: 53 },
    { data: "20/01", leads: 58 }
  ],

  mensagens: [
    {
      id: 1,
      conversaId: 1,
      remetente: "cliente",
      texto: "Olá! Gostaria de saber mais sobre os seus serviços",
      hora: "10:30",
      data: "19/01/2024"
    },
    {
      id: 2,
      conversaId: 1,
      remetente: "atendente",
      texto: "Olá Maria! Claro, ficarei feliz em ajudar. Sobre qual serviço você gostaria de saber?",
      hora: "10:32",
      data: "19/01/2024"
    },
    {
      id: 3,
      conversaId: 1,
      remetente: "cliente",
      texto: "Estou interessada na consultoria em tecnologia",
      hora: "10:35",
      data: "19/01/2024"
    },
    {
      id: 4,
      conversaId: 1,
      remetente: "atendente",
      texto: "Perfeito! Nossa consultoria em tecnologia abrange desde estratégia digital até implementação de soluções. Posso agendar uma reunião para conversarmos melhor?",
      hora: "10:37",
      data: "19/01/2024"
    },
    {
      id: 5,
      conversaId: 1,
      remetente: "cliente",
      texto: "Sim, seria ótimo! Quando você tem disponibilidade?",
      hora: "10:40",
      data: "19/01/2024"
    },
    {
      id: 6,
      conversaId: 1,
      remetente: "atendente",
      texto: "Tenho disponibilidade na próxima terça-feira às 14h ou quarta-feira às 10h. Qual horário é melhor para você?",
      hora: "10:42",
      data: "19/01/2024"
    },
    {
      id: 7,
      conversaId: 1,
      remetente: "cliente",
      texto: "Terça-feira às 14h está perfeito!",
      hora: "10:44",
      data: "19/01/2024"
    },
    {
      id: 8,
      conversaId: 1,
      remetente: "atendente",
      texto: "Ótimo! Já agendei nossa reunião para terça-feira às 14h. Te enviarei o link por email. Obrigada pelo contato!",
      hora: "10:45",
      data: "19/01/2024"
    }
  ]
};

export const getStatusColor = (status: string) => {
  const colors = {
    novo: "bg-blue-100 text-blue-800",
    qualificado: "bg-green-100 text-green-800", 
    negociacao: "bg-amber-100 text-amber-800",
    perdido: "bg-red-100 text-red-800",
    rascunho: "bg-gray-100 text-gray-800",
    confirmado: "bg-blue-100 text-blue-800",
    processando: "bg-amber-100 text-amber-800",
    enviado: "bg-purple-100 text-purple-800",
    concluido: "bg-green-100 text-green-800"
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const getStatusLabel = (status: string) => {
  const labels = {
    novo: "Novo",
    qualificado: "Qualificado",
    negociacao: "Negociação",
    perdido: "Perdido",
    rascunho: "Rascunho",
    confirmado: "Confirmado", 
    processando: "Processando",
    enviado: "Enviado",
    concluido: "Concluído"
  };
  return labels[status as keyof typeof labels] || status;
};