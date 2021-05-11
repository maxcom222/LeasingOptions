import React from 'react';
import PopOver from '../../layout/popover';
import DropDown from '../../layout/drop-down';
import VehicleRentalMonthsSlider from '../vehicle-rental-months-slider/';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";

import { GetVATText } from 'helpers/helpers';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { formatNumber } from 'helpers/currencyHelper';

type Props = {
    options: {
        leasingDealType: LeasingDealTypes;
        term: number;
        mileage: number;
        maintenance: boolean;
        initialRentalMonths: number;
    };
    prices: {
        initialRental: string;
        monthlyMaintenance: string;
    };
    settings: {
        setOptions: any;
        availableMileages: number[];
        maintenanceEnabled: boolean;
        hasMaintenance: boolean;
        isAtc: boolean;
    };
}

//TODO: merge vehicle-custom-options and vehicle-custom-options-special-deal components
const VehicleCustomOptions: React.FC<Props> = ({ options, prices, settings }) => {
    const blackFridayTheme = process.env.NEXT_PUBLIC_BLACK_FRIDAY_THEME;
    let terms = [2, 3, 4];
    let top3MileageItems = [];
    let isCustomMileage = false;

    if (settings.availableMileages && settings.availableMileages.length > 0) {
        if (settings.availableMileages.length <= 3) {
            Array.prototype.push.apply(top3MileageItems, settings.availableMileages);
        }
        else {
            if (!settings.isAtc) {
                Array.prototype.push.apply(top3MileageItems, options.leasingDealType === LeasingDealTypes.Van ? [8000, 10000, 12000] : [5000, 8000, 10000]);
            }
            else {
                Array.prototype.push.apply(top3MileageItems, [5000, 10000, 15000]);
            }
        }

        isCustomMileage = !top3MileageItems.includes(options.mileage);
    }

    return (
        <>
            <div className="w-100 py-3">
                <label className="mr-1">Contract Length - <span>{options.term} Years</span></label>
                <PopOver id="contract-length" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="This is the term you will lease your vehicle for." />
                <div className={`btn-group chck-buttons ${blackFridayTheme === 'true' ? 'chck-buttons--bf' : ''} chck-buttons--x3`} role="group" aria-label="Contract Length">
                    {terms.map(term => (
                        <button key={`term-${term}`} onClick={() => settings.setOptions("term", term)} className={`btn btn-option btn-fluid btn-lg ${options.term === term ? "is-active" : ""}`}>{term} Years</button>
                    ))}
                </div>
            </div>
            <div className="w-100 py-3">
                <label className="mr-1">Annual Mileage - <span>{formatNumber(options.mileage)} Miles</span></label>
                <PopOver id="annual-mileage" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="Each mile travelled in excess of the annual mileage allowance will attract a cost in pence per mile. This figure will be confirmed at order stage and on your finance agreement." />
                {(top3MileageItems && top3MileageItems.length > 0) ? (
                    <div className={`btn-group chck-buttons ${blackFridayTheme === 'true' ? 'chck-buttons--bf' : ''}`} role="group" aria-label="Annual Mileage">
                        {top3MileageItems.map(mileage => (
                            <button key={`top-mileage-${mileage}`} onClick={() => settings.setOptions("mileage", mileage)} className={`btn btn-option btn-fluid btn-lg ${(options.mileage === mileage && !isCustomMileage) ? "is-active" : ""}`}>{formatNumber(mileage)}</button>
                        ))}
                        {settings.availableMileages.length > 3 ? (
                            <DropDown wrapperClass="btn--dd" buttonClass={`btn btn-outline-primary btn-fluid btn-lg ${isCustomMileage ? " is-active" : ""}`} buttonText={isCustomMileage ? formatNumber(options.mileage) : "More"}>
                                {settings.availableMileages.map(mileage => (
                                    <button key={`mileage-${mileage}`} onClick={() => settings.setOptions("mileage", mileage)} type="button" className={`${options.mileage === mileage ? "is-active" : ""}`}>{formatNumber(mileage)}</button>
                                ))}
                            </DropDown>
                        ) : null}
                    </div>
                ) : null}
            </div>
            {(settings.maintenanceEnabled || settings.isAtc) ? (
                <div className="w-100 py-3">
                    <label className="mr-1">Maintenance - <span>{options.maintenance ? prices.monthlyMaintenance + " Per month" : "No"}</span></label>
                    <PopOver id="maintenance" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="Select if you would like to order a maintenance package with your vehicle. If you do not select you will be responsible for all maintenance costs." />
                    <div className={`btn-group chck-buttons ${blackFridayTheme === 'true' ? 'chck-buttons--bf' : ''} chck-buttons--x3`} role="group" aria-label="Maintenance">
                        {!settings.isAtc ? (
                            <button onClick={() => settings.setOptions("maintenance", false)} className={`btn btn-option btn-fluid btn-lg ${options.maintenance ? "" : "is-active"}`}>No</button>
                        ) : null}
                        {(settings.isAtc || settings.hasMaintenance) ? (
                            <button onClick={() => settings.setOptions("maintenance", true)} className={`btn btn-option btn-fluid btn-lg ${options.maintenance ? "is-active" : ""}`}>Yes</button>
                        ) : null}
                    </div>
                </div>
            ) : null}
            <div className="w-100 py-3">
                <label className="mr-1"><span>x{options.initialRentalMonths}</span> Initial Payment - <span>{prices.initialRental} {GetVATText(options.leasingDealType)}</span></label>
                <PopOver id="cinitial-payment" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="Your first payment is calculated in multiples of your monthly rental. Choosing a larger initial rental makes your monthly payments smaller. This is part of your contract and is not a deposit. It is non-refundable and is usually taken within 14 days of your vehicle being delivered." />
                <VehicleRentalMonthsSlider value={options.initialRentalMonths} onValueChanged={(value) => settings.setOptions("initialRentalMonths", value)} />
            </div>
        </>
    )
}

export default VehicleCustomOptions;