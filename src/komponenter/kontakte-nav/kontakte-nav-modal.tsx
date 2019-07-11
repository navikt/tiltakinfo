import * as React from 'react';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { AppState } from '../../redux/reducer';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { User } from '../../brukerdata/bruker-duck';
import { utledTekst } from '../../finn-tekst';
import tiltakConfig from '../tiltak/tiltak-config';
import ModalvisningUnderOppfolging from './modalvisning-underoppfolging';
import ModalvisningIkkeOppfolging from './modalvisning-ikkeunderoppfolging';

interface StoreProps {
    bruker: User;
    oppfolging: OppfolgingState;
}

interface OwnProps {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export type KontakteNavModalProps = StoreProps & OwnProps;

const KontakteNavModal = ({bruker,  oppfolging, modalIsOpen, closeModal}: KontakteNavModalProps) => {

    const tiltak: string[] = bruker.tiltak
        .map(t => t.nokkel!)
        .map(n => tiltakConfig(n).tittel)
        .map(tittelId => utledTekst(tittelId));

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
            { oppfolging.underOppfolging && (
                <ModalvisningUnderOppfolging bruker={bruker} tiltakNavn={tiltak} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
            )}
            { !oppfolging.underOppfolging && (
                <ModalvisningIkkeOppfolging bruker={bruker} tiltakNavn={tiltak} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
            )}
        </NavFrontendModal>
    );
};

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolging: state.oppfolging,
    bruker: {
        erSykmeldt: state.syfoSituasjon.erSykmeldt,
        harArbeidsgiver: state.syfoSituasjon.harArbeidsgiver,
        servicegruppeKode: state.oppfolging.servicegruppe,
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
});

export default connect(mapStateToProps)(KontakteNavModal);
