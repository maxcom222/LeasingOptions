import accounting from 'accounting';

export const currencySymbol = "£"

export const unformat = (value: string): number => {
    return accounting.unformat(value);
}

export const formatMoney = (number: number) => {
    return accounting.formatMoney(number, currencySymbol, 2);
}

export const formatNumber = (number: number, precision?: number) => {
    return accounting.formatNumber(number, precision);
}

export const formatNumberThousands = (number: number) => {
    return accounting.formatNumber(number, 0, ".");
}