import { PricingErrorFeedbackTypes } from "enums/internal/PricingErrorFeedbackTypes"
import { PricingErrorFeedbackSubtypes } from "./PricingErrorFeedbackSubtypes"

export type PricingErrorFeedback = 
{
    vehicleRef: number,
    capId: number,
    vehicleName: string,
    vehiclePageUrl: string,
    salesPersonId: string,
    type: PricingErrorFeedbackTypes,
    subtype?: PricingErrorFeedbackSubtypes,
    funder: string,
    quoteNumber: string,
    dealerContacted: string,
    where: string,
    howMany: string,
    note: string,
}