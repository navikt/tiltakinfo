import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'nav-frontend-core/less/core.less';
import App from './app';
import { unregister } from './registerServiceWorker';

import './index.less';

ReactDOM.render(<App/>, document.getElementById('app-root') as HTMLElement);

unregister();
