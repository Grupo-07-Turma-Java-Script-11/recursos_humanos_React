import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "../ui/dialog"; 
import { FormHolerite } from "./FormHolerite";
import { Colaborador } from "../../../models/Colaborador";

interface ModalHoleriteProps {
  isOpen: boolean;
  onClose: () => void;
  colaborador: Colaborador;
}

export function ModalHolerite({ isOpen, onClose, colaborador }: ModalHoleriteProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* sm:max-w-[600px] para dar espaço aos campos de descrição e valor lado a lado */}
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Gerar Holerite
          </DialogTitle>
          <DialogDescription>
            Configure os proventos e descontos para o colaborador <strong>{colaborador.nome}</strong>.
          </DialogDescription>
        </DialogHeader>
        
        {/* Renderiza o formulário que criamos anteriormente */}
        <FormHolerite colaborador={colaborador} />
        
      </DialogContent>
    </Dialog>
  );
}