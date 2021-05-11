import style from './ouibounce.module.scss';
import { faTimes, faEnvelope } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrustMicro from '../../components/trustpilot/trust-micro';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import ouibounce from 'ouibounce';
import { logLabelEvent } from 'helpers/analytics';
import { NewsletterSignup } from '../../business-logic/systemService';

const OuibounceModal = () => {

    let emailAddress = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [error, setError] = useState<boolean>(false);
    const leavingModalRef = useRef();
      
    const dissmissModal = () => {
        // @ts-ignore
        leavingModalRef.current.style.display = 'none'
        logLabelEvent('ouibounce', 'Click', 'dismissed');    
    }
    
    const newsletterSignup = () => {
        // @ts-ignore
        if(emailAddress?.current?.value && EmailAddressIsValid(emailAddress?.current?.value)){
            // @ts-ignore
            NewsletterSignup(emailAddress.current.value, SubscriptionTypes.News)
            .then(result => {
                if(result.status.message === "OK"){
                    dissmissModal();
                    setError(false);
                    logLabelEvent('ouibounce', 'click', 'newsletter_signup');
                }               
            })
        } else {
            setError(true);
            emailAddress?.current.focus();
        }
    }
    useEffect(() => {
         // @ts-ignore

         ouibounce(leavingModalRef.current, { delay: 20 });   
    }, [])

    return (
        <div id="ouibounce-modal" className={style['modal-ouibounce']} style={{display: 'none'}} ref={leavingModalRef}>
            <div className={style['ouibounce-overlay']}>
                <div className={style['ouibounce-overlay__modal']}>
                    <div className={style['ouibounce-overlay__bg']}><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/ouibounce-bg.jpg`} width="315" height="407" className="lazyload" alt="Decorative phone image" /></div>
                    <button className={style['ouibounce-overlay__close']} onClick={dissmissModal}><FontAwesomeIcon icon={faTimes} /></button>
                    <div className="row no-gutters">
                        <div className="col-24 col-md-18">
                            <h3 className="mb-3">Leaving so soon?</h3>
                            <p className="mb-3 mb-md-4">Want the latest deals? Special offers, exclusives and latest car news and reviews. Don’t miss a thing and sign up for alerts!</p>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-24 col-md-16 col-lg-14 mb-3 mb-md-4">
                            <div className="box bg-light-grey">
                                <div className={`${style['ouibounce-overlay__input']} ${error ? "is-invalid" : ""}`}>
                                    <input ref={emailAddress} id="emailAddress" name="emailAddress" className={`form-control ${error ? style['is-invalid'] : "mb-2 mb-md-3"}`} placeholder="Your email address" />
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                {error && <small className="w-100 d-block text-red mb-3">Please enter a valid email address</small>}
                                <button className="btn btn-primary btn-lg-md btn-block mb-3" onClick={() => {newsletterSignup()}}>Sign up for exclusive offers</button>
                                <div className="w-100 position-relative text-center mb-3">
                                    <TrustMicro theme={TrustThemeTypes.Dark} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-24 col-md-16 col-lg-14 text-center">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/ouibounce-cars.png`} width="400" height="100" className="img-fluid mb-3 lazyload" alt="" />
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-24 col-md-16">
                            <p className={style['ouibounce-overlay__tandcs']}><small>You can unsubscribe at any time, by emailing <a href="mailto:compliance@leasingoptions.co.uk">compliance@leasingoptions.co.uk</a> or by clicking the unsubscribe link at the end of any e-newsletter you have received from us. For more information, please see our <Link passHref href="/privacy-policy"><a>Privacy Policy</a></Link>.</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OuibounceModal;