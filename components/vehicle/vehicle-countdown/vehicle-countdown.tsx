import React from 'react';
import style from './vehicle-countdown.module.scss';
import Countdown, { zeroPad } from 'react-countdown';
import moment from 'moment';

type Props = {
    bfTheme? : string;
    deadline: Date;
    onComplete: any;
}

const VehicleCountdown: React.FC<Props> = ({ bfTheme, deadline, onComplete }) => {
    const momentDate = moment(deadline, "DD/MM/YYYY HH:mm:ss");
    const formattedDate = momentDate.format("YYYY-MM-DDTHH:mm:ss");

    const renderer = ({ days, hours, minutes, seconds }) => (
        <div className={`${style['countdown']} ${bfTheme === 'true' ? style['countdown-bf'] : ''} col-24 col-md-12 d-md-flex justify-content-end align-items-center`}>
            <div><span className="days">{zeroPad(days)}</span><div className="smalltext">Days</div></div>
            <div><span className="hours">{zeroPad(hours)}</span><div className="smalltext">Hours</div></div>
            <div><span className="minutes">{zeroPad(minutes)}</span><div className="smalltext">Minutes</div></div>
            <div><span className="seconds">{zeroPad(seconds)}</span><div className="smalltext">Seconds</div></div>
        </div>
    );

    return (
        <Countdown date={formattedDate} intervalDelay={0} precision={3} renderer={(props) => renderer(props)} onComplete={onComplete} />
    )
}

export default VehicleCountdown;