import React, { useState, useEffect } from 'react';
import style from './vehicle-options-tab-content.module.scss';
import VehicleOptionsAccordion from '../vehicle-options-accordion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    type: string;
    data: any;
    isLoading: boolean;
    settings: {
        searchAllowed: boolean;
        optionsSelectAllowed: boolean;
        onOptionClick: any;
    }
}

const VehicleOptionsTabContent: React.FC<Props> = ({ type, data, isLoading, settings }) => {
    const [options, setOptions] = useState(data);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);

    useEffect(() => {
        setIsFiltered(false);

        if (options !== data) {
            setOptions(data);
        }
    }, [data]);

    const handleOptionsSearch = (evt) => {
        if (evt.target.value && evt.target.value.length >= 3) {
            let value = evt.target.value.toLowerCase();
            let filteredOptions = [];

            data.forEach(item => {
                let options = item.options.filter(option => {
                    return option.name.toLowerCase().search(value) !== -1;
                });

                if (options && options.length > 0) {
                    filteredOptions.push({
                        name: item.name,
                        options: options
                    });
                }
            });

            setIsFiltered(true);
            setOptions(filteredOptions);
        } else {
            setIsFiltered(false);

            if (options !== data) {
                setOptions(data);
            }
        }
    }

    return (
        <>
            <p className={`${style['cap-warning']} my-3 mx-md-3`}>All vehicle data is supplied by an industry leading third party provider,  for guidance purposes only, and is subject to change. Leasing Options Limited is not responsible for any vehicle-data discrepancies or errors.</p>
            {isLoading && (
                <div>Please wait while data is loading</div>
            )}
            {(!isLoading && options) && (
                <>
                    {settings.searchAllowed && (
                        <div className={style['option-search']}>
                            <FontAwesomeIcon width="20" height="20" icon={faSearch} />
                            <input type="text" className="form-control" name="search" placeholder="Search" onChange={handleOptionsSearch} />
                        </div>
                    )}
                    <VehicleOptionsAccordion
                        type={type}
                        data={options}
                        isDeactivated={isFiltered}
                        settings={{
                            optionsSelectAllowed: settings.optionsSelectAllowed,
                            onOptionClick: settings.onOptionClick
                        }}
                    />
                </>
            )}
        </>
    )
}

export default VehicleOptionsTabContent;