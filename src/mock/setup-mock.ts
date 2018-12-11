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
            MiddlewareUtils.failurerateMiddleware(0.00),
            loggingMiddleware
        )
    });

    console.log('### FULL MOCK AKTIVERT! ###'); // tslint:disable-line:no-console

    const hentLagretDemoBruker = (): Bruker => {
        let lagretDemobruker = Bruker.DEFAULT_MOCK;
        const demobrukerLocalStorage = localStorage.getItem('demoBrukerState');
        if (demobrukerLocalStorage) {
            const demobruker: Demobruker = JSON.parse(demobrukerLocalStorage);
            brukerOptionsRekkefolge.forEach((bruker: Bruker) => {
                if (bruker === demobruker.id) {
                    lagretDemobruker = bruker;
                }
            });
        }
        return lagretDemobruker;
    };

    const finnMockConfig = (): MockConfig => {
        const lagretDemoBruker = hentLagretDemoBruker();
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

    fetchMock.get(API.getSyfo, {
        [MockConfigPropName.ER_SYKMELDT]: mockData[MockConfigPropName.ER_SYKMELDT],
        [MockConfigPropName.HAR_ARBEIDSGIVER]: mockData[MockConfigPropName.HAR_ARBEIDSGIVER],
    });

    const mockDataRegistrering = mockData[MockConfigPropName.REGISTRERING];
    if (mockDataRegistrering !== undefined) {
        fetchMock.get(API.getRegistrering, mockDataRegistrering);
    }
};
