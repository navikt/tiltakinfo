import { SituasjonOption } from './startside/tiltak-map';

const logEvent = (window as any).frontendlogger.event; // tslint:disable-line:no-any

export const brukerMetrikk = (
    servicegruppekode: SituasjonOption,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    underOppfolging: boolean
): void => {
    logEvent('tiltakinfo.bruker', {}, {
        servicegruppekode,
        harArbeidsgiverIAktiveSykmeldinger,
        erTiltakSykmeldteInngangAktiv,
        underOppfolging
    });
};