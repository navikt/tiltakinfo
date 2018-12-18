import * as React from 'react';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Tekst from '../../finn-tekst';
import { AppState } from '../../redux/reducer';
import TiltakKomponent from './tiltak-komponent';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, SituasjonOption, tiltakMap } from './tiltak-map';

import './tiltak.less';
import veilederBilde from '../../ikoner/veileder-dame.svg';

interface OwnProps {
    tiltakErBasertPaMaal: boolean;
    sykmeldt: boolean;
    sykmeldtMedArbeidsgiver: boolean;
    situasjon: SituasjonOption;
}

interface StateProps {
    maalId: MaalOption;
}

type TiltakContainerProps = OwnProps & StateProps;

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
        const finnTiltak = (tiltakMapKey: string): Tiltak[] => {
            return tiltakMap[tiltakMapKey].map(mapTiltakConfig);
        };

        const {maalId, sykmeldt, sykmeldtMedArbeidsgiver, situasjon} = this.props;

        const finnTiltakMapKey = (): string => {
            if (sykmeldt) {
                if (sykmeldtMedArbeidsgiver) {
                    return maalId;
                } else {
                    return SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER;
                }
            } else {
                return situasjon;
            }
        };

        const tiltakSomVises: Tiltak[] = finnTiltak(finnTiltakMapKey());

        return (
            <>
                { sykmeldtMedArbeidsgiver &&
                    <section className="tiltak-ingress">
                        <Veilederpanel
                            svg={<img src={veilederBilde} alt="" aria-hidden="true"/>}
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
                    { !(sykmeldtMedArbeidsgiver) &&
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
    };
};

export default connect(mapStateToProps)(TiltakContainer);