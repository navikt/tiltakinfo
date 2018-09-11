import * as React from 'react';
import { Ingress as Ingresskomponent } from 'nav-frontend-typografi';
import './ingress-sykmeldtutenarbeidsgiver.less';
import Tekst from '../finn-tekst';
import Veilederpanel from 'nav-frontend-veilederpanel';

const veilederBilde = require('../ikoner/veileder-dame.svg');

export default function IngressSykmeldtutenarbeidsgiver() {
    return (
        <section className="ingress">
            <Veilederpanel svg={<img src={veilederBilde}/>} type="plakat" kompakt={true}>
                <Ingresskomponent>
                    <Tekst id="ingress-utenarbeidsgiver"/>
                </Ingresskomponent>
            </Veilederpanel>
        </section>
    );
}
