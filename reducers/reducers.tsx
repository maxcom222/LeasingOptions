import { combineReducers } from "redux";
import { initialNavigationData, initialFormData, initialFilterData } from "../redux/initialState";
import { VehiclesFilter } from "types/VehiclesFilter";
import { VehicleTypes } from "enums/VehicleTypes";
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetStaticMakes, GetContractValues, GetRentalValues, GetVehicleMileageValues, GetFuelTypesValues, GetTransmissionValues, GetC02Values, GetMpgValues, GetSeatValues, GetDriveTrainValues, GetVehicleSizeValues, GetVehicleStyleValues, GetEngineSizeValues, GetPriceToValues } from "business-logic/vehicleService";

function vehiclePreference(state = VehicleTypes.Car, action) {
    switch (action.type) {
        case "UPDATE_VEHICLE_PREFERENCE":
            return action.data;
        default:
            return state;
    }
}

function stickerList(state = [], action) {
    switch (action.type) {
        case "UPDATE_STICKER_LIST":
            return action.data;
        default:
            return state;
    }
}

function trustPilotRating(state = null, action) {
    switch (action.type) {
        case "UPDATE_TRUSTPILOT_RATING":
            return action.data;
        default:
            return state;
    }
}

function carManufacturerList(state = GetStaticMakes(VehicleTypes.Car), action) {
    switch (action.type) {
        case "UPDATE_CAR_MANUFACTURERS":
            return action.data;
        default:
            return state;
    }
}

function vanManufacturerList(state = GetStaticMakes(VehicleTypes.Commercial), action) {
    switch (action.type) {
        case "UPDATE_COMMERCIAL_MANUFACTURERS":
            return action.data;
        default:
            return state;
    }
}

function headerToggle(state = true, action) {
    switch (action.type) {
        case "UPDATE_HEADER_STATE":
            return action.toggle;
        default:
            return state;
    }
}

function dealSelector(state = LeasingDealTypes.Personal, action) {
    switch (action.type) {
        case "UPDATE_DEAL_TYPE":
            return action.deal;
        default:
            return state;
    }
}

function navigationStates(state = initialNavigationData, action) {
    switch (action.type) {
        case "UPDATE_LINK_STATE":
            return {
                ...state,
                currentLink: {
                    id: action.id,
                    name: action.indicator,
                },
                currentSubLink: {
                    id: "",
                    name: "",
                },
                level: action.level,
                controls: action.controls,
                indicator: action.indicator,
            };
        case "UPDATE_SUB_STATE":
            return {
                ...state,
                currentLink: state.currentLink,
                currentSubLink: {
                    id: action.id,
                    name: action.indicator,
                },
                level: action.level,
                controls: action.controls,
                indicator: action.indicator,
            };
        default:
            return state;
    }
}

function overlayState(state = false, action) {
    switch (action.type) {
        case "UPDATE_OVERLAY_STATE":
            return action.state;
        default:
            return state;
    }
}

function siteAlertState(state = true, action) {
    switch (action.type) {
        case "CLOSE_ALERT_BAR":
            return action.close;
        default:
            return state;
    }
}

function stepIndicator(state = 1, action) {
    switch (action.type) {
        case "UPDATE_INDICATOR":
            return action.step;
        default:
            return state;
    }
}

function formData(state = initialFormData, action) {
    switch (action.type) {
        case "UPDATE_FIELDS":
            return {
                ...state,
                [action.step]: action.data,
            };
        default:
            return state;
    }
}

