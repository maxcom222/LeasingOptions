export type VehicleManualDetails = {
    mileage?: number,
    maintenance: boolean,

    monthlyPrice: string,
    monthlyMaintenancePrice: string,
    initialRentalPrice: string,
    processingFee?: string,

    exteriorColor: number,
    interiorColor: number
}