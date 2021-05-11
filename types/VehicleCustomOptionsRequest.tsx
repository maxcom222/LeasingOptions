import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleAgeCategories } from "enums/VehicleAgeCategories";
import { PricingTypes } from "enums/PricingTypes";

export type VehicleCustomOptionsRequest = {
    pricingType?: PricingTypes,
    postcode?: string,

    vehicleRef: number,
    leasingDealType: LeasingDealTypes,

    term: number,
    mileage: number,
    maintenance: boolean,
    initialRentalMonths: number,
    options: number[],

    salesCode: number,
    ageCategory?: VehicleAgeCategories
}