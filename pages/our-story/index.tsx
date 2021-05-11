import React from 'react';
import Link from 'next/link';
import MainLayout from 'components/layout/main-layout';
import MetaHead from 'components/seo/meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function OurStory() {
    return (
        <>
            <MetaHead>
                <title>About Leasing Options Ltd & Nigel Brain: UK Car Leasing Specialist</title>
                <meta name="description" content="Find out more about who Leasing Options are and how Nigel has grown the company over the last 30 years!" />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/our-story`)} />
            </MetaHead>
            <section className="container-fluid py-3">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24">
                            <h1>Our Story</h1>
                            <h2 className="text-mint mb-3 mb-md-5">Over 30 Years of First Class Leasing Service</h2>
                            <p>Back in 1990, after heading up the contract hire division of a large multi-national fleet department for a large corporation, our founders had the vision to bring all the benefits that big corporations enjoyed from vehicle leasing, to the everyday driver and small business. From these beginnings Leasing Options was born...</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 col-md-8 mb-3 mb-md-4">
                            <div className="img-box">
                                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/about_1.gif`} alt="" />
                            </div>
                        </div>
                        <div className="col-24 col-md-8 mb-3 mb-md-4">
                            <div className="img-box">
                                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/about_2.gif`} alt="" />
                            </div>
                        </div>
                        <div className="col-24 col-md-8 mb-3 mb-md-4">
                            <div className="img-box">
                                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/about_3.gif`} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <p>It was decided to provide a huge choice of great leasing deals, to ANY size of customer. In a quarter of a century we have grown significantly, whilst still maintaining our original core values of huge choice, amazing service, and the best prices. From a sole trader, a personal customer to a large company - whether a car or van we will have the lease deal for you! These values have seen us grow from strength to strength, despite financial
                            turbulence from economic slumps.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-lamc">
                <div className="container">
                    <div className="row">
                        <div className="col-24 col-md-14">
                            <h2 className="text-white">Leasing Options 25th Birthday</h2>
                            <h3 className="text-white">Birthday Cake Vs £350,000 Audi R8</h3>
                            <p className="text-white">We thought it was only right to celebrate this fantastic achievement with a birthday cake, a few birthday cakes in fact, and blowing out the candles Leasing Options-style; by driving through them in an Audi R8.</p>
                            <a href="mailto:info@leasingoptions.co.uk" className="text-white"><FontAwesomeIcon width="25" height="25" icon={faEnvelope} /></a>
                        </div>
                        <div className="col-24 col-md-10">
                            <div className="video-responsive mb-3">
                                <iframe width="1024" height="315" data-src="https://www.youtube.com/embed/X5OqGJXEuWQ" className="lazyload" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-24 py-3">
                            <h2>A Road Trip Down Memory Lane...</h2>
                            <h3>Taking a look back to our earliest memories, one thing was quite apparent... there certainly wasn't today’s flexible choice of vehicles being produced back then!</h3>
                            <p>
                                What vehicles could you expect to lease back in 1990? Well, as you'd find today, there were cars for the travelling reps, small families, business pool schemes and then more luxurious models for company execs, management and so forth. The 90's saw quite a variety of vehicles from Ford to Volkswagen,
                                Vauxhall to Rover, and iconic models from BMW to Audi too.
                            </p>
                            <p>However, manufacturers such as Nissan were opening up gateways to the Far East by releasing models such as the Primera, bringing their production to the UK. Across Europe, Renault introduced their new design Clio and Italy had the freshly designed Fiat Uno. Each a popular car for motorists, it was down to Ford, Rover and Vauxhall to bear the title of the most popular leasing choices when we first began our long illustrious enterprise!</p>
                            <p>Based on a 3 year residual value lease, and 20,000 mile allowance, examples you could have leased were:</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 col-md-8">
                            <div className="img-box">
                                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/about_4.jpg`} alt="" />
                            </div>
                            <p className="text-center">The Vauxhall Cavalier 1.6 L, £299.69 per month</p>
                        </div>
                        <div className="col-24 col-md-8">
                            <div className="img-box">
                                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/about_5.jpg`} alt="" />
                            </div>
                            <p className="text-center">The Rover 414 SLi £328.25 per month</p>
                        </div>
                        <div className="col-24 col-md-8">
                            <div className="img-box">
                                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/about_6.jpg`} alt="" />
                            </div>
                            <p className="text-center">The Ford Granada 2.9 Scorpio £716.88 per month</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24 py-3">
                            <h3>How much!?</h3>
                            <p>As you can see, vehicle leasing today has changed considerably, with a huge selection of makes and models now available, and prices that are far more affordable. Take the Granada for example, although a luxurious performance saloon back in 1990, paying those prices today would equate to £1,594.23 a month! That’s more than what it costs to lease the top of the range BMW 7 Series Saloon M760Li xDrive 4dr Auto today!</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

OurStory.layout = MainLayout;