import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/button"; // Reutilizando componentes de UI
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  FileText,
  AlertCircle
} from 'lucide-react';

export function Dashboard() {
  // Dados fictícios para o exemplo
  const stats = [
    { label: "Colaboradores", value: "128", icon: Users, color: "text-blue-600" },
    { label: "Férias este mês", value: "12", icon: Calendar, color: "text-green-600" },
    { label: "Horas Extras", value: "45h", icon: Clock, color: "text-[#F08832]" },
    { label: "Produtividade", value: "+14%", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Título e Boas-vindas */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Olá, João Silva</h1>
        <p className="text-gray-500">Aqui está o que está acontecendo no seu portal hoje.</p>
      </div>

      {/* Grid de Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card de Ações Rápidas */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText size={20} className="text-[#F08832]" />
            Documentos Recentes
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y">
            {['Holerite - Outubro 2025', 'Comprovante de Rendimentos 2024', 'Folha de Ponto - Setembro'].map((doc, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm font-medium text-gray-700">{doc}</span>
                <button className="text-[#F08832] text-sm font-bold hover:underline">Visualizar</button>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Alertas/Notificações */}
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