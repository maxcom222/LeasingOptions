import React, { useState } from 'react';
import style from './vehicle-details.module.scss';
import moment from 'moment';

type Props = {
    data: any //TODO: add class
}

const InternalVehicleDetails: React.FC<Props> = ({ data }) => {
    const [boxToggle, setBoxToggle] = useState<boolean>(true);
    const createdOn = moment(data?.createdOn, "YYYY-MM-DDTHH:mm:ss");
    const formattedCreatedOn = createdOn.format("DD/MM/YYYY HH:mm:ss");
    const updatedOn = moment(data?.updatedOn, "YYYY-MM-DDTHH:mm:ss");
    const formattedUpdatedOn = updatedOn.format("DD/MM/YYYY HH:mm:ss");

    if (data) {
        return (
            <div className={`${style['internal-details']} ${boxToggle ? style['is-active'] : ""}`}>
                <div className={`${style['internal-details__header']} d-flex justify-content-between align-items-center bg-navy text-white p-3 mb-0 h5`} onClick={() => { setBoxToggle(!boxToggle) }}>Internal Details {boxToggle ? <span>-</span> : <span>+</span>}</div>
                <div className={`${style['internal-details__info']} bg-white p-3`}>
                    <div className="row mb-3 mb-0">
                        <div className="col-24 col-md-8"><strong>Created:</strong> {formattedCreatedOn} ({data?.createdBy})</div>
                        <div className="col-24 col-md-16"><strong>Updated:</strong> {formattedUpdatedOn} ({data?.updatedBy})</div>
                    </div>
                    <div className="row mb-3 mb-0">
                        <div className="col-24 col-md-8"><strong>Cap Id:</strong> {data?.capId}</div>
                        <div className="col-24 col-md-8"><strong>Vehicle Ref:</strong> {data?.vehicleRef}</div>
                        <div className="col-24 col-md-8"><strong>Dealer Name:</strong> {data?.dealerName}</div>
                    </div>
                    <div className="row mb-3 mb-0">
                        <div className="col-24 col-md-8"><strong>CH Funder Name (2 Year):</strong> {data?.chFunderName2Year}</div>
                        <div className="col-24 col-md-8"><strong>CH Funder Name (3 Year):</strong> {data?.chFunderName3Year}</div>
                        <div className="col-24 col-md-8"><strong>CH Funder Name (4 Year):</strong> {data?.chFunderName4Year}</div>
                    </div>
                    <div className="row mb-3 mb-0">
                        <div className="col-24 col-md-8"><strong>PCH Funder Name (2 Year):</strong> {data?.pchFunderName2Year}</div>
                        <div className="col-24 col-md-8"><strong>PCH Funder Name (3 Year):</strong> {data?.pchFunderName3Year}</div>
                        <div className="col-24 col-md-8"><strong>PCH Funder Name (4 Year):</strong> {data?.pchFunderName4Year}</div>
                    </div>
                    {data?.notes ? (
                        <div className="row mb-3 mb-0">
                            <div className="col-24"><strong>Notes:</strong><br />{data?.notes}</div>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }

    return null;
}

export default InternalVehicleDetails;