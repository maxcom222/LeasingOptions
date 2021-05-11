import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchAccordion from './search-accordion';
import style from './search.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";
import { PricingTypes } from 'enums/PricingTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetFriendlyName, FormatValidatePostcode, AddSpaceToPostcode, GetPhoneNumber } from 'helpers/helpers';
import { CheckAtcUrl, CheckVanUrl, GetVehicleTypeFromUrl } from 'helpers/urlHelper';
import { VehiclesFilter } from 'types/VehiclesFilter';
import { VehiclesFilterSearchItem } from 'types/vehicle-search/VehiclesFilterSearchItem';
import { VehiclesFilterSearch } from 'types/vehicle-search/VehiclesFilterSearch';
import { GetAvailableShortModels, GetAvailableMakes, GetVehiclesFilterOptions, GetContractValues, GetRentalValues } from 'business-logic/vehicleService';

type Props = {
    active: boolean;
    handleVehicleCountUpdate: any;
    dealToggle: LeasingDealTypes;
    vehicleFilters: VehiclesFilterSearch;
    userPostcode: string;
    isInternal: boolean;
    updateUserPostcode: any;
}

const defaultSelected: VehiclesFilterSearchItem = {
    id: '',
    name: ''
}

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
        vehicleFilters: state.vehicleFilters,
        userPostcode: state.userPostcode,
        isInternal: state.isInternal,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserPostcode: (userPostcode) => {
            dispatch({ type: 'UPDATE_POSTCODE', userPostcode: userPostcode });
        },
    }
}

