import { Users, UserPlus, Search, MoreVertical } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";

export function Employees() {
  const colaboradores = [
    { id: 1, nome: "João Silva Sauro", cargo: "Desenvolvedor Full Stack", depto: "Tecnologia", status: "Ativo" },
    { id: 2, nome: "Maria Oliveira", cargo: "Designer UI/UX", depto: "Produto", status: "Ativo" },
    { id: 3, nome: "Carlos Souza", cargo: "Analista de RH", depto: "Recursos Humanos", status: "Férias" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
          <p className="text-gray-500">Gerencie todos os funcionários da empresa.</p>
        </div>
        <Button className="bg-[#F08832] hover:bg-[#d97728] gap-2">
          <UserPlus size={18} /> Novo Colaborador
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832]/20 focus:border-[#F08832]"
              placeholder="Buscar por nome ou cargo..."
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colaboradores.map((colab) => (
              <TableRow key={colab.id}>
                <TableCell className="font-medium">{colab.nome}</TableCell>
                <TableCell>{colab.cargo}</TableCell>
                <TableCell>{colab.depto}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    colab.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {colab.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18}/></button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}