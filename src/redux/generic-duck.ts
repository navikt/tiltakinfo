import { ActionType } from './actions';

export interface Data {
    [key: string]: any; // tslint:disable-line:no-any
}

interface ActionCreator extends Data {
    type: ActionType;
}

interface GenericDuck<I> {
    reducer: (state: I, action: ActionCreator) => I;
    actionCreator: (data: Data) => ActionCreator;
}

export default function genericDuck<I>(initialState: I, actionType: ActionType): GenericDuck<I> {
    const reducer = (state: I = initialState, action: ActionCreator): I => {
        switch (action.type) {
            case actionType:
                return Object.assign(state, action.data);
            default:
                return state;
        }
    };

    const actionCreator = (data: Data): ActionCreator => ({
        data,
        type: actionType,
    });

    return {
        reducer,
        actionCreator,
    };
}
