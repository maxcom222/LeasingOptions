import React from 'react';
import { useFormContext, Controller } from "react-hook-form";

import { UKMobileNumberIsValid } from 'helpers/validation';
import { PhoneNumberIsValid } from 'helpers/validation';

const BusinessContactPhones = ({ formData }) => {

    const { register, errors } = useFormContext();

    return (
        <>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="landline">Business Landline <small>(Required)</small></label>
                    <input type="tel" className={`form-control ${errors.landline ? "is-invalid" : ""}`} id="landline" name="landline" aria-describedby="landline" placeholder="Business Telephone"
                        ref={register({
                            required: true,
                            validate: value => PhoneNumberIsValid(value) === true || 'Please specify a valid UK landline number.'
                        })} defaultValue={formData.landline} />
                    {errors.landline && <span className="invalid-feedback d-block">Please specify a valid UK landline number.</span>}
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="fax">Business Fax Number</label>
                    <input type="tel" className={`form-control ${errors.fax ? "is-invalid" : ""}`} id="fax" name="fax" aria-describedby="fax" placeholder="Your Fax Number"
                        ref={register({
                            validate: value => PhoneNumberIsValid(value) === true || 'Please specify a valid UK landline number.'
                        })} defaultValue={formData.landline} />
                    {errors.landline && <span className="invalid-feedback d-block">Please specify a valid UK landline number.</span>}
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="tel" className={`form-control ${errors.mobileNumber ? "is-invalid" : ""}`} id="mobileNumber" name="mobileNumber" aria-describedby="mobileNumber" placeholder="Your Mobile Number"
                        ref={register({
                            validate: value => UKMobileNumberIsValid(value, true) === true || 'Please specify a valid UK mobile number.'
                        })} defaultValue={formData.mobileNumber} />
                    {errors.mobileNumber && <span className="invalid-feedback d-block">Please specify a valid UK mobile number.</span>}
                </div>
            </div>
        </>
    )
}

export default BusinessContactPhones