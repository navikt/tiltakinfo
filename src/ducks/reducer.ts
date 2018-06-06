import { combineReducers } from 'redux';

export interface AppState {
    dummy: void;
}

export default combineReducers<AppState>({
    dummy: () => null
});
