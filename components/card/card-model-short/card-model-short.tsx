import React from 'react';
import Link from 'next/link';
import style from './card-model-short.module.scss';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { isIzmoImage } from 'helpers/helpers';
import { GetDynamicShortModelUrl, GetShortModelUrl } from 'helpers/urlHelper';

type Props = {
    isATC: boolean;
    userPostcode?: string;
    item: any;
    leasingDealType: LeasingDealTypes;
    vehicleFilter?: any;
}

const CardModelShort: React.FC<Props> = ({ isATC = false, userPostcode, item, leasingDealType, vehicleFilter }) => {
    const vehicleImage = (item.imageUrl) ? "/fit-in/400x400/" + item.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";

    return (
        <div className={style['card-model-short']}>
            <div className={style['card-model-short__top']}>
                <div className={style['card-model-short__img']}>
                    <Link passHref href={GetDynamicShortModelUrl(isATC, userPostcode, leasingDealType, vehicleFilter)} as={GetShortModelUrl(isATC, userPostcode, leasingDealType, item.make, item.shortModel, vehicleFilter)}>
                        <a className="text-decoration-none">
                            <img alt={`${item.make} ${item.shortModel}`} className={`pb-2 lazyload ${isIzmoImage(vehicleImage) ? 'izmo-image' : 'nonizmopaddingfix'}`} data-src={process.env.NEXT_PUBLIC_CDN + vehicleImage} />
                        </a>
                    </Link>
                </div>
            </div>
            <div className={style['card-model-short__bottom']}>
                <Link passHref href={GetDynamicShortModelUrl(isATC, userPostcode, leasingDealType, vehicleFilter)} as={GetShortModelUrl(isATC, userPostcode, leasingDealType, item.make, item.shortModel, vehicleFilter)}>
                    <a className="w-100 text-decoration-none btn btn-primary btn-lg btn-block">
                        {item.make} {item.shortModel} Lease Deals
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default CardModelShort;