import {
    ActionType, Handling, HentUnleashFEILETAction, HentUnleashOKAction, HentUnleashPENDINGAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getUnleashFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export const tiltakinfoMvp = 'tiltakinfo.mvp';

export interface UnleashState extends DataElement {
    [tiltakinfoMvp]: boolean;
}

export const initialState: UnleashState = {
    [tiltakinfoMvp]: false,
    status: Status.IKKE_STARTET
};

//  Reducer
export default function reducer(state: UnleashState = initialState, action: Handling): UnleashState {
    switch (action.type) {
        case ActionType.HENT_UNLEASH_OK:
            return { [tiltakinfoMvp]: action.unleash[tiltakinfoMvp], status: Status.OK };
        case ActionType.HENT_UNLEASH_LASTER:
            return { ...state, status: Status.LASTER };
        case ActionType.HENT_UNLEASH_FEILET:
            return { ...state, status: Status.FEILET };
        default:
            return state;
    }
}

export function hentUnleash(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<UnleashState>(() => getUnleashFetch([tiltakinfoMvp]), {
        ok: hentUnleashOK,
        feilet: hentUnleashFEILET,
        pending: hentUnleashPENDING,
    });
}

function hentUnleashOK(unleash: UnleashState): HentUnleashOKAction {
    return {
        type: ActionType.HENT_UNLEASH_OK,
        unleash,
    };
}

function hentUnleashFEILET(): HentUnleashFEILETAction {
    return {
        type: ActionType.HENT_UNLEASH_FEILET,
    };
}

function hentUnleashPENDING(): HentUnleashPENDINGAction {
    return {
        type: ActionType.HENT_UNLEASH_LASTER,
    };
}
