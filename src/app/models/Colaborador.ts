export interface Colaborador {
  id?: number;
  nome: string;
  matricula: number;
  data_admissao: string;
  salario_base: number | string;
  acrescimo?: number | string;
  unidade?: any; 
  cargo?: any;   
}