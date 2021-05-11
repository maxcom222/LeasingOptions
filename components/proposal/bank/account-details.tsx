import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import SortcodeLookup from './../sortcode-lookup/index';

const AccountDetails = ({ formData, showSortCodeLookup, showAccountName, showAccountNumer }) => {

    const { setValue, register, errors } = useFormContext();

    const onBankSelected = (address) => {
        setValue("bankName", address.name);
        setValue("address1", address.address1);
        setValue("address2", address.address2);
        setValue("address3", address.address3);
        setValue("town", address.town);
        setValue("county", address.county);
        setValue("postcode", address.postcode);
        setValue("timestamp", Date.now());
    };

    return (
        <>
            <input type="hidden" id="postcode" name="postcode" ref={register()} defaultValue={formData.postcode} />
            <input type="hidden" id="address1" name="address1" ref={register()} defaultValue={formData.address1} />
            <input type="hidden" id="address2" name="address2" ref={register()} defaultValue={formData.address2} />
            <input type="hidden" id="address3" name="address3" ref={register()} defaultValue={formData.address3} />
            <input type="hidden" id="town" name="town" ref={register()} defaultValue={formData.town} />
            <input type="hidden" id="county" name="county" ref={register()} defaultValue={formData.county} />
            <input type="hidden" id="timestamp" name="timestamp" ref={register()} defaultValue={formData.timestamp || Date.now()} />

            { showSortCodeLookup &&
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12">
                        <label>Sort Code (Lookup) <small>(Required)</small></label>
                        <SortcodeLookup onBankSelected={onBankSelected} selectedSortCode={formData.sortCode} register={register} errors={errors} />
                    </div>
                </div>
            }
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor="bankName">Bank Name <small>(Required)</small></label>
                    <input type="text" className={`form-control ${errors.bankName ? "is-invalid" : ""}`} id="bankName" name="bankName" aria-describedby="bankName" placeholder="Your Bank Name" maxLength={100}
                        ref={register({ required: true })}
                        defaultValue={formData.bankName} />
                    {errors.bankName && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            { showAccountName &&
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12">
                        <label htmlFor="accountName">Account Name <small>(Required)</small></label>
                        <input type="text" className={`form-control ${errors.accountName ? "is-invalid" : ""}`} id="accountName" name="accountName" aria-describedby="accountName" placeholder="Your Account Name" maxLength={100}
                            ref={register({ required: true })}
                            defaultValue={formData.accountName} />
                        {errors.accountName && <span className="invalid-feedback d-block">This field is required</span>}
                        <span className="text-blue">Payments must be made from the applicants main account</span>
                    </div>
                </div>
            }
            
            { showAccountNumer &&
                <div className="form-row mb-3">
                    <div className="col-24 col-md-12">
                        <label htmlFor="accountNumber">Account Number <small>(Required)</small></label>
                        <input type="text" className={`form-control ${errors.accountNumber ? "is-invalid" : ""}`} id="accountNumber" name="accountNumber" aria-describedby="accountNumber" placeholder="Your Account Number" maxLength={8}
                            ref={register({ required: true, minLength: 8, maxLength: 8, pattern: /^[0-9]*$/ })}
                            defaultValue={formData.accountNumber} />
                        {errors.accountNumber && <span className="invalid-feedback d-block">This field is required</span>}
                    </div>
                </div>
            }
            <p className="mb-3">Please confirm that you are authorised to set-up a direct debit and to allow payments to be made using the bank details provided, without the permission of any other account holders.</p>
            <div className="w-100 text-right form-check pl-0 pr-3 mb-3">
                
                { (showAccountNumer && showAccountName) &&                    
                    <label className="form-check-label" htmlFor="authorised">I am authorised to set-up a direct debit and to allow payments to be made using the bank details provided</label>
                }

                { !(showAccountNumer && showAccountName) &&
                    <label className="form-check-label" htmlFor="authorised"> I am authorised to set up a direct debit and to allow payments to be made using this account</label>
                }
                
                <input className={`form-check-input mr-0 ml-2 ${errors.authorised ? "is-invalid" : ""}`} type="checkbox" defaultChecked={formData.authorised} id="authorised" name="authorised" ref={register({ required: true })}></input>
                {errors.authorised && <span className="invalid-feedback d-block">Please authorised the set-up of a direct debit to allow payments to be made using the bank details provided</span>}
            </div>
        </>
    )
}

export default AccountDetails;