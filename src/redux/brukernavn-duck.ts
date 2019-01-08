import * as Api from '../api/api';
import {
    ActionType, Handling,
    HentBrukersNavnFEILETAction,
    HentBrukersNavnOKAction,
    HentBrukersNavnPENDINGAction,
} from './actions';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export interface Data {
    name?: string;
}

export interface State extends DataElement {
    data: Data;
}

const initialState: State = {
    data: {},
    status: Status.IKKE_STARTET
};

export default function (state: State = initialState, action: Handling): State {
    switch (action.type) {
        case ActionType.HENT_BRUKERS_NAVN_PENDING:
            return {...state, status: Status.LASTER};
        case ActionType.HENT_BRUKERS_NAVN_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_BRUKERS_NAVN_OK: {
            return {...state, status: Status.OK, data: {name: action.name}};
        }
        default:
            return state;
    }
}

export function hentBrukernavn() {
    return fetchThenDispatch(() => Api.getBrukersNavn(), {
        ok: hentBrukernavnOk,
        feilet: hentBrukernavnFeilet,
        pending: hentBrukernavnPending,
    });
}

interface Bruker {
    name: string;
}

function hentBrukernavnOk(bruker: Bruker): HentBrukersNavnOKAction {
    return {
        type: ActionType.HENT_BRUKERS_NAVN_OK,
        name: bruker.name
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
