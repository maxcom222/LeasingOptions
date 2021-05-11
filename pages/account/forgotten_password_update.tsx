import React, { useState } from 'react';
import { isNullOrWhiteSpace } from 'helpers/stringHelper';
import MainLayout from 'components/layout/main-layout';
import { LayoutProps } from 'types/LayoutProps';
import wrapper from 'redux/store.tsx/store';
import { useRouter } from 'next/router';
import AccountAPI from 'API/AccountAPI';
import { GetPhoneNumber, isValidPasswordComplexity } from 'helpers/helpers';
import Link from 'next/link';


export const getServerSideProps = wrapper.getServerSideProps((async (context) => {

    const accountLink:string = context?.query?.id ? context?.query?.id.toString()  : "" ;
    
    if(isNullOrWhiteSpace(accountLink)){
        context.res.writeHead(302, {
            Location: '/account/login'
        });
        context.res.end();
        return;
    };

    return {
        props: {
            accountLink: accountLink
        }
    }
}));

type Props = {
    accountLink: string
}

const ForgottenPasswordUpdatePage: LayoutProps<Props> = ({accountLink}) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [updatePassword, setUpdatePassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const router = useRouter()
  

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        let minCharLength = 6;

        if(!isValidPasswordComplexity(updatePassword)){
            setErrorMessage(`Your password must have at least one number, one lowercase and one uppercase letter and at least 6 characters`);
        } else if (!isNullOrWhiteSpace(updatePassword) && !isNullOrWhiteSpace(confirmPassword)) {

            if (updatePassword === confirmPassword) {
                let result = await AccountAPI.updateForgottenPassword(accountLink, confirmPassword);
                if(result){
                    localStorage.removeItem(`lo-account-credentials`);
                    localStorage.setItem(`lo-account-credentials`, JSON.stringify(result?.data));//check isnt already set
                    router.push(`/account/home`);
                }else{
                    setErrorMessage('Something went wrong, please speak to your account manager.');
                }
                
            } else {
                setErrorMessage('Your passwords do not match');
            }

        } else {
            setErrorMessage('Please enter and confirm your new password');
        }
    }

    const handleUpdatePassword = (event) => {
        setUpdatePassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
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
                        <div className="w-100 d-block p-3 bg-charcoal h3 text-center text-white">Create new password</div>
                        <div className="w-100 d-block bg-white p-3">
                        <form onSubmit={onSubmitHandler}>
                            <div className="row">
                                <div className="col-24">
                                    <div className={`alert alert-danger ${errorMessage ? "" : "d-none"}`} role="alert">{errorMessage}</div>
                                </div>
                            </div>                          
 
                            <div className="row">
                                <div className="col-24 col-md-12 mb-3">
                                    <label htmlFor="createPassword">Create new password</label>
                                    <input id="createPassword" type="password" className="form-control" onChange={e => handleUpdatePassword(e)}></input>
                                </div>
                                <div className="col-24 col-md-12 mb-3">
                                    <label htmlFor="confirmPassword">Confirm new password</label>
                                    <input id="confirmPassword" type="password" className="form-control" onChange={e => handleConfirmPassword(e)}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-right">
                                    <button className="btn btn-primary btn-lg btn-fluid-xs" type="submit">Update</button>
                                </div>
                            </div>
                        </form>
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

ForgottenPasswordUpdatePage.layout = MainLayout;

export default ForgottenPasswordUpdatePage