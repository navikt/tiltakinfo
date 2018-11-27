import { UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { Data } from './generic-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';

export enum ActionType {
    TEST_ACTION = 'TEST_ACTION',
    HENT_UNLEASH_OK = 'HENT_UNLEASH_OK',
    HENT_UNLEASH_FEILET = 'HENT_UNLEASH_FEILET',
    HENT_UNLEASH_LASTER = 'HENT_UNLEASH_LASTER',
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET',
    HENT_OPPFOLGING_LASTER = 'HENT_OPPFOLGING_LASTER',
    SETT_MAAL = 'SETT_MAAL',
    HENT_OPPFOLGINGSSTATUS_OK = 'HENT_OPPFOLGINGSSTATUS_OK',
    HENT_OPPFOLGINGSSTATUS_FEILET = 'HENT_OPPFOLGINGSSTATUS_FEILET',
    HENT_OPPFOLGINGSSTATUS_LASTER = 'HENT_OPPFOLGINGSSTATUS_LASTER',
    HENT_SYFO_OK = 'HENT_SYFO_OK',
    HENT_SYFO_FEILET = 'HENT_SYFO_FEILET',
    HENT_SYFO_LASTER = 'HENT_SYFO_LASTER',
    SETT_BRUKERTYPE = 'SETT_BRUKERTYPE',
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

export interface HentOppfolgingsstatusOKAction extends Data {
    type: ActionType.HENT_OPPFOLGINGSSTATUS_OK;
}

export interface HentOppfolgingsstatusLASTERAction {
    type: ActionType.HENT_OPPFOLGINGSSTATUS_LASTER;
}

export interface HentOppfolgingsstatusFEILETAction {
    type: ActionType.HENT_OPPFOLGINGSSTATUS_FEILET;
}

export interface HentSyfoOKAction {
    type: ActionType.HENT_SYFO_OK;
    syfoData: SyfoDataState;
}

export interface HentSyfoLASTERAction {
    type: ActionType.HENT_SYFO_LASTER;
}

export interface HentSyfoFEILETAction {
    type: ActionType.HENT_SYFO_FEILET;
}

export type Handling =
    | TestAction
    | HentUnleashOKAction
    | HentUnleashLASTERAction
    | HentUnleashFEILETAction
    | HentOppfolgingOKAction
    | HentOppfolgingLASTERAction
    | HentOppfolgingFEILETAction
    | HentOppfolgingsstatusOKAction
    | HentOppfolgingsstatusLASTERAction
    | HentOppfolgingsstatusFEILETAction
    | HentSyfoOKAction
    | HentSyfoLASTERAction
    | HentSyfoFEILETAction;
