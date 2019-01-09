import {
    ActionType, Handling, HentUnleashFEILETAction, HentUnleashOKAction, HentUnleashLASTERAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getUnleashFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export const tiltakInfoMeldingBaerum = 'tiltakinfo.melding-til-baerum';

export interface ActiveUnleashFeatures {
    [tiltakInfoMeldingBaerum]: boolean;
}

export type UnleashState = DataElement & ActiveUnleashFeatures;

export const initialState: UnleashState = {
    status: Status.IKKE_STARTET,
    [tiltakInfoMeldingBaerum]: false
};

//  Reducer
export default function reducer(state: UnleashState = initialState, action: Handling): UnleashState {
    switch (action.type) {
        case ActionType.HENT_UNLEASH_OK:
            return {
                status: Status.OK,
                [tiltakInfoMeldingBaerum]: action.unleash[tiltakInfoMeldingBaerum]
            };
        case ActionType.HENT_UNLEASH_LASTER:
            return {...state, status: Status.LASTER};
        case ActionType.HENT_UNLEASH_FEILET:
            return {
                ...state,
                status: Status.OK,
            };
        default:
            return state;
    }
}

export function hentUnleash(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<UnleashState>(
        () => getUnleashFetch([tiltakInfoMeldingBaerum]), {
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
