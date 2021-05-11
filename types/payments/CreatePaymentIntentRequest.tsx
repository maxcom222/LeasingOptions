export class CreatePaymentIntentRequest {
    orderId: string;
    type: string;
    amount: number;
    extension: boolean;
    hostOrigin: string;
}