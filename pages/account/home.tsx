import AccountAPI from 'API/AccountAPI';
import AccountAlerts from 'components/account/account-alerts/account-alerts';
import AccountCarousel from 'components/account/account-carousel/account-carousel';
import AccountDetails from 'components/account/account-details/account-details';
import AccountManager from 'components/account/account-manager';
import AccountMileage from 'components/account/account-mileage/account-mileage';
import AccountUseful from 'components/account/account-useful/account-useful';
import AccountLayout from 'components/layout/account-layout';
import React, { useState, useEffect } from 'react'
import { Customer } from 'types/account/Customer';
import { DealSheet } from 'types/account/DealSheet';
import { defaultDealSheet } from '../../components/account/defaultDealSheet';

type SmsData = {
    accountId: string;
    dealsheetId: string;
    number: string;
}


const AccountHomePage: React.FC = () => {

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])

    const [contracts, setContracts] = useState<Array<DealSheet>>([]);
    const [currentContract, setCurrentContract] = useState<DealSheet>(defaultDealSheet);
    const [vehicleSelect, setVehicleSelect] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>(0);

    useEffect(() => {

        if (customer?.accountId) {
            AccountAPI.getContracts(customer?.accountId)
                .then(data => {
                    let contractData = data?.data;
                    if (contractData != null && contractData?.length > 0) {
                        
                        setContracts(contractData);
                        setCurrentContract(contractData[currentId]);
                    }
                })
        }


    }, [customer?.accountId, currentId])

    const handleVehicleClick = (vehicleId) => {
        setCurrentId(vehicleId);
        setVehicleSelect(false);
    }

    const handleDropdownClick = () => {
        setVehicleSelect(!vehicleSelect);
    }

    const handleSmsChange = (smsNumber) => {

        let smsData: SmsData = {
            accountId: customer?.accountId,
            dealsheetId: currentContract?.dealsheetId!,
            number: smsNumber
        }

        AccountAPI.setSmsNumber(smsData)
            .then(function (data) {
                var obj = Object.assign({}, currentContract);
                obj.renewalAlertSmsNumber = parseInt(smsNumber);

                setCurrentContract(obj);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <AccountLayout>
            <div className="container-fluid bg-light-grey py-3 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-14">
                        <AccountManager />
                        {contracts?.length > 0 && currentContract &&
                            <>
                                <AccountCarousel vehicleSelect={vehicleSelect} contracts={contracts} currentContract={currentContract} handleDropdownClick={handleDropdownClick} handleVehicleClick={handleVehicleClick} />
                                <AccountDetails currentContract={currentContract} />
                                <AccountAlerts currentContract={currentContract} handleSmsChange={handleSmsChange} />
                            </>
                        }
                    </div>
                    <div className="col-24 col-md-10">
                        {contracts?.length > 0 && currentContract &&
                            <>
                                <AccountUseful funder={currentContract?.funder!} />
                                <AccountMileage currentContract={currentContract} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </AccountLayout>
    )
}

export default AccountHomePage