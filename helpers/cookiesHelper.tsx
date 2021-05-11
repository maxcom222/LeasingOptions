import { parseCookies, setCookie } from 'nookies';

export const hasPrivacyAccepted = (): boolean => {
	const cookies = parseCookies();

	return cookies.HasSeenConfirmForm === "1";
}

export const setPrivacyAccepted = (expiryDate: Date) => {
	setCookie(null, "HasSeenConfirmForm", "1", { expires: expiryDate, path: '/' });
}
