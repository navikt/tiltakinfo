import { JSONObject } from 'yet-another-fetch-mock';
import {
    ActionType,
    Handling,
    HentMeldingNavKontorFEILETAction,
    HentMeldingNavKontorOKAction,
    HentMeldingNavKontorPENDINGAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getMeldingNavKontorFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export interface MeldingTilNavKontorFetchState extends JSONObject {
    brukerHarSendtMeldingTilNavKontor: boolean;
}

export interface MeldingTilNavKontorState extends DataElement {
    harSendtMelding: boolean;
}

export const initialMeldingTilNavKontorState: MeldingTilNavKontorState = {
    harSendtMelding: false,
    status: Status.IKKE_STARTET,
};

// Reducer
export default function reducer(state: MeldingTilNavKontorState = initialMeldingTilNavKontorState, action: Handling): MeldingTilNavKontorState {
    switch (action.type) {
        case ActionType.HENT_MELDING_NAV_KONTOR_OK:
            return {...state, status: Status.OK, harSendtMelding: action.harSendtMelding};
        case ActionType.HENT_MELDING_NAV_KONTOR_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_MELDING_NAV_KONTOR_PENDING:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentMeldingNavKontor(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<MeldingTilNavKontorFetchState>(() => getMeldingNavKontorFetch(), {
        ok: hentMeldingNavKontorOk,
        feilet: hentMeldingNavKontorFeilet,
        pending: hentMeldingNavKontorPending,
    });
}

function hentMeldingNavKontorOk(meldingNavKontorState: MeldingTilNavKontorFetchState): HentMeldingNavKontorOKAction {
    return {
        type: ActionType.HENT_MELDING_NAV_KONTOR_OK,
        harSendtMelding: meldingNavKontorState.brukerHarSendtMeldingTilNavKontor,
    };
}

function hentMeldingNavKontorFeilet(): HentMeldingNavKontorFEILETAction {
    return {
        type: ActionType.HENT_MELDING_NAV_KONTOR_FEILET,
    };
}

function hentMeldingNavKontorPending(): HentMeldingNavKontorPENDINGAction {
    return {
        type: ActionType.HENT_MELDING_NAV_KONTOR_PENDING,
    };
}
