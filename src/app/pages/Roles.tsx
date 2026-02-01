import { Briefcase, Plus, Users } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

export function Roles() {
  const cargos = [
    { titulo: "Desenvolvedor Full Stack", departamento: "Tecnologia", nivel: "Pleno", qtd: 8 },
    { titulo: "Analista de RH", departamento: "Recursos Humanos", nivel: "Sênior", qtd: 2 },
    { titulo: "Designer UI/UX", departamento: "Produto", nivel: "Júnior", qtd: 4 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cargos e Funções</h1>
          <p className="text-gray-500">Estrutura organizacional da empresa.</p>
        </div>
        <Button className="bg-[#F08832] hover:bg-[#d97728] gap-2">
          <Plus size={18} /> Novo Cargo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cargos.map((cargo, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#F08832]/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 rounded-lg text-[#F08832]">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cargo.nivel}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#F08832] transition-colors">{cargo.titulo}</h3>
            <p className="text-sm text-gray-500 mb-4">{cargo.departamento}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Users size={16} />
              {cargo.qtd} Colaboradores
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}