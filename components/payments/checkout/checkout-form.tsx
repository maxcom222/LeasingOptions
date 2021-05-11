import React, { useState, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import accounting from 'accounting';

import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';

import style from './checkout-form.module.scss';

import PageBanner from 'components/page-banner';
import Link from 'next/link';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCreditCard } from "@fortawesome/pro-regular-svg-icons";
import { faShieldCheck } from "@fortawesome/pro-regular-svg-icons";
import { faCcApplePay } from "@fortawesome/free-brands-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


import { PaymentsAPI } from 'API/PaymentsAPI';
import { CreatePaymentIntentRequest } from "types/payments/CreatePaymentIntentRequest";

const CheckoutForm: React.FC = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    const [succeeded, setSucceeded] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const [error, setError] = useState(null);

    const [initializing, setInitializing] = useState(false);

    const [paymentRequired, setPaymentRequired] = useState(null);
    const [isExtension, setIsExtension] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<string>(null);
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [orderNumber, setOrderNumber] = useState<string>(null);
    const [sessionId, setSessionId] = useState<string>(null);

    const router = useRouter();

    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        let paymentSuccess = queryParams.get("success") === "1";
        let paymentCancelled = queryParams.get("cancelled") === "1";

        setSucceeded(paymentSuccess);
        setCancelled(paymentCancelled);

        if (!paymentCancelled) {
            const paymentIntentRequest: CreatePaymentIntentRequest = {
                orderId: (router.query.orderid as string || queryParams.get("orderid")),
                type: (router.query.type as string || queryParams.get("type")),
                amount: parseFloat(router.query.amount as string || queryParams.get("amount")),
                extension: (router.query.extension || queryParams.get("extension")) === "1",
                hostOrigin: window.location.href
            };
            setInitializing(true);

            //retrieve checkout session ID
            PaymentsAPI.CreateCheckoutSession(paymentIntentRequest).then(function (result) {
                if (result.status.code === 0) {

                    if (result.data.uniqueId) {
                        setPaymentRequired(result.data.paymentIsRequired);
                        setIsExtension(result.data.extension);
                        setVehicle(result.data.vehicle);
                        setDepositAmount(result.data.depositAmount);
                        setOrderNumber(result.data.manualOrderId || result.data.orderName);
                        setSessionId(result.data.uniqueId);
                    }
                    else {
                        setError("Payment initialization failed.");
                        setSucceeded(false);
                    }

                    setInitializing(false);
                }
            });
        }

        //Do not show a payment form again
        if (paymentSuccess || paymentCancelled) {
            setPaymentRequired(false);
        }
    }, []);


    const handleCheckoutClick = async (event) => {
        const stripe = await stripePromise;

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: sessionId,
        });
        if (result.error) {
            setError(`Payment Failed. ${result.error.message}`);
        }
    };

    return (
        <>
            <section className={`${style["payment-header"]}`}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-24 py-md-5">
                            <div className={style["icon"]}>
                                <FontAwesomeIcon icon={faLock} className="fa-lock" />
                            </div>
                            <h1>Secure Online Payment</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3">
                {!initializing &&
                    <div className={`container py-3 py-md-5`}>
                        <div className={style["checkout-container"]}>
                            {succeeded && (
                                <div className="row">
                                    <div className="col-24 text-center">
                                        <div className={`d-flex justify-content-center align-items-center ${style["title"]}`}>
                                            <div>
                                                <FontAwesomeIcon icon={faShieldCheck} />
                                            </div>
                                            <h2>Thank you for your order</h2>
                                        </div>

                                        <div className="row">
                                            <div className={`col-md-14 col-24 ${style["payment-form"]}`}>
                                                <p>Your payment reference is: <strong>{orderNumber}</strong></p>
                                                <Link passHref href="/">
                                                    <a className="btn btn-primary btn-labeled btn-lg">
                                                        <span className="btn-label"><FontAwesomeIcon width="17" height="17" icon={faArrowLeft} /></span>
                                                        <span className="btn-text">Back to home</span>
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {cancelled && (
                                <div className="row">
                                    <div className="col-24">
                                        <div className="alert alert-warning" role="alert">
                                            <strong>Your payment was cancelled</strong>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!succeeded && !cancelled &&
                                <>
                                    {paymentRequired === true &&
                                        <>
                                            <div className="row">
                                                <div className="col-24 text-center">
                                                    <div className={`d-flex justify-content-center align-items-center ${style["title"]}`}>
                                                        <div>
                                                            <FontAwesomeIcon icon={faCreditCard} />
                                                        </div>
                                                        <h2>Payment Checkout</h2>
                                                    </div>
                                                    <p>A payment of <strong dangerouslySetInnerHTML={{ __html: accounting.formatMoney(depositAmount, "&pound;") }}></strong>&nbsp;is required to enable us to {(isExtension ? "process your extension" : "order the vehicle and progress your order")}</p>
                                                    <div className="row">
                                                        <div className={`col-md-14 col-24 ${style["payment-form"]}`}>
                                                            <p><strong>{vehicle}</strong></p>
                                                            <button disabled={succeeded} id="submit" type="submit" className="btn btn-primary btn-labeled btn-lg btn-block-sm" onClick={(evt) => { handleCheckoutClick(evt) }}>
                                                                <span className="btn-label"><FontAwesomeIcon width="17" height="17" icon={faLock} /></span>
                                                                <span className="btn-text">Pay <strong dangerouslySetInnerHTML={{ __html: accounting.formatMoney(depositAmount, "&pound;") }}></strong> Now</span>
                                                            </button>

                                                            <div className={style["payment-methods"]}>
                                                                <div className={`d-flex justify-content-between ${style["wrapper"]}`}>
                                                                    <div>
                                                                        <FontAwesomeIcon icon={faCcApplePay} />
                                                                    </div>
                                                                    <div>
                                                                        <FontAwesomeIcon icon={faCcVisa} />
                                                                    </div>
                                                                    <div>
                                                                        <FontAwesomeIcon icon={faCcMastercard} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {error && (
                                                <div className="row mt-3">
                                                    <div className="col-24 col-lg-14">
                                                        <div className="alert alert-danger" role="alert">{error}</div>
                                                    </div>
                                                </div>
                                            )}

                                        </>
                                    }
                                    {paymentRequired === false &&
                                        <div className="row">
                                            <div className="col-24 text-center">
                                                <h2>Secure Online payment - No payment required</h2>
                                                <p>Thanks for your order.</p>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                }


                {initializing &&
                    <div className="row">
                        <div className="col-24 text-center my-5">
                            <h3>Payment is being initialized. Please wait....</h3>
                        </div>
                    </div>
                }
            </section>
        </>
    );
}

export default CheckoutForm;