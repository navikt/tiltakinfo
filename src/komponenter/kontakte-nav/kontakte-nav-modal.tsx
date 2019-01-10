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

interface StoreProps {
    fulltNavn?: string;
    bruker: User;
    oppfolgingsenhetNavn: string;
}

interface DispatchProps {
    doLagreBruker: (bruker: User) => void;
}

interface OwnProps {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export type KontakteNavModalProps = StoreProps & OwnProps & DispatchProps;

class KontakteNavModal extends React.Component<KontakteNavModalProps> {
    render() {
        const {fulltNavn, bruker, doLagreBruker, modalIsOpen, closeModal, oppfolgingsenhetNavn} = this.props;
        const navn = fulltNavn ? fulltNavn : 'Jeg';
        const tiltak = bruker.tiltak
            .map(t => t.nokkel!)
            .map(n => tiltakConfig(n).tittel)
            .map(tittelId => utledTekst(tittelId));

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
                <Sidetittel tag="h1" className="blokk-s">
                    {Parser(utledTekst('kontakt-nav-baerum'))}
                </Sidetittel>
                <Normaltekst className="blokk-s">
                    {Parser(utledTekst('meldingen-blir-sendt'))}
                </Normaltekst>
                <Normaltekst className="sitat">
                    {Parser(utledTekst('interessert-i-muligheter', [navn].concat(tiltak)))}
                </Normaltekst>
                <Normaltekst className="blokk-s">
                    {Parser(utledTekst('tar-kontakt-etter-meldingen'))}
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
                    {Parser(utledTekst('send-melding'))}
                </button>
                <Normaltekst className="subtekst">
                    {Parser(utledTekst('tester-ny-tjeneste'))}
                </Normaltekst>
            </NavFrontendModal>
        );
    }
}

const mapStateToProps = (state: AppState): StoreProps => ({
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
    },
    oppfolgingsenhetNavn: state.oppfolgingsstatus.oppfolgingsenhet.navn,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doLagreBruker: (bruker: User) => lagreBruker(bruker)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(KontakteNavModal);
