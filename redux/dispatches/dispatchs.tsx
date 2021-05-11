import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehiclesFilter } from "types/VehiclesFilter";
import { formatAtcPostcode } from 'helpers/helpers';

export const dispatchUpdateDealToggle = (context) => {
    if (context.query.leasingdeal === "business" || context.req.url.replace("/internal", "").startsWith("/business-car-leasing")) {
        context.store.dispatch({ type: 'UPDATE_DEAL_TYPE', deal: LeasingDealTypes.Business });
    } else {
        context.store.dispatch({ type: 'UPDATE_DEAL_TYPE', deal: LeasingDealTypes.Personal });
    }
}

export const dispatchUpdateUserPostcode = (context) => {
    if (context.query.postcode) {
        context.store.dispatch({ type: 'UPDATE_POSTCODE', userPostcode: formatAtcPostcode(context.query.postcode) });
    } else {
        context.store.dispatch({ type: 'UPDATE_POSTCODE', userPostcode: '' });
    }
}

export const dispatchSearchType = (context, id, name) => {
    context.store.dispatch({ type: 'UPDATE_FILTERS', filterName: 'searchType', filterValue: { id: id, name: name } });
}

export const dispatchUpdateVehicleFilterSearch = async (context, vehicleFilter: VehiclesFilter) => {
    await context.store.dispatch({ type: 'UPDATE_DEAL_TYPE', deal: vehicleFilter.leasingDealType });
    await context.store.dispatch({ type: 'UPDATE_ALL_FILTERS', payload: vehicleFilter });
}