import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nome: "João Silva Sauro",
    email: "joao.silva@empresa.com",
    telefone: "(11) 98765-4321",
    cargo: "Desenvolvedor Full Stack",
    departamento: "Tecnologia da Informação",
    localizacao: "São Paulo, SP"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você integraria com sua API para salvar os dados
    alert("Informações atualizadas com sucesso!");
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Meu Perfil</h1>
        <p className="text-gray-500 font-medium">Gerencie suas informações pessoais e profissionais.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Card de Foto e Resumo */}
        <Card className="border-none shadow-md overflow-hidden bg-white h-fit">
          <CardContent className="pt-8 pb-8 flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                <User size={64} className="text-gray-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-[#F08832] rounded-full text-white shadow-lg hover:bg-[#d97728] transition-all">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">{userData.nome}</h2>
            <p className="text-[#F08832] font-semibold text-sm uppercase tracking-wider">{userData.cargo}</p>
          </CardContent>
        </Card>

        {/* Formulário de Edição */}
        <Card className="lg:col-span-2 border-none shadow-md bg-white">
          <CardContent className="pt-6 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">Informações Pessoais</h3>
              <Button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`flex gap-2 ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-[#F08832] hover:bg-[#d97728]'}`}
              >
                {isEditing ? <><Save size={18}/> Salvar</> : 'Editar Perfil'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <User size={16} className="text-[#F08832]" /> Nome Completo
                </label>
                <input
                  name="nome"
                  disabled={!isEditing}
                  value={userData.nome}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <Mail size={16} className="text-[#F08832]" /> E-mail
                </label>
                <input
                  name="email"
                  disabled={!isEditing}
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <Phone size={16} className="text-[#F08832]" /> Telefone
                </label>
                <input
                  name="telefone"
                  disabled={!isEditing}
                  value={userData.telefone}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
                  <MapPin size={16} className="text-[#F08832]" /> Localização
                </label>
                <input
                  name="localizacao"
                  disabled={!isEditing}
                  value={userData.localizacao}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#F08832] disabled:text-gray-500 transition-all"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}