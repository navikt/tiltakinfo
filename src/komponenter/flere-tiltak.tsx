import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import NavFrontendChevron from 'nav-frontend-chevron';
import './flere-tiltak.less';
import Tekst from '../finn-tekst';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { klikkPaFortellMegMerMetrikk } from '../metrics';

import flereTiltakBilde from '../ikoner/flere-alternativer.svg';

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
            <div className="flere-tiltak">
                <div className="flere-tiltak__bilde">
                    <img src={flereTiltakBilde} alt="" aria-hidden="true"/>
                </div>

                <div className="flere-tiltak__innhold">
                    <Systemtittel className="blokk-xxs">
                        <Tekst id={'fleretiltak-header'}/>
                    </Systemtittel>

                    <div className="flere-tiltak__tekst">
                        <Normaltekst>
                            <Tekst id={'fleretiltak-passedeg'}/>
                        </Normaltekst>
                    </div>
                    <Normaltekst>
                        <a
                            className="lenke flere-tiltak__lenke"
                            href={lenkeTiltak}
                            onClick={() => klikkPaFortellMegMerMetrikk()}
                        >
                            <Tekst id={'fleretiltak-lenke'}/>
                            <NavFrontendChevron stor={true}/>
                        </a>
                    </Normaltekst>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({});

export default connect(mapStateToProps)(FlereTiltak);
