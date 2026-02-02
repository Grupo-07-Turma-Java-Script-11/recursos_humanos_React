import { useEffect, useState, useContext } from 'react';
import { Search, Loader2, FileText } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ModalHolerite } from '../components/holerite/ModalHolerite.tsx'; // Ajuste o nome se necessário
import { Colaborador } from '../../models/Colaborador';

export function Holerite() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  const { unidade } = useContext(AuthContext);
  const config = { headers: { Authorization: unidade.token } };

  useEffect(() => {
    if (unidade.token) {
      buscar('/colaboradores', setColaboradores, config);
      setLoading(false);
    }
  }, [unidade.token]);

  const colaboradoresFiltrados = colaboradores.filter(c => 
    c.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gerar Holerites</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input className="pl-10" placeholder="Buscar colaborador..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#F08832]" size={40} /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matrícula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>                
                <TableHead>Salário Base</TableHead>
                <TableHead className="text-right pr-16">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colaboradoresFiltrados.map((colab) => (
                <TableRow key={colab.id}>
                 <TableCell className="font-mono">{colab.matricula}</TableCell>
                    <TableCell className="font-medium">{colab.nome}</TableCell>
                    <TableCell className="font-medium">{colab.cargo?.nome}</TableCell>
                    <TableCell>R$ {colab.salario_base}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      className="gap-2 border-[#F08832] text-[#F08832] hover:bg-[#F08832] hover:text-white"
                      onClick={() => { setSelectedColaborador(colab); setIsModalOpen(true); }}
                    >
                      <FileText size={16} /> Gerar Holerite
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {selectedColaborador && (
        <ModalHolerite 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          colaborador={selectedColaborador} 
        />
      )}
    </div>
  );
}