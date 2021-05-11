import { LeasingDealTypes } from "enums/LeasingDealTypes";

export const getVehicleMonthlyPrice = (leasingDealType: LeasingDealTypes, price: number, term: number, rentalMonths: number): number => {
    let result: number = null;

    if (price && price > 0) {
        price = leasingDealType === LeasingDealTypes.Personal ? price * 1.2 : price;
        result = price / (((term * 12) - 1) + rentalMonths);
    }

    return result || 0;
}

export const getAnnualTax = (p11d: number, taxRate: number, co2TaxMultiplier?: number): number => {
    if (p11d >= 0 && taxRate >= 0 && co2TaxMultiplier >= 0) {
        return p11d * (taxRate / 100) * (co2TaxMultiplier / 100);
    }

    return null;
}