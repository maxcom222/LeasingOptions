import React, { useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import Navigation from "../navigation-new";
import HeaderSmartSearch from './header-smart-search';
import ModalContext from '../../HOCs/modal/modalContext';
import ModalContact from '../modal-contact';
import style from './header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPhoneAlt, faBars } from "@fortawesome/pro-regular-svg-icons";
import { connect } from 'react-redux';
import { listenToScroll } from "helpers/helpers";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import { GetPhoneNumber} from 'helpers/helpers';

const Header: React.FC = (props: any) => {
    const modalContext = useContext(ModalContext);
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState(false);
    const [navToggle, setNavToggle] = useState<boolean>(false);
   
    const handleMenuToggle = (evt) => {
        evt.preventDefault();
        setNavToggle(!navToggle);
        props.dispatchMenuToggle();
    }
    const handleMenuClose = (evt) => {
        evt.preventDefault();
        setNavToggle(false);
        props.dispatchMenuClose();
    }
    const handleContactClick = () => {
        modalContext.showModal(ModalContact, { show: true, title: "Contact" })
    }

    useEffect(() => {
        setIsLoaded(true);

        Router.events.on('routeChangeStart', (url) => {
            setNavToggle(false);
            props.dispatchMenuClose();
            props.dispatchRouteChange(url);
        });

        // Listen for scroll
        function setPageScrolled() {
            if(listenToScroll(0.2)) {
                const hashString = window.location.hash;

                if (hashString.includes('dfclassic')) {
                    setScrolled(false);
                } else {
                    setScrolled(true);
                }

                //@ts-ignore doofinder and dfClassicLayers are not declared
                if (dfClassicLayers?.length > 0) {
                    //@ts-ignore cannot find name 'dfClassicLayers'
                    dfClassicLayers[0].layer.hide();
                }
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', setPageScrolled);

        return () => {
            window.removeEventListener('scroll', setPageScrolled);
        }

    }, []);

    return (
        <header className={`${style['header']} ${scrolled  ? style['is-scrolled'] : ''} ${router.asPath !== '/beta'  ? style['is-search'] : ''}`}>
            <div className={`container-fluid ${style['head-bar']}`}>
                
                <div className={`row ${style['head-bar__row']}`}>
                    <div className={`col-2 ${style['head-bar__col']} d-inline-flex justify-content-start align-items-center d-lg-none`}>
                        <FontAwesomeIcon width="21" height="21" onClick={(evt) => handleMenuToggle(evt)} icon={faBars} />
                    </div>
                    <div className={`col-20 col-lg-8 d-inline-flex justify-content-center justify-content-md-start align-items-center ${style['head-bar__col']}`}>
                        <ReactPlaceholder firstLaunchOnly={true} type='rect' ready={isLoaded} color='#E3E3E3' style={{ width: 130, height: 22 }}>
                            <Link href="/" passHref>
                                <a className="d-flex text-decoration-none"><img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/monochrome-logo.svg`} alt="LeasingOptions Logo" className="img-fluid" width="130" height="21" /></a>
                            </Link>
                        </ReactPlaceholder>
                    </div>
                    <div className={`col-2 ${style['head-bar__col']} d-inline-flex justify-content-end align-items-center d-lg-none`}>
                        <a href={`tel:${GetPhoneNumber(props.isInternal)}`}><FontAwesomeIcon width="21" height="21" icon={faPhoneAlt} /></a>
                    </div>
                    <div id="text-search" className={`${style['head-bar__col']} ${style['head-bar__search']} col-24 col-lg-8 d-flex justify-content-end align-items-center`}>
                        <ReactPlaceholder firstLaunchOnly={true} type='rect' ready={isLoaded} color='#FFFFFF' className="w-100" style={{ height: 29 }}>
                            <HeaderSmartSearch />
                        </ReactPlaceholder>
                    </div>
                    <div className={`${style['head-bar__col']} col-8 d-none d-lg-flex justify-content-end align-items-center`}>
                        <ReactPlaceholder type='textRow' ready={isLoaded} className="w-70 mt-0" color='#FFFFFF'>
                            <ul className={`${style['head-bar__sub']} list-inline`}>
                                <li className="list-inline-item"><Link passHref href="/my-garage"><a>My Garage</a></Link></li>
                                <li className="list-inline-item"><Link passHref href="/news"><a>Blog</a></Link></li>
                                <li className="list-inline-item"><Link passHref href="/advice"><a>Guides</a></Link></li>
                                <li className={`list-inline-item ${style['head-bar__dd']}`}>
                                    <div className={style['lvl-caption']}>Help <FontAwesomeIcon width="20" height="20" icon={faChevronDown} /></div>
                                    <div className={style['sub-lvl']}>
                                        <ul className={style['sub-nav']}>
                                            <li>
                                                <Link passHref href="/car-leasing-faqs"><a>FAQs</a></Link>
                                            </li>
                                            <li>
                                                <Link passHref href="/customer-testimonials"><a>Testimonials</a></Link>
                                            </li>
                                            <li>
                                                <Link passHref href="/our-story"><a>Our Story</a></Link>
                                            </li>
                                            <li>
                                                <Link passHref href="/look-after-my-car"><a>Gap Insurance</a></Link>
                                            </li>
                                            <li>
                                                <Link passHref href="/what-is-bik-tax"><a>Tax Calculator</a></Link>
                                            </li>
                                            <li>
                                                <Link passHref href="/fair-wear-and-tear"><a>Fair Wear And Tear</a></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="list-inline-item"><a aria-label="Contact" onClick={(evt) => handleContactClick()}>Contact</a></li>
                            </ul>
                        </ReactPlaceholder>
                    </div>
                </div>
            </div>
            <Navigation navToggle={navToggle} handleMenuClose={handleMenuClose} />
        </header>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal,
    dealSelector: state.dealSelector,
    vehicleFilters: state.vehicleFilters,
    userPostcode: state.userPostcode,
});

const mapDispatchToProps = dispatch => {
    return {
        dispatchMenuToggle: () => {
            dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
        },
        dispatchMenuClose: () => {
            dispatch({ type: 'UPDATE_LINK_STATE', id: "", level: 1, controls: false, indicator: "" });
            dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
        },
        dispatchRouteChange: (url) => {
            //Set referrer
            dispatch({ type: "UPDATE_REFERRER", url: url });
            // Reset navigation state
            dispatch({ type: 'UPDATE_LINK_STATE', id: "", level: 1, controls: false, indicator: "" });
            // Reset Overlay
            dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
        }
    }
}

export default connect(mapStateToProps)(Header);