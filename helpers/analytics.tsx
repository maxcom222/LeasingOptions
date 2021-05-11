// utils/analytics.js
import ReactGA from 'react-ga';
import { GetFullUrlPath } from 'helpers/urlHelper';

export const initGA = () => {
    ReactGA.initialize('UA-5906257-3')
}

export const getGAClientId = () => {
    let gaClientId = null;

    ReactGA.ga((tracker) => {
        gaClientId = tracker.get('clientId');
    });
    return gaClientId;
}

export const logPageView = () => {
    let pageUrl = GetFullUrlPath();
    ReactGA.set({ page: pageUrl })
    ReactGA.pageview(pageUrl)
}

export const logEvent = (category = '', action = '') => {
    if (category && action) {
        ReactGA.event({ category, action })
    }
}

export const logLabelEvent = (category = '', action = '', label = '') => {
    if (category && action && label) {
        ReactGA.event({ category, action, label })
    }
}
export const logException = (description = '', fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal })
    }
}