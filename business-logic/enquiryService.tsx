import { ContactRequestTypes } from "enums/ContactRequestTypes"
import { RequestCallbackEnquiry } from "types/enquiry/RequestCallbackEnquiry"
import { ContactEnquiry } from "types/enquiry/ContactEnquiry";
import { ValuationEnquiry } from "types/enquiry/ValuationEnquiry";
import { PricePromiseEnquiry } from "types/enquiry/PricePromiseEnquiry";
import { QuoteEnquiry } from "types/enquiry/QuoteEnquiry";
import { GarageEnquiry } from "types/enquiry/GarageEnquiry";
import { getGAClientId } from 'helpers/analytics';
import { EnquiryAPI } from "API/EnquiryAPI"


export class EnquiryService {

    public static async SubmitRequestCallback(name: string, telephone: string, referrerUrl: string | null = null) {

        let payload: RequestCallbackEnquiry = {
            contactEnquiryType: ContactRequestTypes.RequestCallback,
            details: referrerUrl,
            fullName: name,
            telephone: telephone,
            gaClientId: getGAClientId(),
            email: '',
            allowedCommunicationTypes: []
        }

        return EnquiryAPI.SubmitRequestCallback(payload);
    }

    public static async SubmitContactEnquiry(email: string, name: string, telephone: string, companyName: string, leasingDealType: any, message: string, allowedCommunicationTypes: number[], referrerUrl: string | null = null) {

        let payload: ContactEnquiry = {
            contactEnquiryType: ContactRequestTypes.ContactUs,
            contactSubtype: null,
            details: referrerUrl,
            fullName: name,
            telephone: telephone,
            gaClientId: getGAClientId(),

            email: email,
            leasingDealType: leasingDealType,
            companyName: companyName,
            comments: message,
            allowedCommunicationTypes: allowedCommunicationTypes
        }

        return EnquiryAPI.SubmitContactEnquiry(payload);
    }

    public static async SubmitValuationEnquiry(payload: ValuationEnquiry) {
        return EnquiryAPI.SubmitValuationEnquiry(payload);
    }

    public static async SubmitPricePromiseEnquiry(name: string, companyName: string, telephone: string, email: string, message: string, fileId: string, allowedCommunicationTypes: number[]) {
        let payload = new PricePromiseEnquiry();
        payload.fullName = name;
        payload.telephone = telephone;
        payload.email = email;
        payload.companyName = companyName;
        payload.comments = message;
        payload.fileId = fileId;
        payload.allowedCommunicationTypes = allowedCommunicationTypes;
        payload.gaClientId = getGAClientId();

        return EnquiryAPI.SubmitPricePromiseEnquiry(payload);
    }

    public static async SubmitQuoteEnquiry(payload: QuoteEnquiry) {
        return EnquiryAPI.SubmitQuoteEnquiry(payload);
    }

    public static async SubmitGarageEnquiry(payload: GarageEnquiry) {
        return EnquiryAPI.SubmitGarageEnquiry(payload);
    }
}