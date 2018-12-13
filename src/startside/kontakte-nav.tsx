import * as React from 'react';
import { connect } from 'react-redux';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Innholdstittel, Sidetittel } from 'nav-frontend-typografi';
import Tekst from '../finn-tekst';
import Datalaster from '../api/datalaster';
import { AppState } from '../redux/reducer';
import { klikkPaGaTilAktivitetsplanen } from '../metrics';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import { OppfolgingsEnhet } from '../brukerdata/oppfolgingsstatus-duck';
import { State as BrukersNavnState } from '../redux/brukernavn-duck';
import Feature from '../unleash/feature';

import kontakteNavBilde from '../ikoner/kontakt-oss.svg';

import './kontakte-nav.less';
import { tiltakInfoMeldingBaerum } from '../unleash/unleash-duck';

interface StateProps {
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
    brukersNavn: BrukersNavnState;
}

interface StateType {
    modalIsOpen: boolean;
}

export type KontakteNavProps = StateProps;

class KontakteNAV extends React.Component<KontakteNavProps> {
    public state: StateType;

    constructor(props: KontakteNavProps) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        const lenkeAktivitetsplan = '/aktivitetsplan';
        const {oppfolging, oppfolgingsEnhet, brukersNavn} = this.props;
        const tekstId = oppfolging.underOppfolging
            ? 'kontaktenav-takontakt-underoppfolging'
            : 'kontaktenav-takontakt-ikkeunderoppfolging';
        const {modalIsOpen} = this.state;

        const fulltNavn = brukersNavn.data.name !== undefined ? brukersNavn.data.name : 'Aksel Lund Svindal';

        return (
            <Datalaster avhengigheter={[oppfolging, brukersNavn]}>
                <section className="kontakte-nav-container">
                    <div className="panel panel--border kontakte-nav">
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
                            {oppfolging.underOppfolging && (
                                <div className="kontakte-nav__knapp">
                                    <a
                                        className="knapp knapp--hoved"
                                        href={lenkeAktivitetsplan}
                                        onClick={() => klikkPaGaTilAktivitetsplanen()}
                                    >
                                        <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
                                    </a>
                                </div>
                            )}
                            <Feature name={tiltakInfoMeldingBaerum}>
                                <>
                                    {!oppfolging.underOppfolging && oppfolgingsEnhet.enhetId === '0219' && (
                                        <div className="kontakt-kontor">
                                            <Normaltekst className="blokk-s">
                                                Ditt kontor er <strong>NAV Bærum</strong>.
                                            </Normaltekst>
                                            <button className="knapp knapp--hoved" onClick={() => this.openModal()}>
                                                Kontakt NAV Bærum
                                            </button>
                                        </div>
                                    )}
                                </>
                            </Feature>
                        </div>
                    </div>

                    <NavFrontendModal
                        isOpen={modalIsOpen}
                        onRequestClose={() => this.closeModal()}
                        closeButton={true}
                        contentClass="kontaktModalInnhold"
                        contentLabel="Kontakt NAV Bærum"
                        ariaHideApp={false}
                        bodyOpenClassName="modal__kontakt-nav"

                    >
                        <Sidetittel tag="h1" className="blokk-s">Kontakt<br/>NAV Bærum</Sidetittel>
                        <Normaltekst className="blokk-s">Denne meldingen blir sendt til NAV Bærum:</Normaltekst>
                        <Normaltekst className="sitat">
                            "<strong>{fulltNavn}</strong> så informasjon om
                            <strong> Arbeidsrettet rehabilitering</strong> og er interessert
                            i å snakke om muligheter."
                        </Normaltekst>
                        <Normaltekst className="blokk-s">
                            Etter at du har sendt meldingen, vil NAV
                            Bærum ta kontakt med deg innen et par dager.
                        </Normaltekst>
                        <button className="knapp knapp--hoved blokk-xs">Send Melding</button>
                        <Normaltekst className="subtekst">
                            Dette er en ny tjeneste NAV tester ut. Informasonen din vil
                            bli lagret og delt med utviklingsteamet og NAV Bærum.
                            Personopplysninger slettes etter testperioden.
                        </Normaltekst>

                    </NavFrontendModal>
                </section>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    brukersNavn: state.brukersNavn,
});

export default connect(mapStateToProps)(KontakteNAV);
