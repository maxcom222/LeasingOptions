import React, { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
    image?: string;
    title: string;
    date: string;
    text: string;
    more?: ReactNode;
}

const AmpLayout: React.FC<Props> = ({ image, title, date, text, more }) => {

    return (
        <div className="amp-content">
            <header className="amp-header">
                <amp-img src={`${process.env.NEXT_PUBLIC_CDN}/website/static/leasing-options-logo.svg`} width="300" height="88" class="amp-logo" layout="responsive"></amp-img>
                <ul className="amp-nav">
                    <li><Link passHref href="/business-car-leasing"><a>Business Car Leasing</a></Link></li>
                    <li>|</li>
                    <li><Link passHref href="/car-leasing"><a>Personal Car Leasing</a></Link></li>
                    <li>|</li>
                    <li><Link passHref href="/van-leasing"><a>Van Leasing</a></Link></li>
                </ul>
            </header>
            <article className="amp-article">
                {image && <amp-img src={`${image}`} width="720" height="480" layout="responsive"></amp-img>}
                <h1>{title}</h1>
                <h2>{date}</h2>
                <div className="amp-text" dangerouslySetInnerHTML={{ __html: text }}></div>
            </article>
            {more &&
                <footer className="amp-footer">{more}</footer>
            }
        </div>
    )
}

export default AmpLayout;