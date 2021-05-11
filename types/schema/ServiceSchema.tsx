import { AggregateRating } from "./AggregateRating";

export type ServiceSchema = {
    context: string,
    type: string,
    name: string,
    serviceType?: string,
    aggregateRating?: AggregateRating
}