import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './startside-banner.less';
import Tekst from '../finn-tekst';
import Brodsmuler from './brodsmuler';

interface OwnProps {
    sykmeldt: boolean;
    arbeidsledig: boolean;
    sykmeldtMedArbeidsgiver: boolean;
}

export function StartsideBanner({sykmeldt, arbeidsledig, sykmeldtMedArbeidsgiver}: OwnProps) {
    const tekstId = sykmeldtMedArbeidsgiver
        ? 'tittel-hararbeidsgiver'
        : 'tittel-utenarbeidsgiver';

    return (
        <section className="startside-banner blokk-m">
            <div className="brodsmuler-container">
                <Brodsmuler
                    sykmeldt={sykmeldt}
                    arbeidsledig={arbeidsledig}
                />
            </div>
            <div className="banner-tekst">
                <Sidetittel>
                    <Tekst id={tekstId}/>
                </Sidetittel>
            </div>
        </section>
    );
}

export default StartsideBanner;
