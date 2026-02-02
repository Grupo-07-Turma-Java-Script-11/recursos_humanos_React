import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { 
    Briefcase, ChevronLeft, ChevronRight, FileText, 
    LayoutDashboard, LogOut, MapPin, 
    Settings, User, Users 
} from "lucide-react";

function Navbar() {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MapPin, label: 'Unidades', path: '/unidades' },
        { icon: Briefcase, label: 'Cargos', path: '/cargos' },
        { icon: Users, label: 'Colaboradores', path: '/colaboradores' },
        { icon: FileText, label: 'Holerite', path: '/holerite' },
        { icon: User, label: 'Meu Perfil', path: '/perfil' },
        { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    ];

    function logout() {
        handleLogout();
        navigate('/login');
    }

    return (
        // Mudança: h-screen fixa a altura na tela. sticky mantém ela parada no scroll.
        <aside className={`sticky top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${isExpanded ? "w-64" : "w-20"}`}>
            
            {/* Botão Toggle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute -right-3 top-10 bg-[#F08832] text-white rounded-full p-1 shadow-md hover:bg-[#d97728] transition-colors z-50"
            >
                {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Container Interno: h-full e flex-col são essenciais aqui */}
            <div className="p-4 flex flex-col h-full overflow-y-auto no-scrollbar">
                
                {/* Logo */}
                <div className={`mb-8 flex justify-center h-8 transition-all ${!isExpanded && 'opacity-0'}`}>
                   {isExpanded && <span className="text-[#19439E] font-bold text-xl uppercase whitespace-nowrap">Menu do Sistema</span>}
                </div>

                {/* Nav Principal: flex-grow garante que ela ocupe o espaço do meio */}
                <nav className="flex-grow space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                                    isActive ? 'bg-[#F08832]/10 text-[#F08832]' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <item.icon size={24} className="shrink-0" />
                                {isExpanded && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Rodapé: mt-auto força este bloco para o final da div h-full */}
                <div className="pt-4 border-t border-gray-100 mt-auto">
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 p-3 w-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all rounded-lg group"
                    >
                        <LogOut size={24} className="shrink-0 group-hover:rotate-12 transition-transform" />
                        {isExpanded && <span className="font-bold whitespace-nowrap">Sair do Sistema</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Navbar;