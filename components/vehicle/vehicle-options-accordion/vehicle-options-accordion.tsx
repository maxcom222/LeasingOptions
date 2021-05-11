import React, { useState, useEffect } from 'react';
import VehicleOptionsAccordionList from '../vehicle-options-accordion-list';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/pro-regular-svg-icons";

type Props = {
    type: string;
    data: any;
    isDeactivated: boolean;
    settings: {
        optionsSelectAllowed: boolean;
        onOptionClick: any;
    }
}

//TODO: Do not use index as key. Include item ids to service response. Unify options api responses
const VehicleOptionsAccordion: React.FC<Props> = ({ type, data, isDeactivated, settings }) => {
    const [activeIdx, setActiveIdx] = useState<number>(null);

    useEffect(() => {
        setActiveIdx(null);
    }, [isDeactivated]);

    const handleAccordionToggleClick = (itemIdx: number) => {
        if (!isDeactivated) {
            if (itemIdx !== activeIdx) {
                setActiveIdx(itemIdx);
            }
            else {
                setActiveIdx(null);
            }
        }
    }

    const isActive = (itemIdx: number) => {
        return (isDeactivated || activeIdx === itemIdx);
    }

    if (data && data.length) {
        return (
            <div className="accordion">
                {data.map((category, idx) => (
                    <div key={`category-${idx}`} className={`accordion__item ${isActive(idx) ? 'is-active' : ''}`}>
                        <div className={`accordion__toggle d-flex flex-nowrap justify-content-between align-items-center ${category.isSelected ? 'is-selected' : ''}`} onClick={() => handleAccordionToggleClick(idx)}>
                            {category.name} <FontAwesomeIcon width="20" height="20" icon={isActive(idx) ? faMinus : faPlus} />
                        </div>
                        <div className="accordion__options">
                            <VehicleOptionsAccordionList
                                type={type}
                                data={category.options}
                                settings={{
                                    optionsSelectAllowed: settings.optionsSelectAllowed,
                                    onOptionClick: settings.onOptionClick
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return null;
}

export default VehicleOptionsAccordion;