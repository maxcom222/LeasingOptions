import React from 'react';
import { connect } from 'react-redux';
import style from './site-alert.module.scss';

type Props = {
    children: any;
    siteAlertState: boolean;
    handleHideAlert: any;
}

function mapStateToProps(state) {
    return {
        siteAlertState: state.siteAlertState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        handleHideAlert: () => {
            dispatch({ type: 'CLOSE_ALERT_BAR', close: false });
        }
    }
}

const SiteAlert:React.FC<Props> = ({children, siteAlertState, handleHideAlert}) => {
    
    return (
        <>
            {siteAlertState &&
                <div className={`container-fluid ${style['alert-corona']} alert-dismissible fade show`} role="alert">
                    <div className="row">
                        <div className="col-24 py-2 py-md-3">
                            {children} <button type="button" onClick={handleHideAlert} className={style['close-message']} data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                    </div> 
                </div> 
            }
        </>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(SiteAlert);