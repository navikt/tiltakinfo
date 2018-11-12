import { SituasjonOption } from './startside/tiltak-map';

const w = (window as any); // tslint:disable-line:no-any

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

export const userMetric = (
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