import { MaalOption } from './komponenter/tiltak/tiltak-map';
import { TiltakId } from './komponenter/tiltak/tiltak-config';
import { erDemo } from './mock/utils';
import { ServicegruppeKode } from './brukerdata/oppfolgingsstatus-duck';

const w = (window as any); // tslint:disable-line:no-any
const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };
const domene = 'tiltakinfo';

export const brukerMetrikk = (
    servicegruppekode: ServicegruppeKode,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    underOppfolging: boolean,
    oppfolgingsEnhetId: string,
    oppfolgingsEnhetNavn: string
): void => {
    if (!erDemo()) {
        logEvent(`${domene}.bruker`, {}, {
            servicegruppekode,
            harArbeidsgiverIAktiveSykmeldinger,
            erTiltakSykmeldteInngangAktiv,
            underOppfolging,
            oppfolgingsEnhetId,
            oppfolgingsEnhetNavn,
        });
    }
};

export const klikkPaMaalMetrikk = (maal: string) => {
    if (!erDemo()) {
        logEvent(`${domene}.maal`, {}, {maal});
    }
};

export const klikkPaLesMerMetrikkMedMaal = (maal: MaalOption, tiltak: TiltakId) => {
    if (!erDemo()) {
        logEvent(`${domene}.lesmermedmaal`, {}, {maal, tiltak});
    }
};

export const klikkPaLesMerMetrikk = (tiltak: TiltakId) => {
    if (!erDemo()) {
        logEvent(`${domene}.lesmer`, {}, {tiltak});
    }
};

export const klikkPaFortellMegMerMetrikk = () => {
    if (!erDemo()) {
        logEvent(`${domene}.fortellmegmer`, {}, {});
    }
};

export const klikkPaGaTilAktivitetsplanen = (oppfolgingsEnhetId: string) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilaktivitetsplanen`, {}, {oppfolgingsEnhetId});
    }
};

export const klikkPaKontaktNavKontor = (
    servicegruppekode: ServicegruppeKode,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    oppfolgingsEnhetId: string,
    oppfolgingsEnhetNavn: string
) => {
    if (!erDemo()) {
        logEvent(`${domene}.kontaktnavkontor`, {}, {
            servicegruppekode,
            harArbeidsgiverIAktiveSykmeldinger,
            erTiltakSykmeldteInngangAktiv,
            oppfolgingsEnhetId,
            oppfolgingsEnhetNavn,
        });
    }
};

export const klikkPaKontaktVeileder = (
    servicegruppekode: ServicegruppeKode,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    oppfolgingsEnhetId: string,
    oppfolgingsEnhetNavn: string
) => {
    if (!erDemo()) {
        logEvent(`${domene}.kontaktveileder`, {}, {
            servicegruppekode,
            harArbeidsgiverIAktiveSykmeldinger,
            erTiltakSykmeldteInngangAktiv,
            oppfolgingsEnhetId,
            oppfolgingsEnhetNavn,
        });
    }
};

export const klikkPaSendMeldingNavBaerum = (
    servicegruppekode: ServicegruppeKode,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    oppfolgingsEnhetId: string,
    oppfolgingsEnhetNavn: string
) => {
    if (!erDemo()) {
        logEvent(`${domene}.sendmelding`, {}, {
            servicegruppekode,
            harArbeidsgiverIAktiveSykmeldinger,
            erTiltakSykmeldteInngangAktiv,
            oppfolgingsEnhetId,
            oppfolgingsEnhetNavn,
        });
    }
};

export const klikkPaSendMeldingVeileder = (
    servicegruppekode: ServicegruppeKode,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    oppfolgingsEnhetId: string,
    oppfolgingsEnhetNavn: string
) => {
    if (!erDemo()) {
        logEvent(`${domene}.sendmeldingveileder`, {}, {
            servicegruppekode,
            harArbeidsgiverIAktiveSykmeldinger,
            erTiltakSykmeldteInngangAktiv,
            oppfolgingsEnhetId,
            oppfolgingsEnhetNavn,
        });
    }
};
