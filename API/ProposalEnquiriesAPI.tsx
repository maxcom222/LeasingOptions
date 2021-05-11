export class ProposalEnquiriesAPI {
    private static baseUrl = process.env.NEXT_PUBLIC_MICROSERVICE_ENQUIRIES_URL;

    public static async GetEnquiryid(enquiryType: number, quoteid: any, quoteEnquiryid: any, salespersonId: any, directfinance: boolean) {
        const url = this.baseUrl + `api/proposalenquiries/getenquiryid?enquiryType=${enquiryType}&quoteid=${quoteid}&quoteEnquiryid=${quoteEnquiryid}&salespersonId=${salespersonId}&directfinance=${directfinance}`
        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }

    public static async UpdateEnquiry(payload: any) {
        const response = await fetch(this.baseUrl + "api/proposalenquiries/updateenquiry", {
            method: "POST",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    }

    public static async CompleteEnquiry(payload: any) {
        const response = await fetch(this.baseUrl + "api/proposalenquiries/completeenquiry", {
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