export const joinNotEmpty = (separator: string, values: string[]): string => {
    let filteredValues: string[] = [];

    if (values) {
        for (let i = 0; i < values.length; i++) {
            if (!isNullOrWhiteSpace(values[i])) {
                filteredValues.push(values[i]);
            }
        }
    }

    return filteredValues.join(separator || "");
}

export const isNullOrWhiteSpace = (value: string): boolean => {
    return !value || value === '' || !value.trim();
}

export const escapeRegExp = (text: string): string => {
    return text?.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const replaceAll = (str: string, find: string, replace: string): string => {
    return str?.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export const isNumeric = (value: string): boolean => {
    let reg = new RegExp('^\\d+$');
    return reg.test(value);
}


export const capitalize = (value: string): string => {
    if (!isNullOrWhiteSpace(value)) {
        var result = "";
        let wordBuilder = "";

        const stopChars: string[] = [" ", "-", ",", ".", "&", "|"];
        let idx = 0;

        while (idx <= value.length) {
            let currentValue = (idx < value.length) ? value[idx] : "";

            if (currentValue !== "" && !stopChars.includes(currentValue)) {
                wordBuilder += currentValue;
            }
            else {
                let word = wordBuilder.toString();

                if (word.length > 3 && !isNumeric(word[0]) && !isNumeric(word[word.length - 1])) {
                    result += `${word.substring(0, 1).toUpperCase()}${word.substring(1).toLowerCase()}${currentValue}`;
                }
                else {
                    result += `${word}${currentValue}`;
                }

                wordBuilder = "";
            }

            idx++;
        }

        return result;
    }

    return value;
}

export const hasWhiteSpace = (s) => {
    return s.indexOf(' ') >= 0;
}

export const shortCut = (value: string, take: number): string => {
    let result = value ? value.trim() : value;

    if (result && take > 0 && result.length > take + 3) {
        const checkList = [' ', '.', ',', ':', ';', '?', '!'];
        let trailingChar = result.substring(take, take + 1);

        result = result.substring(0, take);

        if (!checkList.includes(trailingChar)) {
            result = result.substring(0, result.lastIndexOf(' ')).trim();
        }

        while (checkList.includes(result[result.length - 1])) {
            result = result.substring(0, result.length - 1).trim();
        }

        result = result.trim() + "...";
    }

    return result;
}