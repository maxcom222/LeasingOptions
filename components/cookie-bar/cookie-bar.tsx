import React, { useState, useEffect } from 'react';
import style from './cookie-bar.module.scss';
import Link from 'next/link';
import { parseCookies, setCookie } from 'nookies';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";

const CookieBar = () => {

    const cookies = parseCookies();
    const [hasClosed, setHasClosed] = useState("false");
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    useEffect(() => {
        setHasClosed(cookies.HasClosedCookieBar ? cookies.HasClosedCookieBar : "false");
    }, [])

    const handleCloseCookie = () => {
        setCookie(null, "HasClosedCookieBar", "true", { expires: expiryDate, path: '/' });
        setHasClosed("true");
    }

    

    return (
        <div>
            {hasClosed === "false" &&
                <div className={style['cookie-bar']}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-24 col-md-16 text-center text-md-left">This site uses cookies. Please read our <Link passHref href="/cookie-policy"><a className="policy-link">cookie notice</a></Link> for more information on the cookies we use and how to delete or block them.</div>
                            <div className="col-24 col-md-8 text-center text-md-right d-md-flex justify-content-md-end aling-items-md-center"> <button type="button" className={`${style['cookie-bar__btn']} btn btn-lg btn-primary btn-block-xs`} onClick={() => handleCloseCookie()}><FontAwesomeIcon width="16" height="16" icon={faCheck} className="mr-1" />Accept cookies and close</button></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );    
}

export default CookieBar;