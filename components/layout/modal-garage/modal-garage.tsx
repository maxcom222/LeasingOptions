import _ from 'underscore';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import { GarageStorageHelper } from '../../garage/_libs/helpers/garageStorageHelper';
import { HistoryStorageHelper } from '../../history/_libs/helpers/historyStorageHelper';
import { VehiclesStorageProvider } from '../../../helpers/vehiclesStorageProvider';
import { VehicleStorageTypes } from "enums/VehicleStorageTypes";
import { logLabelEvent } from "helpers/analytics";
import { setCookie } from 'nookies';

type Props = {
    onRequestClose: any,
}

const ModalGarage: React.FC<Props> = ({ onRequestClose, ...otherProps }) => {
    const router = useRouter();
    const orderedStorageItems = _.sortBy(HistoryStorageHelper.getItems(true), function(orderedStorageItem) { return orderedStorageItem.timeStamp; });
    const slicedStorageItems = orderedStorageItems.reverse().slice(0, VehiclesStorageProvider.getTriggerMaxSize(VehicleStorageTypes.History))
    const [vehicleHistory, setVehicleHistory] = useState(slicedStorageItems);
    const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const handleClose = () => {
        setCookie(null, "HasClosedGaragePromo", "true", { expires: expiryDate, path: '/' });
        logLabelEvent('my-garage-modal', 'decline', 'modal');
    }
    const addToGarage = () => {
        vehicleHistory.map(item => {
            GarageStorageHelper.addOrUpdateItem(item.vehicle);
        });
          
        router.push('/my-garage?referrer=modal');
    }

    return (
        <>
            <Modal className="modal--compare" onHide={onRequestClose} centered={true} {...otherProps}>
                <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                    <Modal.Title className="text-center capitalize mb-0">My Garage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-24 text-center">
                            <p className="mb-0">We've noticed you've been looking at the following vehicles:</p>
                        </div>
                    </div>
                    {vehicleHistory?.length > 0 &&
                        <div className="row">
                            {vehicleHistory.map(vehicle => {
                                return (
                                    <div className={`col-24 col-md-12 ${vehicleHistory?.length > 2 ? 'col-lg-6' : ''} mb-md-3`}>
                                        {vehicle.summary?.imageUrl &&
                                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/${vehicle.summary?.imageUrl}`} className="img-fluid lazyload mb-2" alt={`${vehicle.summary?.make} ${vehicle.summary?.model}`} />
                                        }
                                        <small className="w-100 d-block mb-2 text-center"><strong>{vehicle.summary?.make} {vehicle.summary?.model}</strong> <br />{vehicle.summary?.derivative}</small>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <div className="row">
                        <div className="col-24 text-center">
                            <p className="mb-0">Did you know, you can add them to your garage and compare them?</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex flex-md-nowrap justify-content-center align-items-center">
                    <button className="btn btn-danger btn-lg btn-fluid-xs mb-2 mb-md-0 mr-sm-3 garage-modal-dismiss" onClick={() => { handleClose(); onRequestClose()}}>Dismiss</button>
                    <button className="btn btn-primary btn-lg btn-fluid-xs garage-modal-compare" onClick={addToGarage}>Compare Now</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalGarage;