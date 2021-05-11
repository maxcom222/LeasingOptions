import React, { useState, useContext, useEffect } from 'react';
import AccountBox from '../account-box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { DealSheet } from 'types/account/DealSheet';
import { Button } from 'react-bootstrap';
import AccountAPI from 'API/AccountAPI';
import { Customer } from 'types/account/Customer';

type Props = {
    currentContract: DealSheet;
    handleSmsChange: any;
}

type AlertData = {
    accountId: string;
    dealsheetId: string;
    type: number;
    value: boolean;
}

const AccountAlerts: React.FC<Props> = (props) => {

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])

    const [smsToggle, setSmsToggle] = useState<boolean>(false);
    const [smsPhoneNumber, setSmsPhoneNumber] = useState(props.currentContract?.renewalAlertSmsNumber);

    const handleSmsToggle = (evt) => {
        evt.preventDefault();
        setSmsToggle(true);
    }

    const handleAlertChange = (evt) => {
        let alertData: AlertData = {
            accountId: customer?.accountId,
            dealsheetId: props.currentContract?.dealsheetId!,
            type: evt.target.name,
            value: evt.target.value
        }

        AccountAPI.setRenewalAlert(alertData)
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSmsClick = () => {
        setSmsToggle(false);
        props.handleSmsChange(smsPhoneNumber);
    }

    useEffect(() => {
        setSmsPhoneNumber(props.currentContract?.renewalAlertSmsNumber)
    }, [props.currentContract])

    return (
        <AccountBox icon={<FontAwesomeIcon icon={faMobileAlt} />} title="CONTRACT EXPIRATION ALERTS" border={false}>
            <div className="row">

                <div className={`col-24 mb-2 ${smsToggle ? "d-none" : ""}`}>Please notify me with an SMS on {props.currentContract?.renewalAlertSmsNumber} click <button className="btn btn-text" onClick={(evt) => handleSmsToggle(evt)}>here</button> to change</div>
                <div className={`col-24 mb-2 ${smsToggle ? "" : "d-none"}`}>
                    <div className="form-row mb-3">
                        <div className="col-14 col-sm-18 mb-2 mb-md-0">
                            <input type="text" value={smsPhoneNumber} onChange={(evt) => { setSmsPhoneNumber(parseInt(evt.target.value)) }} className="form-control" />
                        </div>
                        <div className="col-10 col-sm-6">
                            <Button className="btn btn-success btn-lg btn-fluid" onClick={() => handleSmsClick()}>Apply</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4 offset-16 text-center mb-1"><strong>YES</strong></div>
                <div className="col-4 text-center mb-1"><strong>NO</strong></div>
            </div>
            {props.currentContract?.renewalAlerts.map(alert =>
                <div key={alert.type} className={`row py-3 bg-white ${alert.type === 1 ? "border-bottom border-dark" : ""}`}>
                    <div className="col-16"><strong>{alert.type === 1 ? "3" : "6"} Month</strong> Alert</div>
                    <div className="col-4">
                        <input type="radio" defaultChecked={alert.value ? true : false} value="true" name={`${alert.type}`} onChange={(evt) => handleAlertChange(evt)} className="form-control" />
                    </div>
                    <div className="col-4">
                        <input type="radio" defaultChecked={!alert.value ? true : false} value="false" name={`${alert.type}`} onChange={(evt) => handleAlertChange(evt)} className="form-control" />
                    </div>
                </div>
            )}
        </AccountBox>
    )
}

export default AccountAlerts;