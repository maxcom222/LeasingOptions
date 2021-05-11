import React from 'react';
import Link from 'next/link';
import style from './vehicle-slideup.module.scss';

import { GetPhoneNumber, GetVATText } from 'helpers/helpers';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { connect } from 'react-redux';

type Props = {
    isInternal: boolean;
    leasingDealType: LeasingDealTypes;
    monthlyPrice: string;
    settings: {
        isSimpleMode: boolean;
        proceedAllowed: boolean;
        onProceed: any;
    };
}

const VehicleSlideup: React.FC<Props> = ({ isInternal, monthlyPrice, leasingDealType, settings }) => {
    const handleButtonClick = (type) => {
        if (settings.onProceed && settings.proceedAllowed) {
            settings.onProceed(type);
        }
    }

    return (
        <div className={`${style['vehicle-slideup']} container-fluid py-2`}>
            <div className="row">
                <div className="col-24 col-md-12 d-flex justify-content-start align-items-center">
                    <span className={`d-inline text-white mr-3 ${style['vehicle-price']}`}>{monthlyPrice}</span>
                    <p className="d-inline text-white mb-0"><span>{LeasingDealTypes[leasingDealType]} price per month {GetVATText(leasingDealType)}</span><br /><a href={`tel:${GetPhoneNumber(isInternal)}`}>Call us</a> or <Link passHref href="/request-callback"><a>Request a call back</a></Link></p>
                </div>
                <div className="col-24 col-md-12 d-flex justify-content-between justify-content-md-end align-items-center mt-3 mt-md-0">
                    {(!settings.isSimpleMode && settings.proceedAllowed) ? (
                        <>
                            <button className={`${style['btn']} btn btn-outline-light btn-lg btn-fluid flex-grow-1 flex-md-grow-0 mr-3`} onClick={() => handleButtonClick("enquiry")}>Enquire Now</button>
                            <button className={`${style['btn']} btn btn-primary btn-lg btn-fluid flex-grow-1 flex-md-grow-0`} onClick={() => handleButtonClick("order")}>Order this {leasingDealType === LeasingDealTypes.Van ? "van" : "car"}</button>
                        </>
                    ) : null}
                    {(settings.isSimpleMode && settings.proceedAllowed) ? (
                        <>
                            <button className={`${style['btn']} btn btn-primary btn-lg btn-fluid flex-grow-1 flex-md-grow-0 mr-3`} onClick={() => handleButtonClick("order")}>Continue to Order</button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(VehicleSlideup);