import { VehicleTypes } from 'enums/VehicleTypes';
import { FuelTypes } from 'enums/FuelTypes';
import { VehicleFeatureTypes } from 'enums/VehicleFeatureTypes';
import { StickerItem } from '../StickerItem';

export type Vehicle = {
    vehicleRef: number,
    capId: number,
    vehicleType: VehicleTypes,

    make: string,
    shortModel: string,
    model: string,
    derivative: string,
    imageUrl: string,
    imageUrls: string[],
    interiorUrl?: string,
    exteriorUrl?: string,

    fuelType: FuelTypes,
    mpg?: number,
    speed60mph?: number,
    insuranceGroup: string,
    co2?: number,
    range?: number,
    seats?: number,
    doors?: number,
    transmission?: number,
    features: VehicleFeatureTypes[],
    stickers: StickerItem[],

    p11d?: number,
    bik20Tax?: number,
    bik40Tax?: number,
    minPrice?: number,
    maxPrice?: number,

    optionsSelectAllowed: boolean,
    availableMileages: number[],
    hasMaintenance: boolean,
    extraDetails?: any
}