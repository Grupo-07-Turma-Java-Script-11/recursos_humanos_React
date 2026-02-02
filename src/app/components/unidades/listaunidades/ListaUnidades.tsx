import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Unidade from "../../../../models/Unidade";
import { buscar, deletar } from "../../../../services/Service"; // Importe 'deletar'
import CardUnidade from "../cardunidade/CardUnidade";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ToastAlerta } from "../../../../utils/ToastAlerta"

function ListaUnidades() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const { unidade, handleLogout } = useContext(AuthContext);
  const token = unidade.token;
  const navigate = useNavigate();

  async function buscarUnidades() {
    try {
      setIsLoading(true);
      await buscar('/unidades', setUnidades, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) handleLogout();
    } finally {
      setIsLoading(false);
    }
  }

  async function deletarUnidade(id: number) {
    try {
      setIsLoading(true);
      // 1. Chama a API para deletar
      await deletar(`/unidades/${id}`, {
        headers: { Authorization: token },
      });

      // 3. Atualiza o estado local para refletir a exclusão imediatamente
      setUnidades(unidades.filter((unidade) => unidade.id !== id));

    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      } else {
        ToastAlerta('Erro ao deletar a unidade.', 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/');
    } else {
      buscarUnidades();
    }
  }, [token]);

  return (
    <div className="container mx-auto my-4">
      {isLoading && (
        <div className="flex justify-center my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {unidades.map((u) => (
          <CardUnidade
            key={u.id}
            unidade={u}
            onEdit={() => { }} // Implemente sua lógica de edição aqui
            onDelete={deletarUnidade} // Passa a função de deletar
          />
        ))}
      </div>
    </div>
  );
}

export default ListaUnidades;