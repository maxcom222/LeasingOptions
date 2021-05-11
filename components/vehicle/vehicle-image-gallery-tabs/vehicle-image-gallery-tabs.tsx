import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Gallery360 from '../vehicle-360/';
import VehicleImagesSlider from '../vehicle-images-slider/';

import { VehicleTypes } from 'enums/VehicleTypes';

type Props = {
    vehicleType: VehicleTypes;
    imageUrls: string[];
    interiorUrl: string;
    exteriorUrl: string;
    imageDescription: string;
}

const VehicleImageGalleryTabs: React.FC<Props> = ({ vehicleType, imageUrls, interiorUrl, exteriorUrl, imageDescription }) => {
    const hasIzmoImages = imageUrls && imageUrls.length > 0 && imageUrls.some(item => item.includes("pix_png2048"));

    return (
        <Tabs id="gallery-tabs" defaultActiveKey="gallery">
            <Tab eventKey="gallery" title={`${vehicleType === VehicleTypes.Commercial ? "Van" : "Car"} Gallery`} className="text-center">
                <VehicleImagesSlider images={imageUrls} imageDescription={imageDescription} />
            </Tab>
            {(hasIzmoImages && exteriorUrl) ?
                (<Tab eventKey="exterior" title="360° External">
                    <Gallery360 alt={imageDescription} dir={exteriorUrl} />
                </Tab>) : null
            }
            {(hasIzmoImages && interiorUrl) ?
                (<Tab eventKey="interior" title="360° Internal">
                    <iframe allowFullScreen={true} id="internal360" frameBorder="0" scrolling="no" className="iframe-fluid" src={interiorUrl}></iframe>
                </Tab>) : null
            }
        </Tabs>
    )
}

export default VehicleImageGalleryTabs;