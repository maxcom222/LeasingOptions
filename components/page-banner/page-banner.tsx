import React from 'react';
import style from './page-banner.module.scss';
import TrustMicro from '../trustpilot/trust-micro';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import dynamic from 'next/dynamic';

type Props = {
    children: any;
    className?: string;
    image?: string;
    padded?: boolean;
    trustPilot?: boolean;
    trustPilotCentered?: boolean;
}

const PageBanner: React.FC<Props> = ({ children, className, image, padded = true, trustPilot = false, trustPilotCentered = false }) => {
    const Snow = dynamic(
        () => import('react-snowfall'),
        {
            ssr: false
        }
    )

    return (
        <section id="page-banner" className={`${style['page-banner']} container-fluid ${padded ? "py-3 py-md-5" : "pt-2 pt-md-0"} ${className ? style[className] : ''}`}>
            {process.env.NEXT_PUBLIC_XMAS_THEME === 'true' && <Snow />}
            {image &&
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media (max-width : 767px) {
                        #page-banner { background-image:url(${image}); }
                    }
                    @media only screen and (min-width: 768px) and (max-width: 1024px)  {
                        #page-banner { background-image:url(${image}); }
                    }
                    @media only screen and (min-width : 1025px) {
                        #page-banner { background-image:url(${image}); }
                    }
                `}}></style>
            }
            {trustPilot &&
                <div className="row">
                    <div className={`col-24 col-md-12 ${trustPilotCentered ? "offset-md-6 text-center" : ""} mb-3 mt-md-3 mb-md-0`}>
                        <TrustMicro theme={TrustThemeTypes.Light} />
                    </div>
                </div>
            }
            {children}
        </section>
    );
}

export default PageBanner;