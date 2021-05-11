import React from 'react';
import style from './card-vehicle-short.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-regular-svg-icons";

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetMonthlyVATText, isIzmoImage } from 'helpers/helpers';
import { formatMoney } from 'helpers/currencyHelper';

type Props = {
    leasingDealType: number;
    vehicle: any;
    settings: {
        onEnquiry: any;
    }
}

const CardVehicleShort: React.FC<Props> = ({ vehicle, leasingDealType, settings }) => {
    const isPersonal = leasingDealType === LeasingDealTypes.Personal;
    const vehicleImage = (vehicle?.imageUrl) ? "/fit-in/400x400/" + vehicle.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";

    const handleEnquiryModal = () => {
        if (settings.onEnquiry) {
            settings.onEnquiry(vehicle);
        }
    }

    return (
        <div className={style['card-vehicle-short']}>
            <div className={style['card-vehicle-short__top']}>
                <div className={`${style['card-vehicle-short__header']} d-flex justify-content-between align-items-center`}>
                    <span>Short Term Leasing</span>
                    <FontAwesomeIcon width="24" height="24" icon={faClock} />
                </div>
                <div className={style['card-vehicle-short__img']}>
                    <img alt={`${vehicle?.make} ${vehicle?.model} ${vehicle?.derivative}`} className={`lazyload ${isIzmoImage(vehicleImage) ? 'izmo-image' : 'nonizmopaddingfix'}`} data-src={process.env.NEXT_PUBLIC_CDN + vehicleImage} />
                </div>
                <div className={style['card-vehicle-short__content']}>
                    <h4 className="mb-2">{vehicle?.make}</h4>
                    <h5 className="mb-2">{vehicle?.model}</h5>
                    <p className={style['card-vehicle-short__derivative']}>{vehicle?.derivative}</p>
                </div>
            </div>
            <div className={style['card-vehicle-short__bottom']}>
                <div className={style['personal-deal']}>
                    <div className={style['card-vehicle-short__details']}>
                        <ul>
                            <li><span>{(isPersonal ? vehicle?.personalDeal?.term : vehicle?.businessDeal?.term)}</span> Months Lease</li>
                            <li><span>{(isPersonal ? vehicle?.personalDeal?.mileage : vehicle?.businessDeal?.mileage)}</span> Miles Per Annum</li>
                            <li className={style['vehicle_slide_personal']}><span>£{(isPersonal ? vehicle?.personalDeal?.initialRental : vehicle?.businessDeal?.initialRental)}</span> Initial Rental</li>
                        </ul>
                    </div>
                    <div className={style['card-vehicle-short__price']}>
                        <p>{formatMoney(isPersonal ? vehicle?.personalDeal?.monthlyPrice : vehicle?.businessDeal?.monthlyPrice)}</p><small>{GetMonthlyVATText(leasingDealType)}</small>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg btn-block" onClick={() => handleEnquiryModal()}>Enquire Now</button>
            </div>
        </div>
    )
}

export default CardVehicleShort;