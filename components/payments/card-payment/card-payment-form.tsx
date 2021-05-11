import React, { useState, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import accounting from 'accounting';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

import style from './payment-form.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";


import { PaymentsAPI } from 'API/PaymentsAPI';
import { CreatePaymentIntentRequest } from "types/payments/CreatePaymentIntentRequest";

const PaymentForm: React.FC = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [initializing, setInitializing] = useState(false);

    const [paymentRequired, setPaymentRequired] = useState<boolean>(false);
    const [isExtension, setIsExtension] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<string>(null);
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [orderNumber, setOrderNumber] = useState<string>(null);
    const [clientSecret, setClientSecret] = useState<string>(null);

    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {

        const queryParams = new URLSearchParams(window.location.search);

        const paymentIntentRequest: CreatePaymentIntentRequest = {
            orderId: (router.query.orderid as string || queryParams.get("orderid")),
            type: (router.query.type as string || queryParams.get("type")),
            amount: parseFloat(router.query.amount as string || queryParams.get("amount")),
            extension: (router.query.extension || queryParams.get("extension")) === "1",
            hostOrigin: window.location.origin
        };

        setInitializing(true);

        //retrieve payment intent
        PaymentsAPI.CreatePaymentIntent(paymentIntentRequest).then(function (result) {
            if (result.status.code === 0) {

                if (result.data.uniqueId) {
                    setPaymentRequired(result.data.paymentIsRequired);
                    setIsExtension(result.data.extension);
                    setVehicle(result.data.vehicle);
                    setDepositAmount(result.data.depositAmount);
                    setOrderNumber(result.data.manualOrderId || result.data.orderName);
                    setClientSecret(result.data.uniqueId);
                }
                else {
                    setError("Payment initialization failed.");
                    setSucceeded(false);
                }

                setInitializing(false);
            }
        });

    }, []);

    //Card element styling
    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        },
        classes: {
            base: style["card-element-container"]
        },
        hidePostalCode: true
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: ev.target.name.value
                }
            }
        });

        if (payload.error) {
            setError(`Payment Failed. ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <section className={`container-fluid bg-hands-green ${style["payment-header"]}`}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-24 py-md-5">
                            <h1>Secure Online Payment</h1>
                            <p>Thank you for your order</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3">
                {!initializing &&
                    <div className="container py-3 py-md-5">
                        {paymentRequired &&
                            <form className="px-md-5" onSubmit={handleSubmit}>
                                {!succeeded &&
                                    <>
                                        <div className="row">
                                            <div className="col-24 col-lg-14">
                                                <p><strong>{vehicle}</strong></p>
                                                <p>A payment of <strong dangerouslySetInnerHTML={{ __html: accounting.formatMoney(depositAmount, "&pound;") }}></strong>&nbsp;is required to enable us to {(isExtension ? "process your extension" : "order the vehicle and progress your order")}</p>
                                                <p>By clicking the button below you will be redirected to our payment provider (Stripe) to complete the payment.</p>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="row mt-3">
                                                <div className="col-24 col-lg-14">
                                                    <div className="alert alert-danger" role="alert">{error}</div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="row mt-3">
                                            <div className="col-24 col-md-18 col-lg-8">
                                                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                                            </div>
                                            <div className="col-24 col-md-6">
                                                <button disabled={processing || disabled || succeeded} id="submit" type="submit" className="btn btn-primary btn-lg btn-block">
                                                    {processing ? <FontAwesomeIcon width="16" height="16" icon={faSpinner} className="fa-spin" /> :
                                                        <>Pay <strong dangerouslySetInnerHTML={{ __html: accounting.formatMoney(depositAmount, "&pound;") }}></strong> Now</>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }

                                {succeeded && (
                                    <div className="row">
                                        <div className="col-24">
                                            <div className="alert alert-success" role="alert">
                                                <strong>Thank you for your payment of <span dangerouslySetInnerHTML={{ __html: accounting.formatMoney(depositAmount, "&pound;") }}></span></strong><br /><br />Your payment reference is: {orderNumber}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </form>
                        }
                        
                        {!paymentRequired &&
                            <div className="row">
                                <div className="col-24 text-center">
                                    <h2>Secure Online payment - No payment required</h2>
                                    <p>Thanks for your order.</p>
                                </div>
                            </div>
                        }
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
        </Elements>
    );
}

export default PaymentForm;