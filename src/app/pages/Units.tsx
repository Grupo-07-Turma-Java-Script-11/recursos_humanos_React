import { useEffect, useState, useContext } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from "../components/ui/button"; 
import { buscar, cadastrar, atualizar, deletar } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { CardUnidade } from '../components/unidade/CardUnidade';
import { ModalUnidade } from '../components/unidade/ModalUnidade';

interface Unidade {
  id?: number;
  nome: string;
  usuario: string;
  senha?: string;
  foto?: string;
}

export function Units() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);

  const { usuario } = useContext(AuthContext);

  const carregarUnidades = async () => {
    if (!usuario.token) return;
    try {
      setLoading(true);
      await buscar('/unidades', setUnidades);
    } catch (error) {
      console.error("Erro ao carregar unidades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarUnidade = async (data: Unidade) => {
    setActionLoading(true);
    try {
      if (selectedUnidade?.id) {
        await atualizar('/unidades', { ...data, id: selectedUnidade.id }, () => {});
      } else {
        await cadastrar('/unidades', data, () => {});
      }
      await carregarUnidades();
      setIsModalOpen(false);
      setSelectedUnidade(null);
    } catch (error) {
      alert("Erro ao salvar unidade.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExcluirUnidade = async (id: number) => {
    if (!confirm("Deseja excluir esta unidade?")) return;
    try {
      await deletar(`/unidades/${id}`);
      await carregarUnidades();
    } catch (error) {
      alert("Erro ao excluir.");
    }
  };

  useEffect(() => {
    carregarUnidades();
  }, [usuario.token]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestão de Unidades</h1>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#F08832] gap-2">
          <Plus size={18} /> Nova Unidade
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {unidades.map((u) => (
            <CardUnidade 
              key={u.id} 
              unidade={u} 
              onEdit={(unid) => { setSelectedUnidade(unid); setIsModalOpen(true); }} 
              onDelete={handleExcluirUnidade} 
            />
          ))}
        </div>
      )}

      <ModalUnidade 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedUnidade(null); }} 
        onSubmit={handleSalvarUnidade}
        unidadeParaEditar={selectedUnidade}
        loading={actionLoading}
      />
    </div>
  );
}