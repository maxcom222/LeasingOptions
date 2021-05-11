export class BaseEnquiry {
    fullName: string;
    telephone: string;
    email: string;

    //used to sent document.referrer
    details?: string;
    gaClientId: string;

    allowedCommunicationTypes: number[] = null;
}