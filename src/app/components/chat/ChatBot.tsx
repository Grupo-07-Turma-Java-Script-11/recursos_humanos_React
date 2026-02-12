import { useState, useContext, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { enviarChat } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ChatBot() {
    const { unidade } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [historico, setHistorico] = useState<{ tipo: 'user' | 'bot', texto: string }[]>([]);
    const [carregando, setCarregando] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [historico, carregando]);

    async function enviarPergunta(e: React.FormEvent) {
        e.preventDefault();

        // Verifica se a unidade e o token existem antes de enviar
        if (!mensagem.trim() || carregando || !unidade?.token) return;

        const perguntaAtual = mensagem;
        setMensagem('');
        setHistorico(h => [...h, { tipo: 'user', texto: perguntaAtual }]);
        setCarregando(true);

        try {
            // Segue o mesmo padrão de config do seu FormColaborador
            const config = { headers: { Authorization: unidade.token } };

            await enviarChat('/chat/insight',
                { pergunta: perguntaAtual },
                (dados: any) => {
                    if (dados && dados.response) {
                        setHistorico(h => [...h, { tipo: 'bot', texto: dados.response }]);
                    }
                },
                config // Passa a config com o header correto
            );
        } catch (error) {
            console.error("Erro no ChatBot:", error);
            setHistorico(h => [...h, { tipo: 'bot', texto: 'Não consegui processar sua dúvida agora.' }]);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {isOpen && (
                <div className="mb-4 w-80 h-[450px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-[#19439E] p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-bold text-sm tracking-wide">Flow - Assistente virtual</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="cursor-pointer hover:bg-blue-800 rounded-full p-1 transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 text-sm">
                        {historico.map((msg, i) => (
                            <div key={i} className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${msg.tipo === 'user'
                                    ? 'bg-[#19439E] text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}>

                                    {/* AJUSTE AQUI: className movido para a div pai e adicionado remarkGfm */}
                                    <div className="prose prose-sm max-w-none break-words overflow-x-auto">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.texto}
                                        </ReactMarkdown>
                                    </div>

                                </div>
                            </div>
                        ))}
                        {carregando && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none flex items-center gap-2">
                                    <Loader2 className="animate-spin text-[#19439E]" size={16} />
                                    <span className="text-gray-400 text-xs italic">Analisando...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={enviarPergunta} className="p-4 border-t border-gray-100 bg-white flex gap-2">
                        <input
                            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Sua pergunta..."
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={carregando}
                            className="cursor-pointer bg-[#19439E] text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer bg-[#19439E] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />}
            </button>
        </div>
    );
}