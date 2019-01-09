import { MaalOption } from '../komponenter/tiltak/tiltak-map';
import genericDuck from './generic-duck';
import { ActionType } from './actions';
import { Bruker } from '../mock/mock-data-config';
import { TiltakId } from '../komponenter/tiltak/tiltak-config';

export enum BrukerType {
    SYKMELDT_MED_ARBEIDSGIVER = 'bruker-sykmeldt-med-arbeidsgiver',
    SYKMELDT_UTEN_ARBEIDSGIVER = 'bruker-sykmeldt-uten-arbeidsgiver',
    ARBEIDSLEDIG_SITUASJONSBESTEMT = 'bruker-arbeidsledig-situasjonsbestemt',
    ARBEIDSLEDIG_SPESIELT_TILPASSET = 'bruker-arbeidsledig-spesielt-tilpasset',
    UTENFOR_MAALGRUPPE = 'bruker-utenfor-maalgruppe',
}

export interface BrukertypeState {
    brukerType: BrukerType;
}

const inititalBrukertypeState = {
    brukerType: BrukerType.UTENFOR_MAALGRUPPE,
};

export const brukertypeDuck = genericDuck<BrukertypeState, ActionType.SETT_BRUKERTYPE>(inititalBrukertypeState, ActionType.SETT_BRUKERTYPE);

export interface MaalState {
    id: MaalOption;
}

export const initialMaalState: MaalState = {
    id: MaalOption.IKKE_VALGT
};

export const maalDuck = genericDuck<MaalState, ActionType.SETT_MAAL>(
    initialMaalState,
    ActionType.SETT_MAAL
);

export interface TiltakState {
    nokkelEn?: TiltakId;
    nokkelTo?: TiltakId;
}

const initialTiltakState: TiltakState = {
    nokkelEn: undefined,
    nokkelTo: undefined
};

export const tiltakDuck = genericDuck<TiltakState, ActionType.SETT_TILTAK>(initialTiltakState, ActionType.SETT_TILTAK);

export interface DemoBrukerState {
    id: Bruker;
}

export const initialDemoBrukerState: DemoBrukerState = {
    id: Bruker.DEFAULT_MOCK,
};

export const demoBrukerDuck = genericDuck<DemoBrukerState, ActionType.SETT_DEMOBRUKER>(
    initialDemoBrukerState,
    ActionType.SETT_DEMOBRUKER
);