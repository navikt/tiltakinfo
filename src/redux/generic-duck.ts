export interface Data {
    [key: string]: any; // tslint:disable-line:no-any
}

interface ActionCreator<A> extends Data {
    type: A;
}

interface GenericDuck<I, A> {
    reducer: (state: I | undefined, action: ActionCreator<A>) => I;
    actionCreator: (data: Data) => ActionCreator<A>;
}

export default function genericDuck<I, A>(initialState: I, actionType: A): GenericDuck<I, A> {
    const reducer = (state: I = initialState, action: ActionCreator<A>): I => {
        switch (action.type) {
            case actionType:
                const {type, ...data} = action; // type blir tatt ut her fordi vi ikke ønsker å ha dette feltet med videre inn i staten
                return Object.assign({}, state, data);
            default:
                return state;
        }
    };

    const actionCreator = (data: Data): ActionCreator<A> => ({
        ...data,
        type: actionType,
    });

    return {
        reducer,
        actionCreator,
    };
}
