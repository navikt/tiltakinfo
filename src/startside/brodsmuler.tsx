import * as React from 'react';
import 'nav-frontend-lenker-style';
import './brodsmuler.less';
import Tekst from '../finn-tekst';

export default function Brodsmuler () {

    const brodsmuleikon = require('../ikoner/person.svg');

    return (
        <nav className="brodsmuler" aria-label="Du er her:" >
            <img src={brodsmuleikon} alt="" className="brodsmuler__ikon" />
            <div className="brodsmuler__smuler">

                <a href="/dittnav/" className="lenke"><Tekst id={'brodsmuler-dittnav'}/></a>
                <span className="brodsmule__skille">/</span>
                <a href="/sykefravaer/" className="lenke"><Tekst id={'brodsmuler-dittsykefravaer'}/></a>
                <span className="brodsmule__skille">/</span>
                <span><Tekst id={'brodsmuler-tiltak'}/></span>

            </div>
        </nav>
    );
}