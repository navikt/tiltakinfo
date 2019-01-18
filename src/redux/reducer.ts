import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import syfoReducer, { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import brukersNavn, { State as BrukersNavnState } from '../brukerdata/brukernavn-duck';
import meldingTilNavKontorReducer, { MeldingTilNavKontorState } from '../brukerdata/melding-til-nav-kontor-duck';
import meldingTilDialogReducer from '../brukerdata/melding-til-veileder-duck';
import oppfolgingReducer, { OppfolgingState } from '../brukerdata/oppfolging-duck';
import registreringReducer, { RegistreringState } from '../brukerdata/registrering-duck';
import oppfolgingsstatusReducer, { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { DataElement } from '../api/datalaster';
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
    meldingTilDialog: DataElement;
    tiltak: TiltakState;
    brukertype: BrukertypeState;
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
    brukertype: brukertypeDuck.reducer,
    harSendtMelding: meldingTilNavKontorReducer,
    meldingTilDialog: meldingTilDialogReducer,
});
