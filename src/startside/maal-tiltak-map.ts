import { TiltakId } from './tiltak-config';

export enum MAAL_OPTION {
    IKKE_VALGT = 'ingress-maal-ikkevalgt',
    SAMME_STILLING = 'ingress-maal-samme-stilling',
    SAMME_ARBEIDSGIVER = 'ingress-maal-samme-arbeidsgiver',
    NY_ARBEIDSGIVER = 'ingress-maal-ny-arbeidsgiver',
    USIKKER = 'ingress-maal-usikker',
}

export const MAAL_OPTIONS_REKKEFOLGE = [
    MAAL_OPTION.IKKE_VALGT,
    MAAL_OPTION.SAMME_STILLING,
    MAAL_OPTION.SAMME_ARBEIDSGIVER,
    MAAL_OPTION.NY_ARBEIDSGIVER,
    MAAL_OPTION.USIKKER,
];

export const maalTiltakMap = {
    [MAAL_OPTION.SAMME_STILLING]: [TiltakId.TILRETTELEGGING, TiltakId.ARBEIDSRETTET_REHABILITERING],
    [MAAL_OPTION.SAMME_ARBEIDSGIVER]: [TiltakId.MENTOR, TiltakId.OPPLAERING_SAMME_ARBEIDSGIVER],
    [MAAL_OPTION.NY_ARBEIDSGIVER]: [TiltakId.OPPLAERING_NY_ARBEIDSGIVER, TiltakId.OPPFOLGING],
    [MAAL_OPTION.USIKKER]: [TiltakId.AVKLARING, TiltakId.ARBEIDSRETTET_REHABILITERING],
};