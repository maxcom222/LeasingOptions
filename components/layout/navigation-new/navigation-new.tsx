import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import style from './navigation.module.scss';
import NavLink from './navigation-link';
import NavSubLink from './navigation-sublink';
import Link from 'next/link';
import ModalContext from '../../HOCs/modal/modalContext';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { faLinkedin, faInstagram, faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { VehicleTypes } from 'enums/VehicleTypes';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';
import { GetPhoneNumber } from 'helpers/helpers';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

type Props = {
    isInternal: boolean;
    navToggle: boolean;
    handleMenuClose: any;
    navigationStates: any;
    userPostcode: string;
}

function mapStateToProps(state) {
    return {
        isInternal: state.isInternal,
        navigationStates: state.navigationStates,
        userPostcode: state.userPostcode,
    };
}

const Navigation: React.FC<Props> = ({ isInternal, navToggle, handleMenuClose, navigationStates, userPostcode }) => {
    const router = useRouter();
    const modalContext = useContext(ModalContext);
    const dispatch = useDispatch();

    const handleMenuBack = (evt) => {
        evt.preventDefault();

        if (navigationStates.level === 2) {
            dispatch({ type: 'UPDATE_LINK_STATE', id: "", level: 1, controls: false, indicator: "" });
        } else if (navigationStates.level === 3) {
            dispatch({ type: 'UPDATE_LINK_STATE', id: navigationStates.currentLink.id, level: 2, controls: true, indicator: navigationStates.currentLink.name });
        }
    }

    const handlePanelClose = (evt) => {
        evt.preventDefault();
        dispatch({ type: 'UPDATE_LINK_STATE', id: navigationStates.currentLink.id, level: 2, controls: true, indicator: navigationStates.currentLink.name });
    }


    const handleNavStates = (evt, id, level, indicator) => {
        evt.preventDefault();

        dispatch({ type: 'UPDATE_OVERLAY_STATE', state: true });

        if (level == 2) {
            if (id === navigationStates.currentLink.id) {
                dispatch({ type: 'UPDATE_LINK_STATE', id: "", level: 1, controls: false, indicator: "" });
                dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
            } else {
                dispatch({ type: 'UPDATE_LINK_STATE', id: id, level: level, controls: true, indicator: indicator });
            }
        } else if (level == 3) {
            if (id === navigationStates.currentSubLink.id) {
                dispatch({ type: 'UPDATE_SUB_STATE', id: "", level: 2, controls: true, indicator: "" });
            } else {
                dispatch({ type: 'UPDATE_SUB_STATE', id: id, level: level, controls: true, indicator: indicator });
            }
        }
    }

    const navRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if(navRef.current.scrollTop != 0){
            navRef.current.scrollTop = 0;
        }       
    }, [navToggle, navigationStates]);

    return (
        <div ref={navRef} className={`container-fluid ${style['nav-bar']} ${navToggle ? 'd-block' : ''}`}>
            <ReactPlaceholder firstLaunchOnly={true} type='text' showLoadingAnimation={true} ready={navigationStates ? true : false} rows={1} color='#ffffff'>
                <div className={`${style['multilevel-nav-wrapper']} ${style['multilevel-nav-wrapper__top']}`}>
                    <div className={`${style['multilevel-controls']} ${navigationStates.controls ? style['multilevel-controls--full'] : ""}`}>
                        <a href="#" className={style['multilevel-controls__back']} onClick={(evt) => handleMenuBack(evt)}><FontAwesomeIcon width="18" height="18" icon={faChevronLeft} /> Back</a>
                        <span className={style['multilevel-controls__label']}>{navigationStates.indicator}</span>
                        <a href="#" className={style['multilevel-controls__close']} onClick={(evt) => handleMenuClose(evt)}>Close</a>
                    </div>               
                    <ul className={style['multilevel-nav']}>
                        <NavLink className={style['lvl-item']} linkTitle="Personal Car Leasing" id="personal-leasing" handleNavStates={handleNavStates}>
                            <div className={style['sub-lvl']}>
                                <ul className={style['sub-nav']}>
                                    <li><Link href="/car-leasing" passHref><a className="text-decoration-none">Car Leasing</a></Link></li>
                                    <NavSubLink className={style['lvl']} linkTitle="Manufacturer" id="personal-leasing-manufacturer" dealSelector={LeasingDealTypes.Personal} VehicleType={VehicleTypes.Car} panelClass="make-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                    <NavSubLink className={style['lvl']} linkTitle="Model" id="personal-leasing-model" dealSelector={LeasingDealTypes.Personal} VehicleType={VehicleTypes.Car} panelClass="model-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                    <NavSubLink className={style['lvl']} linkTitle="Budget" id="personal-leasing-budget" dealSelector={LeasingDealTypes.Personal} VehicleType={VehicleTypes.Car} panelClass="budget-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                    <NavSubLink className={style['lvl']} linkTitle="Body" id="personal-leasing-body" dealSelector={LeasingDealTypes.Personal} VehicleType={VehicleTypes.Car} panelClass="body-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                    <li><Link href="/car-leasing/in-stock" passHref><a className="text-decoration-none">In Stock</a></Link></li>
                                    <li><Link href="/short-term-car-leasing" passHref><a className="text-decoration-none">Short Term Leasing</a></Link></li>
                                    <li><Link href="/hydrogen-car-leasing" passHref><a className="text-decoration-none">Hydrogen Leasing</a></Link></li>
                                </ul>
                            </div>
                        </NavLink>
                        <li className={style['lvl-items']}>
                            <div className={style['multilevel-nav-wrapper']}>
                                <ul className={style['multilevel-nav']}>
                                    <NavLink className={style['lvl-item']} linkTitle="Business Car Leasing" id="business-leasing" handleNavStates={handleNavStates}>
                                        <div className={style['sub-lvl']}>
                                            <ul className={style['sub-nav']}>
                                                <li><Link href="/business-car-leasing" passHref><a className="text-decoration-none">Business Car Leasing</a></Link></li>
                                                <NavSubLink className={style['lvl']} linkTitle="Manufacturer" id="business-leasing-manufacturer" dealSelector={LeasingDealTypes.Business} VehicleType={VehicleTypes.Car} panelClass="make-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                <NavSubLink className={style['lvl']} linkTitle="Model" id="business-leasing-model" dealSelector={LeasingDealTypes.Business} VehicleType={VehicleTypes.Car} panelClass="model-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                <NavSubLink className={style['lvl']} linkTitle="Budget" id="business-leasing-budget" dealSelector={LeasingDealTypes.Business} VehicleType={VehicleTypes.Car} panelClass="budget-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                <NavSubLink className={style['lvl']} linkTitle="Body" id="business-leasing-body" dealSelector={LeasingDealTypes.Business} VehicleType={VehicleTypes.Car} panelClass="body-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                <li><Link href="/car-leasing/in-stock?leasingdeal=business" passHref><a className="text-decoration-none">In Stock</a></Link></li>
                                                <li><Link href="/short-term-car-leasing?leasingdeal=business" passHref><a className="text-decoration-none">Short Term Leasing</a></Link></li>
                                                <li><Link href="/hydrogen-car-leasing" passHref><a className="text-decoration-none">Hydrogen Leasing</a></Link></li>
                                            </ul>
                                        </div>
                                    </NavLink>
                                    <li className={style['lvl-items']}>
                                        <div className={style['multilevel-nav-wrapper']}>
                                            <div className={style['flex-space-wrapper']}>
                                                <ul className={style['multilevel-nav']}>
                                                    <NavLink className={style['lvl-item']} linkTitle="Van Leasing" id="van-leasing" handleNavStates={handleNavStates}>
                                                        <div className={style['sub-lvl']}>
                                                            <ul className={style['sub-nav']}>
                                                                <li><Link href="/van-leasing" passHref><a className="text-decoration-none">Van Leasing</a></Link></li>
                                                                <NavSubLink className={style['lvl']} linkTitle="Manufacturer" id="van-leasing-manufacturer" dealSelector={LeasingDealTypes.Van} VehicleType={VehicleTypes.Commercial} panelClass="make-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                                <NavSubLink className={style['lvl']} linkTitle="Model" id="van-leasing-model" dealSelector={LeasingDealTypes.Van} VehicleType={VehicleTypes.Commercial} panelClass="model-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                                <NavSubLink className={style['lvl']} linkTitle="Budget" id="van-leasing-budget" dealSelector={LeasingDealTypes.Van} VehicleType={VehicleTypes.Commercial} panelClass="budget-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                                <NavSubLink className={style['lvl']} linkTitle="Body" id="van-leasing-body" dealSelector={LeasingDealTypes.Van} VehicleType={VehicleTypes.Commercial} panelClass="body-nav" handleNavStates={handleNavStates} handlePanelClose={handlePanelClose} />
                                                                <li><Link href="/van-leasing/in-stock" passHref><a className="text-decoration-none">In Stock</a></Link></li>
                                                                <li><Link href="/short-term-van-leasing" passHref><a className="text-decoration-none">Short Term Leasing</a></Link></li>
                                                            </ul>
                                                        </div>
                                                    </NavLink>
                                                    <NavLink className={`${style['lvl-item']} ${style['simple']}`} linkTitle="Special Offers" id="specialoffers" handleNavStates={handleNavStates}>
                                                        <div className={style['sub-lvl']}>
                                                            <ul className={style['sub-nav']}>
                                                                <li><Link href="/car-leasing-deals" passHref><a className="text-decoration-none">Car Special Offers</a></Link></li>
                                                                <li><Link href="/van-leasing-deals" passHref><a className="text-decoration-none">Van Special Offers</a></Link></li>
                                                            </ul>
                                                        </div>
                                                    </NavLink>
                                                    <li className={`${style['lvl-item']} ${style['simple']}`} id="atc"><Link href="/car-leasing-with-insurance"><a className={style['lvl-link']}>Insured Leasing</a></Link></li>
                                                    <NavLink className={`${style['lvl-item']} ${style['simple']}`} linkTitle="Electric Leasing" id="electric-leasing" handleNavStates={handleNavStates}>
                                                        <div className={style['sub-lvl']}>
                                                            <ul className={style['sub-nav']}>
                                                                <li><Link href="/electric-hybrid-car-leasing" passHref><a className="text-decoration-none">Electric &amp; Hybrid Leasing</a></Link></li>
                                                                <li><Link href="/electric-hybrid-car-leasing/types" passHref><a className="text-decoration-none">Electric Car Types</a></Link></li>
                                                                <li><Link href="/electric-hybrid-car-leasing/charging" passHref><a className="text-decoration-none">EV Charging</a></Link></li>
                                                                <li><Link href="/electric-hybrid-car-leasing/government-grants" passHref><a className="text-decoration-none">Government Grants</a></Link></li>
                                                            </ul>
                                                        </div>
                                                    </NavLink>
                                                    <li className={`${style['lvl-item']} ${style['simple']}`} id="valueyourcar"><Link href="/value-your-car"><a className={style['lvl-link']}>Part Exchange</a></Link></li>
                                                    <li className={`${style['lvl-item']} ${style['mobile']}`} id="my-garage"><Link href="/my-garage"><a className={style['lvl-link']}>My Garage</a></Link></li>
                                                    <li className={`${style['lvl-item']} ${style['mobile']} ${style['simple']}`}><Link href="/news" ><a className={style['lvl-link']}>Blog</a></Link></li>
                                                    <li className={`${style['lvl-item']} ${style['mobile']} ${style['simple']}`}><Link href="/advice"><a className={style['lvl-link']}>Guides</a></Link></li>
                                                    <NavLink className={`${style['lvl-item']} ${style['mobile']} ${style['simple']}`} linkTitle="Help" id="mobile-links" handleNavStates={handleNavStates}>
                                                        <div className={style['sub-lvl']}>
                                                            <ul className={style['sub-nav']}>
                                                                <li><Link href="/car-leasing-faqs" passHref><a className="text-decoration-none">FAQ's</a></Link></li>
                                                                <li><Link href="/customer-testimonials" passHref><a className="text-decoration-none">Testimonials</a></Link></li>
                                                                <li><Link href="/our-story"><a className="text-decoration-none">Our Story</a></Link></li>
                                                                <li><Link href="/look-after-my-car" passHref><a className="text-decoration-none">Gap Insurance</a></Link></li>
                                                                <li><Link href="/what-is-bik-tax" passHref><a className="text-decoration-none">Tax Calculator</a></Link></li>
                                                                <li><Link href="/fair-wear-and-tear" passHref><a className="text-decoration-none">Fair wear and tear</a></Link></li>
                                                            </ul>
                                                        </div>
                                                    </NavLink>
                                                </ul>  
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>               
                    <a className={`d-none d-lg-inline-flex ${style['nav-bar__tel']}`} aria-label="Phone number" href={`tel:${GetPhoneNumber(isInternal)}`}><span className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</span></a>
                    <div className={style['multilevel-footer']}>
                        <p>Speak to one of our team</p>
                        <a href={`tel:${GetPhoneNumber(isInternal)}`}><span className="phonenumber_call_now">{GetPhoneNumber(isInternal)}</span></a>
                        <p>Open today: <span>9am - 7pm</span> | <Link href="/contact#openinghours" passHref><a className="text-decoration-none">See all hours</a></Link></p>
                        <ul>
                            <li><a href="https://www.facebook.com/LeasingOptionsLtd" aria-label="Facebook" target="_blank" rel="noreferrer"><FontAwesomeIcon width="20" height="20" icon={faFacebookF} /></a></li>
                            <li><a href="https://www.linkedin.com/company/leasing-options-ltd" aria-label="LinkedIn" target="_blank" rel="noreferrer"><FontAwesomeIcon width="20" height="20" icon={faLinkedin} /></a></li>
                            <li><a href="https://www.instagram.com/leasing_options_ltd" aria-label="Instagram" target="_blank" rel="noreferrer"><FontAwesomeIcon width="20" height="20" icon={faInstagram} /></a></li>
                            <li><a href="https://twitter.com/LeasingOptions" aria-label="Twitter" target="_blank" rel="noreferrer"><FontAwesomeIcon width="20" height="20" icon={faTwitter} /></a></li>
                        </ul>
                    </div>
                </div>
            </ReactPlaceholder>
        </div>
    )
}

export default connect(mapStateToProps)(Navigation);