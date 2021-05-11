import React from 'react';

const CarLeasingGraphic = () => {
  
    return (
        <>
            <section className="container-fluid py-5 bg-white">
                <div className="row">
                    <div className="container px-md-5">
                        <div className="row">
                            <div className="col-24">
                                <h2 className="text-center mb-0 mb-sm-5">Leasing your next car is easy</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-24 col-sm-8 px-5 px-sm-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/home/search.svg`} className="mx-auto d-block lazyload" alt="Search for a new car" />
                                <h3>Find your next car</h3>
                                <p>Explore the wide range of offers we have and get in touch to be designated a friendly account manager.</p>
                            </div>
                            <div className="col-24 col-sm-8 px-5 px-sm-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/home/chat.svg`} className="mx-auto d-block lazyload" alt="Speak to Leasing Options friendly advisers" />
                                <h3>Place an order</h3>
                                <p>Allow us to walk you through the easy and clear application and ordering process to get you the very best deal.</p>
                            </div>
                            <div className="col-24 col-sm-8 px-5 px-sm-3 text-center">
                                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/home/drive.svg`} className="mx-auto d-block lazyload" alt="Enjoy driving your new car" />
                                <h3>Enjoy driving</h3>
                                <p>Stay in the loop until the day your car is delivered to your door for free and enjoy driving knowing support is only a phone call away.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CarLeasingGraphic;