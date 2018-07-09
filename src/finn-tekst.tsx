import * as React from 'react';
import ledetekster from './ledetekster/ledetekster';
import { RouteComponentProps, withRouter } from 'react-router';
import { URL_ADMIN } from './innhold';

const tekst = (id: string, erAdmin: boolean): string => {
    if (erAdmin) {
        return id;
    }
    if (!ledetekster[id]) {
        console.error(`Kunne ikke finne teksten ${id}! Returnerer oppgitt id.`); // tslint:disable-line:no-console
        return id;
    }
    return ledetekster[id];
};

interface OwnProps {
    id: string;
}

type TekstProps = OwnProps & RouteComponentProps<any>; // tslint:disable-line:no-any

const TekstComponent = ({id, match}: TekstProps) => {
    return (
        <>{tekst(id, match.path === URL_ADMIN)}</>
    );
};

export default withRouter(TekstComponent);