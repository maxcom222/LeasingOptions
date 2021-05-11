import React from 'react';
import AccountBox from '../account-box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { DealSheet } from 'types/account/DealSheet';
import { formatMoney, formatNumber } from 'helpers/currencyHelper';

type Props = {
    currentContract: DealSheet;
}

const AccountDetails:React.FC<Props> = (props) => {
    
    return (
        <AccountBox icon={<FontAwesomeIcon icon={faFileSignature} />} title="YOUR CONTRACT DETAILS" border={true}>
            <div className="w-100 mb-4 p-3 bg-white">
                <div className="row">
                    <div className="col-16">Contract end date</div>
                    <div className="col-8 text-right"><strong className="text-black">{props.currentContract?.renewalDate}</strong></div>
                    <div className="col-24 mt-2">
                        <div className="progress-bar">
                            <img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/progress.png`} className="img-fluid" alt="Progress bar" />
                            <div className="elapsed" style={{"width" : props.currentContract?.elapsedPercentage + "%"}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-24 col-sm-10">
                    <p className="mb-2"><strong className="text-acc">Additional Information</strong><br />P11D {formatMoney(parseFloat(props.currentContract?.p11D))}<br />{props.currentContract?.co2}g/km CO2 emissions</p>
                    <p className="mb-3"><strong className="text-acc">Fuel Type</strong><br />{props.currentContract?.fuelType}</p>
                    <p className="mb-3"><strong className="text-acc">Transmission</strong><br />{props.currentContract?.transmission}</p>
                    <p className="mb-3"><strong className="text-acc">Drive Train</strong><br />{props.currentContract?.driveTrain}</p>
                    <p className="mb-3"><strong className="text-acc">Age</strong><br />{props.currentContract?.age}</p>
                    <p className="mb-3"><strong className="text-acc">Interior Colour</strong><br />{props.currentContract?.interiorColour}</p>
                    <p className="mb-3"><strong className="text-acc">Exterior Colour</strong><br />{props.currentContract?.exteriorColour}</p>
                    <p className="mb-3"><strong className="text-acc">Quotation Inclusions</strong><br />{props.currentContract?.quotationInclusions}</p>
                </div>
                <div className="col-24 col-sm-14">
                    <div className="w-100 mb-3 p-3 bg-white">
                        <div className="row mb-2">
                            <div className="col-16">Contract term</div>
                            <div className="col-8 text-right"><strong className="text-black">{props.currentContract?.contractTerm}</strong></div>
                        </div>
                        <div className="row">
                            <div className="col-14 col-md-12">Contract mileage</div>
                            <div className="col-10 col-md-12 text-right"><strong className="text-black">{formatNumber(props.currentContract?.contractMileage)} miles per year</strong></div>
                        </div>
                    </div>
                    <div className="w-100 mb-3 p-3 bg-white">
                        <div className="row mb-2">
                            <div className="col-16">Initial rental ({props.currentContract?.vatType})</div>
                            <div className="col-8 text-right"><strong className="text-black">{formatMoney(props.currentContract?.initialRental)}</strong></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-16">Number of subsequent rentals</div>
                            <div className="col-8 text-right"><strong className="text-black">{props.currentContract?.subsequentRentals}</strong></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-16">Monthly finance rental ({props.currentContract?.vatType})</div>
                            <div className="col-8 text-right"><strong className="text-black">{formatMoney(props.currentContract?.financeRental)}</strong></div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-16">Monthly maintenance rental ({props.currentContract?.vatType})</div>
                            <div className="col-8 text-right"><strong className="text-black">{props.currentContract?.maintenanceRental}</strong></div>
                        </div>
                        <div className="row">
                            <div className="col-16"><strong>Total Monthly rental</strong> ({props.currentContract?.vatType})</div>
                            <div className="col-8 text-right"><strong className="text-black">{formatMoney(props.currentContract?.monthlyRental)}</strong></div>
                        </div>
                    </div>
                    <div className="w-100 mb-3 p-3 bg-white">
                        <div className="row">
                            <div className="col-16">Processing fee ({props.currentContract?.vatType})</div>
                            <div className="col-8 text-right"><strong className="text-black">{formatMoney(props.currentContract?.processingFee)}</strong></div>
                        </div>
                    </div>
                    <div className="w-100 mb-3 p-3 bg-white">
                        <div className="row">
                            <div className="col-16">Excess mileage charge (pence per mile)</div>
                            <div className="col-8 text-right"><strong className="text-black">{props.currentContract?.excessMileageCharge}</strong></div>
                        </div>
                    </div>
                    <p><strong>Due to decimal roundings actual pence figures may vary, very slightly, from those quoted above.</strong></p>
                    <p>All payments are inclusive of VAT which is applicable at the prevailing rate. Should the VAT rate change (up or down) during the contract, your Direct Debit payments will be adjusted accordingly.</p>
                </div>
            </div>
        </AccountBox>
    )
}

export default AccountDetails;