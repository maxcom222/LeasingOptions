import React from 'react';
import Link from 'next/link';
import style from './card-vehicle.module.scss';
import Sticker from '../../layout/sticker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetMonthlyVATText, isIzmoImage } from 'helpers/helpers';
import { GetDynamicVehicleUrl, GetVehicleUrl } from 'helpers/urlHelper';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { formatMoney } from 'helpers/currencyHelper';
import { connect } from 'react-redux';
type Props = {
    isATC?: boolean;
    userPostcode?: string;
    id?: string;
    header?: boolean;
    headerColor?: string;
    headerIcon?: any;
    vehicle?: any;
    dealSelector: number,
    showStickers?: boolean,
    stickerList: any;
}

const CardVehicle: React.FC<Props> = ({ isATC = false, userPostcode = '', id, header = false, headerColor = '', headerIcon = null, vehicle, dealSelector, showStickers = true, stickerList }) => {
    const isPersonal = dealSelector === LeasingDealTypes.Personal;
    const vehicleImage = (vehicle?.imageUrl) ? "/fit-in/400x400/" + vehicle.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";

    return (
        <div className={style['card-vehicle']}>
            <div className={style['card-vehicle__top']}>
                {header &&
                    <>
                        <style dangerouslySetInnerHTML={{ __html: `#${id}:before { background-color: ${headerColor}; } #${id}:after { border-color: transparent transparent transparent ${headerColor};}` }}></style>
                        <div id={id} className={style['card-vehicle__header']}><span>{vehicle.options ? vehicle.options : 'Special Offer'}</span>{headerIcon ? <FontAwesomeIcon width="24" height="24" icon={headerIcon} /> : ""}</div>
                    </>
                }
                <div className={style['card-vehicle__img']}>
                    <Link passHref href={GetDynamicVehicleUrl(isATC, userPostcode, dealSelector)} as={GetVehicleUrl(isATC, userPostcode, dealSelector, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef)}>
                        <a className="w-100 d-block text-decoration-none"><img alt={`${vehicle?.make} ${vehicle?.model} ${vehicle?.derivative}`} className={`lazyload ${isIzmoImage(vehicleImage) ? 'izmo-image' : 'nonizmopaddingfix'}`} src={`${process.env.NEXT_PUBLIC_CDN}/fit-in/400x400/website/static/img-placeholder.jpg`} data-src={process.env.NEXT_PUBLIC_CDN + vehicleImage} /></a>
                    </Link>
                </div>
                <div className={style['card-vehicle__content']}>
                    <h4 className="mb-2">{vehicle?.make}</h4>
                    <h5 className="mb-2">{vehicle?.model}</h5>
                    <p className={style['card-vehicle__derivative']}>{vehicle?.derivative}</p>
                    {(showStickers && vehicle.stickers.length > 0) &&
                        <div className={style['card-vehicle__stickers']}>
                            {vehicle.stickers.map(id => {
                                let sticker = stickerList.find(function (item) { return item && item.id === id; });

                                return (
                                    <Sticker key={id} sticker={sticker} />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
            <div className={style['card-vehicle__bottom']}>
                <div className={style['personal-deal']}>
                    <div className={style['card-vehicle__details']}>
                        <ul>
                            <li><span>{(isPersonal ? vehicle?.personalDeal?.term : vehicle?.businessDeal?.term) * 12}</span> Months Lease</li>
                            <li><span>{(isPersonal ? vehicle?.personalDeal?.mileage : vehicle?.businessDeal?.mileage)}</span> Miles Per Annum</li>
                            <li className={style['vehicle_slide_personal']}><span>{formatMoney(isPersonal ? vehicle?.personalDeal?.initialRental : vehicle?.businessDeal?.initialRental)}</span> Initial Rental</li>
                        </ul>
                    </div>
                    <div className={style['card-vehicle__price']}>
                        <p>{formatMoney(isPersonal ? vehicle?.personalDeal?.monthlyPrice : vehicle?.businessDeal?.monthlyPrice)}</p><small>{GetMonthlyVATText(dealSelector)}</small>
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

export default connect(mapStateToProps)(CardVehicle);