import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";

import AddressHistoryItem from './address-history-item'


const AddressHistory = ({ formData, minHistoryMonths, parentContainer }) => {

    const collectionName = (parentContainer) ? `${parentContainer}.addresses` : "addresses";

    const [addresses, setAddresses] = useState([]);
    const [historyUpdated, setHistoryUpdated] = useState<any>(null);

    useEffect(() => {
        if (!formData.addresses) {
            appendAddress({});
        }
        else {
            const addressHistory = formData.addresses.map((value, index) => {

                return {
                    address1: value.address1,
                    address2: value.address2,
                    address3: value.address3,
                    town: value.town,
                    county: value.county,
                    postcode: value.postcode,
                    fromDate: value.fromDate,
                    timeAtAddressMonths: (value.timeAtAddressMonths) ? parseInt(value.timeAtAddressMonths) : 0,
                    timeAtAddressYears: (value.timeAtAddressYears) ? parseInt(value.timeAtAddressYears) : 0,
                    totalMonthsAtAddress: (value.totalMonthsAtAddress) ? parseInt(value.totalMonthsAtAddress) : 0
                }
            });

            setAddresses(addressHistory);
        }
    }, []);


    useEffect(() => {
        if (historyUpdated) {
            refreshHistoryItemsList();
        }
    }, [historyUpdated]);

    const appendAddress = (props) => {
        setAddresses([...addresses, props]);
    };

    const removeAddress = index => {
        setAddresses([...addresses.slice(0, index), ...addresses.slice(index + 1)]);
    };

    const updateAddress = (data, index) => {
        setAddresses([...addresses.slice(0, index), data, ...addresses.slice(index + 1)]);
    };

    const onTimePeriodUpdate = (totalMonths, index) => {
        updateAddress({
            totalMonthsAtAddress: totalMonths ?? 0
        }, index);

        setHistoryUpdated(Date.now());
    }

    const refreshHistoryItemsList = () => {
        if (addresses.length > 0) {

            let totalHistory = 0;

            //create new array instance here
            let items = addresses.slice(0);

            items.forEach((address, index) => {
                totalHistory += (parseInt(address.totalMonthsAtAddress ?? "0") ?? 0);
            });

            if (totalHistory < minHistoryMonths && (items.length == 1 || (items[items.length - 1].totalMonthsAtAddress ?? 0) > 0)) {
                appendAddress({
                    totalMonthsAtAddress: 0
                });
            }
            else {

                let itemsCountToRemove = 0;

                while (items.length > 1 && totalHistory >= minHistoryMonths && totalHistory - (items[items.length - 1].totalMonthsAtAddress ?? 0) >= minHistoryMonths) {
                    items = items.slice(0, -1);

                    itemsCountToRemove += 1;

                    totalHistory = 0;
                    items.forEach((address, index) => {
                        totalHistory += (address.totalMonthsAtAddress ?? 0);
                    });
                }

                if (itemsCountToRemove > 0) {
                    setAddresses(addresses.slice(0, -itemsCountToRemove));
                }
            }
        }
    }

    return (
        <React.Fragment>
            {
                addresses.map((item, index) => {
                    return (
                        <React.Fragment key={index} >

                            <AddressHistoryItem addressData={item} title={(index === 0) ? "Current Address" : `Previous Address ${index}`}
                                fromDateRequired={index === 0} timeAtAddressRequired={index !== 0}
                                collectionName={collectionName} index={index}
                                onTimePeriodUpdate={(totalMonths) => { onTimePeriodUpdate(totalMonths, index) }} />

                        </React.Fragment>
                    );
                })
            }
        </React.Fragment>
    )
}

export default AddressHistory