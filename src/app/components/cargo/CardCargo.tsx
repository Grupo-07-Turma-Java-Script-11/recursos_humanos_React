import { Briefcase, Users, Info, Edit, Trash2 } from 'lucide-react';
import { Button } from "../../components/ui/button";

interface Cargo {
  id?: number;
  nome: string;
  descricao_funcao: string;
  nivel_hierarquico: string;
  colaborador?: string[];
}

interface CardCargoProps {
  cargo: Cargo;
  onEdit: (cargo: Cargo) => void;
  onDelete: (id: number) => void;
}

export function CardCargo({ cargo, onEdit, onDelete }: CardCargoProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#F08832]/30 transition-all group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-orange-50 rounded-lg text-[#F08832]">
          <Briefcase size={24} />
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-blue-500"
            onClick={() => onEdit(cargo)}
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => cargo.id && onDelete(cargo.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
      
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
        {cargo.nivel_hierarquico}
      </span>
      
      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#F08832] transition-colors">
        {cargo.nome}
      </h3>
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
        {cargo.descricao_funcao}
      </p>
      
      <div className="pt-4 border-t flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={16} className="text-[#F08832]" />
          <span className="font-semibold">{cargo.colaborador?.length || 0}</span> Colaboradores
        </div>
        <Info size={14} className="text-gray-400" />
      </div>
    </div>
  );
}