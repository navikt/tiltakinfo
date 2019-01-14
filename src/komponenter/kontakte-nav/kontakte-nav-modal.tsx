import * as React from 'react';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import { AppState } from '../../redux/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { lagreBruker, User } from '../../brukerdata/bruker-duck';
import tiltakConfig from '../tiltak/tiltak-config';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';

interface StateProps {
    fulltNavn?: string;
    bruker: User;
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
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
        const {fulltNavn, bruker, oppfolging, oppfolgingsEnhet, doLagreBruker, modalIsOpen, closeModal} = this.props;
        const navn = fulltNavn ? fulltNavn : 'Jeg';
        const tiltak = bruker.tiltak
            .map(t => t.nokkel!)
            .map(n => tiltakConfig(n).tittel)
            .map(tittelId => utledTekst(tittelId));
        const tittel = oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-kontor', [oppfolgingsEnhet.navn]))
            : Parser(utledTekst('kontaktenav-veileder'));
        const ingress = oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-meldingen-blir-sendt-kontor'))
            : Parser(utledTekst('kontaktenav-meldingen-blir-sendt-veileder'));
        const meldingsTekst = oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-interessert-i-muligheter-kontor', [navn].concat(tiltak)))
            : Parser(utledTekst('kontaktenav-interessert-i-muligheter-veileder', tiltak));
        const NavTarKontaktTekst = oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-tar-kontakt-etter-meldingen-kontor', [oppfolgingsEnhet.navn]))
            : Parser(utledTekst('kontaktenav-tar-kontakt-etter-meldingen-veileder'));
        const subtekst = Parser(utledTekst('kontaktenav-tester-ny-tjeneste', [oppfolgingsEnhet.navn]));

        return (
            <NavFrontendModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                closeButton={true}
                contentClass="kontaktModalInnhold"
                contentLabel="Kontakt NAV"
                ariaHideApp={false}
                bodyOpenClassName="modal__kontakt-nav"

            >
                <Sidetittel tag="h1" className="tittel blokk-s">
                    {tittel}
                </Sidetittel>
                <Normaltekst className="ingress blokk-s">
                    {ingress}
                </Normaltekst>
                <Normaltekst className="sitat">
                    {meldingsTekst}
                </Normaltekst>
                <Normaltekst className="infotekst blokk-s">
                    {NavTarKontaktTekst}
                </Normaltekst>

                { oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging && (
                <Normaltekst className="subtekst blokk-m">
                    {subtekst}
                </Normaltekst>
                )}

                <button
                    className="knapp knapp--hoved blokk-xs"
                    onClick={() => {
                        doLagreBruker(bruker);
                        closeModal();
                    }}
                >
                    {Parser(utledTekst('kontaktenav-send-melding'))}
                </button>
            </NavFrontendModal>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    fulltNavn: state.brukersNavn.data.name,
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
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
