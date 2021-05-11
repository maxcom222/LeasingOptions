import _ from 'underscore';

import { VehicleStorageTypes } from "enums/VehicleStorageTypes";
import { VehicleStorageItem } from "types/VehicleStorageItem";
import { VehiclesStorageProvider } from "helpers/vehiclesStorageProvider";
import { isNullOrEmpty, getGUID } from "helpers/helpers";

export class GarageStorageHelper {
    private static storageType: VehicleStorageTypes = VehicleStorageTypes.Garage;
    private static storageMaxSize = VehiclesStorageProvider.getStorageMaxSize(VehicleStorageTypes.Garage) || 0;

    public static addItem(index: number, item): VehicleStorageItem {
        if (item && index >= 0 && index < this.storageMaxSize) {
            const storageItem: VehicleStorageItem = {
                id: getGUID(),
                index: index,
                vehicle: item
            };

            if (VehiclesStorageProvider.addItem(this.storageType, storageItem, index)) {
                return storageItem;
            }
        }

        return null;
    }

    public static updateItem(itemId: string, item, alwaysUpdate: boolean): VehicleStorageItem {
        if (item) {
            const storageItem: VehicleStorageItem = VehiclesStorageProvider.getItem(this.storageType, itemId);

            if (storageItem && (alwaysUpdate || !_.isEqual(storageItem.vehicle, item))) {
                storageItem.vehicle = item;

                if (VehiclesStorageProvider.updateItem(this.storageType, storageItem)) {
                    return storageItem;
                }
            }
        }

        return null;
    }

    public static addOrUpdateItem(item): VehicleStorageItem {
        if (item) {
            const storageItems: VehicleStorageItem[] = this.getItems(false);
            const storageItem: VehicleStorageItem = storageItems.find((storageItem: VehicleStorageItem) => {
                return storageItem && storageItem.vehicle && storageItem.vehicle.vehicleRef === item.vehicleRef;
            });

            if (storageItem) {
                return this.updateItem(storageItem.id, item, true);
            }
            else {
                const index: number = storageItems.indexOf(null);

                if (!isNullOrEmpty(index) && index >= 0 && index < this.storageMaxSize) {
                    return this.addItem(index, item);
                }
            }
        }

        return null;
    }

    public static cloneItem(itemId: string): VehicleStorageItem {
        const storageItems: VehicleStorageItem[] = this.getItems(false);
        const itemToClone: VehicleStorageItem = storageItems.find((item: VehicleStorageItem) => {
            return item && item.id === itemId;
        });

        if (itemToClone) {
            const index: number = storageItems.indexOf(null);

            if (!isNullOrEmpty(index) && index >= 0 && index < this.storageMaxSize) {
                const clonnedItem = {
                    id: getGUID(),
                    index: index,
                    vehicle: itemToClone.vehicle//copy not made as data comes from json
                };

                if (VehiclesStorageProvider.addItem(this.storageType, clonnedItem, index)) {
                    return clonnedItem;
                }
            }
        }

        return null;
    }

    public static removeItem(itemId: string): boolean {
        return VehiclesStorageProvider.removeItem(this.storageType, itemId);
    }

    public static getItems(ignoreEmptyItems: boolean): VehicleStorageItem[] {
        let result: VehicleStorageItem[] = VehiclesStorageProvider.getItems(this.storageType);

        if (result && result.length > 0 && ignoreEmptyItems) {
            result = result.filter((item: VehicleStorageItem) => {
                return item;
            });
        }

        return result;
    }

    public static clear() {
        VehiclesStorageProvider.clear(this.storageType);
    }

    public static countItems(): number {
        return this.getItems(true).length;
    }

    public static isFull(): boolean {
        return !(this.countItems() < this.storageMaxSize);
    }
}