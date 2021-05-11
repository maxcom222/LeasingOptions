import React from 'react';
import Link from 'next/link';
import style from './page-upsell.module.scss';

export default function PageUpsell() {
    return (
        <div className={`container-fluid ${style['upsell']} py-5`}>
            <div className="row">
                <div className="col-24 upsell-title text-md-center">
                    <h3 className="mb-3 mb-md-5">Ready to find your next vehicle?</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-24 col-lg-8">
                    <div className={style['upsell-col']}>
                        <img src={`${process.env.NEXT_PUBLIC_CDN}/fit-in/400x400/image/vehicles/ext360/audi/a8/4/4sedan/angle33.png`} className="img-fluid" alt="Audi A8" />
                        <Link href="/car-leasing" passHref><a className="btn btn-primary btn-block btn-lg">Car leasing deals</a></Link>
                        <Link href="/car-leasing-faqs" passHref><a className="d-none"><u>I have more questions about cars</u></a></Link>
                    </div>
                </div>
                <div className="col-24 col-lg-8">
                    <div className={style['upsell-col']}>
                        <img src={`${process.env.NEXT_PUBLIC_CDN}/fit-in/400x400/image/vehicles/ext360/nissan/nv200/1/5cargovan%20visia/angle33.png`} className="img-fluid" alt="Nissan NV200" />
                        <Link href="/van-leasing" passHref><a className="btn btn-primary btn-block btn-lg">Van leasing deals</a></Link>
                        <Link href="/car-leasing-faqs" passHref><a className="d-none"><u>I have more questions about vans</u></a></Link>
                    </div>
                </div>
                <div className="col-24 col-lg-8">
                    <div className={style['upsell-col']}>
                        <img src={`${process.env.NEXT_PUBLIC_CDN}/fit-in/400x400/image/vehicles/ext360/volkswagen/amarok/1/4pickup%20aventura/angle33.png`} className="img-fluid" alt="Volkswagen Amarok" />
                        <Link href="/van-leasing/body-type/pickup" passHref><a className="btn btn-primary btn-block btn-lg">Pickup leasing deals</a></Link>
                        <Link href="/car-leasing-faqs" passHref><a className="d-none"><u>I have more questions about pickups</u></a></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}