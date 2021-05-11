import React from 'react';
import style from './page-table.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/pro-regular-svg-icons";

const PageTable = () => {
    
    return (
        <div className={`${style['page-table']} px-3`}>
            <div className={`${style['row']} row`}>
                <div className="col-16 text-center">&nbsp;</div>
                <div className={`col-4 text-center ${style['bg-atc-table']} ${style['page-table__text']}`}>Fuel &amp; Go</div>
                <div className={`col-4 text-center ${style['bg-grey']} ${style['page-table__text']}`}>Regular Lease</div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Everything in one fixed payment</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Insured Lease Vehicle</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Third Party Liability</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Maintenance</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className="col-4 text-center bg-grey page-table__text">Optional</div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Cover for Family/Spouse</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Write Off Shortfall Protection</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className="col-4 text-center bg-grey page-table__text">Optional</div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Glass Cover</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>48 Hour Total Loss Process</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Replacement Vehicle</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Recovery Service</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>Tax</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
            </div>
            <div className={`${style['row']} row`}>
                <div className={`col-16 ${style['bg-grey']}`}>MID Updates</div>
                <div className={`col-4 text-center ${style['bg-atc-table']}`}><FontAwesomeIcon width="20" height="16" icon={faCheck} /></div>
                <div className={`col-4 text-center ${style['bg-grey']}`}><FontAwesomeIcon width="20" height="16" icon={faTimes} /></div>
            </div>
        </div>
    )
}

export default PageTable;