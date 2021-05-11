import _ from 'underscore';

import { VehicleStorageTypes } from "enums/VehicleStorageTypes";
import { VehicleStorageItem } from "types/VehicleStorageItem";
import { VehiclesStorageProvider } from "helpers/vehiclesStorageProvider";
import { isNullOrEmpty, getGUID } from "helpers/helpers";

export class HistoryStorageHelper {
    private static storageType: VehicleStorageTypes = VehicleStorageTypes.History;
    private static storageMaxSize = VehiclesStorageProvider.getStorageMaxSize(VehicleStorageTypes.History) || 0;
    private static triggerMaxSize = VehiclesStorageProvider.getTriggerMaxSize(VehicleStorageTypes.History) || 0;

    public static addItem(index: number, item, summary): VehicleStorageItem {
        if (item && index >= 0 && index < this.storageMaxSize) {
            const storageItem: VehicleStorageItem = {
                id: getGUID(),
                index: index,
                vehicle: item,
                timeStamp: Date.now(),
                summary: summary,
            };

            if (VehiclesStorageProvider.addItem(this.storageType, storageItem, index)) {
                return storageItem;
            }
        }

        return null;
    }

    public static updateItem(itemId: string, item, alwaysUpdate: boolean, summary): VehicleStorageItem {
        if (item) {
            const storageItem: VehicleStorageItem = VehiclesStorageProvider.getItem(this.storageType, itemId);

            if (storageItem && (alwaysUpdate || !_.isEqual(storageItem.vehicle, item))) {
                storageItem.vehicle = item;
                storageItem.timeStamp = Date.now();
                storageItem.summary = summary;

                if (VehiclesStorageProvider.updateItem(this.storageType, storageItem)) {
                    return storageItem;
                }
            }
        }

        return null;
    }

    public static addOrUpdateItem(item, summary): VehicleStorageItem {
        if (item) {
            const storageItems: VehicleStorageItem[] = this.getItems(false);
            const storageItem: VehicleStorageItem = storageItems.find((storageItem: VehicleStorageItem) => {
                return storageItem && storageItem.vehicle && storageItem.vehicle.vehicleRef === item.vehicleRef;
            });

            if (storageItem) {
                return this.updateItem(storageItem.id, item, true, summary);
            }
            else {
                // If full, remove the oldest entry
                if (this.isFull()) {
                    let orderedStorageItems = _.sortBy(storageItems, function(orderedStorageItem) { return orderedStorageItem.timeStamp; });
                    let itemId = orderedStorageItems[0]?.index;
    
                    this.removeItem(itemId);
                    this.addItem(itemId, item, summary);
                } else {
                    const index: number = storageItems.indexOf(null);

                    if (!isNullOrEmpty(index) && index >= 0 && index < this.storageMaxSize) {
                        return this.addItem(index, item, summary);
                    }
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

    public static countItems(): number {
        return this.getItems(true).length;
    }

    public static isFull(): boolean {
        return !(this.countItems() < this.storageMaxSize);
    }

    public static isTriggered(): boolean {
        return !(this.countItems() < this.triggerMaxSize);
    }
}