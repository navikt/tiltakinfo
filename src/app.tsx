import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './redux/store';
import Innhold from './innhold';
import UnleashProvider from './unleash/unleash-provider';
import OppfolgingProvider from './oppfolging/oppfolging-provider';
import { erLocalhost, erMock } from './mock/utils';
import { setupMock } from './mock/setup-mock';

if (erMock() || erLocalhost()) {
    setupMock();
}

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <StoreProvider store={store}>
                <UnleashProvider>
                    <BrowserRouter basename="/tiltakinfo">
                        <OppfolgingProvider>
                            <Innhold/>
                        </OppfolgingProvider>
                    </BrowserRouter>
                </UnleashProvider>
            </StoreProvider>
        );
    }
}

export default App;
