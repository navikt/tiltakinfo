import { FremtidigSituasjonSvar } from '../brukerdata/registrering-duck';
import { MaalOption } from '../startside/tiltak-map';

export function erLocalhost() {
    const host: string = window.location.host;
    return host.includes('localhost') || host.includes('127.0.0.1');
}

export function erFullMock(): boolean {
    return process.env.REACT_APP_MOCK_FULL === 'true';
}

export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/index.html');
}

export function mapTilMaalOption(fremtidigSituasjon: FremtidigSituasjonSvar): MaalOption {

    switch (fremtidigSituasjon) {

        case FremtidigSituasjonSvar.NY_ARBEIDSGIVER:
            return MaalOption.NY_ARBEIDSGIVER;
        case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING:
            return MaalOption.SAMME_ARBEIDSGIVER;
        case FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER:
            return MaalOption.SAMME_STILLING;
        case FremtidigSituasjonSvar.USIKKER || FremtidigSituasjonSvar.INGEN_PASSER:
            return MaalOption.USIKKER;
        default:
            return MaalOption.IKKE_VALGT;

    }

}