import './index.less';
import 'nav-frontend-core/less/core.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root') as HTMLElement);

unregister();
