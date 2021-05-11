import { Organization } from "./Organization";

export type BlogSchema = {
    author:string,
    publisher:Organization,
    datePublished:string,
    description:string,
    headline:string,
    image:string,
    mainEntityOfPage:string,
    sameAs:string,
}