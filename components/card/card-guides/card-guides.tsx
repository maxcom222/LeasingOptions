import React from 'react';
import Link from 'next/link';
import style from './card-guides.module.scss';
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
    category: string;
    className?: string;
}

//TODO: enqure that excerpt contains plain text only
const CardGuides: React.FC<Props> = ({ condensed = false, id, image, tag, link, title, date, excerpt, category, className }) => {
    const cardImage = (image) ? image : process.env.NEXT_PUBLIC_CDN + "/fit-in/400x400/website/static/img-placeholder.jpg";
    const momentDate = moment(date, "YYYY-MM-DDTHH:mm");
    const formattedDate = momentDate.format("DD MMMM YYYY");

    return (
        <div id={id} className={`${style['card-guides']} ${style[className]} ${condensed ? style['card-guides--condensed'] : ''}`}>
            <style dangerouslySetInnerHTML={{ __html: `#${id} .${style['card-guides__img']} { background-image: url(${cardImage});}` }}></style>
            <div className={style['card-guides__img']}><Link href={`/advice/[category]/[url]`} as={`/advice/${category}/${link}`} passHref><a></a></Link></div>
            <div className={style['card-guides__info']}>
                <Link href={`/advice/[category]/[url]`} as={`/advice/${category}/${link}`} passHref>
                    <a>
                        <div className={`${style['card-guides__tag']}`}>{tag}</div>
                        <h2>{title}</h2>
                        {condensed ? "" : <span>{formattedDate}</span>}
                        <p dangerouslySetInnerHTML={{ __html: shortCut(excerpt.replace('<br>', ''), 70) }}></p>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default CardGuides;