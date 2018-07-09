import * as React from 'react';
import 'nav-frontend-lenker-style';
import './brodsmuler.less';
import Tekst from '../finn-tekst';

export function Brodsmuler () {

    const brodsmuleikon = require('../ikoner/person.svg');

    return (
        <nav className="brodsmuler" aria-label="Du er her:" >
            <img src={brodsmuleikon} alt="" className="brodsmuler__ikon" />
            <div className="brodsmuler__smuler">

                <a href="/dittnav/" className="lenke"><Tekst id={'startside-brodsmuler-dittnav'}/></a>
                <span className="brodsmule__skille">/</span>
                <a href="/sykefravaer/" className="lenke"><Tekst id={'startside-brodsmuler-dittsykefravaer'}/></a>
                <span className="brodsmule__skille">/</span>
                <span><Tekst id={'startside-brodsmuler-tiltak'}/></span>

            </div>
        </nav>
    );
}