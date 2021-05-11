import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import EmploymentInput from './employment-input'

type Props = {
    formData: any,
    minHistoryMonths: number,
    showSingleEmployentHistoryOnly: boolean,
    showYourPosition: boolean,
    showLandLine:boolean
}

const EmploymentHistory: React.FC<Props> = ({ formData, minHistoryMonths, showSingleEmployentHistoryOnly, showYourPosition, showLandLine}) => {

    const collectionName = "employments";

    //used only for initial setup
    const [employments, setEmployments] = useState([]);

    useEffect(() => {
        if (!formData[collectionName]) {
            setEmployments([{}]);
        }
        else {
            setEmployments(formData[collectionName].map((value, index) => {
                return {
                    ...value,
                    previousDate: (index > 0) ? formData[collectionName][index - 1].startDate : null
                }
            }));
        }
    }, []);

    const subscribeComponent = (callback: any, index: number) => {

        updateEmployment({
            notificationsHandler: callback,
            ...employments[index]
        }, index);
    }

    const updateEmployment = (data, index) => {
        setEmployments([...employments.slice(0, index), data, ...employments.slice(index + 1)]);
    };

    const onTimePeriodUpdate = (startDate, index) => {
        //create new array instance here
        let items = employments.slice(0);
        if (items.length > 0) {

            //update current item
            items[index] = {
                ...items[index],
                startDate: startDate
            }

            //update next item
            if (index + 1 < items.length) {

                items[index + 1] = {
                    ...items[index + 1],
                    previousDate: startDate
                };

                //force next item to update years & months employed
                if (items[index + 1].notificationsHandler) {
                    items[index + 1].notificationsHandler("previous-date", startDate);
                }
            }

            let totalHistory = 0;

            items.forEach((item, index) => {

                const dateStart = moment(item.previousDate || Date.now()).startOf('day');
                const dateEnd = moment(item.startDate).endOf('day');
                item.totalMonths = 0;

                if (!dateStart.isBefore(dateEnd)) {
                    const monthsDelta = dateStart.diff(dateEnd, "months");

                    const years = Math.floor(monthsDelta / 12);
                    const months = monthsDelta % 12;
                    item.totalMonths = (years ?? 0) * 12 + (months ?? 0);
                }

                totalHistory += item.totalMonths;
            });

            if (totalHistory < minHistoryMonths && (items.length == 1 || (items[items.length - 1].totalMonths ?? 0) > 0)) {
                items.push({
                    previousDate: items[items.length - 1].startDate,
                    totalMonths: 0
                });
            }
            else {
                while (items.length > 1 && totalHistory >= minHistoryMonths && totalHistory - (items[items.length - 1].totalMonths ?? 0) >= minHistoryMonths) {
                    items = items.slice(0, -1);

                    totalHistory = 0;
                    items.forEach((item, index) => {
                        totalHistory += (item.totalMonths ?? 0);
                    });
                }
            }
        }

        setEmployments(items);
    }


    return (
        <React.Fragment>
             { showSingleEmployentHistoryOnly &&             
                        <React.Fragment key={0}>
                            <h3>Current Employment</h3>
                            <EmploymentInput
                                showLandLine={showLandLine}
                                showYourPosition={showYourPosition}
                                formData={employments}
                                initialPreviousDate={employments[0]?.previousDate}
                                index={0} collectionName={collectionName}
                                onTimePeriodUpdate={(startDate) => { onTimePeriodUpdate(startDate, 0) }}
                                notificationsSubscribe={subscribeComponent} />
                        </React.Fragment>
            
            }
            { !showSingleEmployentHistoryOnly &&
                employments.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <h3>{(index === 0) ? "Current Employment" : `Previous Employment: ${index}`}</h3>
                            <EmploymentInput
                                showLandLine={showLandLine}
                                showYourPosition={showYourPosition}
                                formData={item}
                                initialPreviousDate={item.previousDate}
                                index={index} collectionName={collectionName}
                                onTimePeriodUpdate={(startDate) => { onTimePeriodUpdate(startDate, index) }}
                                notificationsSubscribe={subscribeComponent} />
                        </React.Fragment>
                    );
                })
            }
        </React.Fragment>
    )
}

export default EmploymentHistory