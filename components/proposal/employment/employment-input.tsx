import React, { useEffect, useState, useRef } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import moment from 'moment';

import { getFieldName, getFieldId, getFieldError } from 'helpers/fieldArrayHelper'
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import DatePicker from "react-datepicker";
import AddressInput from '../address/address-input'
import { IsDateInPresentOrPast } from 'helpers/validation';

type Props = {
    formData: any,
    index: number,
    collectionName: string | null;

    //eventsj
    onTimePeriodUpdate: any | null,
    notificationsSubscribe: any | null,
    initialPreviousDate: any,
    showYourPosition: boolean,
    showLandLine: boolean
}

const EmploymentInput: React.FC<Props> = ({ formData, index, collectionName, onTimePeriodUpdate, notificationsSubscribe, initialPreviousDate, showYourPosition, showLandLine }) => {

    const { control, setValue, register, errors } = useFormContext();

    const [isEmployed, setIsEmployed] = useState<boolean>(false);
    const [startDate, setStartDate] = useState(formData.startDate || null);
    const [previousDate, setPreviousDate] = useState(initialPreviousDate);

    useEffect(() => {
        if (formData.typeId) {
            handleEmploymentTypeChange(formData.typeId);
        }

        if (notificationsSubscribe) {
            notificationsSubscribe(handleNotifications, index);
        }
    }, []);


    useEffect(() => {
        calculateTotalMonths(previousDate, startDate);
    }, [startDate, previousDate])


    const fieldName = (name) => {
        return getFieldName(name, collectionName, index);
    }

    //Used to avoid warning for non unique IDs
    const fieldId = (name) => {
        return getFieldId(name, collectionName, index);
    }

    const fieldError = (name: string) => {
        return getFieldError(name, collectionName, index, errors);
    }

    //fromDate - is a previous or current date
    //toDate - is selected date (startDate)
    const calculateTotalMonths = (fromDate, toDate) => {
        if (toDate) {
            const dateStart = moment(fromDate || Date.now()).startOf('day');
            const dateEnd = moment(toDate).endOf('day');

            if (!dateStart.isBefore(dateEnd)) {
                const monthsDelta = dateStart.diff(dateEnd, "months");

                const years = Math.floor(monthsDelta / 12);
                const months = monthsDelta % 12;
                const totalMonthsEmployed = (years ?? 0) * 12 + (months ?? 0);

                setValue(fieldName("timeEmployedYears"), years);
                setValue(fieldName("timeEmployedMonths"), months);
            }
            else {
                setValue(fieldName("timeEmployedYears"), 0);
                setValue(fieldName("timeEmployedMonths"), 0);
            }
        }
    }

    const handleStartDateChanges = (date: any) => {
        setStartDate(date);

        if (onTimePeriodUpdate && date) {
            onTimePeriodUpdate(date);
        }
    }

    const handleEmploymentTypeChange = (typeId) => {
        switch (typeId) {
            case "":
            case "4":
            case "6":
            case "7":
                setIsEmployed(false);
                break;

            default:
                setIsEmployed(true);
                break;
        }
    }

    const handleNotifications = (type: string, data: any) => {
        if (type === "previous-date" && data) {
            setPreviousDate(data);
        }
    }

    return (
        <>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12 col-lg-6">
                    <label htmlFor={fieldId("typeId")}>Type of Employment <small>(Required)</small></label>
                    <select className={`form-control ${fieldError("typeId") ? "is-invalid" : ""}`} id={fieldId("typeId")} name={fieldName("typeId")}
                        ref={register({ required: true })}
                        defaultValue={formData.typeId}
                        onChange={(evt) => { handleEmploymentTypeChange(evt.target.value); }}>
                        <option value="">Please select...</option>
                        <option value="1">Employed Full Time</option>
                        <option value="2">Employed Part Time</option>
                        <option value="3">Employed Temp</option>
                        <option value="4">Retired</option>
                        <option value="5">Home Maker</option>
                        <option value="6">Student</option>
                        <option value="7">Unemployed</option>
                        <option value="8">Self-employed</option>
                    </select>
                    {fieldError("typeId") && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            {isEmployed &&
                <>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor={fieldId("employerName")}>Employer Name <small>(Required)</small></label>
                            <input type="text" className={`form-control ${fieldError("employerName") ? "is-invalid" : ""}`} id={fieldId("employerName")} name={fieldName("employerName")} aria-describedby={fieldId("employerName")}
                                placeholder="Employer Name" maxLength={100}
                                ref={register({ required: true })}
                                defaultValue={formData.employerName} />
                            {fieldError("employerName") && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor={fieldId("natureOfBusiness")}>Nature of Business <small>(Required)</small></label>
                            <input type="text" className={`form-control ${fieldError("natureOfBusiness") ? "is-invalid" : ""}`} id={fieldId("natureOfBusiness")} name={fieldName("natureOfBusiness")} aria-describedby={fieldId("natureOfBusiness")}
                                placeholder="Nature of Business" maxLength={100}
                                ref={register({ required: true })}
                                defaultValue={formData.natureOfBusiness} />
                            {fieldError("natureOfBusiness") && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                    { showYourPosition &&
                        <div className="form-row mb-3">
                            <div className="col-24 col-md-12">
                                <label htmlFor={fieldId("position")}>Your Position <small>(Required)</small></label>
                                <input type="text" className={`form-control ${fieldError("position") ? "is-invalid" : ""}`} id={fieldId("position")} name={fieldName("position")} aria-describedby={fieldId("position")}
                                    placeholder="Job Title" maxLength={100}
                                    ref={register({ required: true })}
                                    defaultValue={formData.position} />
                                {fieldError("position") && <span className="invalid-feedback d-block">This field is required</span>}
                            </div>
                        </div>
                    }
                   
                   { showLandLine &&
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor={fieldId("telephone")}>Landline Telephone <small>(Required)</small></label>
                            <input type="tel" className={`form-control ${fieldError("telephone") ? "is-invalid" : ""}`} id={fieldId("telephone")} name={fieldName("telephone")} aria-describedby={fieldId("telephone")}
                                placeholder="Your Employers No." maxLength={20}
                                ref={register({ required: true, pattern: /^[0-9]*$/ })}
                                defaultValue={formData.telephone} />
                            {fieldError("telephone") && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                    }


                    <h3 className="mt-5">Address</h3>
                    <AddressInput excludeTownAndCounty={true} collectionName={collectionName} index={index} formData={formData} />

                    <hr className="mb-3" />
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <div className="form-row">
                                <div className="col-24">
                                    <label htmlFor="startDate">Start Date <small>(Required)</small></label>
                                </div>
                            </div>
                            <div className="form-row mb-3">
                                <div className="col-24">
                                    <Controller
                                        as={DatePicker}
                                        control={control}
                                        onChange={([selected]) => { handleStartDateChanges(selected); return selected; }}
                                        valueName="selected"
                                        name={fieldName("startDate")}
                                        className={`form-control ${fieldError("startDate") ? "is-invalid" : ""}`}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="From Date"
                                        defaultValue={formData.startDate}
                                        rules={{ 
                                            required: true,
                                            validate: IsDateInPresentOrPast
                                         }}
                                        showMonthDropdown useShortMonthInDropdown showYearDropdown
                                    />
                                    {fieldError("startDate")?.type === "required" && <span className="invalid-feedback d-block">This field is required</span>}
                                    {fieldError("startDate")?.type === "validate" && <span className="invalid-feedback d-block">Date can't be in the future</span>}
                                </div>
                            </div>
                        </div>
                        <div className="col-24 col-md-12">
                            <div className="form-row">
                                <div className="col-24">
                                    <label>Years &amp; months Employed <small>(Required)</small></label>
                                </div>
                            </div>
                            <div className="form-row mb-3">
                                <div className="col-24 col-md-12">
                                    <input type="text" disabled className={`form-control ${fieldError("timeEmployedYears") ? "is-invalid" : ""}`} name={fieldName("timeEmployedYears")} placeholder="Years" maxLength={2}
                                        ref={register({ required: true })}
                                        defaultValue={formData.timeEmployedYears} />
                                    {fieldError("timeEmployedYears") && <span className="invalid-feedback d-block">This field is required</span>}
                                </div>
                                <div className="col-24 col-md-12">
                                    <input type="text" disabled className={`form-control ${fieldError("timeEmployedMonths") ? "is-invalid" : ""}`} name={fieldName("timeEmployedMonths")} placeholder="Months" maxLength={2}
                                        ref={register({ required: true })}
                                        defaultValue={formData.timeEmployedMonths} />
                                    {fieldError("timeEmployedMonths") && <span className="invalid-feedback d-block">This field is required</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default EmploymentInput;