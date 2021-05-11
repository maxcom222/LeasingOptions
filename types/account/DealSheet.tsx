import { Funder } from './Funder';
import { RenewalAlerts } from './RenewalAlerts';

export type DealSheet = {
    dealsheetId: string;
    capId: number;
    product: string;
    vehicleType: number;
    make: string;
    model: string;
    derivative: string;
    actualDate: string;
    renewalDate: string;
    renewalAlerts: Array<RenewalAlerts>;
    renewalAlertSmsNumber: number;
    images: Array<string>;
    makeIcon: string;
    p11D: string;
    co2: number;
    fuelType: string;
    transmission: string;
    driveTrain: string;
    age: string;
    interiorColour: string;
    exteriorColour: string;
    quotationInclusions: string;
    contractTerm: number;
    contractMileage: number;
    subsequentRentals: string;
    initialRental: number;
    financeRental: number;
    maintenanceRental: number;
    monthlyRental: number;
    processingFee: number;
    excessMileageCharge: string;
    funder: Funder;
    vatType: string;
    elapsedPercentage: number;
}