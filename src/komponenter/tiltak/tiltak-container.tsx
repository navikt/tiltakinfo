import * as React from 'react';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Tekst from '../../finn-tekst';
import { AppState } from '../../redux/reducer';
import TiltakKomponent from './tiltak-komponent';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption } from './tiltak-map';
import './tiltak.less';
import veilederBilde from '../../ikoner/veileder-dame.svg';
import { BrukerType } from '../../redux/generic-reducers';

interface StateProps {
    maalId: MaalOption;
    tiltakErBasertPaMaal: boolean;
    sykmeldtMedArbeidsgiver: boolean;
    tiltakNokler?: TiltakId[];
}

type TiltakContainerProps = StateProps;

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

        const {maalId, sykmeldtMedArbeidsgiver, tiltakNokler} = this.props;

        if (!tiltakNokler) {
            return null;
        }

        const mapTiltakConfig = (tiltakId: TiltakId) => tiltakConfig(tiltakId);

        const tiltakSomVises: Tiltak[] = tiltakNokler.map(mapTiltakConfig);

        return (
            <>
                {sykmeldtMedArbeidsgiver &&
                <section className="tiltak-ingress">
                    <Veilederpanel
                        svg={<img src={veilederBilde} alt="" aria-hidden="true"/>}
                        type={erDesktop ? 'normal' : 'plakat'}
                        kompakt={true}
                    >
                        {(maalId === MaalOption.SAMME_ARBEIDSGIVER || maalId === MaalOption.SAMME_STILLING) &&
                        <Tekst id="veileder-maal-samme-arbeidsgiver"/>
                        }
                        {maalId === MaalOption.NY_ARBEIDSGIVER &&
                        <Tekst id="veileder-maal-ny-arbeidsgiver"/>
                        }
                        {maalId === MaalOption.USIKKER &&
                        <Tekst id="veileder-maal-usikker"/>
                        }
                    </Veilederpanel>
                </section>
                }
                <section className="tiltak-oversikt">
                    {!(sykmeldtMedArbeidsgiver) &&
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

const mapStateToProps = (state: AppState): StateProps => ({
    maalId: state.maal.id,
    tiltakErBasertPaMaal: state.brukertype.brukerType === BrukerType.SYKMELDT_MED_ARBEIDSGIVER,
    sykmeldtMedArbeidsgiver: state.brukertype.brukerType === BrukerType.SYKMELDT_MED_ARBEIDSGIVER,
    tiltakNokler: (state.tiltak.nokkelEn && state.tiltak.nokkelTo)
        ? [state.tiltak.nokkelEn, state.tiltak.nokkelTo] : undefined,
});

export default connect(mapStateToProps)(TiltakContainer);
