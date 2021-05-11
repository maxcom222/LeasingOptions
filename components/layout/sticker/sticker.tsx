import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import style from './sticker.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import { StickerItem } from "types/StickerItem";

type Props = {
    sticker: StickerItem;
    title?: string;
}

const Sticker: React.FC<Props> = ({ sticker, title }) => {
    const blackFridayTheme = process.env.NEXT_PUBLIC_BLACK_FRIDAY_THEME;

    return (
        <div className={style['sticker']}>
            <OverlayTrigger trigger="click" key={sticker?.id} placement="top" overlay={
                <Popover id={`popover-positioned-${sticker?.id}`}>
                    {title ? <Popover.Title>{title}</Popover.Title> : ""}
                    <Popover.Content>{sticker?.description}</Popover.Content>
                </Popover>
            }>
                <button type="button" id={sticker?.id?.toString()} className={`${style['sticker__btn']} ${blackFridayTheme === 'true' ? style['sticker__btn--bf'] : ''}`}>{sticker?.name} <FontAwesomeIcon width="33" height="33" icon={faInfoCircle} /></button>
            </OverlayTrigger>
        </div>
    );
}

export default Sticker;