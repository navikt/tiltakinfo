import * as React from 'react';
import 'nav-frontend-lenker-style';
import './brodsmuler.less';

export function Brodsmuler () {

    const brodsmuleikon = require('../ikoner/person.svg');

    return (
        <nav className="brodsmuler nav-frontend-lenker" aria-label="Du er her:" >
            <img src={brodsmuleikon} alt="" className="brodsmuler__ikon" />
            <div className="brodsmuler__smuler">

                <a href="/dittnav/" className="lenke">Ditt Nav</a>

                <span className="brodsmule__skille">/</span>

                <a href="/dittsykefravaer/" className="lenke">Ditt sykefravær</a>

                <span className="brodsmule__skille">/</span>

                <span>Tiltak</span>

            </div>
        </nav>
    );
}