import Link from 'next/link';
import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import style from './breadcrumbs.module.scss';
import { BreadcrumbsItem } from 'types/infrastructure/BreadcrumbsItem';
import TrustMicro from 'components/trustpilot/trust-micro';
import { TrustThemeTypes } from '../../../enums/TrustThemeTypes';
type Props = {
    breadcrumbs: BreadcrumbsItem[];
}

const overlapRoutes = [
        "/",
        "/test2",
        "/beta",
        "/car-leasing", 
        "/business-car-leasing", 
        "/van-leasing", 
        "/news", 
        "/news/[category]", 
        "/advice", 
        "/advice/[category]", 
        "/value-your-car", 
        "/car-leasing-with-insurance/[postcode]/search", 
        "/car-leasing-with-insurance/[postcode]/[make]", 
        "/car-leasing-with-insurance/[postcode]/[make]/[shortModel]", 
        "/price-promise", 
        "/our-story/30th-birthday", 
        "/short-term-car-leasing", 
        "/short-term-van-leasing", 
        "/electric-hybrid-car-leasing", 
        "/electric-hybrid-car-leasing/types", 
        "/hydrogen-car-leasing", 
        "/electric-hybrid-car-leasing/government-grants", 
        "/electric-hybrid-car-leasing/charging"
    ];

const Breadcrumbs: React.FC<Props> = ({ breadcrumbs }) => {
    
    const [overlap, setOverlap] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (overlapRoutes.includes(router.pathname.replace("/internal", ""))) {
            if(!overlap){         
                setOverlap(true);
            }
        } else {
            if(overlap){
                setOverlap(false);
            }            
        }
    }, [router.pathname]);

    let breadcrumbsActiveFor = [
        "/news",
        "/hydrogen-car-leasing",
        "/electric-hybrid-car-leasing",
        "/electric-hybrid-car-leasing/types",
        "/our-story/30th-birthday",
        "/our-partners-contact-details",
        "/electric-hybrid-car-leasing/government-grants",
        "/electric-hybrid-car-leasing/charging"
    ]

        return (
            <>

             {(!overlap && !router.pathname.includes('specialdeal') && !router.pathname.includes('car-leasing-with-insurance')) ?
                (
                    <section className="container-fluid">
                        <div className="row">
                            <div className="col-24 col-md-12 my-3">
                                <TrustMicro theme={TrustThemeTypes.Dark} />
                            </div>
                        </div>
                    </section>
                ) : null}

                { breadcrumbs && breadcrumbs.length > 0 &&
                <nav className={`container-fluid d-none d-md-block ${style['breadcrumbs']} ${overlap ? style['breadcrumbs--absolute'] : ""} ${breadcrumbsActiveFor.includes(router.pathname) ? style['breadcrumbs--white'] : ""}`} aria-label="breadcrumb">
                    <div className="row">
                        <div className="col-24">
                            <ol>
                                {breadcrumbs.map((item, idx) => {
                                    return (idx + 1 !== breadcrumbs.length) ?
                                        (
                                            <li key={idx}>
                                                <Link passHref href={item.url}><a>{item.name}</a></Link>
                                            </li>
                                        ) :
                                        (
                                            <li key={idx} className={style['is-active']} aria-current="page">
                                                {item.name}
                                            </li>
                                        );
                                    })}
                            </ol>
                        </div>
                    </div>
                </nav>
                }
            </>
        )

}
export default Breadcrumbs;