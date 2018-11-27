import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { API } from '../api/api';
import * as queryString from 'query-string';
import { Bruker, brukerMocks, MockConfigPropName } from './mock-data-config';

interface ResponseObject {
    [key: string]: any; // tslint:disable-line:no-any
}

interface MockAPI {
    getOppfolging: ResponseObject;
    getOppfolgingsstatus: ResponseObject;
    getSyfo: ResponseObject;
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

    const mockVerdier = {
        [MockConfigPropName.UNDER_OPPFOLGING] : verdiFraUrl(MockConfigPropName.UNDER_OPPFOLGING),
        [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN] : verdiFraUrl(MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN),
        [MockConfigPropName.SERVICEGRUPPE] : verdiFraUrl(MockConfigPropName.SERVICEGRUPPE),
        [MockConfigPropName.HAR_ARBEIDSGIVER_URLMOCK] : verdiFraUrl(MockConfigPropName.HAR_ARBEIDSGIVER_URLMOCK),
        [MockConfigPropName.ER_SYKMELDT_URLMOCK] : verdiFraUrl(MockConfigPropName.ER_SYKMELDT_URLMOCK),
    };

    const finnVerdi = (urlKey: string) => {
        if (urlKey === MockConfigPropName.SYFODATA) {
            if (toBoolean(mockVerdier[MockConfigPropName.HAR_ARBEIDSGIVER_URLMOCK])) {
                return brukerMocks[Bruker.SYKMELDT_MED_ARBEIDSGIVER][MockConfigPropName.SYFODATA];
            } else if (toBoolean(mockVerdier[MockConfigPropName.ER_SYKMELDT_URLMOCK])) {
                return brukerMocks[Bruker.SYKMELDT_UTEN_ARBEIDSGIVER][MockConfigPropName.SYFODATA];
            } else {
                return brukerMocks[Bruker.UTENFOR_MAALGRUPPE][MockConfigPropName.SYFODATA];
            }
        } else if (mockVerdier[urlKey] !== undefined) {
            if (urlKey === MockConfigPropName.SERVICEGRUPPE) {
                return mockVerdier[urlKey];
            } else {
                return toBoolean(mockVerdier[urlKey]);
            }
        }
        return brukerMocks[Bruker.UTENFOR_MAALGRUPPE][urlKey];
    };

    const mockAPI: MockAPI = {
        getOppfolging: {
            underOppfolging: finnVerdi(MockConfigPropName.UNDER_OPPFOLGING),
        },
        getOppfolgingsstatus: {
            servicegruppe: finnVerdi(MockConfigPropName.SERVICEGRUPPE),
            oppfolgingsenhet: finnVerdi(MockConfigPropName.OPPFOLGINGSENHET)
        },
        getSyfo: finnVerdi(MockConfigPropName.SYFODATA),
    };

    fetchMock.get(API.getOppfolging, mockAPI.getOppfolging);

    fetchMock.get(API.getOppfolgingsstatus, mockAPI.getOppfolgingsstatus);

    fetchMock.get(API.getSyfo, mockAPI.getSyfo);
};
