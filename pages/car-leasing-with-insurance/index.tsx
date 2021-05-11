import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/main-layout';
import MetaHead from '../../components/seo/meta';
import PageBanner from '../../components/page-banner';
import PageTable from '../../components/layout/page-table';
import PageUsps from '../../components/layout/page-usps/page-usps';
import AsideAccordion from '../../components/layout/aside-accordion';
import Faqs from '../../components/layout/faqs';
import VehicleEligible from 'components/layout/vehicle-eligible';
import { ContentService } from 'business-logic/contentService';
import ModalContext from '../../components/HOCs/modal/modalContext';
import ModalContact from '../../components/layout/modal-contact';
import ModalVideo from '../../components/layout/modal-video';
import wrapper from 'redux/store.tsx/store';
import AsideGuides from '../../components/layout/aside-guides';
import { MetaData } from 'types/infrastructure/MetaData';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { getBaseUrl } from 'helpers/urlsHelper';
import { GetServiceSchema } from 'helpers/schemaHelper';
import { VehicleTypes } from 'enums/VehicleTypes';

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        
        const categoryList = await ContentService.GetContentCategories();
        const popularGuides = await ContentService.GetPopularContentItems();
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);

        const metaData: MetaData = {
            title: `Car Leasing With Insurance | Leasing Options UK`,
            description: `Get everything in one package with our Fuel & Go car leasing with insurance deals. Includes maintenance, repairs &amp; breakdown cover. Enquire today.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: `Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire`
        }

        return {
            props: {
                metaData: metaData,
                categoryList: categoryList.data,
                popularGuides: popularGuides.data,
                serviceSchema: serviceSchema,
            }
        }
    }
)

const CarLeasingInsured = ({ categoryList, popularGuides, serviceSchema }) => {
    const modalContext = useContext(ModalContext);
    const [pageFaqs, setPageFaqs] = useState();
    const handleContactClick = () => {
        modalContext.showModal(ModalContact, { show: true, title: "Contact" })
    }
    const handleVideoClick = (videoUrl) => {
        modalContext.showModal(ModalVideo, { show: true, title: "Fuel & Go Video", videoUrl: videoUrl })
    }

    useEffect(() => {
        Promise.resolve(getPageFaqs()).then(function (data) {
            setPageFaqs(data.data);
        })
    }, []);

    async function getPageFaqs() {
        return await ContentService.GetFaqList(12);
    }

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
            </MetaHead>
            <PageBanner className="page-banner--il" image="">
                <div className="row">
                    <div className="col-24 col-md-20 col-lg-18 pt-md-3">
                        <h1 className="text-white">Car Leasing With Insurance</h1>
                        <p className="text-white mb-3 mb-md-5">‘Fuel &amp; Go’ is everything you need in one easy package with insurance, breakdown cover, maintenance and accident management all included for Complete Car Leasing.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-24 col-lg-12 mt-md-3">
                        <VehicleEligible />
                    </div>
                </div>
            </PageBanner>
            <PageUsps logoUrl={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/fuel-logo-blue.svg`}>
                <div><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/insured-icon.svg`} className="lazyload" alt="" /><span>Insured Leasing</span></div>
                <div><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/maintenance.svg`} className="lazyload" alt="" /><span>Maintenance &amp; Repairs</span></div>
                <div><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/accident.svg`} className="lazyload" alt="" /><span>Accident Management</span></div>
                <div><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/insured-leasing/breakdown.svg`} className="lazyload" alt="" /><span>Breakdown Cover</span></div>
            </PageUsps>
            <section className="container-fluid bg-light-grey py-5">
                <div className="row">
                    <div className="col-24 col-lg-6 d-flex flex-wrap order-lg-2">
                        <AsideAccordion title="About insured car leasing">
                            <nav>
                                <a href="#benefits" className="anchor-link">Benefits of insured leasing?</a>
                                <a href="#faqs" className="anchor-link">FAQs</a>
                                <a onClick={(evt) => handleContactClick()} aria-label="Contact">Contact</a>
                            </nav>
                        </AsideAccordion>
                        <AsideGuides categoryList={categoryList} popular={true} popularGuides={popularGuides} />
                    </div>
                    <div className="col-24 col-lg-18 d-flex flex-wrap order-lg-1">
                        <div className="box p-3 p-md-5 bg-white page-content">
                            <h1>Totally Inclusive Vehicle Leasing</h1>
                            <p><strong>Car leasing essentially means you ‘rent’ a brand-new vehicle, making fixed monthly payments for a set period of time and an agreed mileage. When your contract ends, you return the car.</strong></p>
                            <p>Fuel & Go is a convenient way to get the vehicle you want with insurance, maintenance &amp; tax in one easy package.</p>
                            <p>Simply Fuel & Go Our Fuel & Go is a unique way you can bring together all aspects of leasing a car into one easy to manage payment. It covers the lease of the vehicle, the road tax, maintenance and breakdown cover. On top of all this, Fuel & Go covers you for any financial gap in the event of an accident to give you peace of mind.</p>
                            <button className="btn btn-outline-primary btn-lg mb-3" onClick={() => handleVideoClick("https://www.youtube.com/embed/4QJt5vjlVso")}>Watch Fuel &amp; Go Video</button>
                            <h2>Leasing With Insurance</h2>
                            <p>Fuel & Go removes the hassle of tediously searching for insurance quotes. With Fuel & Go the vehicle is completely insured, with a dedicated team who will co-ordinate repairs in the event of an accident. The cover will include fire and theft as well as covering the passengers and their belongings.</p>
                            <h3>Breakdown Cover</h3>
                            <p>Fuel & Go means Fuel & Go. If you unfortunately breakdown, then you don’t have to worry as you have RAC cover included in your lease. If the car is in need of repairs the lease even includes a replacement car for the first 48 hours.</p>
                            <h3>Maintenance and Repairs</h3>
                            <p>All scheduled maintenance work is covered in your Fuel & Go lease, so there is no need to worry about any surprise bills for a routine service. During the term of the lease all services are included as well as consumables like brake pads to keep your car healthy and you mobile.</p>
                            <h3>Accident Management</h3>
                            <p>In the event of an accident a Fuel & Go package will keep you covered. A dedicated team works to speed up every stage of looking after you, the car and getting you back on the road. The accident management team also boast quicker results than the industry standard of major insurers to make your experiences that little bit easier.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="benefits" className="container-fluid">
                <div className="row">
                    <div className="col-24 py-5">
                        <h2 className="h1">Fuel &amp; Go vs Regular Leasing</h2>
                    </div>
                    <div className="col-24 pb-5">
                        <PageTable />
                    </div>
                </div>
            </section>
            {pageFaqs &&
                <Faqs title="Fuel & Go Leasing FAQs" className="bg-light-grey" faqs={pageFaqs}>
                    <div className="row">
                        <div className="col-24">
                            <Link passHref href="/car-leasing-faqs"><a className="btn btn-outline-primary btn-lg btn-square">See All Car Leasing FAQs</a></Link>
                        </div>
                    </div>
                </Faqs>
            }
        </>
    );
}

CarLeasingInsured.layout = MainLayout;

export default CarLeasingInsured;