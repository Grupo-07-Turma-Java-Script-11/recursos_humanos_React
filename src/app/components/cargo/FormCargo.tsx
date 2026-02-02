import { useState, useEffect } from 'react';
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

interface FormCargoProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function FormCargo({ initialData, onSubmit, onCancel, loading }: FormCargoProps) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao_funcao: '',
    nivel_hierarquico: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        descricao_funcao: initialData.descricao_funcao || '',
        nivel_hierarquico: initialData.nivel_hierarquico || ''
      });
    }
  }, [initialData]);

  return (
    <form className="space-y-4 pt-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <div className="space-y-2">
        <Label htmlFor="nome">Nome do Cargo</Label>
        <Input 
          id="nome" 
          required
          value={formData.nome} 
          onChange={e => setFormData({...formData, nome: e.target.value})} 
          placeholder="Ex: Desenvolvedor Full Stack"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nivel">Nível Hierárquico</Label>
        <Input 
          id="nivel" 
          required
          value={formData.nivel_hierarquico} 
          onChange={e => setFormData({...formData, nivel_hierarquico: e.target.value})} 
          placeholder="Ex: Senior, Pleno, Direção"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição da Função</Label>
        <Textarea 
          id="descricao" 
          required
          value={formData.descricao_funcao} 
          onChange={e => setFormData({...formData, descricao_funcao: e.target.value})} 
          placeholder="Principais responsabilidades..."
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#F08832] hover:bg-[#d97728]" disabled={loading}>
          {loading ? "Processando..." : "Confirmar"}
        </Button>
      </div>
    </form>
  );
}