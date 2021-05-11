import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import style from './vehicle-options.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faInfoCircle } from "@fortawesome/pro-regular-svg-icons";

import { VehicleAgeCategories } from 'enums/VehicleAgeCategories';

type Props = {
    options: {
        salesCode: number;
        ageCategory: VehicleAgeCategories | null;
    };
    settings: {
        setOptions: any;
        onPricingMatrix: any;
        onErrorFeedback: any;
    }
}

const VehicleOptions: React.FC<Props> = ({ options, settings }) => {
    const { register, errors } = useFormContext();

    const [boxToggle, setBoxToggle] = useState<boolean>(true);

    return (
        <div className={`${style['internal-options']} ${boxToggle ? style['is-active'] : ""}`}>
            <div className={`${style['internal-options__header']} d-flex justify-content-between align-items-center bg-navy text-white p-3 mb-0 h5`} onClick={() => { setBoxToggle(!boxToggle) }}>Internal Options {boxToggle ? <span>-</span> : <span>+</span>}</div>
            <div className={`${style['internal-options__info']} bg-white p-3`}>
                <div className="row">
                    <div className="col-24 d-flex justify-content-end align-items-center">
                        <FontAwesomeIcon width="20" height="20" icon={faInfoCircle} title="Pricing Matrix" onClick={() => settings.onPricingMatrix()} />
                        <FontAwesomeIcon width="20" height="20" icon={faExclamationTriangle} className="ml-1" title="Report Mistake" onClick={() => settings.onErrorFeedback()} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label>Additional Sales Code</label>
                        <select className="form-control" value={options.salesCode || 0} onChange={(evt) => settings.setOptions("salesCode", parseInt(evt.currentTarget.value))}>
                            <option value={0}>£0</option>
                            <option value={100}>£100</option>
                            <option value={200}>£200</option>
                            <option value={300}>£300</option>
                            <option value={400}>£400</option>
                            <option value={500}>£500</option>
                            <option value={750}>£750</option>
                            <option value={1000}>£1000</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label>Age Category</label>
                        <select name="ageCategory" className={`form-control ${errors.ageCategory ? "is-invalid" : ""}`}
                            value={options.ageCategory || ''}
                            onChange={(evt) => settings.setOptions("ageCategory", parseInt(evt.currentTarget.value) || null)}
                            ref={register({ required: true })}
                        >
                            <option value="">Please select...</option>
                            <option value={VehicleAgeCategories.New}>New</option>
                            <option value={VehicleAgeCategories.PreReg}>Pre Reg</option>
                        </select>
                        {errors.ageCategory ? <span className="invalid-feedback d-block">Age category is required</span> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleOptions;