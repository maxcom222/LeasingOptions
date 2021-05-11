import { ContactRequestTypes } from "enums/ContactRequestTypes"
import { BaseEnquiry } from "types/enquiry/BaseEnquiry"

export class RequestCallbackEnquiry extends BaseEnquiry {
    contactEnquiryType: ContactRequestTypes | number = null;
}
