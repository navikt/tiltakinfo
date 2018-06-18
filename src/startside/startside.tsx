import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { Brodsmuler } from './brodsmuler';
import { FlereTiltak } from './flere-tiltak';
import { Tiltak } from './tiltak';
import { Informasjon } from './informasjon';

interface StateProps {
}

interface DispatchProps {
}

type StartsideProps = DispatchProps & StateProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    render() {
        return (
            <>
                <Brodsmuler/>
                <Informasjon/>
                <Tiltak/>
                <FlereTiltak/>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
