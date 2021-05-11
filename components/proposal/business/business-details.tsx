import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import '../../../node_modules/react-datepicker/dist/react-datepicker.min.css';
import DatePicker from "react-datepicker";
import { IsDateInPresentOrPast } from 'helpers/validation';

const BusinessDetails = ({ formData, includeCompanyNumber }) => {

    const { register, errors, control, watch } = useFormContext();

    const watchIsVatRegistered = watch("isVatRegistered", formData.isVatRegistered);

    return (
        <>
            <h3>Business Details</h3>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="tradingName">Trading Name <small>(Required)</small></label>
                    <input type="text" className={`form-control ${errors.tradingName ? "is-invalid" : ""}`} id="tradingName" name="tradingName" aria-describedby="tradingName" placeholder="Trading Name" maxLength={100}
                        defaultValue={formData.tradingName} ref={register({ required: true })} />
                    {errors.tradingName && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="natureOfBusiness">Nature of Business <small>(Required)</small></label>
                    <input type="text" className={`form-control ${errors.natureOfBusiness ? "is-invalid" : ""}`} id="natureOfBusiness" name="natureOfBusiness" aria-describedby="natureOfBusiness" placeholder="Nature of Business" maxLength={100}
                        defaultValue={formData.natureOfBusiness} ref={register({ required: true })} />
                    {errors.natureOfBusiness && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12 col-lg-6">
                    <label htmlFor="dob">Date Established <small>(Required)</small></label>
                    <Controller
                        as={DatePicker}
                        control={control}
                        valueName="selected" // DateSelect value's name is selected
                        name="establishedDate"
                        className={`form-control ${errors.establishedDate ? "is-invalid" : ""}`}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Date Established"
                        defaultValue={formData.establishedDate}
                        rules={{ 
                            required: true,
                            validate: IsDateInPresentOrPast
                        }}
                        showMonthDropdown useShortMonthInDropdown showYearDropdown={15}
                    />
                    {errors?.establishedDate?.type === "required"  && <span className="invalid-feedback d-block">This field is required</span>}
                    {errors?.establishedDate?.type === "validate"  && <span className="invalid-feedback d-block">Date can't be in the future</span>}                   
                </div>
            </div>
            <div className="form-row">
                <div className="col-24 col-md-12">
                    <label>Are you VAT registered? <small>(Required)</small></label>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${errors.isVatRegistered ? "is-invalid" : ""}`} type="radio" name="isVatRegistered" id="yes" value="yes"
                            ref={register({ required: true })}
                            defaultChecked={formData.isVatRegistered === 'yes'} />
                        <label className="form-check-label" htmlFor="yes">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className={`form-check-input ${errors.isVatRegistered ? "is-invalid" : ""}`} type="radio" name="isVatRegistered" id="no" value="no"
                            ref={register({ required: true })}
                            defaultChecked={formData.isVatRegistered === 'no'} />
                        <label className="form-check-label" htmlFor="no">No</label>
                    </div>
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    {errors.isVatRegistered && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            {
                watchIsVatRegistered === "yes" &&
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12 col-lg-6">
                        <label>VAT Number <small>(Required)</small></label>
                        <input type="number" className={`form-control ${errors.vatNumber ? "is-invalid" : ""}`} id="vatNumber" name="vatNumber" aria-describedby="vatNumber" placeholder="VAT Number"
                            ref={register({ required: true, pattern: /^[0-9]*$/ })}
                            defaultValue={formData.vatNumber} />
                        {errors.vatNumber && <span className="invalid-feedback d-block">This field is required</span>}
                    </div>
                </div>
            }
            {
                includeCompanyNumber === true &&
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12 col-lg-6">
                        <label htmlFor="dependents">Company Registration Number <small>(Required)</small></label>
                        <input type="number" className={`form-control ${errors.companyReg ? "is-invalid" : ""}`} id="companyReg" name="companyReg" aria-describedby="companyReg" placeholder="Company Registration Number"
                            ref={register({ required: true, pattern: /^[0-9]*$/ })}
                            defaultValue={formData.companyReg} />
                        {errors.companyReg && <span className="invalid-feedback d-block">This field is required</span>}
                    </div>
                </div>
            }
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="parentCompany">Parent Company</label>
                    <input type="text" className="form-control" id="parentCompany" name="parentCompany" aria-describedby="parentCompany" placeholder="Parent Company" maxLength={100}
                        defaultValue={formData.parentCompany}
                        ref={register()} />
                </div>
            </div>
        </>
    )
}

export default BusinessDetails