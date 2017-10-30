import React, { Component } from 'react';
import { Jumbotron, Button } from "react-bootstrap";

class Err404 extends Component{
    render(){
        return(
            <div>
                <div className="headerApp">
                    <a id="logoText" href="/">Service portal</a>
                </div>
                <Jumbotron className="col-lg-3">
                    <h1>404</h1>
                    <p>Страница не найдена</p>
                    <Button href='/'>Назад</Button>
                </Jumbotron>
            </div>

            
        )
    }
}

export default Err404;