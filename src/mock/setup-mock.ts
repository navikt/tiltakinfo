import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { API } from '../api/api';
import { Bruker, brukerMocks, brukerOptionsRekkefolge, MockConfig, MockConfigPropName } from './mock-data-config';

interface Demobruker {
    [key: string]: string;
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

    const sjekkLagretDemobruker = () => {
        let LagretDemobruker = Bruker.DEFAULT_MOCK;
        const demobrukerLocalStorage = localStorage.getItem('demoBrukerState');
        if (demobrukerLocalStorage) {
            const demobruker: Demobruker = JSON.parse(demobrukerLocalStorage);
            brukerOptionsRekkefolge.forEach((bruker: Bruker) => {
                if (bruker === demobruker.id) {
                    LagretDemobruker = bruker;
                }
            });
        }
        return LagretDemobruker;
    };

    const finnMockConfig = (): MockConfig => {
        const lagretDemoBruker = sjekkLagretDemobruker();
        if (lagretDemoBruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER) {
            return brukerMocks[Bruker.SYKMELDT_MED_ARBEIDSGIVER];
        } else if (lagretDemoBruker === Bruker.SYKMELDT_UTEN_ARBEIDSGIVER) {
            return brukerMocks[Bruker.SYKMELDT_UTEN_ARBEIDSGIVER];
        } else if (lagretDemoBruker === Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET) {
            return brukerMocks[Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET];
        } else if (lagretDemoBruker === Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT) {
            return brukerMocks[Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT];
        } else {
            return brukerMocks[Bruker.UTENFOR_MAALGRUPPE];
        }
    };

    const mockData: MockConfig = finnMockConfig();

    fetchMock.get(API.getOppfolging, {
        [MockConfigPropName.UNDER_OPPFOLGING]: mockData[MockConfigPropName.UNDER_OPPFOLGING]
    });

    fetchMock.get(API.getOppfolgingsstatus, {
        [MockConfigPropName.OPPFOLGINGSENHET]: mockData[MockConfigPropName.OPPFOLGINGSENHET],
        [MockConfigPropName.SERVICEGRUPPE]: mockData[MockConfigPropName.SERVICEGRUPPE],
    });

    fetchMock.get(API.getSyfo, mockData[MockConfigPropName.SYFODATA]);

    const mockDataRegistrering = mockData[MockConfigPropName.REGISTRERING];

    if (mockDataRegistrering !== undefined) {
        fetchMock.get(API.getRegistrering, mockDataRegistrering);
    }
};
