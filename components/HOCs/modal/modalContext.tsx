import { createContext } from 'react'

const ModalContext = createContext({
    component: null,
    props: {},
    showModal: (T: any, A: any) => { },
    hideModal: () => { }
});

export default ModalContext;