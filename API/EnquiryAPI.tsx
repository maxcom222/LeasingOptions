import { RequestCallbackEnquiry } from "types/enquiry/RequestCallbackEnquiry";
import { ContactEnquiry } from "types/enquiry/ContactEnquiry";
import { ValuationEnquiry } from "types/enquiry/ValuationEnquiry";
import { PricePromiseEnquiry } from "types/enquiry/PricePromiseEnquiry";
import { QuoteEnquiry } from "types/enquiry/QuoteEnquiry";
import { GarageEnquiry } from "types/enquiry/GarageEnquiry";
import { getApiResponse } from "helpers/apiResponseHelper";

export class EnquiryAPI {
    private static baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_ENQUIRIES_URL;

    public static async SubmitRequestCallback(payload: RequestCallbackEnquiry) {
        const response = await fetch(this.baseUrl + "api/enquiries/contactenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    }

    public static async SubmitContactEnquiry(payload: ContactEnquiry) {
        const response = await fetch(this.baseUrl + "api/enquiries/contactenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    }

    public static async SubmitValuationEnquiry(payload: ValuationEnquiry) {
        const response = await fetch(this.baseUrl + "api/enquiries/valueyourcarenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    }

    public static async SubmitPricePromiseEnquiry(payload: PricePromiseEnquiry) {
        const response = await fetch(this.baseUrl + "api/enquiries/pricepromiseenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    }

    public static async SubmitQuoteEnquiry(payload: QuoteEnquiry) {
        const response = await fetch(this.baseUrl + "/api/enquiries/quoteenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }

    public static async SubmitGarageEnquiry(payload: GarageEnquiry) {
        const response = await fetch(this.baseUrl + "api/enquiries/garageenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }
}