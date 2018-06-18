import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import './kontakte-nav.less';
import { OppfolgingState } from '../oppfolging/oppfolging-duck';
import Datalaster from '../api/datalaster';

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
        const lenkeInfo = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Nyheter/lag-din-egen-aktivitetsplan-p%C3%A5-ditt-nav'; // tslint:disable-line
        const {oppfolging} = this.props;
        return (
            <Datalaster avhengigheter={[oppfolging]}>
                <section className="kontakte-nav">

                    <Undertittel className="blokk-xs">Snakk med oss om tiltak</Undertittel>

                    {oppfolging.underOppfolging && (
                        <>
                            <Normaltekst>
                                Ta gjerne kontakt med NAV-kontoret hvis du vil drøfte dine muligheter for tiltak.
                                På nav.no kan du lage din egen aktivitetsplan og du kan starte en dialog med veilederen
                                din når du er inne i planen.
                            </Normaltekst>
                            <a className="knapp knapp--hoved" href={lenkeAktivitetsplan}>
                                Gå til aktivitetsplanen
                            </a>
                        </>
                    )}
                    {!oppfolging.underOppfolging && (
                        <>
                            <Normaltekst>
                                Ta gjerne kontakt med NAV-kontoret hvis du vil drøfte dine muligheter for tiltak.
                                På nav.no kan du lage din egen aktivitetsplan og du kan starte en dialog med veilederen
                                din
                                når du er inne i planen.
                            </Normaltekst>
                            <a className="knapp knapp--hoved" href={lenkeInfo}>
                                Les mer om aktivitetsplanen
                            </a>
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