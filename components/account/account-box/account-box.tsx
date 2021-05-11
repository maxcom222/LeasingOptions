import React, { ReactNode, useState } from 'react';
import style from "./account-box.module.scss";

type Props = {
    children: ReactNode;
    icon: ReactNode;
    title: string;
    border: boolean;
}

const AccountBox: React.FC<Props> = ({ children, icon, title, border }) => {
    const [opened, setOpened] = useState(true);
    const handleToggle = (evt) => {
        setOpened(!opened);
    }

    return (
        <div className={`${style['account-box']} mb-3 mb-md-4 ${opened ? style['is-active'] : ""}`}>
            <div className={style['account-box__header']} onClick={evt => handleToggle(evt)}>{icon}{title}</div>
            <div className={`${style['account-box__content']} ${border ? '' : 'border-0'}`}>
                {children}
            </div>
        </div>
    )
}

export default AccountBox;