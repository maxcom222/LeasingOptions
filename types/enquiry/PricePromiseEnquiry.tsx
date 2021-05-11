import { BaseEnquiry } from "types/enquiry/BaseEnquiry"

export class PricePromiseEnquiry extends BaseEnquiry {
    companyName: string;
    comments: string;
    fileId: string;
}