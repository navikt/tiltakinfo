import { fetchToJson } from './fetch-utils';
import { UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { contextRoot } from '../konstanter';
import { OppfolgingsstatusFetchState } from '../brukerdata/oppfolgingsstatus-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';
import { RegistreringDataState } from '../brukerdata/registrering-duck';

export const INNLOGGINGSLINJE_URL = '/innloggingslinje/auth';

const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

const requestConfig: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
    }
};

interface ApiProps {
    getUnleash: string;
    getOppfolging: string;
    getOppfolgingsstatus: string;
    getSyfo: string;
    getRegistrering: string;
    hentBrukersNavn: string;
}

export const featureQueryParams = (features: string[]): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return features.reduce(reduceFunc, '');
};

export const API: ApiProps = {
    getUnleash: `${contextRoot}/api/feature`,
    getOppfolging: '/veilarboppfolging/api/oppfolging',
    getOppfolgingsstatus: '/veilarbtiltakinfo/api/oppfolgingsstatus',
    getSyfo: '/syforest/sykeforloep/metadata',
    getRegistrering: '/veilarbregistrering/api/registrering',
    hentBrukersNavn: INNLOGGINGSLINJE_URL
};

export function getUnleashFetch(features: string[]): Promise<UnleashState> {
    const unleashUrl = API.getUnleash + featureQueryParams(features);
    return fetchToJson<UnleashState>(unleashUrl, requestConfig);
}

export function getOppfolgingFetch(): Promise<OppfolgingState> {
    return fetchToJson(API.getOppfolging, requestConfig);
}

export function getOppfolgingsstatusFetch(): Promise<OppfolgingsstatusFetchState> {
    return fetchToJson(API.getOppfolgingsstatus, requestConfig);
}

export function getSyfoFetch(): Promise<SyfoDataState> {
    return fetchToJson(API.getSyfo, requestConfig);
}

export function getRegistrering(): Promise<RegistreringDataState> {
    return fetchToJson(API.getRegistrering, requestConfig);
}

function getHeaders() {
    return new Headers({
        'Content-Type': 'application/json',
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'), // eslint-disable-line quote-props
    });
}

const MED_CREDENTIALS = {
    credentials: ('same-origin' as RequestCredentials)
};

export function hentBrukersNavn() {
    return fetchToJson(
        `${INNLOGGINGSLINJE_URL}?randomness=${Math.random()}`,
        {
            ...MED_CREDENTIALS,
            headers: getHeaders(),
        }
    );
}
