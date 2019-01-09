import {
    ActionType,
    Handling,
    LagreBrukerFEILETAction,
    LagreBrukerOKAction,
    LagreBrukerPENDINGAction,
} from '../redux/actions';
import { postBrukerFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { Dispatch } from '../redux/dispatch-type';
import { TiltakId } from '../startside/tiltak/tiltak-config';

export const initialState: DataElement = {
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: DataElement = initialState, action: Handling): DataElement {
    switch (action.type) {
        case ActionType.LAGRE_BRUKER_OK:
            return {...state, status: Status.OK};
        case ActionType.LAGRE_BRUKER_PENDING:
            return {...state, status: Status.LASTER};
        case ActionType.LAGRE_BRUKER_FEILET:
            return {...state, status: Status.FEILET};
        default:
            return state;
    }
}

export function lagreBruker(bruker: User): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<User>(() => postBrukerFetch(bruker), {
        ok: lagreBrukerOK,
        feilet: lagreBrukerFEILET,
        pending: lagreBrukerPENDING,
    });
}

function lagreBrukerOK(lagretBruker: User): LagreBrukerOKAction {
    return {
        type: ActionType.LAGRE_BRUKER_OK,
        lagretBruker,
    };
}

function lagreBrukerFEILET(): LagreBrukerFEILETAction {
    return {
        type: ActionType.LAGRE_BRUKER_FEILET,
    };
}

function lagreBrukerPENDING(): LagreBrukerPENDINGAction {
    return {
        type: ActionType.LAGRE_BRUKER_PENDING,
    };
}

export interface Tiltak {
    nokkel?: TiltakId;
}

export interface User {
    erSykmeldt: boolean;
    harArbeidsgiver: boolean;
    servicegruppeKode: string;
    oppfolgingsEnhetId: string;
    underOppfolging: boolean;
    maal: string;
    tiltak: Tiltak[];
}
