import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from "@/app/components/ui/button";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - Redireciona para o Dashboard do sistema
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Logo e Título */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-[#F08832] rounded-xl flex items-center justify-center mb-4 shadow-orange-200 shadow-lg">
            <span className="text-white font-bold text-2xl">RH</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Acesse sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Bem-vindo ao Portal do Colaborador
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo E-mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08832] focus:border-[#F08832] transition-all outline-none text-sm"
                  placeholder="exemplo@empresa.com"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08832] focus:border-[#F08832] transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#F08832] focus:ring-[#F08832] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-[#F08832] hover:text-[#d97728]">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#F08832] hover:bg-[#d97728] text-white py-3 rounded-lg font-bold text-md transition-all transform hover:scale-[1.01]"
          >
            Entrar no Sistema
          </Button>
        </form>
      </div>
    </div>
  );
}