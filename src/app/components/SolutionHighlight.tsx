import { CheckCircle2, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export function SolutionHighlight() {

  const navigate = useNavigate();
  const highlights = [
    {
      icon: Zap,
      title: "Implementação Ágil",
      text: "Sua empresa operando com RH digital em menos de 48 horas.",
      color: "text-orange-500"
    },
    {
      icon: ShieldCheck,
      title: "Conformidade Legal",
      text: "Totalmente adequado à LGPD e às normas do Ministério do Trabalho.",
      color: "text-blue-600"
    },
    {
      icon: HeartHandshake,
      title: "Foco nas Pessoas",
      text: "Reduza o tempo operacional e foque no bem-estar da sua equipe.",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Lado Esquerdo: Imagem e Elementos Visuais */}
          <div className="relative">
            {/* Decoração de fundo */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Equipe de RH trabalhando"
                className="w-full h-auto object-cover"
              />

              {/* Card flutuante sobre a imagem */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Eficiência Comprovada</p>
                    <p className="text-xs text-gray-600">Redução de 40% nos custos operacionais de RH.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Texto e Ícones */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Por que escolher nossa plataforma para <span className="text-[#F08832]">gestão de pessoas?</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Não somos apenas um software de ponto. Somos o parceiro estratégico que o seu RH precisa para transformar dados em decisões e burocracia em liberdade.
              </p>
            </div>

            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  navigate("/contato");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="cursor-pointer bg-gray-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-gray-200"
              >
                Agendar Demonstração
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}