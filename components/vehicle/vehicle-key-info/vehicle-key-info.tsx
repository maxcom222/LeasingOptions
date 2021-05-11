import React from 'react';
import Link from 'next/link';
import PopOver from '../../../components/layout/popover';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";

import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { FuelTypes } from "enums/FuelTypes";
import { formatNumber } from 'helpers/currencyHelper';
import { GetFuelTypeText } from 'helpers/enumsHelper';

type Props = {
    leasingDealType: LeasingDealTypes;
    vehicle: any;
    prices: {
        p11d: string;
        bikTax: string;
    };
    sourceUrl: string;
}

const VehicleKeyInfo: React.FC<Props> = ({ leasingDealType, vehicle, prices, sourceUrl }) => {
    return (
        <>
            <h2 className="h1 mb-5">Key Information</h2>
            <div className="table table-bordered border-0">
                <div className="row no-gutters">
                    <div className="col-24 col-md-12 px-0">
                        <table className="w-100">
                            <tbody>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-md-0">
                                        Fuel Economy: <span>{(vehicle.fuelType !== FuelTypes.Electric && vehicle.mpg) ? `${formatNumber(vehicle.mpg, 1)} MPG` : "N/A"}</span>
                                    </td>
                                </tr>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-md-0">
                                        0 - 62 mph: <span>{(vehicle.speed60mph && vehicle.speed60mph > 0) ? `${formatNumber(vehicle.speed60mph, 1)} Secs` : "N/A"}</span>
                                    </td>
                                </tr>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-md-0">
                                        {vehicle.fuelType === FuelTypes.Electric ? (<>Range: <span>{(vehicle.range) ? `${vehicle.range} km` : "N/A"}</span></>) : null}
                                        {vehicle.fuelType !== FuelTypes.Electric ? (<>Co2: <span>{(vehicle.co2 || vehicle.co2 === 0) ? `${formatNumber(vehicle.co2)} g/km` : "N/A"}</span></>) : null}
                                    </td>
                                </tr>
                                {leasingDealType !== LeasingDealTypes.Personal &&
                                    (
                                        <tr className="d-flex flex-wrap">
                                            <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-md-0">
                                                <span>BIK Tax: <PopOver id="contract-length" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="BIK Tax" /></span> <span><Link href={`/contact?type=bik&source=${sourceUrl}`}><a>Click</a></Link> to request</span>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-24 col-md-12 px-0">
                        <table className="w-100">
                            <tbody>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center">
                                        <span>P11D: <PopOver id="contract-length" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="The valuation used by employers to calculate Company Car Tax" /></span> <span>{prices.p11d || "N/A"}</span>
                                    </td>
                                </tr>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center">Insurance Group: <span>{(vehicle.insuranceGroup) && vehicle.insuranceGroup !== "0" ? `Group ${vehicle.insuranceGroup}` : "-"} </span></td>
                                </tr>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center">Passengers: <span>{vehicle.seats ? `${vehicle.seats} Adults` : "N/A"}</span></td>
                                </tr>
                                <tr className="d-flex flex-wrap">
                                    <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center">Fuel Type: <span>{GetFuelTypeText(vehicle.fuelType)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VehicleKeyInfo;