import React from 'react';
import style from './career-box.module.scss';

type Props = {
    id: number;
    icon: string;
    category: string;
    adverts: any;
    handleContentToggle: any;
}

const CareerBox:React.FC<Props> = ({id, icon, category, adverts, handleContentToggle}) => {
    return (
        <div className={style['career-box']}>
            <div className={style['count']}><div>{adverts.length}</div></div>
            <div className={style['header']}>
                <img className="lazyload" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/${icon}`} />
            </div>
            <div className={style['category']} onClick={() => handleContentToggle(id)}>{category}</div>
            {adverts.map((advert, index) => (
                <div key={`advert-${index}`}className={`${style['advert']} d-none`}>
                    <div className={style['advert-title']}><strong>{advert.title}</strong></div>
                    <hr />
                    <div className={style['advert-description']} dangerouslySetInnerHTML={{__html: advert.description}}></div>
                </div>
            ))}
        </div>
    )
}

export default CareerBox;