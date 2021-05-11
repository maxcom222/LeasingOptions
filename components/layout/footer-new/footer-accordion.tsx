import React, { ReactNode, useState } from 'react';
import style from './footer.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/pro-light-svg-icons";

type Props = {
    title: string;
    children: ReactNode;
}
const FooterAccordion: React.FC<Props> = ({title, children}) => {
    const [isopen, setIsOpen] = useState<boolean>(false);
    const handleToggle = () => setIsOpen(!isopen);
    return (
        <div className={`${style['footer-accordion']} ${isopen ? style['is-active'] : ''}`} onClick={() => handleToggle()}>
           <div className={style['footer-accordion__toggle']}><h2 className="w-100 d-flex justify-content-between align-items-center mb-0 mb-md-4"><span>{title}</span> <FontAwesomeIcon width="17" height="17" icon={isopen ? faMinus : faPlus} /></h2></div>
           <div className={style['footer-accordion__content']}>{children}</div> 
        </div>
    );
}

export default FooterAccordion;