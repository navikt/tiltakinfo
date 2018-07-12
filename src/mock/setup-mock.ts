/* tslint:disable*/
import * as fetchMock from 'fetch-mock';
import { erHalvMock, respondWith } from './utils';
import { API, featureQueryParams } from '../api/api';
import { tiltakinfoABTestingLesMerOmTiltaket } from '../unleash/unleash-duck';

export function setupMock() {
    // const realFetch = window.fetch;
    (fetchMock as any)._mock();

    if (erHalvMock()) {
        console.log('### HALV MOCK AKTIVERT! ###');
        console.log('### Vi mocker alt bortsett fra egen backend');
    } else {
        console.log('### FULL MOCK AKTIVERT! ###');
    }
    const unleashUrl = API.getUnleash + featureQueryParams([tiltakinfoABTestingLesMerOmTiltaket]);
    fetchMock.get(unleashUrl, respondWith({
        [tiltakinfoABTestingLesMerOmTiltaket]: false,
    }));
    fetchMock.get(API.getOppfolging, respondWith(({
        underOppfolging: true,
    })));
    fetchMock.get(API.getStatus, respondWith(({
        harGyldigOidcToken: true,
    }));
    fetchMock.get(API.getArbeidsforhold, respondWith([
        {
            arbeidsgiver: 'Bekk Consulting As',
        },
        {
            arbeidsgiver: 'Bekk Consulting As',
        },
    ]));
}
