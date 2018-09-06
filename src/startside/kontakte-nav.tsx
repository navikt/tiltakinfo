import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import 'nav-frontend-paneler-style';
import './kontakte-nav.less';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
import Datalaster from '../api/datalaster';
import Tekst from '../finn-tekst';

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
                <>
                    <section className="kontakte-nav panel panel--border blokk-xl">
                        <Systemtittel className="blokk-xxs">
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
                    </section>
                </>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
});

export default connect(mapStateToProps)(KontakteNAV);
