import { VehicleTypes } from "enums/VehicleTypes";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { isNullOrWhiteSpace } from "./stringHelper";
import { getFriendlyUrlSegment, getUrl } from "./urlsHelper";

const queryString = require('query-string');


export const GetCanonicalUrl = (relativePath: string): string => {
    return process.env.NEXT_PUBLIC_CANONICALBASEURL + ((!isNullOrWhiteSpace(relativePath) && relativePath !== "/") ? relativePath : "");
}

export const GetNonAmpCanonicalUrl = (relativePath: string) => {
    if (process.env.NEXT_PUBLIC_CANONICALBASEURL + ((!isNullOrWhiteSpace(relativePath) && relativePath !== "/"))) {
        return relativePath.replace("/amp", "");
    } else {
        return relativePath;
    }
}

export const GetVehiclesSearchUrl = (leasingDealType: LeasingDealTypes, userPostcode: string, trailingPart: string = null) => {
    if (userPostcode) {
        return GetAtcUrl(leasingDealType, userPostcode, "/search");

    } else {
        let vehicleTemplateUrl = GetVehicleUrlTemplate(leasingDealType).toLowerCase();

        if (vehicleTemplateUrl.includes("?")) {
            var fullUrl = vehicleTemplateUrl.split('?');
            var startUrl = fullUrl[0];
            var endUrl = fullUrl[1];

            return startUrl + "/search?" + endUrl + (trailingPart ? "&" + trailingPart : '');
        } else {
            return vehicleTemplateUrl + "/search" + (trailingPart ? "?" + trailingPart : '');
        }
    }
}

export const GetVehicleManufacturerUrl = (isATC: boolean, userPostcode: string, leasingDealType: LeasingDealTypes, manufacturer: string): string => {
    if (isATC && userPostcode) {
        return GetAtcUrl(leasingDealType, userPostcode, "/" + getFriendlyUrlSegment(manufacturer));
    } else {
        return GetDealTypeUrl(leasingDealType, "/" + getFriendlyUrlSegment(manufacturer));
    }
}

export const GetShortModelUrl = (isATC: boolean, userPostcode: string, leasingDealType: LeasingDealTypes, manufacturer: string, shortModText: string, vehicleFilters?: any) => {
    let baseUrl = '';
    let queryParams = [];

    if (isATC && userPostcode) {
        baseUrl = GetAtcUrl(leasingDealType, userPostcode, "/" + getFriendlyUrlSegment(manufacturer) + "/" + getFriendlyUrlSegment(shortModText));
    } else {
        baseUrl = GetDealTypeUrl(leasingDealType, "/" + getFriendlyUrlSegment(manufacturer) + "/" + getFriendlyUrlSegment(shortModText));
    }

    return getUrl(baseUrl, GetQueryParamsFromFilter(vehicleFilters));
}

export const GetDynamicShortModelUrl = (isATC: boolean, userPostcode: string, leasingDealType: LeasingDealTypes, vehicleFilters?: any) => {
    let baseUrl = '';
    let queryParams = [];

    if (isATC && userPostcode) {
        baseUrl = GetAtcUrl(leasingDealType, userPostcode, "/[make]/[shortModel]");
    } else {
        baseUrl = GetDealTypeUrl(leasingDealType, "/[make]/[shortModel]");
    }

    return getUrl(baseUrl, GetQueryParamsFromFilter(vehicleFilters));
}

export const GetNewsTypeUrl = (newsType: any) => {

    
    var newsTypeUrl = getFriendlyUrlSegment(newsType).trim();

    if (newsTypeUrl) {
        return "/news/" + newsTypeUrl;
    }

    return null;
}

export const GetAdviceCategoryUrl = (categoryUrl: string): string => {
    return "/advice/" + getFriendlyUrlSegment(categoryUrl).toLowerCase();
}

export const GetAdviceTagUrl = (tagUrl: string): string => {
    return "/advice/tag-" + getFriendlyUrlSegment(tagUrl).toLowerCase();
}

export const GetAdviceArticleUrl = (categoryUrl: string, articleUrl: string): string => {
    return ("/advice/" + getFriendlyUrlSegment(categoryUrl) + "/" + getFriendlyUrlSegment(articleUrl)).toLowerCase();
}

export const BodyTypeUrlLeasingDeal = (leasingDealType: LeasingDealTypes, bodyType: string): string => {
    return GetDealTypeUrl(leasingDealType, "/body-type-" + getFriendlyUrlSegment(bodyType.toString()));
}

export const ShortTermLeasing = (leasingDealType: LeasingDealTypes): string => {
    return GetDealTypeUrl(leasingDealType, "/short-term");
}

export const InStockUrlLeasingType = (leasingDealType: LeasingDealTypes): string => {
    return GetDealTypeUrl(leasingDealType, "/in-stock");
}

export const BudgetToUrlLeasingType = (leasingDealType: LeasingDealTypes, budget: number): string => {
    return GetDealTypeUrl(leasingDealType, "/budget/" + budget);
}

