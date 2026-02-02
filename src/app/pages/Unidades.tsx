import { Link } from "react-router-dom";
import ListaUnidades from "../components/unidades/listaunidades/ListaUnidades";
import { Plus } from "lucide-react"; // Importe o ícone de Plus

function Unidades() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#19439E]">Unidades</h1>
            <p className="text-gray-500">Gerencie os pontos de atendimento do sistema</p>
          </div>

          <Link 
            to="/cadastrarunidade" 
            className="flex items-center gap-2 bg-[#F08832] hover:bg-[#d97728] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-95"
          >
            <Plus size={20} />
            Nova Unidade
          </Link>
        </div>

        <ListaUnidades />
      </div>
    </div>
  );
}

export default Unidades;
