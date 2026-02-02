import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import FormUnidade from "../formunidade/FormUnidade";
import Unidade from "../../../../models/Unidade";

interface ModalUnidadeProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Unidade) => void;
    unidadeParaEditar?: Unidade | null;
    loading?: boolean;
}

function ModalUnidade({ isOpen, onClose, onSubmit, unidadeParaEditar, loading }: ModalUnidadeProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{unidadeParaEditar ? 'Editar Unidade' : 'Nova Unidade'}</DialogTitle>
                    <DialogDescription>
                        Preencha as informações da unidade de atendimento.
                    </DialogDescription>
                </DialogHeader>
                <FormUnidade
                    initialData={unidadeParaEditar}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    loading={loading}
                />
            </DialogContent>
        </Dialog>
    );
}

export default ModalUnidade;