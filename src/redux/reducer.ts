import { combineReducers } from 'redux';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../oppfolging/oppfolging-duck';

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
}

export default combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
});
