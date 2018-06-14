import { Handling } from '../redux/actions';
import { Dispatch } from '../redux/dispatch-type';

interface StatusActions<T> {
    ok: (temaer: T) => Handling;
    feilet: () => Handling;
    pending: () => Handling;
}

export function fetchThenDispatch<T>(
    fetchFunction: () => Promise<T>,
    { ok, feilet, pending }: StatusActions<T>
): (dispatch: Dispatch) => Promise<void> {
    return (dispatch: Dispatch): Promise<void> => {
        dispatch(pending());
        return fetchFunction()
            .then(sendResultatTilDispatch<T>(dispatch, ok))
            .catch(handterFeil(dispatch, feilet));
    };
}

function sendResultatTilDispatch<T>(dispatch: Dispatch, okAction: (temaer: T) => Handling): (jsonData: T) => void {
    return (jsonData: T) => {
        dispatch(okAction(jsonData));
    };
}

function handterFeil(dispatch: Dispatch, feiletAction: () => Handling): (error: FetchError) => void {
    return (error: FetchError) => {
        if (error.response) {
            error.response.text().then(() => {
                dispatch(feiletAction());
            });
        } else {
            dispatch(feiletAction());
        }
    };
}

export function fetchToJson<ResponseInterface>(url: string, config: RequestInit): Promise<ResponseInterface> {
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(toJson);
}

class FetchError extends Error {
    public response: Response;

    constructor(reason: string, response: Response) {
        super(reason);
        this.response = response;
    }
}

function sjekkStatuskode(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new FetchError(response.statusText || response.type, response);
}

function toJson(response: Response) {
    if (response.status !== 204) { // No content
        return response.json();
    }
    return null;
}