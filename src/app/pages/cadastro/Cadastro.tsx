import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Unidade from "../../../models/Unidade";
import { cadastrarUnidade } from "../../../services/Service";
import { UserPlus, ArrowLeft } from "lucide-react";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  const [unidade, setUnidade] = useState<Unidade>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  useEffect(() => {
    if (unidade.id !== 0) {
      retornar();
    }
  }, [unidade]);

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUnidade({
      ...unidade,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovaUnidade(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === unidade.senha && unidade.senha.length >= 8) {
      setIsLoading(true);
      try {
        await cadastrarUnidade(`/unidades/cadastrar`, unidade, setUnidade);
        alert('Unidade cadastrada com sucesso!');
      } catch (error) {
        alert('Erro ao cadastrar a unidade!');
      }
    } else {
      alert('Dados inconsistentes! Verifique a senha (mín. 8 caracteres).');
      setUnidade({ ...unidade, senha: '' });
      setConfirmarSenha('');
    }
    setIsLoading(false);
  }

  return (
    /* Ajuste: h-screen fixa e flex-col com justify-center para centralização perfeita */
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-6 py-20">
      
      <div className="w-full max-w-md">
        <form 
          className="flex flex-col gap-4 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100" 
          onSubmit={cadastrarNovaUnidade}
        >
          {/* Cabeçalho */}
          <div className="flex flex-col items-center text-center gap-2 mb-4">
            <div className="p-4 bg-[#19439E]/10 rounded-2xl mb-2">
              <UserPlus className="text-[#19439E]" size={32} />
            </div>
            <h2 className="text-[#19439E] text-3xl font-bold tracking-tight">Criar Unidade</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
                Registre sua unidade para começar a gerenciar no People Flow
            </p>
          </div>

          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="text-sm font-bold text-gray-700 ml-1">Nome da Unidade</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Ex: Matriz Central"
              className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
              value={unidade.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Usuário */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="usuario" className="text-sm font-bold text-gray-700 ml-1">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="usuario.acesso"
              className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
              value={unidade.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Foto URL */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="foto" className="text-sm font-bold text-gray-700 ml-1">URL da Foto (Opcional)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="https://imagem.com/foto.png"
              className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
              value={unidade.foto}
              onChange={atualizarEstado}
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="senha" className="text-sm font-bold text-gray-700 ml-1">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Mínimo 8 caracteres"
              className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
              value={unidade.senha}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmarSenha" className="text-sm font-bold text-gray-700 ml-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Repita sua senha"
              className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#F08832] focus:border-transparent transition-all bg-gray-50/50"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
              required
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3 mt-4">
            <button 
              type='submit'
              disabled={isLoading}
              className='rounded-xl text-white bg-[#F08832] hover:bg-[#d97728] w-full py-3.5 font-bold shadow-lg shadow-orange-100 flex justify-center items-center transition-all disabled:opacity-70 active:scale-[0.98]' 
            >
              { isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Finalizar Cadastro</span> }
            </button>
            <button 
              type='button'
              onClick={retornar}
              className='flex items-center justify-center gap-2 text-gray-500 hover:text-gray-800 py-2 text-sm font-semibold transition-all'
            >
              <ArrowLeft size={16} />
              Cancelar e voltar
            </button>
          </div>

          {/* Divisor */}
          <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Já tem conta?{' '}
            <Link to="/login" className="text-[#19439E] font-bold hover:text-[#F08832] transition-colors underline-offset-4 hover:underline">
              Entrar agora
            </Link>
          </p>
        </form>
        
        <p className="text-center text-gray-400 text-[10px] mt-8 font-bold uppercase tracking-widest">
            People Flow HR System
        </p>
      </div>
    </div>
  );
}

export default Cadastro;