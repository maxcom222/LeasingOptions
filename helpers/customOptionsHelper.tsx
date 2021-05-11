import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { VehicleCustomOptionsPersistanceState } from 'types/VehicleCustomOptionsPersistanceState';
import { isNullOrWhiteSpace } from './stringHelper';
import { getQueryParams } from './urlsHelper';
import { SiteSettings } from 'environment/siteSettings';
import { GetVehicleCheapestPriceTerm } from 'business-logic/vehicleService';

export class CustomOptionsHelper {
    public static getVehicleCustomOptions(data, callback) {
        let values = {
        };
        let isDefault = false;

        const parts = data.url.split('?');
        const queryStringParams = parts[1] ? getQueryParams(parts[1].split('&')) : null;

        if (queryStringParams) {
            let parsedInt = NaN;

            parsedInt = parseInt(queryStringParams["term"]);
            if (!isNaN(parsedInt)) {
                values["term"] = parsedInt;
            }

            parsedInt = parseInt(queryStringParams["initialrentals"]);
            if (!isNaN(parsedInt)) {
                values["initialRentalMonths"] = parsedInt;
            }

            parsedInt = parseInt(queryStringParams["mileage"]);
            if (!isNaN(parsedInt)) {
                values["mileage"] = parsedInt;
            }

            isDefault = !isNullOrWhiteSpace(queryStringParams["isdefault"]) && queryStringParams["isdefault"] === "1";
        }

        if (data.pricingType && data.pricingType === 2) { //isAtcPricing
            values["maintenance"] = true;
        }
        else if (!data.maintenanceAllowed) {
            values["maintenance"] = false;
        }

        let customOptions: VehicleCustomOptionsPersistanceState = CustomOptionsStorageHelper.getOrAddVehicleCustomOptions(data.vehicleRef, data.leasingDealType, isDefault, values);

        if (customOptions.useCheapestTerm) {
            let pricingData = {
                pricingType: data.pricingType || undefined,
                postcode: data.postcode || undefined
            };

            GetVehicleCheapestPriceTerm(customOptions.vehicleRef, customOptions.leasingDealType, customOptions.maintenance, customOptions.mileage, customOptions.initialRentalMonths, pricingData)
                .then((result: ApiResponse) => {
                    let cheapestTerm: number = null;

                    if (result.isSucceed && result.data) {
                        cheapestTerm = result.data;
                    }

                    customOptions.useCheapestTerm = false;

                    if (cheapestTerm && cheapestTerm > 0) {
                        customOptions.term = cheapestTerm;
                    }

                    CustomOptionsStorageHelper.addOrUpdateVehicleCustomOptions(customOptions);

                    callback(customOptions);
                });
        }
        else {
            callback(customOptions);
        }
    }

    public static storeVehicleCustomOptions(customOptions: VehicleCustomOptionsPersistanceState) {
        if (customOptions) {
            customOptions.useCheapestTerm = false;

            CustomOptionsStorageHelper.addOrUpdateVehicleCustomOptions(customOptions);
        }
    }
}

export class CustomOptionsStorageHelper {
    public static getOrAddVehicleCustomOptions(vehicleRef: number, leasingDealType: LeasingDealTypes, setToDefault: boolean, values: any): VehicleCustomOptionsPersistanceState {
        let customOptions: VehicleCustomOptionsPersistanceState = this.getVehicleCustomOptions(vehicleRef, leasingDealType);

        if (!customOptions || setToDefault) {
            customOptions = {
                vehicleRef: vehicleRef,
                leasingDealType: leasingDealType,

                term: SiteSettings.DefaultTerm,
                mileage: SiteSettings.GetDealTypeDefaultMileage(leasingDealType),
                maintenance: SiteSettings.DefaultMaintenance,
                initialRentalMonths: SiteSettings.DefaultInitialRentals,
                options: [],

                salesCode: 0,
                ageCategory: null,

                useCheapestTerm: true
            };
        }

        Object.assign(customOptions, values || {});

        this.addOrUpdateVehicleCustomOptions(customOptions);

        return customOptions;
    }

    public static addOrUpdateVehicleCustomOptions(customOptions: VehicleCustomOptionsPersistanceState) {
        if (customOptions !== null) {
            const key = this.getOptionsItemKey(customOptions.vehicleRef, customOptions.leasingDealType);
            localStorage.setItem(key, JSON.stringify(customOptions));
        }
    }

    private static getVehicleCustomOptions(vehicleRef: number, leasingDealType: LeasingDealTypes): VehicleCustomOptionsPersistanceState {
        let customOptions: VehicleCustomOptionsPersistanceState = null;

        if (vehicleRef && leasingDealType) {
            const key = this.getOptionsItemKey(vehicleRef, leasingDealType);
            const serializedItem = localStorage.getItem(key);
            customOptions = JSON.parse(serializedItem);
        }

        return customOptions;
    }

    private static getOptionsItemKey(vehicleRef: number, leasingDealType: LeasingDealTypes): string {
        return ("options_" + vehicleRef + "_" + leasingDealType).toLowerCase();
    }
}