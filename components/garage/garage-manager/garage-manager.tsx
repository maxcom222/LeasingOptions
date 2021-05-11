import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { useRouter } from 'next/router';
import GarageVehicleSelector from '../garage-item/garage-vehicle-selector';
import GarageVehicle from '../garage-item/garage-vehicle';

import _ from 'underscore';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GarageViewModes } from 'enums/GarageViewModes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { VehicleStorageItem } from 'types/VehicleStorageItem';
import { GarageItem } from 'types/GarageItem';
import { isNullOrWhiteSpace } from 'helpers/stringHelper';
import { formatMoney, unformat } from 'helpers/currencyHelper';
import { getQueryParams, getUrl } from 'helpers/urlsHelper';
import { GetVehicleUrl } from 'helpers/urlHelper';
import { CustomOptionsHelper } from 'helpers/customOptionsHelper';
import { GarageStorageHelper } from '../_libs/helpers/garageStorageHelper';
import { GarageService } from 'business-logic/garageService';
import { GetVehicleGarage, GetVehiclePricesDetails } from 'business-logic/vehicleService';

type Props = {
    settings: {
        isInternal: boolean;
        onStateChanged: any;
    }
}

//TODO: consider integration with redux, keeping customOptions state on vehicle component level
const GarageManager: React.FC<Props> = ({ settings }) => {
    const router = useRouter();
    const { register, errors, setValue } = useFormContext();

    const pricesDefaultState = {
        fullMonthlyPrice: "Please Call",
        initialRental: "POA",
        salesCode: "POA",
        monthlyMaintenancePrice: "POA",
        processingFee: "POA",
        extraOptions: [],
        extraOptionsTotal: formatMoney(0),
        p11d: "N/A",
        bikTax: "-"
    };

    const [viewMode, setViewMode] = useState(GarageViewModes.Price);
    const [isCloneAllowed, setIsCloneAllowed] = useState(true);
    const [items, setItems] = useState<GarageItem[]>([
        { idx: 0, id: "", vehicle: null, loadDataTimerId: null },
        { idx: 1, id: "", vehicle: null, loadDataTimerId: null },
        { idx: 2, id: "", vehicle: null, loadDataTimerId: null },
        { idx: 3, id: "", vehicle: null, loadDataTimerId: null }
    ]);

    useEffect(() => {
        const parts = router.asPath.split('?');
        const garageId = parts[1] ? getQueryParams(parts[1].split('&'))["load"] : null;

        if (garageId) {
            GarageStorageHelper.clear();

            GarageService.GetGarage(garageId)
                .then((result: ApiResponse) => {
                    if (result.isSucceed && result.data) {
                        const data = result.data;

                        for (let i = 0; i < data.length; i++) {
                            const item = data[i];

                            if (item) {
                                GarageStorageHelper.addItem(item.index, item.customOptions);
                            }
                        }
                    }

                    initGarageVehicles();
                });
        }
        else {
            initGarageVehicles();
        }
    }, []);

    useEffect(() => {
        if (settings.onStateChanged) {
            settings.onStateChanged(items);
        }
    }, [items]);

    const initGarageVehicles = () => {
        const storageItems: VehicleStorageItem[] = GarageStorageHelper.getItems(false);

        if (storageItems) {
            for (let idx = 0; idx < storageItems.length; idx++) {
                const storageItem: VehicleStorageItem = storageItems[idx];

                showGarageItemVehicle(storageItem);
            }
        }
    }

    const getPrices = (leasingDealType: LeasingDealTypes, originalPrices) => {
        let prices = _.clone(pricesDefaultState);
        prices.processingFee = formatMoney(parseFloat(leasingDealType === LeasingDealTypes.Personal ? process.env.NEXT_PUBLIC_PCH_PROC_FEE : process.env.NEXT_PUBLIC_CH_PROC_FEE));

        if (originalPrices) {
            const hasAllowedPrice = originalPrices.baseMonthlyPrice && originalPrices.baseMonthlyPrice > 0;

            prices.extraOptions = originalPrices.extraOptions || [];
            prices.extraOptionsTotal = formatMoney(originalPrices.extraOptionsTotal);
            prices.p11d = originalPrices.p11D ? formatMoney(originalPrices.p11D) : "N/A";
            prices.bikTax = (originalPrices.bik20Tax && originalPrices.bik40Tax) ? formatMoney(originalPrices.bik20Tax) + "/" + formatMoney(originalPrices.bik40Tax) + " p/m" : "-";

            if (hasAllowedPrice) {
                prices.fullMonthlyPrice = originalPrices.fullMonthlyPrice ? formatMoney(originalPrices.fullMonthlyPrice) : "Please Call";
                prices.initialRental = formatMoney(originalPrices.initialRental);
                prices.salesCode = formatMoney(originalPrices.salesCode);
                prices.monthlyPrice = formatMoney(originalPrices.baseMonthlyPrice);
                prices.monthlyMaintenancePrice = formatMoney(originalPrices.monthlyMaintenancePrice);
            }
        }

        return prices;
    }

    const setGarageItemVehicle = (idx: number, itemId: string, vehicleData: any) => {
        const garageItem = items[idx];

        if (garageItem) {
            setItems((prevState) => {
                const newItems = prevState.map((item, itemIdx) => {
                    if (item && itemIdx === idx && item.idx === idx) {
                        const prices = getPrices(vehicleData.customOptions.leasingDealType, vehicleData.prices);

                        const updatedItem = {
                            ...item,
                            id: itemId,
                            vehicle: {
                                baseDetails: vehicleData.baseDetails,
                                customOptions: vehicleData.customOptions,
                                prices: prices,

                                vehicleOptions: {
                                    specifications: vehicleData.specifications.map(category => ({ name: category.name, options: category.options.map(option => ({ name: option })) })),
                                    technicals: vehicleData.technicals,
                                    extras: vehicleData.extras
                                },

                                availableMileages: vehicleData.availableMileages
                            }
                        };

                        return updatedItem;
                    }

                    return item;
                });

                return newItems;
            });
            setIsCloneAllowed(!GarageStorageHelper.isFull());
        }
    }

    const showGarageItemVehicle = (initData: VehicleStorageItem) => {
        if (initData) {
            const vehicle = initData.vehicle;
            const vehicleRef: number = vehicle.vehicleRef;
            const leasingDealType: LeasingDealTypes = vehicle.leasingDealType;
            const customOptions = {
                term: vehicle.term,
                mileage: vehicle.mileage,
                maintenance: vehicle.maintenance,
                initialRentalMonths: vehicle.initialRentalMonths,
                options: vehicle.options,

                salesCode: vehicle.salesCode,
                ageCategory: vehicle.ageCategory
            };

            GetVehicleGarage(vehicleRef, leasingDealType, customOptions)
                .then((result: ApiResponse) => {
                    if (result.isSucceed && result.data) {
                        let data = result.data;

                        GarageStorageHelper.updateItem(initData.id, data.customOptions, false); //TODO: should we fix options mutations? Might heppen for on internal page for public user (salescode value). Other cases?
                        setGarageItemVehicle(initData.index, initData.id, data);
                    } else {
                        GarageStorageHelper.removeItem(initData.id);
                    }
                });
        }
    }

    const onAdd = (idx: number, item) => {
        if (item) {
            const vehicleRef: number = item.vehicleRef;
            const leasingDealType: LeasingDealTypes = item.leasingDealType;

            GetVehicleGarage(vehicleRef, leasingDealType, null)
                .then((result: ApiResponse) => {
                    if (result.isSucceed && result.data) {
                        let data = result.data;

                        const storageItem: VehicleStorageItem = GarageStorageHelper.addItem(idx, data.customOptions);

                        if (storageItem) {
                            setGarageItemVehicle(storageItem.index, storageItem.id, data);
                        }
                    }
                });
        }
    }

    const onClone = (idx: number) => {
        const garageItem = items[idx];

        if (garageItem && !isNullOrWhiteSpace(garageItem.id) && isCloneAllowed) {
            const itemId: string = garageItem.id;
            const storageItem: VehicleStorageItem = GarageStorageHelper.cloneItem(itemId);

            showGarageItemVehicle(storageItem);
        }
    }

    const onRefresh = (idx: number, id: string, customOptions) => {
        if (customOptions && !isNullOrWhiteSpace(id)) {
            const storageItem: VehicleStorageItem = GarageStorageHelper.updateItem(id, customOptions, false);

            if (storageItem && storageItem.index === idx) {
                const sourceGarageItem = items[idx];

                if (sourceGarageItem) {
                    if (sourceGarageItem.loadDataTimerId) {
                        clearTimeout(sourceGarageItem.loadDataTimerId);
                    }

                    sourceGarageItem.loadDataTimerId = setTimeout(function () {
                        GetVehiclePricesDetails({
                            pricingType: undefined,
                            postcode: undefined,

                            vehicleRef: storageItem.vehicle.vehicleRef,
                            leasingDealType: storageItem.vehicle.leasingDealType,
                            term: storageItem.vehicle.term,
                            mileage: storageItem.vehicle.mileage,
                            maintenance: storageItem.vehicle.maintenance,
                            initialRentalMonths: storageItem.vehicle.initialRentalMonths,
                            options: storageItem.vehicle.options,
                            salesCode: storageItem.vehicle.salesCode,
                            ageCategory: storageItem.vehicle.ageCategory
                        }).then((result: ApiResponse) => {
                            let data = null;

                            if (result.isSucceed && result.data) {
                                data = result.data;
                            }

                            setItems((prevState) => {
                                const newItems = prevState.map((item, itemIdx) => {
                                    if (item && itemIdx === idx && item.idx === idx && item.id === id) {
                                        const prices = getPrices(customOptions.leasingDealType, data);

                                        const updatedItem = {
                                            ...item,
                                            vehicle: {
                                                ...item.vehicle,
                                                customOptions,
                                                prices
                                            }
                                        };

                                        return updatedItem;
                                    }

                                    return item;
                                });

                                return newItems;
                            });
                        });
                    }, 200);
                }
            }
        }
    }

    const onRemove = (idx: number) => {
        const garageItem = items[idx];

        if (garageItem && !isNullOrWhiteSpace(garageItem.id)) {
            const itemId = garageItem.id;

            if (GarageStorageHelper.removeItem(itemId)) {
                setItems((prevState) => {
                    const newItems = prevState.map((item, itemIdx) => {
                        if (item && itemIdx === idx && item.idx === idx && item.id === itemId) {
                            const updatedItem = {
                                ...item,
                                id: "",
                                vehicle: null
                            };

                            return updatedItem;
                        }

                        return item;
                    });

                    return newItems;
                });
                setIsCloneAllowed(!GarageStorageHelper.isFull());
            }
        }
    }

    const onEnquire = (idx: number) => {
        //TODO: add check if enquiry is allowed? Hide enquiry button if not
        const garageItem = items[idx];

        if (garageItem && garageItem.vehicle) {
            const vehicleData = garageItem.vehicle.baseDetails;
            const customOptions = garageItem.vehicle.customOptions;

            CustomOptionsHelper.storeVehicleCustomOptions(customOptions);

            const url = getUrl(GetVehicleUrl(false, null, customOptions.leasingDealType, vehicleData.manufacturer, vehicleData.shortModel,
                vehicleData.model, vehicleData.derivative, customOptions.vehicleRef), ["showordermodal=1"]);

            router.push(url);
        }
    }

    const handlePriceInput = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        setValue(name, value ? formatMoney(unformat(value)) : null);
    }

    return (
        <div>
            <div className="row">
                <div className="col-24">
                    <div className="w-100 bg-blue text-white text-center h2 mb-0 py-3">Compare by</div>
                    <div className="w-100 bg-light-grey p-3 d-md-flex flex-md-nowrap">
                        <button className={`w-100 d-block d-md-inline-flex justify-content-center btn btn-fluid h3 py-3 py-md-2 mb-0 text-dark-grey ${viewMode === GarageViewModes.Price ? "is-active" : ""}`} onClick={() => setViewMode(GarageViewModes.Price)}>Price</button>
                        <button className={`w-100 d-block d-md-inline-flex justify-content-center btn btn-fluid h3 py-3 py-md-2 mb-0 text-dark-grey ${viewMode === GarageViewModes.Specification ? "is-active" : ""}`} onClick={() => setViewMode(GarageViewModes.Specification)}>Specification</button>
                        <button className={`w-100 d-block d-md-inline-flex justify-content-center btn btn-fluid h3 py-3 py-md-2 mb-0 text-dark-grey ${viewMode === GarageViewModes.Technical ? "is-active" : ""}`} onClick={() => setViewMode(GarageViewModes.Technical)}>Technical</button>
                        <button className={`w-100 d-block d-md-inline-flex justify-content-center btn btn-fluid h3 py-3 py-md-2 mb-0 text-dark-grey ${viewMode === GarageViewModes.Extras ? "is-active" : ""}`} onClick={() => setViewMode(GarageViewModes.Extras)}>Add Optional Exras</button>
                    </div>
                </div>
            </div>
            {settings.isInternal ?
                (
                    <>
                        <div className="row my-3">
                            <div className="col-24"><strong>Not Maintained Processing Fee</strong></div>
                            <div className="col-sm-8 form-group">
                                Personal<br />
                                <input type="text" className="form-control" name="fees.notMaintained.personal" onBlur={handlePriceInput} ref={register} />
                            </div>
                            <div className="col-sm-8 form-group">
                                Business<br />
                                <input type="text" className="form-control" name="fees.notMaintained.business" onBlur={handlePriceInput} ref={register} />
                            </div>
                            <div className="col-sm-8 form-group">
                                Van<br />
                                <input type="text" className="form-control" name="fees.notMaintained.van" onBlur={handlePriceInput} ref={register} />
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-24"><strong>Maintained Processing Fee</strong></div>
                            <div className="col-sm-8 form-group">
                                Personal<br />
                                <input type="text" className="form-control" name="fees.maintained.personal" onBlur={handlePriceInput} ref={register} />
                            </div>
                            <div className="col-sm-8 form-group">
                                Business<br />
                                <input type="text" className="form-control" name="fees.maintained.business" onBlur={handlePriceInput} ref={register} />
                            </div>
                            <div className="col-sm-8 form-group">
                                Van<br />
                                <input type="text" className="form-control" name="fees.maintained.van" onBlur={handlePriceInput} ref={register} />
                            </div>
                        </div>
                    </>
                ) : null
            }
            <div className="row my-3 my-md-5">
                {items.map(item => (
                    <div className="col-24 col-md-12 col-lg-6 mb-3 mb-lg-0" key={item.idx}>
                        {item.vehicle ?
                            (<GarageVehicle
                                idx={item.idx}
                                id={item.id}
                                baseDetails={item.vehicle.baseDetails}
                                customOptions={item.vehicle.customOptions}
                                prices={item.vehicle.prices}
                                vehicleOptions={item.vehicle.vehicleOptions}
                                settings={{
                                    isInternal: settings.isInternal,
                                    useBlackFridayTheme: process.env.NEXT_PUBLIC_BLACK_FRIDAY_THEME === 'true',
                                    viewMode: viewMode,
                                    isCloneAllowed: isCloneAllowed,
                                    availableMileages: item.vehicle.availableMileages,
                                    onRefresh: onRefresh,
                                    onClone: onClone,
                                    onRemove: onRemove,
                                    onEnquire: onEnquire
                                }}
                            />) :
                            (<GarageVehicleSelector
                                idx={item.idx}
                                settings={{
                                    onSelect: onAdd
                                }}
                            />)
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GarageManager;