import { AuthenticationAPI } from 'API/AuthenticationAPI';
import { GetPhoneNumber } from 'helpers/helpers';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/main-layout';

const AccountLoginPage = () => {

    const router = useRouter()

    useEffect(() => {
        const customer = localStorage.getItem(`lo-account-credentials`)

        if (customer != null) {
            router.push("/account/home")
        }
    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const login = () => {
        AuthenticationAPI.Login(username, password)
            .then(data => {
                if (data.data != null) {
                    localStorage.setItem(`lo-account-credentials`, JSON.stringify(data.data));
                
                    setLoggedIn(true);
                    setError(null);
                } else {
                    setLoggedIn(false);
                    setError('Incorrect username or password.');
                }
            })
    }

    const handleLogin = () => {
        if (error != null) {
            return "Sorry incorrect login details provided.";
        } else if (loggedIn) {
            router.push(`/account/home`);
            return;
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
                            <div className="w-100 d-block bg-white p-3">
                                <div className={error ? "alert alert-danger" : "alert alert-danger d-none"} role="alert">{handleLogin()}</div>
                                <div className="form-group">
                                    <input type="text" value={username} onChange={evt => updateUsername(evt)} tabIndex={1} placeholder="Please enter your username" id="username" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input type="password" value={password} onChange={evt => updatePassword(evt)} tabIndex={2} placeholder="Please enter your password" id="password" className="form-control mb-1" /> <Link passHref href="/account/forgotten_password"><a><small>Forgotten your password?</small></a></Link>
                                </div>
                                <div id="login-button" className="text-center">
                                    <input type="submit" id="submit" tabIndex={3} value="PROCEED TO ACCOUNT" className="btn btn-primary btn-lg" onClick={login} />
                                </div>
                            </div>
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

AccountLoginPage.layout = MainLayout;

export default AccountLoginPage 