import { SitemapDefaultPages, SitemapDefaultNewsPages } from "../types/SitemapPages";
import { NewsTypes } from "../enums/NewsTypes";
import { ContentAPI } from "API/ContentAPI";
import SitemapPriorities from "types/SitemapPriorities";
import moment from 'moment'
import SitemapItemChangeFrequencies from "enums/SitemapItemChangeFrequencies";
import { VehicleTypes } from "enums/VehicleTypes";
import { NewsService } from "business-logic/newsService";
import { GetCanonicalUrl, GetAdviceCategoryUrl, GetAdviceArticleUrl, GetAdviceTagUrl, BudgetToUrlVehicleType, BodyTypeUrlVehicleType, BudgetFromUrlVehicleType, InStockUrlVehicleType, GetVehicleManufacturerUrl, GetShortModelUrl, GetVehicleUrl } from "helpers/urlHelper";
import { VehicleCategoryType } from "types/VehicleCategoryType";
import { SitemapPageIndexItem } from "types/SitemapPageIndexItem";
import { SitemapPageItem } from "types/SitemapPageItem";
import { ManufacturerModels } from "types/ManufacturerModels";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { groupByArray } from "helpers/helpers";
import { GetCategoriesForType, GetBudgetTo, GetBudgetOver, GetVehicleDenotations, GetManufacturersModels } from "./vehicleService";

export const getSitemapVehiclesXMLPage = async (make: string): Promise<Array<SitemapPageItem>> => {

    const pages: Array<SitemapPageItem> = [];
    const vehiclesPromise = await GetVehicleDenotations(make, null, false);

    vehiclesPromise.data.forEach((vehicle) => {

        let sitemap: SitemapPageItem = {
            name: vehicle.derivativeUrl,
            url: GetCanonicalUrl(GetVehicleUrl(false, '', vehicle.vehicleTypeId == VehicleTypes.Car ? LeasingDealTypes.Personal : LeasingDealTypes.Van,
                vehicle.manufacturerUrl,
                vehicle.shortModTextUrl,
                vehicle.modelUrl,
                vehicle.derivativeUrl,
                vehicle.vehicleRef)),
            priority: SitemapPriorities._1_0,
            changeFrequency: SitemapItemChangeFrequencies.monthly,
            modifiedOn: moment().format('YYYY-MM-DD')
        }

        pages.push(sitemap);
    });

    return pages;
}

export const getSitemapPagesXMLPage = async (): Promise<Array<SitemapPageItem>> => {

    const pages: Array<SitemapPageItem> = [];
    const data = await GetGeneralSitemapPages();

    data.forEach(item => {
        pages.push(item);
    });

    GetVehicleTypes().forEach(vehicleType => {
        const inStock = GetInStockPages(vehicleType);
        const underBudget = GetSitemapBudgetUnderPages(vehicleType);
        const overBudget = GetSitemapBudgetOverPages(vehicleType);
        const bodyTypePages = GetSitemapBodyTypePages(vehicleType);
        const allPages = inStock.concat(underBudget).concat(overBudget).concat(bodyTypePages);

        allPages.forEach(item => {
            pages.push(item);
        });
    });

    return pages;
}

export const getSitemapXMLPage = async (): Promise<Array<SitemapPageIndexItem>> => {

    const currentDate = moment().format('YYYY-MM-DD');

    const pages: Array<SitemapPageIndexItem> = [
        { url: GetCanonicalUrl("/sitemap-pages.xml"), modifiedOn: currentDate },
        { url: GetCanonicalUrl("/sitemap-news.xml"), modifiedOn: currentDate },
        { url: GetCanonicalUrl("/sitemap-advice-guides.xml"), modifiedOn: currentDate },
        { url: GetCanonicalUrl("/sitemap-manufacturers.xml"), modifiedOn: currentDate },
        { url: GetCanonicalUrl("/sitemap-models.xml"), modifiedOn: currentDate }
    ];

    const manufacturerPages = await GetManufacturersModels()

    manufacturerPages.data.forEach(item => {
        let manufacturerPage: SitemapPageIndexItem = { url: GetCanonicalUrl("/sitemap-vehicles.xml?make=" + item.manufacturer.manufacturerUrl), modifiedOn: currentDate }
        pages.push(manufacturerPage);
    });

    return pages;
}

export const GetGeneralSitemapPages = async (includeContentHubBasePages: boolean = false) => {

    let siteMapPages = SitemapDefaultPages;

    if (includeContentHubBasePages) {
        siteMapPages = siteMapPages.concat(await GetSitemapNewsPages()).concat(await GetSitemapAdviceGuidesPages());
    }

    return siteMapPages;
}

