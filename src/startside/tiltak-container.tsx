import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Tekst from '../finn-tekst';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, SituasjonOption, tiltakMap } from './tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import TiltakKomponent from './tiltak-komponent';
import { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import { SykmeldingerState } from '../brukerdata/sykmeldinger-duck';

interface StateProps {
    maalId: MaalOption;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    sykmeldinger: SykmeldingerState;
}

class TiltakContainer extends React.Component<StateProps> {
    render() {
        const {sykmeldinger, maalId, arbeidsledigSituasjon} = this.props;
        const tiltakSomVises: Tiltak[] =
            arbeidsledigSituasjon.situasjon !== SituasjonOption.UBESTEMT ?
                tiltakMap[arbeidsledigSituasjon.situasjon].map((tiltakId: TiltakId) => tiltakConfig(tiltakId)) :
                sykmeldinger.data.harArbeidsgiver ?
                    tiltakMap[maalId].map((tiltakId: TiltakId) => tiltakConfig(tiltakId)) :
                    tiltakMap[SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER]
                        .map((tiltakId: TiltakId) => tiltakConfig(tiltakId));
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
        arbeidsledigSituasjon: state.arbeidsledigSituasjon,
        sykmeldinger: state.sykmeldinger,
    };
};

export default connect(mapStateToProps)(TiltakContainer);