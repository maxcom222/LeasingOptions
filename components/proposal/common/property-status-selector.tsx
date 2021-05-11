import React from 'react';
import { useFormContext } from "react-hook-form";
import { getFieldName, getFieldError, getFieldId } from 'helpers/fieldArrayHelper'

const PropertyStatusSelector = ({ collectionName, index, defaultValue }) => {

    const { register, errors } = useFormContext();
    const fieldError = () => {
        return getFieldError("propertyStatusId", collectionName, index, errors);
    }

    return (
        <div className="form-row mb-3">
            <div className="col-24 col-md-12 col-lg-6">
                <label>Property Status <small>(Required)</small></label>
                <select className={`form-control ${fieldError() ? "is-invalid" : ""}`}
                    name={getFieldName("propertyStatusId", collectionName, index)}
                    ref={register({ required: true })} defaultValue={defaultValue}>
                    <option value="">Please select...</option>
                    <option value="1">Mortgaged</option>
                    <option value="2">Living with Parents</option>
                    <option value="3">Owned Outright</option>
                    <option value="4">Rented</option>
                    <option value="5">Council Tenant</option>
                    <option value="6">Private Tenant</option>
                    <option value="7">Living with Partner</option>
                    <option value="8">Other</option>
                </select>
                {fieldError() && <span className="invalid-feedback d-block">This field is required</span>}
            </div>
        </div>
    )
}

export default PropertyStatusSelector