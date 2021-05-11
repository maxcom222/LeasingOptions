import { VehicleCategoryType } from "types/VehicleCategoryType";
import { VehicleTypes } from "enums/VehicleTypes";
import { PricingTypes } from 'enums/PricingTypes';
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleCustomOptionsRequest } from "types/VehicleCustomOptionsRequest";
import { VehiclesFilter } from "types/VehiclesFilter";
import { PaginationCriteria } from "types/PaginationCriteria";
import { SortingCriteria } from "types/SortingCriteria";
import CollectionsHelper from "../helpers/collectionsHelper";
import { getTopVehiclesAPI, GetModelsAPI, GetDealDataAPI, GetManufacturersModelsAPI, GetManufacturersModelsGarageAPI, GetModelGalleryImagesAPI, GetModelReviewAPI, GetModelsTrimsGarageAPI, GetPricingMatrixAPI, GetRecommendedForModelAPI, GetTopLoPickVehiclesAPI, GetTopScoredVehiclesAPI, GetTrimLevelsAPI, GetVehicleAlternativeModelsAPI, GetVehicleDenotationsAPI, GetVehicleGarageAPI, GetVehicleImageAPI, GetVehicleModelDealsSummaryAPI, GetVehicleModelPreviewsAPI, GetVehiclePreviewsAPI, GetAvailableMakesAPI, GetCapIdAPI, GetExtraOptionsAPI, GetSearchResultsAPI, GetSpecialDealContentAPI, GetSpecialDealPricingAPI, GetSpecialOffersGroupedAPI, GetSpecOptionsAPI, GetStickerListAPI, GetTechOptionsAPI, GetTopSpecialOffersAPI, GetVehicleCheapestPriceTermAPI, GetVehiclePricesDetailsAPI, GetAvailableShortModelsAPI, GetShortTermDealsAPI, GetVehiclesFilterOptionsAPI, GetC02ValuesAPI, GetContractValuesAPI, GetDriveTrainValuesAPI, GetEngineSizeValuesAPI, GetFuelTypesValuesAPI, GetMpgValuesAPI, GetPriceToValuesAPI, GetRentalValuesAPI, GetSeatValuesAPI, GetTransmissionValuesAPI, GetVehicleMileageValuesAPI, GetVehicleSizeValuesAPI, GetVehicleStyleValuesAPI, GetVehicleInfoAPI, GetMakesAPI } from "API/VehicleAPI";

export const GetStaticMakes = (vehicleType: VehicleTypes) =>{
    return CollectionsHelper.makes().filter(x => x.vehicleType.includes(vehicleType)).map((item) => ({ id: item.id, text: item.text }));
}

export const GetMakes = async (vehicleType: VehicleTypes, fetchHeaders?) =>{
    return GetMakesAPI(vehicleType, fetchHeaders);
}

export const GetTopVehicles = async (leasingDealType: LeasingDealTypes, take: number, fetchHeaders?) =>{
    return getTopVehiclesAPI(leasingDealType, take, fetchHeaders);
}

export const GetModels = async (vehicleType: VehicleTypes, manufacturerUrl, fetchHeaders?) =>{
    return GetModelsAPI(vehicleType, manufacturerUrl, fetchHeaders);
}

export const GetVehicleDenotations = async (manufacturerUrl: string, modelUrl: string = null, maintenance: boolean = null, fetchHeaders?) =>{
    return GetVehicleDenotationsAPI(manufacturerUrl, modelUrl, maintenance, fetchHeaders);
}

export const GetManufacturersModels = async (fetchHeaders?) =>{
    return GetManufacturersModelsAPI(fetchHeaders);
}

export const GetManufacturersModelsGarage = async (vehicleType: VehicleTypes, manufacturerUrl: string, fetchHeaders?) =>{
    return GetManufacturersModelsGarageAPI(vehicleType, manufacturerUrl, fetchHeaders);
}

export const GetModelsTrimsGarage = async (vehicleType: VehicleTypes, manufacturerUrl: string, shortModTextUrl: string, fetchHeaders?) =>{
    return GetModelsTrimsGarageAPI(vehicleType, manufacturerUrl, shortModTextUrl, fetchHeaders);
}

