import { VehicleTypes } from "enums/VehicleTypes";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { CustomContentTypes } from 'enums/CustomContentTypes';
import { NewsTypes } from "enums/NewsTypes";
import { getUrl } from 'helpers/urlsHelper';

export class ContentAPI {

    private static baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_CONTENT_URL;

    public static async GetNewsArticlePreviews(newsType: NewsTypes, tagIds: Array<number>, pageIndex: number, pageSize: number) {
        let apiUrl = `api/news/getnewsarticlepreviews?filter[newsTypeId]=${newsType}&paginationCriteria[pageIndex]=${pageIndex}&paginationCriteria[pageSize]=${pageSize}`

        if (tagIds) {
            apiUrl += apiUrl + `&filter[tagIds]=${tagIds}`;
        }

        const res = await fetch(this.baseUrl + apiUrl);
        const data = await res.json()
        return data;
    }

    public static async GetRelatedArticles(id: number) {
        const res = await fetch(this.baseUrl + `api/news/getarticle/${id}/related`);
        const data = await res.json()
        return data;
    }

    public static async GetTopNews() {
        const res = await fetch(this.baseUrl + `api/news/gettopnews`);
        const data = await res.json()
        return data;
    }

    public static async GetCategoryRelatedArticles(newsType: NewsTypes) {
        const res = await fetch(this.baseUrl + `api/news/getcategory/${newsType}/relatedarticles`);
        const data = await res.json()
        return data;
    }

    public static async GetCategoryPopularArticles(newsType: NewsTypes) {
        const res = await fetch(this.baseUrl + `api/news/getcategory/${newsType}/populararticles`);
        const data = await res.json()
        return data;
    }

    public static async GetNewsArticle(newsArticleId: number, isAmp: boolean = false) {
        const res = await fetch(this.baseUrl + `api/news/newsarticle/${newsArticleId}?isamp=${isAmp}`);
        const data = await res.json()
        return data;
    }

    public static async GetTags() {
        const res = await fetch(this.baseUrl + `api/tags/list`);
        const data = await res.json()
        return data;
    }

    public static async GetPopularContentItems(tagIds = [], take: number = null) {
        let queryStringParts = [];

        if (tagIds && tagIds.length > 0) {
            for (let idx = 0; idx < tagIds.length; idx++) {
                queryStringParts.push(`tagids[${idx}]=${tagIds[idx]}`);
            }
        }

        if (take && take > 0) {
            queryStringParts.push(`takecount=${take}`);
        }

        const url = getUrl(this.baseUrl + 'api/content/items/getpopular', queryStringParts);
        const res = await fetch(url);
        const data = await res.json()
        return data;
    }

    public static async GetContentCategories() {
        const res = await fetch(this.baseUrl + `api/content/categories/list`);
        const data = await res.json()
        return data;
    }

    public static async GetContentItems(categoryId: number) {
        const res = await fetch(this.baseUrl + `api/content/items/list?filter[categoryid]=${categoryId}`);
        const data = await res.json()
        return data;
    }

    public static async GetGuideItems(categoryId: number = null, pageIndex: number, pageSize: number) {
        const res = await fetch(this.baseUrl + `/api/content/items/pagedlist?filter%5BcategoryId%5D=${categoryId}&paginationCriteria%5BpageIndex%5D=${pageIndex}&paginationCriteria%5BpageSize%5D=${pageSize}`);
        const data = await res.json()
        return data;
    }

    public static async GetManufacturePageContent(contentType: CustomContentTypes, leaseDealType: LeasingDealTypes, manufacturerUrl) {
        const res = await fetch(this.baseUrl + `api/content/custom/get?criteria.contentType=${contentType}&criteria.leasingDealType=${leaseDealType}&criteria.manufacturer=${manufacturerUrl}`);
        const data = await res.json()
        return data;
    }

    public static async GetModelPageContent(contentType: CustomContentTypes, leaseDealType: LeasingDealTypes, manufacturerUrl: string, modelUrl: string) {
        const res = await fetch(this.baseUrl + `api/content/custom/get?criteria.contentType=${contentType}&criteria.leasingDealType=${leaseDealType}&criteria.manufacturer=${manufacturerUrl}&criteria.shortModel=${modelUrl}`);
        const data = await res.json()
        return data;
    }

    public static async GetCustomPageContent(contentType: CustomContentTypes, vehicleType: VehicleTypes, key?: string) {
        let url = this.baseUrl + `api/content/custom/get?criteria.contentType=${contentType}&criteria.vehicleType=${vehicleType}`;

        if (key) {
            url += `&criteria.key=${key}`;
        }

        const res = await fetch(url);
        const data = await res.json()
        return data;
    }

    public static async GetFaqListAll() {
        const res = await fetch(this.baseUrl + 'api/faq/list');
        const data = await res.json()
        return data;
    }

    public static async GetFaqList(categoryId = 0) {
        let FaqUrl = this.baseUrl + 'api/faq/listfaqs';

        if (categoryId !== 0) {
            FaqUrl += '?categoryIds=' + categoryId;
        }

        const res = await fetch(FaqUrl);
        const data = await res.json()
        return data;
    }

    public static async GetFaqSearchResults(searchTerm: string, pageIndex: number, pageSize: number) {
        const res = await fetch(this.baseUrl + 'api/faq/search?searchTerm=' + searchTerm + '&pageSize=' + pageSize + '&pageIndex=' + pageIndex);
        const data = await res.json()
        return data;
    }

    public static async GetAdviceGuidesFaqs(categoryId: number = null, take: number = null) {
        let takePart = '';
        let queryParams = '';

        if (categoryId && categoryId > 0) {
            queryParams += '&categoryid=' + categoryId;
        }

        if (take !== null && take > 0) {
            if (queryParams) {
                takePart += '&';
            } else {
                takePart += '?';
            }
            takePart += 'takecount=' + take;
        }

        const res = await fetch(this.baseUrl + `api/faq/contenthub` + queryParams + takePart);
        const data = await res.json()
        return data;
    }

    public static async IncrementLikes(postID: number) {
        const res = await fetch(this.baseUrl + `api/news/incrementlikes/${postID}`);
        const data = await res.json()
        return data;
    }

    public static async IncrementDislikes(postID: number) {
        const res = await fetch(this.baseUrl + `api/news/incrementdislikes/${postID}`);
        const data = await res.json()
        return data;
    }

    public static async GetNewsSearchList(newsType: number, searchTerm: string) {
        const res = await fetch(this.baseUrl + `api/news/list?filter%5BnewsTypeId%5D=${newsType}&filter%5BsearchTerm%5D=${searchTerm}`);
        const data = await res.json()
        return data;
    }

    public static async GetGuidesSearchList(categoryId: number, searchTerm: string) {
        const res = await fetch(this.baseUrl + `api/content/items/list?filter%5BcategoryId%5D=${categoryId}&filter%5BsearchTerm%5D=${searchTerm}`);
        const data = await res.json()
        return data;
    }

    public static async GetByUrl(urlString: string, isAmp: boolean = false) {
        const res = await fetch(this.baseUrl + `api/content/items/getbyurl/${urlString}?isamp=${isAmp}`);
        const data = await res.json()
        return data;
    }

    public static async GetTotalLeasedValues() {
        const res = await fetch(this.baseUrl + 'api/commoninfo/totalleasedvalues');
        const data = await res.json()
        return data;
    }
}