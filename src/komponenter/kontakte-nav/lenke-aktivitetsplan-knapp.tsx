import * as React from 'react';
import Tekst from '../../finn-tekst';
import { klikkPaGaTilAktivitetsplanen } from '../../metrics';
import { AppState } from '../../redux/reducer';
import { connect } from 'react-redux';

const lenkeAktivitetsplan = '/aktivitetsplan';

interface StoreProps {
    oppfolgingsenhetId: string;
}

const LenkeAktivitetsplanKnapp = ({oppfolgingsenhetId}: StoreProps) => (
    <div className="kontakte-nav__knapp">
        <a
            className="knapp knapp--hoved"
            href={lenkeAktivitetsplan}
            onClick={() => klikkPaGaTilAktivitetsplanen(oppfolgingsenhetId)}
        >
            <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
        </a>
    </div>
);

const mapStateToProps = (state: AppState): StoreProps => ({
    oppfolgingsenhetId: state.oppfolgingsstatus.oppfolgingsenhet.enhetId,
});

export default connect(mapStateToProps)(LenkeAktivitetsplanKnapp);
