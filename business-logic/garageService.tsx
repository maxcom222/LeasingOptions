import { GarageAction } from "types/GarageAction";
import { GarageAPI } from "API/GarageAPI";

export class GarageService {
    public static GarageAction(payload: GarageAction) {
        return GarageAPI.SubmitGarageAction(payload);
    }

    public static SaveGarage(payload: any) {
        return GarageAPI.SaveGarage(payload);
    }

    public static GetGarage(garageId: string) {
        return GarageAPI.GetGarage(garageId);
    }
}