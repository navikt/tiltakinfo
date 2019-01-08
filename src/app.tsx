import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './redux/store';
import Innhold from './innhold';
import DataProvider from './provider/data-provider';
import { erLocalhost, erFullMock, erDemo } from './mock/utils';
import setupMock from './mock/setup-mock';
import UnleashProvider from './provider/unleash-provider';
import { contextRoot } from './konstanter';
import mockDashboardInjecter from './mock/mock-dashboard-injecter';
import BrukerProvider from './provider/bruker-provider';

if (erFullMock() || erLocalhost() || erDemo()) {
    setupMock();
}

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <BrowserRouter basename={contextRoot}>
                <UnleashProvider>
                    <DataProvider>
                        <BrukerProvider>
                            <Innhold/>
                        </BrukerProvider>
                    </DataProvider>
                </UnleashProvider>
            </BrowserRouter>
        );
    }
}

const AppWrapper = mockDashboardInjecter(App);

class StoreProvider extends React.Component {
    render() {
        return (
            <ReduxProvider store={store}>
                <AppWrapper/>
            </ReduxProvider>
        );
    }
}

export default StoreProvider;
