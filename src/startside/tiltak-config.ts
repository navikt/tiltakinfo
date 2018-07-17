export enum TiltakId {
    LONNSTILSKUDD = 'tiltak-lonnstilskudd',
    OPPFOLGING = 'tiltak-oppfolging',
    TILRETTELEGGING = 'tiltak-tilrettelegging',
    ARBEIDSRETTET_REHABILITERING = 'tiltak-arbeidsrettet-rehabilitering',
    MENTOR = 'tiltak-mentor',
    OPPLAERING_SAMME_ARBEIDSGIVER = 'tiltak-opplaering-samme-arbeidsgiver',
    OPPLAERING_NY_ARBEIDSGIVER = 'tiltak-opplaering-ny-arbeidsgiver',
    AVKLARING = 'tiltak-avklaring',
}

export interface Tiltak {
    tittel: string;
    hva: string;
    lesmer: string;
    ikon: any; // tslint:disable-line:no-any
    url: string;
}

export const tomtTiltak: Tiltak = {
    tittel: '',
    hva: '',
    lesmer: '',
    ikon: '', // tslint:disable-line:no-any
    url: '',
};

export default (tiltakId: TiltakId): Tiltak => {
    switch (tiltakId) {
        case TiltakId.LONNSTILSKUDD:
            return {
                tittel: 'tiltak-lonnstilskudd-tittel',
                hva: 'tiltak-lonnstilskudd-hva',
                lesmer: 'tiltak-lonnstilskudd-lesmer',
                ikon: require('../ikoner/lonnstilskudd.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Tilskudd+til+lonnsutgifter', // tslint:disable-line:max-line-length
            };
        case TiltakId.OPPFOLGING:
            return {
                tittel: 'tiltak-oppfolging-tittel',
                hva: 'tiltak-oppfolging-hva',
                lesmer: 'tiltak-oppfolging-lesmer',
                ikon: require('../ikoner/oppfolging.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/oppf%C3%B8lging', // tslint:disable-line:max-line-length
            };
        case TiltakId.TILRETTELEGGING:
            return {
                tittel: 'tiltak-tilrettelegging-tittel',
                hva: 'tiltak-tilrettelegging-hva',
                lesmer: 'tiltak-tilrettelegging-lesmer',
                ikon: require('../ikoner/tilrettelegging.svg'),
                url: '', // tslint:disable-line:max-line-length
            };
        case TiltakId.ARBEIDSRETTET_REHABILITERING:
            return {
                tittel: 'tiltak-arbeidsrettet-rehabilitering-tittel',
                hva: 'tiltak-arbeidsrettet-rehabilitering-hva',
                lesmer: 'tiltak-arbeidsrettet-rehabilitering-lesmer',
                ikon: require('../ikoner/arbeidsrettet-rehabilitering.svg'),
                url: '', // tslint:disable-line:max-line-length
            };
        case TiltakId.MENTOR:
            return {
                tittel: 'tiltak-mentor-tittel',
                hva: 'tiltak-mentor-hva',
                lesmer: 'tiltak-mentor-lesmer',
                ikon: require('../ikoner/mentor.svg'),
                url: '', // tslint:disable-line:max-line-length
            };
        case TiltakId.OPPLAERING_SAMME_ARBEIDSGIVER:
            return {
                tittel: 'tiltak-opplaering-tittel',
                hva: 'tiltak-opplaering-samme-arbeidsgiver-hva',
                lesmer: 'tiltak-opplaering-lesmer',
                ikon: require('../ikoner/opplaering.svg'),
                url: '', // tslint:disable-line:max-line-length
            };
        case TiltakId.OPPLAERING_NY_ARBEIDSGIVER:
            return {
                tittel: 'tiltak-opplaering-tittel',
                hva: 'tiltak-opplaering-ny-arbeidsgiver-hva',
                lesmer: 'tiltak-opplaering-lesmer',
                ikon: require('../ikoner/opplaering.svg'),
                url: '', // tslint:disable-line:max-line-length
            };
        case TiltakId.AVKLARING:
            return {
                tittel: 'tiltak-avklaring-tittel',
                hva: 'tiltak-avklaring-hva',
                lesmer: 'tiltak-avklaring-lesmer',
                ikon: require('../ikoner/avklaring.svg'),
                url: '', // tslint:disable-line:max-line-length
            };
        default:
            return {
                tittel: 'tiltak-oppfolging-tittel',
                hva: 'tiltak-oppfolging-hva',
                lesmer: 'tiltak-oppfolging-lesmer',
                ikon: require('../ikoner/oppfolging.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/oppf%C3%B8lging', // tslint:disable-line:max-line-length
            };
    }
};