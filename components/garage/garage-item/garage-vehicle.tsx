import React, { useState, useEffect, useContext } from 'react';
import OptionsAccordion from './garage-vehicle-options-accordion';
import InternalVehicleManualDetails from './garage-vehicle-manual-details';
import ModalContext from 'components/HOCs/modal/modalContext';
import VehicleExtarOptionsConfirmModal from 'components/vehicle/vehicle-extra-options-confirm-modal';
import PopOver from '../../layout/popover';
import style from './garage-item.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faInfoCircle } from "@fortawesome/pro-regular-svg-icons";
import { faTimes } from "@fortawesome/pro-light-svg-icons";

import _ from 'underscore';
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { GarageViewModes } from 'enums/GarageViewModes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { ExtraOptionAction } from 'types/components/vehicle-options/ExtraOptionAction';
import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { ExtraOptionsManagerState } from 'types/components/vehicle-options/ExtraOptionsManagerState';
import { ExtraOptionRelationship } from 'types/vehicle-options/ExtraOptionRelationship';
import { ExtraOptionState } from 'types/components/vehicle-options/ExtraOptionState';
import { VehicleManualDetails } from 'types/internal/VehicleManualDetails';
import { GetVATText, isIzmoImage } from 'helpers/helpers';
import { formatNumber, formatMoney } from 'helpers/currencyHelper';
import { getVehicleMonthlyPrice } from 'helpers/vehiclePricingHelper';
import { GetLeasingDealText } from 'helpers/enumsHelper';
import { VehicleExtraOptionsHelper } from 'components/vehicle/_libs/helpers/VehicleExtraOptionsHelper';
import { VehicleExtraOptionsManager } from 'components/vehicle/_libs/VehicleExtraOptionsManager';

type Props = {
    idx: number;
    id: string;

    baseDetails: any;
    customOptions: any;
    prices: any;

    vehicleOptions: {
        specifications: any;
        technicals: any;
        extras: any;
    }

    settings: {
        isInternal: boolean;
        useBlackFridayTheme: boolean;
        viewMode: GarageViewModes;
        isCloneAllowed: boolean;
        availableMileages: number[];
        onRefresh: any;
        onClone: any;
        onRemove: any;
        onEnquire: any;
    }
}

