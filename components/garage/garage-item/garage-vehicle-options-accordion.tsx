import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/pro-light-svg-icons";
import { formatMoney } from 'helpers/currencyHelper';
import style from './garage-item.module.scss';

type Props = {
    data: any;
    settings?: {
        optionsSelectAllowed: boolean;
        onOptionClick: any;
    }
}

//TODO: Do not use index as key. Include item ids to service response. Unify options api responses
const GarageVehicleOptionsAccordion: React.FC<Props> = ({ data, settings }) => {
    const [activeIdx, setActiveIdx] = useState<number>(null);

    const isActive = (idx: number) => {
        return (activeIdx === idx);
    }

    const handleToggleClick = (itemIdx: number) => {
        let idxToApply: number = null;

        if (itemIdx !== activeIdx) {
            idxToApply = itemIdx;
        }

        setActiveIdx(idxToApply);
    }

    const handleOptionClick = (option) => {
        if (settings.onOptionClick && settings.optionsSelectAllowed) {
            settings.onOptionClick(option);
        }
    }

    if (data && data.length) {
        return (
            data.map((category, categoryIdx) => (
                <div key={`category-${categoryIdx}`} className={`${style['garage-option']} ${isActive(categoryIdx) ? style['is-active'] : ''}`}>
                    <div className={`${style['garage-option__title']} ${category.isSelected ? style['is-selected'] : ''}`} onClick={() => handleToggleClick(categoryIdx)}>
                        <span>{category.name}</span>
                        {isActive(categoryIdx) ? <FontAwesomeIcon width="16" height="16" icon={faMinus} /> : <FontAwesomeIcon width="16" height="16" icon={faPlus} />}
                    </div>
                    <div className={style['garage-option__content']}>
                        {category.options.map((option, optionIdx) => (
                            <div className={`w-100 ${"value" in option ? 'd-flex justify-content-between align-items-start mb-3' : 'd-block'}`} key={`option-${optionIdx}`}>
                                <span className={"price" in option ? 'w-100 d-flex mb-3' : ''}>{option.name}</span>
                                {"value" in option ?
                                    (
                                        <span className="text-right">{option.value}</span>
                                    ) : null
                                }
                                {"price" in option ?
                                    (
                                        <div className={style['garage-option__toggle']}>
                                            <span className={`vehicle-option__indicator vehicle-option__indicator--sml ${option.isSelected ? "is-active" : ""}`} onClick={() => handleOptionClick(option)}></span>
                                            <label>{option.isSelected ? "Remove" : "Add"}</label>
                                            {formatMoney(option.price)}
                                        </div>
                                    ) : null
                                }
                            </div>
                        ))}
                    </div>
                </div>
            ))
        );
    }

    return null;
}

export default GarageVehicleOptionsAccordion;