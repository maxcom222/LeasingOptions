import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { PricingTypes } from 'enums/PricingTypes';
import { ApiResponse } from 'types/infrastructure/ApiResponse';
import { GetPricingMatrix } from 'business-logic/vehicleService';

type Props = {
    onRequestClose: any;

    vehicleRef: number;
    vehicleName: string;
    pricingType?: PricingTypes;
    userPostcode?: string;
}

const VehiclePricingMatrixModal: React.FC<Props> = ({ onRequestClose, pricingType, userPostcode, vehicleRef, vehicleName, ...otherProps }) => {
    const [pricingMatrix, setPricingMatrix] = useState([]);

    useEffect(() => {
        GetPricingMatrix(vehicleRef, pricingType, userPostcode)
            .then((result: ApiResponse) => {
                if (result.isSucceed) {
                    setPricingMatrix(result.data);
                }
                else {
                    alert("Failed to get data.");
                }
            })
    }, []);

    return (
        <Modal onHide={onRequestClose} centered={true} {...otherProps}>
            <Modal.Header className="d-flex flex-nowrap justify-content-center align-items-center" closeButton>
                <Modal.Title className="text-center">Pricing Matrix</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Vehicle Ref:<br /><strong>{vehicleRef}</strong></p>
                <p>Vehicle:<br /><strong>{vehicleName}</strong></p>
                <sup>8k mileage prices / no maintanence</sup>
                <table className="w-100">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Term</th>
                            <th>Price</th>
                            <th>Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pricingMatrix.map((row, index) => (
                            <tr key={index}>
                                <td>{row.dealType}</td>
                                <td>{row.term}</td>
                                <td>{row.price}</td>
                                <td>{row.source}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    )
}

export default VehiclePricingMatrixModal;