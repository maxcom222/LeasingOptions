export type AdvertiseVehicle = {
    personalDeal: Deal,
    businessDeal: Deal,
    vehicleType: number,
    vehicleRef: number,
    make: string,
    shortModel: string,
    model: string,
    derivative: string,
    imageUrl: string,
    stickers: Array<number>
}

export type Deal = {
    dealType: number,
    mileage: number,
    term: number,
    maintenace: boolean,
    initialRentalMonths: number,
    initialRental: number,
    monthlyPrice: number
}