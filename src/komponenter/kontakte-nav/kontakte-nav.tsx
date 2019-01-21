import * as React from 'react';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import './kontakte-nav.less';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { tiltakInfoMeldingBaerum, tiltakInfoMeldingDialog, UnleashState } from '../../unleash/unleash-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import { MeldingTilNavKontorState } from '../../brukerdata/melding-til-nav-kontor-duck';
import { nullStillStore } from '../../brukerdata/melding-til-veileder-duck';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Tekst, { utledTekst } from '../../finn-tekst';
import Feature, { featureErAktivert } from '../../unleash/feature';
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

interface DispatchProps {
    doNullStillMeldingDialogStore: () => void;
}

interface ModalState {
    modalIsOpen: boolean;
}

type KontakteNavProps = StoreProps & DispatchProps;

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
        if (this.props.oppfolging.underOppfolging) {
            this.props.doNullStillMeldingDialogStore();
        }
    }

    render() {
        const {oppfolging, oppfolgingsEnhet, meldingState, features} = this.props;

        const erNavBaerumPilot = oppfolgingsEnhet.enhetId === '0219' && featureErAktivert(tiltakInfoMeldingBaerum, features);

        /*const tekstId = oppfolging.underOppfolging
            ? 'kontaktenav-takontakt-underoppfolging'
            : erNavBaerumPilot ? 'kontaktenav-takontakt-ikkeunderoppfolging-navbaerumpilot' : 'kontaktenav-takontakt-ikkeunderoppfolging';
        */
        const tittelTekstId = (oppfolging.underOppfolging && !featureErAktivert(tiltakInfoMeldingDialog, features))
            ? Parser(utledTekst('kontaktenav-snakkmednav-ikkeoppfolging'))
            : oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-snakkmednav-underoppfolging'))
            : Parser(utledTekst('kontaktenav-snakkmednav-ikkeoppfolging'));

        const ingressTekstId = (oppfolging.underOppfolging && !featureErAktivert(tiltakInfoMeldingDialog, features)
            ? Parser(utledTekst('kontaktenav-takontakt-underoppfolging-toggle-ikkeaktivert'))
            : oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-takontakt-underoppfolging'))
            : Parser(utledTekst('kontaktenav-takontakt-ikkeoppfolging')));

        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <>
                    <div className="panel panel--border kontakte-nav__panel">

                        <div className="kontakte-nav__bilde">
                            <img src={kontakteNavBilde} alt="" aria-hidden="true"/>
                        </div>

                        <div className="kontakte-nav__innhold">

                            <Innholdstittel className="blokk-s">
                                <Tekst id={tittelTekstId}/>
                            </Innholdstittel>

                            <Normaltekst className="blokk-s">
                                {ingressTekstId}
                            </Normaltekst>

                            {oppfolging.underOppfolging && !featureErAktivert(tiltakInfoMeldingDialog, features ) && (
                                <LenkeAktivitetsplanKnapp />
                            )}
                            <Feature name={tiltakInfoMeldingDialog}>
                                <>
                                    {oppfolging.underOppfolging && (
                                        <KontakteVeileder openModal={this.openModal} />
                                    )}
                                </>
                            </Feature>
                            <Feature name={tiltakInfoMeldingBaerum}>
                                <>
                                    {(oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging) && !meldingState.harSendtMelding && (
                                        <KontakteKontor openModal={this.openModal} />
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

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    meldingState: state.harSendtMelding,
    features: state.unleash,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doNullStillMeldingDialogStore: () => dispatch(nullStillStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(KontakteNAV);