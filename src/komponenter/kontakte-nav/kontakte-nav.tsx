import * as React from 'react';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import './kontakte-nav.less';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { tiltakInfoMeldingBaerum, tiltakInfoMeldingDialog, UnleashState } from '../../unleash/unleash-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import { MeldingTilNavKontorState } from '../../brukerdata/melding-til-nav-kontor-duck';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Tekst, { utledTekst } from '../../finn-tekst';
import { featureErAktivert } from '../../unleash/feature';
import Parser from 'html-react-parser';
import Datalaster from '../../api/datalaster';
import KontakteKontor from './kontakte-kontor';
import KontakteVeileder from './kontakte-veileder';
import KontakteNavModal from './kontakte-nav-modal';
import LenkeAktivitetsplanKnapp from './lenke-aktivitetsplan-knapp';
import kontakteNavBilde from '../../ikoner/kontakt-oss.svg';

interface StoreProps {
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
    meldingState: MeldingTilNavKontorState;
    features: UnleashState;
}

interface ModalState {
    modalIsOpen: boolean;
}

type KontakteNavProps = StoreProps;

class KontakteNAV extends React.Component<KontakteNavProps> {
    public state: ModalState;

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
        const {oppfolging, oppfolgingsEnhet, meldingState, features} = this.props;

        const meldingDialogFeature = oppfolging.underOppfolging && featureErAktivert(tiltakInfoMeldingDialog, features);
        const erNavBaerumFeature = oppfolgingsEnhet.enhetId === '0219' &&
                                   featureErAktivert(tiltakInfoMeldingBaerum, features) &&
                                   !oppfolging.underOppfolging;

        const tittel = meldingDialogFeature
            ? Parser(utledTekst('kontaktenav-snakkmednav-underoppfolging'))
            : Parser(utledTekst('kontaktenav-snakkmednav-ikkeoppfolging'));

        const finnIngress = () => {
            if (meldingDialogFeature) {
                return Parser(utledTekst('kontaktenav-takontakt-underoppfolging'));
            } else if (erNavBaerumFeature) {
                return Parser(utledTekst('kontaktenav-takontakt-ikkeoppfolging-navbaerumpilot'));
            } else if (oppfolging.underOppfolging) {
                Parser(utledTekst('kontaktenav-takontakt-underoppfolging-toggle-ikkeaktivert'));
            } else {
                return Parser(utledTekst('kontaktenav-takontakt-ikkeoppfolging'));
            }
        };

        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <>
                    <div className="panel panel--border kontakte-nav__panel">

                        <div className="kontakte-nav__bilde">
                            <img src={kontakteNavBilde} alt="" aria-hidden="true"/>
                        </div>

                        <div className="kontakte-nav__innhold">
                            <Innholdstittel className="blokk-s">
                                <Tekst id={tittel}/>
                            </Innholdstittel>

                            <Normaltekst className="blokk-s">
                                {finnIngress()}
                            </Normaltekst>

                            {oppfolging.underOppfolging && !featureErAktivert(tiltakInfoMeldingDialog, features) &&
                                <LenkeAktivitetsplanKnapp />
                            }

                            {oppfolging.underOppfolging && featureErAktivert(tiltakInfoMeldingDialog, features) &&
                                <KontakteVeileder openModal={this.openModal} />
                            }

                            {(oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging) && !meldingState.harSendtMelding &&
                            featureErAktivert(tiltakInfoMeldingBaerum, features) &&
                                <KontakteKontor openModal={this.openModal} />
                            }
                        </div>
                    </div>
                    <KontakteNavModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} />
                </>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    meldingState: state.harSendtMelding,
    features: state.unleash,
});

export default connect(mapStateToProps)(KontakteNAV);