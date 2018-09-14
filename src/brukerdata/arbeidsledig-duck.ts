import {
    ActionType,
    Handling,
    HentArbeidsledigFEILETAction,
    HentArbeidsledigOKAction,
    HentArbeidsledigLASTERAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getArbeidsledigFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { SituasjonOption } from '../startside/tiltak-map';

export interface ArbeidsledigState extends DataElement {
    situasjon: string;
}

export const initialState: ArbeidsledigState = {
    situasjon: SituasjonOption.UBESTEMT,
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: ArbeidsledigState = initialState, action: Handling): ArbeidsledigState {
    switch (action.type) {
        case ActionType.HENT_ARBEIDSLEDIG_OK:
            return {...state, status: Status.OK, situasjon: action.arbeidsledig.situasjon};
        case ActionType.HENT_ARBEIDSLEDIG_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_ARBEIDSLEDIG_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentArbeidsledig(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<ArbeidsledigState>(() => getArbeidsledigFetch(), {
        ok: hentArbeidsledigOk,
        feilet: hentArbeidsledigFeilet,
        pending: hentArbeidsledigPending,
    });
}

function hentArbeidsledigOk(arbeidsledig: ArbeidsledigState): HentArbeidsledigOKAction {
    return {
        type: ActionType.HENT_ARBEIDSLEDIG_OK,
        arbeidsledig: arbeidsledig
    };
}

function hentArbeidsledigFeilet(): HentArbeidsledigFEILETAction {
    return {
        type: ActionType.HENT_ARBEIDSLEDIG_FEILET,
    };
}

function hentArbeidsledigPending(): HentArbeidsledigLASTERAction {
    return {
        type: ActionType.HENT_ARBEIDSLEDIG_LASTER,
    };
}