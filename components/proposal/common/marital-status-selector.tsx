import React from 'react';
import { useFormContext } from "react-hook-form";
import { getFieldName, getFieldError, getFieldId } from 'helpers/fieldArrayHelper'

const MaritalStatusSelector = ({ collectionName, index, defaultValue }) => {

    const { register, errors } = useFormContext();

    const fieldError = () => {
        return getFieldError("maritalStatusId", collectionName, index, errors);
    }

    return (
        <div className="form-row mb-3">
            <div className="col-24 col-md-12 col-lg-6">
                <label>Marital Status <small>(Required)</small></label>
                <select className={`form-control ${fieldError() ? "is-invalid" : ""}`}
                    name={getFieldName("maritalStatusId", collectionName, index)}
                    ref={register({ required: true })} defaultValue={defaultValue}>
                    <option value="">Please select...</option>
                    <option value="1">Single</option>
                    <option value="2">Married</option>
                    <option value="3">Divorced</option>
                    <option value="4">Separated</option>
                    <option value="5">Widow</option>
                    <option value="6">Widower</option>
                    <option value="7">Living with Partner</option>
                </select>
                {fieldError() && <span className="invalid-feedback d-block">This field is required</span>}
            </div>
        </div>
    )
}

export default MaritalStatusSelector