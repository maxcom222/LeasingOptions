import React, { ReactNode } from 'react';
import style from './results-blocker.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    resultsLoading: boolean;
    children?: ReactNode;
}
const ResultsBlocker:React.FC<Props> = ({resultsLoading, children}) => {
   
    return (
        <div className={`${style['results-blocker']} ${resultsLoading ? style['results-blocker--loading'] : ''}`}>
            <div className={style['results-blocker__overlay']}><FontAwesomeIcon className="fa-spin" icon={faCircleNotch} /></div>
            {children}
        </div>
    );
}

export default ResultsBlocker;