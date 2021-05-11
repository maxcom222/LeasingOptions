import React, { useContext } from 'react';
import style from './part-exchange.module.scss';
import ModalContext from 'components/HOCs/modal/modalContext';
import ModalPartExchange from 'components/value-your-car/modal-part-exchange';

type Props = {
    isInternal: boolean;
}

const PartExchange: React.FC<Props> = ({ isInternal }) => {
    const registrationRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const modalContext = useContext(ModalContext);

    const handleValuationClick = () => {
        modalContext.showModal(ModalPartExchange, { show: true, isInternal: isInternal, registration: registrationRef.current.value })
    };

    return (
        <section className={style['part-exchange']}>
            <div className="container py-3 py-md-5">
                <div className="row">
                    <div className="col-24">
                        <h2 className="text-center mb-0">Get a part exchange valuation</h2>
                        <div className={style['px-input']}>
                            <input ref={registrationRef} type="text" className={style['enter-reg']} id="value-your-car-input" name="licenseplate" placeholder="ENTER YOUR R3G" />
                        </div>
                        <div className="col-24 col-md-12 col-lg-8 mx-auto d-flex justify-content-center mt-5">
                            <button className="btn btn-primary btn-block btn-lg" onClick={handleValuationClick}>Get A Valuation Today</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartExchange;