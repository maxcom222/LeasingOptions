import React, { useState, useEffect } from "react";
import style from "./to-top.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { listenToScroll } from "../../../helpers/helpers";

const ToTop:React.FC = () => {
    
    const [scrolled, setScrolled] = useState(false);

    function myFunc() {
        if(listenToScroll(0.15)) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
       window.addEventListener('scroll', myFunc) 
        return () => {
            window.removeEventListener('scroll', myFunc)
        }
    }, []);

    const handleToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <button className={`${style['to-top']} button button-text justify-content-center align-items-center ${scrolled ? style['is-active'] : ''}`} onClick={handleToTop}><FontAwesomeIcon width="14" height="50" icon={faChevronUp} /></button>
    )
}

export default ToTop;