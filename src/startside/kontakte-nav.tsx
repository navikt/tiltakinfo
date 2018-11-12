import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import './kontakte-nav.less';
import { OppfolgingState } from '../brukerdata/oppfolging-duck';
import Datalaster from '../api/datalaster';
import Tekst from '../finn-tekst';
import { klikkPaGaTilAktivitetsplanen } from '../metrics';

const kontakteNavBilde = require('../ikoner/kontakt-oss.svg');

interface StateProps {
    oppfolging: OppfolgingState;
}

export type KontakteNavProps = StateProps;

class KontakteNAV extends React.Component<KontakteNavProps> {

    constructor(props: KontakteNavProps) {
        super(props);
    }

    render() {
        const lenkeAktivitetsplan = '/aktivitetsplan';
        const {oppfolging} = this.props;
        const tekstId = oppfolging.underOppfolging
            ? 'kontaktenav-takontakt-underoppfolging'
            : 'kontaktenav-takontakt-ikkeunderoppfolging';
        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <section className="kontakte-nav-container">
                    <div className="panel panel--border kontakte-nav">
                        <div className="kontakte-nav__bilde">
                            <img src={kontakteNavBilde} alt=""/>
                        </div>
                        <div className="kontakte-nav__innhold">
                            <Innholdstittel className="blokk-s">
                                <Tekst id={'kontaktenav-snakkmednav'}/>
                            </Innholdstittel>
                            <Normaltekst>
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
                        </div>
                    </div>
                </section>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
});

export default connect(mapStateToProps)(KontakteNAV);
