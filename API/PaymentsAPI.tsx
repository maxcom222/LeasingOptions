import { CreatePaymentIntentRequest } from "types/payments/CreatePaymentIntentRequest";

export class PaymentsAPI {

    //private static baseUrl = "http://localhost:3758/api/";
    private static baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

    public static async CreatePaymentIntent(payload: CreatePaymentIntentRequest) {
        const response = await fetch(this.baseUrl + `payments/createpaymentintent`,
            {
                method: "POST",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        return await response.json();
    }

    public static async CreateCheckoutSession(payload: CreatePaymentIntentRequest) {
        const response = await fetch(this.baseUrl + `payments/createcheckoutsession`,
            {
                method: "POST",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        return await response.json();
    }
}