export const GetPriority = (date: Date): SitemapPriorities => {

    let priority: SitemapPriorities = SitemapPriorities._0_5;

    var a = moment(date);
    var b = moment(); // Current Date


    let differenceInDays = b.diff(a, 'days') // 1

    if (differenceInDays <= 7)
        priority = SitemapPriorities._0_5;
    else if (differenceInDays <= 14)
        priority = SitemapPriorities._0_4;
    else if (differenceInDays <= 30)
        priority = SitemapPriorities._0_3;
    else if (differenceInDays <= 90)
        priority = SitemapPriorities._0_2;


    return priority;
}

export const GetSitemapNewsPages = async (baseOnly: boolean = true) => {

    let siteMapPages = SitemapDefaultNewsPages;

    if (!baseOnly) {

        var blogsBatch = await NewsService.GetAllNewsArticlePreviews(NewsTypes.Blog, null, 1, 500000);
        var latestNewsBatch = await NewsService.GetAllNewsArticlePreviews(NewsTypes.LatestNews, null, 1, 500000);
        var vehicleReviewsBatch = await NewsService.GetAllNewsArticlePreviews(NewsTypes.VehicleReviews, null, 1, 500000);

        let newsItems = blogsBatch.data.dataItems.concat(latestNewsBatch.data.dataItems, vehicleReviewsBatch.data.dataItems);

        newsItems.forEach((x) => {
            let sitemap: SitemapPageItem = {
                name: x.title,
                url: GetCanonicalUrl(x.url),
                priority: GetPriority(x.onDate != null ? x.onDate : moment()),
                changeFrequency: SitemapItemChangeFrequencies.monthly,
                modifiedOn: moment().format('YYYY-MM-DD')
            }
            siteMapPages.push(sitemap);
        });
    }

    return siteMapPages;
}

export const GetSitemapAdviceGuidesPages = async (baseOnly: boolean = false) => {

    let siteMapPages: Array<SitemapPageItem> = [];

    let sitemap: SitemapPageItem = { name: "Advice Guides", url: GetCanonicalUrl("/advice"), priority: SitemapPriorities._0_5, changeFrequency: SitemapItemChangeFrequencies.always, modifiedOn: moment().format('YYYY-MM-DD') }
    siteMapPages.push(sitemap);

    var categories = await ContentAPI.GetContentCategories();
    var tags = await ContentAPI.GetTags();

    await Promise.all(categories.data.map(async (category: { name: string; url: string; id: number; }) => {


        let sitemap: SitemapPageItem = { name: "Advice Guides - " + category.name, url: GetCanonicalUrl(GetAdviceCategoryUrl(category.url)), priority: SitemapPriorities._0_5, changeFrequency: SitemapItemChangeFrequencies.always, modifiedOn: moment().format('YYYY-MM-DD') }
        siteMapPages.push(sitemap);

        if (!baseOnly) {

            var contentItem = await ContentAPI.GetContentItems(category.id);

            if (contentItem != null && contentItem.data != null) {
                contentItem.data.forEach(content => {
                    let sitemap: SitemapPageItem = { name: content.pageTitle, url: GetCanonicalUrl(GetAdviceArticleUrl(content.categoryUrl, content.url)), priority: GetPriority(content.publishDate), changeFrequency: SitemapItemChangeFrequencies.monthly, modifiedOn: moment().format('YYYY-MM-DD') }
                    siteMapPages.push(sitemap);
                });




            }
        }
    }));



    tags.data.forEach(category => {
        let sitemap: SitemapPageItem = {
            name: "Advice Guides - " + category.name,
            url: GetCanonicalUrl(GetAdviceTagUrl(category.url)),
            priority: SitemapPriorities._0_5,
            changeFrequency: SitemapItemChangeFrequencies.always,
            modifiedOn: moment().format('YYYY-MM-DD')
        }
        siteMapPages.push(sitemap);
    });

    return siteMapPages;
}

export const GetSitemapBodyTypePages = (vehicleType: VehicleTypes): Array<SitemapPageItem> => {

    let pages: Array<SitemapPageItem> = [];
    let bodyTypes: Array<VehicleCategoryType> = GetCategoriesForType(vehicleType);

    bodyTypes.forEach((bodyType) => {

        let sitemap: SitemapPageItem = {
            name: bodyType.name,
            url: GetCanonicalUrl(BodyTypeUrlVehicleType(vehicleType, bodyType.name)),
            priority: SitemapPriorities._1_0,
            changeFrequency: SitemapItemChangeFrequencies.always,
            modifiedOn: moment().format('YYYY-MM-DD')
        }

        pages.push(sitemap);
    })

    return pages;
}