export const GetTrimLevels = async (vehicleType: VehicleTypes, manufacturerUrl: string, shortModTextUrl: string, fetchHeaders?) =>{
    return GetTrimLevelsAPI(vehicleType, manufacturerUrl, shortModTextUrl, fetchHeaders);
}

export const GetVehicleAlternativeModels = async (vehicleType: VehicleTypes, manufacturerUrl: string, shortModTextUrl: string, fetchHeaders?) =>{
    return GetVehicleAlternativeModelsAPI(vehicleType, manufacturerUrl, shortModTextUrl, fetchHeaders);
}

export const GetVehicleGarage = async (vehicleRef: number, leaseDealType: LeasingDealTypes, options?: any, fetchHeaders?) =>{
    return GetVehicleGarageAPI(vehicleRef, leaseDealType, options, fetchHeaders);
}

export const GetVehicleModelPreviews = async (vehiclesFilter: VehiclesFilter, paginationCriteria?: PaginationCriteria, sortingCriteria?: SortingCriteria, fetchHeaders?) =>{
    return GetVehicleModelPreviewsAPI(vehiclesFilter, paginationCriteria, sortingCriteria, fetchHeaders);
}

export const GetVehiclePreviews = async (vehiclesFilter: VehiclesFilter, paginationCriteria?: PaginationCriteria, sortingCriteria?: SortingCriteria, fetchHeaders?) =>{
    return GetVehiclePreviewsAPI(vehiclesFilter, paginationCriteria, sortingCriteria, fetchHeaders);
}

export const GetRecommendedForModel = async (pricingType: PricingTypes, postcode: string, vehicleType: VehicleTypes, leaseDealType: LeasingDealTypes, manufacturerUrl, modelUrl, fetchHeaders?) =>{
    return GetRecommendedForModelAPI(pricingType, postcode, vehicleType, leaseDealType, manufacturerUrl, modelUrl, fetchHeaders);
}

export const GetTopLoPickVehicles = async (vehicleType: VehicleTypes, manufacturerUrl: string, pricingType?: PricingTypes, postcode?: string, fetchHeaders?) =>{
    return GetTopLoPickVehiclesAPI(vehicleType, manufacturerUrl, pricingType, postcode, fetchHeaders);
}

export const GetTopScoredVehicles = async (pricingType: PricingTypes, vehicleType: VehicleTypes, postcode, fetchHeaders?) =>{
    return GetTopScoredVehiclesAPI(pricingType, vehicleType, postcode, fetchHeaders);
}

export const GetPricingMatrix = async (vehicleRef: number, pricingType?: PricingTypes, postcode?: string, fetchHeaders?) =>{
    return GetPricingMatrixAPI(vehicleRef, pricingType, postcode, fetchHeaders);
}

export const GetDealData = async (vehicleRef: number, term: number, mileage: number, initialRentalMonths: number, leasingDealType: number, maintenance: boolean, pricingType: PricingTypes, postcode: string, fetchHeaders?) =>{
    return GetDealDataAPI(vehicleRef, term, mileage, initialRentalMonths, leasingDealType, maintenance, pricingType, postcode, fetchHeaders);
}

export const GetModelReview = async (vehicleType: VehicleTypes, manufacturerUrl: string, shortModelUrl: string, modelUrl: string = null, fetchHeaders?) =>{
    return GetModelReviewAPI(vehicleType, manufacturerUrl, shortModelUrl, modelUrl, fetchHeaders);
}

export const GetModelGalleryImages = async (vehicleType: VehicleTypes, capId: number, width: number, height: number, fetchHeaders?) =>{
    return GetModelGalleryImagesAPI(vehicleType, capId, width, height, fetchHeaders);
}

export const GetVehicleModelDealsSummary = async (manufacturerUrl: string, modelUrl: string, fetchHeaders?) =>{
    return GetVehicleModelDealsSummaryAPI(manufacturerUrl, modelUrl, fetchHeaders);
}

export const GetVehicleImage = async (vehicleType: VehicleTypes, capId: number, fetchHeaders?) =>{
    return GetVehicleImageAPI(vehicleType, capId, fetchHeaders);
}

