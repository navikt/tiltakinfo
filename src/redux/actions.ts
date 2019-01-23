import { Data } from './generic-duck';
import { UnleashState } from '../unleash/unleash-duck';
import { SyfoDataState } from '../brukerdata/syfo-duck';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { RegistreringDataState } from '../brukerdata/registrering-duck';
import { User } from '../brukerdata/bruker-duck';
import { Melding } from '../brukerdata/melding-til-veileder-duck';

export enum ActionType {
    TEST_ACTION = 'TEST_ACTION',
    HENT_UNLEASH_OK = 'HENT_UNLEASH_OK',
    HENT_UNLEASH_FEILET = 'HENT_UNLEASH_FEILET',
    HENT_UNLEASH_LASTER = 'HENT_UNLEASH_LASTER',
    HENT_OPPFOLGING_OK = 'HENT_OPPFOLGING_OK',
    HENT_OPPFOLGING_FEILET = 'HENT_OPPFOLGING_FEILET',
    HENT_OPPFOLGING_LASTER = 'HENT_OPPFOLGING_LASTER',
    SETT_MAAL = 'SETT_MAAL',
    SETT_TILTAK = 'SETT_TILTAK',
    HENT_OPPFOLGINGSSTATUS_OK = 'HENT_OPPFOLGINGSSTATUS_OK',
    HENT_OPPFOLGINGSSTATUS_FEILET = 'HENT_OPPFOLGINGSSTATUS_FEILET',
    HENT_OPPFOLGINGSSTATUS_LASTER = 'HENT_OPPFOLGINGSSTATUS_LASTER',
    HENT_SYFO_OK = 'HENT_SYFO_OK',
    HENT_SYFO_FEILET = 'HENT_SYFO_FEILET',
    HENT_SYFO_LASTER = 'HENT_SYFO_LASTER',
    SETT_BRUKERTYPE = 'SETT_BRUKERTYPE',
    HENT_REGISTRERING_OK = 'HENT_REGISTRERING_OK',
    HENT_REGISTRERING_LASTER = 'HENT_REGISTRERING_LASTER',
    HENT_REGISTRERING_FEILET = 'HENT_REGISTRERING_FEILET',
    HENT_BRUKERS_NAVN_OK = 'HENT_BRUKERS_NAVN_OK',
    HENT_BRUKERS_NAVN_PENDING = 'HENT_BRUKERS_NAVN_PENDING',
    HENT_BRUKERS_NAVN_FEILET = 'HENT_BRUKERS_NAVN_FEILET',
    HENT_MELDING_NAV_KONTOR_OK = 'HENT_MELDING_NAV_KONTOR_OK',
    HENT_MELDING_NAV_KONTOR_PENDING = 'HENT_MELDING_NAV_KONTOR_PENDING',
    HENT_MELDING_NAV_KONTOR_FEILET = 'HENT_MELDING_NAV_KONTOR_FEILET',
    LAGRE_BRUKER_OK = 'LAGRE_BRUKER_OK',
    LAGRE_BRUKER_PENDING = 'LAGRE_BRUKER_PENDING',
    LAGRE_BRUKER_FEILET = 'LAGRE_BRUKER_FEILET',
    SEND_MELDING_OK = 'SEND_MELDING_OK',
    SEND_MELDING_PENDING = 'SEND_MELDING_PENDING',
    SEND_MELDING_FEILET = 'SEND_MELDING_FEILET',
    SETT_DEMOBRUKER = 'SETT_DEMOBRUKER',
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

export interface HentRegistreringOKAction {
    type: ActionType.HENT_REGISTRERING_OK;
    registreringData: RegistreringDataState;
}

export interface HentRegistreringLASTERAction {
    type: ActionType.HENT_REGISTRERING_LASTER;
}

export interface HentRegistreringFEILETAction {
    type: ActionType.HENT_REGISTRERING_FEILET;
}

export interface HentBrukersNavnOKAction {
    name: string;
    type: ActionType.HENT_BRUKERS_NAVN_OK;
}

export interface HentBrukersNavnPENDINGAction {
    type: ActionType.HENT_BRUKERS_NAVN_PENDING;
}

export interface HentBrukersNavnFEILETAction {
    type: ActionType.HENT_BRUKERS_NAVN_FEILET;
}

export interface HentMeldingNavKontorOKAction {
    type: ActionType.HENT_MELDING_NAV_KONTOR_OK;
    harSendtMelding: boolean;
}

export interface HentMeldingNavKontorFEILETAction {
    type: ActionType.HENT_MELDING_NAV_KONTOR_FEILET;
}

export interface HentMeldingNavKontorPENDINGAction {
    type: ActionType.HENT_MELDING_NAV_KONTOR_PENDING;
}

export interface LagreBrukerOKAction {
    type: ActionType.LAGRE_BRUKER_OK;
    lagretBruker: User;
}

export interface LagreBrukerPENDINGAction {
    type: ActionType.LAGRE_BRUKER_PENDING;
}

export interface LagreBrukerFEILETAction {
    type: ActionType.LAGRE_BRUKER_FEILET;
}

export interface SendMeldingOKAction {
    type: ActionType.SEND_MELDING_OK;
    melding: Melding;
}

export interface SendMeldingPENDINGAction {
    type: ActionType.SEND_MELDING_PENDING;
}

export interface SendMeldingFEILETAction {
    type: ActionType.SEND_MELDING_FEILET;
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
    | HentSyfoFEILETAction
    | HentRegistreringOKAction
    | HentRegistreringLASTERAction
    | HentRegistreringFEILETAction
    | HentBrukersNavnOKAction
    | HentBrukersNavnPENDINGAction
    | HentBrukersNavnFEILETAction
    | HentMeldingNavKontorOKAction
    | HentMeldingNavKontorPENDINGAction
    | HentMeldingNavKontorFEILETAction
    | LagreBrukerOKAction
    | LagreBrukerPENDINGAction
    | LagreBrukerFEILETAction
    | SendMeldingOKAction
    | SendMeldingPENDINGAction
    | SendMeldingFEILETAction;
