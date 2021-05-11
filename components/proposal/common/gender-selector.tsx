import React from 'react';
import { useFormContext } from "react-hook-form";
import { getFieldName, getFieldError, getFieldId } from 'helpers/fieldArrayHelper'


const GenderSelector = ({ collectionName, index, defaultValue }) => {

    const { register, errors } = useFormContext();

    const fieldName = getFieldName("genderId", collectionName, index);
    const fieldError = getFieldError("genderId", collectionName, index, errors);
    const fieldId = (name) => {
        return getFieldId(name, collectionName, index);
    }

    return (
        <>
            <div className="form-row">
                <div className="col-24 col-md-12">
                    <label htmlFor="genderId">Gender <small>(Required)</small></label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-24 col-md-12">
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${fieldError ? "is-invalid" : ""}`} type="radio" name={fieldName} id={fieldId("male")} value={1} ref={register({ required: true })} defaultChecked={defaultValue == 1} />
                        <label className="form-check-label" htmlFor={fieldId("male")} >Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${fieldError ? "is-invalid" : ""}`} type="radio" name={fieldName} id={fieldId("female")} value={2} ref={register({ required: true })} defaultChecked={defaultValue == 2} />
                        <label className="form-check-label" htmlFor={fieldId("female")}>Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${fieldError ? "is-invalid" : ""}`} type="radio" name={fieldName} id={fieldId("other")} value={3} ref={register({ required: true })} defaultChecked={defaultValue == 3} />
                        <label className="form-check-label" htmlFor={fieldId("other")}>Other</label>
                    </div>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    {fieldError && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
        </>
    )
}

export default GenderSelector