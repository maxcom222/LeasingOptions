import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { TopPageMetaDescription } from "./seoHelper";
import { FaqItem } from "types/FaqItem";
import { GetCanonicalUrl } from "./urlHelper";
import { VehicleTypes } from "enums/VehicleTypes";
import { Vehicle } from 'types/vehicles/Vehicle';
import { BreadcrumbsItem } from 'types/infrastructure/BreadcrumbsItem';
import { WebPageSchema } from "types/schema/WebPageSchema";
import { FaqPageSchema } from "types/schema/FaqPageSchema";
import { ServiceSchema } from "types/schema/ServiceSchema";
import { VehicleSchema } from "types/schema/VehicleSchema";
import { BlogSchema } from "types/schema/BlogSchema";
import { BreadcrumbsSchema, BreadcrumbsElement } from "types/schema/BreadcrumbsSchema";
import { Organization } from "types/schema/Organization";
import { Logo } from "types/schema/Logo";
import { Question } from "types/schema/Question";
import { Answer } from "types/schema/Answer";
import { AggregateOffer } from "types/schema/AggregateOffer";
import { VehicleMetaDescription } from "helpers/seoHelper";
import { formatNumber } from 'helpers/currencyHelper';
import { GetFuelTypeText, GetTransmissionText } from "helpers/enumsHelper";
import moment from "moment";
import { GetTrustPilotRating } from "business-logic/systemService";

export const getLandingPageSchema = (leasingDealType: LeasingDealTypes, url: string) => {

    let leasingTypeText = "";

    switch (leasingDealType) {
        case LeasingDealTypes.Business:
            leasingTypeText = "Business Car Leasing";
            break;
        case LeasingDealTypes.Personal:
            leasingTypeText = "Car Leasing";
            break;
        case LeasingDealTypes.Van:
            leasingTypeText = "Van Leasing";
            break;
    }

    const webPageSchema: WebPageSchema = {
        name: leasingTypeText,
        type: "WebPage",
        context: "http://schema.org",
        description: TopPageMetaDescription(leasingDealType, url)
    }

    return setSchemaContextTypeProperties(JSON.stringify(webPageSchema));
}

export const getWebPageSchema = (name: string, description: string) => {
    const webPageSchema: WebPageSchema = {
        name: name,
        type: "WebPage",
        context: "http://schema.org",
        description: description
    }

    return setSchemaContextTypeProperties(JSON.stringify(webPageSchema));
}



export const setSchemaContextTypeProperties = (text: string) => {
    return text.replace('"type"', '"@type"').replace('"context"', '"@context"')
}

export const GetServiceSchema = async (vehicleType: VehicleTypes) => {

    var trustpilotRating = await GetTrustPilotRating();

    let schema: ServiceSchema =
    {
        name: "Leasing Options",
        serviceType: vehicleType == VehicleTypes.Commercial ? "Van" : "Car" + " Leasing",
        context: "http://schema.org",
        type: "Service"
    };

    if (trustpilotRating.data != null) {
        schema.aggregateRating =
        {
            type: "AggregateRating",
            bestRating: 5,
            worstRating: 0,
            url: "https://uk.trustpilot.com/review/leasingoptions.co.uk",
            ratingCount: trustpilotRating.data.reviewsCount,
            ratingValue: trustpilotRating.data.score,
            itemReviewed: GetLoOrganization()
        };
    }

    return setSchemaContextTypeProperties(JSON.stringify(schema));
}



//TODO: review all above
export const GetFaqsSchema = (leasingDealType: LeasingDealTypes, faqs: Array<FaqItem>): FaqPageSchema => {
    let schema: FaqPageSchema = {
        mainEntity: []
    };

    if (faqs && faqs.length > 0) {
        let author: Organization = GetLoOrganization();
        author.url = (leasingDealType === LeasingDealTypes.Van ? GetCanonicalUrl("/van-leasing") : GetCanonicalUrl(leasingDealType == LeasingDealTypes.Business ? "/business-car-leasing" : "/car-leasing")).toLowerCase();

        for (let idx = 0; idx < faqs.length; idx++) {
            const item: FaqItem = faqs[idx];
            const schemaItem: Question = GetQuestion(item, author);

            schema.mainEntity.push(schemaItem);
        }
    }

    return Object.assign({ '@type': 'FAQPage' }, schema);
}

export const GetQuestion = (faqItem: FaqItem, author: Organization): Question => {
    let schema: Question = {
        name: faqItem.question,
        answerCount: 1,
        author: author,
        acceptedAnswer: GetAnswer(faqItem, author)
    };

    return Object.assign({ '@type': 'Question' }, schema);
}

export const GetAnswer = (faqItem: FaqItem, author: Organization): Answer => {
    let schema: Answer =
    {
        text: faqItem.answer,
        author: author
    };

    return Object.assign({ '@type': 'Answer' }, schema);
}

