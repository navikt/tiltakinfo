import { UnleashState } from '../unleash/unleash-duck';

export enum ActionType {
    HENT_UNLEASH_OK = 'HENT_UNLEASH_OK',
    HENT_UNLEASH_FEILET = 'HENT_UNLEASH_FEILET',
    HENT_UNLEASH_PENDING = 'HENT_UNLEASH_PENDING',
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

export type Handling =
    | HentUnleashOKAction
    | HentUnleashPENDINGAction
    | HentUnleashFEILETAction;
