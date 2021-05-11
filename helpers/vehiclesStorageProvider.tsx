import { VehicleStorageTypes } from "enums/VehicleStorageTypes";
import { VehicleStorageItem } from "types/VehicleStorageItem";
import { isNullOrWhiteSpace } from "helpers/stringHelper";
import { isNullOrEmpty } from "helpers/helpers";

export class VehiclesStorageProvider {
    public static getTriggerMaxSize(storageType: VehicleStorageTypes): number {
        switch (storageType) {
            case VehicleStorageTypes.History:
                return 4;
            default:
                return null;
        }
    }

    public static getStorageMaxSize(storageType: VehicleStorageTypes): number {
        switch (storageType) {
            case VehicleStorageTypes.Garage:
                return 4;
            case VehicleStorageTypes.History:
                return 20;
            default:
                return null;
        }
    }

    public static getStorageName(storageType: VehicleStorageTypes): string {
        switch (storageType) {
            case VehicleStorageTypes.Garage:
                return "garage";
            case VehicleStorageTypes.History:
                return "history";
            default:
                return null;
        }
    }

    public static getItems(storageType: VehicleStorageTypes): VehicleStorageItem[] {
        let items: VehicleStorageItem[] = null;
        const storageName: string = this.getStorageName(storageType);

        if (!isNullOrWhiteSpace(storageName)) {
            items = JSON.parse(localStorage.getItem(storageName));
        }

        if (!items) {
            items = [];
        }

        const requiredSize: number = this.getStorageMaxSize(storageType);

        if (items.length < requiredSize) {
            const itemsToAdd: number = requiredSize - items.length;

            for (let i = 0; i < itemsToAdd; i++) {
                items.push(null);
            }
        }

        return items;
    }

    public static getItem(storageType: VehicleStorageTypes, itemId: string): VehicleStorageItem {
        const items: VehicleStorageItem[] = this.getItems(storageType);
        const item: VehicleStorageItem = items.find((item: VehicleStorageItem) => {
            return item && item.id === itemId;
        });

        return item;
    }

    public static addItem(storageType: VehicleStorageTypes, item: VehicleStorageItem, index: number): boolean {
        let result: boolean = false;
        const items: VehicleStorageItem[] = this.getItems(storageType);
        const storageMaxSize: number = this.getStorageMaxSize(storageType);
        const indexHasValue: boolean = !isNullOrEmpty(index);

        if ((!indexHasValue && items.length < storageMaxSize) || (indexHasValue && index >= 0 && index < storageMaxSize)) {
            if (indexHasValue) {
                items[index] = item;
            }
            else {
                items.push(item);
            }

            result = this.persistItems(storageType, items);
        }

        return result;
    }

    public static updateItem(storageType: VehicleStorageTypes, item: VehicleStorageItem): boolean {
        let result: boolean = false;
        const items: VehicleStorageItem[] = this.getItems(storageType);
        const existingItem: VehicleStorageItem = items.find((existingItem: VehicleStorageItem) => {
            return existingItem && existingItem.id === item.id && existingItem.index === item.index;
        });

        if (existingItem) {
            items[items.indexOf(existingItem)] = item;
            result = this.persistItems(storageType, items);
        }

        return result;
    }

    public static removeItem(storageType: VehicleStorageTypes, itemId: string): boolean {
        let result: boolean = false;
        const items: VehicleStorageItem[] = this.getItems(storageType);
        const item: VehicleStorageItem = items.find((item: VehicleStorageItem) => {
            return item && item.id === itemId;
        });

        if (item) {
            items[items.indexOf(item)] = null;
            result = this.persistItems(storageType, items);
        }

        return result;
    }

    public static clear(storageType: VehicleStorageTypes): boolean {
        const storageName: string = this.getStorageName(storageType);

        if (!isNullOrWhiteSpace(storageName)) {
            localStorage.removeItem(storageName);
            return true;
        }

        return false;
    }

    private static persistItems(storageType: VehicleStorageTypes, vehicleItems): boolean {
        const storageName: string = this.getStorageName(storageType);

        if (!isNullOrWhiteSpace(storageName)) {
            localStorage.setItem(storageName, JSON.stringify(vehicleItems));
            return true;
        }

        return false;
    }
}