import React from 'react';
import style from './pagesize.module.scss';

type Props = {
    className?: any;
    increments: Array<number>;
    activePage: number;
    handlePageClick: any;
}

const PageSize:React.FC<Props> = ({className, increments, activePage, handlePageClick}) => {
    
    return (
        <div className={`${style['pagesize']} ${className ? className : ""}`}>
            <p>Results Per Page</p>
            <ul>
                {increments.map(increment =>
                    <li key={`page-key-${increment}`}><button onClick={() => handlePageClick(increment)} className={activePage === increment ? style['active'] : ""}>{increment}</button></li>
                )}
            </ul>
        </div>
    )
}

export default PageSize;