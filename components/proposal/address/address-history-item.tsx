import React, { useState, useEffect, useRef } from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { getFieldName, getFieldError } from 'helpers/fieldArrayHelper'
import DatePicker from "react-datepicker";
import moment from 'moment';
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import AddressInput from './address-input'
import { IsDateInPresentOrPast } from 'helpers/validation';



type Props = {
    title: string,
    fromDateRequired: boolean,
    timeAtAddressRequired: boolean,
    addressData: any,

    collectionName: string | null,
    index: any,

    //events
    onTimePeriodUpdate: any | null
}

const AddressHistoryItem: React.FC<Props> = ({ title, fromDateRequired, timeAtAddressRequired, addressData, collectionName, index,
    onTimePeriodUpdate }, ...props) => {

    const { control, setValue, errors, register } = useFormContext();

    const [fromDate, setFromDate] = useState(addressData?.fromDate ?? null);
    const [timeAtAddressYears, setTimeAtAddressYears] = useState<number>(addressData?.timeAtAddressYears ?? 0);
    const [timeAtAddressMonths, setTimeAtAddressMonths] = useState<number>(addressData?.timeAtAddressMonths ?? 0);
    const [totalMonthsAtAddress, setTotalMonthsAtAddress] = useState<number>(parseInt(addressData?.totalMonthsAtAddress ?? 0))

    const [fromDateYears, setFromDateYears] = useState<number>(0);
    const [fromDateMonths, setFromDateMonths] = useState<number>(0);


    useEffect(() => {
        calculateTotalHistory();
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            updateTimePeriod();
        }

    }, [fromDate, timeAtAddressYears, timeAtAddressMonths]);


    const handleTimePeriodChanges = (fieldName: string, value: any) => {
        switch (fieldName) {
            case "fromDate":
                setFromDate(value);

                const now = moment().startOf('day');
                let result = 0;

                if (!now.isBefore(value)) {
                    result = now.diff(value, "months");

                    const years: number = Math.floor(result / 12);
                    const months: number = result % 12;

                    setTimeAtAddressYears(years);
                    setTimeAtAddressMonths(months);
                }
                break;

            case "timeAtAddressYears":
                if (value) {
                    setTimeAtAddressYears(parseInt(value ?? 0));
                }
                else {
                    setTimeAtAddressYears(0);
                }
                break;

            case "timeAtAddressMonths":
                if (value) {
                    setTimeAtAddressMonths(parseInt(value ?? 0));
                }
                else {
                    setTimeAtAddressMonths(0);
                }
                break;
        }
    }

    const calculateTotalHistory = () => {

        let result = 0;

        if (fromDateRequired && fromDate) {
            const now = moment().startOf('day');

            if (!now.isBefore(fromDate)) {
                result = now.diff(fromDate, "months");

                const years: number = Math.floor(result / 12);
                const months: number = result % 12;

                setFromDateYears(years);
                setFromDateMonths(months);
            }
            else {
                setFromDateYears(0);
                setFromDateMonths(0);
            }
        }
        else if (timeAtAddressRequired) {
            result = (timeAtAddressYears ?? 0) * 12 + (timeAtAddressMonths ?? 0);
        }

        return result;
    }

    const updateTimePeriod = () => {

        const totalMonthsAtAddress = calculateTotalHistory();

        setTotalMonthsAtAddress(totalMonthsAtAddress);

        if (onTimePeriodUpdate) {
            onTimePeriodUpdate(totalMonthsAtAddress);
        }
    }


    return (
        <React.Fragment>
            <input type="hidden" ref={register()} defaultValue={totalMonthsAtAddress} name={getFieldName("totalMonthsAtAddress", collectionName, index)} />
            <input type="hidden" ref={register()} defaultValue={timeAtAddressYears} name={getFieldName("timeAtAddressYears", collectionName, index)} />
            <input type="hidden" ref={register()} defaultValue={timeAtAddressMonths} name={getFieldName("timeAtAddressMonths", collectionName, index)} />


            <h2 className="mb-5">{title}</h2>
            <AddressInput excludeTownAndCounty={false} formData={addressData} index={index} collectionName={collectionName} />

            {fromDateRequired &&
                <>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12 col-lg-6">
                            <label>From Date <small>(Required)</small></label>
                            <Controller
                                as={DatePicker}
                                control={control}
                                onChange={([selected]) => { handleTimePeriodChanges("fromDate", selected); return selected; }}
                                valueName="selected"
                                name={getFieldName("fromDate", collectionName, index)}
                                className={`form-control ${getFieldError("fromDate", collectionName, index, errors) ? "is-invalid" : ""}`}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="From Date"
                                maxDate={new Date()}
                                defaultValue={addressData.fromDate}
                                rules={{
                                    required: true,
                                    validate: IsDateInPresentOrPast
                                }}
                                showMonthDropdown useShortMonthInDropdown showYearDropdown
                            />
                            {getFieldError("fromDate", collectionName, index, errors)?.type === "required" && <span className="invalid-feedback d-block">This field is required</span>}
                            {getFieldError("fromDate", collectionName, index, errors)?.type === "validate" && <span className="invalid-feedback d-block">Date can't be in the future</span>}
                        </div>
                    </div>
                    <p>{`${fromDateYears} Year(s) ${fromDateMonths} Month(s)`}</p>
                </>
            }

            {timeAtAddressRequired &&
                <>
                    <div className="form-row">
                        <div className="col-24 col-md-12">
                            <label htmlFor="yearsMonths2">Years &amp; months at address <small>(Required)</small></label>
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-6 col-lg-3">
                            <input type="text"
                                className={`form-control ${getFieldError("timeAtAddressYears", collectionName, index, errors) ? "is-invalid" : ""}`}
                                name={getFieldName("timeAtAddressYears", collectionName, index)} placeholder="Years"
                                ref={register(
                                    {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Valid value is required'
                                        },
                                        min: {
                                            value: 0,
                                            message: 'Valid value is required'
                                        },
                                        max: {
                                            value: 100,
                                            message: 'Valid value is required'
                                        }
                                    })}
                                defaultValue={addressData.timeAtAddressYears}
                                onBlur={(evt) => { handleTimePeriodChanges("timeAtAddressYears", evt.target.value); }}
                                onKeyPress={(evt) => { if (evt.keyCode === 13) { handleTimePeriodChanges("timeAtAddressYears", (evt.target as HTMLInputElement).value); evt.stopPropagation(); } }}
                            />
                            {
                                getFieldError("timeAtAddressYears", collectionName, index, errors) &&
                                <span className="invalid-feedback d-block">{getFieldError("timeAtAddressYears", collectionName, index, errors)?.message}</span>
                            }
                        </div>
                        <div className="col-24 col-md-6 col-lg-3">
                            <input type="text"
                                className={`form-control ${getFieldError("timeAtAddressMonths", collectionName, index, errors) ? "is-invalid" : ""}`}
                                name={getFieldName("timeAtAddressMonths", collectionName, index)} placeholder="Months"
                                ref={register(
                                    {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Valid value is required'
                                        },
                                        min: {
                                            value: 0,
                                            message: 'Valid value is required'
                                        },
                                        max: {
                                            value: 100,
                                            message: 'Valid value is required'
                                        }
                                    })}
                                defaultValue={addressData.timeAtAddressMonths}
                                onBlur={(evt) => { handleTimePeriodChanges("timeAtAddressMonths", evt.target.value); }} />
                            {
                                getFieldError("timeAtAddressMonths", collectionName, index, errors) &&
                                <span className="invalid-feedback d-block">{getFieldError("timeAtAddressMonths", collectionName, index, errors)?.message}</span>
                            }
                        </div>
                    </div>
                </>
            }
            <div className="mb-5"></div>
        </React.Fragment>
    )
}

export default AddressHistoryItem