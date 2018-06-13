import { combineReducers } from 'redux';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';

export interface AppState {
    unleash: UnleashState;
}

export default combineReducers<AppState>({
    unleash: unleashReducer,
});
