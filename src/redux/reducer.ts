import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import syfoReducer, { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import brukersNavnReducer, { BrukersNavnState } from '../brukerdata/brukernavn-duck';
import meldingTilNavKontorReducer, { MeldingTilNavKontorState } from '../brukerdata/melding-til-nav-kontor-duck';
import meldingTilDialogReducer from '../brukerdata/melding-til-veileder-duck';
import oppfolgingReducer, { OppfolgingState } from '../brukerdata/oppfolging-duck';
import registreringReducer, { RegistreringState } from '../brukerdata/registrering-duck';
import oppfolgingsstatusReducer, { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { DataElement } from '../api/datalaster';
import { MaalOption } from '../komponenter/tiltak/tiltak-map';
import { Bruker } from '../mock/mock-data-config';
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
    brukersNavn: brukersNavnReducer,
    tiltak: tiltakDuck.reducer,
    brukertype: brukertypeDuck.reducer,
    harSendtMelding: meldingTilNavKontorReducer,
    meldingTilDialog: meldingTilDialogReducer,
});
