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
           <div className="banner-tekst">
                <Sidetittel>
                    <Tekst id={tekstId}/>
                </Sidetittel>
            </div>
        </section>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    harArbeidsgiver: state.sykmeldinger.data.harArbeidsgiver,
});

export default connect(mapStateToProps)(StartsideBanner);
