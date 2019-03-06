import { getRegistrering } from '../api/api';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import {
    ActionType, Handling,
    HentRegistreringFEILETAction, HentRegistreringLASTERAction, HentRegistreringOKAction
} from '../redux/actions';
import { JSONObject } from 'yet-another-fetch-mock';
import { MaalFraRegistrering, MaalOption } from '../komponenter/tiltak/tiltak-map';

export function mapTilMaalOption(fremtidigSituasjon: MaalFraRegistrering): MaalOption {
    switch (fremtidigSituasjon) {

        case MaalFraRegistrering.NY_ARBEIDSGIVER:
            return MaalOption.NY_ARBEIDSGIVER;
        case MaalFraRegistrering.SAMME_ARBEIDSGIVER_NY_STILLING:
            return MaalOption.SAMME_ARBEIDSGIVER;
        case MaalFraRegistrering.SAMME_ARBEIDSGIVER:
            return MaalOption.SAMME_STILLING;
        case MaalFraRegistrering.USIKKER || MaalFraRegistrering.INGEN_PASSER:
            return MaalOption.USIKKER;
        default:
            return MaalOption.IKKE_VALGT;
    }
}

export interface RegistreringDataState extends JSONObject {
    registrering: {
        besvarelse: {
            fremtidigSituasjon: MaalFraRegistrering;
        };
    };
}

export interface RegistreringState extends DataElement {
    maalFraRegistrering: MaalFraRegistrering;
}

const initialState: RegistreringState = {
    status: Status.IKKE_STARTET,
    maalFraRegistrering: MaalFraRegistrering.IKKE_VALGT,
};

// Reducer
export default function (state: RegistreringState = initialState, action: Handling): RegistreringState {
    switch (action.type) {
        case ActionType.HENT_REGISTRERING_LASTER:
            return {...state, status: Status.LASTER};
        case ActionType.HENT_REGISTRERING_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_REGISTRERING_OK:
            return {
                ...state,
                status: Status.OK,
                maalFraRegistrering: action.registreringData.registrering.besvarelse.fremtidigSituasjon
            };
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
