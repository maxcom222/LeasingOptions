import { isNullOrWhiteSpace, joinNotEmpty, replaceAll } from './stringHelper';

export const getBaseUrl = (url: string): string => {
    let result: string = null;

    if (!isNullOrWhiteSpace(url)) {
        result = url;
        const splitIdx = result.indexOf('?');

        if (splitIdx !== -1) {
            result = result.substring(0, splitIdx);
        }
    }

    return result;
}

export const getFriendlyUrlSegment = (value: string): string => {
    if (value == null || value == undefined) {
        return value;
    }

    let result: string = value.toString().toLowerCase();
    result = replaceAll(result, " ", "-")
    result = replaceAll(result, ",", "")
    result = replaceAll(result, ".", "")
    result = replaceAll(result, "#", "")
    result = replaceAll(result, "'", "")
    result = replaceAll(result, "\"", "")
    result = replaceAll(result, "&", "")
    result = replaceAll(result, "%", "")
    result = replaceAll(result, "!", "")
    result = replaceAll(result, "\"", "")
    result = replaceAll(result, "?", "")
    result = replaceAll(result, "(", "")
    result = replaceAll(result, ")", "")
    result = replaceAll(result, ":", "-")
    result = replaceAll(result, "–", "-")
    result = replaceAll(result, "_", "-")
    result = replaceAll(result, "––", "-")
    result = replaceAll(result, "…", "")
    result = replaceAll(result, "’", "")
    result = replaceAll(result, "/", "")
    result = replaceAll(result, "\\", "")
    result = replaceAll(result, "[", "")
    result = replaceAll(result, "]", "")
    result = replaceAll(result, "+", "-");

    while (result.includes("--")) {
        result = replaceAll(result, "--", "-");
    }

    // result = result.trim('-', '_')
    return result;
}

export const getUrl = (baseUrl: string, queryParams: string[]): string => {
    let result: string = null;

    if (!isNullOrWhiteSpace(baseUrl)) {
        result = baseUrl;

        if (queryParams && queryParams.length > 0) {
            result += (result.indexOf('?') === -1 ? '?' : '&') + joinNotEmpty("&", queryParams);
        }
    }

    return result;
}

export const getQueryParams = function (queryStringParts: string[]): any {
    if (!queryStringParts || queryStringParts.length === 0) return {};

    let result = {};

    for (let i = 0; i < queryStringParts.length; ++i) {
        let param: string[] = queryStringParts[i].split('=', 2);

        if (param.length === 1) {
            result[param[0].toLowerCase()] = "";
        }
        else {
            result[param[0].toLowerCase()] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }
    }

    return result;
}