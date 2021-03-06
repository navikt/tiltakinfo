import { fetchToJson } from './fetch-utils';
import { contextRoot } from '../konstanter';
import { UnleashState } from '../unleash/unleash-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { RegistreringDataState } from '../brukerdata/registrering-duck';
import { MeldingTilNavKontorFetchState } from '../brukerdata/melding-til-nav-kontor-duck';
import { OppfolgingsstatusFetchState } from '../brukerdata/oppfolgingsstatus-duck';
import { User } from '../brukerdata/bruker-duck';
import { Melding } from '../brukerdata/melding-til-veileder-duck';
import { BrukersNavnData } from '../brukerdata/brukernavn-duck';

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
    postBruker: string;
    postMeldingDialog: string;
    getSyfo: string;
    getRegistrering: string;
    getBrukersNavn: string;
    getHarSendtMeldingNavKontor: string;
}

export const featureQueryParams = (features: string[]): string => {
    const reduceFunc = (acc: string, toggle: string, i: number) => `${acc}${i === 0 ? '?' : '&'}feature=${toggle}`;
    return features.reduce(reduceFunc, '');
};

export const API: ApiProps = {
    getUnleash: `${contextRoot}/api/feature`,
    getOppfolging: '/veilarboppfolging/api/oppfolging',
    getOppfolgingsstatus: '/veilarbtiltakinfo/api/oppfolgingsstatus',
    postBruker: '/veilarbtiltakinfo/api/bruker',
    postMeldingDialog: '/veilarbdialog/api/dialog',
    getSyfo: '/syforest/sykeforloep/metadata',
    getRegistrering: '/veilarbregistrering/api/registrering',
    getBrukersNavn: '/veilarbperson/api/person/navn',
    getHarSendtMeldingNavKontor: '/veilarbtiltakinfo/api/bruker/harsendtmeldingtilnavkontor',
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

export function postBrukerFetch(bruker: User): Promise<User> {
    const config = {...requestConfig, method: 'POST', body: JSON.stringify(bruker)};
    return fetchToJson(API.postBruker, config);
}

export function postMeldingDialogFetch(melding: Melding): Promise<Melding> {
    const config = {...requestConfig, method: 'POST', body: JSON.stringify(melding)};
    return fetchToJson(API.postMeldingDialog, config);
}

export function getSyfoFetch(): Promise<SyfoDataState> {
    return fetchToJson(API.getSyfo, requestConfig);
}

export function getRegistrering(): Promise<RegistreringDataState> {
    return fetchToJson(API.getRegistrering, requestConfig);
}

export function getBrukersNavn(): Promise<BrukersNavnData> {
    return fetchToJson(API.getBrukersNavn, requestConfig);
}

export function getMeldingNavKontorFetch(): Promise<MeldingTilNavKontorFetchState> {
    return fetchToJson(API.getHarSendtMeldingNavKontor, requestConfig);
}
