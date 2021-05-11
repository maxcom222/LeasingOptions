import { GarageActionTypes } from "enums/GarageActionTypes";

export type GarageAction = {
    actionType: GarageActionTypes,
    email: string,
    vehicles: any[]
}