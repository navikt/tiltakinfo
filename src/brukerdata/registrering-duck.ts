import { DataElement, Status } from '../api/datalaster';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { getRegistrering } from '../api/api';
import {
    ActionType, Handling,
    HentRegistreringFEILETAction, HentRegistreringLASTERAction, HentRegistreringOKAction
} from '../redux/actions';

export enum FremtidigSituasjonSvar {
    IKKE_VALGT = 'IKKE_VALGT',
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    USIKKER = 'USIKKER',
    INGEN_PASSER = 'INGEN_PASSER'
}

export interface Besvarelse {
    fremtidigSituasjon: FremtidigSituasjonSvar;
}

export interface Registrering {
    besvarelse: Besvarelse;
}

export interface RegistreringDataState {
    registrering: Registrering;
}

export interface RegistreringState extends DataElement {
    registreringData?: RegistreringDataState;
}

const initialState: RegistreringState = {
    status: Status.IKKE_STARTET,
};

// Reducer
export default function (state: RegistreringState = initialState, action: Handling): RegistreringState {
    switch (action.type) {
        case ActionType.HENT_REGISTRERING_LASTER:
            return {...state, status: Status.LASTER};
        case ActionType.HENT_REGISTRERING_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_REGISTRERING_OK:
            return {...state, status: Status.OK, registreringData: action.registreringData};
        default:
            return state;
    }
}

export function hentRegistrering(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<RegistreringDataState>(() => getRegistrering(), {
        ok: hentRegistreringOk,
        feilet: hentRegistreringFeilet,
        pending: hentRegistreringPending,
    });
}

function hentRegistreringOk(data: RegistreringDataState): HentRegistreringOKAction {
    return {
        type: ActionType.HENT_REGISTRERING_OK,
        registreringData: data
    };
}

function hentRegistreringFeilet(): HentRegistreringFEILETAction {
    return {
        type: ActionType.HENT_REGISTRERING_FEILET,
    };
}

function hentRegistreringPending(): HentRegistreringLASTERAction {
    return {
        type: ActionType.HENT_REGISTRERING_LASTER,
    };
}
