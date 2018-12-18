import * as React from 'react';
import 'nav-frontend-lenker-style';
import Tekst from '../finn-tekst';
import brodsmuleikon from '../ikoner/person.svg';

import './brodsmuler.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface OwnProps {
    arbeidsledig: boolean;
    sykmeldt: boolean;
}

export default class Brodsmuler extends React.Component<OwnProps> {

    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const {arbeidsledig, sykmeldt} = this.props;

        return (
            <nav className="brodsmuler" aria-label="Du er her:">
                <img src={brodsmuleikon} alt="" aria-hidden="true" className="brodsmuler__ikon"/>
                <div className="brodsmuler__smuler">
                    <a href="/dittnav" className="lenke">
                        <Normaltekst tag="span">
                            <Tekst id={'brodsmuler-dittnav'}/>
                        </Normaltekst>
                    </a>
                    <Normaltekst tag="span" className="brodsmule__skille">/</Normaltekst>
                    {sykmeldt &&
                    <>
                        <a href="/sykefravaer" className="lenke">
                            <Normaltekst tag="span">
                                <Tekst id={'brodsmuler-dittsykefravaer'}/>
                            </Normaltekst>
                        </a>
                        <Normaltekst tag="span" className="brodsmule__skille">/</Normaltekst>
                    </>
                    }
                    {arbeidsledig &&
                    <>
                        <a href="/veientilarbeid" className="lenke">
                            <Normaltekst tag="span">
                                <Tekst id={'brodsmuler-veientilarbeid'}/>
                            </Normaltekst>
                        </a>
                        <Normaltekst tag="span" className="brodsmule__skille">/</Normaltekst>
                    </>
                    }
                    <Normaltekst tag="span"><Tekst id={'brodsmuler-tiltak'}/></Normaltekst>
                </div>
            </nav>
        );
    }
}
