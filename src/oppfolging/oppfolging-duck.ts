import {
    ActionType,
    Handling,
    HentOppfolgingFEILETAction,
    HentOppfolgingOKAction,
    HentOppfolgingPENDINGAction, Status,
} from '../redux/actions';
import { Dispatch } from '../types';
import { getOppfolgingFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';

export interface OppfolgingState {
    underOppfolging: boolean;
    status: Status;
}

export const initialState: OppfolgingState = {
    underOppfolging: false,
    status: Status.PENDING,
};

//  Reducer
export default function reducer(state: OppfolgingState = initialState, action: Handling): OppfolgingState {
    switch (action.type) {
        case ActionType.HENT_OPPFOLGING_OK:
            return {...state, status: Status.OK, underOppfolging: action.oppfolging.underOppfolging};
        case ActionType.HENT_OPPFOLGING_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_OPPFOLGING_PENDING:
            return {...state, status: Status.PENDING};
        default:
            return state;
    }
}

export function hentOppfolging(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<OppfolgingState>(() => getOppfolgingFetch(), {
        ok: hentOppfolgingOk,
        feilet: hentOppfolgingFeilet,
        pending: hentOppfolgingPending,
    });
}

function hentOppfolgingOk(oppfolging: OppfolgingState): HentOppfolgingOKAction {
    return {
        type: ActionType.HENT_OPPFOLGING_OK,
        oppfolging: oppfolging
    };
}

function hentOppfolgingFeilet(): HentOppfolgingFEILETAction {
    return {
        type: ActionType.HENT_OPPFOLGING_FEILET,
    };
}

function hentOppfolgingPending(): HentOppfolgingPENDINGAction {
    return {
        type: ActionType.HENT_OPPFOLGING_PENDING,
    };
}