/* tslint:disable */

import { MaalState } from './reducer';

function read(scope: string) {
    const content = localStorage.getItem(scope);
    if (!content || content === 'undefined') {
        return undefined;
    }
    return JSON.parse(content);
}

function write(scope: string, content: any) {
    return localStorage.setItem(scope, JSON.stringify(content));
}

type PersistentType = MaalState;

function erBesvarelseEndret(
    scope: string,
    initialState: PersistentType
) {
    const content = localStorage.getItem(scope);
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

export default (
    scope: string,
    location: Location,
    reducer: any,
    initialState: PersistentType
) => (state: any, action: any) => {
    let nState = state;
    if (
        erBesvarelseEndret(scope, initialState) ||
        erBesvarelseEndret(scope, initialState)
    ) {
        write(scope, undefined);
    }
    if (state === undefined) {
        nState = read(scope);
    }

    const rState = reducer(nState, action);

    if (rState !== nState) {
        write(scope, rState);
    }

    return rState;
};
