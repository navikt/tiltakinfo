import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import syfoReducer, { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import brukersNavn, { State as BrukersNavnState } from '../brukerdata/brukernavn-duck';
import { MeldingNavKontorState } from '../brukerdata/melding-nav-kontor-duck';
import oppfolgingReducer, { OppfolgingState } from '../brukerdata/oppfolging-duck';
import registreringReducer, { RegistreringState } from '../brukerdata/registrering-duck';
import oppfolgingsstatusReducer, { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import {
    brukerDuck,
    BrukerState,
    demoBrukerDuck,
    DemoBrukerState, initialDemoBrukerState,
    initialMaalState,
    maalDuck,
    MaalState,
    tiltakDuck,
    TiltakState
} from './generic-reducers';
import meldingNavKontorReducer from '../brukerdata/melding-nav-kontor-duck';

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
    maal: MaalState;
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    demobruker: DemoBrukerState;
    registrering: RegistreringState;
    brukersNavn: BrukersNavnState;
    harSendtMelding: MeldingNavKontorState;
    tiltak: TiltakState;
    bruker: BrukerState;
}

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    oppfolgingsstatus: oppfolgingsstatusReducer,
    syfoSituasjon: syfoReducer,
    registrering: registreringReducer,
    maal: persistent('maalState', location, maalDuck.reducer, initialMaalState),
    demobruker: persistent('demoBrukerState', location, demoBrukerDuck.reducer, initialDemoBrukerState),
    brukersNavn,
    tiltak: tiltakDuck.reducer,
    bruker: brukerDuck.reducer,
    harSendtMelding: meldingNavKontorReducer,
});
