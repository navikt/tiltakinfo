import tekster from './alle-tekster';

const tekst = (id: string) => {
    if (!tekster[id]) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }
    return tekster[id];
};

export default tekst;