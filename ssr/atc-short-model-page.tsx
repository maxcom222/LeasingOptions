import { VehicleTypes } from 'enums/VehicleTypes';
import { CustomContentTypes } from 'enums/CustomContentTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl, getFriendlyUrlSegment } from 'helpers/urlsHelper';
import { ModelPageMetaTitle, ModelPageMetaDescription } from 'helpers/seoHelper';
import { isNullOrWhiteSpace, capitalize } from 'helpers/stringHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetCanonicalUrl } from "helpers/urlHelper";
import { GetProperManufacturerName, GetFriendlyName } from 'helpers/helpers';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { dispatchUpdateDealToggle, dispatchUpdateUserPostcode, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { ContentService } from 'business-logic/contentService';
import { GetModels, GetVehicleAlternativeModels, GetRecommendedForModel, GetVehiclePreviews, GetCapId, GetVehicleImage, GetModelGalleryImages, GetModelReview } from 'business-logic/vehicleService';

export const getProps = async (context) => {
    dispatchUpdateDealToggle(context);
    dispatchUpdateUserPostcode(context);

    const vehicleType = VehicleTypes.Car;
    const leasingDealType = context.store.getState().dealSelector;//TODO: ensure always is Personal - not critical
    const makeUrl = context.query.make as string;
    const shortModelUrl = context.query.shortModel as string;
    const userPostcode = context.store.getState().userPostcode;

    //TODO: should allow just existing makes - critical
    if (isNullOrWhiteSpace(makeUrl)) {
        context.res.writeHead(302, {
            Location: '/car-leasing-with-insurance'
        });
        context.res.end();
        return;
    }

    const fetchHeaders = getLOSSRFetchHeaders(context);
    const models = (await GetModels(vehicleType, makeUrl, fetchHeaders)).data;

    if (!models) {
        context.res.writeHead(302, {
            Location: '/car-leasing-with-insurance'
        });
        context.res.end();
        return;
    }

    const shortModel = models.find(x => x.id == shortModelUrl);

    if (!shortModel) {
        context.res.writeHead(302, {
            Location: '/car-leasing-with-insurance/' + getFriendlyUrlSegment(userPostcode) + '/' + makeUrl
        });
        context.res.end();
        return;
    }

    const vehiclesFilter = getVehiclesFilter(context);
    vehiclesFilter.vehicleType = vehicleType;
    vehiclesFilter.leasingDealType = leasingDealType;
    vehiclesFilter.maintenance = true;
    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);

    const pricingType = vehiclesFilter.pricingType;//Shouldn't it be set above?

    const alternativeModels = (await GetVehicleAlternativeModels(vehicleType, makeUrl, shortModel.id, fetchHeaders)).data;
    //Why do we need them on server-side?
    const topRecommended = (await GetRecommendedForModel(pricingType, userPostcode, vehicleType, leasingDealType, makeUrl, shortModel.id, fetchHeaders)).data;
    const vehiclePreviews = (await GetVehiclePreviews(vehiclesFilter, { pageIndex: 1, pageSize: 12 }, undefined, fetchHeaders)).data;

    let modelImage: string = null;
    let modelGallery: string[] = null;
    let modelReview = null;

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
        modelReview = (await GetModelReview(vehicleType, makeUrl, shortModel.id, null, fetchHeaders)).data;
    } catch (e) {
    }

    //Is vehicle type param required?
    const pageContent = (await ContentService.GetModelPageContent(CustomContentTypes.ModelAttachments, LeasingDealTypes.Personal, makeUrl, shortModel.text)).data;

    const makeName = capitalize(GetProperManufacturerName(GetFriendlyName(makeUrl)).toUpperCase());//TODO: get original make name instead of GetFriendlyName
    const modelName = capitalize(shortModel.text.toUpperCase());

    const title = `${makeName} ${modelName} Car Lease`;
    const description = pageContent?.text || null;
    //Description = customContent != null && !string.IsNullOrEmpty(customContent.Text) ? customContent.Text.Replace("#manufacturer#", makeName).Replace("<br/>", "").Replace("<br>", "") : null - implement?

    //----MetaData----
    const metaData: MetaData = {
        title: capitalize(pageContent?.metaPageTitle) || null,
        description: pageContent?.metaDescription || null,
        keywords: pageContent?.metaKeywords || null,
        canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
        noIndex: true
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

    return {
        props: {
            pricingType: vehiclesFilter.pricingType,
            userPostcode: userPostcode,
            title: title,
            description: description,
            metaData: metaData,

            modelReview: modelReview,

            modelImage: modelImage,
            modelGallery: modelGallery,

            topRecommended: topRecommended,
            vehiclePreviews: vehiclePreviews,
            alternativeModels: alternativeModels,

            //if we pass whole filter why do we need separate properties
            vehicleType: vehicleType,
            make: vehiclesFilter.manufacturerUrl,
            model: vehiclesFilter.shortModTextUrl,
            vehicleFilter: vehiclesFilter
        }
    };
}