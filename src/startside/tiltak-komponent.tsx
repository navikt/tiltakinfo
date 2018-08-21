import * as React from 'react';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';
import Tekst from '../finn-tekst';
import tiltakConfig, { Tiltak, TiltakId } from './tiltak-config';
import { MaalOption, maalTiltakMap } from './maal-tiltak-map';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';

interface StateProps {
    sykmeldinger: SykmeldingerState;
    maalId: MaalOption;
}

class TiltakKomponent extends React.Component<StateProps> {
    render() {
        const {sykmeldinger, maalId} = this.props;

        const tiltakSomVises: Tiltak[] = sykmeldinger.data.harArbeidsgiver ?
            maalTiltakMap[maalId].map(tiltakId => tiltakConfig(tiltakId)) :
            [tiltakConfig(TiltakId.LONNSTILSKUDD), tiltakConfig(TiltakId.OPPFOLGING)];

        return (
            <section className="tiltak-oversikt blokk-xl">
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
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        sykmeldinger: state.sykmeldinger,
        maalId: state.maal.id,
    };
};

export default connect(mapStateToProps)(TiltakKomponent);
