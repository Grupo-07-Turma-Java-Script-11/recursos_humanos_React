import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Plans } from './pages/Plans';
import { NotFound } from './pages/NotFound';
import { FeaturesPage } from '../app/pages/Features';
import Navbar from './components/navbar/Navbar';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import { AuthProvider } from '../contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import Unidades from './pages/Unidades';
import FormUnidade from './components/unidades/formunidade/FormUnidade';
import DeletarUnidade from './components/unidades/deletarunidade/DeletarUnidade';
import Head from './components/head/Head';
import { ArrowLeft } from 'lucide-react'; // Importando ícone de volta

// 1. Layout de Autenticação (Com botão de voltar ao site)
function AuthLayout() {
  return (
    <div className="bg-gray-50 relative min-h-screen">
      {/* Botão Flutuante de Retorno */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-[#19439E] transition-all font-semibold bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 group z-50"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span>Voltar ao site</span>
      </Link>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// 2. Layout Público (Site Institucional)
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// 3. Layout Interno (Painel de Controle)
function InternalLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          {/* Rotas de Autenticação */}
          <Route element={<AuthLayout />}>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rotas Institucionais */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/funcionalidades" element={<FeaturesPage />} />
            <Route path="/contato" element={<Contact />} />
          </Route>

          {/* Rotas do Sistema */}
          <Route element={<InternalLayout />}>
            <Route path="/planos" element={<Plans />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unidades" element={<Unidades />} />
            <Route path="/cadastrarunidade" element={<FormUnidade />} />
            <Route path="/editarunidade/:id" element={<FormUnidade />} />
            <Route path="/deletarunidade/:id" element={<DeletarUnidade />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}