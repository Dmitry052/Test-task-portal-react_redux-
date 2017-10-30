import React, { Component } from 'react';

import { Jumbotron, Button } from "react-bootstrap";

class Err404 extends Component{
    constructor(props){
        super(props)
        this.fBack = this.fBack.bind(this);
    }
    fBack(){
        this.props.history.go(-1);
    }
    render(){
        
        return(
            <div>
                <div className="headerApp">
                    <a id="logoText" href="/">Service portal</a>
                </div>
                <Jumbotron className="col-lg-3">
                    <h1>404</h1>
                    <p>Страница не найдена</p>
                    <Button href='' onClick={this.fBack}>Назад</Button>
                </Jumbotron>
            </div>

            
        )
    }
}

export default Err404;