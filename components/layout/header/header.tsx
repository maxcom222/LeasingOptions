import React, { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import Navigation from "../navigation";
import DealSelector from '../deal-selector';
import HeaderSearch from './header-search';
import ModalContext from '../../HOCs/modal/modalContext';
const Search = dynamic(() => import('../../search'), { ssr: false })
const ModalPostcode = dynamic(() => import('../modal-postcode/modal-postcode'), { ssr: false })
const ModalContact =  dynamic(() => import('../modal-contact/modal-contact'), { ssr: false })
import TrustScore from '../../trustpilot/trust-score';

import style from './header.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPhoneAlt, faEnvelope, faSearch, faBars, faTimes, faEdit, faCheck } from "@fortawesome/pro-regular-svg-icons";
import { logEvent, logLabelEvent } from '../../../helpers/analytics';
import { connect } from 'react-redux';
import { getSearchButton, GetPhoneNumber} from 'helpers/helpers';
import { SearchPanels } from '../../../enums/SearchPanels';

const Header: React.FC = (props: any) => {
    const router = useRouter();
    const modalContext = useContext(ModalContext);
    const [navToggle, setNavToggle] = useState<boolean>(false);
    const [searchToggle, setSearchToggle] = useState<boolean>(false);
    const [searchButtonText, setSearchButtonText] = useState<string>(getSearchButton(router, props.vehicleFilters, props.dealSelector));
    const handleHeaderToggle = (evt, toggle) => {
        evt.preventDefault();
        props.dispatchHeaderToggle(toggle);
    }
    const handleSearchToggle = (evt) => {
        evt.preventDefault();
        setSearchToggle(!searchToggle);
    }
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
    const handleSearchClick = () => {
        if (router.pathname.includes('car-leasing-with-insurance')) {
            if (props.userPostcode) {
                modalContext.showModal(Search, { show: true, title: "Refine Search", activePanel: SearchPanels.SearchDetailed })
            } else {
                modalContext.showModal(ModalPostcode, { show: true, title: 'Search Insured Cars' })
            }
        } else {
            modalContext.showModal(Search, { show: true, title: searchButtonText, activePanel: searchButtonText === "Refine Search" ? 6 : 1 })
        }
    }
    const logContact = () => {
        logEvent('Contact', 'Click');
        logLabelEvent('Contact', 'Click', 'leave_message_track');
    }
    const handleContactClick = () => {
        modalContext.showModal(ModalContact, { show: true, title: "Contact" })
    }

    const HasLeaseDealTypeToggle = (router) => {
        let showToggle = false;

        //TODO: check this logic. Don't think router.pathname.includes('car-leasing') check is correct. In any case better solution is required
        if (router.asPath === "/" || (router.asPath !== "/car-leasing-with-insurance" && router.pathname.includes('car-leasing'))) {
            showToggle = true;
        }

        return showToggle;
    }

    useEffect(() => {
        Router.events.on('routeChangeStart', (url) => {
            setNavToggle(false);
            props.dispatchMenuClose();
            props.dispatchRouteChange(url);

            // Close search on route change
            modalContext.showModal(Search, { show: false, title: "Start Your Search" })
        });
    }, []);

    useEffect(() => {
        // Check for active filters
        setSearchButtonText(getSearchButton(router, props.vehicleFilters, props.dealSelector));
    }, [router, props.vehicleFilters, props.dealSelector]);

    const hasLeaseDealTypeToggle = HasLeaseDealTypeToggle(router);
    const phoneNumber = GetPhoneNumber(props.isInternal);

    return (
        <header className={`${style['header']} ${props.headerToggle ? style['header--condensed'] : ''}`}>
            <div className={`${style['head-toggle']} container-fluid d-lg-none`}>
                <div className="row">
                    <div className={`col-24 ${style['head-toggle__col']}`}>
                        {hasLeaseDealTypeToggle &&
                            <>
                                <div className={style['deal-manage']}>
                                    <DealSelector theme="light" />
                                    <a className={style['head-toggle__close']} onClick={(evt) => handleHeaderToggle(evt, true)}><FontAwesomeIcon width="20" height="20" icon={faTimes} /></a>
                                </div>
                                <div className={style['deal-view']}>
                                    <span className={`${style['deal-label']} ${style['deal-indicator']}`}>{props.dealSelector === 1 ? "Business" : "Personal"} Prices Active</span>
                                    <span className={`${style['deal-label']} ${style['deal-edit']} ${style['head-toggle__open']}`} onClick={(evt) => handleHeaderToggle(evt, false)}>Change Prices</span>
                                    <FontAwesomeIcon width="16" height="16" icon={faEdit} />
                                    <FontAwesomeIcon width="16" height="16" icon={faCheck} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className={`container-fluid ${style['head-bar']}`}>
                <div className={`row ${style['head-bar__row']}`}>
                    <div className={`col-10 col-lg-4 ${style['head-bar__col']}`}>
                        <Link prefetch={false} href="/" passHref>
                            <a className="text-decoration-none"><img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/leasing-options-logo.svg`} alt="LeasingOptions Logo" className="img-fluid" width="230" /></a>
                        </Link>
                    </div>
                    <div className={`col-14 ${style['head-bar__col']} d-inline-flex justify-content-end align-items-center d-lg-none`}>
                        <ul className={`${style['head-bar__ql']} list-inline`}>
                            <li className="list-inline-item"><a onClick={(evt) => handleContactClick()} aria-label="Contact"><FontAwesomeIcon width="16" height="16" icon={faEnvelope} onClick={logContact} /></a></li>
                            <li className="list-inline-item"><a href={`tel:${phoneNumber}`}><FontAwesomeIcon width="22" height="22" icon={faPhoneAlt} /></a></li>
                            <li className="list-inline-item">
                                <a onClick={(evt) => handleSearchToggle(evt)} aria-label="Search">{searchToggle ? <FontAwesomeIcon width="22" height="22" icon={faTimes} /> : <FontAwesomeIcon width="22" height="22" icon={faSearch} />}</a>
                            </li>
                        </ul>
                        <a id={style['head-bar__toggle']} onClick={(evt) => handleMenuToggle(evt)}><span>Menu</span><FontAwesomeIcon width="22" height="25" icon={faBars} /></a>
                    </div>
                    <div className={`col-4 d-none d-lg-flex justify-content-center align-items-center ${style['head-bar__col']}`}>
                        {hasLeaseDealTypeToggle &&
                            <DealSelector />
                        }
                    </div>
                    <div id="text-search" className={`${style['head-bar__col']} ${style['head-bar__search']} col-24 col-lg-6 ${searchToggle ? 'd-block' : ''}`}>
                    
                            <HeaderSearch dealSelector={props.dealSelector} />
                 
                    </div>
                    <div className={`${style['head-bar__col']} col-6 d-none d-lg-flex justify-content-center align-items-center text-center`}>
                        <ul className={`${style['head-bar__sub']} list-inline`}>
                         
                            <li className="list-inline-item"><Link prefetch={false} passHref href="/news"><a>Blog</a></Link></li>
                            <li className="list-inline-item"><Link prefetch={false} passHref href="/advice"><a>Guides</a></Link></li>
                            <li className={`list-inline-item ${style['head-bar__dd']}`}>
                                <div className={style['lvl-caption']}>Help <FontAwesomeIcon width="20" height="20" icon={faChevronDown} /></div>
                                <div className={style['sub-lvl']}>
                                    <ul className={style['sub-nav']}>
                                        <li>
                                            <Link prefetch={false} passHref href="/car-leasing-faqs"><a>FAQs</a></Link>
                                        </li>
                                        <li>
                                            <Link prefetch={false} passHref href="/customer-testimonials"><a>Testimonials</a></Link>
                                        </li>
                                        <li>
                                            <Link prefetch={false} passHref href="/our-story"><a>Our Story</a></Link>
                                        </li>
                                        <li>
                                            <Link prefetch={false} passHref href="/look-after-my-car"><a>Gap Insurance</a></Link>
                                        </li>
                                        <li>
                                            <Link prefetch={false} passHref href="/what-is-bik-tax"><a>Tax Calculator</a></Link>
                                        </li>
                                        <li>
                                            <Link prefetch={false} passHref href="/fair-wear-and-tear"><a>Fair Wear And Tear</a></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="list-inline-item"><a aria-label="Contact" onClick={(evt) => handleContactClick()}>Contact</a></li>
                        </ul>
                    </div>
                    <div className={`${style['head-bar__col']} ${style['head-bar__tel']} col-4 d-none d-lg-block text-right`}>
                        <a aria-label="Phone number" href={`tel:${phoneNumber}`}><span className="phonenumber_call_now">{phoneNumber}</span></a>
                    </div>
                </div>
            </div>
            <div className={`container-fluid ${style['head-cta']} d-lg-none`}>
                <div className="row">
                    <div className="col-24 d-flex flex-nowrap align-items-center justify-content-between">
                           <TrustScore />
                        <button className="btn btn-primary btn-fluid vehicle-search-button" onClick={() => handleSearchClick()}>{searchButtonText}</button>
                    </div>
                </div>
            </div>
            <Navigation navToggle={navToggle} searchButtonText={searchButtonText} handleMenuClose={handleMenuClose} />
        </header>
    )
}

const mapStateToProps = (state) => ({
    isInternal: state.isInternal,
    dealSelector: state.dealSelector,
    headerToggle: state.headerToggle,
    vehicleFilters: state.vehicleFilters,
    userPostcode: state.userPostcode,
});

const mapDispatchToProps = dispatch => {
    return {
        dispatchHeaderToggle: (toggle) => {
            dispatch({ type: 'UPDATE_HEADER_STATE', toggle: toggle });
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);