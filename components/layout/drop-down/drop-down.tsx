import React, { ReactNode, useState } from 'react';
import style from './drop-down.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
    indicator?: boolean;
    active?: string;
    wrapperClass?: string;
    buttonClass?: string;
    buttonText: string;
    children?: ReactNode,
    onClick?: any,
}

//TODO: better implementation required. onChange event needed
const DropDown: React.FC<Props> = ({ wrapperClass, indicator = false, active = "All", buttonClass, buttonText, children }) => {
    const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
    const [dropDownIndicator, setDropDownIndicator] = useState<string>(active);
    const handleDropDownToggle = () => {
        setDropDownToggle(!dropDownToggle);
    }
    const handleDropDownClick = (evt) => {
        setDropDownToggle(false);
        setDropDownIndicator(evt.target.innerText);
    }

    return (
        <div className={`${style['drop-down']} ${wrapperClass} ${dropDownToggle ? style['active'] : ""}`}>
            <button type="button" className={`btn ${style['btn']} ${buttonClass}`} onClick={(evt) => handleDropDownToggle()}>
                {buttonText ? buttonText : "Read More"} {indicator ? <mark className="mark-text" onClick={(evt) => handleDropDownClick(evt)}>{dropDownIndicator}</mark> : null} <FontAwesomeIcon width="14" height="14" icon={faChevronDown} />
            </button>
            <div className={style['drop-down__menu']} onClick={(evt) => handleDropDownClick(evt)}>
                {children}
            </div>
        </div>
    );
}

export default DropDown;