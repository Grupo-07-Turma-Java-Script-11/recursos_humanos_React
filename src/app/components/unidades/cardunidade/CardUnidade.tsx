import { Building2, User, Edit, Trash2, MapPin } from 'lucide-react';
import { Button } from "../../ui/button";
import Unidade from '../../../../models/Unidade';

interface CardUnidadeProps {
    unidade: Unidade;
    onEdit: (unidade: Unidade) => void;
    onDelete: (id: number) => void;
}

function CardUnidade({ unidade, onEdit, onDelete }: CardUnidadeProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#F08832]/30 transition-all group relative">
            <div className="flex justify-between items-start mb-4">
                {/* Ícone principal com fundo laranja claro */}
                <div className="p-3 bg-orange-50 rounded-lg text-[#F08832]">
                    {unidade.foto ? (
                        <img src={unidade.foto} alt="Logo" className="w-6 h-6 object-cover rounded-sm" />
                    ) : (
                        <Building2 size={24} />
                    )}
                </div>

                {/* Botões de Ação */}
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer h-8 w-8 text-gray-400 hover:text-blue-500"
                        onClick={() => onEdit(unidade)}
                    >
                        <Edit size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer h-8 w-8 text-gray-400 hover:text-red-500"
                        onClick={() => onDelete(unidade.id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            {/* Badge ou Info extra */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                ID: {unidade.id}
            </span>

            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#F08832] transition-colors">
                {unidade.nome}
            </h3>

            {/* Informações adicionais */}
            <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={16} className="text-[#F08832]" />
                    <span className="truncate">{unidade.usuario}</span>
                </div>
                {/* Placeholder para local ou outra info se houver */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} className="text-gray-400" />
                    <span>Unidade Ativa</span>
                </div>
            </div>
        </div>
    );
}
export default CardUnidade;