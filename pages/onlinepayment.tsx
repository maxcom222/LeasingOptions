import React, { useState } from 'react';

import MainLayout from '../components/layout/main-layout';
import PageBanner from 'components/page-banner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/pro-regular-svg-icons";

import CheckoutForm from '../components/payments/checkout/checkout-form';

const OnlinePayment = () => {

    return (
        <>
            <CheckoutForm />
        </>
    );
}

OnlinePayment.layout = MainLayout;

export default OnlinePayment;