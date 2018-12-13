import * as React from 'react';
import Helmet from 'react-helmet';
import { Ingress as Ingresskomponent } from 'nav-frontend-typografi';
import './ingress-utenarbeidsgiver.less';
import Tekst from '../finn-tekst';
import Veilederpanel from 'nav-frontend-veilederpanel';

const veilederBilde = require('../ikoner/veileder-dame.svg');

export default function IngressUtenArbeidsgiver() {
    return (
        <>
            <Helmet>
                <body className="ingress__uten"/>
            </Helmet>
            <Veilederpanel svg={<img src={veilederBilde} alt="" aria-hidden="true"/>} type="plakat" kompakt={true}>
                <Ingresskomponent>
                    <Tekst id="ingress-utenarbeidsgiver"/>
                </Ingresskomponent>
            </Veilederpanel>
        </>
    );
}
