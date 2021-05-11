import React from 'react';
import Link from 'next/link';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function CustomersFairly () {
    return (
        <>
            <MetaHead>
                <title>Treating Our Customers Fairly | Leasing Options</title>
                <meta name="description" content="Providing customers with an excellent level of service & treating customers fairly has been at the core of our business philosophy." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/treating-customers-fairly`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 py-3">
                            <h1>Treating Customers Fairly</h1>
                            <p>Leasing Options has been fully committed to providing customers with an excellent level of service and treating customers fairly has been at the core of our business philosophy, for many, many years. Treating Customers Fairly (TCF) is one of the cornerstone principles laid down by the Financial Conduct Authority. This guiding principle is sub-divided into six key elements which dictate the way in which
                            we deal with our customers in terms of communication, expectations, level of service and the products and services we offer.</p>
                            <p>The six guiding principle elements are:-</p>
                            <ul className="list-styled">
                                <li>Consumers are confident that they are dealing with firms where the fair treatment of customers is central to the corporate culture.</li>
                                <li>Products and services marketed and sold in the retail market place are designed to meet the needs of identified consumer groups and are targeted accordingly.</li>
                                <li>Consumers are provided with clear information and are kept appropriately informed before, during and after the point of sale.</li>
                                <li>Where consumers receive advice, the advice is suitable and takes account of their needs and circumstances.</li>
                                <li>Consumers are provided with products that perform as firms have led them to expect, and the associated service is of an acceptable standard and as they have been led to expect.</li>
                                <li>Consumers do not face unreasonable post-sale barriers imposed by firms to change product, switch provider, submit claims or make a complaint.</li>
                            </ul>
                            <p>In practical terms we adhere to the above principles by:</p>
                            <ul className="list-styled">
                                <li>Listening to our customers to understand their needs.</li>
                                <li>Offering only market products which are appropriately targeted, clear, and unambiguous and highlight the risks and conditions as well as the key features and benefits.</li>
                                <li>Ensuring Customers understand any risks associated with products and services.</li>
                                <li>Ensuring services are delivered to customers openly, with clarity and transparency and do not contain hidden conditions or complex definitions.</li>
                                <li>When, in the event of providing advice, that the advice given takes into account the customers needs and circumstances.</li>
                                <li>the customer’s privacy seriously and ensuring that members of staff are trained to follow the rules in relation to data protection and to keep customers details secure and confidential.</li>
                                <li>Taking complaints seriously and dealing with them promptly, learning from them and modifying operations and processes where necessary. </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

CustomersFairly.layout = MainLayout;