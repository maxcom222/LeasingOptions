import { ApiResponse } from "types/infrastructure/ApiResponse";
import { parseCookies, setCookie } from 'nookies';
import { HasSeenMarketingForm, SetToSeenMarketingForm } from "./systemService";

export class MarketingCommunicationsService {
    public static async HasSeenMarketingForm(emailAddress: string) {
        return new Promise((resolve) => {
            const cookies = parseCookies();
            const hasSeenConsentFormEmail = cookies.HasSeenConsentForm;

            if (emailAddress != hasSeenConsentFormEmail) {
                HasSeenMarketingForm(emailAddress)
                    .then((response: ApiResponse) => {
                        const result = response.isSucceed ? response.data : false;
                        resolve(result);
                    });
            }
            else {
                resolve(true);
            }
        });
    }

    public static async SetToSeenMarketingForm(emailAddress: string, expiryDate: Date) {
        return SetToSeenMarketingForm(emailAddress)
            .then(response => {
                if (response.status.code === 0) {
                    setCookie(null, "HasSeenConsentForm", emailAddress, { expires: expiryDate, path: '/' });
                }
            });
    }
}