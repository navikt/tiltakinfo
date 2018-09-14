import { UnleashState } from '../unleash/unleash-duck';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { ArbeidsledigState } from '../brukerdata/arbeidsledig-duck';
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
    HENT_SYKMELDINGER_OK = 'HENT_SYKMELDINGER_OK',
    HENT_SYKMELDINGER_FEILET = 'HENT_SYKMELDINGER_FEILET',
    HENT_SYKMELDINGER_LASTER = 'HENT_SYKMELDINGER_LASTER',
    IKKE_HENT_SYKMELDINGER = 'IKKE_HENT_SYKMELDINGER',
    SETT_MAAL = 'SETT_MAAL',
    HENT_ARBEIDSLEDIG_OK = 'HENT_ARBEIDSLEDIG_OK',
    HENT_ARBEIDSLEDIG_FEILET = 'HENT_ARBEIDSLEDIG_FEILET',
    HENT_ARBEIDSLEDIG_LASTER = 'HENT_ARBEIDSLEDIG_LASTER',
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

export interface HentSykmeldingerOKAction extends Data {
    type: ActionType.HENT_SYKMELDINGER_OK;
}

export interface HentSykmeldingerLASTERAction {
    type: ActionType.HENT_SYKMELDINGER_LASTER;
}

export interface HentSykmeldingerFEILETAction {
    type: ActionType.HENT_SYKMELDINGER_FEILET;
}

export interface IkkeHentSykmeldingerAction {
    type: ActionType.IKKE_HENT_SYKMELDINGER;
}

export interface HentArbeidsledigOKAction {
    type: ActionType.HENT_ARBEIDSLEDIG_OK;
    arbeidsledig: ArbeidsledigState;
}

export interface HentArbeidsledigLASTERAction {
    type: ActionType.HENT_ARBEIDSLEDIG_LASTER;
}

export interface HentArbeidsledigFEILETAction {
    type: ActionType.HENT_ARBEIDSLEDIG_FEILET;
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
    | HentSykmeldingerOKAction
    | HentSykmeldingerFEILETAction
    | HentSykmeldingerLASTERAction
    | IkkeHentSykmeldingerAction
    | HentArbeidsledigOKAction
    | HentArbeidsledigLASTERAction
    | HentArbeidsledigFEILETAction;
