import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { Button } from "../components/ui/button";
import { Loader2, Lock, User, Eye, EyeOff } from "lucide-react";

export function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { usuario, handleLogin, handleLogout, isLoading } = useContext(AuthContext);
    const [usuarioLogin, setUsuarioLogin] = useState({ usuario: "", senha: "" });

    useEffect(() => {
        if (usuario.token && usuario.token !== "") {
            navigate('/dashboard');
        }
    }, [usuario.token, navigate]);

    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
    };

    const realizarLogin = (e: FormEvent) => {
        e.preventDefault();
        handleLogin(usuarioLogin as any);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">RH Portal</h2>
                    <p className="text-gray-500 mt-2">Acesse sua conta</p>
                </div>
                
                <form onSubmit={realizarLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Usuário</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input 
                                name="usuario" 
                                type="text" 
                                required 
                                value={usuarioLogin.usuario} 
                                onChange={atualizarEstado} 
                                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#F08832]" 
                                placeholder="Seu usuário" 
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input 
                                name="senha" 
                                type={showPassword ? "text" : "password"} 
                                required 
                                value={usuarioLogin.senha} 
                                onChange={atualizarEstado} 
                                className="w-full pl-10 pr-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#F08832]" 
                                placeholder="••••••••" 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute right-3 top-3 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                    </div>
                    <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="w-full bg-[#F08832] hover:bg-[#d97728] text-white py-6 text-lg font-semibold transition-all"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Entrar no Sistema"}
                    </Button>
                    
                    <button 
                        type="button" 
                        onClick={() => { handleLogout(); window.location.reload(); }}
                        className="w-full text-xs text-gray-400 hover:text-gray-600 mt-4 underline"
                    >
                        Limpar sessão e ficar nesta página
                    </button>
                </form>
            </div>
        </div>
    );
}