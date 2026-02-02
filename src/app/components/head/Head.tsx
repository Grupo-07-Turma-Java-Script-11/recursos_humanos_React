function Head() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo Icon - Removi o tamanho fixo w-8 h-8 para o conteúdo não vazar */}
            <div className="p-2 bg-blue-600 rounded-lg flex items-center justify-center">
              {/* Se quiser um ícone aqui, ele entra aqui */}
              <span className="text-white font-bold">PF</span> 
            </div>

            {/* Textos - Fora da caixinha azul para ficarem visíveis */}
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">People Flow</h1>
              <p className="text-sm text-gray-500">Sistema de Gerenciamento de Recursos Humanos</p>
            </div>
          </div>

          {/* Espaço para Perfil ou Notificações no futuro */}
          <div className="flex items-center">
             {/* Conteúdo da direita */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Head;