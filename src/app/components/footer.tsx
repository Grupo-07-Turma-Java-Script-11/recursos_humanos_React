import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  function goTo(path: string) {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="https://ik.imagekit.io/g3sqiqtmtf/People_Flow_logo_transp.png" alt="Logo" className="h-10 w-10" />
              </div>
              <span className="text-2xl font-bold text-white leading-tight">People Flow</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transformando a gestão de pessoas com tecnologia, simplicidade e eficiência.
              A solução completa para o RH da sua empresa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#F08832] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#F08832] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#F08832] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => goTo("/")}
                  className="cursor-pointer hover:text-[#F08832] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => goTo("/sobre")}
                  className="cursor-pointer hover:text-[#F08832] transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => goTo("/funcionalidades")}
                  className="cursor-pointer hover:text-[#F08832] transition-colors"
                >
                  Funcionalidades
                </button>
              </li>
              <li>
                <button
                  onClick={() => goTo("/contato")}
                  className="cursor-pointer hover:text-[#F08832] transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>


          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F08832]" />
                <span className="text-sm">contato@sistemarh.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F08832]" />
                <span className="text-sm">(11) 9999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F08832] flex-shrink-0 mt-0.5" />
                <span className="text-sm">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-gray-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} People Flow. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-[#F08832] transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-[#F08832] transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
