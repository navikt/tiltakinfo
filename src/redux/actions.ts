import { UnleashState } from '../unleash/unleash-duck';

export enum ActionType {
    HENT_UNLEASH_OK = 'HENT_UNLEASH_OK',
    HENT_UNLEASH_FEILET = 'HENT_UNLEASH_FEILET',
    HENT_UNLEASH_LASTER = 'HENT_UNLEASH_LASTER',
}

export interface HentUnleashOKAction {
    type: ActionType.HENT_UNLEASH_OK;
    unleash: UnleashState;
}

export interface HentUnleashPENDINGAction {
    type: ActionType.HENT_UNLEASH_LASTER;
}

export interface HentUnleashFEILETAction {
    type: ActionType.HENT_UNLEASH_FEILET;
}

export type Handling =
    | HentUnleashOKAction
    | HentUnleashPENDINGAction
    | HentUnleashFEILETAction;
