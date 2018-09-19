import { combineReducers } from 'redux';
import persistent from './persistent-reducer';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../oppfolging/oppfolging-duck';
import statusReducer, { StatusState } from '../status/status-duck';
import sykmeldingerReducer, { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';
import { ActionType } from './actions';
import { MaalOption } from '../startside/maal-tiltak-map';
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
    sykmeldinger: SykmeldingerState;
    maal: MaalState;
}

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    status: statusReducer,
    sykmeldinger: sykmeldingerReducer,
    maal: persistent('maalState', location, maalDuck.reducer, initialMaalState),
});
