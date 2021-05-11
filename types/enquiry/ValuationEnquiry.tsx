import { BaseEnquiry } from "types/enquiry/BaseEnquiry"

export class ValuationEnquiry extends BaseEnquiry {
    valuationCap: number;
    valuationId: any;
    valuationValue: number | null;
    vrm: string;
    make: string;
    model: string;
    mileage: number;
    postCode: string;
    salesPersonId: any;
}