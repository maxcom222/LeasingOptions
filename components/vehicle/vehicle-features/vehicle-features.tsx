import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetFeatureIcon } from '../../../helpers/helpers';

import { VehicleFeatureTypes } from 'enums/VehicleFeatureTypes';
import { GetFeatureText } from 'helpers/enumsHelper';

type Props = {
    features: VehicleFeatureTypes[];
}

const VehicleFeatures: React.FC<Props> = ({ features }) => {
    if (features && features.length > 0) {
        return (
            <>
                <h2 className="h1 mb-5">Features</h2>
                <table className="table table-bordered border-0">
                    <tbody>
                        <tr className="d-flex flex-wrap">
                            {features.map((feature, index) => (
                                <td key={index} className={`col-24 col-md-12 d-flex d-md-inline-flex justify-content-between align-items-center pt-2 pb-2 ${index > 1 ? 'border-top-0' : null}`}>{GetFeatureText(feature)}<FontAwesomeIcon width="32" height="32" icon={GetFeatureIcon(feature)} className="fa-2x" /></td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }

    return null;
}

export default VehicleFeatures;