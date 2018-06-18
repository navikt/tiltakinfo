import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { FetchStub, stubFetch } from './test/fetch-test-utils';
import { API, featureQueryParams } from './api/api';
import { tiltakinfoMvp } from './unleash/unleash-duck';

it('renders without crashing', () => {
    const unleashUrl = API.getUnleash + featureQueryParams([tiltakinfoMvp]);
    stubFetch(new FetchStub().addResponse(unleashUrl, new Response(`${[tiltakinfoMvp]}: true`)));

    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});
