import {
  Users, Calendar, BarChart3, FileText, Clock, Shield,
  Search, GraduationCap, Smartphone, DollarSign, HeartHandshake, Zap
} from 'lucide-react';
import { useNavigate } from "react-router-dom";



export function FeaturesSection() {
  const navigate = useNavigate();
  const features = [
    {
      icon: Users,
      title: 'Gestão de Colaboradores',
      description: 'Cadastro completo e organização eficiente de todos os dados dos seus colaboradores em um só lugar.',
      color: 'from-[#F08832] to-orange-600',
    },
    // {
    //   icon: Calendar,
    //   title: 'Controle de Férias',
    //   description: 'Gerencie solicitações, aprovações e histórico de férias com facilidade e transparência.',
    //   color: 'from-blue-500 to-blue-600',
    // },
    // {
    //   icon: Clock,
    //   title: 'Registro de Ponto',
    //   description: 'Controle de ponto digital com relatórios automáticos de presença e horas trabalhadas.',
    //   color: 'from-purple-500 to-purple-600',
    // },
    // {
    //   icon: BarChart3,
    //   title: 'Relatórios Analíticos',
    //   description: 'Dashboards intuitivos e relatórios personalizados para tomada de decisões estratégicas.',
    //   color: 'from-green-500 to-green-600',
    // },
    {
      icon: FileText,
      title: 'Documentação Digital',
      description: 'Armazenamento seguro e organizado de todos os documentos e contratos dos colaboradores.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Shield,
      title: 'Segurança de Dados',
      description: 'Proteção avançada com criptografia e backup automático de todas as informações.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Search,
      title: 'Recrutamento e Seleção',
      description: 'Pipeline completo de candidatos, triagem automatizada e histórico de entrevistas centralizado.',
      color: 'from-emerald-500 to-emerald-600',
    },
    // {
    //   icon: GraduationCap,
    //   title: 'Treinamento e PDI',
    //   description: 'Plataforma para gestão de cursos e trilhas de desenvolvimento individual para seus talentos.',
    //   color: 'from-yellow-500 to-yellow-600',
    // },
    // {
    //   icon: Smartphone,
    //   title: 'Aplicativo do Colaborador',
    //   description: 'Autoatendimento completo onde o funcionário consulta holerites e solicita benefícios pelo celular.',
    //   color: 'from-pink-500 to-pink-600',
    // },
    {
      icon: DollarSign,
      title: 'Gestão de Benefícios',
      description: 'Administração simplificada de vale-transporte, alimentação, planos de saúde e seguros.',
      color: 'from-cyan-500 to-cyan-600',
    },
    // {
    //   icon: HeartHandshake,
    //   title: 'Clima Organizacional',
    //   description: 'Ferramentas de pesquisa de satisfação e e-NPS para medir o engajamento da sua equipe.',
    //   color: 'from-rose-500 to-rose-600',
    // },
    {
      icon: Zap,
      title: 'Integração Automatizada',
      description: 'Conecte o RH com sua folha de pagamento e sistemas contábeis em poucos cliques.',
      color: 'from-amber-500 to-amber-600',
    }
  ];

  return (
    <section id="funcionalidades" className="relative py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Título da seção */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#F08832]/10 rounded-full mb-4">
            <span className="text-[#F08832] font-medium text-sm">Funcionalidades</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas completas para simplificar e otimizar a gestão de RH da sua empresa
          </p>
        </div>

        {/* Grid de funcionalidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#F08832]/20 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA adicional */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              navigate("/funcionalidades");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer bg-[#F08832] text-white px-8 py-4 rounded-lg hover:bg-[#d97728] transition-all duration-300 font-medium shadow-lg shadow-[#F08832]/25 hover:shadow-xl hover:shadow-[#F08832]/30"
          >
            Explore Todas as Funcionalidades
          </button>
        </div>
      </div>
    </section>
  );
}
