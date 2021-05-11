import React, { useEffect } from 'react';
import Link from 'next/link';
import style from './card-featured.module.scss';
import Sticker from '../../layout/sticker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetMonthlyVATText, isIzmoImage } from 'helpers/helpers';
import { GetDynamicVehicleUrl, GetVehicleUrl } from 'helpers/urlHelper';
import { formatMoney } from 'helpers/currencyHelper';
import { connect } from 'react-redux';

type Props = {
    isATC: boolean;
    userPostcode?: string;
    id: string;
    headerText: string;
    headerColor: string;
    headerIcon?: any;
    vehicle: any;
    dealSelector: number;
    stickerList: any;
}

const CardFeatured: React.FC<Props> = ({ isATC, userPostcode, id, headerText, headerColor, headerIcon, vehicle, dealSelector, stickerList }) => {
    const vehicleImage = (vehicle?.imageUrl) ? "/fit-in/400x400/" + vehicle.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";

    return (
        <div className={style['card-featured']}>
            <div className={style['card-featured__top']}>
                {isATC &&
                    <div className={style['card-featured__atc']}>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-strap-logo.svg`} className="img-fluid lazyload" alt="Fuel &amp; Go logo" />
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-it-car.svg`} className="img-fluid lazyload" alt="Car icon" />
                    </div>
                }

                {!isATC &&
                    <>
                        <style dangerouslySetInnerHTML={{ __html: `#${id} { background-color: ${headerColor};}` }}></style>
                        <div id={id} className={`${style['card-featured__header']} d-flex justify-content-between align-items-center`}>
                            <span>{headerText}</span>
                            {headerIcon ? <FontAwesomeIcon width="24" height="24" icon={headerIcon} /> : <svg xmlns="http://www.w3.org/2000/svg" width="36.087" height="36.13" viewBox="0 0 36.087 36.13"><g id="Group_1326" data-name="Group 1326" transform="translate(-1802 -921.32)"><path id="Path_831" data-name="Path 831" d="M19.021.049C18.7.031,18.375,0,18.043,0a18.066,18.066,0,0,0-14.9,28.251A183.923,183.923,0,0,1,19.021.049" transform="translate(1802 921.32)" fill="#fff" /><path id="Path_832" data-name="Path 832" d="M14.036,25.544c8.236-4.125,18.375-5.9,21.668-6.4.019-.379.053-.749.053-1.134A18.042,18.042,0,0,0,26.752,2.39,160.1,160.1,0,0,0,14.036,25.544" transform="translate(1802.33 921.376)" fill="#fff" /><path id="Path_833" data-name="Path 833" d="M11.385,31.156H6.071a18.006,18.006,0,0,0,29.16-8.621c-16.818,2.785-23.846,8.621-23.846,8.621" transform="translate(1802.143 921.85)" fill="#fff" /></g></svg>}
                        </div>
                    </>
                }
                <div className={style['card-featured__img']}>
                    <Link passHref href={GetDynamicVehicleUrl(isATC, userPostcode, dealSelector)} as={GetVehicleUrl(isATC, userPostcode, dealSelector, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef)}>
                        <a className="w-100 d-block text-decoration-none"><img alt={`${vehicle?.make} ${vehicle?.model} ${vehicle?.derivative}`} className={`lazyload ${isIzmoImage(vehicleImage) ? 'izmo-image' : 'nonizmopaddingfix'}`} data-src={process.env.NEXT_PUBLIC_CDN + vehicleImage} /></a>
                    </Link>
                </div>
                <div className={style['card-featured__content']}>
                    <h4 className="mb-2">{vehicle?.make}</h4>
                    <h5 className="mb-2">{vehicle?.model}</h5>
                    <p className={style['card-featured__derivative']}>{vehicle?.derivative}</p>
                    {vehicle.stickers.length > 0 &&
                        <div className={style['card-featured__stickers']}>
                            {vehicle.stickers.map(id => {
                               
                                let sticker = stickerList.find(function (item) { return item && item.id === id; });
                                return (
                                    <Sticker key={id} sticker={sticker} />
                                )
                            })}
                        </div>
                    }
                    {isATC &&
                        <div className={`${style['card-featured__maintenence']} d-flex flex-nowrap justify-content-start align-items-center`}>
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/shield.svg`} className="mr-2 lazyload" alt="Shield Icon" />
                            <p>Fuel &amp; Go Insured Car with Maintenance</p>
                        </div>
                    }
                </div>

            </div>
            <div className={style['card-featured__bottom']}>
                <div className={style['personal-deal']}>
                    <div className={style['card-featured__details']}>
                        <ul>
                            <li><span>{vehicle?.deal?.term * 12}</span> Months Lease</li>
                            <li><span>{vehicle?.deal?.mileage}</span> Miles Per Annum</li>
                            <li className={style['vehicle_slide_personal']}><span>{formatMoney(vehicle?.deal?.initialRental)}</span> Initial Rental</li>
                        </ul>
                    </div>
                    <div className={style['card-featured__price']}>
                        <p>£{vehicle?.deal?.monthlyPrice}</p><small>{GetMonthlyVATText(dealSelector)}</small>
                    </div>
                </div>
                <Link passHref href={GetDynamicVehicleUrl(isATC, userPostcode, dealSelector)} as={GetVehicleUrl(isATC, userPostcode, dealSelector, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef)}><a className="w-100 text-decoration-none"><button className="btn btn-primary btn-lg btn-block">View This Deal</button></a></Link>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        stickerList: state.stickerList,
    };
}

export default connect(mapStateToProps)(CardFeatured);