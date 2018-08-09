import {
    ActionType,
    Handling, HentSykmeldingerFEILETAction, HentSykmeldingerLASTERAction, HentSykmeldingerOKAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { getSykmeldingerFetch } from '../api/api';

export interface Sykemelding {
    arbeidsgiver: string;
}

export type SyfoState = Sykemelding[];

interface SykmeldingerDataState {
    harArbeidsgiver: boolean;
}

export interface SykmeldingerState extends DataElement {
    data: SykmeldingerDataState;
}

export const initialState: SykmeldingerState = {
    data: {
        harArbeidsgiver: false,
    },
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: SykmeldingerState = initialState, action: Handling): SykmeldingerState {
    switch (action.type) {
        case ActionType.HENT_SYKMELDINGER_OK:
            const data = action.data;
            const harArbeidsgiver = data.length > 0 && !!data[data.length - 1].arbeidsgiver;
            return {
                ...state,
                status: Status.OK,
                data: {harArbeidsgiver},
            };
        case ActionType.HENT_SYKMELDINGER_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_SYKMELDINGER_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentSykmeldinger(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<SyfoState>(() => getSykmeldingerFetch(), {
        ok: hentSykmeldingerOK,
        feilet: hentSykmeldingerFEILET,
        pending: hentSykmeldingerLASTER,
    });
}

export function hentSykmeldingerOK(data: SyfoState): HentSykmeldingerOKAction {
    return {
        type: ActionType.HENT_SYKMELDINGER_OK,
        data,
    };
}

function hentSykmeldingerFEILET(): HentSykmeldingerFEILETAction {
    return {
        type: ActionType.HENT_SYKMELDINGER_FEILET,
    };
}

function hentSykmeldingerLASTER(): HentSykmeldingerLASTERAction {
    return {
        type: ActionType.HENT_SYKMELDINGER_LASTER,
    };
}
