import React from 'react';
import style from './vehicle-info.module.scss';
import VehicleShortInfo from '../vehicle-short-info/';
import VehicleCustomOptions from '../vehicle-custom-options/';

import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { Vehicle } from 'types/vehicles/Vehicle';

type Props = {
    vehicle: Vehicle;
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

const VehicleInfo: React.FC<Props> = ({ options, prices, settings, vehicle }) => {
    return (
        <div className={style['vehicle-info']}>
            <div className={`${style['vehicle-info__header']} d-none d-md-block`}>
                <VehicleShortInfo vehicle={vehicle} />
            </div>
            <div className={style['vehicle-info__content']}>
                <VehicleCustomOptions
                    options={options}
                    prices={prices}
                    settings={settings}
                />
            </div>
        </div>
    );
}

export default VehicleInfo;