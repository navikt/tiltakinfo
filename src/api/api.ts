import { fetchToJson } from './fetch-utils';
import { initialState as unleashInitialState, UnleashState } from '../unleash/unleash-duck';

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
}

export const featureQueryParams = (): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return Object.keys(unleashInitialState).reduce(reduceFunc, '');
} ;

export const API: ApiProps = {
    getUnleash: '/feature/',
};

export function getUnleashFetch(): Promise<UnleashState> {
    const unleashUrl = API.getUnleash + featureQueryParams();
    return fetchToJson<UnleashState>(unleashUrl, requestConfig)
        .catch(() => Promise.resolve(unleashInitialState));
}
