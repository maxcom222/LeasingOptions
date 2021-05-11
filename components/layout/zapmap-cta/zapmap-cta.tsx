import React from 'react';
import Link from 'next/link';
import style from './zapmap.module.scss';

type Props = {
    className?: any;
}

const ZapmapCta:React.FC<Props> = ({ className }) => {
    
    return (
        <div className={`${style['zapmap-cta']} ${className ? className : ""}`}>
            <strong className="w-100 d-block text-white mb-3">To get specific cost details:</strong>
            <Link passHref href="#zapmap"><a className="btn btn-primary btn-lg">Check Open Charge Map</a></Link>
        </div>
    )
}

export default ZapmapCta;