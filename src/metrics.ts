import { MaalOption, SituasjonOption } from './startside/tiltak-map';
import { TiltakId } from './startside/tiltak-config';

const logEvent = (window as any).frontendlogger.event; // tslint:disable-line:no-any

const domene = 'tiltakinfo';

export const brukerMetrikk = (
    servicegruppekode: SituasjonOption,
    harArbeidsgiverIAktiveSykmeldinger: boolean,
    erTiltakSykmeldteInngangAktiv: boolean,
    underOppfolging: boolean
): void => {
    logEvent(`${domene}.bruker`, {}, {
        servicegruppekode,
        harArbeidsgiverIAktiveSykmeldinger,
        erTiltakSykmeldteInngangAktiv,
        underOppfolging
    });
};

export const klikkPaMaalMetrikk = (maal: MaalOption) => {
    logEvent(`${domene}.maal`, {}, {maal});
};

export const klikkPaLesMerMetrikkMedMaal = (maal: MaalOption, tiltak: TiltakId) => {
    logEvent(`${domene}.lesmer`, {}, {maal, tiltak});
};

export const klikkPaLesMerMetrikk = (tiltak: TiltakId) => {
    logEvent(`${domene}.lesmer`, {}, {tiltak});
};

export const klikkPaFortellMegMerMetrikk = () => {
    logEvent(`${domene}.fortellmegmer`);
};

export const klikkPaGaTilAktivitetsplanen = () => {
    console.log('klikk');
    logEvent(`${domene}.gatilaktivitetsplanen`);
};