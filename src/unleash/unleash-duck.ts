import {
    ActionType, Handling, HentUnleashFEILETAction, HentUnleashOKAction, HentUnleashPENDINGAction,
} from '../redux/actions';
import { Dispatch } from '../types';
import { getUnleashFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';

export interface TiltakInfoToggles {
    mvp: boolean;
}

export interface UnleashState {
    tiltakinfo: TiltakInfoToggles;
}

export const unleashPrefix = 'tiltakinfo';

export const initialState: UnleashState = {
    [unleashPrefix]: {
        mvp: false,
    },
};

//  Reducer
export default function reducer(state: UnleashState = initialState, action: Handling): UnleashState {
    switch (action.type) {
        case ActionType.HENT_UNLEASH_OK:
            return action.unleash;
        default:
            return state;
    }
}

export function hentUnleash(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<UnleashState>(() => getUnleashFetch(), {
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
        type: ActionType.HENT_UNLEASH_PENDING,
    };
}
