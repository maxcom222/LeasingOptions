import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';
import { GetVehicleModelPreviews, GetTopLoPickVehicles } from 'business-logic/vehicleService';

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

    await dispatchUpdateVehicleFilterSearch(context, vehiclesFilter);
    if (vehicleType === VehicleTypes.Car) {
        //TODO: set from filter?
        dispatchUpdateDealToggle(context);
    }

    const fetchHeaders = getLOSSRFetchHeaders(context);

    //Why do we need them on server-side?
    const modelPreviews = (await GetVehicleModelPreviews(vehiclesFilter, { pageSize: 9999, pageIndex: 1 }, undefined, fetchHeaders)).data;
    const topPicks = (await GetTopLoPickVehicles(vehiclesFilter.vehicleType, '', null, null, fetchHeaders)).data;

    const metaData: MetaData = vehicleType === VehicleTypes.Commercial ?
        {
            title: `Van Leasing | Van Lease Deals & Long Term Van Hire | Leasing Options UK`,
            description: `Leasing Options offer the most competitive van lease deals in the marketplace. We will not be beaten on price for long term van hire.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)).toLowerCase(),
            keywords: `Van Leasing, Long Term Van Hire, Van lease deals`
        } :
        {
            title: `Car Leasing | Personal Lease Deals &amp; Contract Hire | Leasing Options`,
            description: `Get the best car leasing deals for personal contract hire from Leasing Options. Vehicles delivered anywhere in the UK. Get your FREE instant quote, today.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)).toLowerCase(),
            keywords: `Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire`
        }

    return {
        props: {
            metaData: metaData,

            modelPreviews: modelPreviews,
            topPicks: topPicks,

            vehicleFilter: vehiclesFilter
        }
    };
}