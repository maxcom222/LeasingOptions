import moment from "moment";

const UKDateFormat = 'DD/MM/YYYY';

export const PhoneNumberIsValid = (phoneNumber: string | null, allowEmpty: boolean = true) => {
    if (phoneNumber) {
        let value = phoneNumber.replace(/\s+/g, "");
        return /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/.test(value);
    }
    else if (!allowEmpty) {
        return false;
    }

    return true;
}

export const UKMobileNumberIsValid = (phoneNumber: string | null, allowEmpty: boolean = true) => {
    if (phoneNumber) {
        let value = phoneNumber.replace(/\s+/g, "");
        if (value.length != 11) {
            return false
        }
        else {
            return /^(07\d{8,12}|447\d{7,11})$/.test(value);
        }
    }
    else if (!allowEmpty) {
        return false;
    }

    return true;
}

export const EmailAddressIsValid = (email: string | null, allowEmpty: boolean = true) => {
    if (email) {
        let value = email.replace(/\s+/g, "");
        return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})?$/.test(value);
    }
    else if (!allowEmpty) {
        return false;
    }

    return true;
}

export const IsOver18 = (date: string) => {

    const age = moment().diff(moment(date, UKDateFormat), 'years', true);

    if (age >= 18){
        return true;
    } else {
        return false;
    }
};

export const IsDateInPresentOrPast = (date: string) => { 
    return moment(date, 'YYYY-MM-DD').isBefore(moment().add(1, 'days').format('YYYY-MM-DD'), 'day');
}