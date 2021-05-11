import React, { useEffect, useState } from 'react';
import AccountBox from '../account-box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { Funder } from 'types/account/Funder';
import { Customer } from 'types/account/Customer';

type Props = {
    funder: Funder;
}

const AccountUseful: React.FC<Props> = (props) => {

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])
    return (
        <AccountBox icon={<FontAwesomeIcon icon={faPhoneAlt} />} title=" USEFUL NUMBERS" border={true}>
            <div className="w-100 p-3 bg-white">
                <strong className="w-100 d-block mb-2"><span className="text-acc">Your Account Manager:</span> <a href={`tel:${customer?.manager?.phone}}`} className="text-default">{customer?.manager?.phone}</a></strong>
                <strong className="w-100 d-block mb-2"><span className="text-acc">Your Funder [{props.funder?.name}]:</span> <a href={`tel: ${props.funder?.mainPhoneNumber?.number}`} className="text-default">{props.funder?.mainPhoneNumber?.number}</a></strong>
                {props.funder?.mainPhoneNumber?.options?.map(option =>
                    <strong key={option?.value} className="w-100 d-block"><span className="text-acc">{option?.value}:</span> {option?.name}</strong>
                )}
            </div>
        </AccountBox>
    )
}

export default AccountUseful;