export const BudgetFromUrlLeasingDealType = (leasingDealType: LeasingDealTypes, budget: number): string => {
    return GetDealTypeUrl(leasingDealType, "/budget-over/" + budget);
}

export const BudgetToUrlVehicleType = (vehicleType: VehicleTypes, budget: number): string => {
    return GetVehicleTypeUrl(vehicleType, "/budget/" + budget);
}

export const BudgetFromUrlVehicleType = (vehicleType: VehicleTypes, budget: number): string => {
    return GetVehicleTypeUrl(vehicleType, "/budget-over/" + budget);
}

export const BodyTypeUrlVehicleType = (vehicleType: VehicleTypes, bodyType: string): string => {
    return GetVehicleTypeUrl(vehicleType, "/body-type/" + getFriendlyUrlSegment(bodyType.toString()));
}

export const InStockUrlVehicleType = (vehicleType: VehicleTypes) => {
    return GetVehicleTypeUrl(vehicleType, "/in-stock");
}

export const GetVehicleUrlTemplate = (leasingDealType: LeasingDealTypes): string => {
    var result = "/" + (leasingDealType == LeasingDealTypes.Van ? "van" : "car") + "-leasing";

    if (leasingDealType == LeasingDealTypes.Business) {
        result += "?leasingdeal=business";
    }

    return result.toLowerCase();
}

export const GetVehicleUrl = (isATC: boolean, userPostcode: string, leasingDealType: LeasingDealTypes, manufacturer: string, shortModText: string, model: string, derivative: string, vehicleref: number, mileage?: number, rentals?: number, term?: number, isDefault: boolean = false, isInternal: boolean = false) => {
    let url = "";

    if (isATC && userPostcode) {
        url = GetAtcUrl(leasingDealType, userPostcode, "/" + getFriendlyUrlSegment(manufacturer) + "/" +
            getFriendlyUrlSegment(shortModText) + "/" + getFriendlyUrlSegment(model) + "/" +
            getFriendlyUrlSegment(derivative) + "/" + vehicleref + "/vehicle");
    } else {
        url = GetDealTypeUrl(leasingDealType, "/" + getFriendlyUrlSegment(manufacturer) + "/" +
            getFriendlyUrlSegment(shortModText) + "/" + getFriendlyUrlSegment(model) + "/" +
            getFriendlyUrlSegment(derivative) + "/" + vehicleref + "/vehicle");
    }

    if (mileage || rentals || term || isDefault || isInternal) {
        if (!url.includes('?')) {
            url += "?";
        }

        if (mileage && rentals && term) {
            url += '&' + queryString.stringify({ mileage, rentals, term });
        }

        if (isInternal) { url += "&isInternal=1"; }
        if (isDefault) { url += "&isDefault=1"; }
    }

    return url.toLowerCase();
}

export const GetDynamicVehicleUrl = (isATC: boolean, userPostcode: string, leasingDealType: LeasingDealTypes) => {
    let url = "";

    if (isATC && userPostcode) {
        url = GetAtcUrl(leasingDealType, userPostcode, "/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle");
    } else {
        url = GetDealTypeUrl(leasingDealType, "/[make]/[shortModel]/[model]/[derivative]/[vehicleRef]/vehicle");
    }

    return url;
}

export const GetVehicleTypeUrl = (vehicleType: VehicleTypes, trailingPart: string = null): string => {

    var result = GetBaseVehicleTypeUrl(vehicleType);

    if (!isNullOrWhiteSpace(result) && !isNullOrWhiteSpace(trailingPart)) {
        result += trailingPart;
    }

    return result.toLowerCase();
}

export const GetBaseVehicleTypeUrl = (vehicleType: VehicleTypes): string => {
    var result = "";

    switch (vehicleType) {
        case VehicleTypes.Car:
            result = "/car-leasing";
            break;
        case VehicleTypes.Commercial:
            result = "/van-leasing";
            break;
    }

    return result.toLowerCase();
}


export const GetDealTypeUrl = (leasingDealType: LeasingDealTypes, trailingPart: string = null): string => {
    let result = "";

    if (leasingDealType == LeasingDealTypes.Business) {
        result = "/car-leasing" + (trailingPart ?? "") + "?leasingdeal=business";
    } else if (leasingDealType == LeasingDealTypes.Personal) {
        result = "/car-leasing" + (trailingPart ?? "");
    } else if (leasingDealType == LeasingDealTypes.Van) {
        result = "/van-leasing" + (trailingPart ?? "");
    }

    return result;
}

export const GetAtcUrl = (leasingDealType: LeasingDealTypes, userPostcode: string, trailingPart: string = null) => {
    let result = "/car-leasing-with-insurance/" + getFriendlyUrlSegment(userPostcode).toLowerCase() + trailingPart;

    if (leasingDealType == LeasingDealTypes.Business) {
        result += "?leasingdeal=business";
    }

    return result;
}

export const GetThankYouPageUrl = (isInternal: boolean, goal: string = null): string => {
    if (!isInternal) {
        return "/thankyou?goal=" + goal;
    }
    else {
        return "/thankyouinternal";
    }
}

