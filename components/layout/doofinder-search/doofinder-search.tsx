import React from 'react';
import { connect } from 'react-redux';
import style from './doofinder-search.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { VehicleTypes } from 'enums/VehicleTypes';

type Props = {
    vehiclePreference: VehicleTypes;
    dispatchvehiclePreference: any;
}

const DoofinderSearch: React.FC<Props> = ({ vehiclePreference, dispatchvehiclePreference }) => {
    const handleVehicleTypeChange = (vehicleType) => {
        dispatchvehiclePreference(vehicleType);
    }

    return (
        <div className={style['doofinder-block']}>
            <ul>
                <li><button className={`btn btn-text btn-block text-center ${vehiclePreference === VehicleTypes.Car ? style['is-selected'] : ''}`} onClick={() => handleVehicleTypeChange(VehicleTypes.Car)}>Car Leasing</button></li>
                <li><button className={`btn btn-text btn-block text-center ${vehiclePreference === VehicleTypes.Commercial ? style['is-selected'] : ''}`} onClick={() => handleVehicleTypeChange(VehicleTypes.Commercial)}>Van Leasing</button></li>
            </ul>
            <div className={style['doofinder-block__input']}>
                <div className={style['input-wrapper']}>
                    <div className={style['input-icon']}><FontAwesomeIcon width="16" height="16" icon={faSearch} /></div>
                    <input type="search" id="doofinderSearch" placeholder={vehiclePreference === VehicleTypes.Car ? "e.g. BMW 3 Series" : "e.g. Ford Transit"} />
                </div>
            </div>
        </div>     
    )
}

const mapStateToProps = (state) => ({
    vehiclePreference: state.vehiclePreference,
    isInternal: state.isInternal
});

const mapDispatchToProps = dispatch => {
    return {
        dispatchvehiclePreference: (data: VehicleTypes) => {
            dispatch({ type: "UPDATE_VEHICLE_PREFERENCE", data: data });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoofinderSearch);