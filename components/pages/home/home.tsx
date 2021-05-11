import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import CardVehicle from 'components/card/card-vehicle';
import ManufacturerCards from 'components/layout/manufacturer-cards';
import PageBanner from 'components/page-banner';
import TrustMini from 'components/trustpilot/trust-mini';
import ModalContext from 'components/HOCs/modal/modalContext';
import Search from 'components/search';
import PartExchange from 'components/layout/part-exchange/part-exchange';
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { Make } from 'types/Make';
import CarLeasingGraphic from 'components/car-leasing-graphic/car-leasing-graphic';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';
import VehicleCarousel from 'components/vehicle-carousel';
import TrustSlider from 'components/trustpilot/trust-slider'
import CardWithStickers from 'components/card/card-with-stickers'

type Props = {
    isInternal: boolean;
    leasingDealType: LeasingDealTypes;
    carManufacturerList: Array<Make>;
    topVehicles: Array<any>; //todo define type
}

const HomePage: React.FC<Props> = ({ isInternal, leasingDealType, carManufacturerList, topVehicles }) => {
    let [pageBannerImage, setPageBannerImage] = useState('');
    const blackFridayTheme = process.env.NEXT_PUBLIC_BLACK_FRIDAY_THEME;
    const xmasTheme = process.env.NEXT_PUBLIC_XMAS_THEME;
    const modalContext = useContext(ModalContext);
    const handleSearchClick = () => {
        modalContext.showModal(Search, { show: true, title: "Start Your Search" })
    }



    useEffect(() => {



        if (blackFridayTheme === 'true') {
            setPageBannerImage(process.env.NEXT_PUBLIC_CDN + '/website/static/hero/black-friday-home-banner.jpg');
        } else {

            let selectBGtime = [];
            let selectBG = '';

            let bgMorningArray = [];
            let bgDayArray = [];
            let bgNightArray = [];

            if(xmasTheme === 'true') {
                bgMorningArray.push('WinterMorning1HeroImage.jpg', 'WinterMorning2HeroImage.jpg','WinterMorning3HeroImage.jpg', 'WinterMorning4HeroImage.jpg', 'WinterMorning5HeroImage.jpg', 'WinterMorning6HeroImage.jpg');
                bgDayArray.push('WinterEvening1HeroImage.jpg', 'WinterEvening2HeroImage.jpg', 'WinterEvening3HeroImage.jpg', 'WinterEvening4HeroImage.jpg', 'WinterEvening5HeroImage.jpg', 'WinterEvening6HeroImage.jpg', 'WinterEvening7HeroImage.jpg', 'WinterEvening8HeroImage.jpg', 'WinterEvening9HeroImage.jpg');
                bgNightArray.push('WinterNight1HeroImage.jpg', 'WinterNight2HeroImage.jpg', 'WinterNight3HeroImage.jpg', 'WinterNight4HeroImage.jpg', 'WinterNight5HeroImage.jpg');
            } else {
                bgMorningArray.push('morning-1.jpg', 'morning-2.jpg', 'morning-3.jpg', 'morning-4.jpg');
                bgDayArray.push('afternoon-1.jpg','afternoon-2.jpg','afternoon-3.jpg');
                bgNightArray.push('evening-1.jpg', 'evening-2.jpg', 'evening-3.jpg', 'evening-4.jpg', 'evening-5.jpg');
            }

            let d = new Date();
            let n = d.getHours();

            if (n > 13 && n < 19) {
                // If time is between 1PM – 7PM day theme to ‘intro’
                selectBGtime = bgDayArray;
            } else if (n > 19 || n < 6) {
                // If time is after 7PM or before 6AM, apply night theme to ‘intro’
                selectBGtime = bgNightArray;
            } else {
                // Else use ‘morning’ theme
                selectBGtime = bgMorningArray;
            }

            selectBG = selectBGtime[Math.floor(Math.random() * selectBGtime.length)];

            setPageBannerImage(process.env.NEXT_PUBLIC_CDN + '/website/static/hero/' + (xmasTheme === 'true' ? 'christmas/' : '') + selectBG);
        }
    }, []);

    return (
        <>
            <PageBanner image={pageBannerImage} trustPilot={false}>
                <div className="row">
                    <div className="col-24 py-md-5">
                        <h1 className="text-white"><strong>Find an affordable lease deal on a brand new vehicle</strong></h1>
                        <h2 className="text-white mb-3 mb-md-5">Drive away a brand new vehicle for less with Leasing Options. We guarantee the best deals on the latest cars and vans from trusted manufacturers – with an unbeatable 5 star service.<br /><br />Browse our affordable deals now or let us help find your perfect vehicle below.</h2>
                        <button onClick={() => handleSearchClick()} className={`btn ${blackFridayTheme === 'true' ? 'btn-bf' : 'btn-primary'} btn-lg btn-fluid-xs mb-3 mb-md-5 mr-sm-3`}>Search for a Car</button>
                        <Link passHref href="/car-leasing-deals"><a className={`btn ${blackFridayTheme === 'true' ? 'btn-bf' : 'btn-secondary'} btn-lg btn-fluid-xs mb-3 mb-md-5`} role="button">View Special Offers</a></Link>
                        <TrustMini theme={TrustThemeTypes.Light} />
                    </div>
                </div>
            </PageBanner>
            
            <div className="container-fluid py-3 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 pb-3 pb-md-5">
                        <h2 className="text-md-center">Leasing Options - <span>The Car Leasing Specialists</span></h2>
                        <p>We make it easy to lease cars and vans because our experts are always on hand to help you every step of the way, and our Price Match Promise means you'll always get the best deal available.</p>
                        <p>Leasing Options was created to help people lease cars they love at prices they adore. Over a quarter of a century later, that's still our sole mission. With <Link prefetch={false} href="/car-leasing"><a className="text-decoration-none">personal car leasing</a></Link>, <Link prefetch={false} href="/van-leasing"><a className="text-decoration-none">van leasing</a></Link> and <Link prefetch={false} href="/business-car-leasing"><a className="text-decoration-none">business car leasing</a></Link> all in one place, whatever you want, we've got it; including the latest <Link prefetch={false} href="/electric-hybrid-car-leasing"><a className="text-decoration-none">electric car lease deals</a></Link>.</p>
                    </div>
                </div>
                <div className="row d-none d-md-flex justify-content-between flex-row flex-wrap">
                    <div className="col d-flex justify-content-center align-items-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/icons/manufacturer-icon.svg`} className="img-fluid px-2 lazyload" alt="Manufacturer Icon" />
                        <h4 className="h5 mb-0">UK manufacturer warranties</h4>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/icons/delivery-icon.svg`} className="img-fluid px-2 lazyload" alt="Delivery Icon" />
                        <h4 className="h5 mb-0">Delivered to your door</h4>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/icons/part-exchange-icon.svg`} className="img-fluid px-2 lazyload" alt="Part Exchange Icon" />
                        <h4 className="h5 mb-0">Part exchange available</h4>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/icons/price-match-icon.svg`} className="img-fluid px-2 lazyload" alt="Price Match Icon" />
                        <h4 className="h5 mb-0">Price match promise</h4>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/icons/service-icon.svg`} className="img-fluid px-2 lazyload" alt="Service Icon" />
                        <h4 className="h5 mb-0">Established for 30 years</h4>
                    </div>
                </div>
            </div>

            <CarLeasingGraphic />

            <div className="container-fluid py-3 pt-sm-5 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24">
                        <h2 className="mb-3 mb-sm-5">Every possible size, every possible choice, at the very best price</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                    <CardWithStickers>
                        <VehicleCarousel infinite={topVehicles.length > 3} tabletArrows={true}>
                            {topVehicles?.map(vehicle => (
                                <CardVehicle key={`featured-${vehicle.vehicleRef}`} id={`featured-${vehicle.vehicleRef}`} vehicle={vehicle} dealSelector={leasingDealType} showStickers={false} />
                            ))}
                        </VehicleCarousel>
                    </CardWithStickers>
                    </div>
                </div>
            </div>
            <PartExchange isInternal={isInternal} />
            <ManufacturerCards makes={carManufacturerList} vehicleType={VehicleTypes.Car} />
            <div className="container-fluid py-3 py-sm-4 py-md-5 bg-light-grey">
                <div className="row">
                    <div className="col-24 text-center">
                        <h2 className="mb-3 text-center">Our customers think we're fantastic and so will you</h2>
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/trustpilot-rating.svg`} className="mb-3 img-fluid tp-logo lazyload" alt="Trustpilot Logo" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-24">
                        <TrustSlider />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;