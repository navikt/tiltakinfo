import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { API } from '../api/api';
import * as queryString from 'query-string';
import { Sykmelding } from '../sykmeldinger/sykmeldinger-duck';
import { Bruker, brukerMocks, MockConfigPropName } from './mock-data-config';

interface ResponseObject {
    [key: string]: any; // tslint:disable-line:no-any
}

interface MockAPI {
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
            const verdiParsed = toBoolean(urlVerdi);
            if (urlKey === MockConfigPropName.SYKMELDINGER) {
                return verdiParsed === true
                    ? brukerMocks[Bruker.SYKMELDT_MED_ARBEIDSGIVER][MockConfigPropName.SYKMELDINGER]
                    : [];
            } else {
                return verdiParsed;
            }
        }
        return brukerMocks[Bruker.DEFAULT_MOCK_BRUKER][urlKey];
    };

    const mockAPI: MockAPI = {
        getOppfolging: {
            underOppfolging: finnVerdi(MockConfigPropName.UNDER_OPPFOLGING),
        },
        getStatus: {
            harGyldigOidcToken: finnVerdi(MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN),
        },
        getSykmeldinger: finnVerdi(MockConfigPropName.SYKMELDINGER),
    };

    fetchMock.get(API.getOppfolging, mockAPI.getOppfolging);

    fetchMock.get(API.getStatus, mockAPI.getStatus);

    fetchMock.get(API.getSykmeldinger, mockAPI.getSykmeldinger);
};
