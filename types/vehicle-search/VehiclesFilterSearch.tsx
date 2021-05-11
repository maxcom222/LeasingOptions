import { VehiclesFilterSearchItem } from "./VehiclesFilterSearchItem";

export type VehiclesFilterSearch = {
    searchType: VehiclesFilterSearchItem,
    manufacturerUrl: string,
    modelUrl: string,
    shortDerTextUrl: VehiclesFilterSearchItem,
    term: VehiclesFilterSearchItem,
    initialRental: VehiclesFilterSearchItem,
    mileage: VehiclesFilterSearchItem,
    fuelType: VehiclesFilterSearchItem,
    transmission: VehiclesFilterSearchItem,
    co2: VehiclesFilterSearchItem,
    mpg: VehiclesFilterSearchItem,
    doors: VehiclesFilterSearchItem, 
    seats: VehiclesFilterSearchItem,
    driveTrain: VehiclesFilterSearchItem,
    vehicleSize: VehiclesFilterSearchItem,
    vehicleStyle: VehiclesFilterSearchItem,
    engineSize: VehiclesFilterSearchItem,
    priceFrom: VehiclesFilterSearchItem,
    priceTo: VehiclesFilterSearchItem,
    isInStock: boolean,
    isSpecial: boolean
}