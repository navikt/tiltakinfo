import { MaalOption, SituasjonOption } from './startside/tiltak-map';
import { TiltakId } from './startside/tiltak-config';

const w = (window as any); // tslint:disable-line:no-any

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'tiltakinfo';

export const brukerMetrikk = (
    servicegruppekode: SituasjonOption,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    underOppfolging: boolean,
    oppfolgingsEnhetId: string,
    oppfolgingsEnhetNavn: string
): void => {
    logEvent(`${domene}.bruker`, {oppfolgingsEnhetNavn}, {
        servicegruppekode,
        harArbeidsgiverIAktiveSykmeldinger,
        erTiltakSykmeldteInngangAktiv,
        underOppfolging,
        oppfolgingsEnhetId,
    });
};

export const klikkPaMaalMetrikk = (maal: MaalOption) => {
    logEvent(`${domene}.maal`, {}, {maal});
};

export const klikkPaLesMerMetrikkMedMaal = (maal: MaalOption, tiltak: TiltakId) => {
    logEvent(`${domene}.lesmermedmaal`, {}, {maal, tiltak});
};

export const klikkPaLesMerMetrikk = (tiltak: TiltakId) => {
    logEvent(`${domene}.lesmer`, {}, {tiltak});
};

export const klikkPaFortellMegMerMetrikk = () => {
    logEvent(`${domene}.fortellmegmer`, {}, {});
};

export const klikkPaGaTilAktivitetsplanen = () => {
    logEvent(`${domene}.gatilaktivitetsplanen`, {}, {});
};
