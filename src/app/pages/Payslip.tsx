import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/app/components/ui/button"; 
import { Card, CardContent } from "@/app/components/ui/card"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"; 
import { Download } from "lucide-react";

export function Payslip() {
  const componentRef = useRef<HTMLDivElement>(null);

  // Função que dispara o download/impressão
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Holerite_Outubro_2025",
  });

  return (
      <div className="container mx-auto py-10 space-y-6">
        {/* Cabeçalho da página - Oculto na impressão */}
        <div className="flex justify-between items-center no-print px-4 md:px-0">
          <h1 className="text-3xl font-bold tracking-tight">Detalhamento de Pagamento</h1>
          <Button onClick={() => handlePrint()} className="flex gap-2">
            <Download className="w-4 h-4" />
            Exportar PDF
          </Button>
        </div>

        {/* Área que será capturada para o PDF */}
        <div ref={componentRef} className="p-4 bg-white">
          <Card className="border-none shadow-none md:border md:shadow-sm">
            <CardContent className="pt-6 space-y-6">
              
              {/* Cabeçalho do Funcionário no Holerite */}
              <div className="grid grid-cols-2 gap-4 text-sm pb-4 border-b">
                <div>
                  <p className="font-bold text-gray-500 uppercase text-xs">Colaborador</p>
                  <p className="text-lg font-semibold text-gray-900">João Silva Sauro</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-500 uppercase text-xs">Período</p>
                  <p className="text-lg font-semibold text-gray-900">Outubro / 2025</p>
                </div>
              </div>

              {/* Tabela de Lançamentos */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Cód.</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Vencimentos</TableHead>
                    <TableHead className="text-right">Descontos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">001</TableCell>
                    <TableCell>Salário Base</TableCell>
                    <TableCell className="text-right text-green-700">R$ 5.000,00</TableCell>
                    <TableCell className="text-right">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">510</TableCell>
                    <TableCell>INSS</TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right text-red-700">R$ 550,00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Rodapé de Totais */}
              <div className="mt-8 border-t pt-6">
                <div className="flex flex-col md:flex-row justify-end gap-6 md:gap-10">
                  <div className="text-right">
                    <p className="text-xs uppercase text-muted-foreground">Total Vencimentos</p>
                    <p className="font-semibold text-green-700 text-lg">R$ 5.000,00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase text-muted-foreground">Total Descontos</p>
                    <p className="font-semibold text-red-700 text-lg">R$ 550,00</p>
                  </div>
                  <div className="text-right bg-[#F08832]/10 p-3 rounded-lg border border-[#F08832]/20">
                    <p className="text-xs uppercase font-bold text-[#F08832]">Valor Líquido</p>
                    <p className="text-2xl font-bold text-[#F08832]">R$ 4.450,00</p>
                  </div>
                </div>
              </div>

              {/* Mensagem de Rodapé para o PDF */}
              <div className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-widest border-t pt-4">
                Documento gerado digitalmente via Sistema RH - {new Date().toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}