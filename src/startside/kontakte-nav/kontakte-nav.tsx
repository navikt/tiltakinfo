import * as React from 'react';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import { connect } from 'react-redux';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Tekst from '../../finn-tekst';
import Datalaster from '../../api/datalaster';
import { AppState } from '../../redux/reducer';
import { klikkPaGaTilAktivitetsplanen } from '../../metrics';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import Feature from '../../unleash/feature';

import './kontakte-nav.less';
import kontakteNavBilde from '../../ikoner/kontakt-oss.svg';

import { tiltakInfoMeldingBaerum } from '../../unleash/unleash-duck';
import KontakteNavModal from './kontakte-nav-modal';

interface KontakteNavProps {
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
    harSendtMelding: boolean;
}

interface StateType {
    modalIsOpen: boolean;
}

class KontakteNAV extends React.Component<KontakteNavProps> {
    public state: StateType;

    constructor(props: KontakteNavProps) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(): void {
        this.setState({modalIsOpen: true});
    }

    closeModal(): void {
        this.setState({modalIsOpen: false});
    }

    render() {
        const lenkeAktivitetsplan = '/aktivitetsplan';
        const {oppfolging, oppfolgingsEnhet, harSendtMelding} = this.props;
        const tekstId = oppfolging.underOppfolging
            ? 'kontaktenav-takontakt-underoppfolging'
            : 'kontaktenav-takontakt-ikkeunderoppfolging';

        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <>
                    <div className="panel panel--border kontakte-nav__panel">
                        <div className="kontakte-nav__bilde">
                            <img src={kontakteNavBilde} alt="" aria-hidden="true"/>
                        </div>
                        <div className="kontakte-nav__innhold">
                            <Innholdstittel className="blokk-s">
                                <Tekst id={'kontaktenav-snakkmednav'}/>
                            </Innholdstittel>
                            <Normaltekst className="blokk-s">
                                <Tekst id={tekstId}/>
                            </Normaltekst>
                            {oppfolging.underOppfolging && (
                                <div className="kontakte-nav__knapp">
                                    <a
                                        className="knapp knapp--hoved"
                                        href={lenkeAktivitetsplan}
                                        onClick={() => klikkPaGaTilAktivitetsplanen()}
                                    >
                                        <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
                                    </a>
                                </div>
                            )}
                            <Feature name={tiltakInfoMeldingBaerum}>
                                <>
                                    {oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging && (
                                        !harSendtMelding && (
                                            <div className="kontakt-kontor">
                                                <Normaltekst className="blokk-s">
                                                    Ditt kontor er <strong>NAV Bærum</strong>.
                                                </Normaltekst>
                                                <button className="knapp knapp--hoved" onClick={() => this.openModal()}>
                                                    Kontakt NAV Bærum
                                                </button>
                                            </div>
                                        )
                                    )}
                                </>
                            </Feature>
                        </div>
                    </div>
                    <KontakteNavModal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal}/>
                </>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): KontakteNavProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    harSendtMelding: true
});

export default connect(mapStateToProps)(KontakteNAV);
