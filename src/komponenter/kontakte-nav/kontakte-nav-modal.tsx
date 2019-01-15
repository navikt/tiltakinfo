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
import { klikkPaSendMelding } from '../../metrics';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';

interface StoreProps {
    fulltNavn?: string;
    bruker: User;
    oppfolgingsenhetNavn: string;
    oppfolging: OppfolgingState;
}

interface DispatchProps {
    doLagreBruker: (bruker: User) => void;
}

interface OwnProps {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export type KontakteNavModalProps = StoreProps & OwnProps & DispatchProps;

const KontakteNavModal = ({fulltNavn, bruker,  oppfolging, doLagreBruker,
                           modalIsOpen, closeModal, oppfolgingsenhetNavn}: KontakteNavModalProps) => {
    const navn = fulltNavn ? fulltNavn : 'Jeg';
    const tiltak = bruker.tiltak
        .map(t => t.nokkel!)
        .map(n => tiltakConfig(n).tittel)
        .map(tittelId => utledTekst(tittelId));

    const tittel = bruker.oppfolgingsEnhetId === '0219' && !oppfolging.underOppfolging
        ? Parser(utledTekst('kontaktenav-kontor', [oppfolgingsenhetNavn]))
        : Parser(utledTekst('kontaktenav-veileder'));
    const ingress = bruker.oppfolgingsEnhetId === '0219' && !oppfolging.underOppfolging
        ? Parser(utledTekst('kontaktenav-meldingen-blir-sendt-kontor'))
        : Parser(utledTekst('kontaktenav-meldingen-blir-sendt-veileder'));
    const meldingsTekst = bruker.oppfolgingsEnhetId === '0219' && !oppfolging.underOppfolging
        ? Parser(utledTekst('kontaktenav-interessert-i-muligheter-kontor', [navn].concat(tiltak)))
        : Parser(utledTekst('kontaktenav-interessert-i-muligheter-veileder', tiltak));
    const NavTarKontaktTekst = bruker.oppfolgingsEnhetId === '0219' && !oppfolging.underOppfolging
        ? Parser(utledTekst('kontaktenav-tar-kontakt-etter-meldingen-kontor', [oppfolgingsenhetNavn]))
        : Parser(utledTekst('kontaktenav-tar-kontakt-etter-meldingen-veileder'));
    const subtekst = Parser(utledTekst('kontaktenav-tester-ny-tjeneste', [oppfolgingsenhetNavn]));

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
            <Sidetittel tag="h1" className="blokk-s">
                {tittel}
            </Sidetittel>
            <Normaltekst className="blokk-s">
                {ingress}
            </Normaltekst>
            <Normaltekst className="sitat">
                {meldingsTekst}
            </Normaltekst>
            <Normaltekst className="blokk-s">
                {NavTarKontaktTekst}
            </Normaltekst>
            <button
                className="knapp knapp--hoved blokk-xs"
                onClick={() => {
                    doLagreBruker(bruker);
                    closeModal();
                    klikkPaSendMelding(
                        bruker.servicegruppeKode,
                        bruker.harArbeidsgiver,
                        bruker.erSykmeldt,
                        bruker.oppfolgingsEnhetId,
                        oppfolgingsenhetNavn,
                    );
                }}
            >
                {Parser(utledTekst('kontaktenav-send-melding'))}
            </button>
            { bruker.oppfolgingsEnhetId === '0219' && !oppfolging.underOppfolging && (
            <Normaltekst className="subtekst">
                {subtekst}
            </Normaltekst>
            )}
        </NavFrontendModal>
    );
};

const mapStateToProps = (state: AppState): StoreProps => ({
    fulltNavn: state.brukersNavn.data.name,
    oppfolging: state.oppfolging,
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
    },
    oppfolgingsenhetNavn: state.oppfolgingsstatus.oppfolgingsenhet.navn,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doLagreBruker: (bruker: User) => lagreBruker(bruker)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(KontakteNavModal);
