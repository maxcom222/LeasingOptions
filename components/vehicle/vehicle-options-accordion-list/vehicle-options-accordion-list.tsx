import React from 'react';

import { formatMoney } from 'helpers/currencyHelper';

type Props = {
    type: string;
    data: any;
    settings: {
        optionsSelectAllowed: boolean;
        onOptionClick: any;
    }
}

const VehicleOptionsAccordionList: React.FC<Props> = ({ type, data, settings }) => {
    const handleOptionClick = (option) => {
        if (settings.onOptionClick && settings.optionsSelectAllowed) {
            settings.onOptionClick(option);
        }
    }

    if (type == "technical") {
        return (
            <>
                {data.map((option, idx) => (
                    <div key={`option-${idx}`} className="row">
                        <div className="col-24 col-md-20 d-flex flex-row flex-wrap">{option.name}</div>
                        <div className="col-24 col-md-4 d-flex flex-row flex-wrap py-1">{option.value}</div>
                    </div>
                ))
                }
            </>
        )
    }
    else if (type == "equipment") {
        return (
            <>
                {data.map((option, idx) => (
                    <div key={`option-${idx}`} className="row">
                        <div className="col-24">
                            <p className="py-1">{option.name}</p>
                        </div>
                    </div>
                ))}
            </>
        )
    }
    else if (type == "extras") {
        return (
            <>
                {data.map((option, idx) => (
                    <div key={`option-${idx}`} className="row">
                        <div className="col-16 col-md-20 d-flex flex-row flex-wrap my-2">{option.name}</div>
                        <div className="col-8 col-md-4 d-flex justify-content-end align-items-center">{formatMoney(option.price)}
                            {settings.optionsSelectAllowed && (
                                <span className={`vehicle-option__indicator ${option.isSelected ? "is-active" : ""}`} onClick={() => handleOptionClick(option)}></span>
                            )}
                        </div>
                    </div>
                ))}
            </>
        )
    }

    return null;
}

export default VehicleOptionsAccordionList;