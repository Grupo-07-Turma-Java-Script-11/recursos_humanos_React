import { useState, useEffect, useContext } from 'react';
import { Colaborador } from '../../../models/Colaborador';
import { Cargo } from '../../../models/Cargo'; 
import Unidade from '../../../models/Unidade'; // Importe o model de Unidade
import { AuthContext } from '../../../contexts/AuthContext';
import { atualizar, cadastrar, buscar } from '../../../services/Service'; 
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface FormColaboradorProps {
  initialData?: Colaborador | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FormColaborador({ initialData, onSuccess, onCancel }: FormColaboradorProps) {
  const { unidade: unidadeLogada } = useContext(AuthContext); //
  const [loading, setLoading] = useState(false);
  const [cargos, setCargos] = useState<Cargo[]>([]); 
  const [unidades, setUnidades] = useState<Unidade[]>([]); // Estado para armazenar as unidades
  
  const [formData, setFormData] = useState<Colaborador>({
    nome: '',
    matricula: 0,
    data_admissao: '',
    salario_base: '',
    cargo: undefined,
    unidade: undefined // Campo para a unidade selecionada
  });

  // Carrega cargos e unidades ao abrir o formulário
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const config = { headers: { Authorization: unidadeLogada.token } }; //
        await buscar('/cargos', setCargos, config);
        await buscar('/unidades', setUnidades, config); // Busca todas as unidades do backend
      } catch (error) {
        console.error("Erro ao buscar dados iniciais", error);
      }
    };
    if (unidadeLogada.token) carregarDados();
  }, [unidadeLogada.token]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        data_admissao: initialData.data_admissao ? initialData.data_admissao.split('T')[0] : ''
      });
    }
  }, [initialData]);

  // Handlers para as seleções
  const handleCargoChange = (cargoId: string) => {
    const cargoSelecionado = cargos.find(c => c.id === Number(cargoId));
    setFormData({ ...formData, cargo: cargoSelecionado });
  };

  const handleUnidadeChange = (unidadeId: string) => {
    const unidadeSelecionada = unidades.find(u => u.id === Number(unidadeId));
    setFormData({ ...formData, unidade: unidadeSelecionada });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { Authorization: unidadeLogada.token } }; //

    try {
      if (initialData?.id) {
        await atualizar('/colaboradores', { ...formData, id: initialData.id }, () => {}, config); //
        alert("Colaborador atualizado com sucesso!");
      } else {
        await cadastrar('/colaboradores', formData, () => {}, config); //
        alert("Colaborador cadastrado com sucesso!");
      }
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Nome Completo</Label>
        <Input required value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Seleção de Cargo */}
        <div className="space-y-2">
          <Label>Cargo</Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
            value={formData.cargo?.id || ""}
            onChange={(e) => handleCargoChange(e.target.value)}
          >
            <option value="" disabled>Selecione um cargo</option>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.id}>{cargo.nome}</option>
            ))}
          </select>
        </div>

        {/* Seleção de Unidade */}
        <div className="space-y-2">
          <Label>Unidade</Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
            value={formData.unidade?.id || ""}
            onChange={(e) => handleUnidadeChange(e.target.value)}
          >
            <option value="" disabled>Selecione a unidade</option>
            {unidades.map((uni) => (
              <option key={uni.id} value={uni.id}>{uni.nome}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Matrícula</Label>
          <Input type="text" required value={formData.matricula} onChange={e => setFormData({ ...formData, matricula: Number(e.target.value) })} />
        </div>
        <div className="space-y-2">
          <Label>Data Admissão</Label>
          <Input type="date" required value={formData.data_admissao} onChange={e => setFormData({ ...formData, data_admissao: e.target.value })} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Salário Base (R$)</Label>
        <Input type="number" step="0.01" required value={formData.salario_base} onChange={e => setFormData({ ...formData, salario_base: e.target.value })} />
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