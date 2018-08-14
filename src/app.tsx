import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './redux/store';
import Innhold from './innhold';
import DataProvider from './data-provider';
import { erLocalhost, erFullMock } from './mock/utils';
import setupMock from './mock/setup-mock';
import StatusProvider from './status/status-provider';
import UnleashProvider from './unleash-provider';

if (erFullMock() || erLocalhost()) {
    setupMock();
}

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <StoreProvider store={store}>
                <StatusProvider>
                    <UnleashProvider>
                        <DataProvider>
                            <BrowserRouter basename="/tiltakinfo">
                                <Innhold/>
                            </BrowserRouter>
                        </DataProvider>
                    </UnleashProvider>
                </StatusProvider>
            </StoreProvider>
        );
    }
}

export default App;
