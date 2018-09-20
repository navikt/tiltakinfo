import { fetchToJson } from './fetch-utils';
import { UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { StatusState } from '../status/status-duck';
import { SyfoState } from '../brukerdata/sykmeldinger-duck';
import { contextRoot } from '../konstanter';
import { ServicegruppeState } from '../brukerdata/servicekode-duck';

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
    getSykmeldinger: string;
    getArbeidsledig: string;
}

export const featureQueryParams = (features: string[]): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return features.reduce(reduceFunc, '');
};

export const API: ApiProps = {
    getUnleash: `${contextRoot}/api/feature`,
    getOppfolging: '/veilarboppfolgingproxy/api/oppfolging',
    getStatus: '/veilarbstepup/status',
    getSykmeldinger: '/syforest/sykmeldinger',
    getArbeidsledig: '/veilarbtiltakinfo/api/servicegruppekode'
};

export function getUnleashFetch(features: string[]): Promise<UnleashState> {
    const unleashUrl = API.getUnleash + featureQueryParams(features);
    return fetchToJson<UnleashState>(unleashUrl, requestConfig);
}

export function getOppfolgingFetch(): Promise<OppfolgingState> {
    return fetchToJson(API.getOppfolging, requestConfig);
}

export function getStatusFetch(): Promise<StatusState> {
    return fetchToJson(API.getStatus, requestConfig);
}

export function getSykmeldingerFetch(): Promise<SyfoState> {
    return fetchToJson(API.getSykmeldinger, requestConfig);
}

export function getArbeidsledigFetch(): Promise<ServicegruppeState> {
    return fetchToJson(API.getArbeidsledig, requestConfig);
}