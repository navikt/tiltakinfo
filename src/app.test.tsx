import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { FetchStub, stubFetch } from './test/fetch-test-utils';
import { API, featureQueryParams } from './api/api';
import { tiltakinfoABTestingLesMerOmTiltaket } from './unleash/unleash-duck';

it('renders without crashing', () => {
    const unleashUrl = API.getUnleash + featureQueryParams([tiltakinfoABTestingLesMerOmTiltaket]);
    stubFetch(new FetchStub().addResponse(unleashUrl, new Response(`${[tiltakinfoABTestingLesMerOmTiltaket]}: true`)));

    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});
