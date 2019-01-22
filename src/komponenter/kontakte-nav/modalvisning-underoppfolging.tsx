import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer';
import { Dispatch } from '../../redux/dispatch-type';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Parser from 'html-react-parser';
import { utledTekst } from '../../finn-tekst';
import { klikkPaSendMeldingVeileder } from '../../metrics';
import { User } from '../../brukerdata/bruker-duck';
import { Melding, sendMeldingTilDialog } from '../../brukerdata/melding-til-veileder-duck';
import { DataElement, Status } from '../../api/datalaster';
import HarSendtMelding from './har-sendt-melding';
import Datalaster from '../../api/datalaster';

interface OwnProps {
    bruker: User;
    tiltakNavn: string[];
    modalIsOpen: boolean;
    closeModal: () => void;
}

interface StoreProps {
    meldingTilDialog: DataElement;
    oppfolgingsenhetNavn: string;
}

interface DispatchProps {
    doSendMeldingDialog: (melding: Melding) => void;
}

export type ModalvisningProps = StoreProps & OwnProps & DispatchProps;

const ModalvisningUnderOppfolging = ({meldingTilDialog, bruker, oppfolgingsenhetNavn, tiltakNavn,
                                             modalIsOpen, closeModal, doSendMeldingDialog}: ModalvisningProps) => {

    const meldingsTekst = utledTekst('kontaktenav-interessert-i-muligheter-veileder', tiltakNavn);

    const melding: Melding = {
        tekst: meldingsTekst,
        overskrift: utledTekst('kontaktenav-overskrift-melding')
    };

    return (
        <>
            { meldingTilDialog.status === Status.IKKE_STARTET ?
                <>
                    <Sidetittel tag="h1" className="tittel blokk-s">
                        {Parser(utledTekst('kontaktenav-veileder'))}
                    </Sidetittel>
                    <Normaltekst className="ingress blokk-s">
                        {Parser(utledTekst('kontaktenav-meldingen-blir-sendt-veileder'))}
                    </Normaltekst>
                    <Normaltekst className="meldingstekst">
                        {meldingsTekst}
                    </Normaltekst>
                    <Normaltekst className="kontaktinfo blokk-s">
                        {Parser(utledTekst('kontaktenav-tar-kontakt-etter-meldingen-veileder'))}
                    </Normaltekst>
                    <button
                        className="knapp knapp--hoved blokk-xs"
                        onClick={() => {
                            doSendMeldingDialog(melding);
                            klikkPaSendMeldingVeileder(
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
                :
                <Datalaster avhengigheter={[meldingTilDialog]} feilmeldingId={'feilmelding-tekniskfeil-sende-melding'}>
                    <div className="har-sendt-melding panel">
                        <HarSendtMelding/>
                    </div>
                </Datalaster>
            }

        </>
    );
};

const mapStateToProps = (state: AppState): StoreProps => ({
    meldingTilDialog: state.meldingTilDialog,
    oppfolgingsenhetNavn: state.oppfolgingsstatus.oppfolgingsenhet.navn,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSendMeldingDialog: (melding: Melding) => sendMeldingTilDialog(melding)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalvisningUnderOppfolging);
