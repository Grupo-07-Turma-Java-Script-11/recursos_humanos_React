
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "../ui/dialog"; // Ajuste o caminho conforme sua pasta UI
import { FormColaborador } from "./FormColaborador";
import { Colaborador } from "../../../models/Colaborador";


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
          onSuccess={() => { // Alterado de onSubmit para onSuccess
            onSubmit(colaboradorParaEditar!); // Chama a função de recarregar
            onClose(); // Fecha o modal
          }} 
          onCancel={onClose}
          // loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}

