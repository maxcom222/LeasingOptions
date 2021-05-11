import React from 'react';
import { useFormContext } from "react-hook-form";
import { getFieldName, getFieldError, getFieldId } from 'helpers/fieldArrayHelper'

const PropertyTypeSelector = ({ collectionName, index, defaultValue }) => {

    const { register, errors } = useFormContext();
    const fieldError = () => {
        return getFieldError("propertyTypeId", collectionName, index, errors);
    }
    const fieldName = () => {
        return getFieldName("propertyTypeId", collectionName, index);
    }

    return (
        <>
            <div className="form-row">
                <div className="col-24 col-md-12">
                    <label htmlFor="propertyType">Property Type <small>(Required)</small></label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-24 col-md-12">
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${fieldError() ? "is-invalid" : ""}`} type="radio" name={fieldName()} id={getFieldId("house", collectionName, index)} value="1"
                            ref={register({ required: true })} defaultChecked={defaultValue == 1} />
                        <label className="form-check-label" htmlFor={getFieldId("house", collectionName, index)}>House</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${fieldError() ? "is-invalid" : ""}`} type="radio" name={fieldName()} id={getFieldId("flat", collectionName, index)} value="2"
                            ref={register({ required: true })} defaultChecked={defaultValue == 2} />
                        <label className="form-check-label" htmlFor={getFieldId("flat", collectionName, index)}>Flat</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${fieldError() ? "is-invalid" : ""}`} type="radio" name={fieldName()} id={getFieldId("cottage", collectionName, index)} value="3"
                            ref={register({ required: true })} defaultChecked={defaultValue == 3} />
                        <label className="form-check-label" htmlFor={getFieldId("cottage", collectionName, index)}>Cottage</label>
                    </div>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    {fieldError() && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
        </>
    )
}

export default PropertyTypeSelector