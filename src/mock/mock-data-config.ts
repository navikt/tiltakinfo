import { Sykmelding } from '../sykmeldinger/sykmeldinger-duck';
import { ActiveUnleashFeatures } from '../unleash/unleash-duck';

export enum Bruker {
    DEFAULT_MOCK_BRUKER = 'DEFAULT_MOCK_BRUKER',
    SYKMELDT_MED_ARBEIDSGIVER = 'SYKMELDT_MED_ARBEIDSGIVER',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'SYKMELDT_UTEN_ARBEIDSGIVER',
}

export const brukerOptionsRekkefolge = [
    Bruker.DEFAULT_MOCK_BRUKER,
    Bruker.SYKMELDT_UTEN_ARBEIDSGIVER,
    Bruker.SYKMELDT_MED_ARBEIDSGIVER,
];

export enum MockConfigPropName {
    UNDER_OPPFOLGING = 'underOppfolging',
    HAR_GYLDIG_OIDC_TOKEN = 'harGyldigOidcToken',
    SYKMELDINGER = 'sykmeldinger',
}

export interface MockConfig extends ActiveUnleashFeatures {
    [MockConfigPropName.UNDER_OPPFOLGING]: boolean;
    [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: boolean;
    [MockConfigPropName.SYKMELDINGER]: Sykmelding[];
}

export interface BrukerMocks {
    [Bruker.DEFAULT_MOCK_BRUKER]: MockConfig;
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: MockConfig;
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: MockConfig;
}

export const brukerMocks: BrukerMocks = {
    [Bruker.DEFAULT_MOCK_BRUKER]: {
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
    },
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SYKMELDINGER]: [],
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
    },
};
