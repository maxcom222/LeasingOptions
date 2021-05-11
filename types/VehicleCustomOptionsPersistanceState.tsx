import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleAgeCategories } from "enums/VehicleAgeCategories";

export type VehicleCustomOptionsPersistanceState = {
    vehicleRef: number,
    leasingDealType: LeasingDealTypes,

    term: number,
    mileage: number,
    maintenance: boolean,
    initialRentalMonths: number,
    options: number[],

    salesCode: number,
    ageCategory?: VehicleAgeCategories,

    useCheapestTerm?: boolean
}