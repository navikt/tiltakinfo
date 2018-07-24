import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import './kontakte-nav.less';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
import Datalaster from '../api/datalaster';
import Tekst from '../finn-tekst';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import { MAAL_OPTION } from './maal-tiltak-map';

interface StateProps {
    oppfolging: OppfolgingState;
    arbeidsforhold: ArbeidsforholdState;
    maalId: MAAL_OPTION;
}

export type KontakteNavProps = StateProps;

class KontakteNAV extends React.Component<KontakteNavProps> {

    constructor(props: KontakteNavProps) {
        super(props);
    }

    render() {
        const lenkeAktivitetsplan = '/aktivitetsplan';
        const {oppfolging, arbeidsforhold, maalId} = this.props;
        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <>
                    {(!arbeidsforhold.data.harArbeidsgiver || maalId !== MAAL_OPTION.IKKE_VALGT) && (
                    <section className="kontakte-nav blokk-xl">
                        <Systemtittel className="blokk-s">
                            <Tekst id={'kontaktenav-snakkmednav'}/>
                        </Systemtittel>

                        {oppfolging.underOppfolging && (
                            <>
                                <Normaltekst>
                                    <Tekst id={'kontaktenav-takontakt-underoppfolging'}/>
                                </Normaltekst>
                                <a className="knapp knapp--hoved" href={lenkeAktivitetsplan}>
                                    <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
                                </a>
                            </>
                        )}
                        {!oppfolging.underOppfolging && (
                            <>
                                <Normaltekst>
                                    <Tekst id={'kontaktenav-takontakt-ikkeunderoppfolging'}/>
                                </Normaltekst>
                            </>
                        )}
                    </section>
                    )}
                </>

            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
    arbeidsforhold: state.arbeidsforhold,
    maalId: state.maal.id,
});

export default connect(mapStateToProps)(KontakteNAV);