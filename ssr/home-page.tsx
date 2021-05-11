import { NewsService } from 'business-logic/newsService';
import { dispatchUpdateDealToggle } from 'redux/dispatches/dispatchs';
import { getLOSSRFetchHeaders } from 'helpers/apiHelper';
import { GetTopVehicles } from 'business-logic/vehicleService';

export const getProps = async (context) => {
    dispatchUpdateDealToggle(context);
    const dealSelector = context.store.getState().dealSelector;
    const fetchHeaders = getLOSSRFetchHeaders(context);

    const topVehiclesPromise = await GetTopVehicles(dealSelector, 4, fetchHeaders);

    return {
        props:
        {
            topVehicles: topVehiclesPromise.data,
        }
    };
}