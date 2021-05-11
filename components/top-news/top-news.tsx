import React, { ReactNode } from 'react';
import Slider from "react-slick";
import CardLounge from "components/card/card-lounge";
import { TopNewsItem } from "types/TopNewsItem";
import { NewsTypes } from "enums/NewsTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    newsItems: Array<TopNewsItem>,
    mobileArrows?: boolean,
    tabletArrows?: boolean,
    desktopArrows?: boolean,
    infinite?: boolean
}

const TopNews: React.FC<Props> = ({ newsItems, mobileArrows = true, tabletArrows = false, desktopArrows = false, infinite = true }) => {
    const ArrowLeft = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-prev" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronLeft} /></span>);
    }
    const ArrowRight = (props) => {
        const { onClick } = props;
        return (<span className="slick-arrow slick-next" onClick={onClick}><FontAwesomeIcon width="25" height="25" icon={faChevronRight} /></span>);
    }
    const settings = {
        autoplay: false,
        autoplaySpeed: 5000,
        lazyLoad: 'ondemand',
        arrows: desktopArrows,
        prevArrow: <ArrowLeft />,
        nextArrow: <ArrowRight />,
        dots: false,
        infinite: infinite,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    arrows: tabletArrows,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 481,
                settings: {
                    arrows: mobileArrows,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ]
    };


    return (
        <div className="container-fluid py-5 bg-white">
            <div className="row">
                <div className="container px-md-5">
                    <div className="row">
                        <div className="col-24 text-center">
                            <h2 className="mb-5 text-center">Visit the Leasing Lounge</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-24">
                            <Slider {...settings}>
                                {newsItems?.map((newsItem, index) => {

                                    if (newsItem.type == NewsTypes.None) {
                                        return;
                                    }

                                    let type = NewsTypes[newsItem.type].toString();
                                    let imageUrl = process.env.NEXT_PUBLIC_CDN + '/fit-in/350x250/filters:fill(FFFFFF)/' + newsItem.imageUrl;
                                    let header = null;
                                    let colour = null;

                                    if (newsItem.type == NewsTypes.Blog) {
                                        header = "Blog"
                                        colour = "#054048"
                                    } else if (newsItem.type == NewsTypes.VehicleReviews) {
                                        header = "Vehicle Reviews"
                                        colour = "#009892"
                                    } else if (newsItem.type == NewsTypes.LatestNews) {
                                        header = "Latest News"
                                        colour = "#aa0707"
                                    }

                                    return (
                                        <CardLounge key={newsItem.id} id={type} header={header} color={colour} image={imageUrl} link={newsItem.url} title={newsItem.title} excerpt={newsItem.description} />
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNews