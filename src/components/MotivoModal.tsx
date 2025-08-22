import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, X } from 'lucide-react';

interface MotivoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titulo: string;
  tipo: 'lead' | 'atendimento';
  novoStatus: string;
  onConfirm: (motivo: string, motivoPredefinido?: string) => void;
}

export function MotivoModal({ open, onOpenChange, titulo, tipo, novoStatus, onConfirm }: MotivoModalProps) {
  const [motivoPredefinido, setMotivoPredefinido] = useState('');
  const [motivoCustom, setMotivoCustom] = useState('');

  const getMotivosDisponiveis = () => {
    if (novoStatus === 'perdido') {
      return [
        'Preço muito alto',
        'Não teve interesse no produto/serviço',
        'Escolheu concorrente',
        'Não respondeu aos contatos',
        'Não tem orçamento disponível',
        'Prazo de entrega não atende',
        'Projeto cancelado/adiado',
        'Outro motivo'
      ];
    }
    
    if (novoStatus === 'frio') {
      return [
        'Não demonstrou interesse',
        'Está avaliando outras opções',
        'Não é o momento certo',
        'Precisa de aprovação interna',
        'Não respondeu aos contatos',
        'Budget insuficiente no momento',
        'Outro motivo'
      ];
    }

    return [
      'Cliente solicitou',
      'Não há mais interesse',
      'Mudança de prioridades',
      'Questões técnicas',
      'Questões comerciais',
      'Outro motivo'
    ];
  };

  const handleConfirm = () => {
    const motivoFinal = motivoPredefinido === 'Outro motivo' ? motivoCustom : motivoPredefinido;
    
    if (!motivoFinal.trim()) {
      return; // Validação simples
    }

    onConfirm(motivoFinal, motivoPredefinido !== 'Outro motivo' ? motivoPredefinido : undefined);
    
    // Reset form
    setMotivoPredefinido('');
    setMotivoCustom('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setMotivoPredefinido('');
    setMotivoCustom('');
    onOpenChange(false);
  };

  const getStatusLabel = () => {
    const labels: Record<string, string> = {
      'perdido': 'Perdido',
      'frio': 'Frio',
      'finalizado': 'Finalizado',
      'cancelado': 'Cancelado'
    };
    return labels[novoStatus] || novoStatus;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Motivo da Alteração
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Você está alterando o status do {tipo} <strong>"{titulo}"</strong> para{' '}
            <strong className="text-foreground">{getStatusLabel()}</strong>.
            <br />
            Por favor, informe o motivo desta alteração:
          </div>

          <div className="space-y-3">
            <Label>Selecione o motivo:</Label>
            <RadioGroup value={motivoPredefinido} onValueChange={setMotivoPredefinido}>
              {getMotivosDisponiveis().map((motivo) => (
                <div key={motivo} className="flex items-center space-x-2">
                  <RadioGroupItem value={motivo} id={motivo} />
                  <Label htmlFor={motivo} className="text-sm font-normal cursor-pointer">
                    {motivo}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {motivoPredefinido === 'Outro motivo' && (
            <div className="space-y-2">
              <Label htmlFor="motivoCustom">Descreva o motivo:</Label>
              <Textarea
                id="motivoCustom"
                placeholder="Digite o motivo específico..."
                value={motivoCustom}
                onChange={(e) => setMotivoCustom(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!motivoPredefinido || (motivoPredefinido === 'Outro motivo' && !motivoCustom.trim())}
          >
            Confirmar Alteração
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}