import React, { Component } from 'react';
import Header from 'ComponentsTransp/Header';
import LeftMenu from 'ComponentsTransp/LeftMenu';
import Gridview from 'ComponentsTransp/Gridview';


class Transport extends Component{
    render(){
        return(
            <div>
                <Header />
                <LeftMenu />
                <div className="transport">
                    <Gridview/>
                </div>
            </div>
        )
    }
}

export default Transport;