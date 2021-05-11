import React, { useState, useEffect } from 'react';
import style from './garage-item.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/pro-light-svg-icons";

import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { isNullOrWhiteSpace } from 'helpers/stringHelper';
import { GetMakes, GetManufacturersModelsGarage, GetModelsTrimsGarage } from 'business-logic/vehicleService';

type Props = {
    idx: number;
    settings: {
        onSelect: any;
    }
}

const GarageVehicleSelector: React.FC<Props> = ({ idx, settings }) => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [derivatives, setDerivatives] = useState([]);

    const [leasingDealType, setLeasingDealType] = useState<LeasingDealTypes>(undefined);
    const [makeUrl, setMakeUrl] = useState<string>('');
    const [modelUrl, setModelUrl] = useState<string>('');
    const [vehicleRef, setVehicleRef] = useState<number>(undefined);

    useEffect(() => {
        if (leasingDealType) {
            GetMakes(leasingDealType === LeasingDealTypes.Van ? VehicleTypes.Commercial : VehicleTypes.Car)
                .then((result: ApiResponse) => {
                    let data = [];

                    if (result.isSucceed && result.data) {
                        data = result.data;
                    }

                    setMakeUrl('');
                    setMakes(data);
                });
        }
        else {
            setMakeUrl('');
            setMakes([]);
        }
    }, [leasingDealType]);

    useEffect(() => {
        if (leasingDealType && !isNullOrWhiteSpace(makeUrl)) {
            //TODO: ApiResponse required
            GetManufacturersModelsGarage(leasingDealType === LeasingDealTypes.Van ? VehicleTypes.Commercial : VehicleTypes.Car, makeUrl)
                .then((data) => {
                    setModelUrl('');
                    setModels(data.data);
                });
        }
        else {
            setModelUrl('');
            setModels([]);
        }
    }, [makeUrl]);

    useEffect(() => {
        if (leasingDealType && !isNullOrWhiteSpace(makeUrl) && !isNullOrWhiteSpace(modelUrl)) {
            GetModelsTrimsGarage(leasingDealType === LeasingDealTypes.Van ? VehicleTypes.Commercial : VehicleTypes.Car, makeUrl, modelUrl)
                .then((result: ApiResponse) => {
                    let data = [];

                    if (result.isSucceed && result.data) {
                        data = result.data;
                    }

                    //TODO: check here
                    (undefined);
                    setDerivatives(data);
                });
        }
        else {
            setVehicleRef(undefined);
            setDerivatives([]);
        }
    }, [modelUrl]);

    const handleDealTypeChange = (evt) => {
        setLeasingDealType(parseInt(evt.currentTarget.value) || undefined);
        setMakeUrl('');
        setModelUrl('');
        setVehicleRef(undefined);
    };

    const handleMakeChange = (evt) => {
        setMakeUrl(evt.currentTarget.value);
        setModelUrl('');
        setVehicleRef(undefined);
    }

    const handleModelChange = (evt) => {
        setModelUrl(evt.currentTarget.value);
        setVehicleRef(undefined);
    }

    const handleDerivativeChange = (evt) => {
        setVehicleRef(parseInt(evt.currentTarget.value) || undefined);
    }

    const handleClear = () => {
        setLeasingDealType(undefined);
        setMakeUrl('');
        setMakes([]);
        setModelUrl('');
        setModels([]);
        setVehicleRef(undefined);
        setDerivatives([]);
    };

    const handleSelectVehicle = () => {
        if (settings.onSelect) {
            settings.onSelect(idx, {
                leasingDealType: leasingDealType,
                makeUrl: makeUrl,
                modelUrl: modelUrl,
                vehicleRef: vehicleRef
            });
        }
    };

    return (
        <div className={`${style['garage-column']} w-100 box box--thick bg-white p-3 py-md-4`}>
            <div className="w-100 d-flex justify-content-between align-items-center mb-3">Select <span><FontAwesomeIcon width="30" height="30" icon={faTimes} className="fa-2x" onClick={handleClear} /></span>
            </div>
            <div className="form-group text-left">
                <select className="form-control" onChange={handleDealTypeChange} value={leasingDealType || ''}>
                    <option value="">Contract Type</option>
                    <option value={LeasingDealTypes.Business}>Business</option>
                    <option value={LeasingDealTypes.Personal}>Personal</option>
                    <option value={LeasingDealTypes.Van}>Van</option>
                </select>
            </div>
            <div className="form-group text-left">
                <select className="form-control" onChange={handleMakeChange} value={makeUrl}>
                    <option value="">Make</option>
                    {makes.map(item => (
                        <option key={item.id} value={item.id}>{item.text}</option>
                    ))}
                </select>
            </div>
            <div className="form-group text-left">
                <select className="form-control" onChange={handleModelChange} value={modelUrl}>
                    <option value="">Model</option>
                    {models.map(model =>
                        <option key={model.id} value={model.id}>{model.text}</option>
                    )}
                </select>
            </div>
            <div className="form-group text-left">
                <select className="form-control" onChange={handleDerivativeChange} value={vehicleRef || ''}>
                    <option value="">Vehicle</option>
                    {derivatives.map(trim =>
                        <option key={trim.id} value={trim.id}>{trim.text}</option>
                    )}
                </select>
            </div>
            {vehicleRef ?
                (<button className="btn btn-outline-secondary btn-block btn-labeled btn-lg" onClick={handleSelectVehicle}>
                    <span className="btn-label"><FontAwesomeIcon width="16" height="16" icon={faPlus} /></span>
                    <span className="btn-text">Add This Vehicle</span>
                </button>) : null
            }
        </div>
    );
}

export default GarageVehicleSelector;