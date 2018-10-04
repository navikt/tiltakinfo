import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../brukerdata/oppfolging-duck';
import statusReducer, { StatusState } from '../status/status-duck';
import arbeidsledigReducer, { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import syfoReducer, { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { ActionType } from './actions';
import { MaalOption } from '../startside/tiltak-map';
import genericDuck from './generic-duck';

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

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
    status: StatusState;
    maal: MaalState;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
}

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    status: statusReducer,
    arbeidsledigSituasjon: arbeidsledigReducer,
    syfoSituasjon: syfoReducer,
    maal: persistent('maalState', location, maalDuck.reducer, initialMaalState),
});
