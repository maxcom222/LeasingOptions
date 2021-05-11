import React from 'react';
import style from './footer.module.scss';
import TrustMini from 'components/trustpilot/trust-mini';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { faFacebook, faLinkedin, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
import { GetPhoneNumber } from 'helpers/helpers';
import { connect } from 'react-redux';
import { TrustThemeTypes } from 'enums/TrustThemeTypes';

type Props = {
    isInternal: boolean;
}
const Footer: React.FC<Props> = ({ isInternal }) => {
    const phoneNumber = GetPhoneNumber(isInternal);

    return (
        <>
            <div className="container-fluid py-3 py-md-5 bg-funder-grey">
                <div className="row">
                    <div className="col-24 col-md-12 mb-3 mb-md-0 px-0 px-md-3 d-flex">
                        <div className="w-100 position-relative bg-white py-3 p-md-4 d-flex flex-wrap justify-content-center align-items-start align-items-md-center">
                            <h3 className="w-100 position-relative text-center px-3 px-md-0">Accreditation &amp; Partners</h3>
                            <p className="w-100 position-relative text-center px-3 px-md-0">As accredited car leasing brokers in the UK, we work with leading car manufacturers and a number of finance companies, including: ALD automotive, ARVAL, Alphabet, Hitachi, Lex Autolease, LeasePlan and Santander to get you the best deal on your lease. We are a proud member of the BVRLA.</p>
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="ALD logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/ald-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Alphabet logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/alphabet-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Arval logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/arval-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="BVRLA logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/bvrla-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Hitachi logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/hitachi-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="LeasePlan logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/leaseplan-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Lex Autolease logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/lex-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Santander logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/satander-mono.png`} />
                        </div>
                    </div>
                    <div className="col-24 col-md-12 mb-3 mb-md-0 px-0 px-md-3 d-flex">
                        <div className="w-100 position-relative bg-white py-3 p-md-4 d-flex flex-wrap justify-content-center align-items-start align-items-md-center">
                            <h3 className="w-100 position-relative text-center px-3 px-md-0">Featured on</h3>
                            <p className="w-100 position-relative text-center px-3 px-md-0">At LeasingOptions we pride ourselves on being industry leaders and are willing to share our expertise with national and regional media to help educate people on all aspects of leasing. Here is a snapshot of some of the media outlets that we have been featured in recently.</p>                           
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Autoevolution logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/autoevolution-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Autoblog logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/autoblog-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="BMWblog logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/bmwblog-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Car throttle logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/carthrottle-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Daily Express logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/dailyexpress-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Daily Record logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/dailyrecord-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Car Scoops logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/carscoops-mono.png`} />
                            <img width="100" height="43" className={`${style['partner-hover']} img-fluid lazyload`} alt="Drive Tribe logo colour" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/partner-logos/drivetribe-mono.png`} />
                        </div>
                    </div>
                </div>
            </div>
            <footer className={style.footer}>
                <div className="container-fluid py-3 py-5">
                    <div className="row">
                        <div className={`col-24 col-md-6 ${style['footer__col']} d-flex flex-column mb-3 mb-md-5`}>
                            <h2 className="mb-3">Support</h2>
                            <h3 className="mb-3 py-3"><a className="phonenumber_call_now_href" aria-label="Phone number" href={`tel:${phoneNumber}`}><span className="phonenumber_call_now">{phoneNumber}</span></a></h3>
                            <ul>
                                <li>Monday to Friday:<span> |</span> 9.00am - 6.00pm</li>
                            </ul>
                            <ul>
                                <li><a href="mailto:info@leasingoptions.co.uk">info@leasingoptions.co.uk</a></li>
                            </ul>
                            <ul className={`${style['footer__social']} mt-4`}>
                                <li><a aria-label="Instagram" href="https://www.instagram.com/leasing_options_ltd" target="_blank" rel="noreferrer"><FontAwesomeIcon width="28" height="28" icon={faInstagram} /></a></li>
                                <li><a aria-label="Twitter" href="https://twitter.com/LeasingOptions" target="_blank" rel="noreferrer"><FontAwesomeIcon width="28" height="28" icon={faTwitter} /></a></li>
                                <li><a aria-label="LinkedIn" href="https://www.linkedin.com/company/leasing-options-ltd" target="_blank" rel="noreferrer"><FontAwesomeIcon width="28" height="28" icon={faLinkedin} /></a></li>
                                <li><a aria-label="Facebook" href="https://www.facebook.com/LeasingOptionsLtd" target="_blank" rel="noreferrer"><FontAwesomeIcon width="28" height="28" icon={faFacebook} /></a></li>
                                <li><a aria-label="Youtube" href="https://www.youtube.com/channel/UCavDFgP64eci2XUTqElJvcQ" target="_blank" rel="noreferrer"><FontAwesomeIcon width="28" height="28" icon={faYoutube} /></a></li>
                            </ul>
                        </div>
                        <div className={`col-24 col-md-6 ${style['footer__col']} d-flex flex-column mb-3 mb-md-5`}>
                            <h2 className="mb-3">Company</h2>
                            <ul className="mb-3">
                                <li><Link prefetch={false} passHref href="/our-story"><a>About Us</a></Link></li>
                                <li><Link prefetch={false} passHref href="/terms-and-conditions"><a>Terms &amp; Conditions</a></Link></li>
                                <li><Link prefetch={false} passHref href="/news"><a>News</a></Link></li>
                                <li><Link prefetch={false} passHref href="/careers"><a>Careers</a></Link></li>
                                <li><Link prefetch={false} passHref href="/contact"><a>Contact</a></Link></li>
                                <li><Link prefetch={false} href="/sitemap"><a>Sitemap</a></Link></li>
                            </ul>
                            <TrustMini theme={TrustThemeTypes.Light}/>
                        </div>
                        <div className={`col-24 col-md-6 ${style['footer__col']} d-flex flex-column mb-3 mb-md-5`}>
                            <h2 className="mb-3">Quick Links</h2>
                            <ul>
                                <li><Link prefetch={false} passHref href="/car-leasing"><a>Personal Car Leasing</a></Link></li>
                                <li><Link prefetch={false} passHref href="/van-leasing"><a>Van Leasing</a></Link></li>
                                <li><Link prefetch={false} passHref href="/business-car-leasing"><a>Business Car Leasing</a></Link></li>
                                <li><Link prefetch={false} passHref href="/car-leasing-deals"><a>Car Leasing Special Offers</a></Link></li>
                                <li><Link prefetch={false} passHref href="/car-leasing-with-insurance"><a>Leasing With Insurance</a></Link></li>
                                <li><Link prefetch={false} passHref href="/my-garage"><a>My Garage</a></Link></li>
                            </ul>
                        </div>
                        <div className={`col-24 col-md-6 ${style['footer__col']} d-flex flex-column mb-3 mb-md-5`}>
                            <h2 className="mb-3">Compliance</h2>
                            <ul>
                                <li><Link prefetch={false} passHref href="/privacy-policy"><a>Privacy Policy</a></Link></li>
                                <li><Link prefetch={false} passHref href="/cookie-policy"><a>Cookie Policy</a></Link></li>
                                <li><Link prefetch={false} passHref href="/treating-customers-fairly"><a>Treating Customers Fairly</a></Link></li>
                                <li><Link prefetch={false} passHref href="/initial-disclosure"><a>Initial Disclosure Document</a></Link></li>
                                <li><Link prefetch={false} passHref href="/complaints"><a>Complaints</a></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <div className={style['footer__disclaimer']}>
                                <p>Leasing Options Limited is authorised and regulated by the Financial Conduct Authority FRN 660061. Our BVRLA membership number is 1487. We act as a credit broker not a lender. We can introduce you to a limited number of lenders who may be able to offer you finance facilities for your purchase. We will only introduce you to these lenders. We may receive a commission payment from the finance provider if you decide to enter into an agreement with them. You may be able to obtain finance for your purchase from other lenders and you are encouraged to seek alternative quotations. Business customers may not be protected under the Consumer Credit Act 1974 or the rules of the Financial Conduct Authority.</p>
                                <p>Leasing Options Limited - Registered in England and Wales. Company number: 02487254. Registered with the Information Commissioner’s Office as a Data Controller. Data Protection Registration number: Z7436776. Registered Office Address: Options House, Atkin Street, Worsley, Manchester, M28 3DG Telephone: <a href={`tel: ${phoneNumber}`}>{phoneNumber}</a>. Email: <a href="mailto:info@leasingoptions.co.uk">info@leasingoptions.co.uk</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal
});

export default connect(mapStateToProps)(Footer);