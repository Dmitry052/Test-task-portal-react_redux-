import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gridview from './grids/Gridview';
import Drivers from './grids/Drivers';
import Cars from './grids/Cars';

class Body extends Component {
    render() {
        let grids = {
            toMyWg: <Gridview />,
            toMy: <Gridview />,
            newOrders: <Gridview />,
            carAppointed: <Gridview />,
            doneTrip: <Gridview />,
            cancelClient: <Gridview />,

            drivers: <Drivers />,
            cars: <Cars />,
        };
        return (
            <div id="bodyUser">
                {
                    grids[this.props.body.currentMenu]
                }
            </div>
        )
    }
}
export default connect(
    state => ({
        body: state.transp_body
    }),
    dispatch => ({


    }))
    (Body);