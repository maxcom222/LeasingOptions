import { VehicleTypes } from "enums/VehicleTypes";
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { PricingTypes } from "enums/PricingTypes";
import { VehiclesFilter } from "types/VehiclesFilter";
import { formatAtcPostcode, isNullOrEmpty } from "./helpers";
import { SiteSettings } from "../environment/siteSettings";

export const GetPricingTypeFromUrl = (url: string): PricingTypes => {
    if (url.includes("car-leasing-with-insurance")) {
        return PricingTypes.Atc;
    } else {
        return PricingTypes.Standard;
    }
}

export const getVehiclesFilter = (context): VehiclesFilter => {
    const url = context.req.url.replace("/internal", "");

    let vehicleFilter: VehiclesFilter = {
        pricingType: context.query.pricingType ? context.query.pricingType : GetPricingTypeFromUrl(url),

        //---------------------------------
        vehicleType: VehicleTypes.None,
        leasingDealType: LeasingDealTypes.None,
        //-------------------------------------
        postcode: context.query.postcode ? formatAtcPostcode(context.query.postcode) as string : null, // NOT SURE,
        manufacturerUrl: context.query.make ? context.query.make as string : null,
        shortModTextUrl: context.query.shortModel ? context.query.shortModel as string : null,
        modelUrl: context.query.model ? context.query.model as string : null,
        maintenance: context.query.maintenance ? context.query.maintenance == "true" : process.env.NEXT_PUBLIC_DEFAULT_MAINTENANCE == "true",
        isSpecial: context.query.isspecial ? (context.query.isspecial == "true") : null,
        isInStock: context.query.isinstock ? (context.query.isinstock == "true") : null,
        priceFrom: context.query.pricefrom ? parseInt(context.query.pricefrom as string) : 0,
        priceTo: context.query.priceto ? parseInt(context.query.priceto as string) : null
    };

    if (url.startsWith("/car-leasing") || url.startsWith("/short-term-car-leasing")) {
        vehicleFilter.vehicleType = VehicleTypes.Car;
        vehicleFilter.leasingDealType = (!isNullOrEmpty(context.query.leasingdeal as string) && context.query.leasingdeal as string === "business") ? LeasingDealTypes.Business : LeasingDealTypes.Personal;
    }
    else if (url.startsWith("/business-car-leasing")) {
        vehicleFilter.vehicleType = VehicleTypes.Car;
        vehicleFilter.leasingDealType = LeasingDealTypes.Business;
    }
    else if (url.startsWith("/van-leasing") || url.startsWith("/short-term-van-leasing")) {
        vehicleFilter.vehicleType = VehicleTypes.Commercial;
        vehicleFilter.leasingDealType = LeasingDealTypes.Van;
    }

    let parsedInt = NaN;

    parsedInt = parseInt(context.query.term);
    vehicleFilter.term = !isNaN(parsedInt) ? parsedInt : null;

    parsedInt = parseInt(context.query.rentals);
    vehicleFilter.initialRentals = !isNaN(parsedInt) ? parsedInt : null;

    parsedInt = parseInt(context.query.mileage);
    vehicleFilter.mileage = !isNaN(parsedInt) ? parsedInt : null;

    //if (queryString["maintenance"] === "true" || queryString["maintenance"] === "false") {
    //    filter.maintenance = queryString["maintenance"] === "true";
    //}

    //if (routeData["isspecialoffer"]) {
    //    filter.isSpecial = routeData["isspecialoffer"];
    //}
    //else if (!LO.isNullOrEmpty(queryString["isspecial"]) && (queryString["isspecial"] === "true" || queryString["isspecial"] === "false")) {
    //    filter.isSpecial = queryString["isspecial"] === "true";
    //}
    //else {
    //    filter.isSpecial = null;
    //}

    //if (routeData["option"] && routeData["option"] === "instock") {
    //    filter.isInStock = routeData["optionvalue"];
    //}
    //else if (!LO.isNullOrEmpty(queryString["isinstock"]) && (queryString["isinstock"] === "true" || queryString["isinstock"] === "false")) {
    //    filter.isInStock = queryString["isinstock"] === "true";
    //}
    //else {
    //    filter.isInStock = null;
    //}

    //tempValue = routeData["option"] && routeData["option"] === "budgetover" ? routeData["optionvalue"] : queryString["pricefrom"];
    //parsedInt = parseInt(tempValue);
    //filter.priceFrom = (!isNaN(parsedInt) && parsedInt > 0) ? parsedInt : null;

    //tempValue = routeData["option"] && routeData["option"] === "budgetto" ? routeData["optionvalue"] : queryString["priceto"];
    //parsedInt = parseInt(tempValue);
    //filter.priceTo = (!isNaN(parsedInt) && parsedInt > 0) ? parsedInt : null;

    parsedInt = parseInt(context.query.fuel);
    vehicleFilter.fuelType = !isNaN(parsedInt) ? parsedInt : null;

    parsedInt = parseInt(context.query.gear);
    vehicleFilter.transmission = !isNaN(parsedInt) ? parsedInt : null;

    vehicleFilter.engineSize = !isNullOrEmpty(context.query.engine as string) ? context.query.engine as string : null;
    vehicleFilter.shortDerTextUrl = !isNullOrEmpty(context.query.trimlevel as string) ? context.query.trimlevel as string : null;

    if (vehicleFilter.leasingDealType === LeasingDealTypes.Van) {
        vehicleFilter.seats = null;
        vehicleFilter.mpg = null;
        vehicleFilter.co2 = null;
        vehicleFilter.driveTrain = null;
        vehicleFilter.doors = null;
    }
    else {
        vehicleFilter.driveTrain = !isNullOrEmpty(context.query.drivetrain as string) ? (context.query.drivetrain as string).toUpperCase() : null;

        parsedInt = parseInt(context.query.doors);
        vehicleFilter.doors = !isNaN(parsedInt) ? parsedInt : null;

        parsedInt = parseInt(context.query.seats);
        vehicleFilter.seats = !isNaN(parsedInt) ? parsedInt : null;

        parsedInt = parseInt(context.query.mpg);
        vehicleFilter.mpg = !isNaN(parsedInt) ? parsedInt : null;

        parsedInt = parseInt(context.query.co2);
        vehicleFilter.co2 = !isNaN(parsedInt) ? parsedInt : null;
    }

    //filter.vehicleStyle = null;
    //if (routeData["option"] && routeData["option"] === "category") {
    //    var categoryId = null;

    //    if (!LO.isNullOrEmpty(routeData["optionvalue"])) {
    //        var vehicleStyles = [
    //            { name: "coupe", value: 1, type: 1 },
    //            { name: "convertible-cabriolet", value: 3, type: 1 },
    //            { name: "hatchback", value: 4, type: 1 },
    //            { name: "saloon", value: 5, type: 1 },
    //            { name: "estate", value: 6, type: 1 },
    //            { name: "suv-crossover", value: 7, type: 1 },
    //            { name: "mpv", value: 10, type: 1 },
    //            { name: "sports-car", value: 11, type: 1 },
    //            { name: "small", value: 14, type: 2 },
    //            { name: "medium", value: 15, type: 2 },
    //            { name: "large", value: 16, type: 2 },
    //            { name: "pickup", value: 17, type: 2 },
    //            { name: "crew", value: 18, type: 2 },
    //            { name: "dropside", value: 19, type: 2 },
    //            { name: "luton", value: 20, type: 2 }
    //        ];

    //        var vehicleStyle = _.find(vehicleStyles, function (item) { return item.name === routeData["optionvalue"]; });

    //        if (vehicleStyle) {
    //            categoryId = vehicleStyle.value;
    //        }
    //    }

    //    filter.vehicleStyle = categoryId;
    //}
    //else {
    parsedInt = parseInt(context.query.vehiclestyle);
    vehicleFilter.vehicleStyle = !isNaN(parsedInt) ? parsedInt : null;
    //}

    parsedInt = parseInt(context.query.vehiclesize);
    vehicleFilter.vehicleSize = !isNaN(parsedInt) ? parsedInt : null;

    vehicleFilter.mileage = vehicleFilter.mileage || SiteSettings.GetDealTypeDefaultMileage(vehicleFilter.leasingDealType);
    vehicleFilter.maintenance = vehicleFilter.maintenance || false;

    if (!vehicleFilter.initialRentals /*|| ![1, 3, 6, 9, 12].includes(vehicleFilter.initialRentals)*/) {
        vehicleFilter.initialRentals = SiteSettings.DefaultInitialRentals;
    }

    return vehicleFilter;
}