export const GetCapId = async (manufacturerUrl: string, modelUrl: string, fetchHeaders?) =>{
    return GetCapIdAPI(manufacturerUrl, modelUrl, fetchHeaders);
}

export const GetSearchResults = async (searchQuery: string, isInternal: boolean = false, fetchHeaders?) =>{
    return GetSearchResultsAPI(searchQuery, isInternal, fetchHeaders);
}

export const GetSpecialDealContent = async (id: string, fetchHeaders?) =>{
    return GetSpecialDealContentAPI(id, fetchHeaders);
}

export const GetSpecialDealPricing = async (id: string, fetchHeaders?) =>{
    return GetSpecialDealPricingAPI(id, fetchHeaders);
}

export const GetStickerList = async (fetchHeaders?) =>{
    return GetStickerListAPI(fetchHeaders);
}

export const GetBudgetTo = (): Array<number> => {
    return [150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000];
}

export const GetBudgetOver = (): Array<number> => {
    return [1000];
}

export const GetCategories = (): Array<VehicleCategoryType> => {

    // Potentially split into two consts by type
    const vehicleCategories: Array<VehicleCategoryType> = [
        { type: VehicleTypes.Car, name: "Coupe", id: 1 },
        { type: VehicleTypes.Car, name: "Convertible / Cabriolet", id: 3 },
        { type: VehicleTypes.Car, name: "Hatchback", id: 4 },
        { type: VehicleTypes.Car, name: "Saloon", id: 5 },
        { type: VehicleTypes.Car, name: "Estate", id: 6 },
        { type: VehicleTypes.Car, name: "SUV / Crossover", id: 7 },
        { type: VehicleTypes.Car, name: "MPV", id: 10 },
        { type: VehicleTypes.Car, name: "Sports Car", id: 11 },
        { type: VehicleTypes.Commercial, name: "Small", id: 14 },
        { type: VehicleTypes.Commercial, name: "Medium", id: 15 },
        { type: VehicleTypes.Commercial, name: "Large", id: 16 },
        { type: VehicleTypes.Commercial, name: "Pickup", id: 17 },
        { type: VehicleTypes.Commercial, name: "Crew", id: 18 },
        { type: VehicleTypes.Commercial, name: "Dropside", id: 19 },
        { type: VehicleTypes.Commercial, name: "Luton", id: 20 },
    ]

    return vehicleCategories;
}

export const GetCategoriesForType = (vehicleType: VehicleTypes): Array<VehicleCategoryType> => {

    if (vehicleType) {

        var applicableCategories: Array<VehicleCategoryType> = GetCategories().filter(function (category) {
            return category.type === vehicleType;
        });

        return applicableCategories;
    }

    return null;
}

export const GetTopSpecialOffers = async (vehicleType: VehicleTypes, fetchHeaders?) =>{
    return GetTopSpecialOffersAPI(vehicleType, fetchHeaders);
}

export const GetSpecialOffersGrouped = async (vehicleType: VehicleTypes, fetchHeaders?) =>{
    return GetSpecialOffersGroupedAPI(vehicleType, fetchHeaders);
}

export const GetVehicleInfo = async (vehicleRef: string, pricingType: PricingTypes = null, postcode: string = null, includeImages: boolean = false, includePriceRanges: boolean = false, fetchHeaders?) =>{
    return GetVehicleInfoAPI(vehicleRef, pricingType, postcode, includeImages, includePriceRanges, fetchHeaders);
}

export const GetSpecOptions = async (vehicleRef: number, capId: number, fetchHeaders?) =>{
    return GetSpecOptionsAPI(vehicleRef, capId, fetchHeaders);
}

export const GetVehiclePricesDetails = async (options: VehicleCustomOptionsRequest, fetchHeaders?) =>{
    return GetVehiclePricesDetailsAPI(options, fetchHeaders);
}

