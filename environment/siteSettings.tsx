import { VehicleTypes } from "enums/VehicleTypes";
import { LeasingDealTypes } from "enums/LeasingDealTypes";

export class SiteSettings {
    public static DefaultCarMileage: number = parseInt(process.env.NEXT_PUBLIC_DEFAULT_CAR_MILEAGE);
    public static DefaultVanMileage: number = parseInt(process.env.NEXT_PUBLIC_DEFAULT_VAN_MILEAGE);
    public static DefaultInitialRentals: number = parseInt(process.env.NEXT_PUBLIC_DEFAULT_INITIAL_RENTALS);
    public static DefaultTerm: number = parseInt(process.env.NEXT_PUBLIC_DEFAULT_TERM);
    public static DefaultMaintenance: boolean = process.env.NEXT_PUBLIC_DEFAULT_MAINTENANCE === "true";

    public static GetDealTypeDefaultMileage(leasingDealType: LeasingDealTypes): number {
        return leasingDealType === LeasingDealTypes.Van ? this.DefaultVanMileage : this.DefaultCarMileage;
    }

    public static GetVehicleTypeDefaultMileage(vehicleType: VehicleTypes): number {
        return vehicleType === VehicleTypes.Commercial ? this.DefaultVanMileage : this.DefaultCarMileage;
    }
}