import { useContext } from 'react';
import { User, LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export function HeaderInterno() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout(); // Limpa o estado e o localStorage
    navigate('/login'); // Redireciona para o login
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-full mx-auto">
        {/* Lado Esquerdo: Identificação do Sistema */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F08832] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">RH</span>
          </div>
          <span className="font-semibold text-gray-700 hidden md:block">Portal do Colaborador</span>
        </div>

        {/* Lado Direito: Ações do Usuário */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 border-l pl-6">
            <div className="text-right hidden sm:block">
              {/* Exibe o nome do usuário logado dinamicamente */}
              <p className="text-sm font-medium text-gray-900">{usuario.nome || 'Usuário'}</p>
              <p className="text-xs text-gray-500">Acesso Restrito</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              <User className="w-6 h-6" />
            </div>
            
            {/* Botão de Sair com a função de Logout */}
            <button 
              onClick={logout}
              title="Sair do sistema"
              className="text-gray-400 hover:text-red-500 transition-colors ml-2 p-1"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}