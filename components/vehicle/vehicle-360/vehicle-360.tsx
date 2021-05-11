import React, { useState, useEffect } from 'react';

type Props = {
    alt: string;
    dir: string;
}

const Gallery360: React.FC<Props> = ({ alt, dir }) => {
    const pixelsPerDegree = 2;
    const [dragging, setDragging] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(1);
    const [dragStart, setDragStart] = useState<number>(0);
    const [dragStartIndex, setDragStartIndex] = useState<number>(1);
    const externalWrapper = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(externalWrapper.current) {
            externalWrapper.current.addEventListener("mousemove", handleMouseMove, false);
            externalWrapper.current.addEventListener("mouseup", handleMouseUp, false);
        }
    }, [dragging]);

    const handleMouseDown = e => {
        e.persist();
        setDragging(true);
        setDragStart(e.screenX);
        setDragStartIndex(imageIndex);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const updateImageIndex = currentPosition => {
        let numImages = 36;
        const pixelsPerImage = pixelsPerDegree * (360 / numImages);

        let dx = (currentPosition - dragStart) / pixelsPerImage;
        let index = Math.floor(dx) % numImages;

        if (index < 1) {
            index = numImages + index;
        }

        index = (index + dragStartIndex) % numImages;

        if (index === 0) {
            setImageIndex(1);
        } else if (index !== imageIndex) {
            setImageIndex(index);
        }
    };

    const handleMouseMove = e => {
        if (dragging) {
            updateImageIndex(e.screenX);
        }
    };

    const preventDragHandler = e => {
        e.preventDefault();
    };

    if (dir) {
        const renderImage = () => <img src={`${process.env.NEXT_PUBLIC_CDN}/${dir + imageIndex}.png`} className="img-fluid" alt={`${alt} angle ${imageIndex}`} />;

        return (
            <div className="external-360" ref={externalWrapper} onMouseDown={handleMouseDown} onDragStart={preventDragHandler}>
                {renderImage()}
            </div>
        );
    }

    return null;
}

export default Gallery360;