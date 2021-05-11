import { VehicleTypes } from "enums/VehicleTypes";
import { PricingTypes } from 'enums/PricingTypes';
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleCustomOptionsRequest } from "types/VehicleCustomOptionsRequest";
import { SortingCriteria } from "types/SortingCriteria";
import { VehiclesFilter } from "types/VehiclesFilter";
import { PaginationCriteria } from "types/PaginationCriteria";
import { isNullOrWhiteSpace } from 'helpers/stringHelper';
import { getUrl } from 'helpers/urlsHelper';
import { getApiResponse } from "helpers/apiResponseHelper";
import CollectionsHelper from "helpers/collectionsHelper";
import { SiteSettings } from "environment/siteSettings";

const queryString = require('query-string');

// Work out a way to implement cleaner + error handling global approach
export const GetMakesAPI = async (vehicleType: VehicleTypes, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/manufacturers', fetchHeaders)
    return getApiResponse(res);
}

export const GetAllMakesAPI = async(fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/manufacturers', fetchHeaders)
    return getApiResponse(res);
}

export const GetVehiclePricesDetailsAPI = async(payload: VehicleCustomOptionsRequest, fetchHeaders?)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/getvehiclepricesdetails?' + queryString.stringify(payload), fetchHeaders);
    return getApiResponse(res);
}

export const GetVehicleCheapestPriceTermAPI = async(vehicleRef: number, leasingDealType: LeasingDealTypes, maintenance: boolean, mileage: number, initialRentalMonths: number, pricingData, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehicle/' + vehicleRef + "/" + leasingDealType + "/" + maintenance + "/" + mileage + "/" + initialRentalMonths + "/cheapestpriceterm?" + queryString.stringify(pricingData), fetchHeaders);
    return getApiResponse(res);
}

