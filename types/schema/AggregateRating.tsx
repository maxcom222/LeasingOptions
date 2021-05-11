import { Organization } from "./Organization";

export type AggregateRating = {
    type: string,
    url: string,
    ratingCount:number,
    ratingValue:number,
    bestRating:number,
    worstRating:number,
    itemReviewed: Organization
}