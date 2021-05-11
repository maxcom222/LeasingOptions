import React from 'react';
import { connect } from 'react-redux';
import style from './page-overlay.module.scss';

function mapStateToProps(state) {
    return {
        overlayState: state.overlayState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleOverlayClick: (evt) => {
            dispatch({ type: 'UPDATE_OVERLAY_STATE', state: false });
            dispatch({ type: 'UPDATE_LINK_STATE', id: "", level: 1, controls: false, indicator: "" });
        },
    }
}

const PageOverlay = (props) => {
   
    return (
        <div className={`${style['page-overlay']} ${props.overlayState ? style['is-active'] : ""}`} onClick={(evt) => props.handleOverlayClick(evt)}></div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOverlay)