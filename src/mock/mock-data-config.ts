import { Sykmelding } from '../sykmeldinger/sykmeldinger-duck';
import { ActiveUnleashFeatures, tiltakinfoHentsykmeldinger } from '../unleash/unleash-duck';

export enum BRUKER {
    SYKMELDT_MED_ARBEIDSGIVER = 'SYKMELDT_MED_ARBEIDSGIVER',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'SYKMELDT_UTEN_ARBEIDSGIVER',
}

export const brukerOptionsRekkefolge = [
    BRUKER.SYKMELDT_UTEN_ARBEIDSGIVER,
    BRUKER.SYKMELDT_MED_ARBEIDSGIVER,
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

interface BrukerMocks {
    defaultMock: MockConfig;
    [BRUKER.SYKMELDT_UTEN_ARBEIDSGIVER]: MockConfig;
    [BRUKER.SYKMELDT_MED_ARBEIDSGIVER]: MockConfig;
}

export const brukerMocks: BrukerMocks = {
    defaultMock: {
        [tiltakinfoHentsykmeldinger]: true,
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
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
    [BRUKER.SYKMELDT_UTEN_ARBEIDSGIVER]: {
        [tiltakinfoHentsykmeldinger]: false,
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SYKMELDINGER]: [],
    },
    [BRUKER.SYKMELDT_MED_ARBEIDSGIVER]: {
        [tiltakinfoHentsykmeldinger]: true,
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
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
    }
};