export const getTopVehiclesAPI = async(leaseDealType: LeasingDealTypes, take: number, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/gettopvehicles?leasingDealType=' + leaseDealType + '&take=' + take, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetModelsAPI = async(vehicleType: VehicleTypes, manufacturerUrl, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/' + manufacturerUrl + '/shortmodels', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetManufacturersModelsAPI = async(fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/manufacturers/models', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetManufacturersModelsGarageAPI = async(vehicleType: VehicleTypes, manufacturerUrl, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/' + manufacturerUrl + '/models', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetModelsTrimsGarageAPI = async(vehicleType: VehicleTypes, manufacturerUrl, shortModTextUrl, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/' + manufacturerUrl + '/' + shortModTextUrl + '/derivatives', fetchHeaders)
    return getApiResponse(res);
}

export const GetTrimLevelsAPI = async(vehicleType: VehicleTypes, manufacturerUrl, shortModTextUrl, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/' + manufacturerUrl + '/' + shortModTextUrl + '/trimlevels', fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetVehicleAlternativeModelsAPI = async(vehicleType: VehicleTypes, manufacturerUrl, shortModTextUrl, fetchHeaders?)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/' + manufacturerUrl + '/' + shortModTextUrl + '/alternativemodels?take=10', fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetVehicleGarageAPI = async(vehicleRef: number, leaseDealType: LeasingDealTypes, options?: any, fetchHeaders?)=> {
    let url = process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehicle/' + vehicleRef + '/' + leaseDealType + '/customized';

    if (options) {
        url += "?" + queryString.stringify(options, { skipNull: true })
    }

    const res = await fetch(url, fetchHeaders)
    return getApiResponse(res);
}

export const GetCapIdAPI = async (manufacturerUrl, modelUrl, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/getvehiclecapid?manufacturerUrl=' + manufacturerUrl + '&shortModelUrl=' + modelUrl + '&modelUrl=', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetVehicleModelPreviewsAPI = async (vehiclesFilter: VehiclesFilter, paginationCriteria?: PaginationCriteria, sortingCriteria?: SortingCriteria, fetchHeaders?) =>{

    let url = process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/getvehiclemodelpreviews?' + queryString.stringify(vehiclesFilter, { skipNull: true })

    if (paginationCriteria) {
        url += "&" + queryString.stringify(paginationCriteria, { skipNull: true })
    }

    if (sortingCriteria) {
        url += "&" + queryString.stringify(sortingCriteria, { skipNull: true })
    }

    const res = await fetch(url, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetVehiclePreviewsAPI = async(vehiclesFilter: VehiclesFilter, paginationCriteria?: PaginationCriteria, sortingCriteria?: SortingCriteria, fetchHeaders?) =>{

    let url = process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/getvehiclepreviews?' + queryString.stringify(vehiclesFilter, { skipNull: true }, fetchHeaders)

    if (paginationCriteria) {
        url += "&" + queryString.stringify(paginationCriteria, { skipNull: true })
    }

    if (sortingCriteria) {
        url += "&" + queryString.stringify(sortingCriteria, { skipNull: true })
    }

    const res = await fetch(url, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetRecommendedForModelAPI = async(pricingType: PricingTypes, postcode: string, vehicleType: VehicleTypes, leaseDealType: LeasingDealTypes, manufacturerUrl, modelUrl, fetchHeaders?) =>{
    let mileage = SiteSettings.GetVehicleTypeDefaultMileage(vehicleType);

    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/getrecommendedformodel?pricingType=' + pricingType + '&postcode=' + postcode + '&vehicleType=' + vehicleType + '&leasingDealType=' + leaseDealType + '&initialRentals=6&mileage=' + mileage + '&maintenance=false&manufacturerUrl=' + manufacturerUrl + '&shortModTextUrl=' + modelUrl, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetTopLoPickVehiclesAPI = async(vehicleType: VehicleTypes, manufacturerUrl, pricingType?: PricingTypes, postcode?: string, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/gettoplopickvehicles?pricingType=' + pricingType + '&postcode=' + postcode + '&vehicleType=' + vehicleType + '&manufacturer=' + manufacturerUrl, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetTopScoredVehiclesAPI = async(pricingType: PricingTypes, vehicleType: VehicleTypes, postcode, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/gettopscoredvehicles?pricingType=' + pricingType + '&vehicleType=' + vehicleType + '&postcode=' + postcode, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetVehicleDenotationsAPI = async(manufacturerUrl: string, modelUrl: string = null, maintenance: boolean = null, fetchHeaders?) =>{
    // implement generic approach for query params next
    var obj = {
        modelUrl: modelUrl,
        maintenance: maintenance,
    }

    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehicledenotations/' + manufacturerUrl + "?" + queryString.stringify(obj), fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetTopSpecialOffersAPI = async(vehicleType: VehicleTypes, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/gettopspecialoffers?vehicleType=' + vehicleType, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetSpecialOffersGroupedAPI = async(vehicleType: VehicleTypes, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/specialoffers/grouped/' + vehicleType, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetPricingMatrixAPI = async(vehicleRef, pricingType: PricingTypes, postcode: string, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehicle/' + vehicleRef + '/pricingmatrix?pricingType=' + pricingType + '&postcode=' + postcode, fetchHeaders)
    return getApiResponse(res);
}

export const GetDealDataAPI = async(vehicleRef, term, mileage, initialRentalMonths, dealType, maintenance: boolean, pricingType: PricingTypes, postcode: string, fetchHeaders?) =>{

    const url = process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + `api/vehicles/vehicle/${vehicleRef}/${dealType}/deal?term=${term}&mileage=${mileage}&initialRentalMonths=${initialRentalMonths}&maintenance=${maintenance}&pricingType=${pricingType}&postcode=${postcode}`;
    const res = await fetch(url, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetModelReviewAPI = async(vehicleType: VehicleTypes, manufacturerUrl: string, shortModelUrl: string, modelUrl: string = null, fetchHeaders?) =>{
    let url = process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehicle/' + vehicleType + '/' + manufacturerUrl + '/' + shortModelUrl + '/review';

    if (!isNullOrWhiteSpace(modelUrl)) {
        url += "?model=" + modelUrl;
    }

    const res = await fetch(url, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetModelGalleryImagesAPI = async(vehicleType: VehicleTypes, capId: number, width: number, height: number, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicleimages/info/' + vehicleType + '/' + capId + '/' + width + '/' + height + '/gallery', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetVehicleModelDealsSummaryAPI = async(manufacturerUrl: string, modelUrl: string, fetchHeaders?)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehicle/' + manufacturerUrl + '/' + modelUrl + '/dealssummary', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetVehicleImageAPI = async(vehicleType: VehicleTypes, capId: number, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicleimages/info/' + vehicleType + '/' + capId + '/image', fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetVehicleInfoAPI = async(vehicleRef: string, pricingType: PricingTypes = null, postcode: string = null, includeImages: boolean = false, includePriceRanges: boolean = false, fetchHeaders?) =>{
    let url = process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/vehiclebase/' + vehicleRef;

    if (includeImages || includePriceRanges) {
        let obj = {
            images: includeImages ? "true" : "false",
            priceRanges: includePriceRanges ? "true" : "false"
        }

        url += "?" + queryString.stringify(obj);
    }

    let queryParts: string[] = [];

    if (pricingType && (pricingType === PricingTypes.Atc || pricingType === PricingTypes.Standard)) {
        queryParts.push(`pricingtype=${pricingType}`);
    }

    if (!isNullOrWhiteSpace(postcode)) {
        queryParts.push(`postcode=${postcode}`);
    }

    url = getUrl(url, queryParts);

    const res = await fetch(url, fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetSpecOptionsAPI = async(vehicleType: number, capId: number, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/capvehicles/vehicle/' + vehicleType + '/' + capId + '/groupedspecifications', fetchHeaders);
    return getApiResponse(res);
}

export const GetExtraOptionsAPI = async(vehicleType: number, capId: number, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/capvehicles/vehicle/' + vehicleType + '/' + capId + '/groupedextraoptions', fetchHeaders);
    return getApiResponse(res);
}

export const GetTechOptionsAPI = async(vehicleType: number, capId: number, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/capvehicles/vehicle/' + vehicleType + '/' + capId + '/groupedtechdata', fetchHeaders);
    return getApiResponse(res);
}

export const GetAvailableMakesAPI = async(pricingType: PricingTypes, postCode: string, leaseDealType: LeasingDealTypes, vehicleType: VehicleTypes, term: string, initialRentals: string, mileage: string, fuelType: string, transmission: string, co2: string, mpg: string, doors: string, seats: string, driveTrain: string, vehicleSize: string, vehicleStyle: string, engineSize: string, priceFrom: string, priceTo: string, isInStock: boolean, isSpecial: boolean, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/availablemakes?pricingType=' + pricingType + '&postcode=' + postCode + '&leasingDealType=' + leaseDealType + '&vehicleType=' + vehicleType + '&term=' + term + '&initialRentals=' + initialRentals + '&mileage=' + mileage + '&fuelType=' + fuelType + '&transmission=' + transmission + '&co2=' + co2 + '&mpg=' + mpg + '&doors=' + doors + '&seats=' + seats + '&driveTrain=' + driveTrain + '&vehicleSize=' + vehicleSize + '&vehicleStyle=' + vehicleStyle + '&engineSize=' + engineSize + '&priceFrom=' + priceFrom + '&priceTo=' + priceTo + '&isInStock=' + isInStock + '&isSpecial=' + isSpecial, fetchHeaders)
    const data = await res.json()
    return data;
}

export const GetAvailableShortModelsAPI = async(vehiclesFilter: VehiclesFilter, fetchHeaders?)=> {
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/availableshortmodels?' + queryString.stringify(vehiclesFilter, {
        skipNull: true
    }, fetchHeaders))
    const data = await res.json()
    return data;
}

export const GetVehiclesFilterOptionsAPI = async(leaseDealType: LeasingDealTypes, vehicleType: VehicleTypes, manufacturerUrl: string, modelUrl: string, shortDerTextUrl: string, term: string, initialRentals: string, mileage: string, fuelType: string, transmission: string, co2: string, mpg: string, doors: string, seats: string, driveTrain: string, vehicleSize: string, vehicleStyle: string, engineSize: string, priceFrom: string, priceTo: string, isInStock: boolean, isSpecial: boolean, pricingType: PricingTypes, postCode: string, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehicles/getvehiclesfilteroptions?pricingType=' + pricingType + '&postcode=' + postCode + '&leasingDealType=' + leaseDealType + '&vehicleType=' + vehicleType + '&manufacturerUrl=' + manufacturerUrl + '&shortModTextUrl=' + modelUrl + '&shortDerTextUrl=' + shortDerTextUrl + '&term=' + term + '&initialRentals=' + initialRentals + '&mileage=' + mileage + '&fuelType=' + fuelType + '&transmission=' + transmission + '&co2=' + co2 + '&mpg=' + mpg + '&doors=' + doors + '&seats=' + seats + '&driveTrain=' + driveTrain + '&vehicleSize=' + vehicleSize + '&vehicleStyle=' + vehicleStyle + '&engineSize=' + engineSize + '&priceFrom=' + priceFrom + '&priceTo=' + priceTo + '&isInStock=' + isInStock + '&isSpecial=' + isSpecial, fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetShortTermDealsAPI = async(vehicleType: VehicleTypes, leaseDealType: LeasingDealTypes, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + '/api/shorttermdeals/list?filter[vehicleType]=' + vehicleType + '&filter[leasingDealType]=' + leaseDealType, fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetSearchResultsAPI = async(searchQuery: string, isInternal: boolean = false, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + `api/vehicles/search/${searchQuery}?isInternal=${isInternal}`, fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetSpecialDealContentAPI = async(id: string, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/specialdeals/get/' + id + '/content', fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetSpecialDealPricingAPI = async(id: string, fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/specialdeals/get/' + id + '/pricing', fetchHeaders);
    return getApiResponse(res);
}

export const GetStickerListAPI = async(fetchHeaders?) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/stickers/list', fetchHeaders);
    const data = await res.json()
    return data;
}

export const GetSeatValuesAPI= () => {
    return CollectionsHelper.seats();
}

export const GetPriceToValuesAPI= () =>{
    return CollectionsHelper.prices();
}

export const GetMpgValuesAPI= () =>{
    return CollectionsHelper.mpgs();
}

export const GetC02ValuesAPI= () =>{
    return CollectionsHelper.co2s();
}

export const GetDriveTrainValuesAPI = () =>{
    return CollectionsHelper.driveTrains();
}

export const GetEngineSizeValuesAPI = () =>{
    return CollectionsHelper.engineSizes();
}

export const GetTransmissionValuesAPI = () =>{
    return CollectionsHelper.transmissions();
}

export const GetFuelTypesValuesAPI = () =>{
    return CollectionsHelper.fuelTypes();
}

export const GetVehicleSizeValuesAPI = () =>{
    return CollectionsHelper.vehicleSizes();
}

export const GetVehicleStyleValuesAPI = () =>{
    return CollectionsHelper.vehicleStyles();
}

export const GetVehicleMileageValuesAPI = () =>{
    return CollectionsHelper.mileages();
}

export const GetContractValuesAPI= () =>{
    return CollectionsHelper.terms();
}

export const GetRentalValuesAPI = () => {
    return CollectionsHelper.rentalMonths();
}