import { combineReducers } from 'redux';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../oppfolging/oppfolging-duck';
import statusReducer, { StatusState } from '../status/status-duck';
import sykmeldingerReducer, { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';
import { ActionType } from './actions';
import { MaalOption } from '../startside/maal-tiltak-map';
import genericDuck from './generic-duck';

interface MaalState {
    id: MaalOption;
}

export const maalDuck = genericDuck<MaalState, ActionType.SETT_MAAL>(
    {id: MaalOption.IKKE_VALGT},
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
