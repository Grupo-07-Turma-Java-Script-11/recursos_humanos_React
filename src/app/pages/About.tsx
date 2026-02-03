import { MissionVisionValues } from '@/app/components/mission-vision-values';
import { Users, Target, ShieldCheck } from 'lucide-react';


export function About() {
  return (
    <div className="pt-20">
      {/* Hero da Página Sobre */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nossa Missão é o seu Capital Humano</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nascemos para desburocratizar o RH. Acreditamos que a tecnologia deve servir para aproximar pessoas,
            automatizando o operacional para que você foque no estratégico.
          </p>
        </div>
      </section>

      {/* Estatísticas Rápidas */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-[#F08832] font-bold text-4xl mb-2">20+</div>
            <div className="text-gray-600 font-medium">Empresas Atendidas</div>
          </div>
          <div>
            <div className="text-[#F08832] font-bold text-4xl mb-2">300+</div>
            <div className="text-gray-600 font-medium">Colaboradores Gerenciados</div>
          </div>
          <div>
            <div className="text-[#F08832] font-bold text-4xl mb-2">99.9%</div>
            <div className="text-gray-600 font-medium">Uptime da Plataforma</div>
          </div>
        </div>
      </section>

      <MissionVisionValues />
    </div>
  );
}