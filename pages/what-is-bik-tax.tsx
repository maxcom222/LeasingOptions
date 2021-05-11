import React from 'react';
import Link from 'next/link';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { FaqItem } from 'types/FaqItem';
import Faqs from '../components/layout/faqs';

export default function BlkTax({ metaData }) {
    const faqs: Array<FaqItem> = [
        { question: "How is BIK tax worked out?", answer: "BIK tax is worked out by multiplying the price of your vehicle (P11D value) by the BIK tax percentage banding. Your annual earnings and the CO2 emissions of the vehicle are also taken into account." },
        { question: "How much BIK tax will I pay?", answer: "Work out your BIK tax rate using the <a href=\"https://www.gov.uk/calculate-tax-on-company-cars\" target=\"_blank\">HMRC company car tax calculator</a>." },
        { question: "What is the BIK tax on vans?", answer: "The flat rate for BIK tax on vans is currently £3,430. However, tax on your van depends on whether you use it just for business or for personal use as well." },
        { question: "What is the BIK tax on EVs and hybrids?", answer: "Company car drivers pay 0% tax on pure electric vehicles (EVs) throughout 2020/21." }
    ];

    return (
        <>
            <MetaHead>
                <title>What is BIK (Benefit in Kind) Tax? | Leasing Options</title>
                <meta name="description" content="What is Benefit in Kind (BIK) Tax? How is it calculated? Find the latest answers to all your BIK car tax questions here with Leasing Options." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/what-is-bik-tax`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <h1>Tax Calculator</h1>
                            <h2 className="text-mint">What is BIK tax?</h2>
                            <p>If you're lucky enough to be supplied with a company car then you could be liable to pay a charge known as Benefit in Kind (BIK) tax. The amount you're required to pay will depend on three things:</p>
                            <ul className="mb-3 list-styled">
                                <li>Price of your vehicle (P11D value)</li>
                                <li>Your annual earnings</li>
                                <li>CO2 emissions of the vehicle</li>
                            </ul>
                            <p>As with all taxes, the rules change often. Recent changes from 6th April 2020 aim to provide the most accurate possible calculation of emissions.</p>
                            <p>It’s important to know that the smallest change to the options on a vehicle, even something as seemingly insignificant as adding mats, can impact the amount of tax that needs to be paid. If you're in any doubt about the rate that will apply to your chosen vehicle, be sure to get in touch with HMRC to confirm.</p>
                            <h2>How is BIK tax calculated?</h2>
                            <p>BIK tax is calculated by using your car’s P11D value and its BIK tax band. If you don’t know these, use the <a href="https://www.gov.uk/calculate-tax-on-company-cars" target="_blank">HMRC tax calculator</a> to work out how much you will pay on a company car.</p>
                            <p>For example, an Audi A4 with a P11D value of £30,000 and emissions of 130g/km would have a BIK tax band of 25%. The BIK would be 25% of £30,000 (£7,500) and this would be charged at the marginal rate of tax – either 20% or 40%, making the annual charge £1,500 or £3,000 respectively.</p>
                            <table className="table-tax">
                                <thead>
                                    <tr>
                                        <th>Value of car</th>
                                        <th>BIK tax band</th>
                                        <th>BIK</th>
                                        <th>Annual Charge 20%</th>
                                        <th>Annual Charge 40%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>£30,000</td>
                                        <td>25%</td>
                                        <td>£7,500</td>
                                        <td>£1,500</td>
                                        <td>£3,000</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>What affects BIK?</h2>
                            <p>Different factors can affect BIK tax, such as your fuel choice and your mileage. If you aren’t sure how much you should pay, use the <a href="https://www.gov.uk/calculate-tax-on-company-cars" target="_blank">HMRC calculator</a>.</p>
                            <h2>BIK tax for vans</h2>
                            <p>Tax on your <Link passHref href="/van-leasing"><a>van</a></Link> depends on whether you use it purely for business or for both business and personal reasons.</p>
                            <p>If you are an employee and regularly use your van for private use, then you must pay BIK tax.</p>
                            <p>Vans currently have a flat rate of BIK which is £3,430. If your company also pays for your fuel, usually with a fuel card, there is an additional BIK standard value of £655. Zero emission vans pay 60% of the rate, meaning an employee is liable to pay £2,058.</p>
                            <p>Employees also pay a percentage of the BIK value based on their own personal tax obligations. If you pay 20% tax, you pay 20% of the BIK value. Standard tax payable on a van is therefore £686 which is just £57.17 per month. The same applies to the fuel benefit tax and for zero emission vehicles.</p>
                            <h2>BIK tax for electric cars and hybrids</h2>
                            <p>The Government introduced new BIK savings on efficient battery electric cars and plug-in hybrids from 6th April 2020 in a bid to increase the uptake of fully electric cars among fleets.</p>
                            <p>Company car drivers will now pay 0% tax on pure electric vehicles (EVs) throughout 2020/21.</p>
                            <h2>Find your next company car</h2>
                            <p>Are you ready to discover your perfect company car? Take a look at our <Link passHref href="/business-car-leasing"><a>business lease deals</a></Link>. Or if you’d prefer an option that won’t affect your tax liabilities, check out <Link passHref href="/car-leasing"><a>personal car leasing</a></Link>.</p>
                            <p>Our information is correct at time at the time of writing, but always consult HMRC or a tax specialist relevant to your individual needs.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <Faqs faqs={faqs} className="p-0" title="BIK tax FAQs" />
            </div>
        </>
    )
}

BlkTax.layout = MainLayout;