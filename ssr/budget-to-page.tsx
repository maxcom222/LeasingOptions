import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { isNullOrWhiteSpace } from 'helpers/stringHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { ContentService } from 'business-logic/contentService';
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { GetTopLoPickVehicles, GetVehicleModelPreviews } from 'business-logic/vehicleService';

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

    const allovedValues = ["150", "200", "250", "300", "350", "400", "450", "500", "600", "700", "800", "900", "1000"];
    const budget = context.query.budget as string;

    if (!allovedValues.includes(budget)) {
        //Do we have custom page to show?
        context.res.writeHead(404);
        context.res.end();
        return;
    }

    const originalValue = parseInt(budget);

    vehiclesFilter.maintenance = false;
    vehiclesFilter.priceTo = originalValue;
    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    if (vehicleType === VehicleTypes.Car) {
        //TODO: set from filter?
        dispatchUpdateDealToggle(context);
    }

    const fetchHeaders = getLOSSRFetchHeaders(context);

    const modelPreviews = (await GetVehicleModelPreviews(vehiclesFilter, { pageSize: 9999, pageIndex: 1 }, undefined, fetchHeaders)).data;
    const topPicks = (await GetTopLoPickVehicles(vehicleType, '', null, null, fetchHeaders)).data;

    const pageContent = (await ContentService.GetBudgetPageContent(vehicleType, `upto-${originalValue}`)).data;

    let title: string = pageContent?.title || null;
    let description: string = pageContent?.text || null;//TODO: HTML format required on render. Check other pages as well

    if (isNullOrWhiteSpace(title)) {
        title = `${(vehicleType === VehicleTypes.Commercial ? "Vans" : "Cars")} up to £${originalValue}`;
    }

    const metaData: MetaData = {
        title: pageContent?.metaPageTitle || null,
        description: pageContent?.metaDescription || null,
        keywords: pageContent?.metaKeywords || null,
        canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url))?.toLowerCase()
    };

    if (!isNullOrWhiteSpace(metaData.description)) {
        metaData.description = metaData.description.replace(/[\r\n]+/g, " ").trim();
    }

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