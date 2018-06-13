import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { AppState } from '../redux/reducer';
import { FlereTiltak } from './flere-tiltak';

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
                <FlereTiltak />
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
