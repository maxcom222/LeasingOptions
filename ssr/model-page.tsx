import { VehicleTypes } from 'enums/VehicleTypes';
import { CustomContentTypes } from 'enums/CustomContentTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { VehicleModelSchema } from 'types/schema/VehicleModelSchema';
import { getBaseUrl } from 'helpers/urlsHelper';
import { ModelPageMetaTitle, ModelPageMetaDescription } from 'helpers/seoHelper';
import { GetAggregateOffer } from 'helpers/schemaHelper';
import { isNullOrWhiteSpace, capitalize } from 'helpers/stringHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetCanonicalUrl, GetShortModelUrl } from "helpers/urlHelper";
import { GetProperManufacturerName, GetFriendlyName } from 'helpers/helpers';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { ContentService } from 'business-logic/contentService';
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { GetModels, GetManufacturersModelsGarage, GetCapId, GetVehicleImage, GetModelGalleryImages, GetModelReview, GetVehicleModelDealsSummary, GetVehicleAlternativeModels, GetRecommendedForModel } from 'business-logic/vehicleService';

export const getProps = async (context) => {
    const vehiclesFilter = getVehiclesFilter(context);

    const vehicleType = vehiclesFilter.vehicleType;
    const leasingDealType = vehiclesFilter.leasingDealType;

    if (vehicleType === VehicleTypes.None || leasingDealType === LeasingDealTypes.None) {
        //Do we have custom page to show?
        context.res.writeHead(404);
        context.res.end();
        return;
    }

    const makeUrl = context.query.make as string;
    const shortModelUrl = context.query.shortModel as string;
    const modelUrl = context.query.model as string;

    //TODO: should allow just existing makes - critical
    if (isNullOrWhiteSpace(makeUrl)) {
        context.res.writeHead(302, {
            Location: vehicleType === VehicleTypes.Commercial ? '/van-leasing' : '/car-leasing'
        });
        context.res.end();
        return;
    }

    const fetchHeaders = getLOSSRFetchHeaders(context);
    const shortModels = (await GetModels(vehicleType, makeUrl, fetchHeaders)).data;

    if (!shortModels) {
        context.res.writeHead(302, {
            Location: vehicleType === VehicleTypes.Commercial ? '/van-leasing' : '/car-leasing'
        });
        context.res.end();
        return;
    }

    const shortModel = shortModels.find(x => x.id == shortModelUrl);

    if (!shortModel) {
        context.res.writeHead(302, {
            Location: (vehicleType === VehicleTypes.Commercial ? '/van-leasing/' : '/car-leasing/') + makeUrl
        });
        context.res.end();
        return;
    }

    let model = null;

    if (!isNullOrWhiteSpace(modelUrl)) {
        const models = (await GetManufacturersModelsGarage(vehicleType, makeUrl, fetchHeaders)).data || [];
        model = models.find(x => x.id == modelUrl);

        if (!model) {
            context.res.writeHead(302, {
                Location: (vehicleType === VehicleTypes.Commercial ? '/van-leasing/' : '/car-leasing/') + makeUrl + '/' + shortModelUrl
            });
            context.res.end();
            return;
        }
    }

    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    if (vehicleType === VehicleTypes.Car) {
        //TODO: set from filter?
        dispatchUpdateDealToggle(context);
    }

    const alternativeModels = (await GetVehicleAlternativeModels(vehicleType, makeUrl, shortModel.id, fetchHeaders)).data;
    //Why do we need them on server-side?
    const topRecommended = (await GetRecommendedForModel(null, null, vehicleType, leasingDealType, makeUrl, shortModel.id, fetchHeaders)).data;

    let modelImage: string = null;
    let modelGallery: string[] = null;
    let modelReview = null;
    let vehicleModelSchema: VehicleModelSchema = null;

    const capId: number = (await GetCapId(makeUrl, shortModel.id, fetchHeaders)).data;

    if (capId) {
        modelImage = (await GetVehicleImage(vehicleType, capId, fetchHeaders)).data;
        modelGallery = (await GetModelGalleryImages(vehicleType, capId, 750, 500, fetchHeaders)).data;

        if (isNullOrWhiteSpace(modelImage) && modelGallery && modelGallery.length > 0) {
            modelImage = modelGallery[0];
        }
    }

    try {
        //TODO: BoVehicleReview casting is missing. Needs to be checked and implemented.
        modelReview = (await GetModelReview(vehicleType, makeUrl, shortModel.id, model ? model.id : null, fetchHeaders)).data;
    } catch (e) {
    }

    //Is vehicle type param required?
    let pageContent = (await ContentService.GetModelPageContent(CustomContentTypes.ModelAttachments, vehicleType === VehicleTypes.Commercial ? LeasingDealTypes.Van : LeasingDealTypes.Personal, makeUrl, shortModel.text)).data;

    const makeName = capitalize(GetProperManufacturerName(GetFriendlyName(makeUrl)).toUpperCase());//TODO: get original make name instead of GetFriendlyName
    const modelName = capitalize((model ? model.text : shortModel.text).toUpperCase());

    let title = `${makeName} ${modelName} ${(vehicleType === VehicleTypes.Commercial ? 'Van' : 'Car')} Lease`;
    const description = pageContent?.text || null;
    //Description = customContent != null && !string.IsNullOrEmpty(customContent.Text) ? customContent.Text.Replace("#manufacturer#", makeName).Replace("<br/>", "").Replace("<br>", "") : null - implement?


    /// hack the business wanted 
    if (makeName?.toLocaleLowerCase() == "bmw" && modelName?.toLocaleLowerCase() == "m8") {
        title = "BMW M8 Competition Car Lease";
    };

    //----MetaData----
    const url = context.req.url.replace("/internal", "");
    const metaData: MetaData = model ?
        {
            title: null,
            description: null,
            keywords: null,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(url))?.toLowerCase(),
            noIndex: true,
            imageUrl: modelImage,
        } :
        {
            title: capitalize(pageContent?.metaPageTitle) || null,
            description: pageContent?.metaDescription || null,
            keywords: pageContent?.metaKeywords || null,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(url)),
            imageUrl: modelImage,
        };

    if (isNullOrWhiteSpace(metaData.title)) {
        metaData.title = ModelPageMetaTitle(leasingDealType, makeName, modelName);
    }

    if (isNullOrWhiteSpace(metaData.description)) {
        metaData.description = ModelPageMetaDescription(leasingDealType, makeName, modelName);
    }

    if (!isNullOrWhiteSpace(metaData.description)) {
        metaData.description = metaData.description.replace(/[\r\n]+/g, " ").trim();
    }
    //----//MetaData----

    try {
        //For ShortModel page only
        if (!model) {
            var modelSummary = (await GetVehicleModelDealsSummary(makeUrl, shortModel.id, fetchHeaders)).data;

            if (modelSummary) {
                //Can we buid it from other data in MetaHead?
                vehicleModelSchema = Object.assign({ '@type': 'Car' }, {
                    brand: makeName,
                    model: modelName,
                    name: `${makeName} ${modelName}`,
                    description: metaData.description,
                    url: GetCanonicalUrl(GetShortModelUrl(false, null, leasingDealType, makeUrl, shortModel.id, null)),
                    image: modelImage,
                    vehicleSpecialUsage: "Leasing",
                    offers: GetAggregateOffer(modelSummary.lowPrice, modelSummary.highPrice, modelSummary.count)
                });
            }
        }
    } catch (e) {
    }

    return {
        props: {
            title: title,
            description: description,
            metaData: metaData,
            vehicleModelSchema: vehicleModelSchema,

            modelReview: modelReview,
            modelImage: modelImage,
            modelGallery: modelGallery,

            topRecommended: topRecommended,
            alternativeModels: alternativeModels,

            //if we pass whole filter why do we need separate properties
            vehicleType: vehiclesFilter.vehicleType,
            make: vehiclesFilter.manufacturerUrl,
            model: vehiclesFilter.shortModTextUrl,
            vehicleFilter: vehiclesFilter
        }
    };
}