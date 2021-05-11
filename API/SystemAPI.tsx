import { GetValuationRequest } from "types/value-your-car/GetValuationRequest";
import { PricingErrorFeedback } from "types/internal/PricingErrorFeedback";
import { getApiResponse } from "helpers/apiResponseHelper";

const queryString = require('query-string');

export const SendPricingFeedbackAPI = async (pricingFeedback: PricingErrorFeedback) =>{
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/internaltools/sendpricefeedback?` + queryString.stringify(pricingFeedback));
    return getApiResponse(response);
}

export const HasSeenMarketingFormAPI = async(emailAddress: string) =>{
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/consentforms/hasseenmarketingform?email=${emailAddress}`);
    return getApiResponse(response);
}

export const CheckInformationNoticAcceptanceAPI = async(emailAddress: string, telephone: string)=> {
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/bmaccounts/checkinformationnoticacceptance?email=${emailAddress}&telephone=${telephone}`);
    return getApiResponse(response);
}

export const VerifySalesPersonAPI = async(salesPersonId: string, emailAddress: string, telephone: string)=> {
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/bmaccounts/verifysalesperson?salespersonid=${salesPersonId}&email=${emailAddress}&telephone=${telephone}`);
    return getApiResponse(response);
}

export const SetToSeenMarketingFormAPI = async(emailAddress: string) =>{
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/consentforms/settoseenmarketingform?email=${emailAddress}`);
    return await response.json();
}

export const GetValuationAPI = async(payload: GetValuationRequest) =>{
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/valuecars/getvaluation?vrm=${payload.vrm}&mileage=${payload.mileage}&fullName=${payload.fullName}&telephone=${payload.telephone}&email=${payload.email}&postCode=${payload.postCode}`);
    return await response.json();
}

export const GetSalesPeopleAPI = async() =>{
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/salespersons/list`);
    return await response.json();
}

export const NewsletterSignupAPI = async(emailAddress: string, type: number) => {
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/communications/subscribe`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        // body: {
        //     email: emailAddress,
        //     type: type.toString(),
        // }
        // commented out as breaks the build
    });
    return await response.json();
}

export const GetTrustPilotRatingAPI = async() => {
    const response = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL + `api/systemvalues/trustpilotrating`);
    return await response.json();
}