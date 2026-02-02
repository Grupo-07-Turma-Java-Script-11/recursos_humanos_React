import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import UnidadeLogin from "../../../models/UnidadeLogin";
import { LogIn } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const { unidade, handleLogin, isLoading } = useContext(AuthContext);
    const [unidadeLogin, setUnidadeLogin] = useState<UnidadeLogin>({} as UnidadeLogin);

    useEffect(() => {
        if (unidade.token !== "") {
            navigate('/dashboard');
        }
    }, [unidade]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUnidadeLogin({
            ...unidadeLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(unidadeLogin);
    }

    return (
        /* Ajuste: h-screen fixa e flex-col com justify-center para centralização real */
        <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-6 py-20">
            
            <div className="w-full max-w-md">
                <form 
                    className="flex flex-col gap-5 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100" 
                    onSubmit={login}
                >
                    {/* Cabeçalho do Card */}
                    <div className="flex flex-col items-center text-center gap-2 mb-4">
                        <div className="p-4 bg-[#F08832]/10 rounded-2xl mb-2">
                            <LogIn className="text-[#F08832]" size={32} />
                        </div>
                        <h2 className="text-[#19439E] text-3xl font-bold tracking-tight">Acesse sua conta</h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Entre com suas credenciais para gerenciar o People Flow
                        </p>
                    </div>

                    {/* Campo Usuário */}
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="usuario" className="text-sm font-bold text-gray-700 ml-1">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu usuário"
                            className="border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
                            value={unidadeLogin.usuario}
                            onChange={atualizarEstado}
                            required
                        />
                    </div>

                    {/* Campo Senha */}
                    <div className="flex flex-col w-full gap-1.5">
                        <div className="flex justify-between items-center ml-1">
                            <label htmlFor="senha" className="text-sm font-bold text-gray-700">Senha</label>
                            <a href="#" className="text-xs text-[#F08832] hover:underline font-semibold">Esqueceu a senha?</a>
                        </div>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="••••••••"
                            className="border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
                            value={unidadeLogin.senha}
                            onChange={atualizarEstado}
                            required
                        />
                    </div>

                    {/* Botão Entrar */}
                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className="rounded-xl bg-[#F08832] hover:bg-[#d97728] flex justify-center items-center
                                   text-white w-full py-4 font-bold text-lg transition-all shadow-lg shadow-orange-100 disabled:opacity-70 mt-4 active:scale-[0.98]"
                    >
                        { isLoading ? 
                            <ClipLoader color="#ffffff" size={24} /> : 
                            <span>Entrar no Sistema</span>
                        }
                    </button>

                    {/* Divisor */}
                    <div className="relative flex py-4 items-center">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">People Flow</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    {/* Rodapé do Card */}
                    <p className="text-center text-gray-500 text-sm">
                        Ainda não é parceiro?{' '}
                        <Link to="/cadastro" className="text-[#19439E] font-bold hover:text-[#F08832] transition-colors underline-offset-4 hover:underline">
                            Cadastre sua Unidade
                        </Link>
                    </p>
                </form>
                
                {/* Info adicional */}
                <p className="text-center text-gray-400 text-xs mt-8 font-medium">
                    © 2026 People Flow - Sistema de Gestão de RH
                </p>
            </div>
        </div>
    );
}

export default Login;