function vehicleFilters(state = initialFilterData, action) {
    switch (action.type) {

        case "UPDATE_FILTERS":
            return {
                ...state,
                [action.filterName]: action.filterValue
            };
        case "UPDATE_ALL_FILTERS":

            let vehicleFilter = action.payload as VehiclesFilter;



            return {
                ...state,
                searchType: { id: vehicleFilter?.isSpecial ? 'offers' : vehicleFilter?.isInStock ? 'stock' : '', name: vehicleFilter?.isSpecial ? 'Search special offers only' : vehicleFilter?.isInStock ? 'Search stock only' : '' },
                manufacturerUrl: vehicleFilter?.manufacturerUrl ? vehicleFilter?.manufacturerUrl : '',
                modelUrl: vehicleFilter?.shortModTextUrl ? vehicleFilter?.shortModTextUrl : '',
                shortDerTextUrl: { id: vehicleFilter?.shortDerTextUrl ? vehicleFilter?.shortDerTextUrl : '', name: '' },
                term: { id: vehicleFilter?.term ? vehicleFilter?.term?.toString() : '', name: GetContractValues().find(item => item.id == vehicleFilter?.term)?.name ?? '' },
                initialRental: { id: vehicleFilter?.initialRentals ? vehicleFilter?.initialRentals?.toString() : '', name: GetRentalValues().find(item => item.id == vehicleFilter?.initialRentals)?.name ?? '' },
                mileage: { id: vehicleFilter?.mileage?.toString(), name: GetVehicleMileageValues().find(item => item.id == vehicleFilter?.mileage)?.name ?? '' },
                fuelType: { id: vehicleFilter?.fuelType ? vehicleFilter?.fuelType?.toString() : '', name: GetFuelTypesValues().find(item => item.id == vehicleFilter?.fuelType)?.name ?? '' },
                transmission: { id: vehicleFilter?.transmission ? vehicleFilter?.transmission?.toString() : '', name: GetTransmissionValues().find(item => item.id == vehicleFilter?.transmission)?.name ?? '' },
                co2: { id: vehicleFilter?.co2 ? vehicleFilter?.co2?.toString() : '', name: GetC02Values().find(item => item.id == vehicleFilter?.co2)?.name ?? '' },
                mpg: { id: vehicleFilter?.mpg ? vehicleFilter?.mpg?.toString() : '', name: GetMpgValues().find(item => item.id == vehicleFilter?.mpg)?.name ?? '' },
                //  doors: { id: vehicleFilter?.doors ? vehicleFilter?.doors?.toString() : '', name: GetDoo().find(item => item.id == vehicleFilter?.driveTrain).name ?? ''}, 
                seats: { id: vehicleFilter?.seats ? vehicleFilter?.seats?.toString() : '', name: GetSeatValues().find(item => item.id == vehicleFilter?.seats)?.name ?? '' },
                driveTrain: { id: vehicleFilter?.driveTrain ? vehicleFilter?.driveTrain?.toString() : '', name: GetDriveTrainValues().find(item => item.id == vehicleFilter?.driveTrain)?.name ?? '' },
                vehicleSize: { id: vehicleFilter?.vehicleSize ? vehicleFilter?.vehicleSize?.toString() : '', name: GetVehicleSizeValues().find(item => item.id == vehicleFilter?.vehicleSize)?.name ?? '' },
                vehicleStyle: { id: vehicleFilter?.vehicleStyle ? vehicleFilter?.vehicleStyle?.toString() : '', name: GetVehicleStyleValues().find(item => item.id == vehicleFilter?.vehicleStyle)?.name ?? '' },
                engineSize: { id: vehicleFilter?.engineSize ? vehicleFilter?.engineSize?.toString() : '', name: GetEngineSizeValues().find(item => item.id == vehicleFilter?.engineSize)?.name ?? '' },
                // priceFrom: { id: vehicleFilter?.priceFrom ? vehicleFilter?.priceFrom?.toString() : '', name: 'Price from'},
                priceTo: { id: vehicleFilter?.priceTo ? vehicleFilter?.priceTo?.toString() : '', name: GetPriceToValues().find(item => item.id == vehicleFilter?.priceTo)?.name ?? '' },
                isInStock: vehicleFilter?.isInStock,
                isSpecial: vehicleFilter?.isSpecial
            };
        //case "RESET_FILTERS":
        //    return initialFilterData;
        default:
            return state;
    }
}

function referrerRoute(state = null, action) {
    switch (action.type) {
        case "UPDATE_REFERRER":
            return action.url;
        default:
            return state;
    }
}

function garageData(state = {}, action) {
    switch (action.type) {
        case "ADD_TO_GARAGE":
            return {
                ...state,
                [action.garageId]: { vehicleRef: action.vehicleRef, leaseDealType: action.leaseDealType }
            };
        case "REMOVE_TO_GARAGE":
            const next = { ...state }
            delete next[action.garageId]
            return next
        default:
            return state;
    }
}

function isInternal(state = null, action) {
    switch (action.type) {
        case "UPDATE_INTERNAL":
            return action.internal;
        default:
            return state;
    }
}

function userPostcode(state = null, action) {
    switch (action.type) {
        case "UPDATE_POSTCODE":
            return action.userPostcode;
        case "RESET_POSTCODE":
            return '';
        default:
            return state;
    }
}

const siteReducers = combineReducers({
    vehiclePreference,
    stickerList,
    trustPilotRating,
    carManufacturerList,
    vanManufacturerList,
    headerToggle,
    dealSelector,
    navigationStates,
    overlayState,
    siteAlertState,
    stepIndicator,
    formData,
    vehicleFilters,
    referrerRoute,
    garageData,
    isInternal,
    userPostcode,
});

export default siteReducers;