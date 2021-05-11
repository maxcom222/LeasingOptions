import { ApiResponse } from "types/infrastructure/ApiResponse";
import { VerifySalesPerson, CheckInformationNoticAcceptance } from "./systemService";

export class QuotesService {
    public static async VerifySalesPerson(salesPersonId: string, emailAddress: string, telephone: string) {
        return VerifySalesPerson(salesPersonId, emailAddress, telephone);
    }

    public static async CheckInformationNoticAcceptance(emailAddress: string, telephone: string) {
        return new Promise((resolve) => {
            CheckInformationNoticAcceptance(emailAddress, telephone)
                .then((response: ApiResponse) => {
                    const result = response.isSucceed ? response.data : false;
                    resolve(result);
                });
        });
    }
}