//TODO: Whole filter logic needs to be reviewed
//TODO: Fix option accordions logic. Default state
//TODO: Don't use index as key in map list
const SearchDetailed: React.FC<Props> = ({ active, handleVehicleCountUpdate, dealToggle, vehicleFilters, userPostcode, isInternal, updateUserPostcode }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const pricingType = CheckAtcUrl(router.pathname) ? PricingTypes.Atc : null;//TODO: should it come in params instead? Same for options below
    const isATC = pricingType === PricingTypes.Atc;
    const leaseDealType = (CheckVanUrl(router.pathname)) ? LeasingDealTypes.Van : dealToggle;
    const vehicleType = GetVehicleTypeFromUrl(router.pathname);
    const postcodeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    //TODO: shouldn't we clear selected values when related collections being updated?
    const [makesList, setMakesList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [trimList, setTrimList] = useState([]);
    const [seatList, setSeatList] = useState([]);
    const [mpgList, setMpgList] = useState([]);
    const [c02List, setC02List] = useState([]);
    const [driveTrainList, setDriveTrainList] = useState([]);
    const [vehicleSizelist, setEngizeSizeList] = useState([]);
    const [transmissionList, setTransmissionList] = useState([]);
    const [fuelTypesList, setFuelTypesList] = useState([]);
    const [vehicleSizeList, setVehicleSizeList] = useState([]);
    const [vehicleStyleList, setVehicleStyleList] = useState([]);
    const [mileageList, setMileageList] = useState([]);
    const [contractList, setContractList] = useState([]);
    const [rentalList, setRentalList] = useState([]);
    const [budgetList, setBudgetList] = useState([]);

    const handlePostcodeSubmit = () => {
        let enteredPostcode = postcodeRef.current.value.toLowerCase();

        if (FormatValidatePostcode(enteredPostcode)) {
            updateUserPostcode(AddSpaceToPostcode(enteredPostcode));
        } else {
            updateUserPostcode(null);
        }
    }
    const handlePostcodeCheck = (evt) => {
        if (evt.target.value === '') {
            updateUserPostcode(null);
        }
    }
    const handleTypeChange = (searchType) => {
        if (searchType?.id === vehicleFilters?.searchType?.id) {
            handleFilterUpdate("searchType", defaultSelected);
            handleFilterUpdate("isSpecial", "");
            handleFilterUpdate("isInStock", "");
        } else {
            handleFilterUpdate("searchType", searchType);

            if (searchType?.id === 'offers') {
                handleFilterUpdate("isSpecial", true);
                handleFilterUpdate("isInStock", "");
            } else if (searchType?.id === 'stock') {
                handleFilterUpdate("isSpecial", "");
                handleFilterUpdate("isInStock", true);
            } else {
                handleFilterUpdate("isSpecial", "");
                handleFilterUpdate("isInStock", "");
            }
        }
    }
    const handleBudgetChange = (priceTo) => {
        if (priceTo?.id === vehicleFilters?.priceTo?.id) {
            handleFilterUpdate("priceTo", defaultSelected);
        } else {
            handleFilterUpdate("priceTo", priceTo);
        }
    }
    const handleMakeChange = (make) => {
        if (make === vehicleFilters?.manufacturerUrl) {
            handleFilterUpdate("manufacturerUrl", '');
        } else {
            handleFilterUpdate("manufacturerUrl", make);
        }
        handleFilterUpdate("modelUrl", '');
        handleFilterUpdate("shortDerTextUrl", defaultSelected);
    }
    const handleModelChange = (model) => {
        if (model === vehicleFilters?.modelUrl) {
            handleFilterUpdate("modelUrl", '');
        } else {
            handleFilterUpdate("modelUrl", model);
        }
        handleFilterUpdate("shortDerTextUrl", defaultSelected);
    }
    const handleTrimChange = (shortDerTextUrl) => {
        if (shortDerTextUrl?.id === vehicleFilters?.shortDerTextUrl?.id) {
            handleFilterUpdate("shortDerTextUrl", defaultSelected);
        } else {
            handleFilterUpdate("shortDerTextUrl", shortDerTextUrl);
        }
    }
    const handleFuelChange = (fuelType) => {
        if (fuelType?.id === vehicleFilters?.fuelType?.id) {
            handleFilterUpdate("fuelType", defaultSelected);
        } else {
            handleFilterUpdate("fuelType", fuelType);
        }
    }
    const handleGearboxChange = (transmission) => {
        if (transmission?.id === vehicleFilters?.transmission?.id) {
            handleFilterUpdate("transmission", defaultSelected);
        } else {
            handleFilterUpdate("transmission", transmission);
        }
    }
    const handleDriveTrainChange = (driveTrain) => {
        if (driveTrain?.id === vehicleFilters?.driveTrain?.id) {
            handleFilterUpdate("driveTrain", defaultSelected);
        } else {
            handleFilterUpdate("driveTrain", driveTrain);
        }
    }
    const handleVehicleStyleChange = (vehicleStyle) => {
        if (vehicleStyle?.id === vehicleFilters?.vehicleStyle?.id) {
            handleFilterUpdate("vehicleStyle", defaultSelected);
        } else {
            handleFilterUpdate("vehicleStyle", vehicleStyle);
        }
    }
    const handleVehicleSizeChange = (vehicleSize) => {
        if (vehicleSize?.id === vehicleFilters?.vehicleSize?.id) {
            handleFilterUpdate("vehicleSize", defaultSelected);
        } else {
            handleFilterUpdate("vehicleSize", vehicleSize);
        }
    }
    const handleSeatChange = (seats) => {
        if (seats?.id === vehicleFilters?.seats?.id) {
            handleFilterUpdate("seats", defaultSelected);
        } else {
            handleFilterUpdate("seats", seats);
        }
    }
    const handleEngineChange = (engineSize) => {
        if (engineSize?.id === vehicleFilters?.engineSize?.id) {
            handleFilterUpdate("engineSize", defaultSelected);
        } else {
            handleFilterUpdate("engineSize", engineSize);
        }
    }
    const handleMpgChange = (mpg) => {
        if (mpg?.id === vehicleFilters?.mpg?.id) {
            handleFilterUpdate("mpg", defaultSelected);
        } else {
            handleFilterUpdate("mpg", mpg);
        }
    }
    const handleC02Change = (co2) => {
        if (co2?.id === vehicleFilters?.co2?.id) {
            handleFilterUpdate("co2", defaultSelected);
        } else {
            handleFilterUpdate("co2", co2);
        }
    }
    const handleMileageChange = (mileage) => handleFilterUpdate("mileage", mileage);
    const handleTermChange = (term) => {
        if (term?.id === vehicleFilters?.term?.id) {
            handleFilterUpdate("term", defaultSelected);
        } else {
            handleFilterUpdate("term", term);
        }
    }
    const handleInitialRentalChange = (initialRental) => handleFilterUpdate("initialRental", initialRental);

    // Update filter dispatch function
    function handleFilterUpdate(name, value) {
        if (name === "searchType" || name === "priceTo") {
            dispatch({ type: 'UPDATE_FILTERS', filterName: "manufacturerUrl", filterValue: '' });
            dispatch({ type: 'UPDATE_FILTERS', filterName: "modelUrl", filterValue: '' });
            dispatch({ type: 'UPDATE_FILTERS', filterName: "shortDerTextUrl", filterValue: defaultSelected });
        }
        dispatch({ type: 'UPDATE_FILTERS', filterName: name, filterValue: value });
    }

    // Get model list and set trim to default on make change
    useEffect(() => {
        if (vehicleFilters?.manufacturerUrl) {
            //TODO: remove NaN values from request
            const vehicleFilter: VehiclesFilter = {
                pricingType: pricingType,
                postcode: userPostcode,

                leasingDealType: leaseDealType,
                vehicleType: vehicleType,
                manufacturerUrl: vehicleFilters?.manufacturerUrl,
                term: parseInt(vehicleFilters?.term?.id),
                initialRentals: parseInt(vehicleFilters?.initialRental?.id),
                mileage: parseInt(vehicleFilters?.mileage?.id),
                fuelType: parseInt(vehicleFilters?.fuelType?.id),
                transmission: parseInt(vehicleFilters?.transmission?.id),
                co2: parseInt(vehicleFilters?.co2?.id),
                mpg: parseInt(vehicleFilters?.mpg?.id),
                seats: parseInt(vehicleFilters?.seats?.id),
                driveTrain: vehicleFilters?.driveTrain?.id,
                vehicleSize: parseInt(vehicleFilters?.vehicleSize?.id),
                vehicleStyle: parseInt(vehicleFilters?.vehicleStyle?.id),
                engineSize: vehicleFilters?.engineSize?.id,
                priceTo: parseInt(vehicleFilters?.priceTo?.id),
                isInStock: vehicleFilters?.isInStock,
                isSpecial: vehicleFilters?.isSpecial
            }

            GetAvailableShortModels(vehicleFilter).then((data) => {
                setModelList(data.data);
            });
        }
    }, [vehicleFilters?.manufacturerUrl]);

    // Get filter data on all filter changes
    useEffect(() => {
        // Get available make data
        GetAvailableMakes(leaseDealType, vehicleType, vehicleFilters?.term?.id, vehicleFilters?.initialRental?.id, vehicleFilters?.mileage?.id, vehicleFilters?.fuelType?.id,
            vehicleFilters?.transmission?.id, vehicleFilters?.co2?.id, vehicleFilters?.mpg?.id, '', vehicleFilters?.seats?.id, vehicleFilters?.driveTrain?.id, vehicleFilters?.vehicleSize?.id,
            vehicleFilters?.vehicleStyle?.id, vehicleFilters?.engineSize?.id, '', vehicleFilters?.priceTo?.id, vehicleFilters?.isInStock, vehicleFilters?.isSpecial,
            pricingType, userPostcode)
            .then((data) => {
                setMakesList(data.data);
            });

        // Get available filter option data
        GetVehiclesFilterOptions(leaseDealType, vehicleType, vehicleFilters.manufacturerUrl, vehicleFilters.modelUrl, vehicleFilters.shortDerTextUrl.id, vehicleFilters.term.id, vehicleFilters.initialRental.id, vehicleFilters.mileage.id, vehicleFilters.fuelType.id, vehicleFilters.transmission.id, vehicleFilters.co2.id, vehicleFilters.mpg.id, vehicleFilters.doors.id, vehicleFilters.seats.id, vehicleFilters.driveTrain.id, vehicleFilters.vehicleSize.id, vehicleFilters.vehicleStyle.id, vehicleFilters.engineSize.id, vehicleFilters.priceFrom.id, vehicleFilters.priceTo.id, vehicleFilters.isInStock, vehicleFilters.isSpecial, pricingType, userPostcode)
            .then(function (data) {
                //TODO: error handling
                let fuelTypes = null;
                let transmission = null;
                let driveTrain = null;
                let seats = null;
                let mileage = null;
                let co2 = null;
                let mpg = null;
                let engineSize = null;
                let vehicleSize = null;
                let vehicleStyle = null;
                let price = null;
                let trimLevel = [];

                if (data.data) {
                    handleVehicleCountUpdate(data.data.count);

                    // Filter API request
                    fuelTypes = data.data.counts.fuelType;
                    transmission = data.data.counts.transmission;
                    driveTrain = data.data.counts.driveTrain;
                    seats = data.data.counts.seats;
                    mileage = data.data.counts.mileage;
                    co2 = data.data.counts.co2;
                    mpg = data.data.counts.mpg;
                    engineSize = data.data.counts.engineSize;
                    vehicleSize = data.data.counts.vehicleSize;
                    vehicleStyle = data.data.counts.vehicleStyle;
                    price = data.data.counts.price;

                    if (vehicleFilters?.manufacturerUrl && vehicleFilters?.modelUrl) {
                        trimLevel = data.data.counts.trimLevel;
                    }
                }
                else {
                    handleVehicleCountUpdate(0);
                }

                // Set filter list values
                setSeatList(seats);
                setMpgList(mpg);
                setC02List(co2);
                setDriveTrainList(driveTrain);
                setEngizeSizeList(engineSize);
                setTransmissionList(transmission);
                setFuelTypesList(fuelTypes);
                setVehicleSizeList(vehicleSize);
                setVehicleStyleList(vehicleStyle);
                setMileageList(mileage);
                setBudgetList(price);
                setTrimList(trimLevel);

                //TODO: Should it be static? if so set only 1 time on modal show?
                setContractList(GetContractValues());
                setRentalList(GetRentalValues());
            });
    }, [userPostcode, vehicleFilters]);

    return (
        <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start`}>
            <ul>
                {isATC &&
                    <SearchAccordion selected={{ id: userPostcode }} autoclose={isATC && !userPostcode ? false : true} title="Postcode" subtitle={userPostcode ? userPostcode : "AB12 3CD"}>
                        <ul>

                            <li className={style['is-postcode']}>
                                <input ref={postcodeRef} type="text" className="form-control m-0" defaultValue={userPostcode} placeholder="AB12 3CD" onChange={(evt) => handlePostcodeCheck(evt)} />
                                <button type="button" className="btn" onClick={() => handlePostcodeSubmit()}><FontAwesomeIcon width="8" height="16" icon={faSearch} /></button>
                            </li>
                            {!userPostcode && <li className={style['is-postcode']}><span className="d-block invalid-feedback">Sorry, we can't find that postcode please check and try again. If the postcode is correct, please call us on <a aria-label="Phone number" className="text-red" href={`tel:${GetPhoneNumber(isInternal)}`}><span className="phonenumber_call_now text-red">{GetPhoneNumber(isInternal)}</span></a> for a quote.</span></li>}
                        </ul>
                    </SearchAccordion>
                }
                {(isATC && userPostcode || !isATC) &&
                    <>
                        <SearchAccordion selected={vehicleFilters.searchType} title="Search Type" subtitle={vehicleFilters.searchType.name ? vehicleFilters.searchType.name : "All, Special Offers, Stock"}>

                            <ul>
                                <li onClick={() => handleTypeChange({ id: '', name: '' })} className={vehicleFilters?.searchType?.id === '' ? style['is-active'] : ''}>Search<strong>&nbsp;all&nbsp;</strong>vehicles</li>
                                <li onClick={() => handleTypeChange({ id: 'offers', name: 'Search special offers only' })} className={vehicleFilters?.searchType?.id === 'offers' ? style['is-active'] : ''}>Search<strong>&nbsp;special offers&nbsp;</strong>only</li>
                                <li onClick={() => handleTypeChange({ id: 'stock', name: 'Search stock only' })} className={vehicleFilters?.searchType?.id === 'stock' ? style['is-active'] : ''}>Search<strong>&nbsp;stock&nbsp;</strong>only</li>
                            </ul>
                        </SearchAccordion>
                        <SearchAccordion selected={vehicleFilters?.priceTo} title="Budget" subtitle={vehicleFilters?.priceTo?.name ? vehicleFilters?.priceTo?.name : "£200 per month"}>
                            <ul>
                                <li onClick={() => handleBudgetChange({ id: '', name: '' })} className={vehicleFilters?.priceTo?.id === '' ? style['is-active'] : ''}>Show me everything</li>
                                {budgetList?.map((budget, index) => (
                                    <li key={index} onClick={() => handleBudgetChange({ id: budget.value, name: `Up to £${budget.value}` })} className={vehicleFilters?.priceTo?.id == budget.value ? style['is-active'] : ''}>Up to £{budget.value}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        <SearchAccordion selected={{ id: vehicleFilters?.manufacturerUrl }} title="Make" subtitle={makesList?.find(x => x.manufacturerUrl?.toLowerCase() == vehicleFilters?.manufacturerUrl?.toLowerCase())?.manufacturer ? makesList?.find(x => x.manufacturerUrl?.toLowerCase() == vehicleFilters?.manufacturerUrl?.toLowerCase())?.manufacturer : "BMW, VW, Ford"}>
                            <ul>
                                <li onClick={() => handleMakeChange('')} className={vehicleFilters?.manufacturerUrl == '' ? style['is-active'] : ''}><a className="d-flex flex-nowrap justify-content-center align-items-center"> <FontAwesomeIcon icon={faInfinity}></FontAwesomeIcon>All Makes</a></li>
                                {makesList?.map((make, index) => (
                                    <li key={index} onClick={() => handleMakeChange(make.manufacturerUrl)} className={vehicleFilters?.manufacturerUrl == make.manufacturerUrl ? style['is-active'] : ''}>
                                        <a className="d-flex flex-nowrap justify-content-center align-items-center">
                                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${make.manufacturerUrl}.svg`} className="img-fluid lazyload" alt={make.manufacturer} />{GetFriendlyName(make.manufacturer)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        <SearchAccordion selected={{ id: vehicleFilters?.modelUrl }} title="Model" subtitle={modelList.find(x => x.shortModTextUrl == vehicleFilters?.modelUrl)?.shortModText ? modelList.find(x => x.shortModTextUrl == vehicleFilters?.modelUrl)?.shortModText : "3 Series, Golf, Focus"}>
                            <ul>
                                <li onClick={() => handleModelChange('')} className={vehicleFilters?.modelUrl == '' ? style['is-active'] : ''}>All Models</li>
                                {modelList?.map((model, index) => (
                                    <li key={index} onClick={() => handleModelChange(model.shortModTextUrl)} className={vehicleFilters?.modelUrl == model.shortModTextUrl ? style['is-active'] : ''}>{model.shortModText}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        {leaseDealType !== LeasingDealTypes.Van &&
                            <SearchAccordion selected={vehicleFilters?.shortDerTextUrl} title="Trim Level" subtitle={vehicleFilters?.shortDerTextUrl?.name ? vehicleFilters?.shortDerTextUrl?.name : "SE, M Sport, S Line"}>
                                <ul>
                                    <li onClick={(evt) => handleTrimChange({ id: '', name: '' })} className={vehicleFilters?.shortDerTextUrl?.id === '' ? style['is-active'] : ''}>Any</li>
                                    {trimList?.map((trim, index) => (
                                        <li key={index} onClick={(evt) => handleTrimChange({ id: trim.value, name: trim.name })} className={vehicleFilters?.shortDerTextUrl?.id == trim.value ? style['is-active'] : ''}>{trim.name}</li>
                                    ))}
                                </ul>
                            </SearchAccordion>
                        }
                        <SearchAccordion selected={vehicleFilters?.fuelType} title="Fuel Type" subtitle={vehicleFilters?.fuelType?.name ? vehicleFilters?.fuelType?.name : "Diesel, Petrol, Hybrid"}>
                            <ul>
                                <li onClick={() => handleFuelChange({ id: '', name: '' })} className={vehicleFilters?.fuelType?.id === '' ? style['is-active'] : ''}>Any</li>
                                {fuelTypesList?.map((fuelType, index) => (
                                    <li key={index} onClick={() => handleFuelChange({ id: fuelType.value, name: fuelType.name })} className={vehicleFilters?.fuelType?.id == fuelType.value ? style['is-active'] : ''}>{fuelType.name}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        <SearchAccordion selected={vehicleFilters?.transmission} title="Gearbox" subtitle={vehicleFilters?.transmission?.name ? vehicleFilters?.transmission?.name : "Manual, Auto"}>
                            <ul>
                                <li onClick={() => handleGearboxChange({ id: '', name: '' })} className={vehicleFilters?.transmission?.id === '' ? style['is-active'] : ''}>Any</li>
                                {transmissionList?.map((transmission, index) => (
                                    <li key={index} onClick={() => handleGearboxChange({ id: transmission.value, name: transmission.name })} className={vehicleFilters?.transmission?.id == transmission.value ? style['is-active'] : ''}>{transmission.name}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        {leaseDealType !== LeasingDealTypes.Van &&
                            <>
                                <SearchAccordion selected={vehicleFilters?.driveTrain} title="Drive Trains" subtitle={vehicleFilters?.driveTrain?.name ? vehicleFilters?.driveTrain?.name : "2WD"}>
                                    <ul>
                                        <li onClick={() => handleDriveTrainChange({ id: '', name: '' })} className={vehicleFilters?.driveTrain?.id === '' ? style['is-active'] : ''}>Any</li>
                                        {driveTrainList?.map((driveTrain, index) => (
                                            <li key={index} onClick={() => handleDriveTrainChange({ id: driveTrain.value, name: driveTrain.name })} className={vehicleFilters?.driveTrain?.id == driveTrain.value ? style['is-active'] : ''}>{driveTrain.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.vehicleStyle} title="Body Type" subtitle={vehicleFilters?.vehicleStyle?.name ? vehicleFilters?.vehicleStyle?.name : "Saloon, Coupe, Estate"}>
                                    <ul>
                                        <li onClick={() => handleVehicleStyleChange({ id: '', name: '' })} className={vehicleFilters?.vehicleStyle?.id === '' ? style['is-active'] : ''}>Any</li>
                                        {vehicleStyleList?.map((vehicleStyle, index) => (
                                            <li key={index} onClick={() => handleVehicleStyleChange({ id: vehicleStyle.value, name: vehicleStyle.name })} className={vehicleFilters?.vehicleStyle?.id == vehicleStyle.value ? style['is-active'] : ''}>{vehicleStyle.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.vehicleSize} title="Vehicle Size" subtitle={vehicleFilters?.vehicleSize?.name ? vehicleFilters?.vehicleSize?.name : "Large, Medium or Small"}>
                                    <ul>
                                        <li onClick={() => handleVehicleSizeChange({ id: '', name: '' })} className={vehicleFilters?.vehicleSize?.id === '' ? style['is-active'] : ''}>Any</li>
                                        {vehicleSizeList?.map((vehicleSize, index) => (
                                            <li key={index} onClick={() => handleVehicleSizeChange({ id: vehicleSize.value, name: vehicleSize?.name })} className={vehicleFilters?.vehicleSize?.id == vehicleSize.value ? style['is-active'] : ''}>{vehicleSize.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.seats} title="Seats" subtitle={vehicleFilters?.seats?.name ? vehicleFilters?.seats?.name : "4"}>
                                    <ul>
                                        <li onClick={() => handleSeatChange({ id: '', name: '' })} className={vehicleFilters?.seats?.id == '' ? style['is-active'] : ''}>Any</li>
                                        {seatList?.map((seat, index) => (
                                            <li key={index} onClick={() => handleSeatChange({ id: seat.value, name: seat.name })} className={vehicleFilters?.seats?.id == seat.value ? style['is-active'] : ''}>{seat.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.engineSize} title="Engine Sizes" subtitle={vehicleFilters?.engineSize?.name ? vehicleFilters?.engineSize?.name : "2.0L"}>
                                    <ul>
                                        <li onClick={() => handleEngineChange({ id: '', name: '' })} className={vehicleFilters?.engineSize?.id === '' ? style['is-active'] : ''}>Any</li>
                                        {vehicleSizelist?.map((engine, index) => (
                                            <li key={index} onClick={() => handleEngineChange({ id: engine.value, name: engine.name })} className={vehicleFilters?.engineSize?.id == engine.value ? style['is-active'] : ''}>{engine.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.mpg} title="MPG" subtitle={vehicleFilters?.mpg?.name ? vehicleFilters?.mpg?.name : "50+"}>
                                    <ul>
                                        <li onClick={() => handleMpgChange({ id: '', name: '' })} className={vehicleFilters?.mpg?.id === '' ? style['is-active'] : ''}>0+</li>
                                        {mpgList?.map((mpg, index) => (
                                            <li key={index} onClick={() => handleMpgChange({ id: mpg.value, name: mpg.name })} className={vehicleFilters?.mpg?.id == mpg.value ? style['is-active'] : ''}>{(mpg.name) ? mpg.name : "0+"}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.co2} title="CO2" subtitle={vehicleFilters?.co2?.name ? vehicleFilters?.co2?.name : "<300"}>
                                    <ul>
                                        <li onClick={() => handleC02Change({ id: '', name: '' })} className={vehicleFilters?.co2?.id === '' ? style['is-active'] : ''}>Any</li>
                                        {c02List?.map((c02, index) => (
                                            <li key={index} onClick={() => handleC02Change({ id: c02.value, name: c02.name })} className={vehicleFilters?.co2?.id == c02.value ? style['is-active'] : ''}>{c02.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                            </>
                        }
                        {leaseDealType === LeasingDealTypes.Van &&
                            <>
                                <SearchAccordion selected={vehicleFilters?.vehicleStyle} title="Body Type" subtitle={vehicleFilters?.vehicleStyle?.name ? vehicleFilters?.vehicleStyle?.name : "Saloon, Coupe, Estate"}>
                                    <ul>
                                        <li onClick={() => handleVehicleStyleChange({ id: '', name: '' })} className={vehicleFilters?.vehicleStyle?.id == '' ? style['is-active'] : ''}>Any</li>
                                        {vehicleStyleList?.map((vehicleStyle, index) => (
                                            <li key={index} onClick={() => handleVehicleStyleChange({ id: vehicleStyle.value, name: vehicleStyle.name })} className={vehicleFilters?.vehicleStyle?.id === vehicleStyle.value ? style['is-active'] : ''}>{vehicleStyle.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                                <SearchAccordion selected={vehicleFilters?.vehicleSize} title="Vehicle Size" subtitle={vehicleFilters?.vehicleSize?.name ? vehicleFilters?.vehicleSize?.name : "Large, Medium or Small"}>
                                    <ul>
                                        <li onClick={() => handleVehicleSizeChange({ id: '', name: '' })} className={vehicleFilters?.vehicleSize?.id === '' ? style['is-active'] : ''}>Any</li>
                                        {vehicleSizeList?.map((vehicleSize, index) => (
                                            <li key={index} onClick={() => handleVehicleSizeChange({ id: vehicleSize.value, name: vehicleSize?.name })} className={vehicleFilters?.vehicleSize?.id == vehicleSize.value ? style['is-active'] : ''}>{vehicleSize.name}</li>
                                        ))}
                                    </ul>
                                </SearchAccordion>
                            </>
                        }
                        <SearchAccordion selected={vehicleFilters?.mileage} title="Annual Mileage" subtitle={vehicleFilters?.mileage?.name ? vehicleFilters?.mileage?.name : "8,000 Miles"}>
                            <ul>
                                {mileageList?.map((mileage, index) => (
                                    <li key={index} onClick={(evt) => handleMileageChange({ id: mileage.value, name: mileage.name })} className={vehicleFilters?.mileage?.id == mileage.value ? style['is-active'] : ''}>{mileage.name}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        <SearchAccordion selected={vehicleFilters?.term} title="Contract Length" subtitle={vehicleFilters?.term?.name ? vehicleFilters?.term?.name : "2 Years"}>
                            <ul>
                                {contractList?.map((contract, index) => (
                                    <li key={index} onClick={(evt) => handleTermChange({ id: contract?.id, name: contract.name })} className={vehicleFilters?.term?.id == contract?.id ? style['is-active'] : ''}>{contract.name}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                        <SearchAccordion selected={vehicleFilters?.initialRental} title="Initial Rental" subtitle={vehicleFilters?.initialRental?.name ? vehicleFilters?.initialRental?.name : "3 Months"}>
                            <ul>
                                {rentalList?.map((rental, index) => (
                                    <li key={index} onClick={(evt) => handleInitialRentalChange({ id: rental.id, name: rental.name })} className={vehicleFilters?.initialRental?.id == rental.id ? style['is-active'] : ''}>{rental.name}</li>
                                ))}
                            </ul>
                        </SearchAccordion>
                    </>
                }
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDetailed);