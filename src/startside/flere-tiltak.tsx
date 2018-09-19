import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import NavFrontendChevron from 'nav-frontend-chevron';
import './flere-tiltak.less';
import Tekst from '../finn-tekst';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';

const flereTiltakBilde = require('../ikoner/flere-alternativer.svg');

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
                <div className="flere-tiltak__bilde">
                    <img src={flereTiltakBilde}/>
                </div>

                <div className="flere-tiltak__innhold">
                <Systemtittel className="blokk-xxs">
                    <Tekst id={'fleretiltak-header'}/>
                </Systemtittel>
                <Normaltekst>
                    <div className="flere-tiltak__tekst">
                    <Tekst id={'fleretiltak-passedeg'}/>
                    </div>
                    <a className="lenke" href={lenkeTiltak}>
                        <Tekst id={'fleretiltak-lenke'}/>
                        <NavFrontendChevron stor={true}/>
                    </a>
                </Normaltekst>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({});

export default connect(mapStateToProps)(FlereTiltak);