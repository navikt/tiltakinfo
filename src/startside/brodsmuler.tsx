import * as React from 'react';
import './brodsmuler.less';

export function Brodsmuler () {

    const brodsmuleikon = require('../ikoner/person.svg');

    return (
        <>
            <img src={brodsmuleikon} width="30px" alt="Du" className="brodsmuler__ikon" />
            <a href="/dittnav/" className="lenke">Ditt Nav</a>
            <span className="brodsmule__skille"> / </span>
            <a href="/dittsykefravaer/" className="lenke">Ditt sykefravær</a>
            <span className="brodsmule__skille"> / Tiltaksinfo</span>
        </>
    );
}