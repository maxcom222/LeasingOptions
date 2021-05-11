import { GetValuationRequest } from "types/value-your-car/GetValuationRequest";
import { GetValuation } from "./systemService";

export class ValueYourCarService {
    public static async GetValuation(payload: GetValuationRequest) {
        return GetValuation(payload);
    }
}