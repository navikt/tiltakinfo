import { Sykmelding } from '../brukerdata/sykmeldinger-duck';
import { ActiveUnleashFeatures } from '../unleash/unleash-duck';

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
    SYKMELDINGER = 'sykmeldinger',
    SERVICEGRUPPE = 'servicegruppe',
    HAR_ARBEIDSGIVER = 'harArbeidsgiver',
}

export interface MockConfig extends ActiveUnleashFeatures {
    [MockConfigPropName.UNDER_OPPFOLGING]: boolean;
    [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: boolean;
    [MockConfigPropName.SYKMELDINGER]: Sykmelding[];
    [MockConfigPropName.SERVICEGRUPPE]: string;
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
        [MockConfigPropName.SYKMELDINGER]: [
            {
                sendtdato: '2018-01-01T01:00:00',
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
            },
            {
                valgtArbeidssituasjon: 'FRILANSER',
                sendtdato: '2018-01-01T03:00:00',
            },
        ],
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
    },
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SYKMELDINGER]: [
            {
                sendtdato: '2018-01-01T01:00:00',
                valgtArbeidssituasjon: 'FRILANSER',
            },
            {
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
                sendtdato: '2018-01-01T02:00:00',
            },
        ],
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDU',
    },
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SYKMELDINGER]: [
            {
                sendtdato: '2018-01-01T01:00:00',
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
            },
            {
                valgtArbeidssituasjon: 'FRILANSER',
                sendtdato: '2018-01-01T02:00:00',
            },
        ],
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
    },
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SYKMELDINGER]: [],
        [MockConfigPropName.SERVICEGRUPPE]: 'BFORM',
    },
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SYKMELDINGER]: [],
        [MockConfigPropName.SERVICEGRUPPE]: 'BATT',
    }
};