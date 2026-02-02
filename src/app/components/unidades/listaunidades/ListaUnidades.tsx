import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Unidade from "../../../../models/Unidade";
import { buscar } from "../../../../services/Service";
import CardUnidade from "../cardunidade/CardUnidade";
import { AuthContext } from "../../../../contexts/AuthContext";

function ListaUnidades() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unidades, setUnidades] = useState<Unidade[]>([]);

  const { unidade, handleLogout } = useContext(AuthContext);
  const token = unidade.token;

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!');
      navigate('/');
    } else {
      buscarUnidades();
    }
  }, [token]);

  async function buscarUnidades() {
    try {
      setIsLoading(true);
      await buscar('/unidades', setUnidades, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && unidades.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhuma Unidade foi encontrada!
            </span>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unidades.map((unidade) => (
              <CardUnidade key={unidade.id} unidade={unidade} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaUnidades;
