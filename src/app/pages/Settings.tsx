import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Switch } from "@/app/components/ui/switch";
import { Separator } from "@/app/components/ui/separator";
import { User, Building, Bell, Shield } from "lucide-react";

export function Settings() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as preferências da sua conta e do sistema.</p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[600px] md:grid-cols-4">
          <TabsTrigger value="perfil" className="flex gap-2"><User className="w-4 h-4" /> Perfil</TabsTrigger>
          <TabsTrigger value="empresa" className="flex gap-2"><Building className="w-4 h-4" /> Empresa</TabsTrigger>
          <TabsTrigger value="avisos" className="flex gap-2"><Bell className="w-4 h-4" /> Avisos</TabsTrigger>
          <TabsTrigger value="seguranca" className="flex gap-2"><Shield className="w-4 h-4" /> Segurança</TabsTrigger>
        </TabsList>

        {/* Aba Perfil */}
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados de contato e foto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Ex: João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Corporativo</Label>
                  <Input id="email" type="email" placeholder="joao@empresa.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Aba Notificações */}
        <TabsContent value="avisos">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Escolha como deseja receber alertas do RH.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Alertas de Holerite</Label>
                  <p className="text-sm text-muted-foreground">Notificar quando um novo PDF estiver disponível.</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Comunicados Internos</Label>
                  <p className="text-sm text-muted-foreground">Receber avisos gerais da empresa por email.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}