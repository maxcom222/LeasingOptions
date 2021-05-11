import React from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

interface IButtonProps {
    id?:string, 
    className:string, 
    text:string, 
    icon?:IconProp
    onClick?: any, 
    link?: string, 
    disabled?: boolean,
    location?: string
}

const Button:React.FC<IButtonProps> = ({id, className, text, icon , onClick, link, disabled, location = 'before'}) => {
    return (
                
            <ConditionalWrapper condition={link} wrapper={children => <Link href={link!}>{children}</Link>}>
            <button id={id} className={className} onClick={onClick} disabled={disabled}>   
                {icon != null && location === 'before' ?  <FontAwesomeIcon width="17" height="17" icon={icon} className="mr-1 ml-0" /> : "" }
                {text}
                {icon != null && location === 'after' ?  <FontAwesomeIcon width="17" height="17" icon={icon} className="mr-0 ml-1" /> : "" }
                </button>
            </ConditionalWrapper>
      
    );
}

export { Button }