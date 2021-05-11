export class DataLookupAPI {

    private static baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

    public static async PostcodeLookup(postcode: string) {
        const result = await fetch(this.baseUrl + `lookup/postcodes/${postcode}`);
        return await result.json()
    }

    public static async SortcodeLookup(sortcode: string) {
        const result = await fetch(this.baseUrl + `lookup/sortcodes/${sortcode}`);
        return await result.json()
    }
}