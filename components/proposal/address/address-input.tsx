import React, { useEffect } from 'react';
import PostcodeLookup from './../postcode-lookup/index';
import { getFieldName, getFieldId, getFieldError } from 'helpers/fieldArrayHelper'
import { useFormContext } from 'react-hook-form';

type Props = {
    excludeTownAndCounty: boolean,
    formData: any,
    index: number,
    collectionName: string | null;
}

const AddressInput: React.FC<Props> = ({ excludeTownAndCounty, formData, index, collectionName }) => {

    const { setValue, register, errors } = useFormContext();

    const onAddressSelected = (address) => {
        setValue(fieldName("address1"), address.address1);
        setValue(fieldName("address2"), address.address2);
        setValue(fieldName("address3"), address.address3);
        setValue(fieldName("town"), address.town);
        setValue(fieldName("county"), address.county);
        setValue(fieldName("postcode"), address.postcode);

        setValue(fieldName("timestamp"), Date.now());
    };

    const fieldName = (name) => {
        return getFieldName(name, collectionName, index);
    }

    //Used to avoid warning for non unique IDs
    const fieldId = (name) => {
        return getFieldId(name, collectionName, index);
    }

    const fieldError = (name: string, errors: any) => {
        return getFieldError(name, collectionName, index, errors);
    }

    return (
        <>
            <input type="hidden" name={fieldName("timestamp")} defaultValue={formData.timestamp} ref={register()} />
            <div className="form-row mb-3">
                <div className="col-24">
                    <label htmlFor="postcodeLookup">Start typing an address or postcode</label>
                    <PostcodeLookup minQueryLength={4} excludeTownAndCounty={excludeTownAndCounty} onAddressSelected={onAddressSelected} />
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor={fieldId("address1")}>Address <small>(Required)</small></label>
                    <input type="text" className={`form-control ${fieldError("address1", errors) ? "is-invalid" : ""}`}
                        id={fieldId("address1")} name={fieldName("address1")} placeholder="Number and street" maxLength={100}
                        ref={register({ required: true })} defaultValue={formData.address1} />
                    {fieldError("address1", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor={fieldId("address2")}>Address Line 2</label>
                    <input type="text" className="form-control" id={fieldId("address2")} name={fieldName("address2")} placeholder="Address 2" maxLength={100}
                        ref={register()} defaultValue={formData.address2} />
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor={fieldId("address3")}>Address Line 3</label>
                    <input type="text" className="form-control" id={fieldId("address3")} name={fieldName("address3")} placeholder="Address 3" maxLength={100}
                        ref={register()} defaultValue={formData.address3} />
                </div>
            </div>

            {(!excludeTownAndCounty) &&
                <>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor={fieldId("town")}>Town / City <small>(Required)</small></label>
                            <input type="text" className={`form-control ${fieldError("town", errors) ? "is-invalid" : ""}`} id={fieldId("town")} name={fieldName("town")} placeholder="Town" maxLength={100}
                                ref={register({ required: true })} defaultValue={formData.town} />
                            {fieldError("town", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                    <div className="form-row mb-3">
                        <div className="col-24 col-md-12">
                            <label htmlFor={fieldId("county")}>County <small>(Required)</small></label>
                            <input type="text" className={`form-control ${fieldError("county", errors) ? "is-invalid" : ""}`} id={fieldId("county")} name={fieldName("county")} placeholder="County" maxLength={100}
                                ref={register({ required: true })} defaultValue={formData.county} />
                            {fieldError("county", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                        </div>
                    </div>
                </>
            }
            <div className="form-row mb-3">
                <div className="col-24 col-md-12">
                    <label htmlFor={fieldId("postcode")}>Postcode <small>(Required)</small></label>
                    <input type="text" className={`form-control ${fieldError("postcode", errors) ? "is-invalid" : ""}`} id={fieldId("postcode")} name={fieldName("postcode")} placeholder="Postcode" maxLength={10}
                        ref={register({ required: true })}
                        defaultValue={formData.postcode}
                        onChange={() => { setValue(fieldName("timestamp"), Date.now()); }} />
                    {fieldError("postcode", errors) && <span className="invalid-feedback d-block">This field is required</span>}
                </div>
            </div>
        </>
    )
}

export default AddressInput;