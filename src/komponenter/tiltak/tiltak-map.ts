import { TiltakId } from './tiltak-config';

export enum MaalOption {
    IKKE_VALGT = 'maal-ikkevalgt',
    SAMME_STILLING = 'maal-samme-stilling',
    SAMME_ARBEIDSGIVER = 'maal-samme-arbeidsgiver',
    NY_ARBEIDSGIVER = 'maal-ny-arbeidsgiver',
    USIKKER = 'maal-usikker',
}

export enum MaalFraRegistrering {
    IKKE_VALGT = 'IKKE_VALGT',
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER'
}

export enum BrukerType {
    SYKMELDT_MED_ARBEIDSGIVER = 'bruker-sykmeldt-med-arbeidsgiver',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'bruker-sykmeldt-uten-arbeidsgiver',
    ARBEIDSLEDIG_SITUASJONSBESTEMT = 'bruker-arbeidsledig-situasjonsbestemt',
    ARBEIDSLEDIG_SPESIELT_TILPASSET = 'bruker-arbeidsledig-spesielt-tilpasset',
    UTENFOR_MAALGRUPPE = 'bruker-utenfor-maalgruppe',
}

export const MAAL_OPTIONS_REKKEFOLGE = [
    MaalOption.SAMME_STILLING,
    MaalOption.SAMME_ARBEIDSGIVER,
    MaalOption.NY_ARBEIDSGIVER,
    MaalOption.USIKKER,
];

export enum SituasjonOption {
    UBESTEMT = 'situasjonoption-ubestemt',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'situasjonoption-sykmeldt-utenarbeidsgiver',
    SITUASJONSBESTEMT = 'BFORM',
    SPESIELT_TILPASSET = 'BATT',
}

interface TiltakMap {
    // Sykmeldt med arbeidsgiver
    [MaalOption.SAMME_STILLING]: TiltakId[];
    [MaalOption.SAMME_ARBEIDSGIVER]: TiltakId[];
    [MaalOption.NY_ARBEIDSGIVER]: TiltakId[];
    [MaalOption.USIKKER]: TiltakId[];

    // Sykmeldt uten arbeidsgiver
    [SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER]: TiltakId[];

    // Ikke sykmeldt
    [SituasjonOption.SITUASJONSBESTEMT]: TiltakId[];
    [SituasjonOption.SPESIELT_TILPASSET]: TiltakId[];
}

export const tiltakMap: TiltakMap = {
    // Sykmeldt med arbeidsgiver
    [MaalOption.SAMME_STILLING]: [TiltakId.TILRETTELEGGING, TiltakId.ARBEIDSRETTET_REHABILITERING],
    [MaalOption.SAMME_ARBEIDSGIVER]: [TiltakId.MENTOR, TiltakId.OPPLAERING_SAMME_ARBEIDSGIVER],
    [MaalOption.NY_ARBEIDSGIVER]: [TiltakId.OPPLAERING_NY_ARBEIDSGIVER, TiltakId.OPPFOLGING],
    [MaalOption.USIKKER]: [TiltakId.AVKLARING, TiltakId.ARBEIDSRETTET_REHABILITERING],

    // Sykmeldt uten arbeidsgiver
    [SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER]: [TiltakId.LONNSTILSKUDD_SYKMELDT, TiltakId.OPPFOLGING],

    // Ikke sykmeldt
    [SituasjonOption.SITUASJONSBESTEMT]: [TiltakId.LONNSTILSKUDD_ARBEIDSLEDIG, TiltakId.OPPFOLGING],
    [SituasjonOption.SPESIELT_TILPASSET]: [TiltakId.OPPLAERING_NY_ARBEIDSGIVER, TiltakId.AVKLARING]
};