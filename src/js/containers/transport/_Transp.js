import React, { Component } from 'react';
import Header from 'ComponentsTransp/Header';
import LeftMenu from 'ComponentsTransp/_LeftMenu';
import Body from 'ComponentsTransp/Body';


class Transport extends Component{
    render(){
        return(
            <div>
                <Header />
                <LeftMenu />
                <Body/>
            </div>
        )
    }
}

export default Transport;