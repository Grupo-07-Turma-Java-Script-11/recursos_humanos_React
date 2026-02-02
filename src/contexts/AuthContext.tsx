import { createContext, type ReactNode, useState } from "react"
import { login } from "../services/Service"
import UnidadeLogin from "../models/UnidadeLogin"
import { ToastAlerta } from "../utils/ToastAlerta"

interface AuthContextProps {
    unidade: UnidadeLogin
    handleLogout(): void
    handleLogin(unidade: UnidadeLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [unidade, setUnidade] = useState<UnidadeLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(unidadeLogin: UnidadeLogin) {
        setIsLoading(true)
        try {
            await login(`/login/logar`, unidadeLogin, setUnidade)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os Dados da unidade estão inconsistentes!", "erro")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUnidade({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ unidade, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}