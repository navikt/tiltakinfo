import { Dispatch as ReduxDispatch } from 'redux';
import { AppState } from './redux/reducer';

export interface Dispatch extends ReduxDispatch<AppState> {
}
