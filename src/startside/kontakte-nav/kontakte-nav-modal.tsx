import * as React from 'react';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { AppState } from '../../redux/reducer';
import { lagreBruker, User } from '../../brukerdata/bruker-duck';
import { Dispatch } from '../../redux/dispatch-type';

interface StateProps {
    fulltNavn?: string;
    bruker: User;
}

interface DispatchProps {
    doLagreBruker: (bruker: User) => void;
}

interface OwnProps {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export type KontakteNavModalProps = StateProps & OwnProps & DispatchProps;

class KontakteNavModal extends React.Component<KontakteNavModalProps> {
    render() {
        return (
            <NavFrontendModal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                closeButton={true}
                contentClass="kontaktModalInnhold"
                contentLabel="Kontakt NAV Bærum"
                ariaHideApp={false}
                bodyOpenClassName="modal__kontakt-nav"

            >
                <Sidetittel tag="h1" className="blokk-s">Kontakt<br/>NAV Bærum</Sidetittel>
                <Normaltekst className="blokk-s">Denne meldingen blir sendt til NAV Bærum:</Normaltekst>
                <Normaltekst className="sitat">
                    "<strong>{this.props.fulltNavn}</strong> så informasjon om
                    <strong> Arbeidsrettet rehabilitering</strong> og er interessert
                    i å snakke om muligheter."
                </Normaltekst>
                <Normaltekst className="blokk-s">
                    Etter at du har sendt meldingen, vil NAV
                    Bærum ta kontakt med deg innen et par dager.
                </Normaltekst>
                <button
                    className="knapp knapp--hoved blokk-xs"
                    onClick={() => this.props.doLagreBruker(this.props.bruker)}
                >
                    Send Melding
                </button>
                <Normaltekst className="subtekst">
                    Dette er en ny tjeneste NAV tester ut. Informasjonen din vil
                    bli lagret og delt med utviklingsteamet og NAV Bærum.
                    Personopplysninger slettes etter testperioden.
                </Normaltekst>
            </NavFrontendModal>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    fulltNavn: state.brukersNavn.data.name,
    bruker: {
        erSykmeldt: state.syfoSituasjon.erSykmeldt,
        harArbeidsgiver: state.syfoSituasjon.harArbeidsgiver,
        servicegruppeKode: state.oppfolgingsstatus.situasjon,
        oppfolgingsEnhetId: state.oppfolgingsstatus.oppfolgingsenhet.enhetId,
        underOppfolging: state.oppfolging.underOppfolging,
        maal: state.maal.id,
        tiltak: [
            {
                nokkel: state.tiltak.nokkelEn
            },
            {
                nokkel: state.tiltak.nokkelTo
            },
        ]
    }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doLagreBruker: (bruker: User) => dispatch(lagreBruker(bruker))
});

export default connect(mapStateToProps, mapDispatchToProps)(KontakteNavModal);
