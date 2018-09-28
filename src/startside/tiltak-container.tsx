import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Tekst from '../finn-tekst';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, maalTiltakMap } from './maal-tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';
import Veilederpanel from 'nav-frontend-veilederpanel';
import TiltakKomponent from './tiltak-komponent';

const veilederBilde = require('../ikoner/veileder-dame.svg');

interface StateProps {
    sykmeldinger: SykmeldingerState;
    maalId: MaalOption;
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
        const {sykmeldinger, maalId} = this.props;
        const erDesktop = this.state.windowSize > 767;
        const tiltakSomVises: Tiltak[] = sykmeldinger.data.harArbeidsgiver ?
            maalTiltakMap[maalId].map((tiltakId: TiltakId) => tiltakConfig(tiltakId)) :
            [tiltakConfig(TiltakId.LONNSTILSKUDD), tiltakConfig(TiltakId.OPPFOLGING)];

        return (
            <>
                { (sykmeldinger.data.harArbeidsgiver)
                && ((maalId === MaalOption.SAMME_ARBEIDSGIVER) || (maalId === MaalOption.SAMME_STILLING)) &&
                    <section className="tiltak-ingress">
                        {erDesktop ?
                        <Veilederpanel svg={<img src={veilederBilde}/>} type="normal" kompakt={true}>
                                <Tekst id="veileder-maal-samme-arbeidsgiver"/>
                        </Veilederpanel>
                         :  <Veilederpanel svg={<img src={veilederBilde}/>} type="plakat" kompakt={true}>
                                <Tekst id="veileder-maal-samme-arbeidsgiver"/>
                            </Veilederpanel>
                        }
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
        sykmeldinger: state.sykmeldinger,
        maalId: state.maal.id,
    };
};

export default connect(mapStateToProps)(TiltakContainer);
