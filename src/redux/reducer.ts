import { combineReducers } from 'redux';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../oppfolging/oppfolging-duck';
import statusReducer, { StatusState } from '../status/status-duck';
import sykmeldingerReducer, { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';
import { ActionType } from './actions';
import { MAAL_OPTION, MAAL_OPTIONS_REKKEFOLGE } from '../startside/maal-tiltak-map';
import genericDuck from './generic-duck';

interface MaalState {
    id: MAAL_OPTION;
}

export const maalDuck = genericDuck<MaalState, ActionType.SETT_MAAL>(
    {id: MAAL_OPTIONS_REKKEFOLGE[0]},
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
    maal: maalDuck.reducer,
});
