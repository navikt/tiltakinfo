import * as React from 'react';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import 'nav-frontend-knapper-style';
import './kontakte-nav.less';

interface StateProps {
    underOppfolging: boolean;
}

export type KontakteNavProps = StateProps;

class KontakteNAV extends React.Component<KontakteNavProps> {

    constructor(props: KontakteNavProps) {
        super(props);
    }

    render() {
        const lenkeAktivitetsplan = '/aktivitetsplan';
        const lenkeInfo = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Nyheter/lag-din-egen-aktivitetsplan-p%C3%A5-ditt-nav'; // tslint:disable-line
        const {underOppfolging} = this.props;
        return (
            <section className="kontakte-nav">

                <Undertittel className="blokk-xs">Snakk med oss om tiltak</Undertittel>

                { underOppfolging && (
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
                { !underOppfolging && (
                    <>
                        <Normaltekst>
                            Ta gjerne kontakt med NAV-kontoret hvis du vil drøfte dine muligheter for tiltak.
                            På nav.no kan du lage din egen aktivitetsplan og du kan starte en dialog med veilederen din
                            når du er inne i planen.
                        </Normaltekst>
                        <a className="knapp knapp--hoved" href={lenkeInfo}>
                            Les mer om aktivitetsplanen
                        </a>
                    </>
                )}
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    underOppfolging: state.oppfolging.underOppfolging
});

export default connect(mapStateToProps)(KontakteNAV);