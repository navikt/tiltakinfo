import { TiltakId } from './tiltak-config';

export enum MaalOption {
    IKKE_VALGT = 'ingress-maal-ikkevalgt',
    SAMME_STILLING = 'ingress-maal-samme-stilling',
    SAMME_ARBEIDSGIVER = 'ingress-maal-samme-arbeidsgiver',
    NY_ARBEIDSGIVER = 'ingress-maal-ny-arbeidsgiver',
    USIKKER = 'ingress-maal-usikker',
}

export const MAAL_OPTIONS_REKKEFOLGE = [
    MaalOption.IKKE_VALGT,
    MaalOption.SAMME_STILLING,
    MaalOption.SAMME_ARBEIDSGIVER,
    MaalOption.NY_ARBEIDSGIVER,
    MaalOption.USIKKER,
];

export const maalTiltakMap = {
    [MaalOption.IKKE_VALGT]: [TiltakId.TOMT_TILTAK],
    [MaalOption.SAMME_STILLING]: [TiltakId.TILRETTELEGGING, TiltakId.ARBEIDSRETTET_REHABILITERING],
    [MaalOption.SAMME_ARBEIDSGIVER]: [TiltakId.MENTOR, TiltakId.OPPLAERING_SAMME_ARBEIDSGIVER],
    [MaalOption.NY_ARBEIDSGIVER]: [TiltakId.OPPLAERING_NY_ARBEIDSGIVER, TiltakId.OPPFOLGING],
    [MaalOption.USIKKER]: [TiltakId.AVKLARING, TiltakId.ARBEIDSRETTET_REHABILITERING]
};
