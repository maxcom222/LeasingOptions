import { MarketingPermissions } from "types/account/MarketingPermissions";
import { UploadDocument } from "types/account/UploadDocument";
import { getApiResponse } from "helpers/apiResponseHelper";

export default class AccountAPI {

    private static readonly baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_ACCOUNT_URL;
    
    public static async getLatestQuotes(accountId: string) {
        const response = await fetch(this.baseUrl + `api/quotes/getlatest?accountId=${accountId}`);
        return getApiResponse(response);
    }

    public static async getAccount(accountId: string) {

        const response = await fetch(this.baseUrl + `api/quotes/getlatest?accountId=${accountId}`);
        return getApiResponse(response);

    }

    public static async createPassword(accountId: string, password: string, email: string) {
     
        let payload = { AccountId: accountId, Password: password, Email: email };

        const response = await fetch(this.baseUrl + "api/accounts/createaccount", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }

    public static async updateForgottenPassword(accountLink: string, password: string) {
     
        let payload = { AccountLink: accountLink, Password: password};

        const response = await fetch(this.baseUrl + "api/accounts/updateforgottenpassword", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }

    public static async sendforgottenPasswordEmail(email: string, accountNumber: string) {
     
        let payload = { Email: email, AccountNumber: accountNumber };

        const response = await fetch(this.baseUrl + "api/accounts/forgottenpasswordemail", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }

    public static async getDocuments(accountId: string) {
        const response = await fetch(this.baseUrl + `api/documents/getlatest?accountId=${accountId}`);
        return getApiResponse(response);
    }

    public static async getMarketingPreferences(accountId: string) {
        const response = await fetch(this.baseUrl + `api/marketingconsent/get?accountId=${accountId}`);
        return getApiResponse(response);
    }

    public static async getContracts(accountId: string) {
        const response = await fetch(this.baseUrl + `api/contracts/getcontracts?accountId=${accountId}`);
        return getApiResponse(response);
    }

    public static async saveDocument(upload:UploadDocument) {
    
        const response = await fetch(this.baseUrl + "api/documents/upload/base64", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(upload)
        });

        return await response.json();
    }

    public static async saveMarketingPreferences(marketing:MarketingPermissions) {
        const response = await fetch(this.baseUrl + "api/marketingconsent/save", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marketing)
        });

        return await response.json();
    }
    
    
    public static async setSmsNumber(data) {
        const response = await fetch(this.baseUrl + "/api/contracts/setrenewalalertsmsnumber", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }


    public static async setRenewalAlert(data) {
        const response = await fetch(this.baseUrl + "/api/contracts/setrenewalalert", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }
}
