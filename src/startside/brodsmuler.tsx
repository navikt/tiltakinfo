import * as React from 'react';
import 'nav-frontend-lenker-style';
import './brodsmuler.less';
import Tekst from '../finn-tekst';

interface OwnProps {
    arbeidsledig: boolean;
    sykmeldt: boolean;
}

export default class Brodsmuler extends React.Component<OwnProps> {

    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const brodsmuleikon = require('../ikoner/person.svg');
        const {arbeidsledig, sykmeldt } = this.props;
        return (
            <nav className="brodsmuler" aria-label="Du er her:" >
                <img src={brodsmuleikon} alt="" className="brodsmuler__ikon" />
                <div className="brodsmuler__smuler">
                    <a href="/dittnav" className="lenke"><Tekst id={'brodsmuler-dittnav'}/></a>
                    <span className="brodsmule__skille">/</span>
                    { sykmeldt &&
                        <>
                            <a href="/sykefravaer" className="lenke"><Tekst id={'brodsmuler-dittsykefravaer'}/></a>
                            <span className="brodsmule__skille">/</span>
                        </>
                    }
                    { arbeidsledig &&
                        <>
                            <a href="/veientilarbeid/" className="lenke"><Tekst id={'brodsmuler-veientilarbeid'}/></a>
                            <span className="brodsmule__skille">/</span>
                        </>
                    }
                    <span><Tekst id={'brodsmuler-tiltak'}/></span>
                </div>
            </nav>
        );
    }
}
