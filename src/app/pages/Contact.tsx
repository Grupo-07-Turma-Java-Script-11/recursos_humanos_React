import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { FAQSection } from "../components/ExtraSections";

export function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Lado Esquerdo - Info */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Fale com um especialista</h2>
            <p className="text-lg text-gray-600 mb-10">
              Dúvidas sobre os módulos? Precisa de uma demonstração personalizada?
              Estamos prontos para ajudar sua empresa.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-[#F08832]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">E-mail</p>
                  <p className="text-gray-600">contato@peopleflow.com.br</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Telefone</p>
                  <p className="text-gray-600">(11) 4002-8922</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" placeholder="Nome da empresa" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail corporativo</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Como podemos ajudar?</Label>
                <Textarea id="message" placeholder="Conte-nos sua necessidade..." className="min-h-[120px]" />
              </div>
              <Button className="w-full bg-[#F08832] hover:bg-[#d97728] h-12 text-lg">
                Enviar Mensagem <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      <FAQSection />
    </div>
  );
}