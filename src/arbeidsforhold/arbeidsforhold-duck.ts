import {
    ActionType,
    Handling, HentArbeidsforholdFEILETAction, HentArbeidsforholdLASTERAction, HentArbeidsforholdOKAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { getArbeidsforholdFetch } from '../api/api';

export interface Sykemelding {
    arbeidsgiver: string;
}

export type SyfoState = Sykemelding[];

interface ArbeidsforholdDataState {
    harArbeidsgiver: boolean;
}

export interface ArbeidsforholdState extends DataElement {
    data: ArbeidsforholdDataState;
}

export const initialState: ArbeidsforholdState = {
    data: {
        harArbeidsgiver: false,
    },
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: ArbeidsforholdState = initialState, action: Handling): ArbeidsforholdState {
    switch (action.type) {
        case ActionType.HENT_ARBEIDSFORHOLD_OK:
            const data = action.data;
            const harArbeidsgiver = data.length > 0 && !!data[data.length - 1].arbeidsgiver;
            return {
                ...state,
                status: Status.OK,
                data: {harArbeidsgiver},
            };
        case ActionType.HENT_ARBEIDSFORHOLD_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_ARBEIDSFORHOLD_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentArbeidsforhold(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<SyfoState>(() => getArbeidsforholdFetch(), {
        ok: hentArbeidsforholdOK,
        feilet: hentArbeidsforholdFEILET,
        pending: hentArbeidsforholdLASTER,
    });
}

export function hentArbeidsforholdOK(data: SyfoState): HentArbeidsforholdOKAction {
    return {
        type: ActionType.HENT_ARBEIDSFORHOLD_OK,
        data,
    };
}

function hentArbeidsforholdFEILET(): HentArbeidsforholdFEILETAction {
    return {
        type: ActionType.HENT_ARBEIDSFORHOLD_FEILET,
    };
}

function hentArbeidsforholdLASTER(): HentArbeidsforholdLASTERAction {
    return {
        type: ActionType.HENT_ARBEIDSFORHOLD_LASTER,
    };
}
