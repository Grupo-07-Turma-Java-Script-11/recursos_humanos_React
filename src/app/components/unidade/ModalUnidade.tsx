import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

interface ModalUnidadeProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  unidadeParaEditar?: any;
  loading?: boolean;
}

export function ModalUnidade({ isOpen, onClose, onSubmit, unidadeParaEditar, loading }: ModalUnidadeProps) {
  const [formData, setFormData] = useState({
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  useEffect(() => {
    if (unidadeParaEditar) {
      setFormData({
        nome: unidadeParaEditar.nome || '',
        usuario: unidadeParaEditar.usuario || '',
        senha: '', // Senha geralmente não se retorna no GET por segurança
        foto: unidadeParaEditar.foto || ''
      });
    } else {
      setFormData({ nome: '', usuario: '', senha: '', foto: '' });
    }
  }, [unidadeParaEditar, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{unidadeParaEditar ? 'Editar Unidade' : 'Cadastrar Nova Unidade'}</DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4 pt-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Unidade</Label>
            <Input id="nome" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="usuario">Usuário de Acesso</Label>
            <Input id="usuario" required value={formData.usuario} onChange={e => setFormData({...formData, usuario: e.target.value})} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" required={!unidadeParaEditar} value={formData.senha} onChange={e => setFormData({...formData, senha: e.target.value})} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose} disabled={loading}>Cancelar</Button>
            <Button type="submit" className="bg-[#F08832] hover:bg-[#d97728]" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Unidade"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}