import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { tiltakinfoHentsykmeldinger } from '../unleash/unleash-duck';
import { API } from '../api/api';
import * as queryString from 'query-string';
import { Sykmelding } from '../sykmeldinger/sykmeldinger-duck';
import { brukerMocks, MockConfigPropName } from './mock-data-config';

interface ResponseObject {
    [key: string]: any; // tslint:disable-line:no-any
}

interface MockAPI {
    getUnleash: ResponseObject;
    getOppfolging: ResponseObject;
    getStatus: ResponseObject;
    getSykmeldinger: Sykmelding[];
}

export default () => {

    const loggingMiddleware: Middleware = (request, response) => {
        console.log(request.url, response); // tslint:disable-line:no-console
        return response;
    };

    const fetchMock = FetchMock.configure({
        enableFallback: true, // default: true
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.delayMiddleware(200),
            MiddlewareUtils.failurerateMiddleware(0.01),
            loggingMiddleware
        )
    });

    console.log('### FULL MOCK AKTIVERT! ###'); // tslint:disable-line:no-console

    const toBoolean = (arg: string): boolean => arg === 'true';

    const verdiFraUrl = (nokkel: string) => {
        const queryParamsParsed = queryString.parse(location.search);
        return queryParamsParsed[nokkel];
    };

    const finnVerdi = (urlKey: string) => {
        const urlVerdi = verdiFraUrl(urlKey);
        if (urlVerdi !== undefined) {
            if (urlKey === MockConfigPropName.SYKMELDINGER) {
                return (urlVerdi as string[]).map((sykmelding: string): Sykmelding => JSON.parse(sykmelding));
            } else {
                return toBoolean(urlVerdi);
            }
        }
        return brukerMocks.defaultMock[urlKey];
    };

    const mockAPI: MockAPI = {
        getUnleash: {
            [tiltakinfoHentsykmeldinger]: finnVerdi(tiltakinfoHentsykmeldinger),
        },
        getOppfolging: {
            underOppfolging: finnVerdi(MockConfigPropName.UNDER_OPPFOLGING),
        },
        getStatus: {
            harGyldigOidcToken: finnVerdi(MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN),
        },
        getSykmeldinger: finnVerdi(MockConfigPropName.SYKMELDINGER),
    };

    fetchMock.get(API.getUnleash, mockAPI.getUnleash);

    fetchMock.get(API.getOppfolging, mockAPI.getOppfolging);

    fetchMock.get(API.getStatus, mockAPI.getStatus);

    fetchMock.get(API.getSykmeldinger, mockAPI.getSykmeldinger);
};
