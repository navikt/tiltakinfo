import {
    ActionType,
    Handling,
    HentOppfolgingFEILETAction,
    HentOppfolgingOKAction,
    HentOppfolgingLASTERAction,
} from '../redux/actions';
import { getOppfolgingFetch } from '../api/api';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export enum Servicegruppe {
    IKVAL = 'IKVAL',
    BATT = 'BATT',
    BFORM = 'BFORM',
    VARIG = 'VARIG',
    IVURD = 'IVURD',
}

export type ServicegruppeOrNull = Servicegruppe | null;

export interface OppfolgingState extends DataElement {
    underOppfolging: boolean;
    servicegruppe: ServicegruppeOrNull;
}

export const initialState: OppfolgingState = {
    underOppfolging: false,
    servicegruppe: null,
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: OppfolgingState = initialState, action: Handling): OppfolgingState {
    switch (action.type) {
        case ActionType.HENT_OPPFOLGING_OK:
            return {...state, status: Status.OK, underOppfolging: action.oppfolging.underOppfolging};
        case ActionType.HENT_OPPFOLGING_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_OPPFOLGING_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentOppfolging(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<OppfolgingState>(() => getOppfolgingFetch(), {
        ok: hentOppfolgingOk,
        feilet: hentOppfolgingFeilet,
        pending: hentOppfolgingPending,
    });
}

function hentOppfolgingOk(oppfolging: OppfolgingState): HentOppfolgingOKAction {
    return {
        type: ActionType.HENT_OPPFOLGING_OK,
        oppfolging: oppfolging
    };
}

function hentOppfolgingFeilet(): HentOppfolgingFEILETAction {
    return {
        type: ActionType.HENT_OPPFOLGING_FEILET,
    };
}

function hentOppfolgingPending(): HentOppfolgingLASTERAction {
    return {
        type: ActionType.HENT_OPPFOLGING_LASTER,
    };
}
