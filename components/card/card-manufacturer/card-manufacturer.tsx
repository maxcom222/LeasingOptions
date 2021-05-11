import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import style from './card-manufacturer.module.scss';
import { GetMonthlyVATText, isIzmoImage } from 'helpers/helpers';
import { GetDynamicShortModelUrl, GetShortModelUrl } from 'helpers/urlHelper';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { formatMoney } from 'helpers/currencyHelper';

type Props = {
    isATC: boolean;
    userPostcode?: string;
    vehicle: any;
    dealSelector: number;
    vehicleFilter: any;
}

const CardManufacturer: React.FC<Props> = ({ isATC = false, userPostcode, vehicle, dealSelector, vehicleFilter }) => {
    const isPersonal = dealSelector === LeasingDealTypes.Personal;
    const vehicleImage = (vehicle?.imageUrl) ? "/fit-in/400x400/" + vehicle?.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";

    return (
        <div className={`${style['card-manufacturer']} ${isATC ? style['card-manufacturer--atc'] : ""}`}>
            <div className={style['card-manufacturer__top']}>
                {isATC &&
                    <div className={style['card-manufacturer__atc']}>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-strap-logo.svg`} className="img-fluid lazyload" alt="Fuel &amp; Go logo" />
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-it-car.svg`} className="img-fluid lazyload" alt="Car icon" />
                    </div>
                }
                <div className={style['card-manufacturer__img']}>
                    {isATC &&
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fullyinsured.png`} className={`${style['insured-badge']} img-fluid lazyload`} alt="Fully Insured" />
                    }
                    <Link passHref href={GetDynamicShortModelUrl(isATC, userPostcode, dealSelector, vehicleFilter)} as={GetShortModelUrl(isATC, userPostcode, dealSelector, vehicle?.make, vehicle?.shortModel, vehicleFilter)}>
                        <a className="w-100 d-block text-decoration-none"><img alt={`${vehicle?.make} ${vehicle?.shortModel}`} className={`pb-2 lazyload ${isIzmoImage(vehicleImage) ? 'izmo-image' : 'nonizmopaddingfix'}`} data-src={process.env.NEXT_PUBLIC_CDN + vehicleImage} /></a>
                    </Link>
                </div>
                <div className={style['card-manufacturer__content']}>
                    <h4 className="mb-2">{vehicle?.vehiclesCount} Deals to Choose From</h4>
                </div>
            </div>
            <div className={style['card-manufacturer__bottom']}>
                <div className={style['personal-deal']}>
                    <div className={style['card-manufacturer__details']}>
                        <ul>
                            <li><span>{(isPersonal ? vehicle?.personalDeal?.term : vehicle?.businessDeal?.term) * 12}</span> Months Lease</li>
                            <li><span>{(isPersonal ? vehicle?.personalDeal?.mileage : vehicle?.businessDeal?.mileage)}</span> Miles Per Annum</li>
                            <li className={style['vehicle_slide_personal']}><span>£{(isPersonal ? vehicle?.personalDeal?.initialRental : vehicle?.businessDeal?.initialRental)}</span> Initial Rental</li>
                        </ul>
                    </div>
                    <div className={style['card-manufacturer__price']}>
                        <small className="text-right">{vehicle?.vehiclesCount === 1 ? 'Perfect Match At' : 'From'}</small>
                        <p><mark className="mark-text">{formatMoney((isPersonal ? vehicle?.personalDeal?.monthlyPrice : vehicle?.businessDeal?.monthlyPrice))}</mark></p><small>{GetMonthlyVATText(dealSelector)}</small>
                    </div>
                </div>
                {isATC &&
                    <div className={`${style['card-manufacturer__maintenence']} d-flex flex-nowrap justify-content-start align-items-center`}>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/shield.svg`} className="mr-2 lazyload" alt="Shield Icon" />
                        <p>Fuel &amp; Go Insured Car with Maintenance</p>
                    </div>
                }
                <Link passHref href={GetDynamicShortModelUrl(isATC, userPostcode, dealSelector, vehicleFilter)} as={GetShortModelUrl(isATC, userPostcode, dealSelector, vehicle?.make, vehicle?.shortModel, vehicleFilter)}><a className="w-100 text-decoration-none"><button className="btn btn-primary btn-lg btn-block">{vehicle?.make} {vehicle?.shortModel} Lease Deals</button></a></Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    vehicleFilter: state.vehicleFilter,
});

export default connect(mapStateToProps)(CardManufacturer);