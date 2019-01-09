import * as React from 'react';
import Tekst from '../../finn-tekst';
import { klikkPaGaTilAktivitetsplanen } from '../../metrics';

const lenkeAktivitetsplan = '/aktivitetsplan';

const KontakteNavKnapp = () => (
    <div className="kontakte-nav__knapp">
        <a
            className="knapp knapp--hoved"
            href={lenkeAktivitetsplan}
            onClick={() => klikkPaGaTilAktivitetsplanen()}
        >
            <Tekst id={'kontaktenav-lenke-underoppfolging'}/>
        </a>
    </div>
);

export default KontakteNavKnapp;
