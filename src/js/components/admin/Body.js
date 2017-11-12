import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Service_type from './grids/Service_type';
import Wg from './grids/WG_portal';
import Wgbank from './grids/WG_bank';
import Users from './grids/Users';
import Company from './grids/Company';
import Conformity from './grids/Conformity';


class Body extends Component {
    render() {
        let grids = {
            wg: <Wg />, 
            wgbank: <Wgbank />,
            users: <Users />, 
            st: <Service_type />, 
            company: <Company />, 
            conformity: <Conformity />,

        };
        return (
            <div id="bodyAdmin">
                {
                    grids[this.props.body.currentMenu]
                }
            </div>
        )
    }
}
export default connect(
    state => ({
        body: state.admin_body
    }),
    dispatch => ({

    })
)(Body);