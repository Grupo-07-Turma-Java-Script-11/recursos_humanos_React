import { useEffect, useState, useContext } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import CardUnidade from '../components/unidades/cardunidade/CardUnidade';
import ModalUnidade from '../components/unidades/modalunidade/ModalUnidade';
import Unidade from '../../models/Unidade';
import { AuthContext } from '../../contexts/AuthContext';
import { atualizar, buscar, cadastrar, deletar } from '../../services/Service';
import { ToastAlerta } from "../../utils/ToastAlerta"
import { toast } from 'sonner'; // Opcional: Adicionar feedback visual se tiver a lib instalada, ou usar alert

export default function Unidades() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);

  const { unidade: authUnidade, handleLogout } = useContext(AuthContext);
  const token = authUnidade.token;

  const carregarUnidades = async () => {
    try {
      setLoading(true);
      await buscar('/unidades', setUnidades, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
      console.error("Erro ao carregar unidades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      carregarUnidades();
    }
  }, [token]);

  const handleSalvar = async (data: Unidade) => {
    setActionLoading(true);
    try {
      const header = {
        headers: { Authorization: token }
      };

      if (selectedUnidade?.id) {
        // Atualiza
        await atualizar('/unidades/atualizar', { ...data, id: selectedUnidade.id }, setUnidades, header);
        ToastAlerta("Unidade atualizada com sucesso!", "sucesso");
      } else {
        // Cadastra
        await cadastrar('/unidades/cadastrar', data, setUnidades, header);
        ToastAlerta("Unidade cadastrada com sucesso!", "sucesso");
      }

      await carregarUnidades();
      setIsModalOpen(false);
      setSelectedUnidade(null);
    } catch (error: any) {
      console.error("Erro ao salvar unidade:", error);
      const msg = error.response?.data?.message;
      ToastAlerta(`Erro: ${Array.isArray(msg) ? msg.join(", ") : msg || "Erro ao salvar"}`, "erro");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExcluir = async (id: number) => {
    try {
      await deletar(`/unidades/${id}`, {
        headers: { Authorization: token }
      });
      ToastAlerta("Unidade deletada com sucesso!", "sucesso");
      await carregarUnidades();
    } catch (error) {
      ToastAlerta("Erro ao excluir unidade.", "erro");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Unidades</h1>
          <p className="text-gray-500 text-sm">Gerencie os pontos de atendimento</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="cursor-pointer bg-[#F08832] hover:bg-[#d97728] gap-2">
          <Plus size={18} /> Nova Unidade
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#F08832]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unidades.map((unidade) => (
            <CardUnidade
              key={unidade.id}
              unidade={unidade}
              onEdit={(u) => { setSelectedUnidade(u); setIsModalOpen(true); }}
              onDelete={handleExcluir}
            />
          ))}
        </div>
      )}

      <ModalUnidade
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedUnidade(null); }}
        onSubmit={handleSalvar}
        unidadeParaEditar={selectedUnidade}
        loading={actionLoading}
      />
    </div>
  );
}