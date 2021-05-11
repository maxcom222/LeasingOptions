import { dispatchUpdateDealToggle } from 'redux/dispatches/dispatchs';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { Vehicle } from 'types/vehicles/Vehicle';
import { VehiclePageTitle, VehicleMetaDescription } from "helpers/seoHelper";
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetVehicleInfo } from 'business-logic/vehicleService';

export const getProps = async (context) => {
    let vehicleType = VehicleTypes.None;
    let leasingDealType = LeasingDealTypes.None;

    let isInternal = false;
    let url = context.req.url;

    if (url.startsWith("/internal/")) {
        isInternal = true;
        url = url.replace("/internal", "");
    }

    if (url.startsWith("/car-leasing/")) {
        dispatchUpdateDealToggle(context);

        vehicleType = VehicleTypes.Car;
        leasingDealType = context.store.getState().dealSelector;
    }
    else if (url.startsWith("/van-leasing/")) {
        vehicleType = VehicleTypes.Commercial;
        leasingDealType = LeasingDealTypes.Van;
    }

    if (vehicleType === VehicleTypes.None || leasingDealType === LeasingDealTypes.None) {
        //Do we have custom page to show?
        context.res.writeHead(404);
        context.res.end();
        return;
    }

    const vehicleRef = context.query.vehicleRef as string;
    const vehicle = (await GetVehicleInfo(vehicleRef, null, null, true, true, getLOSSRFetchHeaders(context))).data;

    if (vehicle === null || vehicle.vehicleType !== vehicleType ||
        vehicle.manufacturerUrl.toLowerCase() !== (context.query.make as string).toLowerCase() ||
        vehicle.shortModTextUrl.toLowerCase() !== (context.query.shortModel as string).toLowerCase() ||
        vehicle.modelUrl.toLowerCase() !== (context.query.model as string).toLowerCase() ||
        vehicle.derivativeUrl.toLowerCase() !== (context.query.derivative as string).toLowerCase()) {
        context.res.writeHead(302, {
            //TODO: avoid chain redirect
            Location: (vehicleType === VehicleTypes.Commercial ? '/van-leasing/' : '/car-leasing/') + (context.query.make as string).toLowerCase()
        });
        context.res.end();
        return;
    }

    //TODO: implement
    //    if (CurrentAppContext.IsInternalIP) {
    //        using(var client = new BibleClient())
    //            {
    //                var response = client.GetColoursForCapId(vehicle.CapId);
    //        if (response != null) {
    //            var biblecolours2 = new List<BibleColours2>();
    //            foreach(var item in response)
    //            {
    //                biblecolours2.Add(new BibleColours2()
    //                            {
    //                        colour = item.colour,
    //                        count = item.count
    //                    });
    //            }

    //            vehicle.InternalDetails.BibleColours = biblecolours2;
    //        }
    //    }
    //}

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
        canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
    };

    return {
        props: {
            vehicle: vehicleModel,
            metaData: metaData,
            orderModalOpenned: (context.query.showordermodal as string) === "1"
        }
    };
}