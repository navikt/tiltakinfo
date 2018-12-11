import { ActiveUnleashFeatures } from '../unleash/unleash-duck';
import { OppfolgingsEnhet } from '../brukerdata/oppfolgingsstatus-duck';
import { MaalFraRegistrering, RegistreringDataState } from '../brukerdata/registrering-duck';

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
    SERVICEGRUPPE = 'servicegruppe',
    REGISTRERING = 'registrering',
    HAR_ARBEIDSGIVER = 'arbeidsSituasjonIAktiveSykmeldinger',
    ER_SYKMELDT = 'erTiltakSykmeldteInngangAktiv',
    OPPFOLGINGSENHET = 'oppfolgingsenhet',
    VIS_TEKSTER = 'vistekster',
}

export interface MockConfig extends ActiveUnleashFeatures {
    [MockConfigPropName.UNDER_OPPFOLGING]: boolean;
    [MockConfigPropName.SERVICEGRUPPE]: string;
    [MockConfigPropName.OPPFOLGINGSENHET]: OppfolgingsEnhet;
    [MockConfigPropName.ER_SYKMELDT]: boolean;
    [MockConfigPropName.HAR_ARBEIDSGIVER]: string[];
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
        [MockConfigPropName.HAR_ARBEIDSGIVER]: ['ARBEIDSLEDIG'],
        [MockConfigPropName.ER_SYKMELDT]: true,
    },
    [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.SERVICEGRUPPE]: 'VURDI',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.HAR_ARBEIDSGIVER]: ['FRILANSER'],
        [MockConfigPropName.ER_SYKMELDT]: true,
        [MockConfigPropName.REGISTRERING]: {
            registrering: {
                besvarelse: {
                    fremtidigSituasjon: MaalFraRegistrering.IKKE_VALGT
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
        [MockConfigPropName.HAR_ARBEIDSGIVER]: [],
        [MockConfigPropName.ER_SYKMELDT]: false,
    },
    [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: true,
        [MockConfigPropName.SERVICEGRUPPE]: 'BATT',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.HAR_ARBEIDSGIVER]: [],
        [MockConfigPropName.ER_SYKMELDT]: false,
    },
    [Bruker.UTENFOR_MAALGRUPPE]: {
        [MockConfigPropName.UNDER_OPPFOLGING]: false,
        [MockConfigPropName.SERVICEGRUPPE]: 'IVURD',
        [MockConfigPropName.OPPFOLGINGSENHET]: {
            navn: 'mock',
            enhetId: 'mock',
        },
        [MockConfigPropName.HAR_ARBEIDSGIVER]: [],
        [MockConfigPropName.ER_SYKMELDT]: false,
    },
};