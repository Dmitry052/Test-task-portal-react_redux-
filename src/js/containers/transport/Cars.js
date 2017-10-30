import React, { Component } from 'react';
import Header from 'ComponentsTransp/Header';
import LeftMenu from 'ComponentsTransp/LeftMenu';

class Cars extends Component{
    render(){
        return(
            <div>
                <Header />
                <LeftMenu />
                <div className="carsGrid">
                    carsGrid
                </div>
            </div>
        )
    }
}

export default Cars;