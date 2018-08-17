import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { ActiveUnleashFeatures, tiltakinfoHentsykmeldinger } from '../unleash/unleash-duck';
import { API } from '../api/api';
import * as queryString from 'query-string';
import { Sykmelding } from '../sykmeldinger/sykmeldinger-duck';

export enum MockConfigPropName {
    UNDER_OPPFOLGING = 'underOppfolging',
    HAR_GYLDIG_OIDC_TOKEN = 'harGyldigOidcToken',
    SYKMELDINGER = 'sykmeldinger',
}

interface ResponseObject {
    [key: string]: any; // tslint:disable-line:no-any
}

interface MockConfig {
    getUnleash: ResponseObject;
    getOppfolging: ResponseObject;
    getStatus: ResponseObject;
    getSykmeldinger: Sykmelding[];
}

interface MockConfigProperties extends ActiveUnleashFeatures {
    [MockConfigPropName.UNDER_OPPFOLGING]: boolean;
    [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: boolean;
    [MockConfigPropName.SYKMELDINGER]: Sykmelding[];
}

const defaultMockConfig: MockConfigProperties = {
    [tiltakinfoHentsykmeldinger]: true,
    [MockConfigPropName.UNDER_OPPFOLGING]: true,
    [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: true,
    [MockConfigPropName.SYKMELDINGER]: [
        {
            sendtdato: '2018-01-01T01:00:00',
            valgtArbeidssituasjon: 'ARBEIDSLEDIG',
        },
        {
            valgtArbeidssituasjon: 'FRILANSER',
            sendtdato: '2018-01-01T02:00:00',
        },
    ],
};

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

    const erBoolskString = (arg: any) => arg === 'true' || arg === 'false'; // tslint:disable-line:no-any

    const toBoolean = (arg: string): boolean => arg === 'true';

    const verdiFraUrl = <T>(nokkel: string): T => {
        const queryParamsParsed = queryString.parse(location.search);
        const verdi = queryParamsParsed[nokkel];
        return erBoolskString(verdi) ? toBoolean(verdi) : verdi;
    };

    const finnVerdi = <T>(urlKey: string): T => {
        const urlVerdi: T = verdiFraUrl<T>(urlKey);
        if (urlVerdi !== undefined) {
            return urlVerdi;
        }
        const defaultVal: T = defaultMockConfig[urlKey];
        return defaultVal;
    };

    const mockConfig: MockConfig = {
        getUnleash: {
            [tiltakinfoHentsykmeldinger]: finnVerdi<boolean>(tiltakinfoHentsykmeldinger),
        },
        getOppfolging: {
            underOppfolging: finnVerdi<boolean>(MockConfigPropName.UNDER_OPPFOLGING),
        },
        getStatus: {
            harGyldigOidcToken: finnVerdi<boolean>(MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN),
        },
        getSykmeldinger: finnVerdi<Sykmelding[]>(MockConfigPropName.SYKMELDINGER),
    };

    fetchMock.get(API.getUnleash, mockConfig.getUnleash);

    fetchMock.get(API.getOppfolging, mockConfig.getOppfolging);

    fetchMock.get(API.getStatus, mockConfig.getStatus);

    fetchMock.get(API.getSykmeldinger, mockConfig.getSykmeldinger);
};