export const GetBreadcrumbsSchema = (breadcrumbs: BreadcrumbsItem[]): BreadcrumbsSchema => {
    let schema: BreadcrumbsSchema = {
        itemListElement: []
    };

    if (breadcrumbs && breadcrumbs.length > 0) {
        for (let idx = 0; idx < breadcrumbs.length; idx++) {
            const item: BreadcrumbsItem = breadcrumbs[idx];
            const schemaItem: BreadcrumbsElement = GetBreadcrumbsListItem(idx + 1, item);

            schema.itemListElement.push(schemaItem);
        }
    }

    return Object.assign({ '@type': 'BreadcrumbList' }, schema);
}

export const GetBreadcrumbsListItem = (idx: number, breadcrumbsItem: BreadcrumbsItem): BreadcrumbsElement => {
    let schema: BreadcrumbsElement = {
        position: idx,
        name: breadcrumbsItem.name.toUpperCase(),
        item: GetCanonicalUrl(breadcrumbsItem.url)
    };

    return Object.assign({ '@type': 'ListItem' }, schema);
}

export const GetBlogPostSchema = (article: any): BlogSchema => {
    let momentDate = moment(article.onDate, "YYYY-MM-DDTHH:mm");
    let formattedDate = momentDate.format("YYYY-MM-DD");
    let schema: BlogSchema = {
        author: "Leasing Options",
        publisher: GetLoOrganization(),
        datePublished: article.onDate ? formattedDate : null,
        description: article.metaDescription ? article.metaDescription : null,
        headline: article.title ? article.title : null,
        image: process.env.NEXT_PUBLIC_CDN + article.imageUrl,
        mainEntityOfPage: article.newsUrl ? GetCanonicalUrl(`/news/blog/${article.newsUrl}`) : null,
        sameAs: "https://www.facebook.com/LeasingOptionsLtd/"
    };

    return Object.assign({ '@type': 'BlogPosting' }, schema);
}

export const GetVehicleSchema = (vehicle: Vehicle, url: string, imageUrl: string): VehicleSchema => {
    let schema: VehicleSchema = {
        brand: vehicle.make,
        model: vehicle.model,
        vehicleConfiguration: vehicle.derivative,
        sku: vehicle.vehicleRef,
        name: vehicle.make + " " + vehicle.model + " " + vehicle.derivative,
        description: VehicleMetaDescription(vehicle.vehicleType, vehicle.make, vehicle.shortModel, vehicle.derivative),
        modelDate: null,

        url: url,
        image: imageUrl,

        fuelCapacity: null,
        fuelEfficiency: vehicle.mpg,
        fuelType: GetFuelTypeText(vehicle.fuelType),
        accelerationTime: null,
        emissionsCO2: vehicle.co2 || vehicle.co2 === 0 ? `${formatNumber(vehicle.co2)} g/km` : null,
        meetsEmissionStandard: null,
        numberOfDoors: vehicle.doors,
        numberOfForwardGears: null,
        payload: null,
        vehicleSeatingCapacity: vehicle.seats,
        vehicleSpecialUsage: "Leasing",
        vehicleTransmission: vehicle.transmission ? GetTransmissionText(vehicle.transmission) : null,
        speed: {
            minValue: 0,
            maxValue: null
        },
        offers: GetAggregateOffer(vehicle.minPrice, vehicle.maxPrice)
    };

    return Object.assign({ '@type': 'Car' }, schema);
}

export const GetAggregateOffer = (minPrice?: number, maxPrice?: number, count?: number): AggregateOffer => {
    const hasMinPrice = (minPrice >= 0);
    const hasMaxPrice = (maxPrice >= 0);

    if (hasMinPrice || hasMaxPrice) {
        let min = hasMinPrice ? minPrice : maxPrice;
        let max = hasMaxPrice ? maxPrice : minPrice;

        let schema: AggregateOffer = {
            priceCurrency: "GBP",
            seller: GetLoOrganization(),

            lowPrice: min,
            highPrice: max,
            offerCount: count
        };

        return Object.assign({ '@type': 'AggregateOffer' }, schema);
    }

    return null;
}

export const GetLoOrganization = (): Organization => {
    let schema: Organization = {
        name: "Leasing Options",
        logo: GetLogo(GetCanonicalUrl("/images/logo.png"))
    };

    return Object.assign({ '@type': 'Organization' }, schema);
}

export const GetLogo = (url: string): Logo => {
    let schema: Logo = {
        url: url
    };

    return Object.assign({ '@type': 'ImageObject' }, schema);
}

export const GetSerializedSchema = (shemaObject): string => {
    return JSON.stringify(Object.assign({ '@context': 'http://schema.org' }, shemaObject), (key, value) => {
        if (value !== null) return value;
    })
}