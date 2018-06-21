import ledetekster from './ledetekster/ledetekster';

const tekst = (id: string) => {
    if (!ledetekster[id]) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }
    return ledetekster[id];
};

export default tekst;