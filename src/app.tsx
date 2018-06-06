import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getStore from './store';
import Innhold from './innhold';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <StoreProvider store={store}>
                <BrowserRouter basename="/tiltakinfo">
                    <Innhold/>
                </BrowserRouter>
            </StoreProvider>
        );
    }
}

export default App;
