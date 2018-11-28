import { ActiveUnleashFeatures } from '../unleash/unleash-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';
import { OppfolgingsEnhet } from '../brukerdata/oppfolgingsstatus-duck';
import { FremtidigSituasjonSvar, RegistreringDataState, RegistreringType } from '../brukerdata/registrering-duck';

export enum Bruker {
    DEFAULT_MOCK = 'bruker-default-mock',
    SYKMELDT_MED_ARBEIDSGIVER = 'bruker-sykmeldt-med-arbeidsgiver',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'bruker-sykmeldt-uten-arbeidsgiver',
    ARBEIDSLEDIG_SITUASJONSBESTEMT = 'bruker-arbeidsledig-situasjonsbestemt',
    ARBEIDSLEDIG_SPESIELT_TILPASSET = 'bruker-arbeidsledig-spesielt-tilpasset',
    UTENFOR_MAALGRUPPE = 'bruker-utenfor-maalgruppe',
}

export const brukerOptionsRekkefolge = [
    Bruker.DEFAULT_MOCK,
    Bruker.SYKMELDT_UTEN_ARBEIDSGIVER,
    Bruker.SYKMELDT_MED_ARBEIDSGIVER,
    Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT,
    Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET,
    Bruker.UTENFOR_MAALGRUPPE,
];

export enum MockConfigPropName {
    UNDER_OPPFOLGING = 'underOppfolging',
    ER_INNLOGGET = 'erInnlogget',
    HAR_GYLDIG_OIDC_TOKEN = 'harGyldigOidcToken',
    NIVA = 'niva',
    NIVA_OIDC = 'nivaOidc',
    SERVICEGRUPPE = 'servicegruppe',
    SYFODATA = 'syfoData',
    REGISTRERING = 'registrering',
    HAR_ARBEIDSGIVER_URLMOCK = 'harArbeidsgiver',
    ER_SYKMELDT_URLMOCK = 'erSykmeldt',
    OPPFOLGINGSENHET = 'oppfolgingsenhet',
    VIS_TEKSTER = 'vistekster',
}

export interface MockConfig extends ActiveUnleashFeatures {
    [MockConfigPropName.UNDER_OPPFOLGING]: boolean;
    [MockConfigPropName.SERVICEGRUPPE]: string;
    [MockConfigPropName.OPPFOLGINGSENHET]: OppfolgingsEnhet;
    [MockConfigPropName.SYFODATA]: SyfoDataState;
    [MockConfigPropName.REGISTRERING]?: RegistreringDataState;
}

export interface BrukerMocks {
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: MockConfig;
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: MockConfig;
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: MockConfig;
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: MockConfig;
    [Bruker.UTENFOR_MAALGRUPPE]: MockConfig;
}

export const brukerMocks: BrukerMocks = {
    [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDU',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: ['ARBEIDSLEDIG'],
            erTiltakSykmeldteInngangAktiv: true,
        },
    },
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: ['FRILANSER'],
            erTiltakSykmeldteInngangAktiv: true,
        },
        [MockConfigPropName.REGISTRERING]: {
            type: RegistreringType.SYKMELDT,
            registrering: {
                besvarelse: {
                    fremtidigSituasjon: FremtidigSituasjonSvar.USIKKER
                }
            }
        },
    },
    [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BFORM',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    },
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BATT',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    },
    [Bruker.UTENFOR_MAALGRUPPE]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.SERVICEGRUPPE]: 'IVURD',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.SYFODATA]: {
            arbeidsSituasjonIAktiveSykmeldinger: [],
            erTiltakSykmeldteInngangAktiv: false,
        },
    },
};