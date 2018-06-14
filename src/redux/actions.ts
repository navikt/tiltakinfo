import { UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';

export enum ActionType {
    HENT_UNLEASH_OK = 'HENT_UNLEASH_OK',
    HENT_UNLEASH_FEILET = 'HENT_UNLEASH_FEILET',
    HENT_UNLEASH_PENDING = 'HENT_UNLEASH_PENDING',
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET',
    HENT_OPPFOLGING_PENDING = 'HENT_OPPFOLGING_PENDING',
}

export enum Status {
    OK = 'OK',
    FEILET = 'FEILET',
    PENDING = 'PENDING',
}

export interface HentUnleashOKAction {
    type: ActionType.HENT_UNLEASH_OK;
    unleash: UnleashState;
}

export interface HentUnleashPENDINGAction {
    type: ActionType.HENT_UNLEASH_PENDING;
}

export interface HentUnleashFEILETAction {
    type: ActionType.HENT_UNLEASH_FEILET;
}

export interface HentOppfolgingOKAction {
    type: ActionType.HENT_OPPFOLGING_OK;
    oppfolging: OppfolgingState;
}

export interface HentOppfolgingPENDINGAction {
    type: ActionType.HENT_OPPFOLGING_PENDING;
}

export interface HentOppfolgingFEILETAction {
    type: ActionType.HENT_OPPFOLGING_FEILET;
}

export type Handling =
    | HentUnleashOKAction
    | HentUnleashPENDINGAction
    | HentUnleashFEILETAction
    | HentOppfolgingOKAction
    | HentOppfolgingPENDINGAction
    | HentOppfolgingFEILETAction;
