import { useEffect, useState, useContext } from 'react';
import { UserPlus, Search, Loader2, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { ModalColaborador } from '../components/colaborador/ModalColaborador';
import { Colaborador } from '../../models/Colaborador';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar, deletar } from '../../services/Service';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
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
} from "../components/ui/alert-dialog";
import { ToastAlerta } from "../../utils/ToastAlerta"

export function Employees() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  const { unidade } = useContext(AuthContext);

  const config = {
    headers: { Authorization: unidade.token }
  };

  const carregarColaboradores = async () => {
    if (!unidade.token) return;
    try {
      setLoading(true);
      await buscar('/colaboradores', setColaboradores, config);
    } catch (error) {
      console.error("Erro ao carregar colaboradores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarColaboradores();
  }, [unidade.token]);

  // Função ajustada: sem o confirm() do navegador
  const handleExcluir = async (id: number) => {
    try {
      await deletar(`/colaboradores/${id}`, config);
      ToastAlerta("Colaborador deletado com sucesso!.", "sucesso");
      carregarColaboradores();
    } catch (error) {
      ToastAlerta("Erro ao excluir colaborador.", "erro");
    }
  };

  const colaboradoresFiltrados = colaboradores.filter(c =>
    c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    c.matricula?.toString().includes(busca)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
          <p className="text-gray-500">Gestão de funcionários e registros.</p>
        </div>
        <Button
          onClick={() => { setSelectedColaborador(null); setIsModalOpen(true); }}
          className="cursor-pointer bg-[#F08832] hover:bg-[#d97728] gap-2"
        >
          <UserPlus size={18} /> Novo Colaborador
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Buscar por nome ou matrícula..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#F08832]" size={40} />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matrícula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Data Admissão</TableHead>
                <TableHead>Salário Base</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colaboradoresFiltrados.length > 0 ? (
                colaboradoresFiltrados.map((colab) => (
                  <TableRow key={colab.id}>
                    <TableCell className="font-mono">{colab.matricula}</TableCell>
                    <TableCell className="font-medium">{colab.nome}</TableCell>
                    <TableCell>
                      {new Date(colab.data_admissao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </TableCell>
                    <TableCell>R$ {colab.salario_base}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="cursor-pointer text-blue-600" onClick={() => { setSelectedColaborador(colab); setIsModalOpen(true); }}>
                        <Edit size={18} />
                      </Button>

                      {/* Implementação do Modal de Deleção na Tabela */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="cursor-pointer text-red-600">
                            <Trash2 size={18} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertTriangle size={20} />
                              <AlertDialogTitle>Excluir Colaborador</AlertDialogTitle>
                            </div>
                            <AlertDialogDescription>
                              Você tem certeza que deseja remover <strong>{colab.nome}</strong>?
                              Esta ação apagará permanentemente os registros deste funcionário.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => colab.id && handleExcluir(colab.id)}
                            >
                              Confirmar Exclusão
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={5} className="text-center py-10">Nenhum registro encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <ModalColaborador
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={carregarColaboradores}
        colaboradorParaEditar={selectedColaborador}
      />
    </div>
  );
}