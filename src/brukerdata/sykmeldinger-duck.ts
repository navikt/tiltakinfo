import {
    ActionType,
    Handling,
    HentSykmeldingerFEILETAction,
    HentSykmeldingerLASTERAction,
    HentSykmeldingerOKAction,
    IkkeHentSykmeldingerAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { getSykmeldingerFetch } from '../api/api';
import { JSONObject } from 'yet-another-fetch-mock';

export enum Arbeidssituasjon {
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
}

export interface Sykmelding extends JSONObject {
    sendtdato: string;
    valgtArbeidssituasjon: string;
}

export type SyfoState = Sykmelding[];

interface SykmeldingerDataState {
    harArbeidsgiver: boolean;
    erSykmeldt: boolean;
}

export interface SykmeldingerState extends DataElement {
    data: SykmeldingerDataState;
}

export const initialState: SykmeldingerState = {
    data: {
        harArbeidsgiver: false,
        erSykmeldt: false,
    },
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: SykmeldingerState = initialState, action: Handling): SykmeldingerState {
    switch (action.type) {
        case ActionType.HENT_SYKMELDINGER_OK:
            const datoNyesteSykmelding = new Date(Math.max(
                ...action.data.map(
                    (sykmelding: Sykmelding) => new Date(sykmelding.sendtdato)
                )
            ));
            const gjeldendeSykmelding = action.data.find(
                (sykmelding: Sykmelding) => new Date(sykmelding.sendtdato).getTime() === datoNyesteSykmelding.getTime()
            );

            const erSykmeldt = typeof gjeldendeSykmelding !== 'undefined';
            const arbeidssituasjon = gjeldendeSykmelding && gjeldendeSykmelding.valgtArbeidssituasjon;
            const harArbeidsgiver = arbeidssituasjon && arbeidssituasjon !== Arbeidssituasjon.ARBEIDSLEDIG;

            return {
                ...state,
                status: Status.OK,
                data: {harArbeidsgiver, erSykmeldt},
            };
        case ActionType.HENT_SYKMELDINGER_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_SYKMELDINGER_LASTER:
            return {...state, status: Status.LASTER};
        case ActionType.IKKE_HENT_SYKMELDINGER:
            return {...state, status: Status.OK};
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

export function ikkeHentSykmeldingerOK(): IkkeHentSykmeldingerAction {
    return {
        type: ActionType.IKKE_HENT_SYKMELDINGER,
    };
}
