import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

interface DeletarCargoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeletarCargo({ isOpen, onClose, onConfirm, loading }: DeletarCargoProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O cargo será removido permanentemente da estrutura da empresa.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => { e.preventDefault(); onConfirm(); }}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir Cargo"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}