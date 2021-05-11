import React, { useState } from 'react';
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    imageDescription: string;
    images: any;
}

const VehicleImagesSlider: React.FC<Props> = ({ images, imageDescription }) => {
    const [activeSlide, setActiveSlide] = useState<number>(1);

    const hasImages = images && images.length > 0;

    if (hasImages) {
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
            lazyLoad: 'ondemand',
            arrows: true,
            prevArrow: <ArrowLeft />,
            nextArrow: <ArrowRight />,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, next) => setActiveSlide(next + 1),
        };

        return (
            <>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <img key={`thumbnail-${index}`} src={image} className="img-fluid" alt={`${imageDescription} - ${index + 1}`} />
                    ))}
                </Slider>
                <label className="slick-label">{activeSlide} of {images.length}</label>
            </>
        )
    }

    return (
        <img className="img-responsive" src="https://imagecdn.leasingoptions.co.uk/fit-in/750x500/website/static/img-placeholder.jpg" alt="Leasing Options Logo" />
    )
}

export default VehicleImagesSlider;