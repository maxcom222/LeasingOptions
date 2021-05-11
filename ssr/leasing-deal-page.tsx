import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { MetaData } from 'types/infrastructure/MetaData';
import { getBaseUrl } from 'helpers/urlsHelper';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getLandingPageSchema, GetServiceSchema } from 'helpers/schemaHelper';
import { getVehiclesFilter } from 'helpers/vehiclesFilterHelper';
import { dispatchUpdateDealToggle, dispatchUpdateVehicleFilterSearch } from 'redux/dispatches/dispatchs';

//TODO: check mvc logic
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

    const webPageSchema = getLandingPageSchema(leasingDealType, context.req.url);
    const serviceSchema = await GetServiceSchema(vehicleType);

    //TODO: move hardcoded data to component?
    let metaData: MetaData = null;

    switch (leasingDealType) {
        case LeasingDealTypes.Personal:
            metaData = {
                title: `Car Leasing | Top Personal Lease Deals & Contract Hire | Leasing Options`,
                description: `Today’s best car leasing deals for personal car contract hire from Leasing Options ✔ Wide variety of brand new car leasing offers ✔ Free UK delivery.`,
                keywords: `Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire`,
                canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)).toLowerCase(),
                imageUrl: process.env.NEXT_PUBLIC_CDN + '/website/static/hero/personal-1.jpg'
            };
            break;
        case LeasingDealTypes.Business:
            metaData = {
                title: `Business Car Leasing | Car Contract Hire Deals | Leasing Options`,
                description: `The best business car leasing deals available now at Leasing Options ✔ Huge range of affordable contract hire vehicles ✔ 5-star Trustpilot rating.`,
                keywords: "Car Leasing, Business Car Leasing, Car Lease Deals, Car Leasing Manchester, Contract Hire",
                canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)).toLowerCase(),
                imageUrl: process.env.NEXT_PUBLIC_CDN + '/website/static/hero/business-1.jpg'
            };
            break;
        case LeasingDealTypes.Van:
            metaData = {
                title: `Van Leasing | Van Lease Deals & Long Term Van Hire | Leasing Options UK`,
                description: `Leasing Options offer the most competitive van lease deals in the marketplace. We will not be beaten on price for long term van hire.`,
                keywords: `Van Leasing, Long Term Van Hire, Van lease deals`,
                canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)).toLowerCase(),
                imageUrl: process.env.NEXT_PUBLIC_CDN + '/website/static/hero/van-1.jpg'
            };
            break;
    }

    return {
        props: {
            metaData: metaData,
            serviceSchema: serviceSchema,
            webPageSchema: webPageSchema,
        }
    };
}