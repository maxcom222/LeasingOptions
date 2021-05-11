import React, { useState, useEffect } from 'react';
import Slider from 'react-rangeslider'

type Props = {
    value: number;
    onValueChanged: any;
    isDisabled?: boolean;
}

const VehicleRentalMonthsSlider: React.FC<Props> = ({ value, onValueChanged, isDisabled }) => {
    const values = [1, 3, 6, 9, 12];

    const [sliderValue, setSliderValue] = useState(values.indexOf(value) !== -1 ? values.indexOf(value) : 0);

    useEffect(() => {
        setSliderValue(values.indexOf(value) !== -1 ? values.indexOf(value) : 0);
    }, [value]);

    const handleOnChange = (value) => {
        if (!isDisabled) {
            setSliderValue(value);
        }
    }

    const handleOnChangeComplete = () => {
        onValueChanged(values[sliderValue]);
    }

    return (
        <Slider min={0} max={values.length - 1} step={1} value={sliderValue} tooltip={false} className={`${isDisabled ? "rangeslider--locked" : ""}`} onChange={handleOnChange} onChangeComplete={handleOnChangeComplete} />
    );
}

export default VehicleRentalMonthsSlider;