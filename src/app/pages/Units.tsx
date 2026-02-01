import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { MapPin, Phone, Users, Building2 } from "lucide-react";

export function Units() {
  const unidades = [
    {
      id: 1,
      nome: "Sede São Paulo",
      endereco: "Av. Paulista, 1000 - Bela Vista",
      telefone: "(11) 3333-4444",
      colaboradores: 150,
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Filial Rio de Janeiro",
      endereco: "Rua Praia de Botafogo, 500",
      telefone: "(21) 2222-1111",
      colaboradores: 45,
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Centro de Distribuição",
      endereco: "Rodovia Anhanguera, KM 300 - Cravinhos",
      telefone: "(16) 3951-0000",
      colaboradores: 80,
      status: "Em Manutenção",
    },
  ];

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unidades</h1>
          <p className="text-muted-foreground">Gerencie as filiais e locais de atuação da empresa.</p>
        </div>
        <Button className="flex gap-2">
          <Building2 className="w-4 h-4" />
          Nova Unidade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unidades.map((unidade) => (
          <Card key={unidade.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{unidade.nome}</CardTitle>
                <Badge variant={unidade.status === "Ativo" ? "default" : "secondary"}>
                  {unidade.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4" />
                {unidade.endereco}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm border-t pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {unidade.telefone}
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <Users className="w-4 h-4" />
                  {unidade.colaboradores} Colaboradores
                </div>
              </div>
              <Button variant="outline" className="w-full">Ver Detalhes</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}