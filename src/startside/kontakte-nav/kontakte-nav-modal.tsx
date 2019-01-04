import * as React from 'react';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { AppState } from '../../redux/reducer';

interface StateProps {
    fulltNavn?: string;
}

interface OwnProps {
    modalIsOpen: boolean;
    closeModal: () => void;
}

const handleSendMelding = () => {

};

export type KontakteNavModalProps = StateProps & OwnProps;

function KontakteNavModal({modalIsOpen, closeModal, fulltNavn}: KontakteNavModalProps) {
    return (
        <NavFrontendModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
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
            <button className="knapp knapp--hoved blokk-xs" onClick={handleSendMelding}>Send Melding</button>
            <Normaltekst className="subtekst">
                Dette er en ny tjeneste NAV tester ut. Informasjonen din vil
                bli lagret og delt med utviklingsteamet og NAV Bærum.
                Personopplysninger slettes etter testperioden.
            </Normaltekst>
        </NavFrontendModal>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    fulltNavn: state.brukersNavn.data.name
});

export default connect(mapStateToProps)(KontakteNavModal);
