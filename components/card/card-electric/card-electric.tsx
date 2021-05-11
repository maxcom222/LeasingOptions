import React from 'react';
import Link from 'next/link';
import style from './card-electric.module.scss';
import { GetDynamicVehicleUrl, GetVehicleUrl } from 'helpers/urlHelper';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetMonthlyVATText } from 'helpers/helpers';
import { formatMoney } from 'helpers/currencyHelper';

type Props = {
    leasingDealType: LeasingDealTypes,
    vehicle?: any,
}

const CardElectric: React.FC<Props> = ({ leasingDealType, vehicle }) => {
    const isPersonal = leasingDealType === LeasingDealTypes.Personal;
    let vehicleImage = vehicle?.imageUrl ? vehicle.imageUrl : "fit-in/400x400/website/static/img-placeholder.jpg";

    return (
        <div className={`${style['card-electric']} text-center px-3 pt-md-5`}>
            <Link passHref href={GetDynamicVehicleUrl(false, '', leasingDealType)} as={GetVehicleUrl(false, '', leasingDealType, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef)}>
                <a className="w-100 d-block text-decoration-none">
                    <img data-src={process.env.NEXT_PUBLIC_CDN + "/" + vehicleImage} className="img-fluid lazyload mb-md-3" alt={`${vehicle?.make} ${vehicle?.model}`} />
                    <h4 className="text-center mb-0 mb-md-1">{vehicle?.make} {vehicle?.shortModel}</h4>
                    <span className="text-center text-body body-normal">from <strong>{formatMoney(isPersonal ? vehicle?.personalDeal?.monthlyPrice : vehicle?.businessDeal?.monthlyPrice)}</strong> {GetMonthlyVATText(leasingDealType)}</span>
                </a>
            </Link>
        </div>
    )
}

export default CardElectric;