import React from 'react';
import { useFormContext } from "react-hook-form";
import { getFieldName, getFieldError, getFieldId } from 'helpers/fieldArrayHelper'

const PropertyTenireSelector = ({ collectionName, index, defaultValue }) => {

    const { register, errors } = useFormContext();
    const fieldError = () => {
        return getFieldError("propertyTenureId", collectionName, index, errors);
    }

    return (
        <div className="form-row mb-3">
            <div className="col-24 col-md-12 col-lg-6">
                <label htmlFor="propertyTenure">Property Tenure <small>(Required)</small></label>
                <select className={`form-control ${fieldError() ? "is-invalid" : ""}`}
                    name={getFieldName("propertyTenureId", collectionName, index)}
                    ref={register({ required: true })} defaultValue={defaultValue}>
                    <option value="">Please select...</option>
                    <option value="1">Leasehold</option>
                    <option value="2">Freehold</option>
                </select>
                {fieldError() && <span className="invalid-feedback d-block">This field is required</span>}
            </div>
        </div>
    )
}

export default PropertyTenireSelector