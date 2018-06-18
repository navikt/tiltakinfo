import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './redux/store';
import Innhold from './innhold';
import DataProvider from './data-provider';
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
                <BrowserRouter basename="/tiltakinfo">
                    <DataProvider>
                        <Innhold/>
                    </DataProvider>
                </BrowserRouter>
            </StoreProvider>
        );
    }
}

export default App;
