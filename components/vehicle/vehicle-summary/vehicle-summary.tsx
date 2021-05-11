import React from 'react';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetVATText } from 'helpers/helpers';
import { formatNumber } from 'helpers/currencyHelper';

type Props = {
    options: {
        leasingDealType: LeasingDealTypes;
        term: number;
        mileage: number;
        maintenance: boolean;
        initialRentalMonths: number;
        interior: string;
        exterior: string;
    };
    prices: {
        monthly: string;
        monthlyMaintenance: string;
        processingFee: string;
        extraOptions: any[];
        extraOptionsTotal: string;
    };
    settings: {
        maintenanceEnabled: boolean;
        isAtc: boolean;
    }
}

//Warning: Fix layout. Table needs to be replaces with div
const VehicleSummary: React.FC<Props> = ({ options, prices, settings }) => {
    const vatText = GetVATText(options.leasingDealType);
    const hasExtraOptions = prices.extraOptions && prices.extraOptions.length > 0;

    return (
        <>
            <h2 className="h1 mb-5">Vehicle Summary</h2>
            <div className="w-100 box bg-white p-0">
                <div className="table table-bordered table--summary border-0 m-0">
                    <div className="row no-gutters">
                        <div className="col-24 col-md-12 px-0">
                            <table className="w-100">
                                <tbody>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Contract Type: <span>{LeasingDealTypes[options.leasingDealType]} Lease</span></td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Contract Length: <span>{options.term} Years</span></td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Annual Mileage: <span>{formatNumber(options.mileage)}</span></td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Initial Rentals: <span>{options.initialRentalMonths} Rental{options.initialRentalMonths !== 1 ? "s" : ""}</span></td>
                                    </tr>
                                    {(settings.maintenanceEnabled && !settings.isAtc) ? (
                                        <tr className="d-flex flex-wrap">
                                            <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Maintenance: <span>{options.maintenance ? prices.monthlyMaintenance + " Per month" : "N/A"}</span></td>
                                        </tr>
                                    ) : null}
                                    {settings.isAtc ? (
                                        <tr className="d-flex flex-wrap">
                                            <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Maintenance &amp; Insurance: <span>Included</span></td>
                                        </tr>

                                    ) : null}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-24 col-md-12 px-0">
                            <table className="w-100">
                                <tbody>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Trim / Interior: <span>{options.interior ? options.interior : "Not selected"}</span></td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Optional Extras:
                                            {hasExtraOptions && (
                                                <span>x{prices.extraOptions.length} = {prices.extraOptionsTotal}</span>
                                            )}
                                            {!hasExtraOptions && (
                                                <span>No options added</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Processing Fee: <span>{prices.processingFee} {vatText}</span></td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Paint: <span>{options.exterior ? options.exterior : "Not selected"}</span></td>
                                    </tr>
                                    <tr className="d-flex flex-wrap">
                                        <td className="col-24 d-flex d-md-inline-flex justify-content-between align-items-center border-right-0">Road Fund Licence: <span>Included</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex flex-wrap justify-content-end align-items-center p-3"><strong className="vehicle-price mr-1">{prices.monthly}</strong><span>{vatText}</span></div>
            </div>
        </>
    );
}

export default VehicleSummary;