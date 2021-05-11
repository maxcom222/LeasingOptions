import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import style from './search.module.scss';
import { VehicleTypes } from 'enums/VehicleTypes';
import{ GetDealTypeUrl } from '../../helpers/urlHelper';
import { LeasingDealTypes } from '../../enums/LeasingDealTypes';
import { GetModels } from 'business-logic/vehicleService';

type Props = {
    active: boolean;
    makes: any;
    handleMakeUpdate: any;
    currentMake: string;
    dealToggle: number;
}

const SearchModels:React.FC<Props> = ({active, makes, handleMakeUpdate, currentMake, dealToggle}) => {
    const [modelList, setModelList] = useState([]);

    useEffect(() => {
        setModelList(makes);

        if(currentMake) {
            GetModels(dealToggle === LeasingDealTypes.Van ? VehicleTypes.Commercial : VehicleTypes.Car, currentMake).then((data) => {
                setModelList(data.data);
            });
        }
    }, [makes, currentMake]);

    return (
        <div className={`${style['modal-panel']} ${active ? style['is-active'] : ''} flex-wrap align-items-center justify-content-start`}>
            <ul>
                {modelList.map((model, index) => {
                    if(currentMake) {
                        return (<li key={index}><Link passHref href={GetDealTypeUrl(dealToggle, '/' + currentMake + '/' + model.id)}><a className="text-decoration-none">{model.text}</a></Link></li>);
                    } else {
                        return (<li key={index} onClick={(evt) => handleMakeUpdate(model.id)}>{model.text} Models</li>);
                    }                  
                })}
            </ul>
        </div>
    )
}

export default SearchModels;