import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { FormColaborador } from "./FormColaborador";
import { Colaborador } from "../../models/Colaborador";

interface ModalColaboradorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Colaborador) => void;
  colaboradorParaEditar?: Colaborador | null;
  loading?: boolean;
}

export function ModalColaborador({ isOpen, onClose, onSubmit, colaboradorParaEditar, loading }: ModalColaboradorProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {colaboradorParaEditar ? 'Editar Colaborador' : 'Novo Colaborador'}
          </DialogTitle>
          <DialogDescription>
            {colaboradorParaEditar 
              ? 'Altere as informações do colaborador selecionado.' 
              : 'Cadastre um novo funcionário preenchendo os campos abaixo.'}
          </DialogDescription>
        </DialogHeader>
        
        <FormColaborador 
          initialData={colaboradorParaEditar} 
          onSubmit={onSubmit} 
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}