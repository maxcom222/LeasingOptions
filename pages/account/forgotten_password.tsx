import React, { useState } from 'react';
import MainLayout from '../../components/layout/main-layout';
import { GetPhoneNumber } from 'helpers/helpers';
import Link from 'next/link';
import AccountAPI from 'API/AccountAPI';

const AccountForgottenPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [accountNumber, setaccountNumber] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [forgottenPasswordEmailSent, setforgottenPasswordEmailSent] = useState<boolean>(false);

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const updateAccountNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setaccountNumber(event.target.value);
    }

    const sendReminder = async () => {
        var result = await AccountAPI.sendforgottenPasswordEmail(email, accountNumber);
        if(result.isSucceed){
            setforgottenPasswordEmailSent(result.data);
        }else{
            setError("Something went wrong, please try again")
        }
    }

    return (
        <>
            <section className="container-fluid bg-white py-3 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-20 col-lg-18 mx-auto">
                        <h1 className="text-blue text-center mb-3"><strong>My Account Area</strong></h1>
                        <p className="h5 text-center text-mid-grey">View your leasing account &amp; benefit from full control...</p>
                    </div>
                </div>
            </section>
            <section className="container-fluid bg-light-grey py-4">
                <div className="row">
                    <div className="col-24 col-md-12 d-flex mb-3 mb-md-0">
                        <div className="w-100 d-flex flex-wrap justify-content-start align-items-start bg-white">
                            <div className="w-100 d-block p-3 bg-charcoal h3 text-center text-white">My Account Area Login</div>
                            {  !forgottenPasswordEmailSent && 
                                <div className="w-100 d-block bg-white p-3">
                                    <div className="row">
                                        <div className="col-24">
                                            <div className={`alert alert-danger ${error ? "" : "d-none"}`} role="alert">{error}</div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p>Please enter your email and account number to receive a password reminder.</p>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" value={email} onChange={evt => updateEmail(evt)} tabIndex={2} placeholder="Please enter your email" id="email" className="form-control" /> <br />
                                        <input type="text" value={accountNumber} onChange={evt => updateAccountNumber(evt)} tabIndex={3} placeholder="Please enter your account number" id="accountNumber" className="form-control" /> <br />
                                    </div>
                                    <div id="login-button" className="text-center">
                                        <input type="submit" id="submit" tabIndex={3} value="SEND REMINDER" className="btn btn-primary btn-lg" onClick={sendReminder} />
                                    </div>
                                </div> 
                            }

                            {  forgottenPasswordEmailSent && 
                                <div id="reset-success" >
                                    <p  className="text-center">
                                   Thank you. You should recieve an email with a password reset link.</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-24 col-md-12 d-flex">
                        <div className="w-100 d-flex flex-wrap justify-content-start align-items-start bg-white">
                            <div className="w-100 d-block p-3 bg-charcoal h3 text-center text-white">New Customer?</div>
                            <div className="w-100 d-block bg-white p-3 text-center">
                                <p>We aren’t ‘just another leasing company’ check out</p>
                                <Link passHref href="/car-leasing-faqs?search=why"><button className="btn btn-primary btn-lg mb-3">WHY LEASE WITH US?</button></Link>
                                <p>Already know how great we are...  then take a look at our</p>
                                <Link passHref href="/car-leasing-deals"><button className="btn btn-primary btn-lg mb-3">SPECIAL OFFERS</button></Link>
                                <p>We have a unique team of leasing experts here at Leasing Options who can assist you with finding your perfect vehicle</p>
                                <strong className="text-red h5">Telephone: <a href={`tel:${GetPhoneNumber(false)}`} className="text-mid-grey">{GetPhoneNumber(false)}</a></strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

AccountForgottenPasswordPage.layout = MainLayout;

export default AccountForgottenPasswordPage 