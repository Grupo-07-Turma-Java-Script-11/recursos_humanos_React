import { toast } from "react-toastify";

export function ToastAlerta (mensagem: string, tipo: string){
    switch(tipo){
        case 'sucesso':
            toast.success(mensagem,{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                style: { backgroundColor: "orange", opacity:0.85 }, 
                progress: undefined,
            });
            break;
        case 'erro':
            toast.error(mensagem,{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;
        case 'info':
        default:
            toast.info(mensagem,{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;
    }
}