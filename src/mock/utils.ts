/* tslint:disable*/
import * as qs from 'query-string';

export function respondWith(handler: any) {
    return (url: string, config: any, extra: any) => {
        const queryParams = qs.parse(qs.extract(url));
        const body = config && config.body && JSON.parse(config.body);

        let response;

        if (typeof handler === 'function') {
            response = handler(url, config, { queryParams, body, extra });
        } else {
            response = handler; // Trust me, its data
        }

        /* tslint:disable */
        if (console.groupCollapsed) {
            console.groupCollapsed(url);
            console.groupCollapsed('config');
            console.log('url', url);
            console.log('config', config);
            console.log('queryParams', queryParams);
            console.log('body', body);
            console.log('extra', extra);
            console.groupEnd();

            console.log('response', response);
            console.groupEnd();
        }
        /* tslint:enable */
        return response;
    };
}

export function erLocalhost() {
    const host: string = window.location.host;
    return host.includes('localhost') || host.includes('127.0.0.1');
}

export function erFullMock(): boolean {
    return process.env.REACT_APP_MOCK_FULL === 'true';
}

export function erHalvMock(): boolean {
    return process.env.REACT_APP_MOCK_HALV === 'true';
}

export function erMock() {
    return erFullMock() || erHalvMock();
}
