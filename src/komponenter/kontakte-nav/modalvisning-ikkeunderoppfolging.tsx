import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import Parser from 'html-react-parser';
import { klikkPaSendMeldingNavBaerum } from '../../metrics';
import { lagreBruker, User } from '../../brukerdata/bruker-duck';

interface OwnProps {
    bruker: User;
    tiltakNavn: string[];
    modalIsOpen: boolean;
    closeModal: () => void;
}

interface StoreProps {
    fulltNavn: string;
    oppfolgingsenhetNavn: string;
}

interface DispatchProps {
    doLagreBruker: (bruker: User) => void;
}

export type ModalvisningProps = StoreProps & OwnProps & DispatchProps;

const ModalvisningIkkeOppfolging = ({fulltNavn, bruker, oppfolgingsenhetNavn,
                                     tiltakNavn, modalIsOpen, closeModal, doLagreBruker}
                                     : ModalvisningProps) => {

    const navn = fulltNavn && fulltNavn.trim().length ? fulltNavn : 'Jeg';

    return (
        <>
            <Sidetittel tag="h1" className="tittel blokk-s">
                {utledTekst('kontaktenav-kontor', [oppfolgingsenhetNavn])}
            </Sidetittel>
            <Normaltekst className="ingress blokk-s">
                {utledTekst('kontaktenav-meldingen-blir-sendt-kontor')}
            </Normaltekst>
            <Normaltekst className="meldingstekst">
                {Parser(utledTekst('kontaktenav-interessert-i-muligheter-kontor', [navn].concat(tiltakNavn)))}
            </Normaltekst>
            <Normaltekst className="kontaktinfo blokk-s">
                {utledTekst('kontaktenav-tar-kontakt-etter-meldingen-kontor', [oppfolgingsenhetNavn])}
            </Normaltekst>
            <Normaltekst className="subtekst blokk-m">
                {utledTekst('kontaktenav-tester-ny-tjeneste', [oppfolgingsenhetNavn])}
            </Normaltekst>
            <button
                className="knapp knapp--hoved blokk-xs"
                onClick={() => {
                    doLagreBruker(bruker);
                    closeModal();
                    klikkPaSendMeldingNavBaerum(
                        bruker.servicegruppeKode,
                        bruker.harArbeidsgiver,
                        bruker.erSykmeldt,
                        bruker.oppfolgingsEnhetId,
                        oppfolgingsenhetNavn,
                    );
                }}
            >
                {utledTekst('kontaktenav-send-melding')}
            </button>
        </>
    );
};

const mapStateToProps = (state: AppState): StoreProps => ({
    fulltNavn: state.brukersNavn.fulltNavn,
    oppfolgingsenhetNavn: state.oppfolgingsstatus.oppfolgingsenhet.navn,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doLagreBruker: (bruker: User) => lagreBruker(bruker)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalvisningIkkeOppfolging);
