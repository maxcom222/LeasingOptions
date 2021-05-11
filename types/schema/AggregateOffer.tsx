import { Organization } from "./Organization";

export type AggregateOffer = {
    priceCurrency: string,
    lowPrice?: number,
    highPrice?: number,
    offerCount?: number,
    seller: Organization
}