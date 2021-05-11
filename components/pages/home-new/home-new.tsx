import React from 'react';
import Link from 'next/link';
import TrustMicro from 'components/trustpilot/trust-micro';
import DoofinderSearch from 'components/layout/doofinder-search';
import ManufacturerCards from 'components/layout/manufacturer-cards';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

import { VehicleTypes } from 'enums/VehicleTypes';
import { Make } from 'types/Make';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';

type Props = {
    carManufacturerList: Array<Make>;
}

const HomePage: React.FC<Props> = ({ carManufacturerList }) => {

    return (
        <>
            <section className="container-fluid bg-blue-grad py-3 pb-md-5">
                <div className="row">
                    <div className="col-24 text-center">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={carManufacturerList.length > 0 ? true : false} rows={1} color='#1a3b71'>
                            <TrustMicro theme={TrustThemeTypes.Light} />
                        </ReactPlaceholder>
                    </div>
                    <div className="col-24 col-md-18 col-lg-16 offset-md-3 offset-lg-4 my-3">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={carManufacturerList.length > 0 ? true : false} rows={1} color='#1a3b71' className="mb-0 mb-md-3">
                            <h1 className="text-white text-center mb-0 mb-md-3">Find an affordable lease deal on a brand new vehicle</h1>
                        </ReactPlaceholder>
                    </div>
                    <div className="col-24 col-md-12 col-lg-10 offset-md-6 offset-lg-7">
                        <ReactPlaceholder firstLaunchOnly={true} type='rect' ready={carManufacturerList.length > 0 ? true : false} color='#1a3b71' className="w-100" style={{ height: 250 }}><DoofinderSearch /></ReactPlaceholder>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-4">
                <div className="row">
                    <div className="col-24 col-md-8 d-flex mb-3 mb-md-0">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={carManufacturerList.length > 0 ? true : false} rows={6}>
                            <div className="w-100 box box--home box--car-so d-flex bg-blue-grad py-4 px-3">
                                <Link passHref href="/car-leasing-deals">
                                    <a className="w-100 d-flex flex-wrap justify-content-center align-items-center text-center text-decoration-none">
                                        <h3 className="w-100 text-white mb-0">Car leasing special offers<br /><small className="text-white">Latest and greatest</small></h3>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/home/home-audi.png`} width="300" height="200" className="img-fluid lazyload my-4" alt="Audi Q2" /> 
                                        <span className="w-100 text-white">View all <FontAwesomeIcon width="14" height="14" icon={faChevronRight} className="fill-white" /></span>
                                    </a>
                                </Link>            
                            </div>
                        </ReactPlaceholder>
                    </div>
                    <div className="col-24 col-md-8 d-flex mb-3 mb-md-0">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={carManufacturerList.length > 0 ? true : false} rows={6}>
                            <div className="w-100 box box--home box--van-so d-flex bg-black-grad py-4 px-3">
                                <Link passHref href="/van-leasing-deals">
                                    <a className="w-100 d-flex flex-wrap justify-content-center align-items-center text-center text-decoration-none">
                                        <h3 className="w-100 text-white mb-0">Van leasing special offers<br /><small className="text-white">All shapes and sizes</small></h3>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/home/home-ford.png`} width="300" height="200" className="img-fluid lazyload my-4" alt="Ford Transit" /> 
                                        <span className="w-100 text-white">View all <FontAwesomeIcon width="14" height="14" icon={faChevronRight} className="fill-white" /></span>
                                    </a>
                                </Link>
                            </div>
                        </ReactPlaceholder>
                    </div>
                    <div className="col-24 col-md-8 d-flex">
                        <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={carManufacturerList.length > 0 ? true : false} rows={6}>
                            <div className="w-100 box box--home box--px d-flex bg-grey-grad py-4 px-3">
                                <Link passHref href="/value-your-car">
                                    <a className="w-100 d-flex flex-wrap justify-content-center align-items-center text-center text-decoration-none">
                                        <h3 className="w-100 text-white mb-0">Part exchange available<br /><small className="text-white">Get money off your new lease</small></h3>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/home/home-golf.png`} width="300" height="200" className="img-fluid lazyload my-4" alt="Volkswagen Golf" /> 
                                        <span className="w-100 text-white">Learn more <FontAwesomeIcon width="14" height="14" icon={faChevronRight} className="fill-white" /></span>
                                    </a>
                                </Link>   
                            </div>
                        </ReactPlaceholder>
                    </div>
                </div>
            </section>
            <ManufacturerCards makes={carManufacturerList} vehicleType={VehicleTypes.Car} />
        </>
    );
}

export default HomePage;