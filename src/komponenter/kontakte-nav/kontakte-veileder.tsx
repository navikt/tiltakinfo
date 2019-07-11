import * as React from 'react';
import { utledTekst } from '../../finn-tekst';
import { klikkPaKontaktVeileder } from '../../metrics';
import { AppState } from '../../redux/reducer';
import { connect } from 'react-redux';
import { OppfolgingsstatusState } from '../../brukerdata/oppfolgingsstatus-duck';
import { SyfoSituasjonState } from '../../brukerdata/syfo-duck';
import { ServicegruppeOrNull } from '../../brukerdata/oppfolging-duck';

interface OwnProps {
    openModal: Function;
}

interface StoreProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    servicegruppe: ServicegruppeOrNull;
}

type KontakteVeilederProps = OwnProps & StoreProps;

const KontakteVeileder = ({openModal, oppfolgingsstatus, syfoSituasjon, servicegruppe}: KontakteVeilederProps) => (
    <div className="kontakte-kontor">
        <button
            className="knapp knapp--hoved"
            onClick={() => {
                openModal();
                klikkPaKontaktVeileder(
                    servicegruppe,
                    syfoSituasjon.harArbeidsgiver,
                    syfoSituasjon.erSykmeldt,
                    oppfolgingsstatus.oppfolgingsenhet.enhetId,
                    oppfolgingsstatus.oppfolgingsenhet.navn,
                );
            }}
        >
            {utledTekst('kontaktenav-send-melding')}
        </button>
    </div>
);

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
    servicegruppe: state.oppfolging.servicegruppe,
});

export default connect(mapStateToProps)(KontakteVeileder);
