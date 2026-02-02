import { Building2, Edit, Trash2, User } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

interface Unidade {
  id?: number;
  nome: string;
  usuario: string;
  foto?: string;
  colaborador?: any[];
}

interface CardUnidadeProps {
  unidade: Unidade;
  onEdit: (unidade: Unidade) => void;
  onDelete: (id: number) => void;
}

export function CardUnidade({ unidade, onEdit, onDelete }: CardUnidadeProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="p-2 bg-orange-50 rounded-lg text-[#F08832]">
          <Building2 size={20} />
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-500" onClick={() => onEdit(unidade)}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => unidade.id && onDelete(unidade.id)}>
            <Trash2 size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl mb-1">{unidade.nome}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <User className="w-4 h-4" />
          <span>Usuário: <strong>{unidade.usuario}</strong></span>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between text-xs text-gray-500">
          <span>{unidade.colaborador?.length || 0} Colaboradores</span>
          <span className="text-[#F08832] font-medium">Ver Detalhes</span>
        </div>
      </CardContent>
    </Card>
  );
}