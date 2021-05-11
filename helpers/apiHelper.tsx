//TODO: Check what ip value is returned for server-side requests. Check rest of the values as well
export const getLOSSRFetchHeaders = (context) => {
    const fetchHeaders = {
        headers: {
            // @ts-ignore
            'LO-ORIGINAL-IP': context.req.client.remoteAddress,
            'LO-ORIGINAL-USERAGENT': context.req.headers["user-agent"],
            'LO-ORIGINAL-HOSTNAME': context.req.headers["host"]
        }
    }

    return fetchHeaders;
}