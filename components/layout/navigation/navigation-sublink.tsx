import React from 'react';
import style from './navigation.module.scss';
import NavManufacturer from './navigation-manufacturers';
import NavModel from './navigation-models';
import NavBudget from './navigation-budgets';
import NavBodies from './navigation-bodies';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


function mapStateToProps(state) {
    return {
        carManufacturerList: state.carManufacturerList,
        vanManufacturerList: state.vanManufacturerList,
        navigationStates: state.navigationStates
    };
}

const HeaderSubLink = ({children, className, linkTitle, panelClass, id, dealSelector, VehicleType, handleNavStates, handlePanelClose, carManufacturerList, vanManufacturerList, navigationStates, ...otherProps}) => {

    const handleSubLinkToggle = (evt) => {
        evt.preventDefault();    
        handleNavStates(evt, id, 3, evt.currentTarget?.innerText);
    }

    return (
        <li className={`${className} ${navigationStates.currentSubLink.id === id ? style['is-active'] : ""}`} id={id}>
            <div className={style['lvl-caption']} onClick={(evt) => { handleSubLinkToggle(evt) }}>{linkTitle} <FontAwesomeIcon width="18" height="18" icon={faChevronRight} /></div>
            <div className={`${style['sub-nav-panel']} ${style[panelClass]}`}>
                <div className={style['panel-title']}>
                    {linkTitle} <button className={style['close']} type="button" onClick={(evt) => { handlePanelClose(evt) }}>×</button>
                </div>
                {panelClass == 'make-nav' && <NavManufacturer id={id} dealSelector={dealSelector} VehicleType={VehicleType} /> }
                {panelClass == 'model-nav' && <NavModel id={id} dealSelector={dealSelector} VehicleType={VehicleType} /> }
                {panelClass == 'budget-nav' && <NavBudget id={id} dealSelector={dealSelector} /> }
                {panelClass == 'body-nav' && <NavBodies id={id} dealSelector={dealSelector} VehicleType={VehicleType} /> }
            </div>
        </li>
    )
}

export default connect(mapStateToProps)(HeaderSubLink);