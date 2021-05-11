import React from 'react';
import style from './vehicle-social.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const VehicleSocial = () => {
    
    return (
        <ul className={style['vehicle-socials']}>
            <li><a href="https://www.facebook.com/LeasingOptionsLtd" target="_blank"><FontAwesomeIcon width="16" height="16" icon={faFacebookF} /></a></li>
            <li><a href="https://twitter.com/LeasingOptions" target="_blank"><FontAwesomeIcon width="16" height="16" icon={faTwitter} /></a></li>
            <li><a href="https://www.linkedin.com/company/leasing-options-ltd/" target="_blank"><FontAwesomeIcon width="16" height="16" icon={faLinkedin} /></a></li>
            <li><a href="https://www.instagram.com/leasing_options_ltd/" target="_blank"><FontAwesomeIcon width="16" height="16" icon={faInstagram} /></a></li>
        </ul>
    )
}

export default VehicleSocial;