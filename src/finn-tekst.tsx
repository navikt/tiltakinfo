import * as React from 'react';
import ledetekster from './ledetekster/ledetekster';
import * as queryString from 'query-string';

const skalViseTekstNokler = queryString.parse(location.search).vistekster;
console.log('skalViseTekstNokler', skalViseTekstNokler); // tslint:disable-line:no-console

export function utledTekst (id: string): string {
    if (skalViseTekstNokler && ledetekster[id]) {
        return ledetekster[id] + ' [' + id + ']' ;
    }
    if (!ledetekster[id]) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }
    return ledetekster[id];
}

interface OwnProps {
    id: string;
}

const Tekst = ({id}: OwnProps) => {
    return (
        <>
            {utledTekst(id)}
        </>
    );
};

export default Tekst;