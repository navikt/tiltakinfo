import * as React from 'react';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import { AppState } from '../../redux/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { lagreBruker, User } from '../../brukerdata/bruker-duck';

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
        const {fulltNavn, bruker, doLagreBruker, modalIsOpen, closeModal} = this.props;

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
                    "<strong>{fulltNavn}</strong>
                    {Parser(utledTekst('interessert-i-muligheter'))}"
                </Normaltekst>
                <Normaltekst className="blokk-s">
                    {Parser(utledTekst('tar-kontakt-etter-meldingen'))}
                </Normaltekst>
                <button
                    className="knapp knapp--hoved blokk-xs"
                    onClick={() => {
                        doLagreBruker(bruker);
                        closeModal();
                    }}
                >
                    {Parser(utledTekst('send-melding'))}
                </button>
                <Normaltekst className="subtekst">
                    {Parser(utledTekst('tester-ny-tjeneste'))}
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
    doLagreBruker: (bruker: User) => lagreBruker(bruker)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(KontakteNavModal);
