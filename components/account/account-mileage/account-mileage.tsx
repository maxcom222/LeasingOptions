import React, { useState, useEffect } from 'react';
import AccountBox from '../account-box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import { formatNumber, formatMoney } from 'accounting';
import { DealSheet } from 'types/account/DealSheet';

type Props = {
    currentContract: DealSheet;
}

type ErrorList = {
    odometer: string;
}

type ProjectedList = {
    projectedMileage: number;
    projectedCharge: number;
    projectedExcess: number;
    totalAllowance: number;
}

const AccountMileage: React.FC<Props> = (props) => {
    const calcForm = React.useRef() as React.MutableRefObject<HTMLFormElement> || null;
    const [currentContract, setCurrentContract] = useState<DealSheet>();
    const [odometer, setOdometer] = useState<number | null>(null);
    const [projected, setProjected] = useState<ProjectedList>();
    const [errors, setErrors] = useState<ErrorList>({ odometer: "" });
    const [validated, setValidated] = useState<boolean>(true);
    const [showProjected, setShowProjected] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear().toString().substr(-2);

    let startDate = currentContract?.actualDate.split('/') || "10/11/12";
    let startDay = startDate[0];
    let startMonth = startDate[1];
    let startYear = startDate[2];

    const handleMileageError = (event) => {
        const { name, value } = event;

        switch (name) {
            case 'odometerReading':
                errors.odometer = value === "" || isNaN(value) ? 'Odometer reading is required.' : '';
                break;
            default:
                break;
        }

        setErrors(errors);
    }

    const handleMileageCalc = (evt) => {
        evt.preventDefault();

        // Loop over React.useRef form field elements
        for (var i = 0, field; field = calcForm.current.elements[i++];) {
            handleMileageError(field);
        }

        if (validateMileageCalc(errors)) {
            setValidated(true);
            submitvalidateMileageCalc();
        } else {
            setValidated(false);
        }
    }

    const validateMileageCalc = (errors) => {
        let valid = true;

        Object.values(errors).forEach(key => {
            if (key !== "") {
                valid = false;
            }
        });

        return valid;
    }

    const handleOdometerChange = (evt) => {
        setOdometer(parseInt(evt.target.value));
    }

    const submitvalidateMileageCalc = () => {
        var odometerReading = odometer!;
        var todaysDate = new Date();
        var readingDate = moment(todaysDate.getDate() + "/" + (todaysDate.getMonth() + 1) + "/" + todaysDate.getFullYear(), "DD/MM/YYYY");
        var startDate = moment(currentContract?.actualDate, "DD/MM/YYYY");
        var renewalDate = moment(currentContract?.renewalDate, "DD/MM/YYYY");

        let totalAllowance = currentContract?.contractMileage! * (currentContract?.contractTerm! / 12);
        let elapsedDays = moment(readingDate!).diff(startDate, 'days');
        let totalDays = moment(renewalDate!).diff(startDate, 'days');
        let milesPerDay = elapsedDays > 0 ? odometerReading / elapsedDays : 0;
        let projectedMiles = milesPerDay > 0 ? Math.round(milesPerDay * totalDays) : 0;
        let projectedExcess = milesPerDay > 0 ? projectedMiles - totalAllowance : 0;
        let projectedCharge = (parseFloat(currentContract?.excessMileageCharge!) * projectedExcess) / 100;

        let projectedResults = {
            projectedMileage: projectedMiles,
            projectedCharge: projectedCharge,
            projectedExcess: projectedExcess,
            totalAllowance: totalAllowance
        }

        setProjected(projectedResults);

        if (projectedExcess > 0) {
            setShowProjected(true);
            setShowSuccess(false);
        } else {
            setShowProjected(false);
            setShowSuccess(true);
        }
    }

    useEffect(() => {
        setCurrentContract(props.currentContract)
    }, [props.currentContract])

    return (
        <AccountBox icon={<FontAwesomeIcon icon={faTachometerAlt} />} title=" MILEAGE CALCULATOR" border={true}>
            <form ref={calcForm}>
                <div className="w-100 p-3 bg-white">
                    <div className="row mb-3">
                        <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                            <div className="bg-acc-grey py-2"><strong>Lease Start Date</strong></div>
                        </div>
                        <div className="col-8 col-md-4 text-center pr-0 pl-md-0 pr-md-3">
                            <div className="bg-acc-grey py-2">{startDay}</div>
                        </div>
                        <div className="col-8 col-md-4 text-center pl-md-0">
                            <div className="bg-acc-grey py-2">{startMonth}</div>
                        </div>
                        <div className="col-8 col-md-4 text-center pl-0 pl-md-0">
                            <div className="bg-acc-grey py-2">{startYear?.toString().substr(-2)}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                            <div className="bg-acc-grey py-2"><strong>Length of Lease</strong></div>
                        </div>
                        <div className="col-24 col-md-12 text-center pl-md-0">
                            <div className="bg-acc-grey py-2">{currentContract?.contractTerm} Months</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                            <div className="bg-acc-grey py-2"><strong>Annual Mileage</strong></div>
                        </div>
                        <div className="col-24 col-md-12 text-center pl-md-0">
                            <div className="bg-acc-grey py-2">{formatNumber(currentContract?.contractMileage!)} miles</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                            <div className="bg-acc-grey py-2"><strong>Excess Miles Charge</strong></div>
                        </div>
                        <div className="col-24 col-md-12 text-center pl-md-0">
                            <div className="bg-acc-grey py-2">{currentContract?.excessMileageCharge}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                            <div className="bg-acc-grey py-2"><strong>Odometer Reading</strong></div>
                        </div>
                        <div className="col-24 col-md-12 text-center pl-md-0">
                            <input type="number" className={`form-control cal-control ${validated ? "" : "is-invalid"}`} name="odometerReading" placeholder="10, 000 miles" onChange={(evt) => handleOdometerChange(evt)} />
                            <div className="invalid-feedback">{errors.odometer}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                            <div className="bg-acc-grey py-2"><strong>Reading Date</strong></div>
                        </div>
                        <div className="col-8 col-md-4 text-center pr-0 pl-md-0 pr-md-3">
                            <div className="bg-acc-grey py-2">{currentDay}</div>
                        </div>
                        <div className="col-8 col-md-4 text-center pl-md-0">
                            <div className="bg-acc-grey py-2">{currentMonth}</div>
                        </div>
                        <div className="col-8 col-md-4 text-center pl-0 pl-md-0">
                            <div className="bg-acc-grey py-2">{currentYear}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 text-center">
                            <button className="btn btn-primary btn-lg" onClick={handleMileageCalc}>Calculate</button>
                        </div>
                    </div>
                </div>
            </form>
            <hr className={showProjected && odometer !== null || showSuccess && odometer !== null ? "" : "d-none"} />
            <div className={`row ${showSuccess && odometer !== null ? "" : "d-none"}`}>
                <div className="col-24 text-center">
                    <div className="bg-acc-grey">You are within your mileage allowance</div>
                </div>
            </div>
            <div className={`w-100 p-3 bg-white ${showProjected && odometer !== null ? "" : "d-none"}`}>
                <div className="row mb-3">
                    <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                        <div className="bg-acc-grey py-2"><strong>Projected Mileage</strong></div>
                    </div>
                    <div className="col-24 col-md-12 text-center pl-md-0">
                        <div className="bg-acc-grey py-2">{formatNumber(projected?.projectedMileage)} miles</div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                        <div className="bg-acc-grey py-2"><strong>Total Allowance</strong></div>
                    </div>
                    <div className="col-24 col-md-12 text-center pl-md-0">
                        <div className="bg-acc-grey py-2">{formatNumber(projected?.totalAllowance)} miles</div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-24 col-md-12 mb-3 mb-md-0 text-center">
                        <div className="bg-acc-grey py-2"><strong>Projected Excess</strong></div>
                    </div>
                    <div className="col-24 col-md-12 text-center pl-md-0">
                        <div className="bg-acc-grey py-2">{formatNumber(projected?.projectedExcess)} miles</div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-24 col-md-12 d-flex mb-3 mb-md-0 text-center">
                        <div className="w-100 d-flex justify-content-center align-items-center bg-acc-grey py-2"><strong>Projected Lease<br />Mileage Charge</strong></div>
                    </div>
                    <div className="col-24 col-md-12 d-flex text-center pl-md-0">
                        <div className="w-100 d-flex justify-content-center align-items-center bg-acc-grey py-2 text-acc"><strong>{formatMoney(projected?.projectedCharge, "£")}</strong></div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-24 col-md-12 mb-3 mb-md-0">
                        <button className="btn btn-success btn-lg btn-fluid btn-block">Save Calculation</button>
                    </div>
                    <div className="col-24 col-md-12">
                        <button className="btn btn-primary btn-lg btn-fluid btn-block">Discuss Account</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                        <p className="text-mid-grey text-center m-0">All calculators are made available as self-help tools for your Independent use with results based on information provided by the user. All examples are hypothetical and are for illustrative purposes only. Calculated results are believed to be accurate but results are not guaranteed. Leasing Options can not and do not accept responsibility for accuracy or outcomes.</p>
                    </div>
                </div>
            </div>
        </AccountBox>
    )
}

export default AccountMileage;