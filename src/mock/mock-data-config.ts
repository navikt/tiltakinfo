import { ActiveUnleashFeatures } from '../unleash/unleash-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';

export enum Bruker {
    SYKMELDT_MED_ARBEIDSGIVER = 'SYKMELDT_MED_ARBEIDSGIVER',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'SYKMELDT_UTEN_ARBEIDSGIVER',
    ARBEIDSLEDIG_SITUASJONSBESTEMT = 'ARBEIDSLEDIG_SITUASJONSBESTEMT',
    ARBEIDSLEDIG_SPESIELT_TILPASSET = 'ARBEIDSLEDIG_SPESIELT_TILPASSET',
}

export const brukerOptionsRekkefolge = [
    Bruker.SYKMELDT_UTEN_ARBEIDSGIVER,
    Bruker.SYKMELDT_MED_ARBEIDSGIVER,
    Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT,
    Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET,
];

export enum MockConfigPropName {
    UNDER_OPPFOLGING = 'underOppfolging',
    HAR_GYLDIG_OIDC_TOKEN = 'harGyldigOidcToken',
    SERVICEGRUPPE = 'servicegruppe',
    SYFODATA = 'syfoData',
    HAR_ARBEIDSGIVER_URLMOCK = 'harArbeidsgiver',
    ER_SYKMELDT_URLMOCK = 'erSykmeldt',

}

export interface MockConfig extends ActiveUnleashFeatures {
    [MockConfigPropName.UNDER_OPPFOLGING]: boolean;
    [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: boolean;
    [MockConfigPropName.SERVICEGRUPPE]: string;
    [MockConfigPropName.SYFODATA]: SyfoDataState;
}

interface BrukerMocks {
    defaultMock: MockConfig;
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: MockConfig;
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: MockConfig;
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: MockConfig;
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: MockConfig;
}

export const brukerMocks: BrukerMocks = {
    defaultMock: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
        [MockConfigPropName.SYFODATA]: {
            arbeidssituasjoner: ['FRILANSER'],
            tiltakSyfo: true,
        },
    },
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDU',
        [MockConfigPropName.SYFODATA]: {
            arbeidssituasjoner: ['ARBEIDSLEDIG'],
            tiltakSyfo: true,
        },
    },
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
        [MockConfigPropName.SYFODATA]: {
            arbeidssituasjoner: ['FRILANSER'],
            tiltakSyfo: true,
        },
    },
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BFORM',
        [MockConfigPropName.SYFODATA]: {
            arbeidssituasjoner: [],
            tiltakSyfo: false,
        },
    },
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BATT',
        [MockConfigPropName.SYFODATA]: {
            arbeidssituasjoner: [],
            tiltakSyfo: false,
        },
    }
};