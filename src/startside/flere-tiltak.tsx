import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './flere-tiltak.less';
import Tekst from '../finn-tekst';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';

interface StateProps {
}

export type FlereTiltakProps = StateProps;

class FlereTiltak extends React.Component<FlereTiltakProps> {

    constructor(props: FlereTiltakProps) {
        super(props);
    }

    render() {
        const lenkeTiltak = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb'; // tslint:disable-line
        return (
            <section className="flere-tiltak">
                <Undertittel className="blokk-xs">
                    <Tekst id={'fleretiltak-header'}/>
                </Undertittel>
                <Normaltekst>
                    <Tekst id={'fleretiltak-passedeg'}/>&nbsp;
                    <a className="lenke" href={lenkeTiltak}>
                        <Tekst id={'fleretiltak-lenke'}/>
                    </a>
                </Normaltekst>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({});

export default connect(mapStateToProps)(FlereTiltak);
