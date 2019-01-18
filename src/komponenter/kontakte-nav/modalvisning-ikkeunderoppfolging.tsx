import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import Parser from 'html-react-parser';
import { klikkPaSendMelding } from '../../metrics';
import { lagreBruker, User } from '../../brukerdata/bruker-duck';

interface StoreProps {
    fulltNavn?: string;
    bruker: User;
    oppfolgingsenhetNavn: string;
}

interface OwnProps {
    tiltakNavn: string[];
    modalIsOpen: boolean;
    closeModal: () => void;
}

interface DispatchProps {
    doLagreBruker: (bruker: User) => void;
}

export type ModalvisningProps = StoreProps & OwnProps & DispatchProps;

const ModalvisningIkkeOppfolging = ({fulltNavn, bruker, oppfolgingsenhetNavn,
                                     tiltakNavn, modalIsOpen, closeModal, doLagreBruker}
                                     : ModalvisningProps) => {

    const navn = fulltNavn ? fulltNavn : 'Jeg';
    const tittel = Parser(utledTekst('kontaktenav-kontor', [oppfolgingsenhetNavn]));
    const ingress = Parser(utledTekst('kontaktenav-meldingen-blir-sendt-kontor'));
    const meldingsTekst = Parser(utledTekst('kontaktenav-interessert-i-muligheter-kontor', [navn].concat(tiltakNavn)));
    const NavTarKontaktTekst = Parser(utledTekst('kontaktenav-tar-kontakt-etter-meldingen-kontor', [oppfolgingsenhetNavn]));
    const subtekst = Parser(utledTekst('kontaktenav-tester-ny-tjeneste', [oppfolgingsenhetNavn]));

    return (
        <>
            <Sidetittel tag="h1" className="tittel blokk-s">
                {tittel}
            </Sidetittel>
            <Normaltekst className="ingress blokk-s">
                {ingress}
            </Normaltekst>
            <Normaltekst className="meldingstekst">
                {meldingsTekst}
            </Normaltekst>
            <Normaltekst className="kontaktinfo blokk-s">
                {NavTarKontaktTekst}
            </Normaltekst>
            <Normaltekst className="subtekst blokk-m">
                {subtekst}
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
        </>
    );
};

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
    doLagreBruker: (bruker: User) => lagreBruker(bruker)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalvisningIkkeOppfolging);
