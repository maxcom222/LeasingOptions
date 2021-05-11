export const parseStringDate = (d) => { 

    var parts = d.split(/:|\s/)
    var date = new Date();

    if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
    date.setHours(+parts.shift());
    date.setMinutes(+parts.shift());
    return date;    
}