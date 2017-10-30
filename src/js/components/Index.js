import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Login from './Login';

class Index extends Component {
    render(){
        return(
            <div>
                <div className="headerApp">
                    <a id="logoText" href="/">Service portal</a>
                </div>
                <Login />
            </div>
        )
    }
}

export default Index;