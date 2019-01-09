import * as React from 'react';
import ledetekster from './ledetekster/ledetekster';
import * as queryString from 'query-string';

const VARIABEL: string = '{var}';

const skalViseTekstNokler = queryString.parse(location.search).vistekster;

export function utledTekst (id: string, variabler?: string[]): string {
    if (skalViseTekstNokler && ledetekster[id]) {
        return ledetekster[id] + ' [' + id + ']' ;
    }
    if (!ledetekster[id]) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }

    const ledetekst: string = ledetekster[id];

    if (ledetekst.search(VARIABEL) > -1 && !variabler) {
        console.error(`Ledeteksten med id ${id} er definert med variabler men ingen er sendt inn`); // tslint:disable-line:no-console
        return id;
    }

    if (variabler) {
        const deler: string[] = ledetekst.split(VARIABEL);
        if (deler.length !== variabler.length + 1) {
            console.error(`Antall variabler sendt inn !== antall variabler definert for tekst med id: ${id}`); // tslint:disable-line:no-console
        }
        return variabler.reduce(
            (forrigeVerdi, gjeldendeVerdi, i) => {
                if (i === 0) {
                    return forrigeVerdi + deler[i] + gjeldendeVerdi + deler[i + 1];
                } else {
                    return forrigeVerdi + gjeldendeVerdi + deler[i + 1];
                }
            },
            ''
        );
    }

    return ledetekst;
}

interface OwnProps {
    id: string;
}

const Tekst = ({id}: OwnProps) => {
    return (
        <>{utledTekst(id)}</>
    );
};

export default Tekst;