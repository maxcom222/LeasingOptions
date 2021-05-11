import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { VehicleTypes } from 'enums/VehicleTypes';
import { faCalendar, faHourglass, faCoin, faTire, faSteeringWheel, faSnowflake, faBullseye } from '@fortawesome/pro-light-svg-icons';
import { faGem } from "@fortawesome/pro-light-svg-icons";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import { CheckVanUrl } from 'helpers/urlHelper';
import { initialFilterData } from "../redux/initialState";
import * as _ from 'underscore';
import { hasWhiteSpace, replaceAll } from './stringHelper';
import { SiteSettings } from "../environment/siteSettings";
import { VehiclesFilterSearch } from "../types/vehicle-search/VehiclesFilterSearch";
import accounting from "accounting";

/**
 * Returns the text from a HTML string
 * 
 * @param {html} String The html string
 */
export const stripHtml = (html) => {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

export let listenToScroll = (scrolledCheck: number) => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;
    return scrolled > scrolledCheck;
}

export const serialize = (obj) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str?.join("&");
}

export const GetProperManufacturerName = (manufacturer) => {
    return manufacturer.toLowerCase().replace("alfa romeo", "alfa").replace("mercedes benz", "mercedes").replace("mg motor uk", "mg").replace("volkswagen", "vw");
}

export const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

export const GetFriendlyName = (value: string) => {
    if (value == null || value == undefined) {
        return;
    }
    value = value.toString();
    value = replaceAll(value, "-", " ");
    value = replaceAll(value, "––", " ");
    value = replaceAll(value, "/", "");
    value = GetProperManufacturerName(value);

    if (value === "bmw" || value === "ds" || value === "mg" || value === "vw" || value === "seat") {
        value = value.toUpperCase();
    }

    return value;
}

export const GetMonthlyVATText = (leasingDealType: LeasingDealTypes) => {

    if (leasingDealType == LeasingDealTypes.Personal) {
        return "Per Month " + GetVATText(leasingDealType);
    }

    return "Per Month " + GetVATText(leasingDealType);
}

export const GetVATText = (leasingDealType: LeasingDealTypes) => {
    if (leasingDealType == LeasingDealTypes.Personal) {
        return "Inc. VAT";
    }

    return "+VAT";
}

export const GetFeatureIcon = (featureId) => {
    switch (featureId) {
        case 1:
            return faBluetooth;
        case 2:
            return faSnowflake;
        case 3:
            return faBullseye;
        case 4:
            return faTire;
        default:
            return;
    }
}

export const GetNewsTypeFriendlyName = (value: string) => {
    value = value.toString();
    value = replaceAll(value, "-", " ");
    return value;
}

export const GetNewsTagClass = (tagId: number) => {
    switch (tagId) {
        case 1:
            return "card-news__tag--latest";
        case 2:
            return "card-news__tag--reviews";
        case 3:
            return "card-news__tag--blog";
        case 4:
            return "card-news__tag--red";
        default:
            return;
    }
}

export const getVehicleHeaderIcon = (optionType) => {
    switch (optionType) {
        case 1:
            return faCalendar;
        case 2:
            return faHourglass;
        case 3:
            return faCoin;
        default:
            return null;
    }
}

export const getFeaturedHeaderIcon = (dealType) => {
    switch (dealType) {
        case "BASE":
            return faTire;
        case "ADVANCED":
            return faSteeringWheel;
        case "PREMIUM":
            return faGem;
        case "LOPICK":
            return null;
        default:
            return null;
    }
}

export const getFeaturedHeaderColor = (dealType) => {
    switch (dealType) {
        case "BASE":
            return '#223e77';
        case "ADVANCED":
            return '#009892';
        case "PREMIUM":
            return '#9d8e60';
        case "LOPICK":
            return '#910606';
        default:
            return null;
    }
}

export const getFeaturedHeaderLabel = (dealType) => {
    switch (dealType) {
        case "BASE":
            return 'Starts From';
        case "ADVANCED":
            return 'Premium Model';
        case "PREMIUM":
            return 'High Specification';
        case "LOPICK":
            return 'Leasing Options Pick';
        default:
            return null;
    }
}

