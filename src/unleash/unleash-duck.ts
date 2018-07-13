import {
    ActionType, Handling, HentUnleashFEILETAction, HentUnleashOKAction, HentUnleashLASTERAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getUnleashFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export const tiltakinfoHentarbeidsforhold = 'tiltakinfo.hentarbeidsforhold';

export interface UnleashState extends DataElement {
    [tiltakinfoHentarbeidsforhold]: boolean;
}

export const initialState: UnleashState = {
    [tiltakinfoHentarbeidsforhold]: false,
    status: Status.IKKE_STARTET
};

//  Reducer
export default function reducer(state: UnleashState = initialState, action: Handling): UnleashState {
    switch (action.type) {
        case ActionType.HENT_UNLEASH_OK:
            return {
                [tiltakinfoHentarbeidsforhold]: action.unleash[tiltakinfoHentarbeidsforhold],
                status: Status.OK
            };
        case ActionType.HENT_UNLEASH_LASTER:
            return { ...state, status: Status.LASTER };
        case ActionType.HENT_UNLEASH_FEILET:
            return { ...state, status: Status.FEILET };
        default:
            return state;
    }
}

export function hentUnleash(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<UnleashState>(
        () => getUnleashFetch([tiltakinfoHentarbeidsforhold]), {
        ok: hentUnleashOK,
        feilet: hentUnleashFEILET,
        pending: hentUnleashLASTER,
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

function hentUnleashLASTER(): HentUnleashLASTERAction {
    return {
        type: ActionType.HENT_UNLEASH_LASTER,
    };
}
