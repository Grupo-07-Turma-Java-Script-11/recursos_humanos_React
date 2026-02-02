import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Unidade from "../../../../models/Unidade";
import { AuthContext } from "../../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../../services/Service";
import { Building2, Save, ArrowLeft, Layout, User, Lock, Image as ImageIcon } from "lucide-react";

function FormUnidade() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { unidade: authUnidade, handleLogout } = useContext(AuthContext);
    const token = authUnidade.token;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [unidadeData, setUnidadeData] = useState<Unidade>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    } as Unidade);

    async function buscarPorId(id: string) {
        try {
            await buscar(`/unidades/${id}`, setUnidadeData, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403') || error.toString().includes('401')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUnidadeData({
            ...unidadeData,
            [e.target.name]: e.target.value
        });
    }

    function retornar() {
        navigate("/unidades");
    }

    async function gerarNovaUnidade(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const url = `/unidades`;
        const headers = { headers: { 'Authorization': token } };

        try {
            if (id !== undefined) {
                await atualizar(url, unidadeData, setUnidadeData, headers);
                alert('Unidade atualizada com sucesso!');
            } else {
                await cadastrar(url, unidadeData, setUnidadeData, headers);
                alert('Unidade cadastrada com sucesso!');
            }
            retornar();
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            } else {
                alert('Erro ao processar a unidade.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={retornar} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-[#19439E]">
                            {id === undefined ? 'Nova Unidade' : 'Editar Unidade'}
                        </h1>
                        <p className="text-gray-500">Preencha os dados de acesso da unidade</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2 text-[#19439E] font-semibold">
                    <Layout size={20} />
                    Credenciais e Identificação
                </div>

                <form className="p-8" onSubmit={gerarNovaUnidade}>
                    <div className="max-w-2xl space-y-6">
                        
                        {/* Campo: Nome */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="nome" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Building2 size={18} className="text-gray-400" /> Nome da Unidade
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Ex: Matriz São Paulo"
                                className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all"
                                value={unidadeData.nome}
                                onChange={atualizarEstado}
                                required
                            />
                        </div>

                        {/* Campo: Usuário */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="usuario" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <User size={18} className="text-gray-400" /> Usuário de Acesso
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="usuario.unidade"
                                className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all"
                                value={unidadeData.usuario}
                                onChange={atualizarEstado}
                                required
                            />
                        </div>

                        {/* Campo: Senha */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="senha" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Lock size={18} className="text-gray-400" /> Senha
                            </label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Digite a senha"
                                className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all"
                                value={unidadeData.senha}
                                onChange={atualizarEstado}
                                required={id === undefined} // Senha obrigatória apenas no cadastro
                            />
                        </div>

                        {/* Campo: Foto */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="foto" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <ImageIcon size={18} className="text-gray-400" /> URL da Foto (Opcional)
                            </label>
                            <input
                                type="text"
                                id="foto"
                                name="foto"
                                placeholder="https://linkdafoto.com/imagem.png"
                                className="w-full border border-gray-300 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all"
                                value={unidadeData.foto}
                                onChange={atualizarEstado}
                            />
                        </div>

                        {/* Botões */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#F08832] hover:bg-[#d97728] text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={20} />
                                ) : (
                                    <>
                                        <Save size={20} />
                                        <span>{id === undefined ? 'Cadastrar Unidade' : 'Salvar Alterações'}</span>
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={retornar}
                                className="text-gray-500 hover:text-gray-800 font-semibold px-4 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormUnidade;