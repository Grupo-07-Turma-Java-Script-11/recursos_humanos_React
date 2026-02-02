import FormUnidade from '../formunidade/FormUnidade';
import Popup from 'reactjs-popup';

function ModalUnidade() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Nova Unidade
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                <FormUnidade />
            </Popup>
        </>
    );
}

export default ModalUnidade;