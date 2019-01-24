import * as React from 'react';
import Parser from 'html-react-parser';
import { Normaltekst } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import { klikkPaKontaktNavKontor } from '../../metrics';
import { AppState } from '../../redux/reducer';
import { connect } from 'react-redux';
import { OppfolgingsstatusState } from '../../brukerdata/oppfolgingsstatus-duck';
import { SyfoSituasjonState } from '../../brukerdata/syfo-duck';

interface OwnProps {
    openModal: Function;
}

interface StoreProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
}

type KontakteKontorProps = OwnProps & StoreProps;

const KontakteKontor = ({openModal, oppfolgingsstatus, syfoSituasjon}: KontakteKontorProps) => (
    <div className="kontakte-kontor">
        <Normaltekst className="blokk-s">
            {Parser(utledTekst('tekst-ditt-kontor-er', [oppfolgingsstatus.oppfolgingsenhet.navn]))}
        </Normaltekst>
        <button
            className="knapp knapp--hoved"
            onClick={() => {
                openModal();
                klikkPaKontaktNavKontor(
                    oppfolgingsstatus.servicegruppeKode,
                    syfoSituasjon.harArbeidsgiver,
                    syfoSituasjon.erSykmeldt,
                    oppfolgingsstatus.oppfolgingsenhet.enhetId,
                    oppfolgingsstatus.oppfolgingsenhet.navn,
                );
            }}
        >
            {utledTekst('kontaktenav-kontor', [oppfolgingsstatus.oppfolgingsenhet.navn])}
        </button>
    </div>
);

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
});

export default connect(mapStateToProps)(KontakteKontor);
