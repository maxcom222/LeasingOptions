import React from 'react';
import Sticker from '../../layout/sticker';

import { Vehicle } from 'types/vehicles/Vehicle';
import { getFriendlyUrlSegment } from 'helpers/urlsHelper';

type Props = {
    vehicle: Vehicle;
}

const VehicleShortInfo: React.FC<Props> = ({ vehicle }) => {
    return (
        <>
            <div className="w-100 d-flex align-items-center mb-3">
                <img data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/makes/${getFriendlyUrlSegment(vehicle.make)}.svg`} className="manfacturer-logo d-none d-md-inline mr-3 lazyload" alt={`${vehicle.make} logo`} />
                <div className="d-inline-flex flex-wrap">
                    <h1 className="w-100 h3 mb-1">{vehicle.make} {vehicle.model}</h1><br />
                    <h2 className="w-100 h4 mb-0">{vehicle.derivative}</h2>
                </div>
            </div>
            {(vehicle.stickers && vehicle.stickers.length > 0) ?
                (
                    <div className="w-100 d-flex flex-wrap align-items-center">
                        {vehicle.stickers.map(sticker =>
                            (
                                <Sticker key={sticker.id} sticker={sticker} />
                            )
                        )}
                    </div>
                ) : null}
        </>
    )
}

export default VehicleShortInfo;