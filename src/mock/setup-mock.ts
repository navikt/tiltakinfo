/* tslint:disable*/
import * as fetchMock from 'fetch-mock';
import { erHalvMock, respondWith } from './utils';
import { API } from '../api/api';
import { tiltakinfoMvp } from '../unleash/unleash-duck';

export function setupMock() {
    // const realFetch = window.fetch;
    (fetchMock as any)._mock();

    if (erHalvMock()) {
        console.log('### HALV MOCK AKTIVERT! ###');
        console.log('### Vi mocker alt bortsett fra egen backend');
    } else {
        console.log('### FULL MOCK AKTIVERT! ###');
    }

    fetchMock.get(API.getUnleash, respondWith({
        [tiltakinfoMvp]: true,
    }));
}