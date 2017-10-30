import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeLogin(event) {
    return (
      this.setState({
        login: event.target.value,
      })
    )
  }

  handleChangePass(event) {
    return (
      this.setState({
        password: event.target.value,
      })
    )
  }

  handleSubmit() {
    // console.log(this.inputLogin.value, this.inputPassword.value);
    this.props.auth(this.inputLogin.value, this.inputPassword.value);

  }

  render() {
    return (
      <div className="Login">
        <form method="post" action="/">
          <div>
          <h2>Вход</h2>
          <span>Пожалуйста, заполните следующие поля для входа:</span>
          </div>
          <FormGroup controlId="login" bsSize="small">
            <ControlLabel>Логин</ControlLabel>
            <FormControl
              autoFocus
              name='login'
              value={this.state.login}
              onChange={this.handleChangeLogin}
              inputRef={(input) => { this.inputLogin = input; }}
              type="text"
              placeholder="Введите логин"
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="small">
            <ControlLabel>Пароль</ControlLabel>
            <FormControl
              name='password'
              value={this.state.password}
              onChange={this.handleChangePass}
              inputRef={(input) => { this.inputPassword = input; }}
              type="password"
              placeholder="Введите пароль"
            />
          </FormGroup>
          <Button block bsSize="small" bsStyle="primary" type="submit">
            Вход
          </Button>
        </form>
      </div>
    )
  }
}
export default Login;