export const getSearchButton = (router, vehicleFilters, leasingDealType: LeasingDealTypes) => {
    let compareState: VehiclesFilterSearch = JSON.parse(JSON.stringify(initialFilterData));

    if (leasingDealType === LeasingDealTypes.Van) {
        compareState.mileage.id = SiteSettings.DefaultVanMileage.toString();
        compareState.mileage.name = accounting.formatNumber(SiteSettings.DefaultVanMileage) + " Miles"
    }

    //TODO: Values mutate on some stage. Check and fix
    compareState.isInStock = vehicleFilters.isInStock === null ? null : undefined;
    compareState.isSpecial = vehicleFilters.isSpecial === null ? null : undefined;

    if (!_.isEqual(vehicleFilters, compareState)) {
        return "Refine Search";
    } else if (CheckVanUrl(router.pathname)) {
        return "Search for a Van";
    } else {
        return "Search for a Car";
    }
}

export const groupByArray = (xs, key) => {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);

        if (el) {
            el.values.push(x);
        } else {
            rv.push({ key: v, values: [x] });
        }
        return rv;
    }, []);
}

export const formatAtcPostcode = (userPostcode): string => {
    if (userPostcode !== undefined && userPostcode !== '' && userPostcode !== null) {
        return userPostcode.split("-").join(" ");
    } else {
        return '';
    }
}

export const checkUrlPostcode = (urlPostcode, userPostcode) => {
    if (urlPostcode !== undefined && urlPostcode !== '' && urlPostcode !== null) {
        urlPostcode = urlPostcode.split("-").join(" ").toLowerCase();

        if (urlPostcode !== userPostcode) {
            return urlPostcode;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// at least one number, one lowercase and one uppercase letter
// at least six characters
export const isValidPasswordComplexity = (str: string) => {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
}

export const isValidPostcode = (userPostcode): boolean => {
    let postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    return postcodeRegEx.test(userPostcode);
}

export const AddSpaceToPostcode = (userPostcode) => {
    userPostcode = userPostcode.toUpperCase();

    if (!hasWhiteSpace(userPostcode)) {
        userPostcode = userPostcode.replace(/^(.*)(\d)(.*)/, "$1 $2$3"); // Adds space to the postcode
    }

    return userPostcode;
}

export const FormatValidatePostcode = (userPostcode) => {
    if (userPostcode !== '') {
        AddSpaceToPostcode(userPostcode);

        if (!isValidPostcode(userPostcode)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export const isNullOrEmpty = (arg): boolean => {
    if (arg == undefined || arg == null || (typeof arg == "string" && arg == "")) {
        return true;
    }
    //else if (arg.toString().trim().length == 0) {
    else if (arg.toString().length == 0) {
        return true;
    }
    return false;
}

export const getGUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const isLibraryImage = (imageUrl) => {
    if (imageUrl && (imageUrl.indexOf('/manual/') !== -1 || imageUrl.indexOf('/ids/') !== -1) || imageUrl.includes('img-placeholder.jpg')) {
        return true;
    } else {
        return false;
    }
}

export const isIzmoImage = (imageUrl) => {
    return imageUrl ? !isLibraryImage(imageUrl) : false;
}

export const GetPhoneNumber = (internal: boolean) => {
    if (internal) {
        return process.env.NEXT_PUBLIC_INTERNAL_NUMBER;
    } else {
        return process.env.NEXT_PUBLIC_EXTERNAL_NUMBER;
    }
}

export const MakeVanABCheck = (make, vehicleType) => {
    if (vehicleType === VehicleTypes.Car) {
        if (make === "citroen" || make === "fiat" || make === "ford" || make === "mercedes-benz" || make === "mitsubishi" || make === "nissan" || make === "peugeot" || make === "renault" || make === "toyota" || make === "vauxhall" || make === "volkswagen") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const MakeABCheck = (make, vehicleType) => {
    if (vehicleType === VehicleTypes.Car) {
        if (make === "bmw" || make === "tesla" || make === "mercedes-benz" || make === "ford" || make === "kia") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const MakeContentABCheck = (make, vehicleType) => {
    if (vehicleType === VehicleTypes.Car) {
        if (make && make.toLowerCase() === "seat" || make && make.toLowerCase() === "skoda") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const MakeABSplit = (make, description) => {
    let descriptionArray = "";

    switch (make) {
        case "bmw":
            descriptionArray = description.split(/(<p>The range also includes)/);
            break;
        case "tesla":
            descriptionArray = description.split(/(<p>Tesla&rsquo;s sporty)/);
            break;
        case "mercedes-benz":
            descriptionArray = description.split(/(<p>And at the other end,)/);
            break;
        case "ford":
            descriptionArray = description.split(/(<p>The <a href=")/);
            break;
        case "kia":
            descriptionArray = description.split(/(<p>We love the <a href=")/);
            break;
        default:
            return;
    }

    return descriptionArray;
}