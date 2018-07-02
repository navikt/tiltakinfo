import {
    ActionType,
    Handling,
    HentStatusFEILETAction,
    HentStatusLASTERAction,
    HentStatusOKAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { getStatusFetch } from '../api/api';
import { DataElement, Status } from '../api/datalaster';

export interface StatusState extends DataElement {
    harGyldigOidcToken: boolean;
}

export const initialState: StatusState = {
    harGyldigOidcToken: false,
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: StatusState = initialState, action: Handling): StatusState {
    switch (action.type) {
        case ActionType.HENT_STATUS_OK:
            return {
                harGyldigOidcToken: action.status.harGyldigOidcToken,
                status: Status.OK,
            };
        case ActionType.HENT_STATUS_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_STATUS_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentStatus(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<StatusState>(() => getStatusFetch(), {
        ok: hentStatusOK,
        feilet: hentStatusFEILET,
        pending: hentStatusLASTER,
    });
}

function hentStatusOK(status: StatusState): HentStatusOKAction {
    return {
        type: ActionType.HENT_STATUS_OK,
        status,
    };
}

function hentStatusFEILET(): HentStatusFEILETAction {
    return {
        type: ActionType.HENT_STATUS_FEILET,
    };
}

function hentStatusLASTER(): HentStatusLASTERAction {
    return {
        type: ActionType.HENT_STATUS_LASTER,
    };
}
