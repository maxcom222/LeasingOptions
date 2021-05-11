import { CustomContentTypes } from 'enums/CustomContentTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { isNullOrWhiteSpace, capitalize } from 'helpers/stringHelper';
import { MakePageMetaTitle, MakePageMetaDescription } from 'helpers/seoHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetProperManufacturerName } from 'helpers/helpers';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { ContentService } from 'business-logic/contentService';
import { NewsService } from 'business-logic/newsService';
import { NewsTypes } from "enums/NewsTypes";
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { GetVehicleModelPreviews, GetTopLoPickVehicles, GetAvailableShortModels, GetStaticMakes } from 'business-logic/vehicleService';

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
    const make = GetStaticMakes(vehicleType).find(item => { return item.id === makeUrl });

    if (!make) {
        context.res.writeHead(302, {
            Location: vehicleType === VehicleTypes.Commercial ? '/van-leasing' : '/car-leasing'
        });
        context.res.end();
        return;
    }

    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    if (vehicleType === VehicleTypes.Car) {
        //TODO: set from filter?
        dispatchUpdateDealToggle(context);
    }

    const isATC = vehiclesFilter.pricingType === PricingTypes.Atc;
    const fetchHeaders = getLOSSRFetchHeaders(context);

        //Temp: Set news tag ID based off URL
        let tagId = null;

        switch (makeUrl?.toLocaleLowerCase()) {
            case "seat":
                tagId = 278;
                break;
            case "skoda":
                tagId = 176;
                break;
            default:
                break;
        }
    
        //Why do we need them on server-side?
        const categoryNews = await NewsService.GetAllNewsArticlePreviews(NewsTypes.LatestNews, [tagId], 1, 4);
        const modelPreviews = (await GetVehicleModelPreviews(vehiclesFilter, { pageSize: isATC ? 12 : 999, pageIndex: 1 }, undefined, fetchHeaders)).data;
        const topPicks = (await GetTopLoPickVehicles(vehicleType, make.id, null, null, fetchHeaders)).data;
        const modelData = (await GetAvailableShortModels(vehiclesFilter, fetchHeaders)).data;

    const pageContent = (await ContentService.GetManufacturePageContent(CustomContentTypes.Manufacturer, vehicleType === VehicleTypes.Commercial ? LeasingDealTypes.Van : LeasingDealTypes.Personal, make.id)).data;

    const makeName = capitalize(GetProperManufacturerName(make.text).toUpperCase());

    let title = `${makeName} ${(vehicleType === VehicleTypes.Commercial ? 'Van Lease Deals' : 'Lease Deals')}`;
    const description = pageContent?.text || null;

    //TODO: implement
    //Description = !string.IsNullOrEmpty(customContent.Text) ? customContent.Text.Replace("#manufacturer#", manufacturer.Text.ToUpper()).Replace("<br/>", "").Replace("<br>", "") : null

    //TODO: implement - not critical
    //if (!string.IsNullOrEmpty(customContent.ImageUrl)) {
    //    contentItem.ImageUrl = customContent.ImageUrl;
    //}
    //else {
    //    contentItem.ImageUrl = await this._vehicleImagesService.GetVehicleManufacturerTopImageUrlAsync(vehicleType, manufacturer.Text);
    //}

    //----MetaData----
    const metaData: MetaData = {
        title: capitalize(pageContent?.metaPageTitle) || null,
        description: pageContent?.metaDescription || null,
        keywords: pageContent?.metaKeywords || null,
        canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url.replace("/internal", "")))?.toLowerCase(),
        imageUrl: process.env.NEXT_PUBLIC_CDN + "/website/static/makes/" + vehiclesFilter?.manufacturerUrl?.toLowerCase() + ".svg"
    }

    if (isNullOrWhiteSpace(metaData.title)) {
        metaData.title = MakePageMetaTitle(leasingDealType, makeName);
    }

    if (isNullOrWhiteSpace(metaData.description)) {
        metaData.description = MakePageMetaDescription(leasingDealType, makeName);
    }

    if (!isNullOrWhiteSpace(metaData.description)) {
        metaData.description = metaData.description.replace(/[\r\n]+/g, " ").trim();
    }
    //----//MetaData----

    return {
        props: {
            title: title,
            description: description,
            metaData: metaData,

            makeName: makeName,
            makeUrl: makeUrl,
            modelPreviews: modelPreviews,
            topPicks: topPicks,
            modelData: modelData,

            //if we pass whole filter why do we need separate properties
            vehicleType: vehiclesFilter.vehicleType,
            vehicleFilter: vehiclesFilter,

            categoryNews: categoryNews.data
        }
    };
}