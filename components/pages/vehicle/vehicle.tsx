import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useForm, FormContext } from "react-hook-form";
import VehicleShortInfo from 'components/vehicle/vehicle-short-info';
import VehicleInfo from 'components/vehicle/vehicle-info/';
import VehicleImageGalleryTabs from 'components/vehicle/vehicle-image-gallery-tabs';
import VehicleKeyInfo from 'components/vehicle/vehicle-key-info';
import VehicleFeatures from 'components/vehicle/vehicle-features';
import VehicleSummary from 'components/vehicle/vehicle-summary';
import VehicleOptionsTabs from 'components/vehicle/vehicle-options-tabs';
import VehicleSlideup from 'components/vehicle/vehicle-slideup';
import TrustBox from 'components/trustpilot/trust-box';
import ModalContext from 'components/HOCs/modal/modalContext';
import ModalGarage from 'components/layout/modal-garage';
import VehicleExtarOptionsConfirmModal from 'components/vehicle/vehicle-extra-options-confirm-modal';
import VehicleQuoteEnquiryModal from 'components/vehicle/vehicle-quote-enquiry-modal';
import VehicleAdditionalTaxModal from 'components/vehicle/vehicle-additional-tax-modal';
import VehiclePricingMatrixModal from 'components/layout/vehicle-pricing-matrix-modal';
import VehicleErrorFeedbackModal from 'components/layout/vehicle-pricing-error-feedback-modal';
import VehicleSocial from 'components/layout/vehicle-social';
import PopOver from 'components/layout/popover';
import InternalVehicleDetails from 'components/internal/vehicle-details';
import InternalVehicleOptions from 'components/internal/vehicle-options';
import InternalVehicleManualDetails from 'components/internal/vehicle-manual-details';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-regular-svg-icons";

import _ from 'underscore';
import { PricingTypes } from 'enums/PricingTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { VehicleManualDetails } from 'types/internal/VehicleManualDetails';
import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { ExtraOptionRelationship } from 'types/vehicle-options/ExtraOptionRelationship';
import { ExtraOptionAction } from 'types/components/vehicle-options/ExtraOptionAction';
import { ExtraOptionState } from 'types/components/vehicle-options/ExtraOptionState';
import { ExtraOptionsManagerState } from 'types/components/vehicle-options/ExtraOptionsManagerState';
import { VehicleCustomOptionsPersistanceState } from 'types/VehicleCustomOptionsPersistanceState';
import { formatMoney, unformat } from 'helpers/currencyHelper';
import { CustomOptionsHelper } from "helpers/customOptionsHelper";
import { getVehicleMonthlyPrice } from 'helpers/vehiclePricingHelper';
import { VehicleExtraOptionsHelper } from 'components/vehicle/_libs/helpers/VehicleExtraOptionsHelper';
import { VehicleExtraOptionsManager } from 'components/vehicle/_libs/VehicleExtraOptionsManager';
import { GarageStorageHelper } from '../../garage/_libs/helpers/garageStorageHelper';
import { HistoryStorageHelper } from '../../history/_libs/helpers/historyStorageHelper';
import { GetFriendlyName } from 'helpers/helpers';
import { capitalize } from 'helpers/stringHelper';
import { logLabelEvent } from "helpers/analytics";
import { parseCookies } from 'nookies';
import { SiteSettings } from 'environment/siteSettings';
import { GetVehiclePricesDetails } from 'business-logic/vehicleService';

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
    isInternal: boolean;
    leasingDealType: LeasingDealTypes;
    vehicle: any;
    orderModalOpenned?: boolean;
    pricingType?: PricingTypes;
    userPostcode?: string;
}

