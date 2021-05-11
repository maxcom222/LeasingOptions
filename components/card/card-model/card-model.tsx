import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import style from './card-model.module.scss';
import Sticker from '../../layout/sticker';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faCog, faTachometerAltFast, faCloud, faExclamationTriangle, faInfoCircle, faEdit, faCheck } from "@fortawesome/pro-regular-svg-icons";

import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { formatMoney } from 'helpers/currencyHelper';
import { GetMonthlyVATText } from 'helpers/helpers';
import { GetDynamicVehicleUrl, GetVehicleUrl } from 'helpers/urlHelper';
import { GetDealData } from 'business-logic/vehicleService';
type Props = {
    isInternal: boolean;
    vehicle: any;
    leasingDealType: LeasingDealTypes;
    maintenance: boolean;
    stickerList: any;
    pricingType?: PricingTypes;
    userPostcode?: string;

    settings: {
        onPricingMatrix: any;
        onErrorFeedback: any;
    }
}

const CardModel: React.FC<Props> = ({ isInternal, pricingType, userPostcode, vehicle, leasingDealType, maintenance, stickerList, settings }) => {
    const isAtc = pricingType && pricingType === PricingTypes.Atc;
    const initialDeal = leasingDealType === LeasingDealTypes.Personal ? vehicle.personalDeal : vehicle.businessDeal;
    const vehicleImage = (vehicle?.imageUrl) ? "/fit-in/400x400/" + vehicle.imageUrl : "/fit-in/400x400/website/static/img-placeholder.jpg";

    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [editDeal, setEditDeal] = useState<LeasingDealTypes>(leasingDealType);
    const [editTerm, setEditTerm] = useState<number>(initialDeal.term * 12);
    const [editMileage, setEditMileage] = useState<number>(initialDeal.mileage);
    const [editInitial, setEditInitial] = useState<number>(initialDeal.initialRentalMonths);
    const [displayedPrice, setDisplayedPrice] = useState<number>(initialDeal.monthlyPrice);

    useEffect(() => {
        const deal = leasingDealType === LeasingDealTypes.Personal ? vehicle.personalDeal : vehicle.businessDeal;

        setEditDeal(leasingDealType);
        setEditTerm(deal.term * 12);
        setEditMileage(deal.mileage);
        setEditInitial(deal.initialRentalMonths);

        setDisplayedPrice(deal.monthlyPrice);
    }, [vehicle, leasingDealType]);

    const handleEditClose = () => setEditToggle(false);

    const handleEditOpen = () => setEditToggle(true);

    const changeDealType = async (evt) => {
        let selectedValue = parseInt(evt.target.value);

        setEditDeal(selectedValue);
        updatePrice(editTerm, editMileage, editInitial, selectedValue);
    };

    const changeTerm = async (evt) => {
        let selectedValue = evt.target.value;
        setEditTerm(selectedValue);
        updatePrice(selectedValue, editMileage, editInitial, editDeal);
    };

    const changeMileage = async (evt) => {
        let selectedValue = evt.target.value;
        setEditMileage(selectedValue);
        updatePrice(editTerm, selectedValue, editInitial, editDeal);
    };

    const changeInitialRentalMonths = async (evt) => {
        let selectedValue = evt.target.value;
        setEditInitial(selectedValue);
        updatePrice(editTerm, editMileage, selectedValue, editDeal);
    };

    const updatePrice = async (term, milage, initialRentalMonths, dealType) => {
        const dealData = await GetDealData(vehicle.vehicleRef, (term / 12), milage, initialRentalMonths, dealType, maintenance, pricingType, userPostcode);
        setDisplayedPrice(dealData?.data?.monthlyPrice)
    }

    return (
        <div className={`${style['card-model']} row d-flex flex-column flex-sm-row flex-wrap my-3 my-md-0`}>
            <div className={`col-24 col-sm-6 col-lg-4 pr-md-3 py-md-3 ${style['image']}`}>
                <Link passHref href={GetDynamicVehicleUrl(isAtc, userPostcode, editDeal)} as={GetVehicleUrl(isAtc, userPostcode, editDeal, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef, editMileage, editInitial, editTerm / 12)}><a className="w-100 d-block text-center text-decoration-none"><img alt={`${vehicle?.make} ${vehicle?.model} ${vehicle?.derivative}`} className="img-fluid lazyload mb-3 mb-md-0" data-src={process.env.NEXT_PUBLIC_CDN + vehicleImage} /></a></Link>
            </div>
            <div className={`col-24 col-sm-18 col-lg-12 px-md-3 py-3 pt-lg-1 pb-lg-0 ${style['summary']}`}>
                <Link passHref href={GetDynamicVehicleUrl(isAtc, userPostcode, editDeal)} as={GetVehicleUrl(isAtc, userPostcode, editDeal, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef, editMileage, editInitial, editTerm / 12)}><a className="text-decoration-none"><h3>{vehicle?.make} {vehicle?.model}</h3></a></Link>
                <h4>{vehicle?.derivative}</h4>
                {vehicle.stickers.length > 0 ?
                    (
                        <div className={style['stickers']}>
                            {vehicle.stickers.map(id => {
                                let sticker = stickerList.find(function (item) { return item && item.id === id; });

                                return (
                                    <Sticker key={id} sticker={sticker} />
                                )
                            })}
                        </div>
                    ) : null
                }
                <ul className={`list-inline ${style['options']}`}>
                    <li className="list-inline-item"><FontAwesomeIcon width="25" height="25" icon={faGasPump} /> Fuel: {vehicle?.fuelType}</li>
                    <li className="list-inline-item"><FontAwesomeIcon width="25" height="25" icon={faCog} /> Gearbox: {vehicle?.gearbox}</li>
                    <li className="list-inline-item"><FontAwesomeIcon width="25" height="25" icon={faTachometerAltFast} /> MPG: {vehicle?.mpg}</li>
                    <li className="list-inline-item"><FontAwesomeIcon width="25" height="25" icon={faCloud} /> CO2: {vehicle?.co2}</li>
                </ul>
            </div>
            <div className={`col-24 col-sm-12 col-lg-4 px-md-3 mt-3 mt-md-0 py-md-3 ${style['info']}`}>
                <p>
                    {vehicle.vehicleType === VehicleTypes.Commercial ?
                        (
                            <><mark className="mark-text">Van</mark>&nbsp;Lease</>
                        ) : null
                    }
                    {vehicle.vehicleType !== VehicleTypes.Commercial ?
                        (
                            <>
                                <mark className={`mark-text ${editToggle ? "d-none" : ""}`} onClick={handleEditOpen}>{editDeal === LeasingDealTypes.Business ? 'Business' : 'Personal'}</mark>
                                <select className={editToggle ? "" : "d-none"} value={editDeal} onChange={(evt) => changeDealType(evt)}>
                                    <option value={LeasingDealTypes.Business}>Business</option>
                                    <option value={LeasingDealTypes.Personal}>Personal</option>
                                </select>
                            &nbsp;Lease
                        </>
                        ) : null
                    }
                </p>
                <p>
                    <mark className={`mark-text ${editToggle ? "d-none" : ""}`} onClick={handleEditOpen}>{editTerm}</mark>
                    <select className={editToggle ? "" : "d-none"} value={editTerm} onChange={(evt) => changeTerm(evt)}>
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                    </select>
                    &nbsp;Months Lease
                </p>
                <p>
                    <mark className={`mark-text ${editToggle ? "d-none" : ""}`} onClick={handleEditOpen}>{editMileage}</mark>
                    <select className={editToggle ? "" : "d-none"} value={editMileage} onChange={(evt) => changeMileage(evt)}>
                        <option value="5000">5,000</option>
                        <option value="8000">8,000</option>
                        <option value="10000">10,000</option>
                        <option value="12000">12,000</option>
                        <option value="15000">15,000</option>
                        <option value="20000">20,000</option>
                        <option value="30000">30,000</option>
                    </select>
                    &nbsp;Miles Per Annum
                </p>
                <p>
                    <mark className={`mark-text ${editToggle ? "d-none" : ""}`} onClick={handleEditOpen}>{formatMoney(editInitial * displayedPrice)}</mark>
                    <select className={editToggle ? "" : "d-none"} value={editInitial} onChange={(evt) => changeInitialRentalMonths(evt)}>
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="9">9 Months</option>
                        <option value="12">12 Months</option>
                    </select>
                    &nbsp;Initial Rental
                </p>
                <FontAwesomeIcon width="25" height="25" icon={faEdit} onClick={handleEditOpen} className={editToggle ? "d-none" : ""} />
                <FontAwesomeIcon width="25" height="25" icon={faCheck} onClick={handleEditClose} className={editToggle ? "" : "d-none"} />
            </div>
            <div className={`col-24 col-sm-12 col-lg-4 pl-md-3 py-md-3 ${style['price']}`}>
                {isInternal ?
                    (
                        <div className={style['internal']}>
                            <FontAwesomeIcon width="20" height="20" icon={faExclamationTriangle} title="Pricing Matrix" onClick={() => settings.onPricingMatrix(vehicle)} />
                            <FontAwesomeIcon width="20" height="20" icon={faInfoCircle} title="Report Mistake" onClick={() => settings.onErrorFeedback(vehicle)} />
                        </div>
                    ) : null
                }
                <p><span>{formatMoney(displayedPrice)}</span> <small>{GetMonthlyVATText(editDeal)}</small></p>
                <Link passHref href={GetDynamicVehicleUrl(isAtc, userPostcode, editDeal)} as={GetVehicleUrl(isAtc, userPostcode, editDeal, vehicle.make, vehicle.shortModel, vehicle.model, vehicle.derivative, vehicle.vehicleRef, editMileage, editInitial, editTerm / 12)}><a className="text-decoration-none"><button className="btn btn-primary btn-block btn-lg mt-3 mb-3 mb-lg-0">Personalise Deal</button></a></Link>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        stickerList: state.stickerList
    };
}

export default connect(mapStateToProps)(CardModel);