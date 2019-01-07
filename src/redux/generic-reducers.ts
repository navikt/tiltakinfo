import { MaalOption } from '../startside/tiltak/tiltak-map';
import genericDuck from './generic-duck';
import { ActionType } from './actions';
import { Bruker } from '../mock/mock-data-config';

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
    nokkelEn: string;
    nokkelTo: string;
}

const initialTiltakState: TiltakState = {
    nokkelEn: '',
    nokkelTo: ''
};

export const tiltakDuck = genericDuck<TiltakState, ActionType.SETT_TILTAK>(initialTiltakState, ActionType.SETT_TILTAK);

export interface DemoBrukerState {
    id: Bruker;
}

export const initialDemoBrukerState: DemoBrukerState = {
    id: Bruker.DEFAULT_MOCK,
};

export const demoBrukerDuck = genericDuck<DemoBrukerState, ActionType.SETT_BRUKERTYPE>(
    initialDemoBrukerState,
    ActionType.SETT_BRUKERTYPE
);