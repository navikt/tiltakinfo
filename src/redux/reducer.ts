import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import syfoReducer, { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import brukersNavn, { State as BrukersNavnState } from '../brukerdata/brukernavn-duck';
import { MeldingTilNavKontorState } from '../brukerdata/melding-til-nav-kontor-duck';
import oppfolgingReducer, { OppfolgingState } from '../brukerdata/oppfolging-duck';
import registreringReducer, { RegistreringState } from '../brukerdata/registrering-duck';
import oppfolgingsstatusReducer, { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import {
    brukertypeDuck,
    BrukertypeState,
    demoBrukerDuck,
    DemoBrukerState, initialDemoBrukerState,
    initialMaalState,
    maalDuck,
    MaalState,
    tiltakDuck,
    TiltakState
} from './generic-reducers';
import meldingTilNavKontorReducer from '../brukerdata/melding-til-nav-kontor-duck';
import { MaalOption } from '../komponenter/tiltak/tiltak-map';
import { Bruker } from '../mock/mock-data-config';

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
    maal: MaalState;
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    demobruker: DemoBrukerState;
    registrering: RegistreringState;
    brukersNavn: BrukersNavnState;
    harSendtMelding: MeldingTilNavKontorState;
    tiltak: TiltakState;
    brukertype: BrukertypeState;
}

const verdiErGyldig = (verdi: string, gyldigeVerdier: any) => { // tslint:disable-line:no-any
    return Object.keys(gyldigeVerdier).map(key => gyldigeVerdier[key]).some(value => value === verdi);
};

const maalStateIsValid = (storageState: MaalState): boolean => {
    return storageState && storageState.id && verdiErGyldig(storageState.id, MaalOption);
};

const demoBrukerStateIsValid = (storageState: DemoBrukerState): boolean => {
    return storageState && storageState.id && verdiErGyldig(storageState.id, Bruker);
};

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    oppfolgingsstatus: oppfolgingsstatusReducer,
    syfoSituasjon: syfoReducer,
    registrering: registreringReducer,
    maal: persistent<MaalState>('maalState', location, maalDuck.reducer, initialMaalState, maalStateIsValid),
    demobruker: persistent<DemoBrukerState>('demoBrukerState', location, demoBrukerDuck.reducer, initialDemoBrukerState, demoBrukerStateIsValid),
    brukersNavn,
    tiltak: tiltakDuck.reducer,
    brukertype: brukertypeDuck.reducer,
    harSendtMelding: meldingTilNavKontorReducer,
});
