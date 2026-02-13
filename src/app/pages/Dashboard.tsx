import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { buscar } from '../../services/Service';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Users,
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  AlertCircle,
  Download
} from 'lucide-react';

export function Dashboard() {
  // Puxamos os dados da unidade logada do seu Contexto atual
  const { unidade: unidadeLogada } = useContext(AuthContext);
  
  // Estado para armazenar a lista vinda do Banco de Dados
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [loadingExcel, setLoadingExcel] = useState(false);

  // @ts-ignore
  const baseURL = (import.meta as any).env.VITE_API_URL;

  // FUNÇÃO QUE BUSCA INFORMAÇÕES NO BANCO DE DADOS
  useEffect(() => {
    // Só dispara a busca se houver um token no contexto (usuário logado)
    if (unidadeLogada && unidadeLogada.token) {
      const config = { 
        headers: { 
          // Usamos exatamente o padrão que você usa no Cadastro de Colaborador
          Authorization: unidadeLogada.token 
        } 
      };
      
      // Busca a lista de colaboradores para contar quantos existem no banco
      buscar('/colaboradores', setColaboradores, config);
    }
  }, [unidadeLogada.token]); 

  // FUNÇÃO PARA DOWNLOAD DO EXCEL
  const handleDownloadExcel = async () => {
    if (loadingExcel || !unidadeLogada.token) return;

    try {
      setLoadingExcel(true);
      
      const response = await axios.get(`${baseURL}colaboradores/relatorio/excel`, {
        responseType: 'blob', // Necessário para arquivos binários
        headers: { 
          Authorization: unidadeLogada.token // Mesmo padrão de autenticação
        }
      });

      // Criação do link temporário para download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Relatorio_Colaboradores.xlsx`);
      document.body.appendChild(link);
      link.click();
      
      // Limpeza
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao gerar Excel:", error);
      alert("Erro ao baixar o relatório. Verifique sua conexão.");
    } finally {
      setLoadingExcel(false);
    }
  };

  // Configuração dos Cards (O primeiro card mostra o total do banco)
  const stats = [
    { 
      label: "Colaboradores", 
      value: colaboradores.length.toString(), 
      icon: Users, 
      color: "text-blue-600",
      clickable: true 
    },
    { label: "Férias este mês", value: "12", icon: Calendar, color: "text-green-600" },
    { label: "Horas Extras", value: "45h", icon: Clock, color: "text-[#F08832]" },
    { label: "Produtividade", value: "+14%", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Seja Bem Vindo!</h1>
        <p className="text-gray-500">Informações atualizadas do banco de dados.</p>
      </div>

      {/* Grid de Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            onClick={stat.clickable ? handleDownloadExcel : undefined}
            className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all
              ${stat.clickable ? 'cursor-pointer hover:shadow-md hover:border-blue-300 active:scale-95 group' : ''}
              ${loadingExcel && stat.clickable ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color} transition-colors group-hover:bg-blue-50`}>
              <stat.icon size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium flex items-center justify-between">
                {stat.label}
                {stat.clickable && (
                  <Download size={14} className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.clickable && loadingExcel ? "..." : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid de Documentos e Pendências */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Documentos Recentes */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText size={20} className="text-[#F08832]" />
            Documentos Recentes
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y">
            {['Holerite - Outubro 2025', 'Comprovante de Rendimentos 2024', 'Folha de Ponto - Setembro'].map((doc, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#F08832] transition-colors">{doc}</span>
                <button className="text-[#F08832] text-sm font-bold hover:underline">Visualizar</button>
              </div>
            ))}
          </div>
        </div>

        {/* Pendências */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            Pendências
          </h2>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <p className="text-xs text-red-600 font-bold uppercase">Atenção</p>
              <p className="text-sm text-red-800">Assinatura pendente no contrato de férias.</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-600 font-bold uppercase">Informação</p>
              <p className="text-sm text-blue-800">Atualize seu endereço no perfil.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
