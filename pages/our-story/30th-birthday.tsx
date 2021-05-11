import React from 'react';
import Link from 'next/link';
import style from 'sass/30th-birthday.module.scss';
import MetaHead from 'components/seo/meta';
import MainLayout from 'components/layout/main-layout';
import PageBanner from 'components/page-banner';
import VehicleCarousel from 'components/vehicle-carousel';
import CardNews from 'components/card/card-news';
import BirthdayCountdown from 'components/layout/birthday-countdown';
import wrapper from 'redux/store.tsx/store';
import { NewsService } from 'business-logic/newsService';
import { getLandingPageSchema, GetServiceSchema } from 'helpers/schemaHelper';
import { MetaData } from 'types/infrastructure/MetaData';
import { LayoutProps } from 'types/LayoutProps';
import { getBaseUrl } from 'helpers/urlsHelper';
import { GetCanonicalUrl } from 'helpers/urlHelper';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { VehicleTypes } from 'enums/VehicleTypes';
import { NewsTypes } from "enums/NewsTypes";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import * as _ from 'underscore';
import CardWithStickers from 'components/card/card-with-stickers'

export const getServerSideProps = wrapper.getServerSideProps(

    async (context) => {
        const categoryNewsPromise = await NewsService.GetAllNewsArticlePreviews(NewsTypes.Blog, [352], 1, 4);

        const webPageSchema = getLandingPageSchema(LeasingDealTypes.Personal, context.req.url);
        const serviceSchema = await GetServiceSchema(VehicleTypes.Car);

        const metaData: MetaData = {
            title: `Leasing Options' 30th Birthday! | Leasing Options`,
            description: `We're celebrating our incredible 30th year in business! Join us on a trip down memory lane and take advantage of some limited time special offers.`,
            canonicalUrl: GetCanonicalUrl(getBaseUrl(context.req.url)),
            keywords: ``
        }

        return {
            props: {
                metaData: metaData,
                serviceSchema: serviceSchema,
                webPageSchema: webPageSchema,
                news: categoryNewsPromise.data,
            }
        }

    }
)

type Props = {
    serviceSchema: string,
    webPageSchema: string,
    news: any,
}

