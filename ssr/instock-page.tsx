import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { isNullOrWhiteSpace } from 'helpers/stringHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { GetTopLoPickVehicles, GetVehicleModelPreviews } from 'business-logic/vehicleService';
import { ContentService } from 'business-logic/contentService';
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch, dispatchSearchType } from 'redux/dispatches/dispatchs';

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

    vehiclesFilter.isInStock = true;
    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    if (vehicleType === VehicleTypes.Car) {
        //TODO: set from filter?
        dispatchUpdateDealToggle(context);
    }

    const fetchHeaders = getLOSSRFetchHeaders(context);

    const modelPreviews = (await GetVehicleModelPreviews(vehiclesFilter, { pageSize: 99999, pageIndex: 1 }, { sortBy: 'OrderPrice', sortDirection: 'ASC', }, fetchHeaders)).data;
    const topPicks = (await GetTopLoPickVehicles(vehicleType, '', null, null, fetchHeaders)).data;

    const pageContent = (await ContentService.GetInStockPageContent(vehicleType)).data;

    let title: string = pageContent?.title || null;
    let description: string = pageContent?.text || null;//TODO: HTML format required on render. Check other pages as well

    if (isNullOrWhiteSpace(title)) {
        title = `In Stock ${(vehicleType === VehicleTypes.Commercial ? "Van" : "Car")} Lease Deals`;
    }

    const metaData: MetaData = {
        title: pageContent?.metaPageTitle || null,
        description: pageContent?.metaDescription || null,
        keywords: pageContent?.metaKeywords || null,
        canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url))?.toLowerCase()
    }

    if (isNullOrWhiteSpace(metaData.title)) {
        metaData.title = `In Stock ${(vehicleType === VehicleTypes.Commercial ? "Van" : "Car")} Lease Deals | Fast Delivery | Leasing Options`;
    }

    if (isNullOrWhiteSpace(metaData.description)) {
        if (vehicleType === VehicleTypes.Car) {
            metaData.description = `Looking for a car lease but need something quick? Leasing Options offer a wide selection of cars that are in stock right now. View our in stock cars today.`;
        } else if (vehicleType === VehicleTypes.Commercial) {
            metaData.description = `Check out our in stock van lease deals and drive a brand-new vehicle in less than two weeks.`;
        }
    }

    if (!isNullOrWhiteSpace(metaData.description)) {
        metaData.description = metaData.description.replace(/[\r\n]+/g, " ").trim();
    }

    dispatchSearchType(context, "stock", "Search stock only");

    return {
        props: {
            title: title,
            description: description,
            metaData: metaData,

            modelPreviews: modelPreviews,
            topPicks: topPicks,

            vehicleFilter: vehiclesFilter
        }
    };
}