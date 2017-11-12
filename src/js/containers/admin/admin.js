import React, { Component } from 'react';
import Header from 'ComponentsAdmin/Header';
import LeftMenu from 'ComponentsAdmin/LeftMenu';
import Body from 'ComponentsAdmin/Body';

class Admin extends Component{
    render(){
        return(
            <div>
                <Header />
                <LeftMenu />
                <Body />
            </div>
        )
    }
}

export default Admin;