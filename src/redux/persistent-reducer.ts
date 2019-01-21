import { DemoBrukerState, MaalState } from './generic-reducers';

function read(storageKey: string) {
    const content = localStorage.getItem(storageKey);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

type PersistentType = MaalState | DemoBrukerState;

function write(storageKey: string, content: any) { // tslint:disable-line:no-any
    return localStorage.setItem(storageKey, JSON.stringify(content));
}

function storageStateHasChanged(storageKey: string, initialState: PersistentType) {
    const content = localStorage.getItem(storageKey);
    if (!content || content === 'undefined') {
        return true;
    }
    const keysFromStorage = Object.keys(JSON.parse(content));
    const keysFromInitialState = Object.keys(initialState);

    return !(
        keysFromStorage.length === keysFromInitialState.length &&
        keysFromStorage.every(key => keysFromInitialState.some(k => k === key))
    );
}

export default <S>(
    storageKey: string,
    location: Location,
    reducer: any, // tslint:disable-line:no-any
    initialState: PersistentType,
    isValid: (storageState: S) => boolean
) => (state: any, action: any) => { // tslint:disable-line:no-any
    if (storageStateHasChanged(storageKey, initialState)) {
        write(storageKey, undefined);
    }
    let nState = state;
    if (state === undefined) {
        const storageState = read(storageKey);
        if (isValid(storageState)) {
            nState = storageState;
        }
    }

    const rState = reducer(nState, action);

    if (rState !== nState) {
        write(storageKey, rState);
    }

    return rState;
};
