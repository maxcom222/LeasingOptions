import React, { useState, useEffect } from 'react';
import style from './birthday-countdown.module.scss';
import { ContentService } from 'business-logic/contentService';
import FlipNumbers from 'react-flip-numbers';

type Props = {
    className?: string;
}

const BirthdayCountdown: React.FC<Props> = ({ className }) => {
    const [countTotal, setCountTotal] = useState<string>('0000000000');

    useEffect(() => {
        updateTotal();

        const interval = setInterval(async () => {
            await updateTotal();
        }, 60000);
        return () => clearInterval(interval);
      }, []);

      async function updateTotal() {
            ContentService.GetTotalLeasedValues().then(function (data) {
                let updatedTotal = Math.floor(data.data.total).toString();

                if(countTotal !== updatedTotal) {
                    setCountTotal(updatedTotal);
                }
            });
      }

    return (
        <div className={`${style['birthday-countdown']} order-md-3 ${className}`}>
            <p>So far we have leased</p>
            <FlipNumbers height={60} width={45} color="#3e3e40" background="#fdfdfd" play duration={3} perspective={0} numbers={countTotal} />
            <p>worth of vehicles</p>
        </div>
    );
}

export default BirthdayCountdown;