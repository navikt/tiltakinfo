import { JSONObject } from 'yet-another-fetch-mock';
import {
ActionType,
Handling,
HentOppfolgingsstatusFEILETAction,
HentOppfolgingsstatusOKAction,
HentOppfolgingsstatusLASTERAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getOppfolgingsstatusFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';

export enum ServicegruppeKode {
    UBESTEMT = 'servicegruppe-ubestemt',
    SITUASJONSBESTEMT = 'BFORM',
    SPESIELT_TILPASSET = 'BATT',
}

export interface OppfolgingsEnhet extends JSONObject {
    navn: string;
    enhetId: string;
}

export interface OppfolgingsstatusFetchState extends JSONObject {
     servicegruppe: string;
     oppfolgingsenhet: OppfolgingsEnhet;
}

export interface OppfolgingsstatusState extends DataElement {
    servicegruppeKode: ServicegruppeKode;
    oppfolgingsenhet: OppfolgingsEnhet;
}

export const initialState: OppfolgingsstatusState = {
    servicegruppeKode: ServicegruppeKode.UBESTEMT,
    oppfolgingsenhet: {
        navn: '',
        enhetId: '',
    },
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(
    state: OppfolgingsstatusState = initialState, action: Handling): OppfolgingsstatusState {
    switch (action.type) {
        case ActionType.HENT_OPPFOLGINGSSTATUS_OK:
            const servicegruppekode =  action.data.servicegruppe;
            const servicegruppemap = {
                'BATT': ServicegruppeKode.SPESIELT_TILPASSET,
                'BFORM': ServicegruppeKode.SITUASJONSBESTEMT,
            };

            return {
                ...state,
                status: Status.OK,
                servicegruppeKode: servicegruppemap[servicegruppekode] || ServicegruppeKode.UBESTEMT,
                oppfolgingsenhet: action.data.oppfolgingsenhet,
            };
        case ActionType.HENT_OPPFOLGINGSSTATUS_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_OPPFOLGINGSSTATUS_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentOppfolgingsstatus(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<OppfolgingsstatusFetchState>(() => getOppfolgingsstatusFetch(), {
        ok: hentOppfolgingsstatusOk,
        feilet: hentOppfolgingsstatusFeilet,
        pending: hentOppfolgingsstatusPending,
    });
}

function hentOppfolgingsstatusOk(data: OppfolgingsstatusFetchState): HentOppfolgingsstatusOKAction {
    return {
        type: ActionType.HENT_OPPFOLGINGSSTATUS_OK,
        data: data,
    };
}

function hentOppfolgingsstatusFeilet(): HentOppfolgingsstatusFEILETAction {
    return {
        type: ActionType.HENT_OPPFOLGINGSSTATUS_FEILET,
    };
}

function hentOppfolgingsstatusPending(): HentOppfolgingsstatusLASTERAction {
    return {
        type: ActionType.HENT_OPPFOLGINGSSTATUS_LASTER,
    };
}
