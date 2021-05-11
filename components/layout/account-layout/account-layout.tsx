import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { Customer } from "types/account/Customer";
import Header from '../header';
import Footer from '../footer';
import ToTop from '../to-top/to-top';

type Props = {
    children: ReactNode,
    className?: string
}

const AccountLayout: React.FC<Props> = ({ className, children }) => {

    const [customer, setCustomer] = useState<Customer>();
    const router = useRouter();

    useEffect(() => {
        let customer = JSON.parse(localStorage.getItem('lo-account-credentials'));

        if (customer) {
            setCustomer(customer)
        } else {
            router.push("/account/login");
        }

    }, [])


    const logout = () => {
        localStorage.removeItem('lo-account-credentials');
        router.push("/account/login");
    }

    return (
        <>
            <Header />
            { customer &&
                <>
                    <div className="container-fluid pt-3 pt-md-5">
                        <div className="row">
                            <div className="col-24 col-md-12 mb-3 mb-md-0">
                                <h1><strong>Welcome {customer?.firstName}</strong></h1>
                            </div>
                            <div className="col-24 col-md-12">
                                <p><span className="w-100 d-block text-mid-grey h5">Fully manage Your Account &amp; Vehicles Here</span> Account No: {customer?.accountNumber}</p>
                                <button onClick={() => logout()} className="btn btn-text h5"><strong>Logout</strong></button>
                            </div>
                        </div>
                    </div>
                    <nav className="container-fluid py-3">
                        <div className="row">
                            <div className="col-24">
                                <ul className="d-md-inline-flex">
                                    <li><Link passHref href="/account/home"><a className="mb-3 mb-md-0 mr-md-3"><strong>Home</strong></a></Link></li>
                                    <li><Link passHref href="/account/quotes"><a className="mb-3 mb-md-0 mr-md-3"><strong>My Quotes</strong></a></Link></li>
                                    <li><Link passHref href="/account/secureddocuments"><a className="mb-3 mb-md-0 mr-md-3"><strong>My Documents</strong></a></Link></li>
                                    <li><Link passHref href="/account/preferences"><a className="mb-3 mb-md-0 mr-md-3"><strong>My Preference</strong></a></Link></li>
                                    <li><Link passHref href="/account/update_password"><a className="mb-3 mb-md-0 mr-md-3"><strong>My Account</strong></a></Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <main className={className}>{children}</main>
                </>
            }
            <Footer />
            <ToTop />
        </>
    )
}

export default AccountLayout;