import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/api";

// Define o que o Contexto vai exportar
interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    handleLogout(): void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Tipagem aplicada aqui resolve o erro de 'unknown' nos outros arquivos
export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        const usuarioGuardado = localStorage.getItem('@RH_Portal:user');
        if (usuarioGuardado) {
            try {
                return JSON.parse(usuarioGuardado) as UsuarioLogin;
            } catch {
                localStorage.removeItem('@RH_Portal:user');
            }
        }
        return { id: 0, nome: "", usuario: "", token: "" };
    });

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true);
        try {
            await login(`/login/logar`, userLogin, (resp: UsuarioLogin) => {
                setUsuario(resp);
                localStorage.setItem('@RH_Portal:user', JSON.stringify(resp));
            });
        } catch (error) {
            console.error("Erro no login:", error);
            alert("Usuário ou senha inválidos.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({ id: 0, nome: "", usuario: "", token: "" });
        localStorage.removeItem('@RH_Portal:user');
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}