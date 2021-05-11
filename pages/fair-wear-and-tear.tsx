import React from 'react';
import MainLayout from 'components/layout/main-layout';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function WearAndTear () {
    return (
        <>
            <MetaHead>
                <title>BVRLA Fair Wear and Tear Policy | Leasing Options</title>
                <meta name="description" content="What is Fair Wear and Tear on a leased car? Find out with our outline of the BVRLA's Fair Wear and Tear policy." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/fair-wear-and-tear`)} />
            </MetaHead>
            <section className="container-fluid py-3 py-md-5 bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-24">
                            <h1>Fair Wear and Tear</h1>
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/bvrla_logo.svg`} width="160" className="lazyload img-fluid" alt="BVRLA Logo" />
                            <h3 className="text-mint">Policy outline</h3>
                            <h2 className="text-mint">With any vehicle lease comes a 'fair wear and tear' examination at the end of the contract.</h2>
                            <p>As depreciation is the one thing that is covered during a lease term, additional damage or neglect lessens the vehicle's value further. However, a vehicle is expected to experience wear and tear, either on a personal lease car or more likely, a commercially leased van. The leasing company carries out a full assessment to determine whether or not your leased vehicle meets the agreed returned condition.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-light-grey">
            <div className="container bg-mint">
                    <div className="row">
                        <div className="col-24 py-3 py-md-4">
                            <h2 className="text-white h3 m-0">What is 'fair wear and tear'?</h2>
                        </div>
                    </div>
                </div>
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 p-3 p-md-4">
                            <div className="info-bar">
                                <p>Deterioration that occurs under normal usage is classed as fair wear and tear. Any damage which is a
                                result of neglect, an accident, collision or specific series of events is not classed as fair wear and tear
                                and responsibility falls on the customer to rectify or be charged accordingly. Likewise, damage
                                sustained by harsh treatment or omissions also fall outside the lines of fair wear and tear.</p>
                            </div>
                        </div>
                        <div className="col-24 col-md-12 px-3 px-md-4 mb-3 mb-md-4">
                            <div className="d-block bg-light-grey p-3">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/fair_wear_1.jpg`} className="lazyload img-fluid rounded" alt="Fair wear image one" />
                            </div>
                        </div>
                        <div className="col-24 col-md-12 px-3 px-md-4 mb-3 mb-md-4">
                            <div className="d-block bg-light-grey p-3">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/fair_wear_2.jpg`} className="lazyload img-fluid rounded" alt="Fair wear image two" />
                            </div>
                        </div>
                        <div className="col-24 px-3 px-md-4">
                            <h1 className="text-mint">What happens if the vehicle is in unacceptable condition?</h1>
                            <p>An obligatory prerequisite of members is to follow the BVRLA Code of Conduct as a nationwide accepted way to trade fairly and with the utmost responsibility when dealing with their customers. Typical lease contracts take into account the condition that the vehicle may be in by the end of a contract.</p>
                            <p>End-of-Lease charges are calculated and applied only when a vehicle is returned in a poorer condition than what was originally agreed and reflect the further depreciation of the car or van.</p>
                            <p>Whether from neglect, misuse, damage occurred or failure to maintain the vehicle, the subsequent charges are placed on the customer</p>
                        </div>
                    </div>
                </div>
                <div className="container bg-mint">
                    <div className="row">
                        <div className="col-24 p-3 p-md-4">
                            <h1 className="text-white">Before you return your vehicle...</h1>
                            <h3 className="text-white">We've compiled a handy checklist of steps we recommend you take before returning your vehicle.</h3>
                            <p className="text-white">You can download the list as a printable PDF.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 col-md-6 p-3 p-md-4 text-center order-md-2">
                            <a href={`${process.env.NEXT_PUBLIC_CDN}/website/static/fair-wear-check-list.pdf`}><img className="mb-3 lazyload img-fluid" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/pdf_img.png`} alt="download our fair wear and tear checklist" /></a>
                            <a href={`${process.env.NEXT_PUBLIC_CDN}/website/static/fair-wear-check-list.pdf`} className="btn btn-primary btn-lg mb-3">Download PDF</a>
                        </div>
                        <div className="col-24 col-md-18 p-3 p-md-4 order-md-1">
                            <h1 className="text-white">What happens next?</h1>
                            <p className="text-white">Depending on your agreement, the vehicle will be collected by a representative of the leasing company. They have to carry out the checks listed above and agree on the condition of the lease car or van before removal. All or any apparent damage that falls outside of the fair wear and tear boundaries will be noted on the vehicle collection sheet or electronic hand held device. As the customer you need to ensure that you are happy with with the inspection carried out and if requiring clarity, ask wherever necessary.</p>
                            <p className="text-white">
                            Any disputes regarding the condition or any damage to the vehicle must be dealt with through the correct channels. In such an event, the customer has the right to pay for an independent investigation of the evidence by a qualified engineer, agreed on by both parties. The decision by the engineer will be
                            binding, on both the BVRLA member and the customer and if the decision favours the customer, it will be the BVRLA members responsibility to refund the reasonable cost of the investigatory examination back to the customer.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 p-3 p-md-4">
                            <p className="text-white">Occasionally, disagreements between the customer and BVRLA members can arise that are non- resolvable directly. In these rare instances, unsettled disputes can be referred to the Association by either the BVRLA member involved, the customer or both.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

WearAndTear.layout = MainLayout;