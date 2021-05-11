import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Customer } from 'types/account/Customer';
import AccountAPI from 'API/AccountAPI';
import AccountLayout from 'components/layout/account-layout';
import { Quote } from 'types/account/Quote';

const AccountQuotePage: React.FC = () => {

    const [quotes, setQuotes] = useState<Array<Quote>>([])
    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem('lo-account-credentials')))
    }, [])

    useEffect(() => {
        if (customer?.accountId) {
            AccountAPI.getLatestQuotes(customer?.accountId)
                .then(data => {
                    if (data.data != null) {
                        setQuotes(data.data);
                    }
                })
        }

    }, [customer?.accountId])

    return (
        <AccountLayout>
            <div className="container-fluid bg-light-grey py-3 py-md-5">
                <div className="row">
                    <div className="col-24 mb-3 mb-md-4">
                        <div className="w-100 bg-white p-3">
                            <p className="text-center m-0 h5 text-mid-grey"><strong>To view your quote in full, tick to accept our terms &amp; conditions, enter your name and click accept, you will then be invited to fill in a basic application form. Please note that quotes are valid for 14 days</strong></p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {quotes.map((quote) =>
                        <div key={quote.quoteNumber} className="col-24 col-md-12 mb-2 mb-md-0">
                            <div className="w-100 bg-white px-3 py-1">
                                <div className="row">
                                    <div className="col-6 d-none d-md-flex flex-wrap justify-content-center align-items-center border-right border-light">
                                        <strong className="text-red text-limit">{quote.quoteNumber}</strong>
                                    </div>
                                    <div className="col-16 col-md-10 d-flex flex-wrap justify-content-center align-items-center border-right border-light">
                                        <strong className="w-100 d-block d-md-none text-red text-limit">{quote.quoteNumber}</strong>
                                        <strong className="w-100 d-block text-limit">{quote.make} {quote.model}</strong>
                                        <span className="w-100 d-block text-limit">{quote.derivative}</span>
                                    </div>
                                    <div className="col-8 d-flex flex-wrap justify-content-center align-items-center">
                                        <a href={quote.quoteUrl} className="button button-brand" rel="noopener noreferrer" target="blank"><FontAwesomeIcon icon={faSearch} className="mr-1 ml-0" /> View</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    )
}

export default AccountQuotePage