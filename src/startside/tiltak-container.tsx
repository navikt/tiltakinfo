import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Tekst from '../finn-tekst';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, tiltakMap } from './tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import TiltakKomponent from './tiltak-komponent';
import { ArbeidsledigState } from '../brukerdata/arbeidsledig-duck';

interface StateProps {
    maalId: MaalOption;
    arbeidsledig: ArbeidsledigState;
}

class TiltakContainer extends React.Component<StateProps> {
    render() {
        const { maalId, arbeidsledig} = this.props;
        const tiltakSomVises: Tiltak[] =
            maalId !== MaalOption.IKKE_VALGT ?
                tiltakMap[maalId].map((tiltakId: TiltakId) => tiltakConfig(tiltakId)) :
                tiltakMap[arbeidsledig.situasjon].map((tiltakId: TiltakId) => tiltakConfig(tiltakId));
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
        maalId: state.maal.id,
        arbeidsledig: state.arbeidsledig,
    };
};

export default connect(mapStateToProps)(TiltakContainer);