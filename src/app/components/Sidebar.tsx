import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  LogOut,
  Users,
  Briefcase,
  MapPin
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  // Lista atualizada com todas as rotas internas do sistema
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Meu Holerite', path: '/holerite' },
    { icon: Users, label: 'Colaboradores', path: '/colaboradores' },
    { icon: Briefcase, label: 'Cargos', path: '/cargos' },
    { icon: User, label: 'Meu Perfil', path: '/perfil' },
    { icon: MapPin, label: 'Unidades', path: '/unidades' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <aside 
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col sticky top-0 h-screen z-40 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Botão de Expandir/Recolher */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 bg-[#F08832] text-white rounded-full p-1 shadow-md hover:bg-[#d97728] transition-colors z-50"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Itens do Menu */}
      <nav className="flex-grow mt-24 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-[#F08832]/10 text-[#F08832]' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={24} className={`min-w-[24px] ${isActive ? 'text-[#F08832]' : 'text-gray-500'}`} />
              {isExpanded && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Botão Sair */}
      <div className="p-3 border-t border-gray-100">
        <Link 
          to="/login"
          className="flex items-center gap-4 p-3 w-full text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
        >
          <LogOut size={24} className="min-w-[24px]" />
          {isExpanded && <span className="font-medium">Sair</span>}
        </Link>
      </div>
    </aside>
  );
}