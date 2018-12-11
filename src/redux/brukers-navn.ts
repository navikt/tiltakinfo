import * as Api from '../api/api';
import { AppState } from './reducer';
import {
    ActionType,
    HentBrukersNavnFEILETAction,
    HentBrukersNavnOKAction,
    HentBrukersNavnPENDINGAction,
} from './actions';
import { fetchThenDispatch } from '../api/fetch-utils';
import { Status } from '../api/datalaster';

export interface State {
    data: Data;
    status: string;
}

export interface Data {
    name?: string;
}

interface Action {
    type: ActionType;
    data: Data;
}

const initialState = {
    data: {},
    status: Status.IKKE_STARTET
};

export default function (state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionType.HENT_BRUKERS_NAVN_PENDING:
            if (state.status === Status.OK) {
                return {...state, status: Status.RELASTER};
            }
            return {...state, status: Status.LASTER};
        case ActionType.HENT_BRUKERS_NAVN_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_BRUKERS_NAVN_OK: {
            return {...state, status: Status.OK, data: action.data};
        }
        default:
            return state;
    }
}

export function hentBrukernavn() {
    return fetchThenDispatch(() => Api.hentBrukersNavn(), {
        ok: hentBrukernavnOk,
        feilet: hentBrukernavnFeilet,
        pending: hentBrukernavnPending,
    });
}

export function selectBrukersNavn(state: AppState): State {
    return state.brukersNavn;
}

interface Bruker {
    navn: string;
}

function hentBrukernavnOk(bruker: Bruker): HentBrukersNavnOKAction {
    return {
        type: ActionType.HENT_BRUKERS_NAVN_OK,
        brukernavn: bruker.navn
    };
}

function hentBrukernavnFeilet(): HentBrukersNavnFEILETAction {
    return {
        type: ActionType.HENT_BRUKERS_NAVN_FEILET,
    };
}

function hentBrukernavnPending(): HentBrukersNavnPENDINGAction {
    return {
        type: ActionType.HENT_BRUKERS_NAVN_PENDING,
    };
}
