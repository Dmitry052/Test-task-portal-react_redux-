import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Cars extends Component {


    render() {

        return (
            <div id="gridCars">
Cars
            </div>
        )
    }
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(Cars);