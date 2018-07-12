import { UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
import { StatusState } from '../status/status-duck';
import { Data } from './generic-duck';

export enum ActionType {
    TEST_ACTION = 'TEST_ACTION',
    HENT_UNLEASH_OK = 'HENT_UNLEASH_OK',
    HENT_UNLEASH_FEILET = 'HENT_UNLEASH_FEILET',
    HENT_UNLEASH_LASTER = 'HENT_UNLEASH_LASTER',
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET',
    HENT_OPPFOLGING_LASTER = 'HENT_OPPFOLGING_LASTER',
    HENT_STATUS_OK = 'HENT_STATUS_OK',
    HENT_STATUS_FEILET = 'HENT_STATUS_FEILET',
    HENT_STATUS_LASTER = 'HENT_STATUS_LASTER',
    HENT_ARBEIDSFORHOLD_OK = 'HENT_ARBEIDSFORHOLD_OK',
    HENT_ARBEIDSFORHOLD_FEILET = 'HENT_ARBEIDSFORHOLD_FEILET',
    HENT_ARBEIDSFORHOLD_LASTER = 'HENT_ARBEIDSFORHOLD_LASTER',
    SETT_MAAL = 'SETT_MAAL',
}

export interface TestAction extends Data {
    type: ActionType.TEST_ACTION;
}

export interface HentUnleashOKAction {
    type: ActionType.HENT_UNLEASH_OK;
    unleash: UnleashState;
}

export interface HentUnleashLASTERAction {
    type: ActionType.HENT_UNLEASH_LASTER;
}

export interface HentUnleashFEILETAction {
    type: ActionType.HENT_UNLEASH_FEILET;
}

export interface HentOppfolgingOKAction {
    type: ActionType.HENT_OPPFOLGING_OK;
    oppfolging: OppfolgingState;
}

export interface HentOppfolgingLASTERAction {
    type: ActionType.HENT_OPPFOLGING_LASTER;
}

export interface HentOppfolgingFEILETAction {
    type: ActionType.HENT_OPPFOLGING_FEILET;
}

export interface HentStatusOKAction {
    type: ActionType.HENT_STATUS_OK;
    status: StatusState;
}

export interface HentStatusLASTERAction {
    type: ActionType.HENT_STATUS_LASTER;
}

export interface HentStatusFEILETAction {
    type: ActionType.HENT_STATUS_FEILET;
}

export interface HentArbeidsforholdOKAction extends Data {
    type: ActionType.HENT_ARBEIDSFORHOLD_OK;
}

export interface HentArbeidsforholdLASTERAction {
    type: ActionType.HENT_ARBEIDSFORHOLD_LASTER;
}

export interface HentArbeidsforholdFEILETAction {
    type: ActionType.HENT_ARBEIDSFORHOLD_FEILET;
}

export type Handling =
    | TestAction
    | HentUnleashOKAction
    | HentUnleashLASTERAction
    | HentUnleashFEILETAction
    | HentOppfolgingOKAction
    | HentOppfolgingLASTERAction
    | HentOppfolgingFEILETAction
    | HentStatusOKAction
    | HentStatusFEILETAction
    | HentStatusLASTERAction
    | HentArbeidsforholdOKAction
    | HentArbeidsforholdFEILETAction
    | HentArbeidsforholdLASTERAction;
