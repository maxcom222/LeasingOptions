import { GetSalesPeopleAPI, SendPricingFeedbackAPI, NewsletterSignupAPI, GetTrustPilotRatingAPI, GetValuationAPI, HasSeenMarketingFormAPI, SetToSeenMarketingFormAPI, CheckInformationNoticAcceptanceAPI, VerifySalesPersonAPI } from "API/SystemAPI";
import { PricingErrorFeedback } from "types/internal/PricingErrorFeedback";

export const GetSalesPeople = async () => {
    return GetSalesPeopleAPI();
}

export const VerifySalesPerson = async (salesPersonId, email, telephone) => {
    return VerifySalesPersonAPI(salesPersonId, email, telephone);
}

export const CheckInformationNoticAcceptance = async (email, tel) => {
    return CheckInformationNoticAcceptanceAPI(email, tel);
}

export const SendPricingFeedback = async (pricingFeedback: PricingErrorFeedback) => {
    return SendPricingFeedbackAPI(pricingFeedback);
}

export const NewsletterSignup = async (emailAddress: string, type: number) => {
    return NewsletterSignupAPI(emailAddress, type);
}

export const GetTrustPilotRating = async () => {
    return GetTrustPilotRatingAPI();
}

export const GetValuation = async (payload) => {
    return GetValuationAPI(payload);
}

export const HasSeenMarketingForm = async (email) => {
    return HasSeenMarketingFormAPI(email);
}

export const SetToSeenMarketingForm = async (email) => {
    return SetToSeenMarketingFormAPI(email);
}