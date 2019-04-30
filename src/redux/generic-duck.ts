import { Action, Reducer } from 'redux';

export interface Data {
    [key: string]: any; // tslint:disable-line:no-any
}

interface ActionCreator<A> extends Data {
    type: A;
}

interface GenericDuck<I, T> {
    reducer: Reducer<I, Action<T>>;
    actionCreator: (data: Data) => Action<T>;
}

export default function genericDuck<I extends object, T>(initialState: I, actionType: T): GenericDuck<I, T> {
    const reducer = (state: I = initialState, action: ActionCreator<T>): I => {
        switch (action.type) {
            case actionType:
                const {type, ...data} = action; // type blir tatt ut her fordi vi ikke ønsker å ha dette feltet med videre inn i staten
                return Object.assign({}, state, data);
            default:
                return state;
        }
    };

    const actionCreator = (data: Data): ActionCreator<T> => ({
        ...data,
        type: actionType,
    });

    return {
        reducer,
        actionCreator,
    };
}
