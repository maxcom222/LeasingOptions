import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleCategoryTypes } from "enums/VehicleCategoryTypes";
import { FuelTypes } from "enums/FuelTypes";
import { NewsTypes } from "enums/NewsTypes";
import { VehicleFeatureTypes } from "enums/VehicleFeatureTypes";
import { TransmissionTypes } from "enums/TransmissionTypes";

export const GetLeasingDealText = (leasingDealType: LeasingDealTypes): string => {
    switch (leasingDealType) {
        case LeasingDealTypes.Personal:
            return "Personal"
        case LeasingDealTypes.Business:
            return "Business"
        case LeasingDealTypes.Van:
            return "Van"
        default:
            return;
    }
}

export const GetFuelTypeText = (fuelType: FuelTypes): string => {
    switch (fuelType) {
        case FuelTypes.Petrol:
            return "Petrol";
        case FuelTypes.Diesel:
            return "Diesel";
        case FuelTypes.Electric:
            return "Electric";
        case FuelTypes.Hybrid:
            return "Hybrid";
        default:
            return "N/A";
    }
}

export const GetFeatureText = (feature: VehicleFeatureTypes): string => {
    switch (feature) {
        case VehicleFeatureTypes.Bluetooth:
            return "Bluetooth";
        case VehicleFeatureTypes.ClimateControl:
            return "Climate Control";
        case VehicleFeatureTypes.ParkingSensors:
            return "Parking Sensors";
        case VehicleFeatureTypes.Alloys:
            return "Alloy Wheels";
        default:
            return;
    }
}

export const GetTransmissionText = (transmission: TransmissionTypes): string => {
    switch (transmission) {
        case TransmissionTypes.Manual:
            return "Manual";
        case TransmissionTypes.Auto:
            return "Auto";
        default:
            return;
    }
}

export const GetNewsTypeText = (newsType: number): string => {
    switch (newsType) {
        case 1:
            return "Latest News";
        case 2:
            return "Vehicle Reviews";
        case 3:
            return "Blog";
        case 4:
            return "LO 30th Birthday";
        default:
            return;
    }
}

export const GetVehicleCategory = (urlValue: string): VehicleCategoryTypes => {
    switch (urlValue) {
        case "coupe":
            return VehicleCategoryTypes.Coupe;
        case "convertible-cabriolet":
            return VehicleCategoryTypes.Convertible;
        case "hatchback":
            return VehicleCategoryTypes.Hatchback;
        case "saloon":
            return VehicleCategoryTypes.Saloon;
        case "estate":
            return VehicleCategoryTypes.Estate;
        case "suv-crossover":
            return VehicleCategoryTypes.SUV;
        case "mpv":
            return VehicleCategoryTypes.MPV;
        case "sports-car":
            return VehicleCategoryTypes.SportsCar;
        case "small":
            return VehicleCategoryTypes.SmallVan;
        case "medium":
            return VehicleCategoryTypes.MediumVan;
        case "large":
            return VehicleCategoryTypes.LargeVan;
        case "pickup":
            return VehicleCategoryTypes.Pickup;
        case "crew":
            return VehicleCategoryTypes.Crew;
        case "dropside":
            return VehicleCategoryTypes.Dropside;
        case "luton":
            return VehicleCategoryTypes.Luton;
        default:
            return VehicleCategoryTypes.None;
    }
}

export const GetNewsType = (urlValue: string): NewsTypes => {
    switch (urlValue) {
        case "latest-news":
            return NewsTypes.LatestNews;
        case "vehicle-reviews":
            return NewsTypes.VehicleReviews;
        case "blog":
            return NewsTypes.Blog;
        default:
            return NewsTypes.None;
    }
}