export const GetVehicleTypeFromUrl = (url: string): VehicleTypes => {
    if (CheckVanUrl(url)) {
        return VehicleTypes.Commercial;
    } else {
        return VehicleTypes.Car;
    }
}

export const CheckAtcUrl = (url: string): boolean => {
    return url.includes("car-leasing-with-insurance");
}

export const CheckCarUrl = (url: string): boolean => {
    return url.includes("car-leasing");
}

export const CheckVanUrl = (url: string): boolean => {
    if(url.includes("van-leasing") || url.includes("van-leasing-deals")) {
        return true;
    } else {
        return false;
    }
}

export const GetSearchFiltersUrl = (leasingDealType: LeasingDealTypes, userPostcode: string, vehicleFilters: any) => {
    let baseUrl = null;
    let isAtc = false;

    if (userPostcode) {
        isAtc = true;

        if (vehicleFilters.manufacturerUrl === "") {
            baseUrl = GetVehiclesSearchUrl(leasingDealType, userPostcode);
        }
        else if (vehicleFilters.modelUrl === "") {
            baseUrl = GetVehicleManufacturerUrl(isAtc, userPostcode, leasingDealType, vehicleFilters.manufacturerUrl);
        }
        else {
            baseUrl = GetShortModelUrl(isAtc, userPostcode, leasingDealType, vehicleFilters.manufacturerUrl, vehicleFilters.modelUrl, null);
        }
    } else {
        if (vehicleFilters.manufacturerUrl === "") {
            baseUrl = GetVehiclesSearchUrl(leasingDealType, '');
        }
        else if (vehicleFilters.modelUrl === "") {
            baseUrl = GetVehicleManufacturerUrl(isAtc, null, leasingDealType, vehicleFilters.manufacturerUrl);
        }
        else {
            baseUrl = GetShortModelUrl(isAtc, null, leasingDealType, vehicleFilters.manufacturerUrl, vehicleFilters.modelUrl, null);
        }
    }

    return getUrl(baseUrl, GetQueryParamsFromFilter(vehicleFilters));
}

const GetQueryParamsFromFilter = (vehicleFilters: any) => {
    let queryParams = [];

    if (vehicleFilters) {
        if (vehicleFilters.shortDerTextUrl && vehicleFilters.shortDerTextUrl.id !== "") {
            queryParams.push("trimlevel=" + vehicleFilters.shortDerTextUrl.id);
        }
        if (vehicleFilters.mileage && vehicleFilters.mileage.id) {
            queryParams.push("mileage=" + vehicleFilters.mileage.id);
        }
        if (vehicleFilters.initialRental && vehicleFilters.initialRental.id) {
            queryParams.push("rentals=" + vehicleFilters.initialRental.id);
        }
        if (vehicleFilters.term && vehicleFilters.term.id) {
            queryParams.push("term=" + vehicleFilters.term.id);
        }
        if (vehicleFilters.priceFrom && vehicleFilters.priceFrom.id) {
            queryParams.push("pricefrom=" + vehicleFilters.priceFrom.id);
        }
        if (vehicleFilters.priceTo && vehicleFilters.priceTo.id) {
            queryParams.push("priceto=" + vehicleFilters.priceTo.id);
        }
        if (vehicleFilters.fuelType && vehicleFilters.fuelType.id) {
            queryParams.push("fuel=" + vehicleFilters.fuelType.id);
        }
        if (vehicleFilters.transmission && vehicleFilters.transmission.id) {
            queryParams.push("gear=" + vehicleFilters.transmission.id);
        }
        if (vehicleFilters.engineSize && vehicleFilters.engineSize.id !== "") {
            queryParams.push("engine=" + vehicleFilters.engineSize.id);
        }
        if (vehicleFilters.driveTrain && vehicleFilters.driveTrain.id !== "") {
            queryParams.push("drivetrain=" + vehicleFilters.driveTrain.id);
        }
        if (vehicleFilters.doors && vehicleFilters.doors.id) {
            queryParams.push("doors=" + vehicleFilters.doors.id);
        }
        if (vehicleFilters.seats && vehicleFilters.seats.id) {
            queryParams.push("seats=" + vehicleFilters.seats.id);
        }
        if (vehicleFilters.co2 && vehicleFilters.co2.id) {
            queryParams.push("co2=" + vehicleFilters.co2.id);
        }
        if (vehicleFilters.mpg && vehicleFilters.mpg.id) {
            queryParams.push("mpg=" + vehicleFilters.mpg.id);
        }
        if (vehicleFilters.vehicleStyle && vehicleFilters.vehicleStyle.id) {
            queryParams.push("vehiclestyle=" + vehicleFilters.vehicleStyle.id);
        }
        if (vehicleFilters.vehicleSize && vehicleFilters.vehicleSize.id) {
            queryParams.push("vehiclesize=" + vehicleFilters.vehicleSize.id);
        }
        if (vehicleFilters.isInStock) {
            queryParams.push("isinstock=true");
        }
        if (vehicleFilters.isSpecial) {
            queryParams.push("isspecial=true");
        }
    }

    return queryParams;
}

export const GetFullUrlPath = () => {
    return window.location.pathname + window.location.search;
}