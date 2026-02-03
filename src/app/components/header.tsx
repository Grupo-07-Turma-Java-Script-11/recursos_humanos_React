import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="https://ik.imagekit.io/g3sqiqtmtf/People_Flow_logo_transp.png" alt="Logo" className="h-10 w-10" />
            </div>
            <span className="text-2xl font-bold text-[#19439E] leading-tight">People Flow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => goTo("/")}
              className="cursor-pointer text-gray-600 hover:text-[#F08832] transition-colors font-medium"
            >
              Home
            </button>

            <button
              onClick={() => goTo("/sobre")}
              className="cursor-pointer text-gray-600 hover:text-[#F08832] transition-colors font-medium"
            >
              Sobre
            </button>

            <button
              onClick={() => goTo("/funcionalidades")}
              className="cursor-pointer text-gray-600 hover:text-[#F08832] transition-colors font-medium"
            >
              Funcionalidades
            </button>

            <button
              onClick={() => goTo("/contato")}
              className="cursor-pointer text-gray-600 hover:text-[#F08832] transition-colors font-medium"
            >
              Contato
            </button>

            <button
              onClick={() => goTo("/login")}
              className="cursor-pointer bg-[#F08832] text-white px-6 py-2.5 rounded-lg hover:bg-[#d97728] transition-colors font-medium"
            >
              Acessar Sistema
            </button>
          </nav>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-[#F08832] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#home" className="text-gray-600 hover:text-[#F08832] transition-colors font-medium">
              Home
            </a>
            <a href="#sobre" className="text-gray-600 hover:text-[#F08832] transition-colors font-medium">
              Sobre
            </a>
            <a href="#funcionalidades" className="text-gray-600 hover:text-[#F08832] transition-colors font-medium">
              Funcionalidades
            </a>
            <a href="#contato" className="text-gray-600 hover:text-[#F08832] transition-colors font-medium">
              Contato
            </a>
            <button className="bg-[#F08832] text-white px-6 py-2.5 rounded-lg hover:bg-[#d97728] transition-colors font-medium w-full">
              Acessar Sistema
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
