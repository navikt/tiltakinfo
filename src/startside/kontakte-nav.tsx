import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import './kontakte-nav.less';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
// import Datalaster from '../api/datalaster';
import Tekst from '../finn-tekst';

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
            <section className="kontakte-nav blokk-xl">
                    <div className="kontakte-nav__bilde">
                        <img src={kontakteNavBilde}/>
                    </div>
                    <div className="kontakte-nav__innhold">
                        <Systemtittel className="blokk-s">
                            <Tekst id={'kontaktenav-snakkmednav'}/>
                        </Systemtittel>
                        <Normaltekst>
                            <Tekst id={tekstId}/>
                        </Normaltekst>
                        <div className="kontakte-nav__knapp">
                            <a className="knapp knapp--hoved" href={lenkeAktivitetsplan}>
                                <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
                            </a>
                        </div>
                    </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
});

export default connect(mapStateToProps)(KontakteNAV);

/*
<Datalaster avhengigheter={[oppfolging]}>
    <div className="kontakte-nav blokk-xl">
        <Veilederpanel type="normal" svg={<img src={kontakteNavBilde}/>}>
            <Systemtittel className="blokk-s">
                <Tekst id={'kontaktenav-snakkmednav'}/>
            </Systemtittel>
            <Normaltekst>
                <Tekst id={tekstId}/>
            </Normaltekst>
            {oppfolging.underOppfolging && (
                <a className="knapp knapp--hoved" href={lenkeAktivitetsplan}>
                    <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
                </a>
            )}
        </Veilederpanel>
    </div>
</Datalaster>
*/