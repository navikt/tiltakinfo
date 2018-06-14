import * as React from 'react';
import 'nav-frontend-lenker-style';
import './brodsmuler.less';

export function Brodsmuler () {

    const brodsmuleikon = require('../ikoner/person.svg');

    return (
        <nav className="brodsmuler" aria-label="Du er her:" >
            <img src={brodsmuleikon} alt="" className="brodsmuler__ikon" />
            <div className="brodsmuler__smuler">

                <a href="/dittnav/" className="lenke">Ditt NAV</a>
                <span className="brodsmule__skille">/</span>
                <a href="/sykefravaer/" className="lenke">Ditt sykefravær</a>
                <span className="brodsmule__skille">/</span>
                <span>Tiltaksinfo</span>

            </div>
        </nav>
    );
}