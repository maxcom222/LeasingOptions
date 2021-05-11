import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { getFieldName, getFieldError } from 'helpers/fieldArrayHelper'
import { IsOver18 } from 'helpers/validation';
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';

const DateOfBirth = ({ collectionName, index, defaultValue, minYears }) => {

    const { register, errors, control } = useFormContext();  

    return (
        <div className="form-row mb-3">
            <div className="col-24 col-md-12 col-lg-6">
                <label>Date of Birth <small>(Required)</small></label>
                <Controller
                    as={DatePicker}
                    control={control}
                    valueName="selected"
                    name={getFieldName("dob", collectionName, index)}
                    className={`form-control ${getFieldError("dob", collectionName, index, errors) ? "is-invalid" : ""}`}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date().setFullYear(new Date().getFullYear() - minYears)}
                    placeholderText="Date of birth"
                    defaultValue={defaultValue}
                    rules={{ 
                        required: true,
                        validate: IsOver18
                     }}
                    showMonthDropdown useShortMonthInDropdown showYearDropdown={15}
                />
  
                {getFieldError("dob", collectionName, index, errors)?.type === "required" && <span className="invalid-feedback d-block">This field is required</span>}
                {getFieldError("dob", collectionName, index, errors)?.type === "validate" && <span className="invalid-feedback d-block">You need to be at least 18 years old</span>}
            </div>
        </div>
    )
}

export default DateOfBirth