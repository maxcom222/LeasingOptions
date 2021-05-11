import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function CookiePolicy () {
    return (
        <>
            <MetaHead>
                <title>Cookie Policy | Leasing Options</title>
                <meta name="description" content="Read details of the Leasing Options Limited Cookie Policy." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/cookie-policy`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 py-3">
                            <h1>Cookie Policy</h1>
                            <h2 className="text-mint">Use of cookies</h2>
                            <p>A cookie is a small text file which is placed onto your computer (or other electronic device) when you access our website. We may use cookies and other online tracking devices on our website to:</p>
                            <ul>
                                <li>keep track of the details you have provided and take you through any process on the website;</li>
                                <li>recognise when you visit our website (this speeds up your access to the website as you do not have to log on each time);</li>
                                <li>obtain information about your preferences, online movements and use of the internet;</li>
                                <li>carry out research and statistical analysis to help improve our content, products and services and to help us better understand our visitor requirements and interests;</li>
                                <li>target our marketing campaigns and those of our partners more effectively by providing interest-based advertisements that are personalised to your interests; and</li>
                                <li>Make your online experience more efficient and enjoyable.</li>
                            </ul>
                            <p>The information we obtain from our use of cookies will not usually contain your personal data. Although we may obtain information about your computer or other electronic device such as your IP address, your browser and/or other internet log information, this will not usually identify you personally. In certain circumstances, we may collect personal information about you – but only where you voluntarily provide it (e.g. by completing an online form or making a telephone enquiry) or where you purchase services from or through us.</p>
                            <p>In most cases we will need your consent in order to use cookies on our website. The exception is where the cookie is essential in order for us to provide you with a service that you have requested.</p>
                            <p>There is a notice on our home page which describes how we use cookies and which also provides a link to this Policy. By using our website after upon or after this notification has been displayed to you then this will used as your consent to our use of cookies for the purposes described in this Policy.</p>
                            <p>We may work with third-party suppliers who may also set cookies on our website. Third-party suppliers are responsible for the cookies they set on our website. If you want further information please go to the website for the relevant third party. Third party cookies currently in use include:</p>
                            <ul className="list-styled">
                                <li>google analytics - visitor tracking</li>
                                <li>whoson - visitor tracking and online chat functionality</li>
                                <li>jtrack - visitor tracking</li>
                                <li>mousestats - session recording</li>
                                <li>visualweboptimiser - a/b split testing</li>
                                <li>trustpilot - visitor reviews</li>
                            </ul>
                            <p>We may monitor your usage of our website through the use of cookies and similar tracking devices. For example, we may monitor how many times you visit, which pages you go to, traffic data, location data and the originating domain name of a user’s internet service provider, as well as your IP address. This information helps us to build a profile of our users. Some of this data will be aggregated or statistical. Please see further the section on ‘Use of cookies’ below.</p>
                            <p>If you do not want to accept cookies, you can change your browser settings so that cookies are not accepted. If you do this, please be aware that you may lose some of the functionality of our website. For further information about cookies and how to disable them please go to: <a href="https://www.aboutcookies.org" target="_blank" className="text-mint">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" className="text-mint">www.allaboutcookies.org</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

CookiePolicy.layout = MainLayout;