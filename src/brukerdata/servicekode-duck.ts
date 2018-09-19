import {
    ActionType,
    Handling,
    HentServicegruppeFEILETAction,
    HentServicegruppeOKAction,
    HentServicegruppeLASTERAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getArbeidsledigFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { SituasjonOption } from '../startside/tiltak-map';
import { JSONObject } from 'yet-another-fetch-mock';

export interface ServicegruppeState extends JSONObject {
     servicegruppe: string;
}

export interface ArbeidsledigSituasjonState extends DataElement {
    situasjon: string;
}

export const initialState: ArbeidsledigSituasjonState = {
    situasjon: SituasjonOption.UBESTEMT,
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(
    state: ArbeidsledigSituasjonState = initialState, action: Handling): ArbeidsledigSituasjonState {
    switch (action.type) {
        case ActionType.HENT_SERVICEGRUPPE_OK:
            const servicegruppekode =  action.data.servicegruppe;
            const situasjonsMap = {
                'BATT': SituasjonOption.SPESIELT_TILPASSET,
                'BFORM': SituasjonOption.SITUASJONSBESTEMT,
                'VURDI': SituasjonOption.SYKMELDT,
                'VURDU': SituasjonOption.SYKMELDT,
            };
            if (servicegruppekode in situasjonsMap) {
                return {...state, status: Status.OK, situasjon: situasjonsMap[servicegruppekode]};
            } else {
                return {...state, status: Status.OK, situasjon: SituasjonOption.UBESTEMT};
            }
        case ActionType.HENT_SERVICEGRUPPE_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_SERVICEGRUPPE_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentArbeidsledig(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<ServicegruppeState>(() => getArbeidsledigFetch(), {
        ok: hentArbeidsledigOk,
        feilet: hentArbeidsledigFeilet,
        pending: hentArbeidsledigPending,
    });
}

function hentArbeidsledigOk(data: ServicegruppeState): HentServicegruppeOKAction {
    return {
        type: ActionType.HENT_SERVICEGRUPPE_OK,
        data: data,
    };
}

function hentArbeidsledigFeilet(): HentServicegruppeFEILETAction {
    return {
        type: ActionType.HENT_SERVICEGRUPPE_FEILET,
    };
}

function hentArbeidsledigPending(): HentServicegruppeLASTERAction {
    return {
        type: ActionType.HENT_SERVICEGRUPPE_LASTER,
    };
}