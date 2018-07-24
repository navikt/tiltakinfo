import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './tittel.less';
import Tekst from '../finn-tekst';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import Datalaster from '../api/datalaster';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';

interface StateProps {
    harArbeidsgiver: boolean;
    arbeidsforhold: ArbeidsforholdState;
}

export function Tittel({harArbeidsgiver, arbeidsforhold}: StateProps) {
    const tekstId = harArbeidsgiver ? 'tittel-hararbeidsgiver' : 'tittel-utenarbeidsgiver';
    return (
        <Datalaster avhengigheter={[arbeidsforhold]}>
            <section className="tittel blokk-m">
                <Sidetittel><Tekst id={tekstId}/></Sidetittel>
            </section>
        </Datalaster>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    harArbeidsgiver: state.arbeidsforhold.data.harArbeidsgiver,
    arbeidsforhold: state.arbeidsforhold,
});

export default connect(mapStateToProps)(Tittel);
