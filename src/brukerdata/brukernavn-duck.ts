import * as Api from '../api/api';
import {
    ActionType, Handling, HentBrukersNavnFEILETAction, HentBrukersNavnOKAction, HentBrukersNavnPENDINGAction,
} from '../redux/actions';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export interface BrukersNavnData {
    sammensattNavn: string;
}

export interface BrukersNavnState extends DataElement {
    fulltNavn: string;
}

const initialState: BrukersNavnState = {
    fulltNavn: '',
    status: Status.IKKE_STARTET
};

export default function reducer(state: BrukersNavnState = initialState, action: Handling): BrukersNavnState {
    switch (action.type) {
        case ActionType.HENT_BRUKERS_NAVN_PENDING:
            return {...state, status: Status.LASTER};
        case ActionType.HENT_BRUKERS_NAVN_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_BRUKERS_NAVN_OK: {
            return {
                ...state,
                status: Status.OK,
                fulltNavn: action.brukernavn.sammensattNavn};
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

function hentBrukernavnOk(brukernavnData: BrukersNavnData): HentBrukersNavnOKAction {
    return {
        type: ActionType.HENT_BRUKERS_NAVN_OK,
        brukernavn: brukernavnData
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
