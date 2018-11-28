import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../brukerdata/oppfolging-duck';
import oppfolgingsstatusReducer, { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import syfoReducer, { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { ActionType } from './actions';
import { MaalOption } from '../startside/tiltak-map';
import genericDuck from './generic-duck';
import { Bruker } from '../mock/mock-data-config';

export interface MaalState {
    id: MaalOption;
}

const initialMaalState: MaalState = {
    id: MaalOption.IKKE_VALGT
};

export const maalDuck = genericDuck<MaalState, ActionType.SETT_MAAL>(
    initialMaalState,
    ActionType.SETT_MAAL
);

export interface DemoBrukerState {
    id: Bruker;
}

const initialDemoBrukerState: DemoBrukerState = {
    id: Bruker.DEFAULT_MOCK,
};

export const demoBrukerDuck = genericDuck<DemoBrukerState, ActionType.SETT_BRUKERTYPE>(
    initialDemoBrukerState,
    ActionType.SETT_BRUKERTYPE
);

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
    maal: MaalState;
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    demobruker: DemoBrukerState;
}

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    oppfolgingsstatus: oppfolgingsstatusReducer,
    syfoSituasjon: syfoReducer,
    maal: persistent('maalState', location, maalDuck.reducer, initialMaalState),
    demobruker: persistent('demoBrukerState', location, demoBrukerDuck.reducer, initialDemoBrukerState),
});
