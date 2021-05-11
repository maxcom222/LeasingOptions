import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import VehicleOptionsTabContent from '../vehicle-options-tab-content';

import _ from 'underscore';
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { ExtraOptionState } from 'types/components/vehicle-options/ExtraOptionState';
import { VehicleExtraOptionsHelper } from '../_libs/helpers/VehicleExtraOptionsHelper';
import { getVehicleMonthlyPrice } from 'helpers/vehiclePricingHelper';
import { GetTechOptions, GetSpecOptions, GetExtraOptions } from 'business-logic/vehicleService';


type Props = {
    vehicleType: VehicleTypes;
    capId: number;
    options?: {
        leasingDealType: LeasingDealTypes;
        term: number;
        initialRentalMonths: number;
        options: number[];
        optionsStates: ExtraOptionState[]
    };
    settings: {
        visibleItems?: string[];
        searchAllowed: boolean;
        optionsSelectAllowed: boolean;
        onOptionClick?: any;
        onOptionsDataLoaded?: any;
    }
}

const VehicleOptionsTabs: React.FC<Props> = ({ vehicleType, capId, options, settings }) => {
    const visibleItems = (settings.visibleItems && settings.visibleItems.length > 0) ? settings.visibleItems : ["technical", "equipment", "extras"];

    const [key, setKey] = useState('technical');
    const [keyOptions, setKeyOptions] = useState([
        { id: "technical", title: "Technical", data: null, isDataLoading: false },
        { id: "equipment", title: "Equipment", data: null, isDataLoading: false },
        { id: "extras", title: "Add Extras", data: null, isDataLoading: false }
    ]);

    useEffect(() => {
        //maybe load extras only if initial custom options state has selected extra options?
        if (visibleItems.includes("extras")) {
            loadOptions("extras");
        }
    }, []);

    useEffect(() => {
        let optionsType: string = key;
        loadOptions(optionsType);
    }, [key]);

    const updateKeyOptionsItem = (id: string, data, isDataLoading: boolean) => {
        if (id) {
            setKeyOptions((prevState) => {
                const newKeyOptions = prevState.map((item) => {
                    if (item.id === id) {
                        const updatedItem = {
                            ...item,
                            data: data && Array.isArray(data) ? data : null,
                            isDataLoading: isDataLoading
                        };

                        return updatedItem;
                    }

                    return item;
                });

                return newKeyOptions;
            });
        }
    }

    const loadOptions = (optionsType: string) => {
        let keyOptionsItem = keyOptions.find(function (item) { return item.id === optionsType; });

        if (keyOptionsItem) {
            if (!keyOptionsItem.data && !keyOptionsItem.isDataLoading) {
                let dataLoadMethod = null;

                switch (optionsType) {
                    case "technical":
                        dataLoadMethod = GetTechOptions;
                        break;
                    case "equipment":
                        dataLoadMethod = GetSpecOptions;
                        break;
                    case "extras":
                        dataLoadMethod = GetExtraOptions;
                        break;
                }

                if (dataLoadMethod) {
                    updateKeyOptionsItem(keyOptionsItem.id, keyOptionsItem.data, true);

                    dataLoadMethod(vehicleType, capId)
                        .then((result: ApiResponse) => {
                            let originalData = null;
                            let data = null;

                            if (result.isSucceed && result.data) {
                                originalData = result.data;

                                if (keyOptionsItem.id === "technical") {
                                    data = originalData;
                                }
                                else if (keyOptionsItem.id === "equipment" && Array.isArray(originalData)) {
                                    data = originalData.map(x => ({ name: x.name, options: x.options.map(x => ({ name: x })) }));
                                }
                                else if (keyOptionsItem.id === "extras") {
                                    data = originalData.options;
                                }
                            }

                            updateKeyOptionsItem(keyOptionsItem.id, data, false);

                            if (settings.onOptionsDataLoaded) {
                                settings.onOptionsDataLoaded(keyOptionsItem.id, originalData);
                            }
                        });
                }
            }
        }
    }

    const getOptionsToDisplay = (type: string, data: any) => {
        if (type === "extras" && data && options) {
            let customOptions = options;

            return data.map(categoryItem => {
                let resultCategory = {
                    code: categoryItem.code,
                    name: categoryItem.name,
                    options: categoryItem.options.map(optionItem => {
                        let resultOption = {
                            code: optionItem.code,
                            name: optionItem.name,
                            price: getVehicleMonthlyPrice(customOptions.leasingDealType, optionItem.price, customOptions.term, customOptions.initialRentalMonths),
                            isSelected: customOptions.options.includes(optionItem.code)
                        };

                        resultOption.price = VehicleExtraOptionsHelper.getOptionPrice({
                            id: resultOption.code,
                            price: resultOption.price,
                            name: "",
                            linkedRelationshipIds: []
                        }, customOptions.optionsStates);

                        return resultOption;
                    }),
                    isSelected: false
                };

                resultCategory.isSelected = _.some(resultCategory.options || [], function (item) { return item.isSelected; });

                return resultCategory;
            });
        }

        return data;
    }

    const getVisibleTabs = () => {
        let result = keyOptions.filter(item => visibleItems.includes(item.id));

        return result || [];
    }

    return (
        <>
            <h2 className="h1 mb-5">Technical specification and additional options</h2>
            <div className="option-tabs">
                <Tabs id="options-tabs" defaultActiveKey="technical" onSelect={(k) => setKey(k)}>
                    {getVisibleTabs().map(item => (
                        <Tab key={item.id} eventKey={item.id} title={item.title}>
                            <VehicleOptionsTabContent
                                type={item.id}
                                data={getOptionsToDisplay(item.id, item.data)}
                                isLoading={item.isDataLoading}
                                settings={{
                                    searchAllowed: settings.searchAllowed,
                                    optionsSelectAllowed: settings.optionsSelectAllowed,
                                    onOptionClick: settings.onOptionClick
                                }}
                            />
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </>
    );
}

export default VehicleOptionsTabs;