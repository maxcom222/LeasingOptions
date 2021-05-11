import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import VehicleExtraOptionsRelationshipsManager from '../vehicle-extra-options-relationships-manager';

import { LeasingDealTypes } from "enums/LeasingDealTypes";
import { ExtraOption } from 'types/vehicle-options/ExtraOption';
import { ExtraOptionRelationship } from 'types/vehicle-options/ExtraOptionRelationship';
import { ExtraOptionsManagerState } from 'types/components/vehicle-options/ExtraOptionsManagerState';

type Props = {
    title: string;
    onRequestClose: any;

    data: {
        extraOptions: ExtraOption[];
        extraOptionsRelationships: ExtraOptionRelationship[];
    };

    options: {
        leasingDealType: LeasingDealTypes;
    };

    initialState: ExtraOptionsManagerState;

    settings: {
        onApply: any;
        onCancel: any;
    };
}

const VehicleExtarOptionsConfirmModal: React.FC<Props> = ({ title, data, options, initialState, settings, onRequestClose, ...otherProps }) => {
    const [currentState, setCurrentState] = useState<ExtraOptionsManagerState>(initialState);

    const hadleCancelClick = () => {
        if (settings.onCancel) {
            settings.onCancel();
        }

        onRequestClose();
    }

    const handleApplyClick = () => {
        if (settings.onApply) {
            settings.onApply(currentState);
        }

        onRequestClose();
    }

    const onManagerStateChanged = (managerState: ExtraOptionsManagerState) => {
        setCurrentState(managerState);
    }

    return (
        <Modal onHide={hadleCancelClick} centered={true} scrollable={true} {...otherProps}>
            <Modal.Header className="options-title d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                <Modal.Title className="mb-0">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <VehicleExtraOptionsRelationshipsManager
                    options={data.extraOptions}
                    relationships={data.extraOptionsRelationships}

                    leasingDealType={options.leasingDealType}
                    state={currentState}

                    settings={{
                        onStateChanged: onManagerStateChanged
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger btn-lg d-flex justify-content-center align-items-center flex-grow-1" onClick={hadleCancelClick}>Cancel</button>
                <button className="btn btn-primary btn-lg d-flex justify-content-center align-items-center flex-grow-1" onClick={handleApplyClick}>Apply</button>
            </Modal.Footer>
        </Modal>
    )
}

export default VehicleExtarOptionsConfirmModal;