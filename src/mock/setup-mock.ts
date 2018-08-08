/* tslint:disable*/
import * as fetchMock from 'fetch-mock';
import { erHalvMock, respondWith } from './utils';
import { API, featureQueryParams } from '../api/api';
import { tiltakinfoHentarbeidsforhold } from '../unleash/unleash-duck';

export function setupMock() {
    // const realFetch = window.fetch;
    (fetchMock as any)._mock();

    if (erHalvMock()) {
        console.log('### HALV MOCK AKTIVERT! ###');
        console.log('### Vi mocker alt bortsett fra egen backend');
    } else {
        console.log('### FULL MOCK AKTIVERT! ###');
    }
    const unleashUrl = API.getUnleash + featureQueryParams([tiltakinfoHentarbeidsforhold]);
    fetchMock.get(unleashUrl, respondWith({
        [tiltakinfoHentarbeidsforhold]: true,
    }));
    fetchMock.get(API.getOppfolging, respondWith({
        underOppfolging: true,
    }));
    fetchMock.get(API.getStatus, respondWith({
        harGyldigOidcToken: true,
    }));
    fetchMock.get(API.getArbeidsforhold, respondWith([
        {
            sendtdato: "2018-01-01T01:00:00",
            valgtArbeidssituasjon: "ARBEIDSLEDIG",
            arbeidsgiver: 'Bekk Consulting As',
        },
        {
            valgtArbeidssituasjon: "FRILANSER",
            sendtdato: "2018-01-01T02:00:00",
            arbeidsgiver: 'Bekk Consulting As',
        },
    ]));
}
