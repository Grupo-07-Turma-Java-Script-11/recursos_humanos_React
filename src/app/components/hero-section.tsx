import { ArrowRight, CheckCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-white via-orange-50/20 to-blue-50/30">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#F08832] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Conteúdo à esquerda */}
          <div>
            <div className="inline-block px-4 py-2 bg-[#F08832]/10 rounded-full mb-6">
              <span className="text-[#F08832] font-medium text-sm">Sistema de Gestão de Pessoas</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transforme a gestão de{' '}
              <span className="text-[#F08832]">Recursos Humanos</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Uma plataforma completa e intuitiva para gerenciar colaboradores, processos de RH e otimizar a gestão de pessoas na sua empresa.
            </p>

            {/* Features list */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#F08832] flex-shrink-0" />
                <span className="text-gray-700">Gestão completa de colaboradores</span>
              </div>
              {/* <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#F08832] flex-shrink-0" />
                <span className="text-gray-700">Controle de ponto e frequência</span>
              </div> */}
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#F08832] flex-shrink-0" />
                <span className="text-gray-700">Relatórios e análises em tempo real</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="cursor-pointer bg-[#F08832] text-white px-8 py-4 rounded-lg hover:bg-[#d97728] transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#F08832]/25 hover:shadow-xl hover:shadow-[#F08832]/30">
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-[#F08832] hover:text-[#F08832] transition-all duration-300 font-medium">
                Saiba Mais
              </button>
            </div>
          </div>

          {/* Imagem/Ilustração à direita */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* Mock de dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F08832]/10 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#F08832] rounded" />
                    </div>
                    <div>
                      <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                      <div className="h-2 w-16 bg-gray-100 rounded" />
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="h-2 w-12 bg-gray-200 rounded mb-3" />
                      <div className="h-6 w-16 bg-[#F08832]/20 rounded mb-2" />
                      <div className="h-2 w-full bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg" />
                      <div className="flex-1">
                        <div className="h-2 w-3/4 bg-gray-200 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-gray-100 rounded" />
                      </div>
                      <div className="w-6 h-6 bg-[#F08832]/20 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#F08832] rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
                <span className="text-white font-bold text-2xl transform -rotate-12">24/7</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-xl shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
