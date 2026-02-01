import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/app/components/header'; 
import { Footer } from '@/app/components/footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Plans } from './pages/Plans';
import { NotFound } from './pages/NotFound';
import { FeaturesPage } from '../app/pages/Features';
import { Payslip } from './pages/Payslip';
import { HeaderInterno } from './components/HeaderInterno'; 
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Employees } from './pages/Employees';
import { Roles } from './pages/Roles';
import { Units } from './pages/Units';
import { Settings } from './pages/Settings';

function AppContent() {
  const location = useLocation();
  const rotasInternas = ['/holerite', '/dashboard', '/perfil', '/cargos', '/colaboradores', '/unidades', '/configuracoes'].includes(location.pathname);
  const esconderFooter = rotasInternas || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Header Fixo */}
      {rotasInternas ? <HeaderInterno /> : location.pathname !== '/login' ? <Header /> : null}
      
      {/* Container Principal com Flex Row para a Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar aparece apenas no sistema */}
        {rotasInternas && <Sidebar />}

        <main className="flex-grow bg-gray-50"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/funcionalidades" element={<FeaturesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/holerite" element={<Payslip />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/colaboradores" element={<Employees />} />
            <Route path="/cargos" element={<Roles />} />
            <Route path="/unidades" element={<Units />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {!esconderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}