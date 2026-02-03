import {
  Users, Clock, Calendar, BarChart3, FileText,
  Shield, Smartphone, Zap, Search, Bell
} from 'lucide-react';
import { Card, CardContent } from "@/app/components/ui/card";
import { DynamicExperience } from '../components/DynamicExperience';

export function FeaturesPage() {
  const allFeatures = [
    {
      title: "Gestão de Colaboradores",
      description: "Dossiê digital completo com histórico de cargos, salários e documentos de cada funcionário.",
      icon: Users,
      color: "bg-orange-100 text-[#F08832]"
    },
    // {
    //   title: "Ponto Eletrônico Digital",
    //   description: "Registro de jornada via web ou mobile com geolocalização e reconhecimento facial.",
    //   icon: Clock,
    //   color: "bg-blue-100 text-blue-600"
    // },
    // {
    //   title: "Gestão de Férias e Ausências",
    //   description: "Fluxo automatizado de solicitações, aprovações e cálculo de saldo de férias.",
    //   icon: Calendar,
    //   color: "bg-purple-100 text-purple-600"
    // },
    {
      title: "Analytics e Dashboards",
      description: "Indicadores de turnover, absenteísmo e head count em tempo real para decisões estratégicas.",
      icon: BarChart3,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Recrutamento e Seleção",
      description: "Pipeline de candidatos, triagem automatizada e histórico de entrevistas centralizado.",
      icon: Search,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "GED (Documentos)",
      description: "Armazenamento em nuvem de contratos e holerites com assinatura digital integrada.",
      icon: FileText,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Notificações Inteligentes",
      description: "Avisos automáticos de vencimento de exames (ASO), contratos e aniversários.",
      icon: Bell,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Segurança LGPD",
      description: "Criptografia de ponta a ponta e total conformidade com a Lei Geral de Proteção de Dados.",
      icon: Shield,
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <div className="pt-20">
      {/* Header da Página */}
      <section className="bg-white py-20 px-6 border-b">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-[#F08832] rounded-full text-sm font-bold mb-4">
            O QUE O SISTEMA FAZ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Uma plataforma completa para <br /> um RH sem burocracia.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Centralize todos os seus processos em uma interface intuitiva,
            desenhada para economizar tempo e eliminar o uso de papel.
          </p>
        </div>
      </section>

      {/* Grid de Funcionalidades */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((f, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Mobile App */}
      <section className="py-20 bg-[#030213] text-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Seu RH no bolso do colaborador</h2>
            <p className="text-gray-400 text-lg mb-8">
              Com o nosso app mobile, seus funcionários podem bater ponto, solicitar férias
              e visualizar holerites de qualquer lugar, mesmo sem internet.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 px-6 py-4 rounded-xl flex items-center gap-3 border border-white/10">
                <Smartphone className="text-[#F08832]" />
                <span>Disponível para iOS e Android</span>
              </div>
              <div className="bg-white/10 px-6 py-4 rounded-xl flex items-center gap-3 border border-white/10">
                <Zap className="text-yellow-400" />
                <span>Sincronização instantânea</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-tr from-[#F08832] to-blue-600 rounded-3xl opacity-20 blur-3xl absolute" />
            <div className="relative bg-gray-800 rounded-3xl p-8 border border-white/10 h-80 flex items-center justify-center">
              <span className="text-gray-500 italic">[Mockup do App Mobile Aqui]</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}