const ThirtiethBirthday: LayoutProps<Props> = ({ serviceSchema, webPageSchema, news }) => {
    const ArrowLeft = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-prev" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronLeft} /></span>);
    }
    const ArrowRight = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-next" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronRight} /></span>);
    }
    const settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        lazyLoad: 'ondemand',
        arrows: true,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        dots: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        responsive: [
            {
                breakpoint: 1401,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ]
    };

    return (
        <>
            <MetaHead>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webPageSchema }}></script>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }}></script>
            </MetaHead>

            <PageBanner className="page-banner--tblp" trustPilot={true} trustPilotCentered={true} padded={false}>
                <div className="row">
                    <div className="d-flex flex-wrap col-24 col-md-16 offset-md-4 pt-md-3 pb-5 pb-md-0 text-center">
                        <h1 className="w-100 order-md-1 text-white text-center h2"><strong>It’s Leasing Options 30th Birthday!!!</strong></h1>
                        <BirthdayCountdown />
                        <p className="w-100 order-md-2 text-white text-center mb-3 mb-md-5 px-sm-3">In September 1990, Leasing Options was launched. 70,000 cars and 15,000 customers later and LeasingOptions and our team are celebrating our incredible 30th year in business. Join us on our trip down memory lane and share your memories on our social channels using the hashtag #LO30.</p>
                    </div>
                </div>
            </PageBanner>
            <section className="container-fluid py-3 pt-sm-4 px-sm-4 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-20 offset-md-2">
                        <h2 className="text-center">Back to the future</h2>
                        <p className="text-center">We thought it was only right to celebrate this fantastic milestone . We want to take the time to reflect on where we have come from and look ahead at our exciting future. So check out our collection of reviews of some of our favourite subjects from the last 30 years.</p>
                    </div>
                </div>
            </section>
            <section className="container-fluid pb-md-5">
                <div className="row">
                    <div className="col-24 col-md-12 px-0 d-flex order-md-2">
                        <div className="w-100 position-relative bg-wood p-3 p-md-4 text-center">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/polaroid-astra.png`} className="img-fluid lazyload polaroid-image" alt="Vauxhall Astra Old" />
                        </div>
                    </div>
                    <div className="col-24 col-md-12 px-0 d-flex order-md-1">
                        <div className="w-100 position-relative bg-tblp p-3 p-md-5 text-center">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/ribbon-blue.png`} className="lazyload absolute-ribbon" alt="Blue Ribbon" />
                            <small className="d-inline-block mb-2 text-white">Limited time offer</small>
                            <h2 className="text-white">Vauxhall Astras</h2>
                            <p className="text-white px-3 px-md-5 mx-md-5">Help us celebrate our birthday with 20% off Processing fees on a brand new Astra!</p>
                            <div className="w-100 position-relative d-block text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/vauxhall-astra.png`} className="img-fluid lazyload mb-md-3" alt="Vauxhall Astra New" />
                            </div>
                            <Link passHref href="/car-leasing/vauxhall/astra"><a className="btn btn-secondary btn-lg mb-5 mb-md-0">Vauxhall Astra Offers</a></Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-24 col-md-12 px-0 d-flex">
                        <div className="w-100 position-relative bg-wood p-3 p-md-4 text-center">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/polaroid-golf.png`} className="img-fluid lazyload polaroid-image" alt="Volkswagen Golf GTI old" />
                        </div>
                    </div>
                    <div className="col-24 col-md-12 px-0 d-flex">
                        <div className="w-100 position-relative bg-tblpb p-3 p-md-5 text-center">
                            <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/ribbon-silver.png`} className="lazyload absolute-ribbon" alt="Blue Ribbon" />
                            <small className="d-inline-block mb-2 text-white">Limited time offer</small>
                            <h2 className="text-white">Volkswagen Golfs</h2>
                            <p className="text-white px-3 px-md-5 mx-md-5">Help us celebrate our birthday with 20% off Processing fees on a brand new Golf!</p>
                            <div className="w-100 position-relative d-block text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/volkswagen-golf.png`} className="img-fluid lazyload" alt="Volkswagen Golf GTI new" />
                            </div>
                            <Link passHref href="/car-leasing/volkswagen/golf"><a className="btn btn-secondary btn-lg mb-5 mb-md-0">Volkswagen Golf Offers</a></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid py-3 py-md-5 bg-grey-md">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 mb-3 mb-md-5 pt-1 px-sm-4">
                        <h2 className="text-center px-3 px-md-0">A lot has happened since we opened…</h2>
                        <p className="text-center">As Leasing Options celebrates 30 years in business, we’re taking a look back at some of the key motoring moments that the past three decades have thrown at us.</p>
                    </div>
                </div>
                <dv className="row">
                    <div className="col-24 col-md-16 offset-md-4 px-0 px-md-3 text-center">
                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/birthday-infographic.jpg`} className="img-fluid lazyload" alt="Leasing Options Timeline Infographic" />
                    </div>
                </dv>
            </section>
            <section className="container-fluid py-3 py-md-5">
                <div className="row">
                    <div className="col-24 col-md-16 offset-md-4 mb-3 mb-md-5">
                        <h2 className="text-center px-3 px-md-0">Flashback</h2>
                        <p className="text-center"></p>
                    </div>
                </div>
                <dv className="row no-gutters">
                    <div className="col-24 mb-5 mb-md-0 birthday-carousel slick-paginated">
                        <Slider {...settings}>
                            <div className={`${style['birthday-col']} ${style['birthday-col--old']}`}>
                                <div className={`${style['birthday-col__header']} h3 d-flex flex-nowrap justify-content-between align-items-center`}>1990 BMW 5 Series<img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/30th-logo.png`} className="img-fluid lazyload" alt="30th Logo" /></div>
                                <div className={style['birthday-col__content']}>
                                    <div className={style['birthday-col__img']}>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/5-series-old.png`} className="img-fluid lazyload" alt="1990 BMW 5 Series" />
                                    </div>
                                    <div className={style['birthday-col__info']}>
                                        <h5>Performance &amp; Features</h5>
                                        <p>ABS, Aircon, CD Player, Cassette Player</p>
                                        <table cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Engine</strong></td>
                                                    <td>2.5L – 168hp</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>0-60mph</strong></td>
                                                    <td>8.2 Sec</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price</strong></td>
                                                    <td>£28,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link passHref href="/car-leasing/bmw/5-series"><a className="btn btn-lg btn-block btn-black">Search 5 Series</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style['birthday-col']} ${style['birthday-col--new']}`}>
                                <div className={`${style['birthday-col__header']} h3 d-flex flex-nowrap justify-content-between align-items-center`}>2020 BMW 5 Series<img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/30th-logo.png`} className="img-fluid lazyload" alt="30th Logo" /></div>
                                <div className={style['birthday-col__content']}>
                                    <div className={style['birthday-col__img']}>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/5-series-new.png`} className="img-fluid lazyload" alt="2020 BMW 5 Series" />
                                    </div>
                                    <div className={style['birthday-col__info']}>
                                        <h5>Performance &amp; Features</h5>
                                        <p>Mild Hybrid, 12.3” Virtual Cockpit, 10.25” multi-media display </p>
                                        <table cellPadding="0" cellSpacing="0">\
                                            <tbody>
                                                <tr>
                                                    <td><strong>Engine</strong></td>
                                                    <td>2.0L – 184hp</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>0-60mph</strong></td>
                                                    <td>7.9 Sec</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price</strong></td>
                                                    <td>£41,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link passHref href="/car-leasing/bmw/5-series"><a className="btn btn-lg btn-block btn-primary">Search 5 Series</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style['birthday-col']} ${style['birthday-col--old']}`}>
                                <div className={`${style['birthday-col__header']} h3 d-flex flex-nowrap justify-content-between align-items-center`}>1990 Vauxhall Astra <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/30th-logo.png`} className="img-fluid lazyload" alt="30th Logo" /></div>
                                <div className={style['birthday-col__content']}>
                                    <div className={style['birthday-col__img']}>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/astra-old.png`} className="img-fluid lazyload" alt="1990 Vauxhall Astra" />
                                    </div>
                                    <div className={style['birthday-col__info']}>
                                        <h5>Performance &amp; Features</h5>
                                        <p>Cassette player, cloth upholstery</p>
                                        <table cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Engine</strong></td>
                                                    <td>1.4L - 75hp</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>0-60mph</strong></td>
                                                    <td>15.5 Sec</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price</strong></td>
                                                    <td>£9,700 rrp</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link passHref href="/car-leasing/vauxhall/astra"><a className="btn btn-lg btn-block btn-black">Search Astra</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style['birthday-col']} ${style['birthday-col--new']}`}>
                                <div className={`${style['birthday-col__header']} h3 d-flex flex-nowrap justify-content-between align-items-center`}>2020 Vauxhall Astra <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/30th-logo.png`} className="img-fluid lazyload" alt="30th Logo" /></div>
                                <div className={style['birthday-col__content']}>
                                    <div className={style['birthday-col__img']}>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/astra-new.png`} className="img-fluid lazyload" alt="2020 Vauxhall Astra" />
                                    </div>
                                    <div className={style['birthday-col__info']}>
                                        <h5>Performance &amp; Features</h5>
                                        <p>Electric Handbrake, Apple CarPlay/Android Auto, 7” Touchscreen</p>
                                        <table cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Engine</strong></td>
                                                    <td>1.2L – 110hp</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>0-60mph</strong></td>
                                                    <td>10.2 Sec</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price</strong></td>
                                                    <td>£21,000 rrp</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link passHref href="/car-leasing/vauxhall/astra"><a className="btn btn-lg btn-block btn-primary">Search Astra</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style['birthday-col']} ${style['birthday-col--old']}`}>
                                <div className={`${style['birthday-col__header']} h3 d-flex flex-nowrap justify-content-between align-items-center`}>1990 Volkswagen Golf <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/30th-logo.png`} className="img-fluid lazyload" alt="30th Logo" /></div>
                                <div className={style['birthday-col__content']}>
                                    <div className={style['birthday-col__img']}>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/golf-old.png`} className="img-fluid lazyload" alt="1990 Volkswagen Golf " />
                                    </div>
                                    <div className={style['birthday-col__info']}>
                                        <h5>Performance &amp; Features</h5>
                                        <p>Tartan Cloth, Steel sunroof, electric windows</p>
                                        <table cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Engine</strong></td>
                                                    <td>1.8L – 118hp</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>0-60mph</strong></td>
                                                    <td>7.8 Sec</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price</strong></td>
                                                    <td>£14,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link passHref href="/car-leasing/volkswagen/golf"><a className="btn btn-lg btn-block btn-black">Search Golf</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={`${style['birthday-col']} ${style['birthday-col--new']}`}>
                                <div className={`${style['birthday-col__header']} h3 d-flex flex-nowrap justify-content-between align-items-center`}>2020 Volkswagen Golf <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/30th-logo.png`} className="img-fluid lazyload" alt="30th Logo" /></div>
                                <div className={style['birthday-col__content']}>
                                    <div className={style['birthday-col__img']}>
                                        <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/30th_birthday/golf-new.png`} className="img-fluid lazyload" alt="2020 Volkswagen Golf " />
                                    </div>
                                    <div className={style['birthday-col__info']}>
                                        <h5>Performance &amp; Features</h5>
                                        <p>Adaptive Cruise Control, dynamic road sign display, digital cockpit</p>
                                        <table cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Engine</strong></td>
                                                    <td>2.0L – 245hp</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>0-60mph</strong></td>
                                                    <td>6.2 Sec</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Price</strong></td>
                                                    <td>£34,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link passHref href="/car-leasing/volkswagen/golf"><a className="btn btn-lg btn-block btn-primary">Search Golf</a></Link>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </dv>
            </section >
            {news.dataItems.length > 0 &&
                <section className="container-fluid py-md-5">
                    <div className="row">
                        <div className="col-24">
                            <h3 className="text-center mb-0 mb-md-3">Birthday news and stories</h3>
                        </div>
                        <div className="col-24 mt-3 mb-5 mb-md-0">
                        <CardWithStickers>
                            <VehicleCarousel className="slick-paginated" dots={true} mobileAuto={true} mobileArrows={true} tabletArrows={true} desktopArrows={true} infinite={news.dataItems.length > 4}>
                                {news.dataItems.map((article) => {
                                    return (
                                        <CardNews key={`article-${article.id}`} id={`article-${article.id}`} className="card-news--space" image={article.imageUrl} tag={4} link={article.url} title={article.title} date={article.onDate} excerpt={article.description} />
                                    )
                                })}
                            </VehicleCarousel>
                            </CardWithStickers>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

ThirtiethBirthday.layout = MainLayout;

export default ThirtiethBirthday;