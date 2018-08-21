import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './redux/store';
import Innhold from './innhold';
import DataProvider from './data-provider';
import { erLocalhost, erFullMock, erDemo } from './mock/utils';
import setupMock from './mock/setup-mock';
import StatusProvider from './status/status-provider';
import UnleashProvider from './unleash-provider';
import { contextRoot } from './konstanter';
import mockDashboardInjecter from './mock/mock-dashboard-injecter';

if (erFullMock() || erLocalhost() || erDemo()) {
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
                            <BrowserRouter basename={contextRoot}>
                                <Innhold/>
                            </BrowserRouter>
                        </DataProvider>
                    </UnleashProvider>
                </StatusProvider>
            </StoreProvider>
        );
    }
}

export default mockDashboardInjecter(App);
