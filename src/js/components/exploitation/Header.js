import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: '14em',
        }
        this.handleInputSizeIn = this.handleInputSizeIn.bind(this);
        this.handleInputSizeOut = this.handleInputSizeOut.bind(this);
    }

    handleInputSizeIn() {
        this.setState({
            width: '16em',
        });
    }

    handleInputSizeOut() {
        this.setState({
            width: '14em',
        });
    }

    render() {
        const inputWidth = { width: this.state.width };
       
        return (

            <div className="headerApp">
                <a id="logoText" href="/">Service portal</a>

                <Form inline id="logout">
                    <Button bsStyle="default">
                        <a href="/logout">Выход</a>
                    </Button>
                </Form>

                <Form inline id="globalSearch">
                    <FormGroup controlId="globalSearchQuery" >
                    <FormControl
                        type="text"
                        placeholder="Поиск по заявкам"
                        style={inputWidth}
                        onFocus={this.handleInputSizeIn}
                        onBlur={this.handleInputSizeOut}
                    />
                </FormGroup>
                {' '}
                <Button type="submit" bsStyle="default">
                    искать
                    </Button>
                </Form>
            </div >
         );
    }
}

export default Header;