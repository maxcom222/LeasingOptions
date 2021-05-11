import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './expandable-text.module.scss';
import DropDown from 'components/layout/drop-down';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardListCheck, faChevronDoubleDown } from "@fortawesome/pro-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { VehiclesFilter } from 'types/VehiclesFilter';
import { GetDealTypeUrl } from 'helpers/urlHelper';
import { LeasingDealTypes } from 'enums/LeasingDealTypes';

type Props = {
    children: any,
    theme: string,
    isATC?: boolean;
    galleryButton?: boolean;
    reviewButton?: boolean;
    modelDropDown?: boolean;
    modelDropDownData?: any;
    vehicleFilter?: VehiclesFilter;
    leasingDealType?: LeasingDealTypes;
    handleModelChange?: any;
    handleScrollToTabs?: any;
}

const ExpandableText: React.FC<Props> = ({ children, theme, isATC = false, galleryButton = false, reviewButton = false, modelDropDown = false, modelDropDownData, vehicleFilter, leasingDealType, handleModelChange, handleScrollToTabs }) => {
    const innerText = React.useRef();
    const [textLimited, setTextLimited] = useState<boolean>(false);
    const [textToggle, setTextToggle] = useState<boolean>(false);
    const handleTextToggle = (evt) => {
        evt.preventDefault();
        setTextToggle(!textToggle);
    }

    useEffect(() => {
        let wrapperHeight = ReactDOM.findDOMNode(innerText.current).clientHeight;
        let windowWidth = window.innerWidth;
        let screenLimited = 0;

        if (windowWidth > 767) {
            screenLimited = 200;
        } else {
            screenLimited = 100;
        }

        if (wrapperHeight) {
            if (wrapperHeight > screenLimited) {
                setTextLimited(true);
            }
        }
    }, []);

    return (
        <div className={`${style['expandable-text']} ${theme === "dark" ? style['expandable-text--dark'] : ""} ${textLimited && !textToggle ? style['is-limited'] : ''} ${textToggle ? style['is-open'] : ''}`} >
            <div ref={innerText} className={style['expandable-text__inner']} dangerouslySetInnerHTML={{ __html: children }}></div>
            {textLimited &&
                <button role="button" className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-black"} btn-labeled btn-labeled--right ${textToggle ? "btn-labeled--rotate" : ""} ${!galleryButton || !reviewButton ? "btn-block-xs" : ""} btn-fluid btn-lg mr-sm-3 mt-3`} onClick={(evt) => handleTextToggle(evt)}>
                    <span className="btn-text">{textToggle ? "Show less" : "Read more"}</span>
                    <span className="btn-label"><FontAwesomeIcon width="17" height="17" icon={faChevronDoubleDown} /></span>
                </button>
            }
            {galleryButton &&
                <button role="button" onClick={() => handleScrollToTabs('gallery')} className={`btn ${isATC ? "btn-outline-light" : "btn-outline-primary"} btn-labeled btn-fluid btn-lg mr-3 d-none d-md-inline-block mt-3`}>
                    <span className="btn-label"><FontAwesomeIcon width="16" height="16" icon={faImage} /></span>
                    <span className="btn-text">View Gallery</span>
                </button>
            }
            {reviewButton &&
                <button role="button" onClick={() => handleScrollToTabs('review')} className={`btn ${isATC ? "btn-outline-light" : "btn-outline-primary"} btn-labeled btn-fluid btn-lg d-none d-md-inline-block mt-3`}>
                    <span className="btn-label"><FontAwesomeIcon width="16" height="16" icon={faClipboardListCheck} /></span>
                    <span className="btn-text">View Review</span>
                </button>
            }
            {modelDropDown && modelDropDownData &&
                <DropDown wrapperClass="w-100-xs float-md-right" buttonClass={`${isATC ? " btn-outline-light" : "btn-outline-primary"} btn-fluid btn-lg btn-block-xs mt-3`} buttonText="Quick model select">
                    {modelDropDownData?.map(model => (
                        <button key={model.shortModText} type="button" className="text-left" onClick={() => handleModelChange(GetDealTypeUrl(leasingDealType) + '/' + vehicleFilter?.manufacturerUrl + '/' + model.shortModTextUrl)}>{model.shortModText}</button>
                    ))}
                </DropDown>
            }
        </div >
    )
}

export default ExpandableText;