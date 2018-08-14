import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { tiltakinfoHentsykmeldinger } from '../unleash/unleash-duck';
import { API } from '../api/api';

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

    const unleashUrl = API.getUnleash;
    fetchMock.get(unleashUrl, {
        [tiltakinfoHentsykmeldinger]: true,
    });

    fetchMock.get(API.getOppfolging, {
        underOppfolging: true,
    });

    fetchMock.get(API.getStatus, {
        harGyldigOidcToken: true,
    });

    fetchMock.get(API.getSykmeldinger, [
        {
            sendtdato: '2018-01-01T01:00:00',
            valgtArbeidssituasjon: 'ARBEIDSLEDIG',
        },
        {
            valgtArbeidssituasjon: 'FRILANSER',
            sendtdato: '2018-01-01T02:00:00',
        },
    ]);
};
