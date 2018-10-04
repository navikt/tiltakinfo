import * as React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import './startside-banner.less';
import Tekst from '../finn-tekst';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';

interface StateProps {
    harArbeidsgiver: boolean;
}

export function StartsideBanner({harArbeidsgiver}: StateProps) {
    const tekstId = harArbeidsgiver ? 'tittel-hararbeidsgiver' : 'tittel-utenarbeidsgiver';
    return (
        <section className="startside-banner blokk-m">
            <Sidetittel>
                <Tekst id={tekstId}/>
            </Sidetittel>
        </section>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    harArbeidsgiver: state.syfoSituasjon.harArbeidsgiver,
});

export default connect(mapStateToProps)(StartsideBanner);
