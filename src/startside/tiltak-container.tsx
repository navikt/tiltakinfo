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

interface OwnProp {
    tiltakErBasertPaMaal: boolean;
}

interface StateProps {
    maalId: MaalOption;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
}

type TiltakContainerProps = OwnProp & StateProps;

interface State {
    windowSize: number;
}

class TiltakContainer extends React.Component<TiltakContainerProps, State> {
    constructor(props: TiltakContainerProps) {
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
        const erDesktop = this.state.windowSize > 767;

        const mapTiltakConfig = (tiltakId: TiltakId) => tiltakConfig(tiltakId);
        const finnTiltak = (tiltakMapKey: string) => {
            return tiltakMap[tiltakMapKey].map(mapTiltakConfig);
        };

        const {maalId, arbeidsledigSituasjon, syfoSituasjon} = this.props;
        const tiltakSomVises: Tiltak[] =
            syfoSituasjon.erSykmeldt ?
                ( syfoSituasjon.harArbeidsgiver ?
                    finnTiltak(maalId) :
                    finnTiltak(SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER)) :
                finnTiltak(arbeidsledigSituasjon.situasjon);

        return (
            <>
                { syfoSituasjon.harArbeidsgiver &&
                    <section className="tiltak-ingress">
                        <Veilederpanel
                            svg={<img src={veilederBilde}/>}
                            type={erDesktop ? 'normal' : 'plakat'}
                            kompakt={true}
                        >
                            { (maalId === MaalOption.SAMME_ARBEIDSGIVER || maalId === MaalOption.SAMME_STILLING) &&
                            <Tekst id="veileder-maal-samme-arbeidsgiver"/>
                            }
                            { maalId === MaalOption.NY_ARBEIDSGIVER &&
                            <Tekst id="veileder-maal-ny-arbeidsgiver"/>
                            }
                            { maalId === MaalOption.USIKKER &&
                            <Tekst id="veileder-maal-usikker"/>
                            }
                        </Veilederpanel>
                    </section>
                }
                <section className="tiltak-oversikt">
                    { !(syfoSituasjon.erSykmeldt && syfoSituasjon.harArbeidsgiver) &&
                    <Undertittel className="tiltak-overskrift blokk-s">
                        <Tekst id={'informasjon-totiltak'}/>
                    </Undertittel>
                    }
                    <div className="tiltak-liste">
                        {tiltakSomVises.map((tiltak: Tiltak) =>
                            <TiltakKomponent
                                key={tiltak.tittel}
                                tiltak={tiltak}
                                maalId={this.props.maalId}
                                tiltakErBasertPaMaal={this.props.tiltakErBasertPaMaal}
                            />
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