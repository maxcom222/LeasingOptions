import { ContactRequestTypes } from "enums/ContactRequestTypes"
import { BaseEnquiry } from "types/enquiry/BaseEnquiry"

export class ContactEnquiry extends BaseEnquiry {
    contactEnquiryType: ContactRequestTypes | number = null;
    contactSubtype: string | null;
    leasingDealType: number;
    companyName: string;
    comments: string;
}