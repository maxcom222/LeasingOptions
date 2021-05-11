import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import style from './vehicle-manual-details.module.scss';

import { VehicleManualDetails } from 'types/internal/VehicleManualDetails';
import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { formatMoney, unformat } from 'helpers/currencyHelper';

type Props = {
    data: VehicleManualDetails;
    settings: {
        interiorColors: ExtraOption[];
        exteriorColors: ExtraOption[];
        onTryChangeColor: any;
    };
}

//TODO: implement missing validation rules

//get data from single state object otherwise fails when reset method is applied
//reset used to clear form state on data update
//defaultValue is needed for monthlyMaintenancePrice to properly restore its value when maintenance being changed outside
//manual colors foelds conditional rendering applied based on data object to prevent re-rendering before color change confirm received
const VehicleManualDetailsForm: React.FC<Props> = ({ data, settings }) => {
    const { register, errors, setValue, reset } = useFormContext();

    const [boxToggle, setBoxToggle] = useState<boolean>(true);
    const [fieldsStates, setFieldsStates] = useState([
        { name: "dealerOption1Price", disabled: true, visible: true },
        { name: "dealerOption2Price", disabled: true, visible: true },
        { name: "dealerOption3Price", disabled: true, visible: true },
        { name: "monthlyMaintenancePrice", disabled: false, visible: false }
    ]);

    useEffect(() => {
        setValue("mileage", data.mileage);
        setValue("maintenance", data.maintenance);

        setValue("monthlyPrice", data.monthlyPrice);
        setValue("monthlyMaintenancePrice", data.maintenance ? data.monthlyMaintenancePrice : null);
        setValue("initialRentalPrice", data.initialRentalPrice);
        setValue("processingFee", data.processingFee);

        setValue("exteriorColor", data.exteriorColor);
        setValue("interiorColor", data.interiorColor);

        setMaintenanceState(data.maintenance);

        reset();
    }, [data]);

    const getMileages = () => {
        let mileages: number[] = [];

        for (let mileage = 5000; mileage <= 50000; mileage += 1000) {
            mileages.push(mileage);
        }

        return mileages;
    }

    const handleInternalToggle = (evt) => setBoxToggle(!boxToggle);

    const handleColorChange = (evt) => {
        const name = evt.target.name;
        const value = parseInt(evt.target.value) || null;
        const newId = value;
        const prevId = data[name];

        settings.onTryChangeColor(name, prevId, newId);
    }

    const handleDealerOptionChange = (evt) => {
        const name = evt.target.name + "Price";
        const value = evt.target.value;
        const disabled = !value;

        if (disabled) {
            setValue(name, null);
        }

        const fieldState = getFieldState(name);

        if (fieldState && fieldState.disabled !== disabled) {
            setFieldsStates((prevState) => {
                const newStates = prevState.map((item) => {
                    if (item.name === name) {
                        const updatedItem = {
                            ...item,
                            disabled: disabled
                        };

                        return updatedItem;
                    }

                    return item;
                });

                return newStates;
            });
        }
    }

    const handlePriceInput = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;

        setValue(name, value ? formatMoney(unformat(value)) : null);
    }

    const handleMaintenanceChange = (evt) => {
        const mainteance = evt.target.value === "true";

        setMaintenanceState(mainteance);
    }

    const getFieldState = (name: string) => {
        return fieldsStates.find(item => { return item.name === name; });
    }

    const setMaintenanceState = (maintenance: boolean) => {
        const name = "monthlyMaintenancePrice";

        if (!maintenance) {
            setValue(name, null);
        }

        const fieldState = getFieldState(name);

        if (fieldState && fieldState.visible !== maintenance) {
            setFieldsStates((prevState) => {
                const newStates = prevState.map((item) => {
                    if (item.name === name) {
                        const updatedItem = {
                            ...item,
                            visible: maintenance
                        };

                        return updatedItem;
                    }

                    return item;
                });

                return newStates;
            });
        }
    }

    return (
        <div className={`${style['internal-quote']} ${boxToggle ? style['is-active'] : ""}`}>
            <div className={`${style['internal-quote__header']} d-flex justify-content-between align-items-center bg-blue text-white p-3 mb-0 h5`} onClick={(evt) => { handleInternalToggle(evt) }}>Quote Details {boxToggle ? <span>-</span> : <span>+</span>}</div>
            <div className={`${style['internal-quote__info']} bg-white p-3`}>
                <div className="row">
                    <div className="col-24 col-md-8 form-group">
                        <label>Annual Mileage</label>
                        <select name="mileage" className="form-control" ref={register} >
                            {getMileages().map(mileage => (
                                <option key={mileage} value={mileage}>{mileage}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-24 col-md-8 form-group">
                        <label>Maintenance</label>
                        <select name="maintenance" className="form-control" onChange={handleMaintenanceChange} ref={register}>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    {getFieldState("monthlyMaintenancePrice").visible ?
                        (
                            <div className="col-24 col-md-8 form-group">
                                <label>Maintenance Price</label>
                                <input name="monthlyMaintenancePrice" className={`form-control ${errors.monthlyMaintenancePrice ? "is-invalid" : ""}`} type="text"
                                    defaultValue={data.maintenance ? data.monthlyMaintenancePrice : ''}
                                    onBlur={handlePriceInput}
                                    ref={register({
                                        required: 'Monthly maintenance price is required.'
                                    })}
                                />
                                {errors.monthlyMaintenancePrice ? (<span className="invalid-feedback d-block">{errors.monthlyMaintenancePrice?.message}</span>) : null}
                            </div>
                        ) : null}
                </div>
                <div className="row">
                    <div className="col-24 col-md-8 form-group">
                        <label>Monthly Price</label>
                        <input name="monthlyPrice" className={`form-control ${errors.monthlyPrice ? "is-invalid" : ""}`} type="text"
                            onBlur={handlePriceInput}
                            ref={register({
                                required: 'Monthly price is required.'
                            })}
                        />
                        {errors.monthlyPrice ? (<span className="invalid-feedback d-block">{errors.monthlyPrice?.message}</span>) : null}
                    </div>
                    <div className="col-24 col-md-8 form-group">
                        <label>Initial Payment</label>
                        <input name="initialRentalPrice" className={`form-control ${errors.initialRentalPrice ? "is-invalid" : ""}`} type="text"
                            onBlur={handlePriceInput}
                            ref={register({
                                required: 'Initial rental price is required.'
                            })}
                        />
                        {errors.initialRentalPrice ? (<span className="invalid-feedback d-block">{errors.initialRentalPrice?.message}</span>) : null}
                    </div>
                    <div className="col-24 col-md-8 form-group">
                        <label>Processing Fee</label>
                        <input name="processingFee" className={`form-control ${errors.processingFee ? "is-invalid" : ""}`} type="text"
                            onBlur={handlePriceInput}
                            ref={register({
                                required: 'Processing fee is required.'
                            })}
                        />
                        {errors.processingFee ? (<span className="invalid-feedback d-block">{errors.processingFee?.message}</span>) : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-16 form-group">
                        <label>Dealer Option 1</label>
                        <input name="dealerOption1" className="form-control" type="text" maxLength={100}
                            onChange={handleDealerOptionChange}
                            ref={register}
                        />
                    </div>
                    <div className="col-24 col-md-8 form-group">
                        <label>Price</label>
                        <input name="dealerOption1Price" className="form-control" type="text"
                            disabled={getFieldState("dealerOption1Price").disabled}
                            onBlur={handlePriceInput}
                            ref={register}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-16 form-group">
                        <label>Dealer Option 2</label>
                        <input name="dealerOption2" className="form-control" type="text" maxLength={100}
                            onChange={handleDealerOptionChange}
                            ref={register}
                        />
                    </div>
                    <div className="col-24 col-md-8 form-group">
                        <label>Price</label>
                        <input name="dealerOption2Price" className="form-control" type="text"
                            disabled={getFieldState("dealerOption2Price").disabled}
                            onBlur={handlePriceInput}
                            ref={register}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-16 form-group">
                        <label>Dealer Option 3</label>
                        <input name="dealerOption3" className="form-control" type="text" maxLength={100}
                            onChange={handleDealerOptionChange}
                            ref={register}
                        />
                    </div>
                    <div className="col-24 col-md-8 form-group">
                        <label>Price</label>
                        <input name="dealerOption3Price" className="form-control" type="text"
                            disabled={getFieldState("dealerOption3Price").disabled}
                            onBlur={handlePriceInput}
                            ref={register}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-12 form-group">
                        <label>Exterior Colour</label>
                        <select name="exteriorColor" className="form-control" onChange={handleColorChange} ref={register}>
                            <option value="">Not selected</option>
                            <option value="1000">TBC</option>
                            {settings.exteriorColors.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {data.exteriorColor === 1000 ?
                            (
                                <input name="exteriorColorManual" className="form-control mt15" type="text" maxLength={200} ref={register} />
                            ) : null
                        }
                    </div>
                    <div className="col-24 col-md-12 form-group">
                        <label>Interior Color</label>
                        <select name="interiorColor" className="form-control" onChange={handleColorChange} ref={register}>
                            <option value="">Not selected</option>
                            <option value="1000">TBC</option>
                            {settings.interiorColors.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        {data.interiorColor === 1000 ?
                            (
                                <input name="interiorColorManual" className="form-control mt15" type="text" maxLength={200} ref={register} />
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleManualDetailsForm;