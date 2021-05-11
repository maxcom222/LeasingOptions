import React, { useState } from 'react';
import  Router from 'next/router';
import style from './navigation.module.scss';
import { VehicleTypes } from 'enums/VehicleTypes';
import { GetDealTypeUrl } from 'helpers/urlHelper';
import { connect } from 'react-redux';
import { GetModels } from 'business-logic/vehicleService';

function mapStateToProps(state) {
    return {
        carManufacturerList: state.carManufacturerList,
        vanManufacturerList: state.vanManufacturerList,
    };
}

const NavModel = ({id, VehicleType, dealSelector, ...otherProps}) => {
    const [manfacturer, setManufacturer] = useState<string>();
    const [modelList, setModelList] = useState([]);
    let manufacturerList = (VehicleType === VehicleTypes.Commercial  ? otherProps.vanManufacturerList : otherProps.carManufacturerList);
    const handleModelRequest = (evt) => {
        const manfacturerUrl = evt.currentTarget.value;
        setManufacturer(manfacturerUrl);

        if (manfacturerUrl) {
            GetModels(VehicleType, manfacturerUrl).then((data) => {
                setModelList(data.data);
            });
        }
    }
    const handleModelClick = (model: string) => {
        if (manfacturer) {
            GetModels(VehicleType, manfacturer).then((data) => {
                setModelList(data.data);
            });
        }
        Router.push(GetDealTypeUrl(dealSelector, '/[make]/[shortModel]'), GetDealTypeUrl(dealSelector, '/'+manfacturer+'/' + model))
    }

    return (
        <div id={id} className={style['panel-content']}>
            <div className="form-group">
                <select className="form-control" onChange={(evt) => handleModelRequest(evt)}>
                    <option value="">Select Make</option>
                    {manufacturerList.map(manufacturer => 
                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.text}</option>
                    )}
                </select>
            </div> 
            <div className="form-group">
                <select className="form-control"  onChange={(evt) => handleModelClick(evt.currentTarget.value)}>
                    <option value="">Select Model</option>
                    {modelList.map(model => 
                        <option key={model.id} value={model.id}>{model.text}</option>
                    )}
                </select>
            </div> 
        </div>
    );
}

export default connect(mapStateToProps)(NavModel); 