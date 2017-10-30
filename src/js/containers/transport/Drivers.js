import React, { Component } from 'react';
import Header from 'ComponentsTransp/Header';
import LeftMenu from 'ComponentsTransp/LeftMenu';

class Drivers extends Component{
    render(){
        return(
            <div>
                <Header />
                <LeftMenu />
                <div className="driversDrid">
                    driversDrid
                </div>
            </div>
        )
    }
}

export default Drivers;