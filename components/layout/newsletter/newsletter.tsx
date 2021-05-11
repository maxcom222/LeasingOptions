import React, { useContext } from 'react';
import style from './newsletter.module.scss';
import ModalContext from '../../HOCs/modal/modalContext';
import ModelNewsletter from '../../layout/modal-newsletter';

export default function Newsletter() {
    const modalContext = useContext(ModalContext);
    const handleNewsletterClick = () => {
        modalContext.showModal(ModelNewsletter, { show: true, title: "Get Our Newsletter" })
    }
    
    return (
        <section className={`container-fluid ${style['newsletter']} d-none d-lg-block text-center py-3 py-md-5`}>
            <div className="row">
                <div className="col-24 d-flex flex-nowrap align-items-center justify-content-center">
                    <h3>Want the latest news, advice and offers straight to your inbox?</h3>
                    <button className="btn btn-primary btn-lg" onClick={() => handleNewsletterClick()}>Get Our Newsletter</button>
                </div>
            </div>
        </section>
    )
}