import { parseStringDate } from "../../helpers/dateHelper";

export const isWithinLeaseBotHours = () => {
  
    let now = new Date();
    let currentDay = now.getUTCDay();
    let startTime = '';
    let endTime = '';
    let startDate = null;
    let endDate = null;
  
    if (currentDay == 6 || currentDay == 0) { // if sat/sunday
        startTime = '10:00 PM';
        endTime = '8:00 AM';
    } else {
        startTime = '9:00 AM';
        endTime = '6:00 PM';
    }
  
    startDate = parseStringDate(startTime); 
    endDate = parseStringDate(endTime);
  
    if (startDate > endDate) { // check if start comes before end
        let temp = startDate; // if so, assume it's across midnight
        startDate = endDate;   // and swap the dates
        endDate = temp;
        return (!(now < endDate && now > startDate));
    } else {
        return (now < endDate && now > startDate);
    }
    
  }