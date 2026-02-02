import { useState, useRef } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
import { useReactToPrint } from "react-to-print"; // Importação necessária
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Colaborador } from '../../../models/Colaborador';

interface ItemHolerite {
  descricao: string;
  valor: number;
  tipo: 'provento' | 'desconto';
}

export function FormHolerite({ colaborador }: { colaborador: Colaborador }) {
  const [itens, setItens] = useState<ItemHolerite[]>([
    { descricao: 'Salário Base', valor: Number(colaborador.salario_base), tipo: 'provento' }
  ]);

  // Referência para o componente que será impresso
  const componentRef = useRef<HTMLDivElement>(null);

  // Lógica de Impressão baseada no seu exemplo anterior
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Holerite_${colaborador.nome}_${new Date().getMonth() + 1}_${new Date().getFullYear()}`,
  });

  const adicionarCampo = () => {
    setItens([...itens, { descricao: '', valor: 0, tipo: 'provento' }]);
  };

  const removerCampo = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  const atualizarItem = (index: number, campo: keyof ItemHolerite, valor: any) => {
    const novosItens = [...itens];
    novosItens[index] = { ...novosItens[index], [campo]: valor };
    setItens(novosItens);
  };

  const calcularTotal = (tipo: 'provento' | 'desconto') => 
    itens.filter(i => i.tipo === tipo).reduce((acc, curr) => acc + Number(curr.valor), 0);

  const totalProventos = calcularTotal('provento');
  const totalDescontos = calcularTotal('desconto');
  const liquido = totalProventos - totalDescontos;

  return (
    <div className="space-y-6">
      {/* --- PARTE VISÍVEL: FORMULÁRIO DE EDIÇÃO --- */}
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg text-sm border">
          <p><strong>Colaborador:</strong> {colaborador.nome}</p>
          <p><strong>Matrícula:</strong> {colaborador.matricula}</p>
        </div>

        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">Editar Lançamentos</Label>
          <Button type="button" variant="ghost" size="sm" onClick={adicionarCampo} className="text-[#F08832] gap-1">
            <Plus size={16} /> Adicionar Linha
          </Button>
        </div>

        {itens.map((item, index) => (
          <div key={index} className="flex gap-2 items-end border-b pb-3">
            <div className="flex-1 space-y-1">
              <Input placeholder="Descrição" value={item.descricao} onChange={(e) => atualizarItem(index, 'descricao', e.target.value)} />
            </div>
            <div className="w-28 space-y-1">
              <select 
                className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
                value={item.tipo}
                onChange={(e) => atualizarItem(index, 'tipo', e.target.value)}
              >
                <option value="provento">Provento</option>
                <option value="desconto">Desconto</option>
              </select>
            </div>
            <div className="w-32 space-y-1">
              <Input type="number" step="0.01" value={item.valor} onChange={(e) => atualizarItem(index, 'valor', e.target.value)} />
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => removerCampo(index)}>
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={() => handlePrint()} className="w-full bg-[#F08832] hover:bg-[#d97728] gap-2 py-6 text-lg font-bold">
        <Download size={20} /> Baixar Holerite (PDF)
      </Button>

      {/* --- PARTE INVISÍVEL: TEMPLATE PARA O PDF (Capturado pelo useRef) --- */}
      <div className="hidden">
        <div ref={componentRef} className="p-10 bg-white text-black font-sans">
          {/* Cabeçalho Profissional */}
          <div className="border-2 border-black p-4 mb-4">
            <div className="flex justify-between items-start border-b border-black pb-2 mb-4">
              <div>
                <h2 className="text-xl font-bold uppercase">Recibo de Pagamento de Salário</h2>
                <p className="text-sm">Referente ao mês: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Empresa Exemplo LTDA</p>
                <p className="text-xs">CNPJ: 00.000.000/0001-00</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p><span className="font-bold">Nome:</span> {colaborador.nome}</p>
                <p><span className="font-bold">Cargo:</span> {colaborador.cargo?.nome || 'N/A'}</p>
              </div>
              <div className="text-right">
                <p><span className="font-bold">Matrícula:</span> {colaborador.matricula}</p>
                <p><span className="font-bold">Data Admissão:</span> {new Date(colaborador.data_admissao).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Tabela de Itens Dinâmicos */}
            <Table className="border border-black">
              <TableHeader className="bg-gray-100">
                <TableRow className="border-black">
                  <TableHead className="text-black border-r border-black">Descrição</TableHead>
                  <TableHead className="text-right text-black border-r border-black">Vencimentos</TableHead>
                  <TableHead className="text-right text-black">Descontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens.map((item, i) => (
                  <TableRow key={i} className="border-black">
                    <TableCell className="border-r border-black">{item.descricao}</TableCell>
                    <TableCell className="text-right border-r border-black">
                      {item.tipo === 'provento' ? `R$ ${Number(item.valor).toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.tipo === 'desconto' ? `R$ ${Number(item.valor).toFixed(2)}` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Linhas vazias para preencher o holerite (estético) */}
                {[...Array(Math.max(0, 8 - itens.length))].map((_, i) => (
                  <TableRow key={`empty-${i}`} className="border-black">
                    <TableCell className="border-r border-black h-8"></TableCell>
                    <TableCell className="border-r border-black"></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Totais */}
            <div className="grid grid-cols-3 border-x border-b border-black text-sm">
              <div className="p-2 border-r border-black">
                <p className="text-[10px] font-bold">TOTAL VENCIMENTOS</p>
                <p className="text-right font-bold">R$ {totalProventos.toFixed(2)}</p>
              </div>
              <div className="p-2 border-r border-black">
                <p className="text-[10px] font-bold">TOTAL DESCONTOS</p>
                <p className="text-right font-bold">R$ {totalDescontos.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-gray-100">
                <p className="text-[10px] font-bold text-[#F08832]">VALOR LÍQUIDO</p>
                <p className="text-right font-bold text-lg">R$ {liquido.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-between items-end px-10">
            <div className="border-t border-black w-64 text-center text-xs pt-1">Assinatura do Colaborador</div>
            <div className="text-[10px] text-gray-400 italic">Gerado via Sistema RH em {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}