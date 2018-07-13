import { combineReducers } from 'redux';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../oppfolging/oppfolging-duck';
import statusReducer, { StatusState } from '../status/status-duck';
import arbeidsforholdReducer, { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import genericDuck from './generic-duck';
import { ActionType } from './actions';

interface MaalState {
    maal: string;
}

export const maalDuck = genericDuck<MaalState, ActionType.SETT_MAAL>({maal: ''}, ActionType.SETT_MAAL);

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
    status: StatusState;
    arbeidsforhold: ArbeidsforholdState;
    maal: MaalState;
}

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    status: statusReducer,
    arbeidsforhold: arbeidsforholdReducer,
    maal: maalDuck.reducer,
});
