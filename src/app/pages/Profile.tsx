import { useState, useContext, useEffect, ChangeEvent } from 'react';
import { User, Camera, Save, Key, UserCircle, Mail } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import Unidade from '../../models/Unidade';


export function Profile() {
  const { unidade } = useContext(AuthContext); //
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState<Unidade>({
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  }); //

  useEffect(() => {
    if (unidade && unidade.usuario !== '') {
      setUserData({
        id: unidade.id,
        nome: unidade.nome,
        usuario: unidade.usuario,
        senha: '', 
        foto: unidade.foto
      });
    }
  }, [unidade]); //

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Informações da unidade atualizadas com sucesso!");
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meu Perfil</h1>
        <p className="text-gray-500 font-medium">Gerencie as informações da unidade logada.</p>
      </div>

      {/* O grid por padrão usa items-stretch, o que alinha as alturas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Card Lateral: Foto e Resumo */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-inner overflow-hidden">
                {userData.foto ? (
                  <img 
                    src={userData.foto} 
                    alt={userData.nome} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User size={80} className="text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-[#F08832] rounded-full text-white shadow-lg hover:bg-[#d97728] transition-all">
                <Camera size={20} />
              </button>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center px-4">
              {userData.nome || "Nome da Unidade"}
            </h2>
            <div className="mt-2 px-3 py-1 bg-orange-50 rounded-full">
               <p className="text-[#F08832] font-bold text-xs uppercase tracking-widest">
                ID da Unidade: {userData.id || "---"}
              </p>
            </div>
          </div>
        </div>

        {/* Card Principal: Formulário de Edição */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col h-full">
          <div className="p-8 space-y-8 flex-1">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Dados Cadastrais</h3>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-sm ${
                  isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-[#F08832] hover:bg-[#d97728]'
                }`}
              >
                {isEditing ? <><Save size={18}/> Salvar Alterações</> : 'Editar Perfil'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Campo Nome */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <UserCircle size={16} className="text-[#F08832]" /> Nome da Unidade
                </label>
                <input
                  name="nome"
                  type="text"
                  disabled={!isEditing}
                  value={userData.nome}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                />
              </div>

              {/* Campo Usuário */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <Mail size={16} className="text-[#F08832]" /> Usuário (E-mail)
                </label>
                <input
                  name="usuario"
                  type="email"
                  disabled={!isEditing}
                  value={userData.usuario}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                />
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <Key size={16} className="text-[#F08832]" /> Nova Senha
                </label>
                <input
                  name="senha"
                  type="password"
                  disabled={!isEditing}
                  placeholder={isEditing ? "Deixe em branco para manter" : "••••••••"}
                  value={userData.senha}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                />
              </div>

              {/* Campo Foto URL */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <Camera size={16} className="text-[#F08832]" /> URL da Imagem de Perfil
                </label>
                <input
                  name="foto"
                  type="text"
                  disabled={!isEditing}
                  value={userData.foto}
                  onChange={handleChange}
                  placeholder="https://link-da-imagem.com"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}