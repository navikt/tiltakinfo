import genericDuck  from './generic-duck';
import { ActionType } from './actions';
describe('generic-reducer', () => {
    describe('genericDuck', () => {
        interface Type {
            feltEn: string;
            feltTo: number;
        }
        const initialState: Type = {feltEn: 'test', feltTo: 2};
        const duck = genericDuck<Type>(initialState, ActionType.TEST_ACTION);
        it('skal oppdatere state korrekt', () => {
            const action = duck.actionCreator({feltEn: 'nytest', feltTo: 10});

            const newState = duck.reducer(initialState, action);

            expect(newState.feltEn).toEqual('nytest');
            expect(newState.feltTo).toEqual(10);
        });
    });
});