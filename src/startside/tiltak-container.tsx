import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Tekst  from '../finn-tekst';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, maalTiltakMap } from './maal-tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';
import TiltakKomponent from './tiltak-komponent';

interface StateProps {
    sykmeldinger: SykmeldingerState;
    maalId: MaalOption;
}

class TiltakContainer extends React.Component<StateProps> {
    render() {
        const {sykmeldinger, maalId} = this.props;

        const tiltakSomVises: Tiltak[] = sykmeldinger.data.harArbeidsgiver ?
            maalTiltakMap[maalId].map(tiltakId => tiltakConfig(tiltakId)) :
            [tiltakConfig(TiltakId.LONNSTILSKUDD), tiltakConfig(TiltakId.OPPFOLGING)];

        return (
            <section className="tiltak-oversikt">
                <Undertittel className="tiltak-overskrift blokk-s">
                    <Tekst id={'informasjon-totiltak'}/>
                </Undertittel>
                <div className="tiltak-liste">
                    {tiltakSomVises.map((tiltak: Tiltak) =>
                        <TiltakKomponent key={tiltak.tittel} tiltak={tiltak} />
                    )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        sykmeldinger: state.sykmeldinger,
        maalId: state.maal.id,
    };
};

export default connect(mapStateToProps)(TiltakContainer);