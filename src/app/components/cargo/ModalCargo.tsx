import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { FormCargo } from "./FormCargo";

interface ModalCargoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  cargoParaEditar?: any;
  loading?: boolean;
}

export function ModalCargo({ isOpen, onClose, onSubmit, cargoParaEditar, loading }: ModalCargoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{cargoParaEditar ? 'Editar Cargo' : 'Novo Cargo'}</DialogTitle>
          <DialogDescription>
            Preencha as informações da estrutura organizacional.
          </DialogDescription>
        </DialogHeader>
        <FormCargo 
          initialData={cargoParaEditar} 
          onSubmit={onSubmit} 
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}