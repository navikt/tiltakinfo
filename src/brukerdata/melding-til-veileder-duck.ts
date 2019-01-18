import {
    ActionType,
    Handling,
    SendMeldingFEILETAction,
    SendMeldingOKAction,
    SendMeldingPENDINGAction,
    NullStillStoreAction
} from '../redux/actions';
import { postMeldingDialogFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { Dispatch } from '../redux/dispatch-type';

export const initialMeldingTilDialogState: DataElement = {
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: DataElement = initialMeldingTilDialogState, action: Handling): DataElement {
    switch (action.type) {
        case ActionType.SEND_MELDING_OK:
            return {...state, status: Status.OK};
        case ActionType.SEND_MELDING_PENDING:
            return {...state, status: Status.LASTER};
        case ActionType.SEND_MELDING_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.NULL_STILL_STORE:
            return initialMeldingTilDialogState;
        default:
            return state;
    }
}

export function sendMeldingTilDialog(melding: Melding): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<Melding>(() => postMeldingDialogFetch(melding), {
        ok: sendMeldingOK,
        feilet: sendMeldingFEILET,
        pending: sendMeldingPENDING,
    });
}

function sendMeldingOK(melding: Melding): SendMeldingOKAction {
    return {
        type: ActionType.SEND_MELDING_OK,
        melding
    };
}

function sendMeldingFEILET(): SendMeldingFEILETAction {
    return {
        type: ActionType.SEND_MELDING_FEILET,
    };
}

function sendMeldingPENDING(): SendMeldingPENDINGAction {
    return {
        type: ActionType.SEND_MELDING_PENDING,
    };
}

export function nullStillStore(): NullStillStoreAction {
    return {
        type: ActionType.NULL_STILL_STORE
    };
}

export interface Melding {
    tekst: string;
    overskrift: string;
}
