import {
    ActionType,
    Handling,
    HentSyfoFEILETAction,
    HentSyfoOKAction,
    HentSyfoLASTERAction,
} from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';
import { getSyfoFetch } from '../api/api';
import { fetchThenDispatch } from '../api/fetch-utils';
import { DataElement, Status } from '../api/datalaster';
import { JSONObject } from 'yet-another-fetch-mock';

export enum Arbeidssituasjon {
    ARBEIDSLEDIG = 'ARBEIDSLEDIG',
}

export interface SyfoDataState extends JSONObject {
    arbeidsSituasjonIAktiveSykmeldinger: string[];
    erTiltakSykmeldteInngangAktiv: boolean;
}

export interface SyfoSituasjonState extends DataElement {
    harArbeidsgiver: boolean;
    erSykmeldt: boolean;
}

export const initialState: SyfoSituasjonState = {
    harArbeidsgiver: false,
    erSykmeldt: false,
    status: Status.IKKE_STARTET,
};

//  Reducer
export default function reducer(state: SyfoSituasjonState = initialState, action: Handling): SyfoSituasjonState {
    switch (action.type) {
        case ActionType.HENT_SYFO_OK:
            const erSykmeldt = action.syfoData.erTiltakSykmeldteInngangAktiv;
            const harArbeidsgiver = action.syfoData.arbeidsSituasjonIAktiveSykmeldinger !== null &&
                action.syfoData.arbeidsSituasjonIAktiveSykmeldinger
                .filter( situasjon => situasjon !== Arbeidssituasjon.ARBEIDSLEDIG).length > 0;
            return {...state, status: Status.OK, harArbeidsgiver: harArbeidsgiver, erSykmeldt: erSykmeldt};
        case ActionType.HENT_SYFO_FEILET:
            return {...state, status: Status.FEILET};
        case ActionType.HENT_SYFO_LASTER:
            return {...state, status: Status.LASTER};
        default:
            return state;
    }
}

export function hentSyfo(): (dispatch: Dispatch) => Promise<void> {
    return fetchThenDispatch<SyfoDataState>(() => getSyfoFetch(), {
        ok: hentSyfoOk,
        feilet: hentSyfoFeilet,
        pending: hentSyfoPending,
    });
}

function hentSyfoOk(syfoData: SyfoDataState): HentSyfoOKAction {
    return {
        type: ActionType.HENT_SYFO_OK,
        syfoData: syfoData,
    };
}

function hentSyfoFeilet(): HentSyfoFEILETAction {
    return {
        type: ActionType.HENT_SYFO_FEILET,
    };
}

function hentSyfoPending(): HentSyfoLASTERAction {
    return {
        type: ActionType.HENT_SYFO_LASTER,
    };
}