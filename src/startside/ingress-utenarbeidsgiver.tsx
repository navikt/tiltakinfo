import * as React from 'react';
import { Ingress as Ingresskomponent } from 'nav-frontend-typografi';
import './ingress-utenarbeidsgiver.less';
import Tekst from '../finn-tekst';
import Veilederpanel from 'nav-frontend-veilederpanel';

import veilederBilde from '../ikoner/veileder-dame.svg';

export default function IngressUtenArbeidsgiver() {
    return (
        <section className="ingress">
            <Veilederpanel svg={<img src={veilederBilde} alt="" aria-hidden="true"/>} type="plakat" kompakt={true}>
                <Ingresskomponent>
                    <Tekst id="ingress-utenarbeidsgiver"/>
                </Ingresskomponent>
            </Veilederpanel>
        </section>
    );
}
