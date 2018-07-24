import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './flere-tiltak.less';
import Tekst from '../finn-tekst';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import { MAAL_OPTION } from './maal-tiltak-map';

interface StateProps {
    arbeidsforhold: ArbeidsforholdState;
    maalId: MAAL_OPTION;
}

export type FlereTiltakProps = StateProps;

class FlereTiltak extends React.Component<FlereTiltakProps> {

    constructor(props: FlereTiltakProps) {
        super(props);
    }

    render() {
        const lenkeTiltak = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb'; // tslint:disable-line
        const {arbeidsforhold, maalId} = this.props;
        return (
            <>
                {(!arbeidsforhold.data.harArbeidsgiver || maalId !== MAAL_OPTION.IKKE_VALGT) && (
                    <section className="flere-tiltak">
                        <Undertittel className="blokk-xs">
                            <Tekst id={'fleretiltak-header'}/>
                        </Undertittel>

                        <Normaltekst>
                            <Tekst id={'fleretiltak-passedeg'}/>&nbsp;
                            <a className="lenke" href={lenkeTiltak}><Tekst id={'fleretiltak-lenke'}/></a>
                        </Normaltekst>
                    </section>
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsforhold: state.arbeidsforhold,
    maalId: state.maal.id,
});

export default connect(mapStateToProps)(FlereTiltak);