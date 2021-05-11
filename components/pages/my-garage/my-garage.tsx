import React, { useState, useEffect } from 'react';
import { useForm, FormContext } from "react-hook-form";
import GarageManager from 'components/garage/garage-manager';
import GarageEnquiryForm from 'components/garage/garage-enquiry-form/garage-enquiry-form';
import GarageSaveForm from 'components/garage/garage-save-form/garage-save-form';
import GarageShareForm from 'components/garage/garage-share-form/garage-share-form';

import { GarageItem } from 'types/GarageItem';
import { unformat } from 'helpers/currencyHelper';

type Props = {
    isInternal: boolean;
}

//TODO: consider integration with redux, keeping customOptions state on vehicle component level
const MyGarage: React.FC<Props> = ({ isInternal }) => {
    const methods = useForm();
    const { register, handleSubmit, errors } = methods;

    const [garage, setGarage] = useState([]);
    const [formsEnabled, setFormsEnabled] = useState<boolean>(false);

    useEffect(() => {
        setFormsEnabled(garage.length > 0);
    }, [garage]);

    const onGarageStateChanged = (items: GarageItem[]) => {
        setGarage(items
            .filter((item: GarageItem) => item.vehicle)
            .map((item: GarageItem) => ({
                index: item.idx,
                customOptions: item.vehicle.customOptions
            })));
    }

    const getData = (manualData, fees) => {
        let result = {
            vehicles: garage
        };

        if (isInternal) {
            if (manualData) {
                for (let idx = 0; idx < result.vehicles.length; idx++) {
                    let garageItem = result.vehicles[idx];

                    if (garageItem) {
                        const manualDetailsItem = manualData[garageItem.index];

                        if (manualDetailsItem) {
                            garageItem["manualDetails"] = {
                                monthlyPrice: unformat(manualDetailsItem.monthlyPrice),
                                monthlyMaintenancePrice: unformat(manualDetailsItem.monthlyMaintenancePrice),
                                initialRental: unformat(manualDetailsItem.initialRentalPrice),

                                dealerOption1: manualDetailsItem.dealerOption1,
                                dealerOption1Price: unformat(manualDetailsItem.dealerOption1Price) || null,
                                dealerOption2: manualDetailsItem.dealerOption2,
                                dealerOption2Price: unformat(manualDetailsItem.dealerOption2Price) || null,
                                dealerOption3: manualDetailsItem.dealerOption3,
                                dealerOption3Price: unformat(manualDetailsItem.dealerOption3Price) || null,

                                exteriorColor: unformat(manualDetailsItem.exteriorColor) || null,
                                exteriorColorManual: manualDetailsItem.exteriorColorManual,

                                interiorColor: unformat(manualDetailsItem.interiorColor) || null,
                                interiorColorManual: manualDetailsItem.interiorColorManual
                            };
                        }
                    }
                }
            }

            let procFees = [];

            if (fees) {
                procFees.push({
                    maintenance: false,
                    leasingDealType: 1,
                    procFee: unformat(fees.notMaintained.business) || null
                });

                procFees.push({
                    maintenance: false,
                    leasingDealType: 2,
                    procFee: unformat(fees.notMaintained.personal) || null
                });

                procFees.push({
                    maintenance: false,
                    leasingDealType: 3,
                    procFee: unformat(fees.notMaintained.van) || null
                });

                procFees.push({
                    maintenance: true,
                    leasingDealType: 1,
                    procFee: unformat(fees.maintained.business) || null
                });

                procFees.push({
                    maintenance: true,
                    leasingDealType: 2,
                    procFee: unformat(fees.maintained.personal) || null
                });

                procFees.push({
                    maintenance: true,
                    leasingDealType: 3,
                    procFee: unformat(fees.maintained.van) || null
                });
            }

            result["procFees"] = procFees;
        }

        return result;
    }

    return (
        <>
            <FormContext {...methods}>
                <section className="container-fluid py-3 py-md-5">
                    <div className="row">
                        <div className="col-24 mb-3">
                            <h1>My Garage</h1>
                            <h4 className="text-blue">Compare up to 4 car or van deals with our helpful comparison tool</h4>
                        </div>
                    </div>
                    <GarageManager
                        settings={{
                            isInternal: isInternal,
                            onStateChanged: onGarageStateChanged
                        }}
                    />
                </section>
                <section className="container-fluid py-3 py-md-5 bg-light-grey">
                    <div className="row">
                        <div className="col-24 col-lg-12 d-flex mb-3 mb-lg-0">
                            <GarageEnquiryForm
                                settings={{
                                    isInternal: isInternal,
                                    isDisabled: !formsEnabled,
                                    getData: getData,
                                    salesPersons: null
                                }}
                            />
                        </div>
                        <div className="col-24 col-md-12 col-lg-6 d-flex mb-3 mb-lg-0">
                            <GarageSaveForm
                                settings={{
                                    isDisabled: !formsEnabled,
                                    getData: getData
                                }}
                            />
                        </div>
                        <div className="col-24 col-md-12 col-lg-6 d-flex mb-3 mb-lg-0">
                            <GarageShareForm
                                settings={{
                                    isDisabled: !formsEnabled,
                                    getData: getData
                                }}
                            />
                        </div>
                    </div>
                </section>
            </FormContext>
        </>
    );
}

export default MyGarage;