const VehiclePage: React.FC<Props> = ({ isInternal, pricingType, userPostcode, leasingDealType, vehicle, orderModalOpenned }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const modalContext = useContext(ModalContext);
    const methods = useForm();
    const cookies = parseCookies();
    const { handleSubmit } = methods;

    //const [selectedTerm, setselectedTerm] = useState(term);
    //const [selectedMileage, setselectedMileage] = useState(mileage || process.env.NEXT_PUBLIC_DEFAULT_CAR_MILEAGE);
    //const [selectedMaintenance, setselectedMaintenance] = useState(maintenance || process.env.NEXT_PUBLIC_DEFAULT_MAINTENANCE);
    //const [selectedInitialRentals, setselectedInitialRentals] = useState(initialRentalMonths || process.env.NEXT_PUBLIC_DEFAULT_INITIAL_RENTALS);

    //TODO: implement maintenanceEnabled setting
    const maintenanceEnabled = isInternal || true;
    const isAtc = pricingType && pricingType === PricingTypes.Atc;
    const blackFridayTheme = process.env.NEXT_PUBLIC_BLACK_FRIDAY_THEME;

    const isClientSideRendering = () => {
        return (typeof window !== 'undefined' && window.document);
    };

    const pricesDefaultState = {
        fullMonthlyPrice: "Please Call",
        initialRental: "POA",
        salesCode: "POA",
        monthlyPrice: "POA",
        monthlyMaintenancePrice: "POA",
        processingFee: formatMoney(parseFloat(leasingDealType === LeasingDealTypes.Personal ? process.env.NEXT_PUBLIC_PCH_PROC_FEE : process.env.NEXT_PUBLIC_CH_PROC_FEE)),
        extraOptions: [],
        extraOptionsTotal: formatMoney(0),
        p11d: "N/A",
        bikTax: "-"
    };

    const [enquiryAllowed, setEnquiryAllowed] = useState(false);
    const [addToGarageAllowed, setAddToGarageAllowed] = useState(false);
    const [isGarageFull, setIsGarageFull] = useState(false);
    const [customOptionsInitialized, setCustomOptionsInitialized] = useState(false);
    const [shownAdditionalTaxNotification, setShownAdditionalTaxNotification] = useState(true);
    const [shownInitialOrderModal, setShownInitialOrderModal] = useState(orderModalOpenned);
    const [customOptions, setCustomOptions] = useState<VehicleCustomOptionsPersistanceState>({
        vehicleRef: vehicle.vehicleRef,
        leasingDealType: leasingDealType,
        term: SiteSettings.DefaultTerm,
        mileage: SiteSettings.GetDealTypeDefaultMileage(leasingDealType),
        maintenance: SiteSettings.DefaultMaintenance,
        initialRentalMonths: SiteSettings.DefaultInitialRentals,
        options: [],
        salesCode: 0,
        ageCategory: null
    });
    const [prices, setPrices] = useState(pricesDefaultState);
    const [extraOptions, setExtraOptions] = useState<ExtraOption[]>([]);
    const [extraOptionsRelationships, setExtraOptionsRelationships] = useState<ExtraOptionRelationship[]>([]);
    const [extraOptionsStates, setExtraOptionsStates] = useState<ExtraOptionState[]>([]);
    const [interiorColors, setInteriorColors] = useState<ExtraOption[]>([]);
    const [exteriorColors, setExteriorColors] = useState<ExtraOption[]>([]);
    const [manualDetails, setManualDetails] = useState<VehicleManualDetails>({
        mileage: null,
        maintenance: null,

        monthlyPrice: null,
        monthlyMaintenancePrice: null,
        initialRentalPrice: null,
        processingFee: null,

        exteriorColor: null,
        interiorColor: null
    });
    const [selectedColors, setSelectedColors] = useState({
        interiorColor: { id: null, name: null },
        exteriorColor: { id: null, name: null }
    });
    const [changeColorDump, setChangeColorDump] = useState(null);

    useEffect(() => {
        setIsGarageFull(GarageStorageHelper.isFull());

        let data = {
            pricingType: pricingType || undefined,
            postcode: userPostcode || undefined,
            vehicleRef: vehicle.vehicleRef,
            leasingDealType: leasingDealType,
            url: router.asPath,
            maintenanceAllowed: vehicle.hasMaintenance && maintenanceEnabled
        };

        CustomOptionsHelper.getVehicleCustomOptions(
            data,
            (customOptionsState: VehicleCustomOptionsPersistanceState) => {
                setCustomOptions((prevState) => {
                    let updatedValues = {
                        term: customOptionsState.term,
                        mileage: customOptionsState.mileage,
                        maintenance: customOptionsState.maintenance,
                        initialRentalMonths: customOptionsState.initialRentalMonths,
                        options: customOptionsState.options,
                        salesCode: customOptionsState.salesCode,
                        ageCategory: customOptionsState.ageCategory
                    };

                    return { ...prevState, ...updatedValues };
                });
                setCustomOptionsInitialized(true);
            });
    }, []);

    useEffect(() => {
        // Check for not internal
        if (!isInternal) {
            // Check user hasn't dismissed modal and for an empty garage
            if(!cookies.HasClosedGaragePromo && GarageStorageHelper.countItems() === 0) {
                // Add item to vehicle history 
                let historyItem = customOptions;
                historyItem.ageCategory = 1;
                let storageItem = HistoryStorageHelper.addOrUpdateItem(historyItem, {
                    make: vehicle.make,
                    model: vehicle.model,
                    derivative: vehicle.derivative,
                    imageUrl: vehicle.imageUrl
                });

                // If vehicle history is full
                if (storageItem && HistoryStorageHelper.isTriggered()) {
                    // Launch promo modal after 10 seconds
                    const modalTimer = setTimeout(() => {
                        modalContext.showModal(ModalGarage, {show: true});
                        logLabelEvent('my-garage-modal', 'impression', 'modal');
                    }, 10000);
                    return () => clearTimeout(modalTimer);
                }
            }
        }
    }, [vehicle, customOptions]);

    useEffect(() => {
        setCustomOptions((prevState) => {
            let updatedValues = {
                leasingDealType: leasingDealType
            };

            return { ...prevState, ...updatedValues };
        });
    }, [leasingDealType]);

    useEffect(() => {
        if (customOptionsInitialized) {
            dispatch({ type: 'UPDATE_OVERLAY_STATE', state: true });

            CustomOptionsHelper.storeVehicleCustomOptions(customOptions);

            GetVehiclePricesDetails({
                pricingType: pricingType || undefined,
                postcode: userPostcode || undefined,

                vehicleRef: customOptions.vehicleRef,
                leasingDealType: customOptions.leasingDealType,
                term: customOptions.term,
                mileage: customOptions.mileage,
                maintenance: customOptions.maintenance,
                initialRentalMonths: customOptions.initialRentalMonths,
                options: customOptions.options,
                salesCode: customOptions.salesCode,
                ageCategory: customOptions.ageCategory
            }).then((result: ApiResponse) => {
                let pricesState = _.clone(pricesDefaultState);

                if (result.isSucceed && result.data) {
                    let newPrices = result.data;
                    let hasAllowedPrice = newPrices.baseMonthlyPrice && newPrices.baseMonthlyPrice > 0;

                    pricesState.extraOptions = newPrices.extraOptions || [];
                    pricesState.extraOptionsTotal = formatMoney(newPrices.extraOptionsTotal);
                    pricesState.p11d = newPrices.p11D ? formatMoney(newPrices.p11D) : "N/A";
                    pricesState.bikTax = (newPrices.bik20Tax && newPrices.bik40Tax) ? formatMoney(newPrices.bik20Tax) + "/" + formatMoney(newPrices.bik40Tax) + " p/m" : "-";

                    if (hasAllowedPrice) {
                        //TODO: Should we have separate object for manual prices or should we store prices as numbers here to format them on display later?
                        pricesState.fullMonthlyPrice = newPrices.fullMonthlyPrice ? formatMoney(newPrices.fullMonthlyPrice) : "Please Call";
                        pricesState.initialRental = formatMoney(newPrices.initialRental);
                        pricesState.salesCode = formatMoney(newPrices.salesCode);
                        pricesState.monthlyPrice = formatMoney(newPrices.baseMonthlyPrice);
                        pricesState.monthlyMaintenancePrice = formatMoney(newPrices.monthlyMaintenancePrice);
                    }

                    setPrices(pricesState);
                    setEnquiryAllowed(hasAllowedPrice);
                    setAddToGarageAllowed(true);

                    let suppressTaxNotification = false;

                    if (shownInitialOrderModal) {
                        suppressTaxNotification = hasAllowedPrice;

                        setShownInitialOrderModal(false);
                        onEnquiry(hasAllowedPrice, "order");
                    }

                    if (shownAdditionalTaxNotification && newPrices.p11DTaxApplied) {
                        setShownAdditionalTaxNotification(false);

                        if (!suppressTaxNotification) {
                            modalContext.showModal(VehicleAdditionalTaxModal,
                                {
                                    show: true
                                });
                        }
                    }

                    //TODO: implement?
                    //if (options.onPricesLoaded) {
                    //    options.onPricesLoaded(dataOptions.leasingDealType);
                    //}

                    //onPricesLoaded: function (dealTypeId) {
                    //    if ("@((byte)leasingDealType)" !== dealTypeId) {
                    //        switch (dealTypeId) {
                    //            case "1":
                    //                window.location = "@businessUrl";
                    //                break;
                    //            case "2":
                    //                window.location = "@personalUrl";
                    //                break;
                    //        }
                    //    }
                    //}
                }
                else {
                    setPrices(pricesState);
                    setEnquiryAllowed(false);
                    setAddToGarageAllowed(false);
                }

                dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
            });
        }
    }, [customOptionsInitialized, customOptions]);

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
        if (customOptionsInitialized && isInternal && !isAtc) {
            setManualDetails((prevState) => {
                let updatedValues = {
                    mileage: customOptions.mileage,
                    maintenance: customOptions.maintenance,

                    monthlyPrice: prices.monthlyPrice,
                    monthlyMaintenancePrice: prices.monthlyMaintenancePrice,
                    initialRentalPrice: prices.initialRental,
                    processingFee: prices.processingFee,

                    exteriorColor: selectedColors.exteriorColor.id,
                    interiorColor: selectedColors.interiorColor.id
                };

                return { ...prevState, ...updatedValues };
            });
        }
    }, [customOptionsInitialized, prices, selectedColors]);

    const setOptions = (name, value) => {
        if (customOptions[name] !== value) {
            setCustomOptions((prevState) => {
                let updatedValues = {};
                updatedValues[name] = value;

                return { ...prevState, ...updatedValues };
            });
        }
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

    const addToGarage = () => {
        if (addToGarageAllowed) {
            if (!GarageStorageHelper.isFull()) {
                let item = customOptions;
                item.ageCategory = 1;

                var storageItem = GarageStorageHelper.addOrUpdateItem(item);

                if (storageItem) {
                    router.push('/my-garage');
                }
            }
            else {
                router.push('/my-garage');
            }
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
                    setCustomOptions((prevState) => {
                        let updatedValues = {
                            options: managerState.selectedOptionIds || []
                        };

                        return { ...prevState, ...updatedValues };
                    });
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
                                        setCustomOptions((prevState) => {
                                            let updatedValues = {
                                                options: confirmedState.selectedOptionIds || []
                                            };

                                            return { ...prevState, ...updatedValues };
                                        });

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

    const onVehicleExtraOptionClick = (option) => {
        if (option && vehicle.optionsSelectAllowed) {//TODO: check usage of optionsSelectAllowed for internal users
            option.id = option.code;

            let optionToProcess: ExtraOptionAction = VehicleExtraOptionsHelper.getOptionAction(option, customOptions.options || []);

            processOption(optionToProcess);
        }
    }

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

    const onEnquiryButtonClick = (type: string) => {
        onEnquiry(enquiryAllowed, type);
    }

    const onEnquiry = (showAllowed: boolean, type: string) => {
        if (isInternal) {
            handleSubmit((data) => {
                showEnquiryModal(showAllowed, type, data);
            })();
        } else {
            showEnquiryModal(showAllowed, type);
        }
    }

    const showEnquiryModal = (showAllowed: boolean, type: string, internalData?: any) => {
        if (showAllowed && type) {
            let enquiryData = {
                dealType: 1,
                dealId: customOptions.vehicleRef,

                pricingType: pricingType,
                pricingPostcode: userPostcode,
                details: `${vehicle.make} ${vehicle.model} ${vehicle.derivative}`,

                vehicleRef: customOptions.vehicleRef,
                leasingDealType: customOptions.leasingDealType,
                term: customOptions.term,
                mileage: customOptions.mileage,
                initialRentalMonths: customOptions.initialRentalMonths,
                maintenance: customOptions.maintenance || false,
                options: customOptions.options,

                salesCode: customOptions.salesCode,
                ageCategory: customOptions.ageCategory,

                manualDetails: null
            };

            if (isInternal && !isAtc) {
                enquiryData.manualDetails = {
                    mileage: unformat(internalData.mileage),
                    maintenance: internalData.maintenance === "true",

                    monthlyPrice: unformat(internalData.monthlyPrice),
                    monthlyMaintenancePrice: unformat(internalData.monthlyMaintenancePrice),
                    initialRental: unformat(internalData.initialRentalPrice),
                    processingFee: unformat(internalData.processingFee),

                    dealerOption1: internalData.dealerOption1,
                    dealerOption1Price: unformat(internalData.dealerOption1Price) || null,
                    dealerOption2: internalData.dealerOption2,
                    dealerOption2Price: unformat(internalData.dealerOption2Price) || null,
                    dealerOption3: internalData.dealerOption3,
                    dealerOption3Price: unformat(internalData.dealerOption3Price) || null,

                    exteriorColor: unformat(internalData.exteriorColor) || null,
                    exteriorColorManual: internalData.exteriorColorManual,

                    interiorColor: unformat(internalData.interiorColor) || null,
                    interiorColorManual: internalData.interiorColorManual
                };
            }

            let enquiryModalOptions = {
                show: true,
                title: null,

                baseData: enquiryData,

                settings: {
                    isInternal: isInternal,
                    showPriceWarning: isAtc,
                    proceededToApplyForFinanceDirectly: false
                }
            };

            if (type === "enquiry") {
                enquiryModalOptions.title = "Enquire Now";
            }
            else if (type === "order") {
                enquiryModalOptions.title = "Order this " + (vehicle.vehicleType === VehicleTypes.Commercial ? "van" : "car");
                enquiryModalOptions.settings.proceededToApplyForFinanceDirectly = true;
            }

            if (enquiryModalOptions) {
                modalContext.showModal(VehicleQuoteEnquiryModal, enquiryModalOptions);
            }
        }
    }

    const onOptionsDataLoaded = (optionsType: string, data: any) => {
        if (optionsType === "extras" && vehicle.optionsSelectAllowed) {
            setExtraOptions([]);
            setExtraOptionsRelationships([]);

            let optionsList: ExtraOption[] = [];
            let relationshipsList: ExtraOptionRelationship[] = [];
            let optiosStatesList: ExtraOptionState[] = [];
            let interiorColorsList: ExtraOption[] = [];
            let exteriorColorsList: ExtraOption[] = [];

            if (data) {
                let optionCategories = data.options || [];
                let relationships = data.relationships || [];

                let interiorColorCategories = [81, 82, 83, 84, 86, 90, 97, 110, 109];
                let exteriorColorCategories = [44, 45, 73, 74, 75, 76, 103, 104, 105, 106, 107, 108];;

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

                (data.relationships || []).forEach(function (relationship) {
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

            setExtraOptions(optionsList);
            setInteriorColors(interiorColorsList);
            setExteriorColors(exteriorColorsList);
            setExtraOptionsRelationships(relationshipsList);
            setExtraOptionsStates(optiosStatesList);
        }
    }

    const onPricingMatrixButtonClick = () => {
        if (isInternal) {
            modalContext.showModal(VehiclePricingMatrixModal,
                {
                    show: true,

                    vehicleRef: vehicle.vehicleRef,
                    vehicleName: `${vehicle.make} ${vehicle.model} ${vehicle.derivative}`,
                    pricingType: pricingType || undefined,
                    userPostcode: userPostcode || undefined
                });
        }
    }

    const onErrorFeedbackButtonClick = () => {
        if (isInternal) {
            modalContext.showModal(VehicleErrorFeedbackModal,
                {
                    show: true,

                    vehicleRef: vehicle.vehicleRef,
                    capId: vehicle.capId,
                    vehicleName: `${vehicle.make} ${vehicle.model} ${vehicle.derivative}`,
                    vehiclePageUrl: window.location.href,

                    settings: {
                        salespersons: []
                    }
                });
        }
    }

    return (
        <>
            <div className="container-fluid py-3 py-md-5 bg-light-grey">
                {(isInternal && vehicle.extraDetails) ?
                    (
                        <div className="row">
                            <div className="col-24">
                                <InternalVehicleDetails data={vehicle.extraDetails} />
                            </div>
                        </div>
                    ) : null
                }
                <div className="row">
                    <div className="col-24 d-md-none order-1">
                        <VehicleShortInfo vehicle={vehicle} />
                        <hr className="my-2 my-md-3" />
                    </div>
                    <div className="col-24 order-2 col-lg-12 order-lg-3">
                        <div className={`vehicle-gallery ${blackFridayTheme === 'true' ? 'vehicle-gallery--bf' : ''} mb-3 mb-md-0`}>
                            <ReactPlaceholder type='rect' ready={vehicle ? true : false} color='#E0E0E0' style={{ height: 400 }}>
                                <VehicleImageGalleryTabs
                                    vehicleType={vehicle.vehicleType}
                                    imageDescription={`${capitalize(GetFriendlyName(vehicle.make))} ${capitalize(GetFriendlyName(vehicle.model))} ${capitalize(GetFriendlyName(vehicle.derivative))}`}
                                    imageUrls={vehicle.imageUrls}
                                    interiorUrl={vehicle.interiorUrl}
                                    exteriorUrl={vehicle.exteriorUrl}
                                />
                            </ReactPlaceholder>
                            <p><small>Images are for illustration purposes only</small></p>
                        </div>
                        <div className="row">
                            <div className="col-24 col-md-12 d-flex justify-content-between align-items-center mb-3 my-md-4">
                                {addToGarageAllowed ?
                                    (
                                        <>
                                            <button onClick={() => addToGarage()} className="btn btn-outline-primary btn-fluid btn-lg flex-grow-1 mr-3 add-to-garage">{isGarageFull ? "View Garage" : `Compare ${vehicle.vehicleType === VehicleTypes.Commercial ? "Van" : "Car"}s`}</button>
                                            {isGarageFull ? <PopOver id="garage-full" trigger={<FontAwesomeIcon width="20" height="20" icon={faInfoCircle} />} body="You are currently comparing four vehicles. Please remove one if you wish to add." /> : null}
                                        </>
                                    ) : null
                                }
                            </div>
                            <div className="col-24 col-md-12 d-none d-md-flex justify-content-end align-items-center my-3 my-md-4">
                                <VehicleSocial />
                            </div>
                            <div className="col-24"><hr className="m-0 p-0" /></div>
                        </div>
                    </div>
                    <div className="col-24 order-4 col-lg-12 order-lg-2 d-md-flex mb-3 mb-md-0">
                        <ReactPlaceholder type='rect' ready={vehicle ? true : false} color='#FFFFFF' style={{ height: 650 }}>
                            <VehicleInfo
                                vehicle={vehicle}
                                options={{
                                    leasingDealType: customOptions.leasingDealType,
                                    term: customOptions.term,
                                    mileage: customOptions.mileage,
                                    maintenance: customOptions.maintenance,
                                    initialRentalMonths: customOptions.initialRentalMonths
                                }}
                                prices={{
                                    initialRental: prices.initialRental,
                                    monthlyMaintenance: prices.monthlyMaintenancePrice
                                }}
                                settings={{
                                    availableMileages: vehicle.availableMileages,
                                    hasMaintenance: vehicle.hasMaintenance,

                                    isAtc: isAtc,
                                    maintenanceEnabled: maintenanceEnabled,
                                    setOptions: setOptions
                                }}
                            />
                        </ReactPlaceholder>
                    </div>
                </div>
                {(isInternal) ?
                    (
                        <FormContext {...methods}>
                            <div className="row">
                                <div className="col-24 col-lg-12 mt-3 mt-md-5">
                                    <InternalVehicleOptions
                                        options={{
                                            salesCode: customOptions.salesCode,
                                            ageCategory: customOptions.ageCategory
                                        }}
                                        settings={{
                                            setOptions: setOptions,
                                            onErrorFeedback: onErrorFeedbackButtonClick,
                                            onPricingMatrix: onPricingMatrixButtonClick
                                        }}
                                    />
                                </div>
                                {!isAtc ?
                                    (
                                        <div className="col-24 col-lg-12 mt-3 mt-md-5">
                                            <InternalVehicleManualDetails
                                                data={manualDetails}
                                                settings={{
                                                    interiorColors: interiorColors,
                                                    exteriorColors: exteriorColors,
                                                    onTryChangeColor: onTryChangeColor
                                                }}
                                            />
                                        </div>
                                    ) : null
                                }
                            </div>
                        </FormContext>
                    ) : null
                }
            </div>
            <div className={`container-fluid py-5 ${isAtc ? "bg-atc" : "bg-white"}`}>
                <div className="row">
                    <div className="col-24 col-md-12 mb-5 mb-md-0">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={vehicle ? true : false} rows={3}>
                            <VehicleKeyInfo
                                leasingDealType={leasingDealType}
                                vehicle={vehicle}
                                prices={{
                                    p11d: prices.p11d,
                                    bikTax: prices.bikTax
                                }}
                                sourceUrl={router.asPath}
                            />
                        </ReactPlaceholder>
                    </div>
                    {(vehicle.features && vehicle.features.length > 0) ?
                        (<div className="col-24 col-md-12">
                            <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={vehicle.features ? true : false} rows={3}>
                                <VehicleFeatures features={vehicle.features} />
                            </ReactPlaceholder>
                        </div>) : null
                    }
                </div>
            </div>
            <div className="container-fluid py-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} color='#FFFFFF' ready={customOptions ? true : false} rows={8}>
                            <VehicleSummary
                                options={{
                                    leasingDealType: customOptions.leasingDealType,
                                    term: customOptions.term,
                                    mileage: customOptions.mileage,
                                    maintenance: customOptions.maintenance,
                                    initialRentalMonths: customOptions.initialRentalMonths,
                                    interior: selectedColors.interiorColor.name,
                                    exterior: selectedColors.exteriorColor.name
                                }}
                                prices={{
                                    monthly: prices.fullMonthlyPrice,
                                    monthlyMaintenance: prices.monthlyMaintenancePrice,
                                    processingFee: prices.processingFee,
                                    extraOptions: prices.extraOptions,
                                    extraOptionsTotal: prices.extraOptionsTotal
                                }}
                                settings={{
                                    maintenanceEnabled: maintenanceEnabled,
                                    isAtc: isAtc
                                }}
                            />
                        </ReactPlaceholder>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-3 py-md-5 bg-white">
                <div className="row">
                    <div className="col-24">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={customOptions ? true : false} rows={10}>
                            <VehicleOptionsTabs
                                vehicleType={vehicle.vehicleType}
                                capId={vehicle.capId}
                                options={{
                                    leasingDealType: customOptions.leasingDealType,
                                    term: customOptions.term,
                                    initialRentalMonths: customOptions.initialRentalMonths,
                                    options: customOptions.options,
                                    optionsStates: extraOptionsStates
                                }}
                                settings={{
                                    searchAllowed: isInternal,
                                    optionsSelectAllowed: vehicle.optionsSelectAllowed,
                                    onOptionClick: onVehicleExtraOptionClick,
                                    onOptionsDataLoaded: onOptionsDataLoaded
                                }}
                            />
                        </ReactPlaceholder>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <h2>What our customers think</h2>
                        <TrustBox />
                    </div>
                </div>
            </div>
            <VehicleSlideup
                leasingDealType={customOptions.leasingDealType}
                monthlyPrice={prices.fullMonthlyPrice}
                settings={{
                    isSimpleMode: !isInternal,
                    proceedAllowed: enquiryAllowed,
                    onProceed: onEnquiryButtonClick
                }}
            />
        </>
    );
}

export default VehiclePage;