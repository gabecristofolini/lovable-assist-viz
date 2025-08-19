import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, User, Package, CreditCard, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const steps = [
  { id: 1, name: 'Cliente', icon: User },
  { id: 2, name: 'Produtos', icon: Package },
  { id: 3, name: 'Pagamento', icon: CreditCard },
  { id: 4, name: 'Revisão', icon: FileCheck },
];

const mockClientes = [
  { id: 1, nome: 'João Silva', empresa: 'Tech Solutions' },
  { id: 2, nome: 'Ana Costa', empresa: 'Startup XYZ' },
  { id: 3, nome: 'Pedro Santos', empresa: 'Indústria ABC' },
];

const mockProdutos = [
  { id: 1, nome: 'Consultoria Estratégica', preco: 2500 },
  { id: 2, nome: 'Desenvolvimento de Sistema', preco: 8000 },
  { id: 3, nome: 'Treinamento Técnico', preco: 1500 },
  { id: 4, nome: 'Suporte Mensal', preco: 800 },
];

export default function NovoPedido() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedProdutos, setSelectedProdutos] = useState<{id: number, quantidade: number}[]>([]);
  const [formaPagamento, setFormaPagamento] = useState('');
  const [parcelas, setParcelas] = useState('1');
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addProduto = (produtoId: number) => {
    const existing = selectedProdutos.find(p => p.id === produtoId);
    if (existing) {
      setSelectedProdutos(selectedProdutos.map(p => 
        p.id === produtoId ? { ...p, quantidade: p.quantidade + 1 } : p
      ));
    } else {
      setSelectedProdutos([...selectedProdutos, { id: produtoId, quantidade: 1 }]);
    }
  };

  const updateQuantidade = (produtoId: number, quantidade: number) => {
    if (quantidade <= 0) {
      setSelectedProdutos(selectedProdutos.filter(p => p.id !== produtoId));
    } else {
      setSelectedProdutos(selectedProdutos.map(p => 
        p.id === produtoId ? { ...p, quantidade } : p
      ));
    }
  };

  const calcularTotal = () => {
    return selectedProdutos.reduce((total, item) => {
      const produto = mockProdutos.find(p => p.id === item.id);
      return total + (produto?.preco || 0) * item.quantidade;
    }, 0);
  };

  const finalizarPedido = () => {
    // Simulate order creation
    console.log('Pedido criado:', {
      cliente: selectedCliente,
      produtos: selectedProdutos,
      pagamento: formaPagamento,
      parcelas,
      total: calcularTotal()
    });
    navigate('/pedidos');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/pedidos')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Novo Pedido</h1>
            <p className="text-muted-foreground">Etapa {currentStep} de {steps.length}</p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 
              ${currentStep > step.id 
                ? 'bg-primary border-primary text-primary-foreground' 
                : currentStep === step.id 
                  ? 'border-primary text-primary' 
                  : 'border-muted-foreground text-muted-foreground'
              }
            `}>
              {currentStep > step.id ? (
                <Check className="h-5 w-5" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <CardTitle>Selecionar Cliente</CardTitle>
              <div className="space-y-2">
                <Label>Cliente</Label>
                <Select value={selectedCliente} onValueChange={setSelectedCliente}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id.toString()}>
                        {cliente.nome} - {cliente.empresa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <CardTitle>Selecionar Produtos</CardTitle>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProdutos.map((produto) => {
                  const selected = selectedProdutos.find(p => p.id === produto.id);
                  return (
                    <Card key={produto.id} className="cursor-pointer hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{produto.nome}</h4>
                            <p className="text-muted-foreground">
                              R$ {produto.preco.toLocaleString()}
                            </p>
                          </div>
                          {selected ? (
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantidade(produto.id, selected.quantidade - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{selected.quantidade}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantidade(produto.id, selected.quantidade + 1)}
                              >
                                +
                              </Button>
                            </div>
                          ) : (
                            <Button onClick={() => addProduto(produto.id)}>
                              Adicionar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {selectedProdutos.length > 0 && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Produtos Selecionados:</h4>
                  {selectedProdutos.map((item) => {
                    const produto = mockProdutos.find(p => p.id === item.id);
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{produto?.nome} x{item.quantidade}</span>
                        <span>R$ {((produto?.preco || 0) * item.quantidade).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <CardTitle>Forma de Pagamento</CardTitle>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Forma de Pagamento</Label>
                  <Select value={formaPagamento} onValueChange={setFormaPagamento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                      <SelectItem value="boleto">Boleto Bancário</SelectItem>
                      <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Parcelas</Label>
                  <Select value={parcelas} onValueChange={setParcelas}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">À vista</SelectItem>
                      <SelectItem value="2">2x sem juros</SelectItem>
                      <SelectItem value="3">3x sem juros</SelectItem>
                      <SelectItem value="6">6x com juros</SelectItem>
                      <SelectItem value="12">12x com juros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <CardTitle>Revisão do Pedido</CardTitle>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Cliente:</h4>
                  <p>{mockClientes.find(c => c.id.toString() === selectedCliente)?.nome}</p>
                  <p className="text-muted-foreground">
                    {mockClientes.find(c => c.id.toString() === selectedCliente)?.empresa}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Produtos:</h4>
                  {selectedProdutos.map((item) => {
                    const produto = mockProdutos.find(p => p.id === item.id);
                    return (
                      <div key={item.id} className="flex justify-between">
                        <span>{produto?.nome} x{item.quantidade}</span>
                        <span>R$ {((produto?.preco || 0) * item.quantidade).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Pagamento:</h4>
                  <p>Forma: {formaPagamento}</p>
                  <p>Parcelas: {parcelas}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 bg-card rounded-lg border">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p className="text-sm text-muted-foreground">Desconto</p>
          <p className="text-lg font-semibold">Total: R$ {calcularTotal().toLocaleString()}</p>
        </div>
        
        <div className="flex space-x-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          )}
          {currentStep < steps.length ? (
            <Button onClick={nextStep} disabled={
              (currentStep === 1 && !selectedCliente) ||
              (currentStep === 2 && selectedProdutos.length === 0) ||
              (currentStep === 3 && (!formaPagamento || !parcelas))
            }>
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={finalizarPedido}>
              <Check className="mr-2 h-4 w-4" />
              Finalizar Pedido
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}