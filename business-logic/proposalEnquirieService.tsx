import { ProposalEnquiriesAPI } from "API/ProposalEnquiriesAPI"
import { getGAClientId } from 'helpers/analytics';


export class ProposalEnquirieService {
    public static async GetEnquiryid(enquiryType: number, quoteid: any, quoteEnquiryid: any, salespersonId: any, directfinance: boolean) {
        return ProposalEnquiriesAPI.GetEnquiryid(enquiryType, quoteid, quoteEnquiryid, salespersonId, directfinance);
    }

    public static async UpdateEnquiry(proposalEnquiryid: any, proposalData: any) {

        const payload = {
            proposalEnquiryid: proposalEnquiryid,
            data: JSON.stringify(proposalData),
            gaClientId: getGAClientId()
        };
        return ProposalEnquiriesAPI.UpdateEnquiry(payload);
    }

    public static async CompleteEnquiry(proposalEnquiryid: any, proposalData: any) {

        const payload = {
            proposalEnquiryid: proposalEnquiryid,
            data: JSON.stringify(proposalData),
            gaClientId: getGAClientId()
        };

        return ProposalEnquiriesAPI.CompleteEnquiry(payload);
    }
}