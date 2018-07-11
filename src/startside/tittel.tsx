import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Tekst from '../finn-tekst';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';

interface StateProps {
    harArbeidsgiver: boolean;
}

export function Tittel({harArbeidsgiver}: StateProps) {
    const tekstId = harArbeidsgiver ? 'tittel-hararbeidsgiver' : 'tittel-utenarbeidsgiver';
    return (
        <section className="blokk-xs">
            <Sidetittel><Tekst id={tekstId}/></Sidetittel>
        </section>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    harArbeidsgiver: state.arbeidsforhold.data.harArbeidsgiver,
});

export default connect(mapStateToProps)(Tittel);
