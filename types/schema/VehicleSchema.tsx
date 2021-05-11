import { AggregateOffer } from "./AggregateOffer";

export type VehicleSchema = {
    brand: string,
    model: string,
    vehicleConfiguration: string,
    sku: number,
    name: string,
    description: string,
    modelDate: string,

    url: string,
    image: string,

    fuelType: string,
    fuelEfficiency?: number,
    fuelCapacity: string,
    accelerationTime: string,
    emissionsCO2: string,
    meetsEmissionStandard: string,
    numberOfDoors?: number,
    numberOfForwardGears: string,
    payload: string,
    vehicleSeatingCapacity?: number,
    vehicleSpecialUsage: string,
    vehicleTransmission: string,
    offers?: AggregateOffer,
    speed: VehicleSpeed
}

export type VehicleSpeed = {
    minValue?: number,
    maxValue?: number
}