import { GarageAction } from "types/GarageAction";
import { getApiResponse } from "helpers/apiResponseHelper";

export class GarageAPI {
    private static baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_SYSTEM_URL;

    public static async GetGarage(garageId: string) {
        const res = await fetch(this.baseUrl + 'api/garage/get/' + garageId);
        return getApiResponse(res);
    }

    public static async SubmitGarageAction(payload: GarageAction) {
        const response = await fetch(this.baseUrl + "api/garage/garageaction", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }

    //TOTO: implement input class
    public static async SaveGarage(payload: any) {
        const response = await fetch(this.baseUrl + "api/garage/save", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return getApiResponse(response);
    }
}