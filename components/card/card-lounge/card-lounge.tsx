import React from 'react';
import Link from 'next/link';
import style from './card-lounge.module.scss';

type Props = {
    id: string;
    header: string;
    color: string;
    image: string;
    link: string;
    title: string;
    excerpt: string;
}

const CardLounge:React.FC<Props> = ({id, header, color, image, link, title, excerpt}) => {
    const loungeImage = (image) ? image : "/fit-in/400x400/website/static/img-placeholder.jpg";

    return (
       
        <div className={style['card-lounge']}>          
            <style dangerouslySetInnerHTML={{__html: `#${id} { background-color: ${color};}`}}></style>
            <div id={id} className={style['card-lounge__header']}>{header}</div>
            <div className={style['card-lounge__img']}>
                <Link passHref href={'/news/[category]/[url]/[id]'} as={link}><a><img data-src={loungeImage} className="img-fluid lazyload" alt={header} /></a></Link>
            </div>
            <div className={style['card-lounge__content']}>
                <Link passHref href={'/news/[category]/[url]/[id]'} as={link}>
                    <a>
                        <h4 className="mt-4 h6">{title}</h4>
                        <p>{excerpt}</p>
                    </a>
                </Link>
                <Link passHref href={'/news/[category]/[url]/[id]'} as={link}><a className="btn btn-outline-primary btn-block btn-lg">Read More</a></Link>
            </div>
        </div>
    )
}

export default CardLounge;