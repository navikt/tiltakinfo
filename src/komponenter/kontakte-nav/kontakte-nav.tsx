import * as React from 'react';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import { connect } from 'react-redux';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Tekst from '../../finn-tekst';
import Feature from '../../unleash/feature';
import Datalaster from '../../api/datalaster';
import KontakteKontor from './kontakte-kontor';
import { AppState } from '../../redux/reducer';
import KontakteNavModal from './kontakte-nav-modal';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { tiltakInfoMeldingBaerum } from '../../unleash/unleash-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import { MeldingTilNavKontorState } from '../../brukerdata/melding-til-nav-kontor-duck';

import kontakteNavBilde from '../../ikoner/kontakt-oss.svg';
import './kontakte-nav.less';

interface StateProps {
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
    meldingState: MeldingTilNavKontorState;
}

interface State {
    modalIsOpen: boolean;
}

type KontakteNavProps = StateProps;

class KontakteNAV extends React.Component<KontakteNavProps> {
    public state: State;

    constructor(props: KontakteNavProps) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(): void {
        this.setState({modalIsOpen: true});
    }

    closeModal(): void {
        this.setState({modalIsOpen: false});
    }

    render() {
        const {oppfolging, oppfolgingsEnhet, meldingState} = this.props;
        const tekstId = oppfolging.underOppfolging
            ? 'kontaktenav-takontakt-underoppfolging'
            : 'kontaktenav-takontakt-ikkeunderoppfolging';

        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <>
                    <div className="panel panel--border kontakte-nav__panel">
                        <div className="kontakte-nav__bilde">
                            <img src={kontakteNavBilde} alt="" aria-hidden="true"/>
                        </div>

                        <div className="kontakte-nav__innhold">
                            <Innholdstittel className="blokk-s">
                                <Tekst id={'kontaktenav-snakkmednav'}/>
                            </Innholdstittel>
                            <Normaltekst className="blokk-s">
                                <Tekst id={tekstId}/>
                            </Normaltekst>

                            <Feature name={tiltakInfoMeldingBaerum}>
                                <>
                                    {(oppfolging.underOppfolging || (oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging))
                                    && !meldingState.harSendtMelding && (
                                        <KontakteKontor openModal={this.openModal} oppfolgingsEnhet={oppfolgingsEnhet} oppfolging={oppfolging} />
                                    )}
                                </>
                            </Feature>

                        </div>
                    </div>
                    <KontakteNavModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} />
                </>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): KontakteNavProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    meldingState: state.harSendtMelding
});

export default connect(mapStateToProps)(KontakteNAV);
