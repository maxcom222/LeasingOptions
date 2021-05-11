import React from 'react';
import Link from 'next/link';
import style from './card-badge.module.scss';
import { VehicleTypes } from 'enums/VehicleTypes';
import { GetBaseVehicleTypeUrl } from 'helpers/urlHelper';
import { MakeContentABCheck } from 'helpers/helpers';

type Props = {
    url: string;
    logo: string;
    title: string;
    vehicleType: VehicleTypes
}

const CardBadge: React.FC<Props> = ({ url, logo, title, vehicleType }) => {
    const vehicleTypeText = vehicleType === VehicleTypes.Commercial ? "Van" : "Car";

    return (        
        <div className={style['card-badge']}>
            <Link passHref href={GetBaseVehicleTypeUrl(vehicleType) + '/[make]'} as={url}>
                <a className="w-100 d-flex flex-wrap justify-content-center text-decoration-none">
                    <img data-src={logo} width="55" height="55" className="img-fluid lazyload align-self-start" alt={`${title} ${vehicleTypeText}`} />
                    <span className="align-self-end">{MakeContentABCheck(title, vehicleType) ? <><small className="badge badge-success">Best Prices</small><br /></> : ''}{title}</span>
                </a>
            </Link>
        </div>   
    )
}

export default CardBadge;