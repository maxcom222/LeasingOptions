import { AggregateOffer } from "./AggregateOffer";

export type VehicleModelSchema = {
    brand: string,
    model: string,
    name: string,
    description: string
    url: string,
    image: string,
    vehicleSpecialUsage: string,
    offers?: AggregateOffer
}