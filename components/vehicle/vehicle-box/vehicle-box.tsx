import React, { ReactNode } from 'react';
import style from './vehicle-box.module.scss';

type Props = {
    isExpiredState: boolean;
    children: ReactNode;
}

const VehicleBox: React.FC<Props> = ({ isExpiredState, children }) => {

    return (
        <div className={style['vehicle-box']}>
            {isExpiredState ? (<div className={style['vehicle-box_expired']}></div>) : null}
            {children}
        </div>
    )
}

export default VehicleBox;