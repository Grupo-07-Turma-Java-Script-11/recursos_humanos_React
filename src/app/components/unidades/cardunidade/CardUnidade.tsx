import { Building2, User, Edit, Trash2, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from "../../ui/button";
import Unidade from '../../../../models/Unidade';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog"; //

interface CardUnidadeProps {
    unidade: Unidade;
    onEdit: (unidade: Unidade) => void;
    onDelete: (id: number) => void; // Esta função chamará a API no componente pai
}

function CardUnidade({ unidade, onEdit, onDelete }: CardUnidadeProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-50 rounded-lg text-[#F08832]">
                    {unidade.foto ? (
                        <img src={unidade.foto} alt="Logo" className="w-6 h-6 object-cover rounded-sm" />
                    ) : (
                        <Building2 size={24} />
                    )}
                </div>

                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-blue-500"
                        onClick={() => onEdit(unidade)}
                    >
                        <Edit size={16} />
                    </Button>

                    {/* Implementação do Modal de Deleção */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <div className="cursor-pointer flex items-center gap-2 text-red-600">
                                    <AlertTriangle size={20} />
                                    <AlertDialogTitle>Excluir Unidade</AlertDialogTitle>
                                </div>
                                <AlertDialogDescription>
                                    Você tem certeza que deseja apagar a unidade <strong>{unidade.nome}</strong>?
                                    Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => onDelete(unidade.id)}
                                >
                                    Confirmar Exclusão
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                ID: {unidade.id}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{unidade.nome}</h3>

            <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={16} className="text-[#F08832]" />
                    <span className="truncate">{unidade.usuario}</span>
                </div>
            </div>
        </div>
    );
}
export default CardUnidade;