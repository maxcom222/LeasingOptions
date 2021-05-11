import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AccountBox from '../account-box/account-box';
import { Customer } from 'types/account/Customer';

const AccountManager: React.FC = () => {

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])

    return (
        <AccountBox icon={<FontAwesomeIcon icon={faUserCircle} />} title=" YOUR ACCOUNT MANAGER" border={true}>
            <div className="row">
                <div className="col-24 col-sm-10 d-flex flex-wrap justify-content-center align-items-center">
                    <img src={customer?.manager?.imageUrl} alt="Account manager"></img>
                    <strong className="text-center">Your Account Manager<br />{customer?.manager.name}</strong>
                </div>
                <div className="col-24 col-sm-14 d-flex">
                    <div className="w-100 d-flex flex-wrap p-3 bg-white">
                        <p className="w-100 tel"><FontAwesomeIcon icon={faPhoneAlt} /> <a href={`tel:${customer?.manager.phone}`} className="text-aff">{customer?.manager.phone}</a></p>
                        <p className="w-100"><FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${customer?.manager.email}`} className="text-aff">{customer?.manager.email}</a></p>
                        <p className="w-100 text-black"><strong className="text-acc">Opening Hours:</strong> <strong>Monday to Friday 9am to 5.30pm</strong></p>
                        <p className="w-100 text-black">
                            <strong>Leasing Options Limited.</strong><br />
                            <strong>Options House, Atkin Street, Worsley</strong><br />
                            <strong>Manchester</strong><br />
                            <strong>England</strong><br />
                            <strong>M28 3DG</strong>
                        </p>
                    </div>
                </div>
            </div>
        </AccountBox>
    )
}

export default AccountManager;