import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from 'components/layout/main-layout';
import FullscreenOverlay from 'components/layout/fullscreen-overlay';
import MetaHead from '../components/seo/meta';
import { GetCanonicalUrl } from 'helpers/urlHelper';


export default function MovieCars () {   
    const [quizState, setQuizState] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const handleAnswerClick = () => setQuizState(!quizState);
    const handleFullscreenClick = () => setIsActive(true);
    const handleFullscreenClose = () => setIsActive(false);

    return (
        <>
            <MetaHead>
                <title>Iconic Movie Cars Quiz | Leasing Options UK</title>
                <meta name="description" content="The perfect game if you love cars and movies. Find the iconic movie cars hidden in this fantastic city-scape." />
                <meta name="keywords" content="Personal Car Leasing, Personal Car Lease Deals, Personal Car Leasing Manchester, Contract hire" />
                <link rel="canonical" href={GetCanonicalUrl(`/movie-cars`)} />
            </MetaHead>
            <section className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div id="moviecars" className="col-24 pt-3">
                            <h1 className="text-center mb-3 mb-md-5">Can you find the iconic movie cars hidden in this poster?</h1>
                            <p className="h4 mb-3 mb-md-5 text-center"><strong>If you love cars, and movies, this is the perfect quiz for you.</strong></p>
                            <p className="text-center">We’ve hidden 24 famous cars from movies in the awesome cityscape below. You’ll need to really know your movies, and your cars, to find all of them. You can find a link to the answers below.</p>
                            <FullscreenOverlay isActive={isActive} handleFullscreenClose={() => handleFullscreenClose()}>    
                                {quizState &&
                                    <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/movie-cars/answers.jpg`} alt="answers" className="img-fluid lazyload" />
                                }
                                {!quizState &&
                                    <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/movie-cars/questions.jpg`} alt="quiz" className="img-fluid lazyload" />
                                }
                            </FullscreenOverlay>
                        </div>
                        <div className="col-24 text-center">
                            <a onClick={() => handleFullscreenClick()}><img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/movie-cars/full_screen-01.svg`} width="200" height="50" className="lazyload" /></a>
                        </div>
                        <div className="col-24 py-3 py-md-4 text-center">
                            <a className="btn btn-lg btn-success text-white mb-3" onClick={() => handleAnswerClick()}>{quizState ? 'Show Questions' : 'Show Answers'}</a>
                            <p className="text-center">If you enjoyed this quiz, you may also be interested in finding out when we will be driving some of the coolest, most futuristic, cars from <Link href={'/news/[category]/[url]/[id]'} as="/news/blog/when-will-we-be-able-to-drive-a-car-like-kitt/5862"><a>science fiction movies</a></Link>.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

MovieCars.layout = MainLayout;