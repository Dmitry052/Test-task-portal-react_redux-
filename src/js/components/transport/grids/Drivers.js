import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Drivers extends Component {
   
    render() {
        
        return (
            <div id="gridDrivers">
                Drivers
            </div>
        )
    }
}

export default connect(
    state => ({
        
    }),
    dispatch => ({
        
    })
)(Drivers);