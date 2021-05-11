import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './vehicle-eligible.module.scss';
import PopOver from '../../../components/layout/popover';
import ModalContext from '../../HOCs/modal/modalContext';
import Search from '../../search';
import { connect } from 'react-redux';
import { VehicleTypes } from 'enums/VehicleTypes';
import { PricingTypes } from 'enums/PricingTypes';
import { SearchPanels } from 'enums/SearchPanels';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { GetSearchFiltersUrl } from '../../../helpers/urlHelper';
import { GetPhoneNumber, getSearchButton, FormatValidatePostcode, AddSpaceToPostcode } from 'helpers/helpers';
import { GetVehiclesFilterOptions } from 'business-logic/vehicleService';

type Props = {
    isInternal: boolean;
    dealToggle: LeasingDealTypes;
    vehicleFilters: any;
    userPostcode: string;
    updateUserPostcode: any;
}

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        dealToggle: state.dealSelector,
        vehicleFilters: state.vehicleFilters,
        userPostcode: state.userPostcode,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserPostcode: (userPostcode) => {
            dispatch({ type: 'UPDATE_POSTCODE', userPostcode: userPostcode });
        },
    }
}

const VehicleEligible: React.FC<Props> = ({ isInternal, dealToggle, vehicleFilters, userPostcode, updateUserPostcode }) => {
    const router = useRouter();
    const postcodeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const modalContext = useContext(ModalContext);
    const [validationRequired, setValidationRequired] = useState<boolean>(false);
    const [dealCount, setDealCount] = useState<number>(1);
    const [postcodeSubmitted, setPostcodeSubmitted] = useState<boolean>(userPostcode ? true : false);
    const handleSearchClick = (evt) => {
        modalContext.showModal(Search, { show: true, title: getSearchButton(router, vehicleFilters, dealToggle), activePanel: SearchPanels.SearchDetailed })
    }
    const handlePostcodeSubmit = (evt) => {
        evt.preventDefault();
        let enteredPostcode = postcodeRef.current.value.toLowerCase();

        setPostcodeSubmitted(false);

        if (FormatValidatePostcode(enteredPostcode)) {
            updateUserPostcode(AddSpaceToPostcode(enteredPostcode));
            setValidationRequired(true);
            setPostcodeSubmitted(true);
        } else {
            setValidationRequired(true);
        }
    }

    useEffect(() => {
        GetVehiclesFilterOptions(dealToggle, VehicleTypes.Car, vehicleFilters.manufacturerUrl, vehicleFilters.modelUrl, vehicleFilters.shortDerTextUrl.id, vehicleFilters.term.id, vehicleFilters.initialRental.id, vehicleFilters.mileage.id, vehicleFilters.fuelType.id, vehicleFilters.transmission.id, vehicleFilters.co2.id, vehicleFilters.mpg.id, vehicleFilters.doors.id, vehicleFilters.seats.id, vehicleFilters.driveTrain.id, vehicleFilters.vehicleSize.id, vehicleFilters.vehicleStyle.id, vehicleFilters.engineSize.id, vehicleFilters.priceFrom.id, vehicleFilters.priceTo.id, vehicleFilters.isInStock, vehicleFilters.isSpecial, PricingTypes.Atc, userPostcode).then(function (data) {
            setDealCount(data.data.count);
        });
    }, [dealToggle, userPostcode, vehicleFilters]);

    useEffect(() => {
        setPostcodeSubmitted(userPostcode ? true : false);
    }, [router, userPostcode])

    return (
        <div className={`${style['vehicle-eligible']} ${style['vehicle-eligible--landing']}`}>
            {!postcodeSubmitted &&
                <div className={`${style['vehicle-eligible__block']} ${style['vehicle-eligible__form']}`}>
                    <h3>Are You Eligible? <PopOver id="what-does-it-mean" trigger={<span><FontAwesomeIcon width="20" height="20" icon={faInfoCircle} /> <u>What does this mean?</u></span>} body="To get an insured lease there are certain criteria you have to meet i.e. age, address, occupation." /></h3>
                    <p>{validationRequired ? <span className="invalid-feedback d-inline">Sorry, we can't find that postcode please check and try again. If the postcode is correct, please call us on <a aria-label="Phone number" className="text-red" href={`tel:${GetPhoneNumber(isInternal)}`}><span className="phonenumber_call_now text-red">{GetPhoneNumber(isInternal)}</span></a> for a quote.</span> : <strong>Enter your postcode</strong>}</p>
                    <form onSubmit={(evt) => handlePostcodeSubmit(evt)}>
                        <input ref={postcodeRef} type="text" className={validationRequired ? style['required'] : ''} defaultValue={userPostcode} placeholder="AB12 3CD" />
                        <button type="submit"><FontAwesomeIcon width="16" height="16" icon={faChevronRight} /></button>
                    </form>
                </div>
            }
            {postcodeSubmitted && dealCount > 0 &&
                <div className={`${style['vehicle-eligible__block']} ${style['vehicle-eligible__success']} flex-wrap`}>
                    <h3>Great News!</h3>
                    <p>We have the best insured car leasing deals available for you!</p>
                    <button className={`btn btn-primary ${style['btn-primary']} btn-lg flex-grow-1 mb-3 mr-md-3`}><Link passHref href={GetSearchFiltersUrl(dealToggle, userPostcode ? userPostcode.replace(/\s/g, '-').toLowerCase() : '', vehicleFilters)}><a className="text-decoration-none">See {dealCount} Insured Leasing Deals</a></Link></button>
                    <button className={`btn btn-outline-secondary ${style['btn-outline-secondary']} btn-lg flex-grow-1 mb-md-3`} onClick={(evt) => handleSearchClick(evt)}>Refine Search</button>
                </div>
            }
            {postcodeSubmitted && dealCount === 0 &&
                <div className={`${style['vehicle-eligible__block']} ${style['vehicle-eligible__matches']} flex-wrap`}>
                    <h3>Possible Matches..</h3>
                    <p>We just need the check a few details to ensure we offer you the best prices.</p>
                    <a className={`btn btn-primary ${style['btn-primary']} btn-lg flex-grow-1 mb-3 mr-md-3`} aria-label="Phone number" href={`tel:${GetPhoneNumber(isInternal)}`}>Call to Confirm Details</a>
                    <Link passHref href="/request-callback"><a className={`btn btn-outline-secondary ${style['btn-outline-secondary']} btn-lg flex-grow-1 mb-md-3`}>Not ready? Request a Callback</a></Link>
                </div>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEligible);