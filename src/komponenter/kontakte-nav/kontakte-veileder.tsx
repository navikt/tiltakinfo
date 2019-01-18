import * as React from 'react';
import Parser from 'html-react-parser';
import { utledTekst } from '../../finn-tekst';
import { klikkPaKontaktVeileder } from '../../metrics';
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

type KontakteVeilederProps = OwnProps & StoreProps;

const KontakteVeileder = ({openModal, oppfolgingsstatus, syfoSituasjon}: KontakteVeilederProps) => (
    <div className="kontakte-kontor">
        <button
            className="knapp knapp--hoved"
            onClick={() => {
                openModal();
                klikkPaKontaktVeileder(
                    oppfolgingsstatus.situasjon,
                    syfoSituasjon.harArbeidsgiver,
                    syfoSituasjon.erSykmeldt,
                    oppfolgingsstatus.oppfolgingsenhet.enhetId,
                    oppfolgingsstatus.oppfolgingsenhet.navn,
                );
            }}
        >
            {Parser(utledTekst('kontaktenav-send-melding'))}
        </button>
    </div>
);

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
});

export default connect(mapStateToProps)(KontakteVeileder);
