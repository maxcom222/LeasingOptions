import React from 'react';
import style from './card-key.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/pro-light-svg-icons";

export default function Cardkey() {

    return (
        <div className={style['card-key']}>
            <div className={style['card-key__header']}>
                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-strap-logo.svg`} className="img-fluid lazyload" />
                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-it-car.svg`} className="img-fluid lazyload" />
            </div>
            <div className={style['card-key__features']}>
                <h4 className="mb-2">Key Features</h4>
                <ul>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> Insured Leasing</li>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> Maintenance and repairs</li>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> Accident Mangement</li>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> Breakdown Cover</li>
                    <li><u>Plus many more</u></li>
                </ul>
                <h4 className="mb-2">Eligibility</h4>
                <ul>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> Drivers must be aged between 21-70</li>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> UK/EU Driving Licence held over 1 year</li>
                    <li><FontAwesomeIcon width="18" height="18" icon={faCheck} /> Less than 2 own fault claims in the past 2 years</li>
                </ul>
            </div>
        </div>
    )
}
