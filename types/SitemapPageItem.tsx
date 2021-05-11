import SitemapItemChangeFrequencies from "enums/SitemapItemChangeFrequencies";
import SitemapPriorities from "types/SitemapPriorities";

export type SitemapPageItem = {
    name: string,
    url: string,
    modifiedOn?: string,
    changeFrequency?: SitemapItemChangeFrequencies,  
    priority?: SitemapPriorities,  
}