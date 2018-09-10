export enum TiltakId {
    LONNSTILSKUDD = 'tiltak-lonnstilskudd',
    OPPFOLGING = 'tiltak-oppfolging',
    TILRETTELEGGING = 'tiltak-tilrettelegging',
    ARBEIDSRETTET_REHABILITERING = 'tiltak-arbeidsrettet-rehabilitering',
    MENTOR = 'tiltak-mentor',
    OPPLAERING_SAMME_ARBEIDSGIVER = 'tiltak-opplaering-samme-arbeidsgiver',
    OPPLAERING_NY_ARBEIDSGIVER = 'tiltak-opplaering-ny-arbeidsgiver',
    AVKLARING = 'tiltak-avklaring',
    TOMT_TILTAK = 'tiltak-tomt',
}

export interface Tiltak {
    tittel: string;
    hva: string;
    lesmer: string;
    ekspandertinfo: string;
    ikon: any; // tslint:disable-line:no-any
    url: string;
}

export default (tiltakId: TiltakId): Tiltak => {
    switch (tiltakId) {
        case TiltakId.LONNSTILSKUDD:
            return {
                tittel: 'tiltak-lonnstilskudd-tittel',
                hva: 'tiltak-lonnstilskudd-hva',
                lesmer: 'tiltak-lonnstilskudd-lesmer',
                ekspandertinfo: 'tiltak-lonnstilskudd-ekspandertinfo',
                ikon: require('../ikoner/lonnstilskudd.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Tilskudd+til+lonnsutgifter', // tslint:disable-line:max-line-length
            };
        case TiltakId.OPPFOLGING:
            return {
                tittel: 'tiltak-oppfolging-tittel',
                hva: 'tiltak-oppfolging-hva',
                lesmer: 'tiltak-oppfolging-lesmer',
                ekspandertinfo: 'tiltak-oppfolging-ekspandertinfo',
                ikon: require('../ikoner/oppfolging.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/oppf%C3%B8lging', // tslint:disable-line:max-line-length
            };
        case TiltakId.TILRETTELEGGING:
            return {
                tittel: 'tiltak-tilrettelegging-tittel',
                hva: 'tiltak-tilrettelegging-hva',
                lesmer: 'tiltak-tilrettelegging-lesmer',
                ekspandertinfo: 'tiltak-tilrettelegging-ekspandertinfo',
                ikon: require('../ikoner/tilrettelegging.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Tilrettelegging', // tslint:disable-line:max-line-length
            };
        case TiltakId.ARBEIDSRETTET_REHABILITERING:
            return {
                tittel: 'tiltak-arbeidsrettet-rehabilitering-tittel',
                hva: 'tiltak-arbeidsrettet-rehabilitering-hva',
                lesmer: 'tiltak-arbeidsrettet-rehabilitering-lesmer',
                ekspandertinfo: 'tiltak-arbeidsrettet-rehabilitering-ekspandertinfo',
                ikon: require('../ikoner/arbeidsrettet-rehabilitering.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Arbeidsrettet+rehabilitering', // tslint:disable-line:max-line-length
            };
        case TiltakId.MENTOR:
            return {
                tittel: 'tiltak-mentor-tittel',
                hva: 'tiltak-mentor-hva',
                lesmer: 'tiltak-mentor-lesmer',
                ekspandertinfo: 'tiltak-mentor-ekspandertinfo',
                ikon: require('../ikoner/mentor.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/mentor', // tslint:disable-line:max-line-length
            };
        case TiltakId.OPPLAERING_SAMME_ARBEIDSGIVER:
            return {
                tittel: 'tiltak-opplaering-tittel',
                hva: 'tiltak-opplaering-samme-arbeidsgiver-hva',
                lesmer: 'tiltak-opplaering-lesmer',
                ekspandertinfo: 'tiltak-opplaering-samme-arbeidsgiver-ekspandertinfo',
                ikon: require('../ikoner/opplaering.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Kvalifisering', // tslint:disable-line:max-line-length
            };
        case TiltakId.OPPLAERING_NY_ARBEIDSGIVER:
            return {
                tittel: 'tiltak-opplaering-tittel',
                hva: 'tiltak-opplaering-ny-arbeidsgiver-hva',
                lesmer: 'tiltak-opplaering-lesmer',
                ekspandertinfo: 'tiltak-opplaering-ny-arbeidsgiver-ekspandertinfo',
                ikon: require('../ikoner/opplaering.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Kvalifisering', // tslint:disable-line:max-line-length
            };
        case TiltakId.AVKLARING:
            return {
                tittel: 'tiltak-avklaring-tittel',
                hva: 'tiltak-avklaring-hva',
                lesmer: 'tiltak-avklaring-lesmer',
                ekspandertinfo: 'tiltak-avklaring-ekspandertinfo',
                ikon: require('../ikoner/avklaring.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/avklaring--894', // tslint:disable-line:max-line-length
            };
        case TiltakId.TOMT_TILTAK:
            return {
                tittel: '',
                hva: '',
                lesmer: '',
                ekspandertinfo: '',
                ikon: '',
                url: '',
            };
        default:
            return {
                tittel: 'tiltak-oppfolging-tittel',
                hva: 'tiltak-oppfolging-hva',
                lesmer: 'tiltak-oppfolging-lesmer',
                ekspandertinfo: 'tiltak-oppfolging-ekspandertinfo',
                ikon: require('../ikoner/oppfolging.svg'),
                url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/oppf%C3%B8lging', // tslint:disable-line:max-line-length
            };
    }
};
