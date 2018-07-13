import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { FetchStub, stubFetch } from './test/fetch-test-utils';
import { API, featureQueryParams } from './api/api';
import { tiltakinfoHentarbeidsforhold } from './unleash/unleash-duck';

it('renders without crashing', () => {
    const unleashUrl = API.getUnleash + featureQueryParams([tiltakinfoHentarbeidsforhold]);
    stubFetch(new FetchStub().addResponse(unleashUrl, new Response(`${[tiltakinfoHentarbeidsforhold]}: true`)));

    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
});
