import { combineReducers } from 'redux';
import unleashReducer, { UnleashState } from '../unleash/unleash-duck';
import oppfolgingReducer, { OppfolgingState } from '../oppfolging/oppfolging-duck';
import statusReducer, { StatusState } from '../status/status-duck';
import arbeidsforholdReducer, { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';

export interface AppState {
    unleash: UnleashState;
    oppfolging: OppfolgingState;
    status: StatusState;
    arbeidsforhold: ArbeidsforholdState;
}

export const reducer = combineReducers<AppState>({
    unleash: unleashReducer,
    oppfolging: oppfolgingReducer,
    status: statusReducer,
    arbeidsforhold: arbeidsforholdReducer,
});
