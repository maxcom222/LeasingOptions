import React from 'react';
import Link from 'next/link';
import style from './navigation-ev.module.scss';
import { EvPageTypes } from 'enums/EvPageTypes';

type Props = {
    active: EvPageTypes;
}
const NavigationEv: React.FC<Props> = ({ active }) => {

    return (
        <section className={`${style['page-subnav']} container-fluid`}>
            <div className="row">
                <div className="col-24">
                    <Link prefetch={false} passHref href="/electric-hybrid-car-leasing"><a className={active === EvPageTypes.Hybrid ? style['is-active'] : ""}>Electric &amp; Hybrid Leasing</a></Link>
                    <Link prefetch={false} passHref href="/electric-hybrid-car-leasing/types"><a className={active === EvPageTypes.Type ? style['is-active'] : ""}>Electric Car Types</a></Link>
                    <Link prefetch={false} passHref href="/electric-hybrid-car-leasing/charging"><a className={active === EvPageTypes.Charging ? style['is-active'] : ""}>EV Charging</a></Link>
                    <Link prefetch={false} passHref href="/electric-hybrid-car-leasing/government-grants"><a className={active === EvPageTypes.Grants ? style['is-active'] : ""}>Government Grants</a></Link>                   
                    <Link prefetch={false} passHref href="/contact"><a>Contact Us</a></Link >
                </div>
            </div>
        </section> 
    )
};

export default NavigationEv;