import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Tekst from '../finn-tekst';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, SituasjonOption, tiltakMap } from './tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import Veilederpanel from 'nav-frontend-veilederpanel';
import TiltakKomponent from './tiltak-komponent';
import { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';

const veilederBilde = require('../ikoner/veileder-dame.svg');

interface StateProps {
    maalId: MaalOption;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
}

interface State {
    windowSize: number;
}

class TiltakContainer extends React.Component<StateProps, State> {
    constructor(props: StateProps) {
        super(props);
        this.state = {
            windowSize: window.innerWidth
        };
        this.handleWindowSize = this.handleWindowSize.bind(this);
    }

    handleWindowSize() {
        this.setState({
            windowSize: window.innerWidth
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
    }

    render() {
        const mapTiltakConfig = (tiltakId: TiltakId) => tiltakConfig(tiltakId);
        const erDesktop = this.state.windowSize > 767;

        const finnTiltak = (tiltakMapKey: string) => {
            return tiltakMap[tiltakMapKey].map(mapTiltakConfig);
        };

        const {maalId, arbeidsledigSituasjon, syfoSituasjon} = this.props;
        const tiltakSomVises: Tiltak[] =
            arbeidsledigSituasjon.situasjon !== SituasjonOption.UBESTEMT
                ? finnTiltak(arbeidsledigSituasjon.situasjon)
                : syfoSituasjon.harArbeidsgiver
                    ? finnTiltak(maalId)
                    : finnTiltak(SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER);
        return (
            <>
                { (syfoSituasjon.harArbeidsgiver)
                && ((maalId === MaalOption.SAMME_ARBEIDSGIVER) || (maalId === MaalOption.SAMME_STILLING)) &&
                    <section className="tiltak-ingress">
                        <Veilederpanel
                            svg={<img src={veilederBilde}/>}
                            type={erDesktop ? 'normal' : 'plakat'}
                            kompakt={true}
                        >
                                <Tekst id="veileder-maal-samme-arbeidsgiver"/>
                        </Veilederpanel>
                    </section> }
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
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        maalId: state.maal.id,
        arbeidsledigSituasjon: state.arbeidsledigSituasjon,
        syfoSituasjon: state.syfoSituasjon,
    };
};

export default connect(mapStateToProps)(TiltakContainer);