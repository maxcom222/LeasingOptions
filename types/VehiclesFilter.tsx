import { PricingTypes } from "enums/PricingTypes";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleTypes } from "enums/VehicleTypes";
import { FuelTypes } from "enums/FuelTypes";
import { TransmissionTypes } from "enums/TransmissionTypes";

export type VehiclesFilter = {
    vehicleType: VehicleTypes,
    leasingDealType: LeasingDealTypes,

    postcode?: string,
    pricingType?: PricingTypes,
    maintenance?: boolean,
    mileage?: number,
    term?: number,
    initialRentals?: number,
    manufacturerUrl?: string,
    modelUrl?: string,
    shortModTextUrl?: string,
    shortDerTextUrl?: string,
    fuelType?: FuelTypes,
    transmission?: TransmissionTypes,
    mpg?: number,
    co2?: number,
    seats?: number,
    doors?: number,
    driveTrain?: string,
    engineSize?: string,
    priceFrom?: number,
    priceTo?: number,
    vehicleStyle?: number,
    vehicleSize?: number,
    isSpecial?: boolean,
    isInStock?: boolean
}