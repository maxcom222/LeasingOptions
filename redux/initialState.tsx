import accounting from 'accounting';
import { VehiclesFilterSearch } from 'types/vehicle-search/VehiclesFilterSearch';

export const initialNavigationData = {
    currentLink: {
        id: "",
        name: "",
    },
    currentSubLink: {
        id: "",
        name: "",
    },
    level: 1,
    controls: false,
    indicator: "",
};

export const initialFormData = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
};

export const initialFilterData: VehiclesFilterSearch = {
    searchType: {
        id: "",
        name: ""
    },
    manufacturerUrl: '',
    modelUrl: '',
    shortDerTextUrl: {
        id: "",
        name: ""
    },
    term: {
        id: "",
        name: ""
    },
    initialRental: {
        id: process.env.NEXT_PUBLIC_DEFAULT_INITIAL_RENTALS,
        name: process.env.NEXT_PUBLIC_DEFAULT_INITIAL_RENTALS + " Months"
    },
    mileage: {
        id: process.env.NEXT_PUBLIC_DEFAULT_CAR_MILEAGE,
        name: accounting.formatNumber(parseInt(process.env.NEXT_PUBLIC_DEFAULT_CAR_MILEAGE)) + " Miles"
    },
    fuelType: {
        id: "",
        name: ""
    },
    transmission: {
        id: "",
        name: ""
    },
    co2: {
        id: "",
        name: ""
    },
    mpg: {
        id: "",
        name: ""
    },
    doors: {
        id: "",
        name: ""
    },
    seats: {
        id: "",
        name: ""
    },
    driveTrain: {
        id: "",
        name: ""
    },
    vehicleSize: {
        id: "",
        name: ""
    },
    vehicleStyle: {
        id: "",
        name: ""
    },
    engineSize: {
        id: "",
        name: ""
    },
    priceFrom: {
        id: "",
        name: ""
    },
    priceTo: {
        id: "",
        name: ""
    },
    isInStock: null,
    isSpecial: null
}