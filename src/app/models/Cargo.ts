export interface Cargo {
  id?: number;
  nome: string;
  descricao_funcao: string;
  nivel_hierarquico: string;
  colaborador?: any[]; // Adicionado para bater com o retorno do backend
}