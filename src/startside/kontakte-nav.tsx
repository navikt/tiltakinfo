import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import './kontakte-nav.less';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
import Datalaster from '../api/datalaster';
import tekst from '../finn-tekst';

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
        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <section className="kontakte-nav blokk-xl">

                    <Undertittel className="blokk-xs">{tekst('startside-kontaktenav-snakkmednav')}</Undertittel>

                    {oppfolging.underOppfolging && (
                        <>
                            <Normaltekst>{tekst('startside-kontaktenav-takontakt-underoppfolging')}</Normaltekst>
                            <a className="knapp knapp--hoved" href={lenkeAktivitetsplan}>
                                {tekst('startside-kontaktenav-lenke-underoppfolging')}
                            </a>
                        </>
                    )}
                    {!oppfolging.underOppfolging && (
                        <>
                            <Normaltekst>{tekst('startside-kontaktenav-takontakt-ikkeunderoppfolging')}</Normaltekst>
                        </>
                    )}
                </section>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
});

export default connect(mapStateToProps)(KontakteNAV);