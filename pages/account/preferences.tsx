import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faSms, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import AccountAPI from 'API/AccountAPI';
import { Customer } from 'types/account/Customer';
import { MarketingPermissions } from 'types/account/MarketingPermissions';
import AccountLayout from 'components/layout/account-layout';

const AccountPreferencesPage: React.FC = () => {

    const [activePreferences, setActivePreferences] = useState<Array<number>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [buttonText, setButtonText] = useState("Submit");

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])

    useEffect(() => {
        if (customer?.accountId) {
            AccountAPI.getMarketingPreferences(customer?.accountId)
                .then(data => {
                    if (data.data != null) {
                        setActivePreferences(data.data);
                        setLoading(false);
                    }
                })
        }

    }, [customer?.accountId])

    const onChangeHandler = (event) => {
        setButtonText("Submit");

        var data = [...activePreferences];
        var index = data.indexOf(parseInt(event.target.value));

        if (event.target.checked) {
            data.push(parseInt(event.target.value))
        } else {
            data.splice(index, 1);
        }

        setActivePreferences(data);
    }

    const onClickHandler = () => {
        setLoading(true);
        setButtonText("Saving");
        toast.info("Your preferences are being saved", {
            position: toast.POSITION.TOP_RIGHT
        });

        var obj: MarketingPermissions = {
            accountId: customer.accountId,
            allowedPermissions: activePreferences
        }

        AccountAPI.saveMarketingPreferences(obj)
            .then(data => {
                setLoading(false);
                setButtonText("Saved")
            })
    }

    return (
        <AccountLayout>
            <div className={`loading justify-content-center align-items-center ${!loading ? "d-none" : "d-flex"}`}>
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="container-fluid bg-light-grey py-3 py-md-5">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-24 mb-3">
                                <p><strong>From time to time we'll choose to send you communications, please select by clicking the icon below how you'll like to hear from us. You can change these at any time.</strong></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24">
                                <div className={`contact-type ${activePreferences.indexOf(1) !== -1 ? "is-active" : ""}`}>
                                    <label htmlFor="email">
                                        <FontAwesomeIcon icon={faEnvelope} className="mr-1 ml-0" />
                                        Email
                                        <input type="checkbox" checked={activePreferences.indexOf(1) !== -1} id="email" name="email" value="1" className="ml-2" onChange={(evt) => onChangeHandler(evt)} />
                                    </label>
                                </div>
                                <div className={`contact-type ${activePreferences.indexOf(4) !== -1 ? "is-active" : ""}`}>
                                    <label htmlFor="telephone">
                                        <FontAwesomeIcon icon={faPhone} className="mr-1 ml-0" />
                                        Telephone
                                        <input type="checkbox" checked={activePreferences.indexOf(4) !== -1} id="telephone" name="telephone" value="4" className="ml-2" onChange={(evt) => onChangeHandler(evt)} />
                                    </label>
                                </div>
                                <div className={`contact-type ${activePreferences.indexOf(3) !== -1 ? "is-active" : ""}`}>
                                    <label htmlFor="sms">
                                        <FontAwesomeIcon icon={faSms} className="mr-1 ml-0" />
                                        SMS
                                        <input type="checkbox" checked={activePreferences.indexOf(3) !== -1} id="sms" name="sms" value="3" className="ml-2" onChange={(evt) => onChangeHandler(evt)} />
                                    </label>
                                </div>
                                <div className={`contact-type ${activePreferences.indexOf(2) !== -1 ? "is-active" : ""}`}>
                                    <label htmlFor="post">
                                        <FontAwesomeIcon icon={faMailBulk} className="mr-1 ml-0" />
                                        Post
                                        <input type="checkbox" checked={activePreferences.indexOf(2) !== -1} id="post" name="post" value="2" className="ml-2" onChange={(evt) => onChangeHandler(evt)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 text-center">
                                <button className="btn btn-primary btn-lg" onClick={onClickHandler}><span className={`spinner-border spinner-border-sm ${buttonText === "Saving" ? "" : "d-none"}`} role="status" aria-hidden="true"></span> {buttonText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    )
}

export default AccountPreferencesPage