export const GetVehicleCheapestPriceTerm = async (vehicleRef: number, leasingDealType: LeasingDealTypes, maintenance: boolean, mileage: number, initialRentalMonths: number, pricingData, fetchHeaders?) =>{
    return GetVehicleCheapestPriceTermAPI(vehicleRef, leasingDealType, maintenance, mileage, initialRentalMonths, pricingData, fetchHeaders);
}

export const GetExtraOptions = async (vehicleRef: number, capId: number, fetchHeaders?) =>{
    return GetExtraOptionsAPI(vehicleRef, capId, fetchHeaders);
}

export const GetTechOptions = async (vehicleRef: number, capId: number, fetchHeaders?)=> {
    return GetTechOptionsAPI(vehicleRef, capId, fetchHeaders);
}

//TODO: put all params into single object
export const GetAvailableMakes = async (leaseDealType: LeasingDealTypes, vehicleType: VehicleTypes, term: string, initialRentals: string, mileage: string,
    fuelType: string, transmission: string, co2: string, mpg: string, doors: string, seats: string, driveTrain: string, vehicleSize: string, vehicleStyle: string,
    engineSize: string, priceFrom: string, priceTo: string, isInStock: boolean, isSpecial: boolean,
    pricingType: PricingTypes = null, postcode: string = null, fetchHeaders?)=> {
    return GetAvailableMakesAPI(pricingType, postcode, leaseDealType, vehicleType, term, initialRentals, mileage, fuelType, transmission, co2, mpg, doors, seats, driveTrain, vehicleSize, vehicleStyle, engineSize, priceFrom, priceTo, isInStock, isSpecial, fetchHeaders);
}

export const GetAvailableShortModels = async (vehiclesFilter: VehiclesFilter, fetchHeaders?) => {
    return GetAvailableShortModelsAPI(vehiclesFilter, fetchHeaders);
}

//TODO: put all params into single object
export const GetVehiclesFilterOptions = async (leaseDealType: LeasingDealTypes, vehicleType: VehicleTypes, manufacturerUrl: string, modelUrl: string, shortDerTextUrl: string,
    term: string, initialRentals: string, mileage: string, fuelType: string, transmission: string, co2: string, mpg: string, doors: string, seats: string, driveTrain: string,
    vehicleSize: string, vehicleStyle: string, engineSize: string, priceFrom: string, priceTo: string, isInStock: boolean, isSpecial: boolean,
    pricingType: PricingTypes = null, postcode: string = null, fetchHeaders?) =>{
    return GetVehiclesFilterOptionsAPI(leaseDealType, vehicleType, manufacturerUrl, modelUrl, shortDerTextUrl, term, initialRentals, mileage, fuelType, transmission, co2, mpg, doors, seats, driveTrain, vehicleSize, vehicleStyle, engineSize, priceFrom, priceTo, isInStock, isSpecial, pricingType, postcode, fetchHeaders);
}

export const GetShortTermDeals = async (vehicleType: VehicleTypes, leaseDealType: LeasingDealTypes, fetchHeaders?) =>{
    return GetShortTermDealsAPI(vehicleType, leaseDealType, fetchHeaders);
}

export const GetSeatValues = () =>{
    return GetSeatValuesAPI();
}

export const GetPriceToValues = () =>{
    return GetPriceToValuesAPI();
}

export const GetMpgValues = () =>{
    return GetMpgValuesAPI();
}

export const GetC02Values = () =>{
    return GetC02ValuesAPI();
}

export const GetDriveTrainValues = () =>{
    return GetDriveTrainValuesAPI();
}

export const GetEngineSizeValues = () =>{
    return GetEngineSizeValuesAPI();
}

export const GetTransmissionValues = () =>{
    return GetTransmissionValuesAPI();
}

export const GetFuelTypesValues = () =>{
    return GetFuelTypesValuesAPI();
}

export const GetVehicleSizeValues = () =>{
    return GetVehicleSizeValuesAPI();
}

export const GetVehicleStyleValues = () =>{
    return GetVehicleStyleValuesAPI();
}

export const GetVehicleMileageValues = () =>{
    return GetVehicleMileageValuesAPI();
}

export const GetContractValues = () =>{
    return GetContractValuesAPI();
}

export const GetRentalValues = () => {
    return GetRentalValuesAPI();
}