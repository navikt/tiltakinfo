import * as React from 'react';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';
import Tekst from '../finn-tekst';
import tiltakConfig, { Tiltak, tomtTiltak, TiltakId } from './tiltak-config';
import { MAAL_OPTION, maalTiltakMap } from './maal-tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import Datalaster from '../api/datalaster';

interface StateProps {
    arbeidsforhold: ArbeidsforholdState;
    maalId: MAAL_OPTION;
}

class TiltakKomponent extends React.Component<StateProps> {
    render() {
        const {arbeidsforhold, maalId} = this.props;

        const tiltakSomVises: Tiltak[] = arbeidsforhold.data.harArbeidsgiver && maalId !== MAAL_OPTION.IKKE_VALGT ?
            maalTiltakMap[maalId].map(tiltakId => tiltakConfig(tiltakId)) :
            arbeidsforhold.data.harArbeidsgiver && maalId === MAAL_OPTION.IKKE_VALGT ?
            [tomtTiltak] :
            [tiltakConfig(TiltakId.LONNSTILSKUDD), tiltakConfig(TiltakId.OPPFOLGING)];

        return (
            <Datalaster avhengigheter={[arbeidsforhold]}>
                <section className="tiltak-oversikt blokk-xl">
                    {(!arbeidsforhold.data.harArbeidsgiver || maalId !== MAAL_OPTION.IKKE_VALGT) && (
                        <>
                            <Undertittel className="tiltak-overskrift blokk-s">
                                <Tekst id={'informasjon-totiltak'}/>
                            </Undertittel>
                            <div className="tiltak-liste">
                                {tiltakSomVises.map((tiltak: Tiltak) =>
                                    <div key={tiltak.tittel} className="tiltak">
                                        <div className="tiltak-header">
                                            <Innholdstittel className="tiltak-header-tekst">
                                                <Tekst id={tiltak.tittel}/>
                                            </Innholdstittel>
                                            <img src={tiltak.ikon} alt="" className="tiltak-ikon"/>
                                        </div>
                                        <div className="tiltak-innhold blokk-xxs">
                                            <Normaltekst><Tekst id={tiltak.hva}/></Normaltekst>
                                        </div>
                                        <Lenkepanel href={tiltak.url} tittelProps="element">
                                            <Tekst id={tiltak.lesmer}/>
                                        </Lenkepanel>
                                    </div>
                                )}
                            </div>
                       </>
                    )}
                </section>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        arbeidsforhold: state.arbeidsforhold,
        maalId: state.maal.id,
    };
};

export default connect(mapStateToProps)(TiltakKomponent);