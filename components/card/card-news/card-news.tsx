import React from 'react';
import Link from 'next/link';
import style from './card-news.module.scss';
import { GetNewsTagClass } from 'helpers/helpers';
import { GetNewsTypeText } from 'helpers/enumsHelper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

import { shortCut } from 'helpers/stringHelper';

type Props = {
    condensed?: boolean;
    id: string;
    image: string;
    tag?: number;
    link: string;
    title: string;
    date: string,
    excerpt: string;
    moreLink?: string,
    moreText?: string;
    className?: string;
}

//TODO: enqure that excerpt contains plain text only
const CardNews: React.FC<Props> = ({ condensed = false, id, image, tag, link, title, date, excerpt, moreLink, moreText, className }) => {
    const cardImage = (image) ? image : "/fit-in/400x400/website/static/img-placeholder.jpg";
    const momentDate = moment(date, "YYYY-MM-DDTHH:mm");
    const formattedDate = momentDate.format("DD MMMM YYYY");

    return (
        <div id={id} className={`${style['card-news']} ${style[className]} ${condensed ? style['card-news--condensed'] : ''} ${moreLink ? style['card-news--featured'] : ''}`}>
            <style dangerouslySetInnerHTML={{ __html: `#${id} .${style['card-news__img']} { background-image: url(${process.env.NEXT_PUBLIC_CDN + cardImage});}` }}></style>
            <div className={style['card-news__img']}><Link href={'/news/[category]/[url]/[id]'} as={link} passHref><a></a></Link></div>
            <div className={style['card-news__info']}>
                <Link href={'/news/[category]/[url]/[id]'} as={link} passHref>
                    <a>
                        <div className={`${style['card-news__tag']} ${tag ? style[GetNewsTagClass(tag)] : ''}`}>{GetNewsTypeText(tag)}</div>
                        <h2>{title}</h2>
                        {condensed ? "" : <span>{formattedDate}</span>}
                        <p dangerouslySetInnerHTML={{ __html: condensed ? shortCut(excerpt.replace('<br>', ''), 70) : excerpt }}></p>
                    </a>
                </Link>
            </div>
            {moreLink &&
                <Link href={moreLink} passHref><a className={`${style['card-news__more']}`}>{moreText} <FontAwesomeIcon width="16" height="16" icon={faAngleDoubleRight} /></a></Link>
            }
        </div>
    )
}

export default CardNews;