import React from 'react';
import { useRouter } from 'next/router';
import style from './deal-selector.module.scss';
import { connect } from 'react-redux';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';

function mapStateToProps(state) {
    return {
        dealToggle: state.dealSelector,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
        handleDealToggle: (evt) => {
            if(evt.target.checked) {
                dispatch({ type: 'UPDATE_DEAL_TYPE', deal: LeasingDealTypes.Personal });
            } else {
                dispatch({ type: 'UPDATE_DEAL_TYPE', deal: LeasingDealTypes.Business });
            }
        },
        handleDealLabel: (evt, deal) => {
            evt.preventDefault();
            dispatch({ type: 'UPDATE_DEAL_TYPE', deal: deal })
        }
    }
}

function dealSelector(props) {
    const router = useRouter();

    return (
        <div className={`${style['deal-selector']} ${props.theme === 'light' ? style['deal-selector--light'] : ''}`}>
            <span className={style.business} onClick={(evt) => props.handleDealLabel(evt, LeasingDealTypes.Business)}>Business <span>Prices</span></span>
            <div>
                <input type="checkbox" id="switch" onClick={(evt) => props.handleDealToggle(evt)} defaultChecked={props.dealToggle === LeasingDealTypes.Personal} />
                <label htmlFor="switch">Deal Selector</label>
            </div>
            <span className={style.personal} onClick={(evt) => props.handleDealLabel(evt, LeasingDealTypes.Personal)}>Personal <span>Prices</span></span>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(dealSelector);