export const GetVehicleTypes = () => {
    return [
        VehicleTypes.Car,
        VehicleTypes.Commercial
    ]
}

export const GetSitemapBudgetPages = (vehicleType: VehicleTypes): Array<SitemapPageItem> => {

    let pages: Array<SitemapPageItem> = [];

    let under = GetSitemapBudgetUnderPages(vehicleType);
    let over = GetSitemapBudgetOverPages(vehicleType);
    pages = pages.concat(under).concat(over);

    return pages;
}

export const GetSitemapBudgetUnderPages = (vehicleType: VehicleTypes) => {

    let pages: Array<SitemapPageItem> = [];

    GetBudgetTo().forEach((value) => {

        let sitemap: SitemapPageItem = {
            name: "Up to £" + value,
            url: GetCanonicalUrl(BudgetToUrlVehicleType(vehicleType, value)),
            priority: SitemapPriorities._1_0,
            changeFrequency: SitemapItemChangeFrequencies.always,
            modifiedOn: moment().format('YYYY-MM-DD')
        }

        pages.push(sitemap)
    })

    return pages;
}

export const GetSitemapBudgetOverPages = (vehicleType: VehicleTypes) => {

    let pages: Array<SitemapPageItem> = [];

    GetBudgetOver().forEach((value) => {

        let sitemap: SitemapPageItem = {
            name: "Above £" + value,
            url: GetCanonicalUrl(BudgetFromUrlVehicleType(vehicleType, value)),
            priority: SitemapPriorities._1_0,
            changeFrequency: SitemapItemChangeFrequencies.always,
            modifiedOn: moment().format('YYYY-MM-DD')
        }

        pages.push(sitemap)
    })

    return pages;
}

export const GetInStockPages = (vehicleType: VehicleTypes) => {

    let pages: Array<SitemapPageItem> = [];

    let sitemap: SitemapPageItem = {
        name: ((vehicleType == VehicleTypes.Commercial) ? "Van" : "Car") + " Leasing In Stock",
        url: GetCanonicalUrl(InStockUrlVehicleType(vehicleType)),
        priority: SitemapPriorities._1_0,
        changeFrequency: SitemapItemChangeFrequencies.always,
        modifiedOn: moment().format('YYYY-MM-DD')
    }

    pages.push(sitemap)

    return pages;
}


export const GetModelPages = async () => {

    let manufacturerModels = await GetManufacturersModels();
    let pages: Array<SitemapPageItem> = [];

    let vehicleTypes = GetVehicleTypes();

    vehicleTypes.forEach(vehicleType => {

        const manufacturers = manufacturerModels.data.filter((item: ManufacturerModels) => {
            return item.models.some(x => x.vehicleType == vehicleType);
        })

        manufacturers.forEach(item => {

            const models = groupByArray(item.models.filter((item) => {
                return item.vehicleType == vehicleType;
            }), 'shortModText')

            models.forEach(model => {
                let sitemap: SitemapPageItem = {
                    name: model.key,
                    url: GetCanonicalUrl(GetShortModelUrl(false, null, (vehicleType == VehicleTypes.Car) ? LeasingDealTypes.Personal : LeasingDealTypes.Van, item.manufacturer.manufacturerUrl, model.key, null)),
                    priority: SitemapPriorities._1_0,
                    changeFrequency: SitemapItemChangeFrequencies.monthly,
                    modifiedOn: moment().format('YYYY-MM-DD')
                }
                pages.push(sitemap)
            });

        });

    });

    return pages;
}

export const GetManufacterModelPages = async () => {

    let manufacturerModels = await GetManufacturersModels();
    let pages: Array<SitemapPageItem> = [];

    let vehicleTypes = GetVehicleTypes();
    vehicleTypes.forEach(vehicleType => {

        const manufacturers = manufacturerModels.data.filter((item: ManufacturerModels) => {
            return item.models.some(x => x.vehicleType == vehicleType);
        })

        manufacturers.forEach(element => {
            let sitemap: SitemapPageItem = {
                name: element.manufacturer.manufacturerUrl,
                url: GetCanonicalUrl(GetVehicleManufacturerUrl(false, null, (vehicleType == VehicleTypes.Car) ? LeasingDealTypes.Personal : LeasingDealTypes.Van, element.manufacturer.manufacturerUrl)),
                priority: SitemapPriorities._1_0,
                changeFrequency: SitemapItemChangeFrequencies.always,
                modifiedOn: moment().format('YYYY-MM-DD')
            }

            pages.push(sitemap)
        });

    });


    return pages;
}