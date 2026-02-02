import axios from "axios";

export const api = axios.create({
    baseURL: 'https://recursos-humanos-khwg.onrender.com/'
});

api.interceptors.request.use((config) => {
    const usuarioStorage = localStorage.getItem('@RH_Portal:user');
    
    if (usuarioStorage) {
        try {
            const usuarioObj = JSON.parse(usuarioStorage);
            let token = usuarioObj.token;

            if (token) {
                // Remove espaços em branco extras que podem vir do backend ou storage
                token = token.trim();

                // Garante que o Header seja exatamente "Bearer <token>"
                // Sem duplicar a palavra caso ela já exista
                if (token.toLowerCase().startsWith('bearer ')) {
                    config.headers.Authorization = token;
                } else {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (error) {
            console.error("Erro no Interceptor:", error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
};

export const buscar = async (url: string, setDados: Function) => {
    const resposta = await api.get(url);
    setDados(resposta.data);
};

export const cadastrar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
};

export const atualizar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.put(url, dados);
    setDados(resposta.data);
};

export const deletar = async (url: string) => {
    await api.delete(url);
};