//TODO: show progres indicator while data being loaded
const GarageVehicle: React.FC<Props> = ({ idx, id, baseDetails, customOptions, prices, vehicleOptions, settings }) => {
    const imageKey = baseDetails.imageUrl || "/website/static/img-placeholder.jpg";
    const imageUrl = process.env.NEXT_PUBLIC_CDN + "/fit-in/570x380" + (imageKey[0] === "/" ? "" : "/") + imageKey;
    const hasExtraOptions = prices.extraOptions && prices.extraOptions.length > 0;
    const modalContext = useContext(ModalContext);

    const maintenanceEnabled = settings.isInternal || true;
    const terms = [2, 3, 4];
    const initialRentalMonths = [1, 3, 6, 9, 12];
    let top3MileageItems = [];

    if (settings.availableMileages && settings.availableMileages.length > 0) {
        if (settings.availableMileages.length <= 3) {
            Array.prototype.push.apply(top3MileageItems, settings.availableMileages);
        }
        else {
            Array.prototype.push.apply(top3MileageItems, customOptions.leasingDealType === LeasingDealTypes.Van ? [8000, 10000, 12000] : [5000, 8000, 10000]);
        }
    }

    const [extraOptions, setExtraOptions] = useState<ExtraOption[]>([]);
    const [extraOptionsRelationships, setExtraOptionsRelationships] = useState<ExtraOptionRelationship[]>([]);
    const [extraOptionsStates, setExtraOptionsStates] = useState<ExtraOptionState[]>([]);
    const [interiorColors, setInteriorColors] = useState<ExtraOption[]>([]);
    const [exteriorColors, setExteriorColors] = useState<ExtraOption[]>([]);
    const [manualDetails, setManualDetails] = useState<VehicleManualDetails>({
        maintenance: null,

        monthlyPrice: null,
        monthlyMaintenancePrice: null,
        initialRentalPrice: null,

        exteriorColor: null,
        interiorColor: null
    });
    const [selectedColors, setSelectedColors] = useState({
        interiorColor: { id: null, name: null },
        exteriorColor: { id: null, name: null }
    });
    const [changeColorDump, setChangeColorDump] = useState(null);

    //TODO: Remove code duplication with vehicle page
    useEffect(() => {
        let optionsList: ExtraOption[] = [];
        let relationshipsList: ExtraOptionRelationship[] = [];
        let optiosStatesList: ExtraOptionState[] = [];

        //TODO: set colors only internaly?
        let interiorColorsList: ExtraOption[] = [];
        let exteriorColorsList: ExtraOption[] = [];

        if (baseDetails.optionsIsSelectable) {
            if (vehicleOptions.extras) {
                const optionCategories = vehicleOptions.extras.options || [];
                const relationships = vehicleOptions.extras.relationships || [];

                let interiorColorCategories = [81, 82, 83, 84, 86, 90, 97, 110, 109];
                let exteriorColorCategories = [44, 45, 73, 74, 75, 76, 103, 104, 105, 106, 107, 108];

                optionCategories.forEach(function (category) {
                    let isInteriorColorsCategory = _.contains(interiorColorCategories, category.code);
                    let isExteriorColorsCategory = _.contains(exteriorColorCategories, category.code);

                    category.options.forEach(function (option) {
                        let optionRelationshipIds: number[] = _.pluck(_.filter(relationships,
                            function (relationship) {
                                return relationship && _.contains(VehicleExtraOptionsHelper.allowedRelationshipTypes, relationship.type) &&
                                    relationship.options && _.find(relationship.options, function (relationshipOption) {
                                        return relationshipOption.id === option.code;
                                    });
                            }), "id");

                        let extraOption: ExtraOption = {
                            id: option.code,
                            name: option.name,
                            price: option.price,
                            linkedRelationshipIds: optionRelationshipIds
                        };

                        optionsList.push(extraOption);

                        if (isInteriorColorsCategory) {
                            interiorColorsList.push(extraOption);
                        }

                        if (isExteriorColorsCategory) {
                            exteriorColorsList.push(extraOption);
                        }
                    });
                });

                relationships.forEach(function (relationship) {
                    let result: ExtraOptionRelationship = {
                        id: relationship.id,
                        type: relationship.type,
                        primaryOptionIds: _.pluck(_.filter(relationship.options, function (option) { return option.isPrimary; }), "id"),
                        regularOptionIds: _.pluck(_.filter(relationship.options, function (option) { return !option.isPrimary; }), "id"),
                        mirrorRelationshipIds: relationship.mirrorRelationshipIds
                    };

                    relationshipsList.push(result);
                });
            }

            optiosStatesList = VehicleExtraOptionsHelper.getOptionsStates(customOptions.options, relationshipsList);
        }

        setExtraOptions(optionsList);
        setInteriorColors(interiorColorsList);
        setExteriorColors(exteriorColorsList);
        setExtraOptionsRelationships(relationshipsList);
        setExtraOptionsStates(optiosStatesList);
    }, [baseDetails, customOptions, vehicleOptions]);

    useEffect(() => {
        let exteriorColor = { id: null, name: null };
        let interiorColor = { id: null, name: null };

        const exteriorColorOption = getColorExtraOption(0, customOptions.options);

        if (exteriorColorOption) {
            exteriorColor.id = exteriorColorOption.id;
            exteriorColor.name = exteriorColorOption.name;
        }
        else {
            if (changeColorDump && changeColorDump.type === "exteriorColor" && (!changeColorDump.newId || changeColorDump.newId === 1000)) {
                exteriorColor.id = changeColorDump.newId;
                exteriorColor.name = changeColorDump.newId === 1000 ? "TBC" : null;
            }
        }

        const interiorColorOption = getColorExtraOption(1, customOptions.options);

        if (interiorColorOption) {
            interiorColor.id = interiorColorOption.id;
            interiorColor.name = interiorColorOption.name;
        }
        else {
            if (changeColorDump && changeColorDump.type === "interiorColor" && (!changeColorDump.newId || changeColorDump.newId === 1000)) {
                interiorColor.id = changeColorDump.newId;
                interiorColor.name = changeColorDump.newId === 1000 ? "TBC" : null;
            }
        }

        setSelectedColors((prevState) => {
            let updatedValues = {
                interiorColor: interiorColor,
                exteriorColor: exteriorColor
            };

            return { ...prevState, ...updatedValues };
        });
        setChangeColorDump(null);
    }, [interiorColors, exteriorColors, customOptions.options]);

    useEffect(() => {
        setManualDetails((prevState) => {
            let updatedValues = {
                maintenance: customOptions.maintenance,

                monthlyPrice: prices.monthlyPrice,
                monthlyMaintenancePrice: prices.monthlyMaintenancePrice,
                initialRentalPrice: prices.initialRental,

                exteriorColor: selectedColors.exteriorColor.id,
                interiorColor: selectedColors.interiorColor.id
            };

            return { ...prevState, ...updatedValues };
        });
    }, [prices, selectedColors]);

    const setOptions = (name, value) => {
        if (settings.onRefresh && customOptions && customOptions[name] !== value) {
            let updatedValues = {};
            updatedValues[name] = value;

            settings.onRefresh(idx, id, { ...customOptions, ...updatedValues });
        }
    }

    const handleClone = () => {
        if (settings.isCloneAllowed && settings.onClone) {
            settings.onClone(idx);
        }
    }

    const handleRemove = () => {
        if (settings.onRemove) {
            settings.onRemove(idx);
        }
    }

    const handleEnquire = () => {
        //TODO: add check if enquiry is allowed? Hide enquiry button if not
        if (settings.onEnquire) {
            settings.onEnquire(idx);
        }
    }

    const processOption = (optionToProcess: ExtraOptionAction) => {
        if (optionToProcess) {
            let optionsToProcess: ExtraOptionAction[] = [optionToProcess];

            let manager = new VehicleExtraOptionsManager();
            manager.init(extraOptions, extraOptionsRelationships);

            let managerState: ExtraOptionsManagerState = manager.processOptions(optionsToProcess, null, customOptions.options, extraOptionsStates);

            if (managerState) {
                if (managerState.silentlySelectedOptionIds) {
                    if (settings.onRefresh && customOptions) {
                        let updatedValues = {
                            options: managerState.selectedOptionIds || []
                        };

                        settings.onRefresh(idx, id, { ...customOptions, ...updatedValues });
                    }
                }

                if (managerState.confirmRelationshipIds && managerState.confirmRelationshipIds.length > 0) {
                    modalContext.showModal(VehicleExtarOptionsConfirmModal,
                        {
                            show: true,
                            title: "+ Optional Extras",
                            data: {
                                extraOptions: extraOptions.map(item => {
                                    let result: ExtraOption = {
                                        id: item.id,
                                        name: item.name,
                                        price: getVehicleMonthlyPrice(customOptions.leasingDealType, item.price, customOptions.term, customOptions.initialRentalMonths),
                                        linkedRelationshipIds: item.linkedRelationshipIds
                                    };

                                    return result;
                                }),
                                extraOptionsRelationships: extraOptionsRelationships
                            },
                            options: {
                                leasingDealType: customOptions.leasingDealType
                            },
                            initialState: managerState,
                            settings: {
                                onCancel: () => {
                                    setSelectedColors((prevState) => {
                                        return { ...prevState };
                                    });
                                    setChangeColorDump(null);
                                },
                                onApply: (confirmedState: ExtraOptionsManagerState) => {
                                    if (confirmedState) {
                                        if (settings.onRefresh && customOptions) {
                                            let updatedValues = {
                                                options: confirmedState.selectedOptionIds || []
                                            };

                                            settings.onRefresh(idx, id, { ...customOptions, ...updatedValues });
                                        }

                                        if (confirmedState.optionsStates) {
                                            setExtraOptionsStates(confirmedState.optionsStates);
                                        }
                                    }
                                }
                            }
                        });
                }
            }
        }
    }

    //TODO: Remove code duplication with vehicle page
    const handleExtraOptionClick = (option) => {
        if (option && baseDetails.optionsIsSelectable) {
            option.id = option.code;

            let optionToProcess: ExtraOptionAction = VehicleExtraOptionsHelper.getOptionAction(option, customOptions.options || []);

            processOption(optionToProcess);
        }
    }

    //TODO: Remove code duplication with vehicle page
    const onTryChangeColor = (type: string, prevId: number, newId: number) => {
        let optionToProcess: ExtraOptionAction = null;

        if (newId && newId !== 1000) {
            optionToProcess = {
                id: newId,
                selectionRequiredBy: [0],
                deselectionRequiredBy: []
            };
        }
        else if (prevId && prevId !== 1000) {
            optionToProcess = {
                id: prevId,
                selectionRequiredBy: [],
                deselectionRequiredBy: [0]
            };
        }

        if (optionToProcess) {
            setChangeColorDump({
                type: type,
                prevId: prevId,
                newId: newId
            });
            processOption(optionToProcess);
        }
        else {
            setSelectedColors((prevState) => {
                let updatedValues = {};

                updatedValues[type] = { id: newId, name: null };

                return { ...prevState, ...updatedValues };
            });
        }
    }

    const getExtraOptionsToDisplay = (data: any) => {
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

    const getColorExtraOption = (colorType: number, selectedOptionIds: number[]): ExtraOption => {
        let result: ExtraOption = null;

        if (selectedOptionIds && selectedOptionIds.length > 0) {
            let colorOptions: ExtraOption[] = [];

            switch (colorType) {
                case 0://exterior
                    colorOptions = exteriorColors;
                    break;
                case 1://interior
                    colorOptions = interiorColors;
                    break;
            }

            if (colorOptions && colorOptions.length > 0) {
                result = _.find(colorOptions, function (item: ExtraOption) {
                    return _.contains(selectedOptionIds, item.id);
                });
            }
        }

        return result;
    }

    return (
        <div className={`${style['garage-column']} w-100 box box--thick bg-white p-3 py-md-4`}>
            <div className={`${style['garage-column__header']} w-100 d-flex justify-content-between align-items-center mb-3`}>Compare <span>{settings.isCloneAllowed ? <FontAwesomeIcon width="22" height="22" icon={faCopy} onClick={handleClone} /> : ''} <FontAwesomeIcon width="30" height="30" icon={faTimes} onClick={handleRemove} /></span>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24">
                    <img alt={`${baseDetails.manufacturer} ${baseDetails.model} ${baseDetails.derivative}`} className={`img-fluid lazyload ${isIzmoImage(imageUrl) ? 'izmo-image' : 'nonizmopaddingfix'}`} data-src={imageUrl} />
                </div>
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <span className="d-block">{baseDetails.manufacturer} {baseDetails.model}</span>
                    <small className="d-block">{baseDetails.derivative}</small>
                </div>
            </div>
            {(settings.viewMode === GarageViewModes.Price || settings.viewMode === GarageViewModes.Extras) ?
                (
                    <div className="w-100 position-relative">
                        <div className={`row ${style['garage-column__row']}`}>
                            <div className="col-12 py-3">{GetLeasingDealText(customOptions.leasingDealType)} Lease<br />Per month<br />{GetVATText(customOptions.leasingDealType)}</div>
                            <div className="col-12 py-3 pl-0 text-right vehicle-price">{prices.fullMonthlyPrice}</div>
                        </div>
                        <div className={`row ${style['garage-column__row']}`}>
                            <div className="col-10 py-3">Initial Rental <PopOver id="rental-popover" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="Your first payment is calculated in multiples of your monthly rental. Choosing a larger initial rental makes your monthly payments smaller. This is part of your contract and is not a deposit. It is non-refundable and is usually taken within 14 days of your vehicle being delivered." /></div>
                            <div className="col-14 py-3 text-right">{prices.initialRental} {GetVATText(customOptions.leasingDealType)}</div>
                            <div className="col-11 pb-3">Processing Fee</div>
                            <div className="col-13 pb-3 text-right">{prices.processingFee} {GetVATText(customOptions.leasingDealType)}</div>
                        </div>
                        <div className={`row ${style['garage-column__row']}`}>
                            <div className="col-24 py-3">+ Optional extras <PopOver id="extras-popover" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="You can factory fit optional extras to this vehicle" /></div>
                        </div>
                        {hasExtraOptions ?
                            (
                                <>
                                    {/*TODO: do not use idx for key*/}
                                    {prices.extraOptions.map((item, idx) =>
                                        (
                                            <div className={`row ${style['garage-column__row']}`} key={idx}>
                                                <div className="col-13 pb-3">{item.name}</div>
                                                <div className="col-11 pb-3 text-right">{formatMoney(item.price)} {GetVATText(customOptions.leasingDealType)}</div>
                                            </div>
                                        ))
                                    }
                                </>
                            ) : null
                        }
                        {!hasExtraOptions ?
                            (
                                <div className={`row ${style['garage-column__row']}`}>
                                    <div className="col-11 pb-3">None Added</div>
                                    <div className="col-13 pb-3 text-right">{formatMoney(0)} {GetVATText(customOptions.leasingDealType)}</div>
                                </div>
                            ) : null
                        }
                        {(maintenanceEnabled && customOptions.maintenance) ?
                            (
                                <div className={`row ${style['garage-column__row']}`}>
                                    <div className="col-11 py-3">Maintenance</div>
                                    <div className="col-13 py-3 text-right">{prices.monthlyMaintenancePrice}</div>
                                </div>
                            ) : null
                        }
                        {(settings.isInternal) ?
                            (
                                <div className={`row ${style['garage-column__row']}`}>
                                    <div className="col-11 py-3">Sales Code</div>
                                    <div className="col-13 py-3 text-right">{prices.salesCode}</div>
                                </div>
                            ) : null
                        }
                    </div>
                ) : null
            }
            <div className="w-100 position-relative" hidden={settings.viewMode !== GarageViewModes.Price}>
                <div className={`row ${style['garage-column__row']}`}>
                    <div className="col-24 py-3">
                        <label>Contract Type</label>
                        {baseDetails.vehicleType === VehicleTypes.Commercial ?
                            (
                                <ul className={`${style['chck-buttons']} ${settings.useBlackFridayTheme ? 'chck-buttons--bf' : ''}`}>
                                    <li><button className={`${style['chck-btn']} ${style['active']}`}>Van</button></li>
                                </ul>
                            ) : null
                        }
                        {baseDetails.vehicleType !== VehicleTypes.Commercial ?
                            (
                                <ul className={`${style['chck-buttons']} ${settings.useBlackFridayTheme ? 'chck-buttons--bf' : ''}`}>
                                    <li><button onClick={() => setOptions("leasingDealType", LeasingDealTypes.Business)} className={`${style['chck-btn']} ${customOptions.leasingDealType === LeasingDealTypes.Business ? style['active'] : ''}`}>Business</button></li>
                                    <li><button onClick={() => setOptions("leasingDealType", LeasingDealTypes.Personal)} className={`${style['chck-btn']} ${customOptions.leasingDealType === LeasingDealTypes.Personal ? style['active'] : ''}`}>Personal</button></li>
                                </ul>
                            ) : null
                        }
                    </div>
                </div>
                <div className={`row ${style['garage-column__row']}`}>
                    <div className="col-24 py-3">
                        <label>Contract Length</label>
                        <ul className={`${style['chck-buttons']} ${settings.useBlackFridayTheme ? 'chck-buttons--bf' : ''} ${style['chck-buttons--x3']}`}>
                            {terms.map(item =>
                                (
                                    <li key={`rental-${item}`}>
                                        <button onClick={() => setOptions("term", item)} className={`${style['chck-btn']} ${customOptions.term === item ? style['active'] : ''}`}>{item} Years</button>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className={`row ${style['garage-column__row']}`}>
                    <div className="col-24 py-3">
                        <label>Annual Mileage</label>
                        {(top3MileageItems && top3MileageItems.length > 0) ?
                            (
                                <>
                                    <ul className={`${style['chck-buttons']} ${settings.useBlackFridayTheme ? 'chck-buttons--bf' : ''} ${style['chck-buttons--x3']}`}>
                                        {top3MileageItems.map(item =>
                                            (
                                                <li key={`button-${item}`}>
                                                    <button onClick={() => setOptions("mileage", item)} className={`${style['chck-btn']} ${customOptions.mileage === item ? style['active'] : ''}`}>{formatNumber(item)}</button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    {settings.availableMileages.length > 3 ?
                                        (
                                            <select className="form-control" onChange={(evt) => setOptions("mileage", parseInt(evt.currentTarget.value))} value={customOptions.mileage}>
                                                {settings.availableMileages.map(item =>
                                                    <option key={`mileage-${item}`} value={item}>{formatNumber(item)}</option>
                                                )}
                                            </select>
                                        ) : null
                                    }
                                </>
                            ) : null
                        }
                    </div>
                </div>
                <div className={`row ${style['garage-column__row']}`}>
                    <div className="col-24 py-3">
                        <label>Inital Rental <PopOver id="rental-popover" trigger={<FontAwesomeIcon width="16" height="16" icon={faInfoCircle} />} body="Your first payment is calculated in multiples of your monthly rental. Choosing a larger initial rental makes your monthly payments smaller. This is part of your contract and is not a deposit. It is non-refundable and is usually taken within 14 days of your vehicle being delivered." /></label>
                        <ul className={`${style['chck-buttons']} ${settings.useBlackFridayTheme ? 'chck-buttons--bf' : ''}`}>
                            {initialRentalMonths.map(item =>
                                (
                                    <li key={`rental-${item}`}>
                                        <button onClick={() => setOptions("initialRentalMonths", item)} className={`${style['chck-btn']} ${customOptions.initialRentalMonths === item ? style['active'] : ''}`}>{item} Rental{item !== 1 ? "s" : ""}</button>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                {maintenanceEnabled ?
                    (
                        <div className={`row ${style['garage-column__row']}`}>
                            <div className="col-24 py-3">
                                <label>Monthly Maintenance Package</label>
                                <ul className={`${style['chck-buttons']} ${settings.useBlackFridayTheme ? 'chck-buttons--bf' : ''}`}>
                                    <li>
                                        <button onClick={() => setOptions("maintenance", false)} className={`${style['chck-btn']} ${!customOptions.maintenance ? style['active'] : ''}`}>No</button>
                                    </li>
                                    {baseDetails.hasMaintenance ?
                                        (
                                            <li>
                                                <button onClick={() => setOptions("maintenance", true)} className={`${style['chck-btn']} ${customOptions.maintenance ? style['active'] : ''}`}>Yes</button>
                                            </li>
                                        ) : null
                                    }
                                </ul>
                            </div>
                        </div>
                    ) : null
                }
                {settings.isInternal ?
                    (
                        <>
                            <div className={`row ${style['garage-column__row']}`}>
                                <div className="col-24 py-3">
                                    <label>Additional Sales Code</label>
                                    <select className="form-control" value={customOptions.salesCode || 0} onChange={(evt) => setOptions("salesCode", parseInt(evt.currentTarget.value))}>
                                        <option value={0}>£0</option>
                                        <option value={100}>£100</option>
                                        <option value={200}>£200</option>
                                        <option value={300}>£300</option>
                                        <option value={400}>£400</option>
                                        <option value={500}>£500</option>
                                        <option value={750}>£750</option>
                                        <option value={1000}>£1000</option>
                                    </select>
                                </div>
                            </div>
                            <InternalVehicleManualDetails
                                idx={idx}
                                data={manualDetails}
                                settings={{
                                    interiorColors: interiorColors,
                                    exteriorColors: exteriorColors,
                                    onTryChangeColor: onTryChangeColor
                                }}
                            />
                        </>
                    ) : null
                }
            </div>
            <div className="w-100 position-relative" hidden={settings.viewMode !== GarageViewModes.Specification}>
                <OptionsAccordion data={vehicleOptions.specifications} />
            </div>
            <div className="w-100 position-relative" hidden={settings.viewMode !== GarageViewModes.Technical}>
                <OptionsAccordion data={vehicleOptions.technicals} />
            </div>
            <div className="w-100 position-relative" hidden={settings.viewMode !== GarageViewModes.Extras}>
                <OptionsAccordion
                    data={getExtraOptionsToDisplay(vehicleOptions.extras.options)}
                    settings={{
                        optionsSelectAllowed: baseDetails.optionsIsSelectable,
                        onOptionClick: handleExtraOptionClick
                    }}
                />
            </div>
            <div className={`row ${style['garage-column__row']}`}>
                <div className="col-24 py-3">
                    <button className="btn btn-primary btn-lg btn-block" onClick={handleEnquire}>Enquire On This Deal</button>
                </div>
            </div>
        </div>
    );
}

export default GarageVehicle;