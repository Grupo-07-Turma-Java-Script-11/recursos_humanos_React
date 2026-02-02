import { useState, useEffect } from "react";
import Unidade from "../../../../models/Unidade";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";

interface FormUnidadeProps {
    initialData?: Unidade | null;
    onSubmit: (data: Unidade) => void;
    onCancel: () => void;
    loading?: boolean;
}

function FormUnidade({ initialData, onSubmit, onCancel, loading }: FormUnidadeProps) {
    const [formData, setFormData] = useState<Unidade>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id,
                nome: initialData.nome || '',
                usuario: initialData.usuario || '',
                senha: '', // Senha sempre vazia ao editar para segurança
                foto: initialData.foto || ''
            });
        } else {
            // Limpar form se for novo cadastro
            setFormData({
                id: 0,
                nome: '',
                usuario: '',
                senha: '',
                foto: ''
            });
        }
    }, [initialData]);

    const atualizarEstado = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {/* Nome */}
            <div className="space-y-2">
                <Label htmlFor="nome">Nome da Unidade</Label>
                <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={atualizarEstado}
                    required
                    placeholder="Ex: Matriz São Paulo"
                />
            </div>

            {/* Usuário */}
            <div className="space-y-2">
                <Label htmlFor="usuario">Usuário (E-mail)</Label>
                <Input
                    id="usuario"
                    name="usuario"
                    value={formData.usuario}
                    onChange={atualizarEstado}
                    required
                    placeholder="email@dominio.com"
                />
            </div>

            {/* Senha */}
            <div className="space-y-2">
                <Label htmlFor="senha">{initialData ? 'Nova Senha (Opcional)' : 'Senha'}</Label>
                <Input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={atualizarEstado}
                    required={!initialData} // Obrigatório apenas no cadastro
                    placeholder={initialData ? "Deixe vazio para manter a atual" : "Digite a senha"}
                />
            </div>

            {/* Foto */}
            <div className="space-y-2">
                <Label htmlFor="foto">URL da Foto/Logo</Label>
                <Input
                    id="foto"
                    name="foto"
                    value={formData.foto}
                    onChange={atualizarEstado}
                    placeholder="https://..."
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                <Button variant="outline" type="button" onClick={onCancel} disabled={loading} className="cursor-pointer">
                    Cancelar
                </Button>
                <Button type="submit" className="cursor-pointer bg-[#F08832] hover:bg-[#d97728]" disabled={loading}>
                    {loading ? "Processando..." : "Confirmar"}
                </Button>
            </div>
        </form>
    );
}

export default FormUnidade;