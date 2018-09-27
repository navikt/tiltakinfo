import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { API } from '../api/api';
import * as queryString from 'query-string';
import { Sykmelding } from '../brukerdata/sykmeldinger-duck';
import { Bruker, brukerMocks, MockConfigPropName } from './mock-data-config';

interface ResponseObject {
    [key: string]: any; // tslint:disable-line:no-any
}

interface MockAPI {
    getOppfolging: ResponseObject;
    getStatus: ResponseObject;
    getSykmeldinger: Sykmelding[];
    getArbeidsledig: ResponseObject;
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
        [MockConfigPropName.SYKMELDINGER] : verdiFraUrl(MockConfigPropName.SYKMELDINGER),
        [MockConfigPropName.HAR_ARBEIDSGIVER] : verdiFraUrl(MockConfigPropName.HAR_ARBEIDSGIVER),
        [MockConfigPropName.SERVICEGRUPPE] : verdiFraUrl(MockConfigPropName.SERVICEGRUPPE),
    };

    const finnVerdi = (urlKey: string) => {

        if (mockVerdier[urlKey] !== undefined) {
            const verdiParsed = toBoolean(mockVerdier[urlKey]);
            if (urlKey === MockConfigPropName.SYKMELDINGER) {
                if (verdiParsed) {
                    if (toBoolean(mockVerdier[MockConfigPropName.HAR_ARBEIDSGIVER])) {
                        return brukerMocks[Bruker.SYKMELDT_MED_ARBEIDSGIVER][MockConfigPropName.SYKMELDINGER];
                    } else {
                        return brukerMocks[Bruker.SYKMELDT_UTEN_ARBEIDSGIVER][MockConfigPropName.SYKMELDINGER];
                    }
                } else {
                    return [];
                }
            } else if (urlKey === MockConfigPropName.SERVICEGRUPPE) {
                return mockVerdier[urlKey];
            } else {
                return verdiParsed;
            }
        }
        return brukerMocks.defaultMock[urlKey];
    };

    const mockAPI: MockAPI = {
        getOppfolging: {
            underOppfolging: finnVerdi(MockConfigPropName.UNDER_OPPFOLGING),
        },
        getStatus: {
            harGyldigOidcToken: finnVerdi(MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN),
        },
        getSykmeldinger: finnVerdi(MockConfigPropName.SYKMELDINGER),
        getArbeidsledig: {
            servicegruppe: finnVerdi(MockConfigPropName.SERVICEGRUPPE)
        },
    };

    fetchMock.get(API.getOppfolging, mockAPI.getOppfolging);

    fetchMock.get(API.getStatus, mockAPI.getStatus);

    fetchMock.get(API.getSykmeldinger, mockAPI.getSykmeldinger);

    fetchMock.get(API.getArbeidsledig, mockAPI.getArbeidsledig);
};
