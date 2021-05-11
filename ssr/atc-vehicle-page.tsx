import { dispatchUpdateDealToggle, dispatchUpdateUserPostcode } from 'redux/dispatches/dispatchs';
import { PricingTypes } from 'enums/PricingTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { Vehicle } from 'types/vehicles/Vehicle';
import { VehiclePageTitle, VehicleMetaDescription } from "helpers/seoHelper";
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl, getFriendlyUrlSegment } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetVehicleInfo } from 'business-logic/vehicleService';

export const getProps = async (context) => {
    dispatchUpdateDealToggle(context);
    dispatchUpdateUserPostcode(context);

    const pricingType = PricingTypes.Atc;
    const userPostcode = context.store.getState().userPostcode;
    const leasingDealType = context.store.getState().dealSelector;
    const vehicleRef = context.query.vehicleRef as string;
    const isInternal = context.req.url.startsWith("/internal/");
    const vehicle = (await GetVehicleInfo(vehicleRef, pricingType, userPostcode, true, true, getLOSSRFetchHeaders(context))).data;

    if (leasingDealType == LeasingDealTypes.None || ![LeasingDealTypes.Business, LeasingDealTypes.Personal].includes(leasingDealType) ||
        vehicle === null || vehicle.vehicleType !== VehicleTypes.Car ||
        vehicle.manufacturerUrl.toLowerCase() !== (context.query.make as string).toLowerCase() ||
        vehicle.shortModTextUrl.toLowerCase() !== (context.query.shortModel as string).toLowerCase() ||
        vehicle.modelUrl.toLowerCase() !== (context.query.model as string).toLowerCase() ||
        vehicle.derivativeUrl.toLowerCase() !== (context.query.derivative as string).toLowerCase()) {
        context.res.writeHead(302, {
            Location: '/car-leasing-with-insurance/' + getFriendlyUrlSegment(userPostcode) + '/' + (context.query.make as string).toLowerCase()
        });
        context.res.end();
    }

    let vehicleModel: Vehicle = {
        vehicleRef: vehicle.vehicleRef,
        capId: vehicle.capId,
        vehicleType: vehicle.vehicleType,

        make: vehicle.manufacturer.trim(),
        shortModel: vehicle.shortModText.trim(),
        model: vehicle.model.trim(),
        derivative: vehicle.derivative.trim(),
        imageUrl: vehicle.imageUrl,
        imageUrls: vehicle.imageUrls,
        interiorUrl: vehicle.interiorUrl,
        exteriorUrl: vehicle.exteriorUrl,

        fuelType: vehicle.fuelType,
        mpg: vehicle.mpg,
        speed60mph: vehicle.speed60mph,
        insuranceGroup: vehicle.insuranceGroup,
        co2: vehicle.cO2,
        range: vehicle.range,
        seats: vehicle.seats,
        doors: vehicle.doors,
        transmission: vehicle.transmission,
        features: vehicle.features,
        stickers: vehicle.stickers,

        minPrice: vehicle.minPrice,
        maxPrice: vehicle.maxPrice,

        optionsSelectAllowed: vehicle.optionsIsSelectable,
        availableMileages: vehicle.availableMileages,
        hasMaintenance: vehicle.hasMaintenance
    };

    if (isInternal) {
        vehicleModel.extraDetails = vehicle.internalDetails;
    }

    let metaData: MetaData = {
        title: VehiclePageTitle(vehicleModel.vehicleType, vehicleModel.make, vehicleModel.model, vehicleModel.derivative),
        description: VehicleMetaDescription(vehicleModel.vehicleType, vehicleModel.make, vehicleModel.shortModel, vehicleModel.derivative),
        imageUrl: vehicleModel.imageUrls && vehicleModel.imageUrls.length > 0 ? vehicleModel.imageUrls[0] : null,
        canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
        noIndex: true
    };

    return {
        props: {
            pricingType: pricingType,
            userPostcode: userPostcode,
            vehicle: vehicleModel,
            metaData: metaData
        }
    };
}