import { ActiveUnleashFeatures } from '../unleash/unleash-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';

export enum Bruker {
    DEFAULT_MOCK_BRUKER = 'DEFAULT_MOCK_BRUKER',
    SYKMELDT_MED_ARBEIDSGIVER = 'SYKMELDT_MED_ARBEIDSGIVER',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'SYKMELDT_UTEN_ARBEIDSGIVER',
    ARBEIDSLEDIG_SITUASJONSBESTEMT = 'ARBEIDSLEDIG_SITUASJONSBESTEMT',
    ARBEIDSLEDIG_SPESIELT_TILPASSET = 'ARBEIDSLEDIG_SPESIELT_TILPASSET',
    UTENFOR_MAALGRUPPE = 'UTENFOR_MAALGRUPPE',
    DEFAULT_MOCK = 'DEFAULT_MOCK',
}

export const brukerOptionsRekkefolge = [
    Bruker.DEFAULT_MOCK_BRUKER,
    Bruker.SYKMELDT_UTEN_ARBEIDSGIVER,
    Bruker.SYKMELDT_MED_ARBEIDSGIVER,
    Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT,
    Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET,
    Bruker.UTENFOR_MAALGRUPPE,
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

export interface BrukerMocks {
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: MockConfig;
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: MockConfig;
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: MockConfig;
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: MockConfig;
    [Bruker.UTENFOR_MAALGRUPPE]: MockConfig;
    [Bruker.DEFAULT_MOCK]: MockConfig;
}

export const brukerMocks: BrukerMocks = {
    [Bruker.DEFAULT_MOCK]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BATT',
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    },
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDU',
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: ['ARBEIDSLEDIG'],
            erTiltakSykmeldteInngangAktiv: true,
        },
    },
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: ['FRILANSER'],
            erTiltakSykmeldteInngangAktiv: true,
        },
    },
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BFORM',
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    },
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BATT',
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    },

    [Bruker.UTENFOR_MAALGRUPPE]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'IVURD',
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    }
};