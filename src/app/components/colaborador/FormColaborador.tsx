import { useState, useEffect } from 'react';
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Colaborador } from '../../models/Colaborador';
import { cadastrar, atualizar } from '@/app/services/api';
import { useContext } from 'react';
import { AuthContext } from '@/app/contexts/AuthContext';

interface FormColaboradorProps {
  initialData?: Colaborador | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FormColaborador({ initialData, onSuccess, onCancel }: FormColaboradorProps) {
  const { usuario } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Colaborador>({
    nome: '',
    matricula: 0,
    data_admissao: '',
    salario_base: ''
  });

  useEffect(() => {
    if (initialData) {
        setFormData({
            ...initialData,
            data_admissao: initialData.data_admissao ? initialData.data_admissao.split('T')[0] : ''
        });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { Authorization: usuario.token } };

    try {
      if (initialData?.id) {
        await atualizar('/colaboradores', formData, () => {}, config);
      } else {
        await cadastrar('/colaboradores', formData, () => {}, config);
      }
      onSuccess();
    } catch (error) {
      alert("Erro ao salvar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Nome Completo</Label>
        <Input required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Matrícula</Label>
            <Input type="number" required value={formData.matricula} onChange={e => setFormData({...formData, matricula: Number(e.target.value)})} />
          </div>
          <div className="space-y-2">
            <Label>Data Admissão</Label>
            <Input type="date" required value={formData.data_admissao} onChange={e => setFormData({...formData, data_admissao: e.target.value})} />
          </div>
      </div>
      <div className="space-y-2">
        <Label>Salário Base (R$)</Label>
        <Input type="number" step="0.01" required value={formData.salario_base} onChange={e => setFormData({...formData, salario_base: e.target.value})} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-[#F08832]" disabled={loading}>
          {loading ? "Salvando..." : "Confirmar"}
        </Button>
      </div>
    </form>
  );
}