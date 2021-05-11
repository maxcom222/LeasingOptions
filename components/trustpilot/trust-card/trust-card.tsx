import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import style from './trust-card.module.scss';
import { TrustWidgetTypes } from 'enums/TrustWidgetTypes';

type Props = {
    type: TrustWidgetTypes;
    rating: number;
    date?: string;
    header: string;
    text: string;
    name: string;
    url: string;
}

const TrustCard:React.FC<Props> = ({type, rating, date, header, text, name, url}) => {
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

        if(windowWidth > 767) {
            screenLimited = 85;
        } else {
            screenLimited = 0;
        }
        
        if (wrapperHeight){
            if(wrapperHeight > screenLimited) {
                setTextLimited(true);
            }
        }
    }, []);

    return (
        <div className={`${style['trust-card']} ${type === TrustWidgetTypes.Box ? style['trust-card--box'] : ''}`}>
            <div className={style['trust-card__stars']}> 
                <svg viewBox="0 0 251 46" xmlns="http://www.w3.org/2000/svg">
                    <g className={style['tp-star']}>
                        <path className={style['tp-star__canvas']} fill="#dcdce6" d="M0 46.330002h46.375586V0H0z"></path>
                        <path className={style['tp-star__shape']} d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"></path>
                    </g>
                    <g className={style['tp-star']}>
                        <path className={style['tp-star__canvas']} fill="#dcdce6" d="M51.24816 46.330002h46.375587V0H51.248161z"></path>
                        <path className={style['tp-star__shape']} d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"></path>
                    </g>
                    <g className={style['tp-star']}>
                        <path className={style['tp-star__canvas']} fill="#dcdce6" d="M102.532209 46.330002h46.375586V0h-46.375586z"></path>
                        <path className={style['tp-star__shape']} d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"></path>
                    </g>
                    <g className={style['tp-star']}>
                        <path className={style['tp-star__canvas']} fill="#dcdce6" d="M153.815458 46.330002h46.375586V0h-46.375586z"></path>
                        <path className={style['tp-star__shape']} d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                    </g>
                    {rating === 4.5 && 
                        <g className={`${style['tp-star']} ${style['tp-star--half']}`}>
                            <path className={style['tp-star__canvas']} fill="#dcdce6" d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                            <path className={`${style['tp-star__canvas']} ${style['tp-star__canvas--half']}`} fill="#dcdce6" d="M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                            <path className={style['tp-star__shape']} d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                        </g>
                    }
                    {rating === 5 && 
                        <g className={style['tp-star']}>
                            <path className={style['tp-star__canvas']} fill="#dcdce6" d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                            <path className={style['tp-star__canvas']} fill="#dcdce6" d="M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                            <path className={style['tp-star__shape']} d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                        </g>
                    }
                </svg>
            </div>
            {date ? <div className={style['trust-card__date']}>{date}</div> : ''}
            {type === TrustWidgetTypes.Box &&
                <a href={url} target="_blank" rel="nofollow"><div className={`${style['trust-card__name']} ${style['trust-card__name--box']} mb-3`}>{name}</div></a>
            }
            <a href={url} target="_blank" rel="nofollow"><div className={style['trust-card__header']}>{header}</div></a>
            <a href={url} target="_blank" rel="nofollow"><div ref={innerText} className={`${style['trust-card__text']} ${textLimited && ! textToggle ? style['is-limited'] : ''}`}>{text}</div></a>
            {type === TrustWidgetTypes.Slider &&
                <a href={url} target="_blank" rel="nofollow"><div className={style['trust-card__name']}>{name}</div></a>
            }
            <button className={`${style['trust-card__more']} ${textLimited && ! textToggle ? style['is-limited'] : ''}`} onClick={(evt) => handleTextToggle(evt)}>Read More</button>
        </div>
    )
}

export default TrustCard;