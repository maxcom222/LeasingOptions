import { VehicleTypes } from 'enums/VehicleTypes';
import { CustomContentTypes } from 'enums/CustomContentTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { PaginationCriteria } from 'types/PaginationCriteria';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetProperManufacturerName, GetFriendlyName } from 'helpers/helpers';
import { isNullOrWhiteSpace, capitalize } from 'helpers/stringHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { ModelPageMetaTitle, ModelPageMetaDescription } from 'helpers/seoHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { dispatchUpdateUserPostcode, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { ContentService } from 'business-logic/contentService';
import { GetModels, GetVehicleAlternativeModels, GetRecommendedForModel, GetVehiclePreviews, GetModelReview, GetCapId, GetVehicleImage, GetModelGalleryImages } from 'business-logic/vehicleService';

export const getProps = async (context) => {
    dispatchUpdateUserPostcode(context);
    const dealSelector = context.store.getState().dealSelector;
    const userPostcode = context.store.getState().userPostcode;
    const vehiclesFilter = getVehiclesFilter(context);
    vehiclesFilter.leasingDealType = dealSelector;
    vehiclesFilter.maintenance = true;

    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    const fetchHeaders = getLOSSRFetchHeaders(context);

    const paginationCriteria: PaginationCriteria = {
        pageIndex: 1,
        pageSize: 12
    }

    const models = (await GetModels(vehiclesFilter.vehicleType, vehiclesFilter.manufacturerUrl, fetchHeaders)).data;
    const shortModText = models.find(x => x.id == vehiclesFilter.shortModTextUrl)?.text;

    const alternativeModels = (await GetVehicleAlternativeModels(vehiclesFilter.vehicleType, vehiclesFilter.manufacturerUrl, vehiclesFilter.shortModTextUrl, fetchHeaders)).data;
    //Why do we need them on server-side?
    let topRecommended = await GetRecommendedForModel(vehiclesFilter.pricingType, userPostcode, vehiclesFilter.vehicleType, vehiclesFilter.leasingDealType, vehiclesFilter.manufacturerUrl, vehiclesFilter.shortModTextUrl, fetchHeaders);
    let vehiclePreviews = await GetVehiclePreviews(vehiclesFilter, paginationCriteria, undefined, fetchHeaders);
    let modelReview = (await GetModelReview(vehiclesFilter.vehicleType, vehiclesFilter.manufacturerUrl, vehiclesFilter.shortModTextUrl, null, fetchHeaders)).data;
    let capId = (await GetCapId(vehiclesFilter.manufacturerUrl, vehiclesFilter.shortModTextUrl, fetchHeaders)).data;
    let modelImage = (await GetVehicleImage(vehiclesFilter.vehicleType, capId.data, fetchHeaders)).data;
    let modelGallery = (await GetModelGalleryImages(vehiclesFilter.vehicleType, capId.data, 750, 500)).data;
    let pageContent = (await ContentService.GetModelPageContent(CustomContentTypes.ModelAttachments, vehiclesFilter.leasingDealType, vehiclesFilter.manufacturerUrl, shortModText)).data;

    const leasingDealType = vehiclesFilter.leasingDealType;
    const vehicleType = vehiclesFilter.vehicleType;
    const makeUrl = vehiclesFilter.manufacturerUrl;

    const makeName = capitalize(GetProperManufacturerName(GetFriendlyName(makeUrl)).toUpperCase());//TODO: get original make name instead of GetFriendlyName
    const modelName = capitalize(vehiclesFilter.modelUrl.toUpperCase());

    const title = `${makeName} ${modelName} ${(vehicleType === VehicleTypes.Commercial ? 'Van' : 'Car')} Lease`;
    const description = pageContent?.text || null;

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

            topRecommended: topRecommended.data,
            vehiclePreviews: vehiclePreviews.data,
            alternativeModels: alternativeModels,

            //if we pass whole filter why do we need separate properties
            vehicleType: vehicleType,
            make: vehiclesFilter.manufacturerUrl,
            model: vehiclesFilter.shortModTextUrl,
            vehicleFilter: vehiclesFilter
        }
    };
}