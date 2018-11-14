import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './startside-banner.less';
import Tekst from '../finn-tekst';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import Brodsmuler from './brodsmuler';
import { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { SituasjonOption } from './tiltak-map';

interface StateProps {
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
}

export function StartsideBanner({arbeidsledigSituasjon, syfoSituasjon}: StateProps) {
    const tekstId = syfoSituasjon.harArbeidsgiver
        ? 'tittel-hararbeidsgiver'
        : 'tittel-utenarbeidsgiver';

    const sykmeldt = syfoSituasjon.erSykmeldt;
    const arbeidsledig =
        (arbeidsledigSituasjon.situasjon === SituasjonOption.SITUASJONSBESTEMT)
        || (arbeidsledigSituasjon.situasjon === SituasjonOption.SPESIELT_TILPASSET);

    return (
        <section className="startside-banner blokk-m">
            <div className="brodsmuler-container">
                <Brodsmuler
                    arbeidsledig={arbeidsledig}
                    sykmeldt={sykmeldt}
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

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsledigSituasjon: state.arbeidsledigSituasjon,
    syfoSituasjon: state.syfoSituasjon,
});

export default connect(mapStateToProps)(StartsideBanner);
