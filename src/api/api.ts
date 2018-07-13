import { fetchToJson } from './fetch-utils';
import { initialState as unleashInitialState, UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
import { StatusState } from '../status/status-duck';
import { SyfoState } from '../arbeidsforhold/arbeidsforhold-duck';

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
    getStatus: string;
    getArbeidsforhold: string;
}

export const featureQueryParams = (features: string[]): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return features.reduce(reduceFunc, '');
};

export const API: ApiProps = {
    getUnleash: '/feature/',
    getOppfolging: '/veilarboppfolgingproxy/api/oppfolging',
    getStatus: '/veilarbstepup/status',
    getArbeidsforhold: '/syforest/sykmeldinger'
};

export function getUnleashFetch(features: string[]): Promise<UnleashState> {
    const unleashUrl = API.getUnleash + featureQueryParams(features);
    return fetchToJson<UnleashState>(unleashUrl, requestConfig)
        .catch(() => Promise.resolve(unleashInitialState));
}

export function getOppfolgingFetch(): Promise<OppfolgingState> {
    return fetchToJson(API.getOppfolging, requestConfig);
}

export function getStatusFetch(): Promise<StatusState> {
    return fetchToJson(API.getStatus, requestConfig);
}

export function getArbeidsforholdFetch(): Promise<SyfoState> {
    return fetchToJson(API.getArbeidsforhold, requestConfig);
}
