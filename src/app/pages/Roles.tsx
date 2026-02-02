import { useEffect, useState, useContext } from 'react';
import { Plus, Loader2, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button'
import { CardCargo } from '../components/cargo/CardCargo';
import { ModalCargo } from '../components/cargo/ModalCargo';
import { Cargo } from '../../models/Cargo';
import { AuthContext } from '../../contexts/AuthContext';
import { atualizar, buscar, cadastrar, deletar } from '../../services/Service';


export function Roles() {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);

  const { unidade } = useContext(AuthContext);
  const token = unidade.token

  const carregarCargos = async () => {
    try {
      setLoading(true);
      // O token agora é injetado automaticamente pelo interceptor do api.ts
      await buscar('/cargos', setCargos, {
        headers: {Authorization:token}
      });
    } catch (error) {
      console.error("Erro ao carregar cargos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      carregarCargos();
    }
  }, [token]);

  const handleSalvar = async (data: Cargo) => {
      setActionLoading(true);
      try {
        const header = {
          headers: { Authorization: token }
        };

        if (selectedCargo?.id) {
          // Atualiza o cargo existente
          await atualizar('/cargos', { ...data, id: selectedCargo.id }, setCargos, header);
          alert("Cargo atulizado com sucesso")
        } else {
          // Cadastra um novo cargo
          await cadastrar('/cargos', data, setCargos, header);
          alert("Cargo cadastrado com sucesso")
        }

        // Recarrega a lista para garantir sincronia com o banco
        await carregarCargos();
        setIsModalOpen(false);
        setSelectedCargo(null);
      } catch (error) {
        console.error("Erro ao salvar cargo:", error);
        alert("Erro ao salvar cargo. Verifique sua conexão ou permissões.");
      } finally {
        setActionLoading(false);
      }
    };

  const handleExcluir = async (id: number) => {
    try {
      await deletar(`/cargos/${id}`,  {
        headers: {Authorization:token}
      });
      alert("Cargo deletado com sucesso")
      await carregarCargos();
    } catch (error) {
      alert("Erro ao excluir cargo.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cargos e Funções</h1>
          <p className="text-gray-500 text-sm">Gerencie a estrutura hierárquica</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-[#F08832] hover:bg-[#d97728] gap-2">
          <Plus size={18} /> Novo Cargo
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#F08832]" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cargos.map((cargo) => (
            <CardCargo 
              key={cargo.id} 
              cargo={cargo} 
              onEdit={(c) => { setSelectedCargo(c); setIsModalOpen(true); }} 
              onDelete={handleExcluir} 
            />
          ))}
        </div>
      )}

      <ModalCargo 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedCargo(null); }} 
        onSubmit={handleSalvar}
        cargoParaEditar={selectedCargo}
        loading={actionLoading}
      />
    </div>
  );
}