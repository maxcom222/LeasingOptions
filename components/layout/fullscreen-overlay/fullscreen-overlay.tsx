import React, { ReactNode } from 'react';
import style from './fullscreen-overlay.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type Props = {
    children?: ReactNode;
    isActive: boolean;
    handleFullscreenClose?: any;
}

const FullscreenOverlay:React.FC<Props> = ({children, isActive, handleFullscreenClose}) => {
    return (
        <div className={`${style['fullscreen-overlay']} ${isActive ? style['is-active'] : ''}`}>
            {isActive && handleFullscreenClose && <a className={style['fullscreen-overlay__close']} onClick={() => handleFullscreenClose()}><FontAwesomeIcon width="20" height="20" icon={faTimes} /></a>}
            {children}
        </div>
    );
}

export default FullscreenOverlay;