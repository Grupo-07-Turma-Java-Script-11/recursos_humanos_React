import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners";
import Unidade from "../../../../models/Unidade";
import { buscar, deletar } from "../../../../services/Service";
import { AuthContext } from "../../../../contexts/AuthContext";
import { AlertTriangle, Trash2, ArrowLeft } from "lucide-react";

function DeletarUnidade() {
    const navigate = useNavigate()
    const [unidadeData, setUnidadeData] = useState<Unidade>({} as Unidade)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { unidade, handleLogout } = useContext(AuthContext)
    const token = unidade.token
    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/unidades/${id}`, setUnidadeData, {
                headers: { 'Authorization': token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarUnidade() {
        setIsLoading(true)
        try {
            await deletar(`/unidades/${id}`, {
                headers: { 'Authorization': token }
            })
            alert('Unidade deletada com sucesso')
            retornar()
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            } else {
                alert('Erro ao deletar a unidade.')
            }
        }
        setIsLoading(false)
    }

    function retornar() {
        navigate("/unidades")
    }

    return (
        <div className="flex items-center justify-center py-10">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Cabeçalho de Alerta */}
                <div className="bg-red-50 p-6 flex flex-col items-center text-center gap-3">
                    <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="text-red-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Excluir Unidade</h1>
                    <p className="text-sm text-gray-600">
                        Esta ação não pode ser desfeita. Você tem certeza que deseja apagar esta unidade?
                    </p>
                </div>

                <div className="p-8">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                        <div className="h-12 w-12 bg-[#19439E] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            {unidadeData.nome ? unidadeData.nome.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Unidade selecionada</p>
                            <p className="text-lg font-bold text-[#19439E] truncate">{unidadeData.nome}</p>
                        </div>
                    </div>
                </div>

                {/* Ações */}
                <div className="flex p-6 pt-0 gap-3">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-bold transition-all"
                        onClick={retornar}
                    >
                        <ArrowLeft size={18} />
                        Cancelar
                    </button>

                    <button
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white bg-red-500 hover:bg-red-600 font-bold transition-all shadow-lg shadow-red-100 disabled:opacity-50"
                        onClick={deletarUnidade}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={20} />
                        ) : (
                            <>
                                <Trash2 size={18} />
                                Confirmar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarUnidade;